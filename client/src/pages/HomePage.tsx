import React, { useEffect, useState } from 'react';
import { HeroEditorial } from '../features/editorial/HeroEditorial';
import { CollectionStory } from '../features/editorial/CollectionStory';
import { FabricExplorer } from '../features/editorial/FabricExplorer';
import { CraftDetails } from '../features/editorial/CraftDetails';
import { RavettoThread } from '../features/editorial/RavettoThread';
import { FitExplorer } from '../features/editorial/FitExplorer';
import { FindYourRavetto } from '../features/editorial/FindYourRavetto';
import { ShopTheLook } from '../features/editorial/ShopTheLook';
import { PackagingStory } from '../features/editorial/PackagingStory';
import { InsideRavetto } from '../features/editorial/InsideRavetto';
import { ProductCard } from '../components/commerce/ProductCard';
import { api } from '../api/client';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await api.getProducts({ featured: 'true' });
        setFeaturedProducts(data);
      } catch (err) {
        console.error('Failed to load featured garments:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Fashion Hero */}
      <HeroEditorial onExplore={() => onNavigate('/shop')} />

      {/* 2. Collection Story: Alternate Editorial Magazine Compositions */}
      <CollectionStory onNavigate={onNavigate} />

      {/* 3. Featured Permanent Garments */}
      <section className="py-24 sm:py-32 bg-ravetto-offwhite border-b border-ravetto-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 border-b border-ravetto-border gap-4">
            <div>
              <span className="micro-caps text-ravetto-teal block mb-1">
                Permanent Line
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-ravetto-text">
                The Foundational Pieces
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] font-medium text-ravetto-teal hover:text-ravetto-teal-dark group"
            >
              <span>View All Pieces</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-12">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-3 animate-pulse">
                    <div className="aspect-[3/4] bg-ravetto-border/40" />
                    <div className="h-4 bg-ravetto-border/40 w-3/4" />
                    <div className="h-3 bg-ravetto-border/30 w-1/2" />
                  </div>
                ))
              : featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* 4. Signature Fabric Explorer (240 GSM Supima Macro Hotspots) */}
      <FabricExplorer />

      {/* 5. Craft Details in Focus */}
      <CraftDetails />

      {/* 6. The Ravetto Thread (Signature Storytelling Line) */}
      <RavettoThread />

      {/* 7. Fit Architecture Explorer */}
      <FitExplorer />

      {/* 8. Find Your Ravetto (Comparison Matrix) */}
      <FindYourRavetto onNavigate={onNavigate} />

      {/* 9. Atelier Lookbook & Hotspots */}
      <ShopTheLook onNavigate={onNavigate} />

      {/* 10. Packaging Story ("Arrives as intended") */}
      <PackagingStory />

      {/* 11. Inside Ravetto (The 5 Disciplines) */}
      <InsideRavetto />
    </div>
  );
};
