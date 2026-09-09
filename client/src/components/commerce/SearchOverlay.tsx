import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { api } from '../../api/client';
import { Price } from '../ui/Price';

interface SearchOverlayProps {
  onNavigate: (path: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onNavigate }) => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened & setup CMD+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useUIStore.getState().toggleSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Predictive search query with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await api.search(query.trim());
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const popularTerms = ['Oversized', 'Black Tee', 'Essentials', 'New Arrivals'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#5C4033]/50 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl mx-auto mt-16 sm:mt-24 px-4 sm:px-6 z-10 font-outfit"
          >
            <div className="bg-[#FFFFFF] border border-[#5C4033]/10 rounded-[28px] shadow-2xl overflow-hidden">
              {/* Search Bar Input */}
              <div className="flex items-center px-6 py-5 border-b border-[#5C4033]/10">
                <Search className="w-5 h-5 text-[#879E57] mr-3.5 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm sm:text-base text-[#5C4033] placeholder-[#8C7E7E]/70 font-medium focus:outline-none"
                />
                <button
                  onClick={closeSearch}
                  className="p-1 text-[#8C7E7E] hover:text-[#5C4033] transition-colors ml-2 rounded-full"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions / Collections / Popular Searches */}
              {!query.trim() && (
                <div className="p-6 sm:p-8 space-y-6 text-left">
                  {/* Popular Searches */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#879E57] block">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {popularTerms.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 rounded-full border border-[#5C4033]/15 text-xs font-semibold text-[#5C4033] hover:border-[#879E57] hover:bg-[#879E57]/10 hover:text-[#879E57] transition-colors shadow-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Collections Shortcut */}
                  <div className="space-y-3 pt-3 border-t border-[#5C4033]/10">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C7E7E] block">
                      Explore Collections
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'Oversized T-Shirts', path: '/shop?fit=oversized' },
                        { label: 'Classic Fit', path: '/shop?fit=regular' },
                        { label: 'Graphic Tees', path: '/shop?fit=graphic' },
                        { label: 'Essentials', path: '/shop' },
                      ].map((col) => (
                        <button
                          key={col.label}
                          onClick={() => {
                            closeSearch();
                            onNavigate(col.path);
                          }}
                          className="p-3 rounded-2xl bg-[#FDFCF5] border border-[#5C4033]/08 text-left hover:border-[#879E57] hover:bg-white transition-all shadow-sm"
                        >
                          <span className="block text-xs font-bold text-[#5C4033]">
                            {col.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {query.trim() && (
                <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
                  {isLoading ? (
                    <div className="py-12 text-center text-xs text-[#8C7E7E] uppercase tracking-wider font-outfit">
                      Searching catalog...
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8C7E7E] block text-left">
                        {results.length} {results.length === 1 ? 'Garment Found' : 'Garments Found'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {results.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              closeSearch();
                              onNavigate(`/products/${product.slug}`);
                            }}
                            className="flex items-center space-x-3.5 p-3 rounded-[20px] border border-[#5C4033]/08 hover:border-[#879E57] cursor-pointer transition-all bg-[#FDFCF5] hover:bg-white shadow-sm group text-left"
                          >
                            <div className="w-16 h-20 rounded-[14px] bg-[#F7F6EE] flex-shrink-0 overflow-hidden">
                              <img
                                src={product.images?.[0]?.url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-center space-y-1">
                              <h4 className="font-outfit text-xs sm:text-sm font-bold text-[#5C4033] group-hover:text-[#879E57] transition-colors leading-snug">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-[#8C7E7E] font-sans">
                                {product.variants?.[0]?.color?.name || 'Standard'} &bull; {product.fit}
                              </p>
                              <Price amount={product.price} size="sm" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#879E57] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Empty Search State */
                    <div className="py-12 text-center space-y-2 font-outfit">
                      <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C4033]">
                        No garments found.
                      </p>
                      <p className="text-xs text-[#8C7E7E] font-sans">
                        Try searching for 'oversized', 'black', or '240 GSM'.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
