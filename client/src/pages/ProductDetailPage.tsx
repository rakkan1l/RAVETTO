import React, { useState, useEffect, useRef } from 'react';
import { api } from '../api/client';
import { Product, Color, Size, ProductVariant } from '../types';
import { ProductGallery } from '../components/commerce/ProductGallery';
import { ColorSelector } from '../components/commerce/ColorSelector';
import { SizeSelector } from '../components/commerce/SizeSelector';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Price } from '../components/ui/Price';
import { Button } from '../components/ui/Button';
import { StickyMobileBuyBar } from '../components/commerce/StickyMobileBuyBar';
import { useCartStore } from '../stores/cartStore';
import { useSavedStore } from '../stores/savedStore';
import { useUIStore } from '../stores/uiStore';
import { Bookmark, ShieldCheck, RefreshCw, Truck, ChevronDown } from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('fabric');

  const { addItem, isLoading: isAddingToCart } = useCartStore();
  const { isSaved, toggleSave } = useSavedStore();
  const { openSizeGuide, showToast } = useUIStore();

  const buySectionRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    async function loadGarment() {
      try {
        setIsLoading(true);
        const data = await api.getProductBySlug(slug);
        setProduct(data);

        // Initialize default color and size from first variant
        if (data && data.variants.length > 0) {
          const firstVariant = data.variants[0];
          setSelectedColor(firstVariant.color);
          setSelectedSize(firstVariant.size);
          setQuantity(1);
        }
      } catch (err) {
        console.error('Garment load error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadGarment();
    window.scrollTo(0, 0);
  }, [slug]);

  // Observer for mobile sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (!buySectionRef.current) return;
      const rect = buySectionRef.current.getBoundingClientRect();
      // Show sticky bar when the buy section bottom is scrolled past viewport
      setShowStickyBar(rect.bottom < 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-32 text-center text-xs uppercase tracking-widest text-ravetto-muted font-mono">
        Retrieving atelier garment profile...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-32 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-ravetto-text">Garment Not Found</h2>
        <button
          onClick={() => onNavigate('/shop')}
          className="text-xs uppercase tracking-widest text-ravetto-teal underline"
        >
          Return to Atelier Catalog
        </button>
      </div>
    );
  }

  // Extract unique colors and sizes
  const colors = Array.from(
    new Map(product.variants.map((v) => [v.color.id, v.color])).values()
  );

  const sizes = Array.from(
    new Map(product.variants.map((v) => [v.size.id, v.size])).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  // Available sizes for currently selected color
  const availableVariants = product.variants.filter(
    (v) => v.colorId === selectedColor?.id && v.stock > 0
  );
  const availableSizeIds = availableVariants.map((v) => v.sizeId);

  // Current matched variant
  const currentVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.colorId === selectedColor?.id && v.sizeId === selectedSize?.id
  );

  const saved = isSaved(product.id);

  const handleAddToCart = async () => {
    if (!currentVariant) {
      showToast('Please select size and color', 'error');
      return;
    }

    try {
      await addItem(currentVariant.id, quantity);
      showToast(`Added ${product.name} to bag`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to add piece to bag', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-ravetto-offwhite">
      {/* Top Editorial Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-5 text-[11px] uppercase tracking-[0.16em] text-ravetto-muted border-b border-ravetto-border flex items-center space-x-2">
        <button onClick={() => onNavigate('/shop')} className="hover:text-ravetto-text">
          Catalog
        </button>
        <span>/</span>
        {product.collection && (
          <>
            <button
              onClick={() => onNavigate(`/collections/${product.collection?.slug}`)}
              className="hover:text-ravetto-text"
            >
              {product.collection.name}
            </button>
            <span>/</span>
          </>
        )}
        <span className="text-ravetto-text font-medium">{product.name}</span>
      </div>

      {/* Main Split Layout */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Photography Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              selectedColorId={selectedColor?.id}
              productName={product.name}
            />
          </div>

          {/* Right Column: Sticky Purchase Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8 text-left" ref={buySectionRef}>
            {/* Title, Badge & Price */}
            <div className="space-y-3 pb-6 border-b border-ravetto-border">
              <div className="flex items-center justify-between">
                <span className="micro-caps text-ravetto-teal font-semibold">
                  {product.gsm} GSM &bull; {product.fit}
                </span>
                <button
                  onClick={() => toggleSave(product.id, selectedColor?.id, selectedSize?.id)}
                  className="p-1 text-ravetto-muted hover:text-ravetto-text transition-colors flex items-center space-x-1 text-[11px] uppercase tracking-wider"
                  aria-label={saved ? 'Remove piece from saved' : 'Save piece'}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-ravetto-teal text-ravetto-teal' : ''}`} />
                  <span>{saved ? 'Saved' : 'Save Piece'}</span>
                </button>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-ravetto-text">
                {product.name}
              </h1>

              <div className="pt-1">
                <Price
                  amount={product.price}
                  compareAtPrice={product.compareAtPrice}
                  size="xl"
                />
              </div>

              <p className="text-xs text-ravetto-muted leading-relaxed font-sans pt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* Color Selector */}
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onSelect={(c) => {
                setSelectedColor(c);
                // Check if existing size is available in new color
                const hasSize = product.variants.some(
                  (v) => v.colorId === c.id && v.sizeId === selectedSize?.id && v.stock > 0
                );
                if (!hasSize) {
                  const firstAvail = product.variants.find(
                    (v) => v.colorId === c.id && v.stock > 0
                  );
                  setSelectedSize(firstAvail ? firstAvail.size : null);
                }
              }}
            />

            {/* Size Selector */}
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              availableSizeIds={availableSizeIds}
              onSelect={setSelectedSize}
              onOpenSizeGuide={openSizeGuide}
            />

            {/* Quantity Selector & Stock Indicator */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-ravetto-muted font-medium mb-1.5">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={quantity}
                  max={currentVariant ? currentVariant.stock : 10}
                  onChange={setQuantity}
                />
              </div>

              <div className="text-right">
                {currentVariant ? (
                  currentVariant.stock > 0 ? (
                    <span className="text-[11px] uppercase tracking-[0.14em] text-ravetto-teal font-medium">
                      {currentVariant.stock < 8 ? `Only ${currentVariant.stock} remaining in stock` : 'In Stock & Ready to Dispatch'}
                    </span>
                  ) : (
                    <span className="text-[11px] uppercase tracking-[0.14em] text-red-600 font-medium">
                      Variant Sold Out
                    </span>
                  )
                ) : null}
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={!currentVariant || currentVariant.stock <= 0 || isAddingToCart}
                isLoading={isAddingToCart}
                variant="primary"
                size="lg"
                className="w-full shadow-lg"
              >
                Add to Bag &bull; ₹{(product.price * quantity).toLocaleString('en-IN')}
              </Button>

              <p className="text-[10px] uppercase tracking-[0.16em] text-center text-ravetto-muted">
                Complimentary Shipping On All Orders Over ₹2,000
              </p>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ravetto-border text-center text-[10px] uppercase tracking-wider text-ravetto-muted">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-4 h-4 text-ravetto-teal" />
                <span>Bluedart Air Express</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RefreshCw className="w-4 h-4 text-ravetto-teal" />
                <span>14-Day Quiet Returns</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-4 h-4 text-ravetto-teal" />
                <span>Zero Shrinkage Guarantee</span>
              </div>
            </div>

            {/* Structured Specifications Accordion */}
            <div className="pt-6 border-t border-ravetto-border divide-y divide-ravetto-border text-xs">
              {/* Accordion 1: Fabric & Craft */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full py-4 flex items-center justify-between text-left font-semibold uppercase tracking-[0.16em] text-ravetto-text"
                >
                  <span>Fabric & Craftsmanship Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'fabric' ? 'rotate-180 text-ravetto-teal' : 'text-ravetto-muted'
                    }`}
                  />
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="pb-4 space-y-2.5 text-ravetto-muted leading-relaxed">
                    <p><strong className="text-ravetto-text">Composition:</strong> {product.fabricComposition}</p>
                    <p><strong className="text-ravetto-text">Knit Weight:</strong> {product.gsm} GSM High-Gauge</p>
                    <p><strong className="text-ravetto-text">Collar:</strong> {product.neckType}</p>
                    <p><strong className="text-ravetto-text">Finish:</strong> {product.finish}</p>
                    <p><strong className="text-ravetto-text">Origin:</strong> Knitted & tailored in {product.origin}</p>
                    {product.craftsmanshipDetails && (
                      <p><strong className="text-ravetto-text">Atelier Notes:</strong> {product.craftsmanshipDetails}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Care Protocols */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                  className="w-full py-4 flex items-center justify-between text-left font-semibold uppercase tracking-[0.16em] text-ravetto-text"
                >
                  <span>Care Protocols</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'care' ? 'rotate-180 text-ravetto-teal' : 'text-ravetto-muted'
                    }`}
                  />
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-4 space-y-2 text-ravetto-muted leading-relaxed">
                    <p>{product.washCare}</p>
                    <p className="text-[11px]">
                      Because our cotton is pre-shrunk via steam stabilization, hot drying is unnecessary and will shorten fiber longevity.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Sizing & Model */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'model' ? null : 'model')}
                  className="w-full py-4 flex items-center justify-between text-left font-semibold uppercase tracking-[0.16em] text-ravetto-text"
                >
                  <span>Model Dimensions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'model' ? 'rotate-180 text-ravetto-teal' : 'text-ravetto-muted'
                    }`}
                  />
                </button>
                {activeAccordion === 'model' && (
                  <div className="pb-4 space-y-2 text-ravetto-muted leading-relaxed">
                    <p><strong className="text-ravetto-text">Height:</strong> {product.modelHeight || "6'1\" (185cm)"}</p>
                    <p><strong className="text-ravetto-text">Proportion:</strong> {product.modelSize || 'Wearing Size M'}</p>
                    <button
                      type="button"
                      onClick={openSizeGuide}
                      className="text-ravetto-teal underline font-medium uppercase tracking-wider text-[11px] pt-1 block"
                    >
                      Open Full Size Architecture Chart &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Garment Story Section */}
        {product.story && (
          <div className="mt-24 pt-16 border-t border-ravetto-border">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="micro-caps text-ravetto-teal block">
                The Narrative
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-ravetto-text">
                The Thought Behind The Cut
              </h2>
              <p className="text-sm text-ravetto-muted leading-relaxed font-sans">
                {product.story}
              </p>
            </div>
          </div>
        )}

        {/* Customer Reviews Spotlight */}
        <div className="mt-24 pt-16 border-t border-ravetto-border">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-ravetto-border">
              <h3 className="font-editorial text-2xl font-medium text-ravetto-text">
                Atelier Notes & Impressions
              </h3>
              <span className="font-mono text-xs text-ravetto-muted uppercase tracking-widest">
                [Verified Owners]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {(product.reviews || []).map((review) => (
                <div key={review.id} className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border text-left space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ravetto-text">{review.authorName}</span>
                    <span className="text-ravetto-teal text-[11px] uppercase tracking-wider font-mono">
                      Verified Purchase
                    </span>
                  </div>
                  <h4 className="text-xs uppercase tracking-wider font-medium text-ravetto-text">
                    "{review.title}"
                  </h4>
                  <p className="text-xs text-ravetto-muted leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Buy Bar */}
      {showStickyBar && (
        <StickyMobileBuyBar
          product={product}
          selectedVariant={currentVariant || null}
          onAddToCart={handleAddToCart}
          isLoading={isAddingToCart}
          onSelectSize={() => {
            buySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};
