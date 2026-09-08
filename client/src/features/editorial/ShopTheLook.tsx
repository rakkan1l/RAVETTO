import React, { useState } from 'react';
import { Price } from '../../components/ui/Price';
import { ArrowRight } from 'lucide-react';

interface ShopTheLookProps {
  onNavigate: (path: string) => void;
}

export const ShopTheLook: React.FC<ShopTheLookProps> = ({ onNavigate }) => {
  const [activePin, setActivePin] = useState<number | null>(0);

  const lookItems = [
    {
      id: 0,
      name: 'THE ESSENTIAL TEE',
      color: 'Deep Teal',
      price: 1499,
      slug: 'essential-tee',
      x: '52%',
      y: '42%',
    },
    {
      id: 1,
      name: 'HEAVYWEIGHT OVERSIZED',
      color: 'Chalk Black',
      price: 1899,
      slug: 'heavyweight-oversized-tee',
      x: '68%',
      y: '60%',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-ravetto-border gap-6">
          <div>
            <span className="micro-caps text-ravetto-teal block mb-2">
              Atelier Lookbook
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              Shop The Look
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted max-w-sm leading-relaxed">
            Minimal layers worn with quiet assurance. Tap any pin to reveal garment specifications.
          </p>
        </div>

        {/* Lookbook Canvas */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-ravetto-offwhite-paper border border-ravetto-border overflow-hidden select-none">
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=2000&q=85"
            alt="Ravetto Atelier Lookbook Campaign"
            className="w-full h-full object-cover object-top"
          />

          {/* Interactive Pins */}
          {lookItems.map((item) => {
            const isActive = activePin === item.id;
            return (
              <div
                key={item.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: item.x, top: item.y }}
              >
                {/* Pin Button */}
                <button
                  onClick={() => setActivePin(isActive ? null : item.id)}
                  aria-label={`View ${item.name}`}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-ravetto-teal text-white ring-4 ring-ravetto-mint scale-110 shadow-lg'
                      : 'bg-white/95 text-ravetto-text hover:scale-110 shadow-md'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                </button>

                {/* Subtle Mini Popover */}
                {isActive && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 bg-ravetto-offwhite border border-ravetto-border p-3 shadow-xl text-left space-y-1 z-30">
                    <span className="text-[9px] uppercase tracking-widest text-ravetto-muted block">
                      {item.color}
                    </span>
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-ravetto-text truncate">
                      {item.name}
                    </h4>
                    <Price amount={item.price} size="sm" />
                    <button
                      onClick={() => onNavigate(`/products/${item.slug}`)}
                      className="w-full mt-2 pt-1.5 border-t border-ravetto-border text-[10px] font-medium uppercase tracking-widest text-ravetto-teal hover:underline flex items-center justify-between"
                    >
                      <span>View Product</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
