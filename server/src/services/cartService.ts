import { prisma } from '../prisma';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const COMPLIMENTARY_SHIPPING_THRESHOLD = 2000;
export const STANDARD_SHIPPING_FEE = 150;

export class CartService {
  async getOrCreateCart(cartToken: string, userId?: string) {
    if (userId) {
      let userCart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: {
                      images: { where: { isPrimary: true }, take: 1 },
                    },
                  },
                  color: true,
                  size: true,
                },
              },
            },
          },
        },
      });

      if (!userCart) {
        userCart = await prisma.cart.create({
          data: {
            userId,
            cartToken,
          },
          include: {
            items: {
              include: {
                variant: {
                  include: {
                    product: {
                      include: {
                        images: { where: { isPrimary: true }, take: 1 },
                      },
                    },
                    color: true,
                    size: true,
                  },
                },
              },
            },
          },
        });
      }

      return this.formatCart(userCart);
    }

    // Guest cart
    let guestCart = await prisma.cart.findUnique({
      where: { cartToken },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: { where: { isPrimary: true }, take: 1 },
                  },
                },
                color: true,
                size: true,
              },
            },
          },
        },
      },
    });

    if (!guestCart) {
      guestCart = await prisma.cart.create({
        data: {
          cartToken,
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: {
                      images: { where: { isPrimary: true }, take: 1 },
                    },
                  },
                  color: true,
                  size: true,
                },
              },
            },
          },
        },
      });
    }

    return this.formatCart(guestCart);
  }

  async addItem(cartToken: string, variantId: string, quantity: number, userId?: string) {
    if (quantity <= 0) {
      throw new BadRequestError('Quantity must be at least 1');
    }

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });

    if (!variant || variant.product.status !== 'ACTIVE') {
      throw new NotFoundError('Selected garment variant is unavailable');
    }

    if (variant.stock < quantity) {
      throw new BadRequestError(`Only ${variant.stock} units available in stock`);
    }

    // Retrieve or create cart
    const cart = await this.getRawCart(cartToken, userId);

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId: cart.id,
          variantId,
        },
      },
    });

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;
      if (newQty > variant.stock) {
        throw new BadRequestError(`Cannot add more than ${variant.stock} available units`);
      }
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQty },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    return this.getOrCreateCart(cartToken, userId);
  }

  async updateItem(itemId: string, quantity: number, cartToken: string, userId?: string) {
    if (quantity <= 0) {
      return this.removeItem(itemId, cartToken, userId);
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { variant: true, cart: true },
    });

    if (!item) {
      throw new NotFoundError('Cart item not found');
    }

    if (quantity > item.variant.stock) {
      throw new BadRequestError(`Only ${item.variant.stock} units available`);
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return this.getOrCreateCart(cartToken, userId);
  }

  async removeItem(itemId: string, cartToken: string, userId?: string) {
    await prisma.cartItem.delete({
      where: { id: itemId },
    }).catch(() => {});

    return this.getOrCreateCart(cartToken, userId);
  }

  async clearCart(cartId: string) {
    await prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  async mergeGuestCart(guestCartToken: string, userId: string) {
    const guestCart = await prisma.cart.findUnique({
      where: { cartToken: guestCartToken },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) return;

    let userCart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!userCart) {
      await prisma.cart.update({
        where: { id: guestCart.id },
        data: { userId },
      });
      return;
    }

    // Merge items into userCart
    for (const item of guestCart.items) {
      const existing = await prisma.cartItem.findUnique({
        where: {
          cartId_variantId: {
            cartId: userCart.id,
            variantId: item.variantId,
          },
        },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + item.quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            variantId: item.variantId,
            quantity: item.quantity,
          },
        });
      }
    }

    // Delete guest cart
    await prisma.cart.delete({ where: { id: guestCart.id } });
  }

  private async getRawCart(cartToken: string, userId?: string) {
    if (userId) {
      let cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) {
        cart = await prisma.cart.create({ data: { userId, cartToken } });
      }
      return cart;
    }

    let cart = await prisma.cart.findUnique({ where: { cartToken } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { cartToken } });
    }
    return cart;
  }

  private formatCart(cart: any) {
    let subtotal = 0;
    let itemCount = 0;

    const items = (cart.items || []).map((item: any) => {
      const lineTotal = item.variant.price * item.quantity;
      subtotal += lineTotal;
      itemCount += item.quantity;

      const primaryImage = item.variant.product.images?.[0]?.url || '';

      return {
        id: item.id,
        variantId: item.variantId,
        productId: item.variant.productId,
        productName: item.variant.product.name,
        productSlug: item.variant.product.slug,
        color: item.variant.color.name,
        colorHex: item.variant.color.hexCode,
        size: item.variant.size.code,
        price: item.variant.price,
        compareAtPrice: item.variant.compareAtPrice,
        stock: item.variant.stock,
        quantity: item.quantity,
        total: lineTotal,
        image: primaryImage,
        fabric: item.variant.product.fabricComposition,
        gsm: item.variant.product.gsm,
      };
    });

    const isFreeShipping = subtotal >= COMPLIMENTARY_SHIPPING_THRESHOLD;
    const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE) : 0;
    const amountNeededForFreeShipping = Math.max(0, COMPLIMENTARY_SHIPPING_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / COMPLIMENTARY_SHIPPING_THRESHOLD) * 100));

    return {
      id: cart.id,
      cartToken: cart.cartToken,
      items,
      itemCount,
      subtotal,
      shippingFee,
      isFreeShipping,
      amountNeededForFreeShipping,
      freeShippingProgress,
      threshold: COMPLIMENTARY_SHIPPING_THRESHOLD,
      total: subtotal + shippingFee,
    };
  }
}

export const cartService = new CartService();
