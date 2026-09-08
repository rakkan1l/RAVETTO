import React, { useState } from 'react';
import { Product } from '../../types';
import { Price } from '../ui/Price';
import { Bookmark } from 'lucide-react';
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

  // Determine displayed images
  const primaryImage = product.images.find((img) =>
    selectedColorId ? img.colorId === selectedColorId : img.isPrimary
  ) || product.images[0];

  // Secondary lifestyle or alternate angle
  const secondaryImage = product.images.find(
    (img) => img.url !== primaryImage?.url && (!selectedColorId || img.colorId === selectedColorId)
  ) || product.images[1] || primaryImage;

  // Extract unique colors available in variants
  const availableColors = Array.from(
    new Map(
      product.variants.map((v) => [v.color.id, v.color])
    ).values()
  );

  return (
    <div
      className="group relative flex flex-col text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Canvas */}
      <div className="relative aspect-[3/4] w-full bg-ravetto-offwhite-paper overflow-hidden cursor-pointer"
        onClick={() => onNavigate(`/products/${product.slug}`)}
      >
        {/* Base Image */}
        <img
          src={primaryImage?.url}
          alt={primaryImage?.alt || product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-350 ease-out ${
            isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Hover Secondary / Model Image */}
        {secondaryImage && (
          <img
            src={secondaryImage.url}
            alt={secondaryImage.alt || product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-350 ease-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Saved Bookmark Action */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(product.id, selectedColorId || undefined);
          }}
          aria-label={saved ? 'Remove from saved' : 'Save piece'}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full transition-all duration-200 z-10 ${
            saved
              ? 'bg-ravetto-teal text-white'
              : 'bg-white/80 text-ravetto-text hover:bg-white backdrop-blur-sm'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* GSM & Fit Micro Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="bg-ravetto-text/80 text-white text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 font-medium backdrop-blur-sm">
            {product.gsm} GSM
          </span>
        </div>

        {/* Quick Shop Action Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickShop(product);
            }}
            className="w-full bg-ravetto-teal text-white py-2.5 text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-ravetto-teal-dark active:scale-[0.99] transition-all shadow-md"
          >
            Quick Shop
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3.5 pb-1 space-y-1">
        {/* Color Swatches */}
        {availableColors.length > 0 && (
          <div className="flex items-center space-x-1.5 pb-1">
            {availableColors.map((color) => {
              const isSelected = selectedColorId === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                  className={`w-3 h-3 rounded-full transition-transform ${
                    isSelected ? 'ring-1 ring-offset-1 ring-ravetto-teal scale-110' : 'hover:scale-110 opacity-80'
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                />
              );
            })}
          </div>
        )}

        {/* Title */}
        <h3
          onClick={() => onNavigate(`/products/${product.slug}`)}
          className="text-xs uppercase tracking-[0.14em] font-medium text-ravetto-text hover:text-ravetto-teal transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Fabric & Fit Spec */}
        <p className="text-[11px] text-ravetto-muted tracking-wide truncate">
          {product.shortDescription.split('•')[0] || product.fabricComposition}
        </p>

        {/* Price */}
        <div className="pt-0.5">
          <Price amount={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
      </div>
    </div>
  );
};
