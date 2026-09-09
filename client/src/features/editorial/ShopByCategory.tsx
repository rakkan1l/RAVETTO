import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ShopByCategoryProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      name: 'Oversized T-Shirts',
      slug: 'oversized',
      filter: 'oversized',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85',
      count: 'Heavyweight Drape',
    },
    {
      name: 'Classic Fit',
      slug: 'classic',
      filter: 'regular',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85',
      count: 'Timeless Proportions',
    },
    {
      name: 'Graphic Tees',
      slug: 'graphic',
      filter: 'graphic',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85',
      count: 'Minimal Screenprints',
    },
    {
      name: 'Essentials',
      slug: 'essentials',
      filter: 'essentials',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
      count: 'Foundational Tones',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF5]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 text-left gap-3">
          <div>
            <span className="font-outfit text-xs font-semibold uppercase tracking-[0.16em] text-[#879E57] block mb-1">
              Curated Silhouettes
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#5C4033] tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8C7E7E] font-sans">
            Find your everyday essential.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(`/shop?fit=${cat.filter}`)}
              className="group cursor-pointer relative rounded-[28px] overflow-hidden bg-white p-2 sm:p-2.5 border border-[#5C4033]/08 shadow-[0_4px_16px_rgba(92,64,51,0.04)] hover:shadow-[0_10px_28px_rgba(92,64,51,0.10)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-[22px] overflow-hidden bg-[#F7F6EE]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/70 via-transparent to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Bottom Left Content with Title and Small Arrow */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between text-left text-white">
                  <div>
                    <span className="text-[10px] font-outfit uppercase tracking-wider text-white/80 block mb-0.5">
                      {cat.count}
                    </span>
                    <h3 className="font-outfit text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#FDFCF5] transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#879E57] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
