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
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.14em] text-ravetto-muted font-medium text-[11px]">
          Color
        </span>
        <span className="font-medium text-ravetto-text tracking-wide text-xs">
          {selectedColor?.name || 'Select'}
        </span>
      </div>

      <div className="flex items-center space-x-2.5">
        {colors.map((color) => {
          const isSelected = selectedColor?.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelect(color)}
              aria-label={`Select ${color.name}`}
              className={`relative w-6 h-6 rounded-full transition-all focus:outline-none ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-ravetto-teal scale-105'
                  : 'hover:scale-105 opacity-85'
              }`}
              style={{ backgroundColor: color.hexCode }}
            >
              {isSelected && (
                <span className="absolute inset-0 rounded-full border border-white/40" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
