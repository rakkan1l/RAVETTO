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

  const popularTerms = ['240 GSM', 'Heavyweight', 'Deep Teal', 'Supima Cotton', 'Mock Neck'];

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
            className="fixed inset-0 bg-ravetto-text/50 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl mx-auto mt-16 sm:mt-24 px-4 sm:px-6 z-10"
          >
            <div className="bg-ravetto-offwhite border border-ravetto-border shadow-2xl overflow-hidden">
              {/* Search Bar Input */}
              <div className="flex items-center px-6 py-5 border-b border-ravetto-border">
                <Search className="w-5 h-5 text-ravetto-teal mr-3.5 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH RAVETTO CATALOG (e.g. 240 GSM, Deep Teal, Supima...)"
                  className="w-full bg-transparent text-sm sm:text-base text-ravetto-text placeholder-ravetto-muted/60 tracking-[0.06em] uppercase focus:outline-none"
                />
                <button
                  onClick={closeSearch}
                  className="p-1 text-ravetto-muted hover:text-ravetto-text transition-colors ml-2"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions / Collections / Recent Searches */}
              {!query.trim() && (
                <div className="p-6 sm:p-8 space-y-6 text-left">
                  {/* Collections */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ravetto-teal block">
                      Collections
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'Essential 240 GSM', path: '/collections/essentials' },
                        { label: 'Heavyweight 280 GSM', path: '/shop?filter=heavyweight' },
                        { label: 'Architectural Cuts', path: '/materials' },
                        { label: 'Full Collection', path: '/shop' },
                      ].map((col) => (
                        <button
                          key={col.label}
                          onClick={() => {
                            closeSearch();
                            onNavigate(col.path);
                          }}
                          className="p-2.5 border border-ravetto-border text-left hover:border-ravetto-teal hover:bg-ravetto-offwhite-paper transition-all"
                        >
                          <span className="block text-[11px] font-medium uppercase tracking-wider text-ravetto-text">
                            {col.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Searches */}
                  <div className="space-y-2.5 pt-2 border-t border-ravetto-border/60">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ravetto-muted block">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {popularTerms.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 border border-ravetto-border text-xs uppercase tracking-wider text-ravetto-text hover:border-ravetto-teal hover:text-ravetto-teal transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  <div className="space-y-2 pt-2 border-t border-ravetto-border/60">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ravetto-muted block">
                      Recent Searches
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-ravetto-muted">
                      {['Heavyweight Oversized', 'Deep Teal M', '240 GSM'].map((r) => (
                        <button
                          key={r}
                          onClick={() => setQuery(r)}
                          className="hover:text-ravetto-teal underline transition-colors"
                        >
                          {r}
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
                    <div className="py-12 text-center text-xs text-ravetto-muted uppercase tracking-widest">
                      Searching atelier catalog...
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-3">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-ravetto-muted block">
                        {results.length} Pieces Discovered
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              closeSearch();
                              onNavigate(`/products/${product.slug}`);
                            }}
                            className="flex space-x-3.5 p-3 border border-ravetto-border/60 hover:border-ravetto-teal cursor-pointer transition-all bg-ravetto-offwhite-paper/40 group"
                          >
                            <div className="w-16 h-20 bg-ravetto-offwhite-paper flex-shrink-0 overflow-hidden">
                              <img
                                src={product.images?.[0]?.url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-center space-y-1">
                              <span className="text-[10px] uppercase tracking-widest text-ravetto-muted font-mono">
                                {product.gsm} GSM &bull; {product.fit}
                              </span>
                              <h4 className="text-xs uppercase tracking-wider font-medium text-ravetto-text group-hover:text-ravetto-teal transition-colors">
                                {product.name}
                              </h4>
                              <Price amount={product.price} size="sm" />
                            </div>
                            <ArrowRight className="w-4 h-4 self-center text-ravetto-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Empty Search State */
                    <div className="py-12 text-center space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] font-medium text-ravetto-text">
                        NOTHING FOUND.
                      </p>
                      <p className="text-xs text-ravetto-muted">
                        Try another phrase or explore the collection.
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
