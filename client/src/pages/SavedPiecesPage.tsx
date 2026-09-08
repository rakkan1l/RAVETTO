import React, { useEffect } from 'react';
import { useSavedStore } from '../stores/savedStore';
import { useAuthStore } from '../stores/authStore';
import { ProductCard } from '../components/commerce/ProductCard';
import { Button } from '../components/ui/Button';

interface SavedPiecesPageProps {
  onNavigate: (path: string) => void;
}

export const SavedPiecesPage: React.FC<SavedPiecesPageProps> = ({ onNavigate }) => {
  const { savedItems, fetchSaved, isLoading } = useSavedStore();
  const { user, openAuthModal } = useAuthStore();

  useEffect(() => {
    fetchSaved();
  }, [user]);

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-ravetto-border text-left">
          <span className="micro-caps text-ravetto-teal block mb-2">
            Personal Atelier Archive
          </span>
          <div className="flex items-end justify-between">
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              Saved Pieces
            </h1>
            <span className="font-mono text-xs uppercase tracking-widest text-ravetto-muted">
              [{savedItems.length} Pieces]
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="pt-12">
          {isLoading ? (
            <div className="py-24 text-center text-xs uppercase tracking-widest text-ravetto-muted">
              Loading saved pieces...
            </div>
          ) : savedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {savedItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item.product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : (
            /* Branded Empty State */
            <div className="py-28 text-center space-y-4 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-full border border-ravetto-border mx-auto flex items-center justify-center text-ravetto-muted">
                <span className="font-editorial italic text-lg">rv</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-ravetto-text">
                  NOTHING SAVED YET.
                </h3>
                <p className="text-xs text-ravetto-muted">
                  Pieces worth returning to will appear here.
                </p>
              </div>
              <Button onClick={() => onNavigate('/shop')} variant="primary" size="md">
                Discover The Collection
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
