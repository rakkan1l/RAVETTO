import React, { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Price } from '../components/ui/Price';
import { ProductCard } from '../components/commerce/ProductCard';
import { api } from '../api/client';
import { Product } from '../types';
import { Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, updateItem, removeItem, isLoading } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await api.getProducts({ featured: 'true' });
        setRecommendations(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      }
    }
    loadRecommendations();
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'RAVETTO10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try RAVETTO10');
    }
  };

  const discountAmount = promoApplied ? (cart ? Math.round(cart.subtotal * 0.1) : 0) : 0;
  const finalTotal = cart ? Math.max(0, cart.total - discountAmount) : 0;

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="py-10 sm:py-16 bg-[#FDFCF5] min-h-screen">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 font-outfit text-left">
        {/* Page Title */}
        <div className="pb-8 mb-8 border-b border-[#5C4033]/10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#879E57] block mb-1">
            Shopping Bag
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#5C4033] tracking-tight">
            Your Cart {cart && `(${cart.itemCount})`}
          </h1>
        </div>

        {isEmpty ? (
          /* Empty Bag State */
          <div className="py-20 text-center space-y-4 bg-white rounded-[32px] p-8 border border-[#5C4033]/08 shadow-sm max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-[#5C4033]">Your bag is empty</h2>
            <p className="text-sm text-[#8C7E7E] font-sans">
              Discover our permanent cotton essentials designed for everyday living.
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="px-8 py-3.5 rounded-full bg-[#879E57] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:bg-[#728848] transition-colors"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          /* Cart Grid: Left Items / Right Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[26px] p-4 sm:p-5 border border-[#5C4033]/08 shadow-sm flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
                >
                  {/* Photo */}
                  <div
                    onClick={() => onNavigate(`/products/${item.productSlug}`)}
                    className="w-24 h-28 rounded-[18px] bg-[#F7F6EE] overflow-hidden cursor-pointer shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <h3
                      onClick={() => onNavigate(`/products/${item.productSlug}`)}
                      className="text-base font-bold text-[#5C4033] hover:text-[#879E57] cursor-pointer transition-colors"
                    >
                      {item.productName}
                    </h3>
                    <p className="text-xs text-[#8C7E7E] font-sans">
                      Colour: <strong className="text-[#5C4033]">{item.color}</strong> &bull; Size:{' '}
                      <strong className="text-[#5C4033]">{item.size}</strong>
                    </p>
                    <div className="pt-1">
                      <Price amount={item.price} size="sm" />
                    </div>
                  </div>

                  {/* Controls & Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto space-y-0 sm:space-y-2">
                    <div className="flex items-center space-x-3">
                      <QuantitySelector
                        quantity={item.quantity}
                        max={item.stock}
                        onChange={(newQty) => updateItem(item.id, newQty)}
                        disabled={isLoading}
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-[#8C7E7E] hover:text-[#C93A5C] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#5C4033]">
                      ₹{item.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white p-6 sm:p-8 rounded-[32px] border border-[#5C4033]/08 shadow-sm space-y-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-[#5C4033] pb-4 border-b border-[#5C4033]/10">
                Order Summary
              </h2>

              {/* Rows */}
              <div className="space-y-3 text-xs sm:text-sm font-sans">
                <div className="flex justify-between text-[#8C7E7E]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#5C4033] font-outfit">
                    ₹{cart.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-[#8C7E7E]">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#5C4033] font-outfit">
                    {cart.shippingFee === 0 ? 'Free' : `₹${cart.shippingFee}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#879E57]">
                    <span>Discount (10%)</span>
                    <span className="font-bold font-outfit">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-[#5C4033] pt-4 border-t border-[#5C4033]/10 font-outfit">
                  <span>Total</span>
                  <span className="text-xl text-[#879E57]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code"
                      className="w-full bg-[#FDFCF5] border border-[#5C4033]/15 rounded-full px-4 py-2.5 text-xs font-outfit font-semibold uppercase text-[#5C4033] focus:outline-none focus:border-[#879E57]"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#8C7E7E] absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#5C4033] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#483126] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-[#879E57] font-semibold mt-1.5 font-sans">
                    Promo RAVETTO10 applied (10% OFF)!
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-[#C93A5C] font-semibold mt-1.5 font-sans">
                    {promoError}
                  </p>
                )}
              </form>

              {/* Checkout Button */}
              <button
                onClick={() => onNavigate('/checkout')}
                className="w-full py-4 rounded-full bg-[#879E57] hover:bg-[#728848] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_6px_20px_rgba(135,158,87,0.3)] hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-[#8C7E7E] font-sans flex items-center justify-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#879E57]" />
                <span>SSL Encrypted Checkout &bull; 14-Day Exchanges</span>
              </div>
            </div>
          </div>
        )}

        {/* Optional Recommendations: You May Also Like */}
        {recommendations.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#5C4033]/10 text-left">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#879E57] block mb-1">
                Curated Additions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#5C4033]">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
