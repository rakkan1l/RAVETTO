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
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-ravetto-offwhite/95 backdrop-blur-md border-t border-ravetto-border px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-30 shadow-lg flex items-center justify-between space-x-3">
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-ravetto-text truncate">
          {product.name}
        </h4>
        <div className="flex items-center space-x-2 text-xs">
          <Price amount={product.price} size="sm" />
          <span className="text-ravetto-muted">&bull;</span>
          <button
            onClick={onSelectSize}
            className="text-[11px] uppercase tracking-wider text-ravetto-teal underline font-medium"
          >
            {selectedVariant ? `SIZE ${selectedVariant.size.code}` : 'SELECT SIZE'}
          </button>
        </div>
      </div>

      <Button
        onClick={selectedVariant ? onAddToCart : onSelectSize}
        disabled={isLoading || (selectedVariant ? selectedVariant.stock <= 0 : false)}
        isLoading={isLoading}
        variant="primary"
        size="sm"
        className="flex-shrink-0 uppercase tracking-widest text-[11px]"
      >
        {selectedVariant
          ? selectedVariant.stock > 0
            ? 'ADD TO BAG'
            : 'SOLD OUT'
          : 'SELECT SIZE'}
      </Button>
    </div>
  );
};
