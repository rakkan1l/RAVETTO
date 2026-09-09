import React from 'react';
import { Sparkles, RefreshCw, Truck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#879E57]" />,
      title: 'PREMIUM FABRIC',
      description: 'Carefully selected 240–280 GSM combed cotton made for everyday comfort.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#879E57]" />,
      title: 'EASY EXCHANGES',
      description: 'Simple 14-day size exchanges and hassle-free replacements.',
    },
    {
      icon: <Truck className="w-5 h-5 text-[#879E57]" />,
      title: 'SECURE DELIVERY',
      description: 'Reliable express courier shipping with end-to-end order tracking.',
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#FDFCF5]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#5C4033]/08 shadow-[0_2px_12px_rgba(92,64,51,0.03)] hover:shadow-[0_6px_20px_rgba(92,64,51,0.06)] transition-all duration-300 flex items-start space-x-4 text-left group"
            >
              <div className="p-3 rounded-2xl bg-[#879E57]/10 text-[#879E57] group-hover:scale-105 transition-transform duration-300 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1 pt-0.5">
                <h3 className="font-outfit text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#5C4033]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#8C7E7E] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
