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
    <div className="space-y-2.5 text-left font-outfit">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <span className="uppercase tracking-[0.16em] text-[#8C7E7E] font-bold text-xs">
            Size:
          </span>
          <span className="font-bold text-[#5C4033]">
            {selectedSize?.name || 'Select a size'}
          </span>
        </div>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#879E57] hover:underline"
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
              className={`py-2.5 rounded-full text-xs font-bold transition-all text-center select-none shadow-sm ${
                isSelected
                  ? 'bg-[#879E57] text-white border border-[#879E57] shadow-md scale-105'
                  : isAvailable
                  ? 'bg-white border border-[#5C4033]/15 text-[#5C4033] hover:border-[#879E57] hover:text-[#879E57]'
                  : 'bg-[#FDFCF5] border border-[#5C4033]/08 text-[#8C7E7E]/40 cursor-not-allowed line-through'
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
