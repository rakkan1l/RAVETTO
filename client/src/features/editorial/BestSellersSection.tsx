import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../../components/commerce/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

interface BestSellersSectionProps {
  products: Product[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  isLoading,
  onNavigate,
}) => {
  // Take top 3-4 products for best sellers
  const bestSellers = products.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF5] border-t border-[#5C4033]/06">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 sm:pb-12 border-b border-[#5C4033]/10 gap-4 text-left">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C93A5C]/10 text-[#C93A5C] text-[11px] font-outfit font-semibold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Most Coveted</span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#5C4033] tracking-tight">
              Best Sellers
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center space-x-2 font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-[#879E57] hover:text-[#728848] group"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Distinct 3-Column Larger Card Composition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-white rounded-[26px]" />
                  <div className="h-4 bg-[#5C4033]/10 w-3/4 rounded-full" />
                  <div className="h-3 bg-[#5C4033]/05 w-1/2 rounded-full" />
                </div>
              ))
            : bestSellers.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} onNavigate={onNavigate} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};
