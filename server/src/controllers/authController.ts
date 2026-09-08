import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { sendSuccess } from '../utils/apiResponse';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      const guestCartToken = req.cartToken;
      const result = await authService.register({ ...data, guestCartToken });

      res.cookie('ravetto_auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return sendSuccess(res, { ...result.user, token: result.token }, 'Account created successfully', 201);
    } catch (err) {
      return next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const guestCartToken = req.cartToken;
      const result = await authService.login(data.email, data.password, guestCartToken);

      res.cookie('ravetto_auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return sendSuccess(res, { ...result.user, token: result.token }, 'Welcome back to Ravetto');
    } catch (err) {
      return next(err);
    }
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('ravetto_auth_token');
    return sendSuccess(res, null, 'Logged out successfully');
  },

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendSuccess(res, null);
      }
      const profile = await authService.getMe(req.user.userId);
      return sendSuccess(res, profile);
    } catch (err) {
      return next(err);
    }
  },
};
