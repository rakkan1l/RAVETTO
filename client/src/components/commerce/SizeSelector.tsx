import React from 'react';
import { Size } from '../../types';

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
  availableSizeIds?: string[];
  onOpenSizeGuide?: () => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelect,
  availableSizeIds,
  onOpenSizeGuide,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.14em] text-ravetto-muted font-medium text-[11px]">
          Size
        </span>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-[11px] uppercase tracking-[0.12em] text-ravetto-teal hover:underline"
          >
            Size Guide
          </button>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;
          const isAvailable = availableSizeIds ? availableSizeIds.includes(size.id) : true;

          return (
            <button
              key={size.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelect(size)}
              className={`py-2 text-xs font-mono font-medium border transition-all text-center ${
                isSelected
                  ? 'border-ravetto-teal bg-ravetto-teal text-white'
                  : isAvailable
                  ? 'border-ravetto-border bg-transparent text-ravetto-text hover:border-ravetto-text'
                  : 'border-ravetto-border/40 text-ravetto-muted/40 cursor-not-allowed line-through'
              }`}
            >
              {size.code}
            </button>
          );
        })}
      </div>
    </div>
  );
};
