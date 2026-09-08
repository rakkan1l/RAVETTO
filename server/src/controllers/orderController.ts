import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/orderService';
import { sendSuccess } from '../utils/apiResponse';
import { z } from 'zod';

const initiateCheckoutSchema = z.object({
  couponCode: z.string().optional(),
});

const completeOrderSchema = z.object({
  guestEmail: z.string().email().optional(),
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    street: z.string().min(1, 'Street address is required'),
    landmark: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().default('India'),
    phone: z.string().min(10, 'Valid phone number required'),
  }),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
  couponCode: z.string().optional(),
});

export const orderController = {
  async initiateCheckout(req: Request, res: Response, next: NextFunction) {
    try {
      const { couponCode } = initiateCheckoutSchema.parse(req.body);
      const checkoutSession = await orderService.initiateCheckout({
        cartToken: req.cartToken!,
        userId: req.user?.userId,
        couponCode,
      });

      return sendSuccess(res, checkoutSession);
    } catch (err) {
      return next(err);
    }
  },

  async completeOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = completeOrderSchema.parse(req.body);
      const order = await orderService.completeOrder({
        cartToken: req.cartToken!,
        userId: req.user?.userId,
        ...data,
      });

      return sendSuccess(res, order, 'Order confirmed with intention', 201);
    } catch (err) {
      return next(err);
    }
  },

  async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendSuccess(res, []);
      }
      const orders = await orderService.getOrdersForUser(req.user.userId);
      return sendSuccess(res, orders);
    } catch (err) {
      return next(err);
    }
  },

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderByIdOrNumber(req.params.id);
      return sendSuccess(res, order);
    } catch (err) {
      return next(err);
    }
  },

  async trackOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderByIdOrNumber(req.params.orderNumber);
      return sendSuccess(res, {
        orderNumber: order.orderNumber,
        status: order.status,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery,
        shipments: order.shipments,
        items: order.items,
      });
    } catch (err) {
      return next(err);
    }
  },
};
