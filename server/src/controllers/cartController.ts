import { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/cartService';
import { sendSuccess } from '../utils/apiResponse';
import { z } from 'zod';

const addItemSchema = z.object({
  variantId: z.string().min(1, 'variantId is required'),
  quantity: z.number().int().min(1).default(1),
});

const updateItemSchema = z.object({
  quantity: z.number().int().min(0),
});

export const cartController = {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.getOrCreateCart(req.cartToken!, req.user?.userId);
      return sendSuccess(res, cart);
    } catch (err) {
      return next(err);
    }
  },

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { variantId, quantity } = addItemSchema.parse(req.body);
      const updatedCart = await cartService.addItem(req.cartToken!, variantId, quantity, req.user?.userId);
      return sendSuccess(res, updatedCart, 'Added to bag');
    } catch (err) {
      return next(err);
    }
  },

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { quantity } = updateItemSchema.parse(req.body);
      const updatedCart = await cartService.updateItem(req.params.id, quantity, req.cartToken!, req.user?.userId);
      return sendSuccess(res, updatedCart, 'Bag updated');
    } catch (err) {
      return next(err);
    }
  },

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCart = await cartService.removeItem(req.params.id, req.cartToken!, req.user?.userId);
      return sendSuccess(res, updatedCart, 'Item removed from bag');
    } catch (err) {
      return next(err);
    }
  },
};
