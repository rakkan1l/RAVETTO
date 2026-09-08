import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function guestSession(req: Request, res: Response, next: NextFunction) {
  let cartToken = req.cookies?.ravetto_cart_token || req.headers['x-cart-token'] as string;

  if (!cartToken) {
    cartToken = uuidv4();
    res.cookie('ravetto_cart_token', cartToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  req.cartToken = cartToken;
  next();
}
