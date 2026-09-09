import React, { useEffect, useState } from 'react';
import { HeroEditorial } from '../features/editorial/HeroEditorial';
import { TrustStrip } from '../features/editorial/TrustStrip';
import { ShopByCategory } from '../features/editorial/ShopByCategory';
import { CollectionFeaturePanel } from '../features/editorial/CollectionFeaturePanel';
import { BestSellersSection } from '../features/editorial/BestSellersSection';
import { CraftsmanshipSection } from '../features/editorial/CraftsmanshipSection';
import { WornByCommunity } from '../features/editorial/WornByCommunity';
import { FinalBrandCTA } from '../features/editorial/FinalBrandCTA';
import { ProductCard } from '../components/commerce/ProductCard';
import { api } from '../api/client';
import { Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await api.getProducts({});
        setProducts(data);
      } catch (err) {
        console.error('Failed to load garments:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  // 4 items for New Arrivals
  const newArrivals = products.slice(0, 4);

  return (
    <div className="space-y-0 bg-[#FDFCF5]">
      {/* 1. Split Hero Section with Layered 3-Photo Collage */}
      <HeroEditorial
        onExplore={() => onNavigate('/shop')}
        onBrandStory={() => onNavigate('/about')}
      />

      {/* 2. Trust Strip (3 clean white cards) */}
      <TrustStrip />

      {/* 3. Shop by Category (4 photo cards) */}
      <ShopByCategory onSelectCategory={onNavigate} />

      {/* 4. New Arrivals (4-column product grid with Outfit typography & hover swap) */}
      <section className="py-16 sm:py-24 bg-[#FDFCF5]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 sm:pb-12 border-b border-[#5C4033]/10 gap-4 text-left">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#879E57]/10 text-[#879E57] text-[11px] font-outfit font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fresh Cuts</span>
              </div>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#5C4033] tracking-tight">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/shop?filter=new')}
              className="inline-flex items-center space-x-2 font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-[#879E57] hover:text-[#728848] group"
            >
              <span>View All New Pieces</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4-column Product Grid (2 on mobile, 2-3 on tablet, 4 on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4 animate-pulse">
                    <div className="aspect-[3/4] bg-white rounded-[26px]" />
                    <div className="h-4 bg-[#5C4033]/10 w-3/4 rounded-full" />
                    <div className="h-3 bg-[#5C4033]/05 w-1/2 rounded-full" />
                  </div>
                ))
              : newArrivals.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* 5. Collection Feature Section (Wide rounded editorial promotional panel) */}
      <CollectionFeaturePanel onExplore={() => onNavigate('/collections')} />

      {/* 6. Best Sellers Section (Distinct larger 3-column composition) */}
      <BestSellersSection
        products={products}
        isLoading={isLoading}
        onNavigate={onNavigate}
      />

      {/* 7. Fabric & Craftsmanship ("Built Beyond the Basics.") */}
      <CraftsmanshipSection />

      {/* 8. Customer / Social Proof ("Worn By You") */}
      <WornByCommunity />

      {/* 9. Final Brand CTA ("THE DETAILS MAKE THE DIFFERENCE.") */}
      <FinalBrandCTA
        onShopAll={() => onNavigate('/shop')}
        onDiscoverStory={() => onNavigate('/about')}
      />
    </div>
  );
};
