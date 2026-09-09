import React from 'react';
import { Drawer } from '../ui/Drawer';
import { useCartStore } from '../../stores/cartStore';
import { QuantitySelector } from '../ui/QuantitySelector';
import { Button } from '../ui/Button';
import { Price } from '../ui/Price';
import { Trash2, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCartStore();

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeCart}
      title="YOUR BAG"
      subtitle={cart ? `[${cart.itemCount} ${cart.itemCount === 1 ? 'Piece' : 'Pieces'}]` : ''}
      maxWidth="max-w-md"
    >
      {isEmpty ? (
        /* Empty State */
        <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16 space-y-5">
          <div className="w-12 h-12 rounded-full border border-ravetto-border flex items-center justify-center text-ravetto-muted">
            <span className="font-editorial italic text-lg">rv</span>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-ravetto-text">
              YOUR BAG IS QUIET.
            </h3>
            <p className="text-xs text-ravetto-muted max-w-xs">
              Discover the collection.
            </p>
          </div>
          <Button
            onClick={() => {
              closeCart();
              onNavigate('/shop');
            }}
            variant="primary"
            size="md"
          >
            Discover the Collection
          </Button>
        </div>
      ) : (
        /* Active Bag Flow */
        <div className="flex flex-col h-full justify-between font-outfit text-left">
          {/* Top: Complimentary Shipping Bar */}
          <div className="pb-5 border-b border-[#5C4033]/10">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 text-[#5C4033]">
              <span>
                {cart.isFreeShipping
                  ? 'Complimentary Delivery Unlocked'
                  : `You're ₹${cart.amountNeededForFreeShipping.toLocaleString('en-IN')} away from free delivery`}
              </span>
              <span className="text-xs text-[#879E57] font-bold">{cart.freeShippingProgress}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#5C4033]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#879E57] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${cart.freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Middle: Items List */}
          <div className="flex-1 overflow-y-auto py-4 divide-y divide-[#5C4033]/08">
            {cart.items.map((item) => (
              <div key={item.id} className="py-4 flex space-x-3.5 text-left">
                {/* Rounded Image Container */}
                <div
                  className="w-20 h-24 rounded-[16px] bg-white p-1 border border-[#5C4033]/10 flex-shrink-0 cursor-pointer overflow-hidden shadow-sm"
                  onClick={() => {
                    closeCart();
                    onNavigate(`/products/${item.productSlug}`);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover rounded-[12px]"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4
                        className="text-xs sm:text-sm font-bold text-[#5C4033] hover:text-[#879E57] cursor-pointer transition-colors"
                        onClick={() => {
                          closeCart();
                          onNavigate(`/products/${item.productSlug}`);
                        }}
                      >
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#8C7E7E] hover:text-[#C93A5C] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#8C7E7E] mt-0.5 font-sans">
                      {item.color} &bull; Size {item.size}
                    </p>

                    <div className="mt-1">
                      <Price amount={item.price} size="sm" />
                    </div>
                  </div>

                  {/* Quantity & Line Total */}
                  <div className="flex items-center justify-between pt-2">
                    <QuantitySelector
                      quantity={item.quantity}
                      max={item.stock}
                      onChange={(newQty) => updateItem(item.id, newQty)}
                      disabled={isLoading}
                    />
                    <span className="text-xs font-bold text-[#5C4033]">
                      ₹{item.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: Subtotal & Dual Buttons (View Bag & Checkout) */}
          <div className="pt-4 border-t border-[#5C4033]/10 space-y-3">
            <div className="flex justify-between text-xs uppercase tracking-wider text-[#8C7E7E] font-semibold">
              <span>Subtotal</span>
              <span className="font-bold text-[#5C4033]">
                ₹{cart.subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between text-xs uppercase tracking-wider text-[#8C7E7E] font-semibold">
              <span>Delivery</span>
              <span className="font-bold text-[#5C4033]">
                {cart.shippingFee === 0 ? 'Free' : `₹${cart.shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-sm uppercase tracking-wider font-bold text-[#5C4033] pt-2 border-t border-[#5C4033]/10">
              <span>Total</span>
              <span className="text-base text-[#879E57]">
                ₹{cart.total.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('/cart');
                }}
                className="w-full py-3.5 rounded-full border border-[#5C4033]/20 bg-white text-[#5C4033] hover:bg-[#5C4033] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                View Bag
              </button>
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('/checkout');
                }}
                className="w-full py-3.5 rounded-full bg-[#879E57] hover:bg-[#728848] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
