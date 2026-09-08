import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { api } from '../api/client';
import { ProductCard } from '../components/commerce/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

interface ShopPageProps {
  onNavigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [selectedFit, setSelectedFit] = useState<string>('');
  const [selectedGsm, setSelectedGsm] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await api.getProducts({
          fit: selectedFit || undefined,
          gsmMin: selectedGsm || undefined,
          gsmMax: selectedGsm || undefined,
          sort: selectedSort,
        });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching garments:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [selectedFit, selectedGsm, selectedSort]);

  const clearFilters = () => {
    setSelectedFit('');
    setSelectedGsm(null);
    setSelectedSort('featured');
  };

  const hasActiveFilters = Boolean(selectedFit || selectedGsm || selectedSort !== 'featured');

  return (
    <div className="py-12 sm:py-20 bg-ravetto-offwhite min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Page Header */}
        <div className="pb-12 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block mb-2">
            The Atelier Archive
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
              All Garments
            </h1>
            <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted font-mono">
              [{products.length} Permanent Pieces]
            </p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="py-6 border-b border-ravetto-border flex flex-wrap items-center justify-between gap-4">
          {/* Desktop Filter Chips */}
          <div className="hidden md:flex items-center space-x-6 text-xs uppercase tracking-[0.14em]">
            {/* Fit Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-ravetto-muted">Fit:</span>
              {['', 'Regular', 'Oversized', 'Tailored'].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`px-2.5 py-1 transition-colors ${
                    selectedFit === fit
                      ? 'bg-ravetto-teal text-white font-medium'
                      : 'text-ravetto-text hover:text-ravetto-teal'
                  }`}
                >
                  {fit || 'All'}
                </button>
              ))}
            </div>

            {/* GSM Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-ravetto-muted">GSM:</span>
              {[null, 240, 260, 280].map((gsm) => (
                <button
                  key={gsm || 'all'}
                  onClick={() => setSelectedGsm(gsm)}
                  className={`px-2.5 py-1 font-mono transition-colors ${
                    selectedGsm === gsm
                      ? 'bg-ravetto-teal text-white font-medium'
                      : 'text-ravetto-text hover:text-ravetto-teal'
                  }`}
                >
                  {gsm ? `${gsm} GSM` : 'All'}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] uppercase tracking-widest text-red-600 hover:underline flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="md:hidden flex items-center space-x-2 text-xs uppercase tracking-wider font-medium text-ravetto-text border border-ravetto-border px-3.5 py-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-ravetto-teal" />
            <span>Filter Garments</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.14em]">
            <span className="text-ravetto-muted">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border border-ravetto-border px-3 py-1 text-xs text-ravetto-text focus:outline-none focus:border-ravetto-teal"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Sheet Dropdown */}
        {isFilterDrawerOpen && (
          <div className="md:hidden p-5 border-b border-ravetto-border bg-ravetto-offwhite-paper space-y-4 text-xs">
            <div>
              <span className="font-semibold uppercase tracking-wider block mb-2">Fit</span>
              <div className="flex flex-wrap gap-2">
                {['', 'Regular', 'Oversized', 'Tailored'].map((fit) => (
                  <button
                    key={fit}
                    onClick={() => {
                      setSelectedFit(fit);
                      setIsFilterDrawerOpen(false);
                    }}
                    className={`px-3 py-1.5 border ${
                      selectedFit === fit ? 'bg-ravetto-teal text-white border-ravetto-teal' : 'border-ravetto-border text-ravetto-text'
                    }`}
                  >
                    {fit || 'All Fits'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold uppercase tracking-wider block mb-2">GSM Weight</span>
              <div className="flex flex-wrap gap-2">
                {[null, 240, 260, 280].map((gsm) => (
                  <button
                    key={gsm || 'all'}
                    onClick={() => {
                      setSelectedGsm(gsm);
                      setIsFilterDrawerOpen(false);
                    }}
                    className={`px-3 py-1.5 border font-mono ${
                      selectedGsm === gsm ? 'bg-ravetto-teal text-white border-ravetto-teal' : 'border-ravetto-border text-ravetto-text'
                    }`}
                  >
                    {gsm ? `${gsm} GSM` : 'All Weights'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Catalog Grid */}
        <div className="pt-12">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3 animate-pulse">
                  <div className="aspect-[3/4] bg-ravetto-border/40" />
                  <div className="h-4 bg-ravetto-border/40 w-3/4" />
                  <div className="h-3 bg-ravetto-border/30 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <p className="font-editorial text-2xl text-ravetto-text">No garments match current criteria.</p>
              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-widest text-ravetto-teal underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
