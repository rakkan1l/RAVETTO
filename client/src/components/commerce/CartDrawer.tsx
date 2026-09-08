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
      title="Your Bag"
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
              Your Bag is Quiet.
            </h3>
            <p className="text-xs text-ravetto-muted max-w-xs">
              Pieces chosen with intention will rest here until you are ready.
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
            Shop Ravetto
          </Button>
        </div>
      ) : (
        /* Active Bag Flow */
        <div className="flex flex-col h-full justify-between">
          {/* Top: Complimentary Shipping Bar */}
          <div className="pb-5 border-b border-ravetto-border">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-medium mb-2 text-ravetto-text">
              <span className="flex items-center space-x-1.5">
                {cart.isFreeShipping && <Sparkles className="w-3.5 h-3.5 text-ravetto-teal" />}
                <span>
                  {cart.isFreeShipping
                    ? 'Complimentary Shipping Unlocked'
                    : `₹${cart.amountNeededForFreeShipping.toLocaleString('en-IN')} Away From Complimentary Shipping`}
                </span>
              </span>
              <span className="font-mono">{cart.freeShippingProgress}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-ravetto-border/60 overflow-hidden">
              <div
                className="h-full bg-ravetto-teal transition-all duration-500 ease-out"
                style={{ width: `${cart.freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Middle: Items List */}
          <div className="flex-1 overflow-y-auto py-4 divide-y divide-ravetto-border/60">
            {cart.items.map((item) => (
              <div key={item.id} className="py-4 flex space-x-3.5 text-left">
                {/* Image */}
                <div
                  className="w-20 h-24 bg-ravetto-offwhite-paper flex-shrink-0 cursor-pointer overflow-hidden"
                  onClick={() => {
                    closeCart();
                    onNavigate(`/products/${item.productSlug}`);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4
                        className="text-xs uppercase tracking-[0.12em] font-medium text-ravetto-text hover:text-ravetto-teal cursor-pointer"
                        onClick={() => {
                          closeCart();
                          onNavigate(`/products/${item.productSlug}`);
                        }}
                      >
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ravetto-muted hover:text-red-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-ravetto-muted mt-0.5">
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
                    <span className="text-xs font-mono font-medium text-ravetto-text">
                      ₹{item.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: Subtotal & Checkout Button */}
          <div className="pt-4 border-t border-ravetto-border space-y-3">
            <div className="flex justify-between text-xs uppercase tracking-[0.14em] text-ravetto-muted">
              <span>Subtotal</span>
              <span className="font-mono font-medium text-ravetto-text">
                ₹{cart.subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between text-xs uppercase tracking-[0.14em] text-ravetto-muted">
              <span>Estimated Shipping</span>
              <span className="font-mono font-medium text-ravetto-text">
                {cart.shippingFee === 0 ? 'Complimentary' : `₹${cart.shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-sm uppercase tracking-[0.16em] font-medium text-ravetto-text pt-2 border-t border-ravetto-border">
              <span>Estimated Total</span>
              <span className="font-mono font-bold text-ravetto-teal">
                ₹{cart.total.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-[10px] text-ravetto-muted tracking-wide text-center">
              Taxes calculated at checkout &bull; 14-day quiet returns
            </p>

            <Button
              onClick={() => {
                closeCart();
                onNavigate('/checkout');
              }}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};
