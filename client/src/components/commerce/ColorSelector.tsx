import React from 'react';
import { Color } from '../../types';

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelect,
}) => {
  return (
    <div className="space-y-2.5 text-left font-outfit">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="uppercase tracking-[0.16em] text-[#8C7E7E] font-bold text-xs">
          Colour
        </span>
        <span className="font-bold text-[#5C4033] tracking-wide">
          {selectedColor?.name || 'Select colour'}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelect(color)}
              aria-label={`Select ${color.name}`}
              className={`relative w-8 h-8 rounded-full transition-all duration-200 focus:outline-none shadow-sm ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-[#879E57] scale-110'
                  : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: color.hexCode }}
            >
              {isSelected && (
                <span className="absolute inset-0 rounded-full border-2 border-white/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
