import React from 'react';
import { Product, ProductVariant } from '../../types';
import { Price } from '../ui/Price';
import { Button } from '../ui/Button';

interface StickyMobileBuyBarProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onAddToCart: () => void;
  isLoading: boolean;
  onSelectSize: () => void;
}

export const StickyMobileBuyBar: React.FC<StickyMobileBuyBarProps> = ({
  product,
  selectedVariant,
  onAddToCart,
  isLoading,
  onSelectSize,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-ravetto-offwhite/95 backdrop-blur-md border-t border-ravetto-border px-4 py-3 z-30 shadow-lg flex items-center justify-between space-x-3">
      <div className="flex-1 min-w-0">
        <h4 className="text-xs uppercase tracking-wider font-medium text-ravetto-text truncate">
          {product.name}
        </h4>
        <div className="flex items-center space-x-2 text-xs">
          <Price amount={product.price} size="sm" />
          <span className="text-ravetto-muted">&bull;</span>
          <button
            onClick={onSelectSize}
            className="text-[11px] uppercase tracking-wider text-ravetto-teal underline font-medium"
          >
            {selectedVariant ? `Size ${selectedVariant.size.code}` : 'Select Size'}
          </button>
        </div>
      </div>

      <Button
        onClick={selectedVariant ? onAddToCart : onSelectSize}
        disabled={isLoading || (selectedVariant ? selectedVariant.stock <= 0 : false)}
        isLoading={isLoading}
        variant="primary"
        size="sm"
        className="flex-shrink-0"
      >
        {selectedVariant
          ? selectedVariant.stock > 0
            ? 'Add to Bag'
            : 'Sold Out'
          : 'Choose Size'}
      </Button>
    </div>
  );
};
