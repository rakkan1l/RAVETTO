import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Collection } from '../types';
import { ProductCard } from '../components/commerce/ProductCard';

interface CollectionDetailPageProps {
  slug?: string;
  onNavigate: (path: string) => void;
}

export const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({ slug = 'the-foundations', onNavigate }) => {
  const [collection, setCollection] = useState<any | null>(null);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCollection() {
      try {
        setIsLoading(true);
        const [colData, allCols] = await Promise.all([
          api.getCollectionBySlug(slug),
          api.getCollections(),
        ]);
        setCollection(colData);
        setAllCollections(allCols);
      } catch (err) {
        console.error('Failed to load collection:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCollection();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-xs uppercase tracking-widest text-ravetto-muted">
        Loading atelier collection...
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="font-editorial text-2xl text-ravetto-text">Collection Not Found</h2>
        <button
          onClick={() => onNavigate('/shop')}
          className="text-xs uppercase tracking-widest text-ravetto-teal underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ravetto-offwhite">
      {/* Editorial Collection Hero */}
      <div className="relative aspect-[21/9] sm:aspect-[24/8] bg-ravetto-offwhite-paper border-b border-ravetto-border overflow-hidden">
        {collection.image && (
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover brightness-[0.88]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ravetto-text/80 via-ravetto-text/30 to-transparent flex items-end">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 pb-12 w-full text-white">
            <span className="micro-caps text-ravetto-mint block mb-2">
              Collection Edition
            </span>
            <h1 className="font-editorial text-3xl sm:text-6xl font-medium tracking-tight">
              {collection.name}
            </h1>
            {collection.heroHeadline && (
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/80 mt-2">
                {collection.heroHeadline}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16">
        {/* Navigation between collections */}
        <div className="flex flex-wrap items-center space-x-6 pb-12 border-b border-ravetto-border text-xs uppercase tracking-[0.16em]">
          <span className="text-ravetto-muted">Other Editions:</span>
          {allCollections.map((col) => (
            <button
              key={col.slug}
              onClick={() => onNavigate(`/collections/${col.slug}`)}
              className={`transition-colors py-1 ${
                col.slug === slug ? 'text-ravetto-teal font-bold border-b-2 border-ravetto-teal' : 'text-ravetto-text hover:text-ravetto-teal'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Collection Description */}
        <div className="max-w-2xl py-8">
          <p className="text-sm text-ravetto-muted leading-relaxed font-sans">
            {collection.description}
          </p>
        </div>

        {/* Products in Collection */}
        <div className="pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {(collection.products || []).map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
