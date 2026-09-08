import { prisma } from '../prisma';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { cartService, COMPLIMENTARY_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from './cartService';
import { paymentService } from './paymentService';

export class OrderService {
  async initiateCheckout(params: {
    cartToken: string;
    userId?: string;
    couponCode?: string;
  }) {
    const cart = await cartService.getOrCreateCart(params.cartToken, params.userId);

    if (cart.items.length === 0) {
      throw new BadRequestError('Cannot initiate checkout with an empty bag');
    }

    // Verify stock availability
    for (const item of cart.items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
      });
      if (!variant || variant.stock < item.quantity) {
        throw new BadRequestError(`Garment '${item.productName}' in ${item.color} / ${item.size} has insufficient stock`);
      }
    }

    let discount = 0;
    if (params.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: params.couponCode.toUpperCase() },
      });
      if (coupon && coupon.isActive && cart.subtotal >= coupon.minOrderValue) {
        if (coupon.discountType === 'PERCENTAGE') {
          discount = Math.round((cart.subtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
      }
    }

    const shippingFee = cart.subtotal >= COMPLIMENTARY_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const finalTotal = Math.max(0, cart.subtotal - discount + shippingFee);

    const rzpOrder = await paymentService.createRazorpayOrder(
      finalTotal,
      `rcpt_${Date.now().toString().slice(-6)}`
    );

    return {
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId: rzpOrder.keyId,
      subtotal: cart.subtotal,
      discount,
      shippingFee,
      total: finalTotal,
      items: cart.items,
    };
  }

  async completeOrder(params: {
    cartToken: string;
    userId?: string;
    guestEmail?: string;
    shippingAddress: {
      fullName: string;
      street: string;
      landmark?: string;
      city: string;
      state: string;
      postalCode: string;
      country?: string;
      phone: string;
    };
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    couponCode?: string;
  }) {
    // 1. Verify Payment Signature
    const isValidSignature = paymentService.verifyRazorpaySignature(
      params.razorpayOrderId,
      params.razorpayPaymentId,
      params.razorpaySignature
    );

    if (!isValidSignature) {
      throw new BadRequestError('Payment signature verification failed');
    }

    // 2. Fetch Cart
    const cart = await cartService.getOrCreateCart(params.cartToken, params.userId);
    if (cart.items.length === 0) {
      throw new BadRequestError('Bag is empty');
    }

    // 3. Re-calculate totals safely on server
    let discount = 0;
    if (params.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: params.couponCode.toUpperCase() },
      });
      if (coupon && coupon.isActive && cart.subtotal >= coupon.minOrderValue) {
        if (coupon.discountType === 'PERCENTAGE') {
          discount = Math.round((cart.subtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
      }
    }

    const shippingFee = cart.subtotal >= COMPLIMENTARY_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const finalTotal = Math.max(0, cart.subtotal - discount + shippingFee);

    // 4. Generate Order Number
    const orderNumber = `RV${Math.floor(1000 + Math.random() * 9000)}`;

    // 5. Atomic Transaction: Decrement stock, create order, items, payment, and shipment
    const createdOrder = await prisma.$transaction(async (tx) => {
      // Stock decrement
      for (const item of cart.items) {
        const currentVariant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (!currentVariant || currentVariant.stock < item.quantity) {
          throw new BadRequestError(`Insufficient stock for ${item.productName} (${item.color}/${item.size})`);
        }

        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: params.userId,
          guestEmail: params.guestEmail || (params.userId ? undefined : 'client@ravetto.com'),
          status: 'CONFIRMED',
          subtotal: cart.subtotal,
          discount,
          shippingFee,
          tax: 0,
          total: finalTotal,
          razorpayOrderId: params.razorpayOrderId,
          razorpayPaymentId: params.razorpayPaymentId,
          razorpaySignature: params.razorpaySignature,
          shippingAddressJson: JSON.stringify(params.shippingAddress),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
          trackingNumber: `BLUEDART-RV-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      });

      // Create Order Items
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            variantId: item.variantId,
            productName: item.productName,
            colorName: item.color,
            sizeName: item.size,
            unitPrice: item.price,
            quantity: item.quantity,
            total: item.total,
          },
        });
      }

      // Create Payment
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          provider: 'RAZORPAY',
          transactionId: params.razorpayPaymentId,
          amount: finalTotal,
          status: 'SUCCESS',
          signature: params.razorpaySignature,
        },
      });

      // Create Shipment Record
      await tx.shipment.create({
        data: {
          orderId: newOrder.id,
          trackingNumber: newOrder.trackingNumber || `RV-TRACK-${newOrder.id.slice(0, 6)}`,
          carrier: 'Bluedart Air Express',
          trackingStatus: 'CONFIRMED',
          estimatedDelivery: newOrder.estimatedDelivery,
        },
      });

      // Clear user's cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return this.getOrderByIdOrNumber(createdOrder.id);
  }

  async getOrderByIdOrNumber(idOrNumber: string) {
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: idOrNumber }, { orderNumber: idOrNumber }],
      },
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
    });

    if (!order) {
      throw new NotFoundError(`Order '${idOrNumber}' not found`);
    }

    return {
      ...order,
      shippingAddress: JSON.parse(order.shippingAddressJson || '{}'),
    };
  }

  async getOrdersForUser(userId: string) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        shipments: true,
      },
    });

    return orders.map((o) => ({
      ...o,
      shippingAddress: JSON.parse(o.shippingAddressJson || '{}'),
    }));
  }
}

export const orderService = new OrderService();
