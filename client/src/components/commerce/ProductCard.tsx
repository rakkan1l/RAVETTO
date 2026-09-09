import React, { useState } from 'react';
import { Product } from '../../types';
import { Price } from '../ui/Price';
import { Heart, Plus } from 'lucide-react';
import { useSavedStore } from '../../stores/savedStore';
import { useUIStore } from '../../stores/uiStore';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(
    product.images[0]?.colorId || null
  );

  const { isSaved, toggleSave } = useSavedStore();
  const { openQuickShop } = useUIStore();
  const saved = isSaved(product.id);

  // Primary image based on selected color or default
  const primaryImage =
    product.images.find((img) =>
      selectedColorId ? img.colorId === selectedColorId : img.isPrimary
    ) || product.images[0];

  // Secondary lifestyle/alternate angle for crossfade
  const secondaryImage =
    product.images.find(
      (img) => img.url !== primaryImage?.url && (!selectedColorId || img.colorId === selectedColorId)
    ) || product.images[1] || primaryImage;

  // Extract unique colors available
  const availableColors = Array.from(
    new Map(product.variants.map((v) => [v.color.id, v.color])).values()
  );

  return (
    <div
      className="group relative flex flex-col text-left transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Canvas Container (Rounded 24-28px with soft border) */}
      <div
        className="relative aspect-[3/4] w-full rounded-[26px] bg-[#FFFFFF] p-2 border border-[#5C4033]/08 shadow-[0_2px_12px_rgba(92,64,51,0.03)] group-hover:shadow-[0_8px_24px_rgba(92,64,51,0.08)] transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={() => onNavigate(`/products/${product.slug}`)}
      >
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#F7F6EE]">
          {/* Base Image */}
          <img
            src={primaryImage?.url}
            alt={primaryImage?.alt || product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-350 ease-out group-hover:scale-[1.02] transition-transform duration-500 ${
              isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Hover Secondary / Model Image */}
          {secondaryImage && (
            <img
              src={secondaryImage.url}
              alt={secondaryImage.alt || product.name}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-350 ease-out group-hover:scale-[1.02] transition-transform duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Fit & GSM Badges */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1">
            <span className="bg-white/90 backdrop-blur-sm text-[#5C4033] text-[9px] sm:text-[10px] font-outfit uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold shadow-sm border border-[#5C4033]/05">
              {product.fit}
            </span>
            <span className="bg-[#879E57] text-white text-[9px] font-outfit uppercase tracking-wider px-2 py-0.5 rounded-full font-medium shadow-sm">
              {product.gsm} GSM
            </span>
          </div>

          {/* Wishlist Heart Action (Brown outline -> pink hover -> #C93A5C fill) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(product.id, selectedColorId || undefined);
            }}
            aria-label={saved ? 'Remove from wishlist' : 'Save piece'}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-[#5C4033] hover:text-[#C93A5C] transition-all duration-200 z-20 shadow-sm group/heart focus-visible:outline-none"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/heart:scale-110 ${
                saved ? 'fill-[#C93A5C] text-[#C93A5C]' : 'text-[#5C4033]'
              }`}
            />
          </button>

          {/* Quick Shop Action Overlay (Subtle pill, doesn't permanently block image) */}
          <div
            className={`absolute inset-x-3 bottom-3 transition-all duration-300 z-20 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openQuickShop(product);
              }}
              className="w-full bg-white/95 backdrop-blur-md text-[#5C4033] hover:bg-[#879E57] hover:text-white py-2.5 px-4 rounded-full text-[11px] font-outfit font-semibold tracking-wider uppercase transition-all duration-200 shadow-md border border-[#5C4033]/10 flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Shop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="pt-3 pb-1 px-1 space-y-1">
        {/* Color Swatches */}
        {availableColors.length > 0 && (
          <div className="flex items-center space-x-1.5 pb-0.5">
            {availableColors.map((color) => {
              const isSelected = selectedColorId === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    isSelected
                      ? 'ring-1.5 ring-offset-1 ring-[#879E57] scale-110'
                      : 'hover:scale-110 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                />
              );
            })}
          </div>
        )}

        {/* Product Title */}
        <h3
          onClick={() => onNavigate(`/products/${product.slug}`)}
          className="font-outfit text-sm sm:text-base font-bold text-[#5C4033] hover:text-[#879E57] transition-colors cursor-pointer tracking-tight leading-snug line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Fabric Spec / Tagline */}
        <p className="text-[12px] text-[#8C7E7E] font-sans truncate">
          {product.shortDescription?.split('•')[0] || product.fabricComposition}
        </p>

        {/* Price */}
        <div className="pt-1">
          <Price amount={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
      </div>
    </div>
  );
};
