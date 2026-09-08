import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { api } from '../api/client';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Price } from '../components/ui/Price';
import { ShieldCheck, Truck, ArrowLeft, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, fetchCart } = useCartStore();
  const { user } = useAuthStore();
  const { showToast } = useUIStore();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Arjun Mehta',
    street: 'Flat 402, Altius Residences, 12th Main',
    landmark: 'Near 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India',
    phone: '+91 98110 56789',
  });

  const [guestEmail, setGuestEmail] = useState(user?.email || 'client@ravetto.com');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="font-editorial text-3xl text-ravetto-text">Your Bag is Quiet.</h2>
        <p className="text-xs text-ravetto-muted">Add foundational pieces to begin checkout.</p>
        <Button onClick={() => onNavigate('/shop')} variant="primary" size="md">
          Explore Collection
        </Button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    if (couponCode.toUpperCase() === 'FIRSTRAVETTO') {
      const discount = Math.round(cart.subtotal * 0.1);
      setDiscountAmount(discount);
      setAppliedCoupon('FIRSTRAVETTO (10% ATELIER DISCOUNT)');
      showToast('10% Atelier coupon applied', 'success');
    } else if (couponCode.toUpperCase() === 'ATELIER300') {
      setDiscountAmount(300);
      setAppliedCoupon('ATELIER300 (₹300 DISCOUNT)');
      showToast('₹300 coupon applied', 'success');
    } else {
      showToast('Invalid or expired coupon code', 'error');
    }
  };

  const finalTotal = Math.max(0, cart.subtotal - discountAmount + cart.shippingFee);

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);

      // 1. Create payment order on server
      const paymentInit = await api.createPaymentOrder(appliedCoupon ? couponCode : undefined);

      // 2. Simulated Razorpay verification response with cryptographic payload
      const mockPaymentPayload = {
        guestEmail: user ? undefined : guestEmail,
        shippingAddress,
        razorpayOrderId: paymentInit.razorpayOrderId,
        razorpayPaymentId: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        razorpaySignature: 'sig_mock_verified', // verified by backend HMAC
        couponCode: appliedCoupon ? couponCode : undefined,
      };

      // 3. Confirm order & commit stock decrements on backend
      const confirmedOrder = await api.verifyPayment(mockPaymentPayload);

      // 4. Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D4F4A', '#B8E0D2', '#172B2A', '#F5F4EF'],
      });

      showToast(`Order #${confirmedOrder.orderNumber} confirmed with intention`, 'success');
      await fetchCart();

      // Navigate to order tracking view
      onNavigate(`/account/orders/${confirmedOrder.orderNumber}`);
    } catch (err: any) {
      showToast(err.message || 'Payment failed to complete', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        {/* Back link */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ravetto-muted hover:text-ravetto-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Shipping & Payment Address Form */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="pb-6 border-b border-ravetto-border">
              <span className="micro-caps text-ravetto-teal block mb-1">
                Step 01 of 02
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-ravetto-text">
                Delivery Address
              </h1>
            </div>

            <div className="space-y-4">
              {!user && (
                <Input
                  label="Contact Email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="client@domain.com"
                  required
                />
              )}

              <Input
                label="Full Recipient Name"
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                placeholder="Arjun Mehta"
                required
              />

              <Input
                label="Street Address & Apartment"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                placeholder="Flat 402, Altius Residences, 12th Main"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Bengaluru"
                  required
                />
                <Input
                  label="State"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="Karnataka"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Postal Code (PIN)"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  placeholder="560038"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  placeholder="+91 98110 56789"
                  required
                />
              </div>
            </div>

            {/* Payment Gateway Box */}
            <div className="pt-6 border-t border-ravetto-border space-y-4">
              <span className="micro-caps text-ravetto-teal block mb-1">
                Step 02 of 02
              </span>
              <h2 className="font-editorial text-2xl font-medium text-ravetto-text">
                Payment Verification
              </h2>

              <div className="p-4 border border-ravetto-teal bg-ravetto-mint-subtle flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-ravetto-teal" />
                  <div>
                    <span className="text-xs uppercase font-semibold text-ravetto-text block">
                      Razorpay Secure Encrypted Checkout
                    </span>
                    <span className="text-[11px] text-ravetto-muted">
                      UPI, Credit/Debit Cards, NetBanking with 256-bit encryption
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold bg-white px-2 py-1 border border-ravetto-mint text-ravetto-teal">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Placement */}
          <div className="lg:col-span-5 bg-ravetto-offwhite-paper border border-ravetto-border p-6 sm:p-8 space-y-6 text-left">
            <h3 className="font-editorial text-xl font-medium text-ravetto-text pb-4 border-b border-ravetto-border">
              Order Manifest &bull; [{cart.itemCount} Pieces]
            </h3>

            {/* Garment List */}
            <div className="divide-y divide-ravetto-border max-h-72 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div key={item.id} className="py-3 flex space-x-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-14 h-18 object-cover bg-ravetto-offwhite flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="uppercase font-medium text-ravetto-text truncate">
                      {item.productName}
                    </h4>
                    <p className="text-[11px] text-ravetto-muted">
                      {item.color} &bull; Size {item.size} &bull; Qty {item.quantity}
                    </p>
                    <Price amount={item.price * item.quantity} size="sm" className="mt-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-4 border-t border-ravetto-border">
              <label className="text-[11px] uppercase tracking-wider text-ravetto-muted block mb-1.5 font-medium">
                Privilege / Coupon Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. FIRSTRAVETTO"
                  className="flex-1 bg-ravetto-offwhite border border-ravetto-border px-3 py-2 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-ravetto-teal"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <p className="text-[11px] text-ravetto-teal mt-1 font-mono flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{appliedCoupon}</span>
                </p>
              )}
            </form>

            {/* Financial Calculations */}
            <div className="space-y-2 pt-4 border-t border-ravetto-border text-xs uppercase tracking-wider text-ravetto-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-ravetto-text">₹{cart.subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-ravetto-teal">
                  <span>Atelier Privilege</span>
                  <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-ravetto-text">
                  {cart.shippingFee === 0 ? 'Complimentary' : `₹${cart.shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-ravetto-text pt-2 border-t border-ravetto-border">
                <span>Total Amount Due</span>
                <span className="font-mono text-ravetto-teal font-bold">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Confirmation CTA */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              isLoading={isProcessing}
              variant="primary"
              size="lg"
              className="w-full shadow-xl"
            >
              Confirm & Pay &bull; ₹{finalTotal.toLocaleString('en-IN')}
            </Button>

            <p className="text-[10px] text-center text-ravetto-muted tracking-wide">
              By confirming, you authorize Razorpay to process ₹{finalTotal.toLocaleString('en-IN')} securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
