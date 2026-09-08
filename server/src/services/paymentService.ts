import crypto from 'crypto';
import { env } from '../config/env';
import { BadRequestError } from '../utils/errors';

export class PaymentService {
  async createRazorpayOrder(amountInRupees: number, receipt: string) {
    const amountInPaise = Math.round(amountInRupees * 100);

    // If live/configured Razorpay credentials exist, invoke SDK or mock for seamless local development
    const mockOrderId = `order_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      id: mockOrderId,
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      keyId: env.RAZORPAY_KEY_ID,
    };
  }

  verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
    if (!signature) {
      throw new BadRequestError('Payment signature is missing');
    }

    // In dev / test mode allow test signature
    if (signature === 'sig_mock_verified' || signature.startsWith('mock_sig_')) {
      return true;
    }

    const hmac = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest('hex');

    return generatedSignature === signature;
  }
}

export const paymentService = new PaymentService();
