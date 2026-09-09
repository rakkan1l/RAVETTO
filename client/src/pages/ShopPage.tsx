import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { api } from '../api/client';
import { ProductCard } from '../components/commerce/ProductCard';
import { SlidersHorizontal, X, Search, Check, ChevronDown } from 'lucide-react';

interface ShopPageProps {
  onNavigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFit, setSelectedFit] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>('featured');

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await api.getProducts({
          fit: selectedFit || undefined,
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
  }, [selectedFit, selectedSort]);

  // Client-side filtering for search, category, size, color, price & availability
  const filteredProducts = products.filter((p) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      const matchFabric = p.fabricComposition.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchFabric) return false;
    }

    // Category
    if (selectedCategory) {
      const catMatch =
        p.collection?.name?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.collection?.slug?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(selectedCategory.toLowerCase());
      if (!catMatch) return false;
    }

    // Fit
    if (selectedFit && p.fit.toLowerCase() !== selectedFit.toLowerCase()) {
      return false;
    }

    // Size
    if (selectedSize) {
      const hasSize = p.variants.some((v) => v.size.name === selectedSize && v.stock > 0);
      if (!hasSize) return false;
    }

    // Color
    if (selectedColor) {
      const hasColor = p.variants.some(
        (v) => v.color.name.toLowerCase() === selectedColor.toLowerCase()
      );
      if (!hasColor) return false;
    }

    // Max Price
    if (p.price > maxPrice) {
      return false;
    }

    // In Stock Only
    if (inStockOnly) {
      const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
      if (totalStock <= 0) return false;
    }

    return true;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedFit('');
    setSelectedSize('');
    setSelectedColor('');
    setMaxPrice(3000);
    setInStockOnly(false);
    setSelectedSort('featured');
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
      selectedCategory ||
      selectedFit ||
      selectedSize ||
      selectedColor ||
      maxPrice < 3000 ||
      inStockOnly ||
      selectedSort !== 'featured'
  );

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Black', 'Off-White', 'Olive', 'Espresso', 'Slate Grey'];
  const availableFits = ['Oversized', 'Relaxed', 'Regular', 'Boxy'];
  const availableCategories = ['T-Shirts', 'Heavyweight', 'Essentials', 'Graphic'];

  return (
    <div className="py-8 sm:py-14 bg-[#FDFCF5] min-h-screen">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* 1. Wide Rounded Introduction Panel */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#FFFFFF] border border-[#5C4033]/08 p-8 sm:p-12 lg:p-14 mb-10 sm:mb-14 shadow-[0_4px_24px_rgba(92,64,51,0.03)] text-left">
          <div className="max-w-2xl space-y-4">
            <span className="font-outfit text-xs font-semibold uppercase tracking-[0.2em] text-[#879E57] block">
              CATALOG ARCHIVE
            </span>
            <h1 className="font-outfit text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#5C4033] tracking-tight leading-[1.08]">
              Shop All
            </h1>
            <p className="text-base sm:text-lg text-[#5C4033]/85 font-sans leading-relaxed">
              Everyday essentials made with thoughtful fabric, fit and construction.
            </p>

            {/* Embedded Search Input */}
            <div className="pt-3 max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by fit, GSM, or color..."
                className="w-full bg-[#FDFCF5] border border-[#5C4033]/15 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-[#5C4033] placeholder-[#8C7E7E] focus:outline-none focus:border-[#879E57] transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#8C7E7E] absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7E7E] hover:text-[#5C4033]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Toolbar (Mobile Filter Trigger & Desktop Sort Header) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#5C4033]/10">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 rounded-full bg-white border border-[#5C4033]/15 text-[#5C4033] text-xs font-outfit font-semibold tracking-wider uppercase flex items-center space-x-2 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#879E57]" />
              <span>Filters</span>
            </button>

            <span className="font-outfit text-xs sm:text-sm font-semibold text-[#5C4033] tracking-wider">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Garment' : 'Garments'}
            </span>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-2 text-xs font-outfit">
            <span className="text-[#8C7E7E] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-white border border-[#5C4033]/15 rounded-full pl-4 pr-8 py-2 text-xs font-semibold text-[#5C4033] focus:outline-none focus:border-[#879E57] cursor-pointer shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C4033] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. Main Split Layout (Left Filter Sidebar / Right Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-7 text-left sticky top-28 bg-white p-6 rounded-[28px] border border-[#5C4033]/08 shadow-[0_2px_12px_rgba(92,64,51,0.03)] font-outfit">
            <div className="flex items-center justify-between pb-3 border-b border-[#5C4033]/10">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5C4033]">
                Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] uppercase tracking-wider text-[#C93A5C] hover:underline font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Fit Filter */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7E7E] block">
                Fit
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableFits.map((fit) => {
                  const isSelected = selectedFit.toLowerCase() === fit.toLowerCase();
                  return (
                    <button
                      key={fit}
                      onClick={() => setSelectedFit(isSelected ? '' : fit)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#879E57] text-white shadow-sm'
                          : 'bg-[#FDFCF5] text-[#5C4033] hover:bg-[#5C4033]/05 border border-[#5C4033]/10'
                      }`}
                    >
                      {fit}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7E7E] block">
                Size
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {availableSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(isSelected ? '' : size)}
                      className={`py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#879E57] text-white shadow-sm'
                          : 'bg-[#FDFCF5] text-[#5C4033] hover:bg-[#5C4033]/05 border border-[#5C4033]/10'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colour Filter */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7E7E] block">
                Colour
              </span>
              <div className="space-y-1.5">
                {availableColors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(isSelected ? '' : color)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        isSelected ? 'bg-[#879E57]/10 text-[#879E57]' : 'text-[#5C4033] hover:bg-[#FDFCF5]'
                      }`}
                    >
                      <span>{color}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#879E57]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Maximum Price Range */}
            <div className="space-y-2.5 pt-2 border-t border-[#5C4033]/10">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="uppercase tracking-wider text-[#8C7E7E]">Max Price</span>
                <span className="text-[#5C4033]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#879E57] cursor-pointer"
              />
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-2 border-t border-[#5C4033]/10">
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-[#5C4033]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#879E57] focus:ring-[#879E57] accent-[#879E57]"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4 animate-pulse">
                    <div className="aspect-[3/4] bg-white rounded-[26px]" />
                    <div className="h-4 bg-[#5C4033]/10 w-3/4 rounded-full" />
                    <div className="h-3 bg-[#5C4033]/05 w-1/2 rounded-full" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-4 bg-white rounded-[32px] p-8 border border-[#5C4033]/08">
                <h3 className="font-outfit text-2xl font-bold text-[#5C4033]">
                  No garments match your filters
                </h3>
                <p className="text-xs sm:text-sm text-[#8C7E7E]">
                  Try adjusting or clearing your filters to see more pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-full bg-[#879E57] text-white font-outfit text-xs font-semibold tracking-wider uppercase shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. Mobile Filter Drawer (Bottom Sheet) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-[#5C4033]/50 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <div className="relative bg-[#FDFCF5] rounded-t-[32px] max-h-[85vh] overflow-y-auto p-6 space-y-6 text-left shadow-2xl font-outfit border-t border-[#5C4033]/10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-[#5C4033]/10">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#5C4033]">
                Filter Pieces
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#5C4033]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Fit */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#8C7E7E] block">Fit</span>
              <div className="flex flex-wrap gap-2">
                {availableFits.map((fit) => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(selectedFit === fit ? '' : fit)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold ${
                      selectedFit === fit
                        ? 'bg-[#879E57] text-white'
                        : 'bg-white text-[#5C4033] border border-[#5C4033]/10'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Size */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#8C7E7E] block">Size</span>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    className={`w-11 h-11 rounded-full text-xs font-bold flex items-center justify-center ${
                      selectedSize === size
                        ? 'bg-[#879E57] text-white'
                        : 'bg-white text-[#5C4033] border border-[#5C4033]/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#8C7E7E] uppercase">Max Price</span>
                <span className="text-[#5C4033]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#879E57]"
              />
            </div>

            {/* Mobile CTA */}
            <div className="pt-4 flex items-center space-x-3">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-3.5 rounded-full border border-[#5C4033]/20 text-[#5C4033] text-xs font-bold uppercase tracking-wider"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-3.5 rounded-full bg-[#879E57] text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
