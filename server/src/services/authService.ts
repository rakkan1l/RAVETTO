import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { cartService } from './cartService';

export class AuthService {
  async register(data: { email: string; password: string; firstName: string; lastName?: string; phone?: string; guestCartToken?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (existing) {
      throw new BadRequestError('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'CUSTOMER',
      },
    });

    // Merge guest cart if provided
    if (data.guestCartToken) {
      await cartService.mergeGuestCart(data.guestCartToken, user.id);
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  async login(email: string, pass: string, guestCartToken?: string) {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const valid = await bcrypt.compare(pass, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (guestCartToken) {
      await cartService.mergeGuestCart(guestCartToken, user.id);
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        createdAt: true,
        addresses: { orderBy: { isDefault: 'desc' } },
        orders: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: true,
            shipments: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedError('User session invalid');
    }

    return user;
  }

  private generateToken(user: { id: string; email: string; role: string }) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  }
}

export const authService = new AuthService();
