import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/adminService';
import { sendSuccess } from '../utils/apiResponse';
import { z } from 'zod';

const updateStockSchema = z.object({
  stock: z.number().int().min(0),
});

const updateOrderStatusSchema = z.object({
  status: z.string().min(1),
  trackingNumber: z.string().optional(),
});

const createCouponSchema = z.object({
  code: z.string().min(3),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.number().positive(),
  minOrderValue: z.number().optional(),
  maxDiscount: z.number().optional(),
});

export const adminController = {
  async getMetrics(_req: Request, res: Response, next: NextFunction) {
    try {
      const metrics = await adminService.getDashboardMetrics();
      return sendSuccess(res, metrics);
    } catch (err) {
      return next(err);
    }
  },

  async getProducts(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await adminService.getAllProducts();
      return sendSuccess(res, products);
    } catch (err) {
      return next(err);
    }
  },

  async updateInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { stock } = updateStockSchema.parse(req.body);
      const updated = await adminService.updateVariantInventory(req.params.variantId, stock);
      return sendSuccess(res, updated, 'Inventory updated');
    } catch (err) {
      return next(err);
    }
  },

  async getOrders(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await adminService.getAllOrders();
      return sendSuccess(res, orders);
    } catch (err) {
      return next(err);
    }
  },

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, trackingNumber } = updateOrderStatusSchema.parse(req.body);
      const order = await adminService.updateOrderStatus(req.params.id, status, trackingNumber);
      return sendSuccess(res, order, 'Order status updated');
    } catch (err) {
      return next(err);
    }
  },

  async getCustomers(_req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await adminService.getAllCustomers();
      return sendSuccess(res, customers);
    } catch (err) {
      return next(err);
    }
  },

  async getCoupons(_req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await adminService.getAllCoupons();
      return sendSuccess(res, coupons);
    } catch (err) {
      return next(err);
    }
  },

  async createCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCouponSchema.parse(req.body);
      const coupon = await adminService.createCoupon(data);
      return sendSuccess(res, coupon, 'Coupon created', 201);
    } catch (err) {
      return next(err);
    }
  },
};
