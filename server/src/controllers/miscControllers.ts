import { Request, Response, NextFunction } from 'express';
import { wishlistService } from '../services/wishlistService';
import { journalService } from '../services/journalService';
import { sendSuccess } from '../utils/apiResponse';
import { z } from 'zod';
import { prisma } from '../prisma';

const toggleWishlistSchema = z.object({
  productId: z.string().min(1),
  preferredColorId: z.string().optional(),
  preferredSizeId: z.string().optional(),
});

export const wishlistController = {
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendSuccess(res, []);
      }
      const items = await wishlistService.getWishlist(req.user.userId);
      return sendSuccess(res, items);
    } catch (err) {
      return next(err);
    }
  },

  async toggleWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Sign in to save pieces to your atelier archive' });
      }
      const { productId, preferredColorId, preferredSizeId } = toggleWishlistSchema.parse(req.body);
      const result = await wishlistService.toggleWishlist(req.user.userId, productId, preferredColorId, preferredSizeId);
      return sendSuccess(res, result);
    } catch (err) {
      return next(err);
    }
  },
};

export const journalController = {
  async getArticles(_req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await journalService.getArticles();
      return sendSuccess(res, articles);
    } catch (err) {
      return next(err);
    }
  },

  async getArticleBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await journalService.getArticleBySlug(req.params.slug);
      return sendSuccess(res, article);
    } catch (err) {
      return next(err);
    }
  },
};

export const newsletterController = {
  async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);
      await prisma.newsletterSubscriber.upsert({
        where: { email: email.toLowerCase() },
        update: { isActive: true },
        create: { email: email.toLowerCase() },
      });
      return sendSuccess(res, { subscribed: true }, 'Welcome to the Ravetto Atelier list');
    } catch (err) {
      return next(err);
    }
  },
};
