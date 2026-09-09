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
    <div className="min-h-screen bg-[#FDFCF5]">
      {/* Top Editorial Breadcrumb */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-5 text-xs font-outfit uppercase tracking-[0.14em] text-[#8C7E7E] border-b border-[#5C4033]/08 flex items-center space-x-2">
        <button onClick={() => onNavigate('/shop')} className="hover:text-[#5C4033] transition-colors">
          Shop All
        </button>
        <span>/</span>
        {product.collection && (
          <>
            <button
              onClick={() => onNavigate(`/collections/${product.collection?.slug}`)}
              className="hover:text-[#5C4033] transition-colors"
            >
              {product.collection.name}
            </button>
            <span>/</span>
          </>
        )}
        <span className="text-[#5C4033] font-bold">{product.name}</span>
      </div>

      {/* Main Split Layout: 58-62% Gallery / 38-42% Sticky Info */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (58-60%): Large Photography Gallery */}
          <div className="lg:col-span-7 xl:col-span-7">
            <ProductGallery
              images={product.images}
              selectedColorId={selectedColor?.id}
              productName={product.name}
            />
          </div>

          {/* Right Column (40-42%): Sticky Product Information Panel */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 space-y-7 text-left font-outfit bg-white p-6 sm:p-8 rounded-[32px] border border-[#5C4033]/08 shadow-[0_4px_24px_rgba(92,64,51,0.04)]" ref={buySectionRef}>
            {/* Title, Badge & Price */}
            <div className="space-y-3 pb-6 border-b border-[#5C4033]/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#879E57] bg-[#879E57]/10 px-3 py-1 rounded-full">
                  {product.gsm} GSM &bull; {product.fit}
                </span>

                {/* Wishlist Heart Button */}
                <button
                  onClick={() => toggleSave(product.id, selectedColor?.id, selectedSize?.id)}
                  className="p-2 text-[#5C4033] hover:text-[#C93A5C] transition-colors flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold rounded-full group"
                  aria-label={saved ? 'Remove piece from saved' : 'Save piece'}
                >
                  <Bookmark className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${saved ? 'fill-[#C93A5C] text-[#C93A5C]' : ''}`} />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <h1 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-[#5C4033] leading-tight">
                {product.name}
              </h1>

              <div className="pt-1">
                <Price
                  amount={product.price}
                  compareAtPrice={product.compareAtPrice}
                  size="xl"
                />
              </div>

              <p className="text-sm text-[#5C4033]/80 leading-relaxed font-sans pt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* Color Selector with Large Swatches */}
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onSelect={(c) => {
                setSelectedColor(c);
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

            {/* Size Selector with Pill Shapes */}
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
                <span className="block text-xs uppercase tracking-[0.14em] text-[#8C7E7E] font-bold mb-1.5">
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
                    <span className="text-xs uppercase tracking-[0.12em] text-[#879E57] font-semibold block">
                      {currentVariant.stock < 8
                        ? `Only ${currentVariant.stock} remaining in stock`
                        : 'In Stock & Ready to Dispatch'}
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-[0.12em] text-[#C93A5C] font-semibold block">
                      Variant Sold Out
                    </span>
                  )
                ) : null}
              </div>
            </div>

            {/* Large ADD TO BAG Button (#879E57 Olive Pill) */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={!currentVariant || currentVariant.stock <= 0 || isAddingToCart}
                isLoading={isAddingToCart}
                variant="primary"
                size="lg"
                className="w-full py-4 text-sm font-bold shadow-[0_6px_20px_rgba(135,158,87,0.35)]"
              >
                ADD TO BAG &bull; ₹{(product.price * quantity).toLocaleString('en-IN')}
              </Button>

              <p className="text-xs uppercase tracking-[0.14em] text-center text-[#8C7E7E]">
                Complimentary Express Shipping Over ₹2,000
              </p>
            </div>

            {/* Under Button Trust Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#5C4033]/10 text-center text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8C7E7E]">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-4 h-4 text-[#879E57]" />
                <span>Bluedart Air Express</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RefreshCw className="w-4 h-4 text-[#879E57]" />
                <span>14-Day Exchanges</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#879E57]" />
                <span>Zero Shrinkage</span>
              </div>
            </div>

            {/* Product Details Accordions */}
            <div className="pt-4 border-t border-[#5C4033]/10 divide-y divide-[#5C4033]/08 text-xs sm:text-sm font-sans">
              {/* Accordion 1: Product Details */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')}
                  className="w-full py-4 flex items-center justify-between text-left font-outfit font-bold uppercase tracking-[0.14em] text-[#5C4033]"
                >
                  <span>Product Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'details' ? 'rotate-180 text-[#879E57]' : 'text-[#8C7E7E]'
                    }`}
                  />
                </button>
                {activeAccordion === 'details' && (
                  <div className="pb-4 space-y-2 text-[#5C4033]/80 leading-relaxed font-sans">
                    <p>{product.longDescription || product.shortDescription}</p>
                    <p>Designed for daily rotation with reinforced collar resilience and balanced shoulder drop.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full py-4 flex items-center justify-between text-left font-outfit font-bold uppercase tracking-[0.14em] text-[#5C4033]"
                >
                  <span>Fabric Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'fabric' ? 'rotate-180 text-[#879E57]' : 'text-[#8C7E7E]'
                    }`}
                  />
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="pb-4 space-y-2 text-[#5C4033]/80 leading-relaxed">
                    <p><strong className="text-[#5C4033]">Composition:</strong> {product.fabricComposition}</p>
                    <p><strong className="text-[#5C4033]">Yarn Weight:</strong> {product.gsm} GSM Dense Knit</p>
                    <p><strong className="text-[#5C4033]">Neck Ribbing:</strong> 1x1 Lycra-reinforced collar</p>
                    <p><strong className="text-[#5C4033]">Origin:</strong> Knitted & finished in Tiruppur, India</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Fit */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'fit' ? null : 'fit')}
                  className="w-full py-4 flex items-center justify-between text-left font-outfit font-bold uppercase tracking-[0.14em] text-[#5C4033]"
                >
                  <span>Fit & Proportions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'fit' ? 'rotate-180 text-[#879E57]' : 'text-[#8C7E7E]'
                    }`}
                  />
                </button>
                {activeAccordion === 'fit' && (
                  <div className="pb-4 space-y-2 text-[#5C4033]/80 leading-relaxed">
                    <p><strong className="text-[#5C4033]">Fit Style:</strong> {product.fit}</p>
                    <p><strong className="text-[#5C4033]">Model Specs:</strong> {product.modelHeight || "6'1\" (185cm)"} wearing Size {product.modelSize || 'M'}</p>
                    <button
                      type="button"
                      onClick={openSizeGuide}
                      className="text-[#879E57] font-semibold underline text-xs pt-1 block"
                    >
                      View Size Guide & Measurement Chart &rarr;
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 4: Care */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                  className="w-full py-4 flex items-center justify-between text-left font-outfit font-bold uppercase tracking-[0.14em] text-[#5C4033]"
                >
                  <span>Care Instructions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'care' ? 'rotate-180 text-[#879E57]' : 'text-[#8C7E7E]'
                    }`}
                  />
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-4 space-y-2 text-[#5C4033]/80 leading-relaxed">
                    <p>{product.washCare}</p>
                    <p className="text-xs text-[#8C7E7E]">Steam stabilized before assembly to guarantee zero dimensional variation.</p>
                  </div>
                )}
              </div>

              {/* Accordion 5: Delivery & Exchanges */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'delivery' ? null : 'delivery')}
                  className="w-full py-4 flex items-center justify-between text-left font-outfit font-bold uppercase tracking-[0.14em] text-[#5C4033]"
                >
                  <span>Delivery & Exchanges</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'delivery' ? 'rotate-180 text-[#879E57]' : 'text-[#8C7E7E]'
                    }`}
                  />
                </button>
                {activeAccordion === 'delivery' && (
                  <div className="pb-4 space-y-2 text-[#5C4033]/80 leading-relaxed">
                    <p>Dispatched within 24 hours via Bluedart Air Express (2-4 business days).</p>
                    <p>Hassle-free 14-day exchange protocol for unworn garments.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Garment Story Section */}
        {product.story && (
          <div className="mt-20 pt-16 border-t border-[#5C4033]/10">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-outfit font-semibold uppercase tracking-[0.2em] text-[#879E57] block">
                THE NARRATIVE
              </span>
              <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-[#5C4033]">
                The Thought Behind The Cut
              </h2>
              <p className="text-base text-[#5C4033]/85 leading-relaxed font-sans">
                {product.story}
              </p>
            </div>
          </div>
        )}

        {/* Customer Reviews Spotlight */}
        <div className="mt-20 pt-16 border-t border-[#5C4033]/10">
          <div className="max-w-[1360px] mx-auto text-left">
            <div className="flex items-center justify-between pb-8 border-b border-[#5C4033]/10">
              <h3 className="font-outfit text-2xl sm:text-3xl font-bold text-[#5C4033]">
                Verified Impressions
              </h3>
              <span className="font-outfit text-xs font-semibold text-[#8C7E7E] uppercase tracking-wider">
                [Owner Feedback]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              {(product.reviews || []).map((review) => (
                <div key={review.id} className="p-6 bg-white rounded-[24px] border border-[#5C4033]/08 shadow-[0_2px_12px_rgba(92,64,51,0.03)] text-left space-y-3">
                  <div className="flex items-center justify-between text-xs font-outfit">
                    <span className="font-bold text-[#5C4033]">{review.authorName}</span>
                    <span className="text-[#879E57] font-semibold text-[11px] uppercase tracking-wider">
                      Verified Owner
                    </span>
                  </div>
                  <h4 className="font-outfit text-sm uppercase tracking-wider font-bold text-[#5C4033]">
                    "{review.title}"
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C4033]/80 leading-relaxed font-sans">
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
