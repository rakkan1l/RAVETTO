import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  onChange: (newQuantity: number) => void;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  max = 99,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="inline-flex items-center border border-ravetto-border bg-transparent text-ravetto-text select-none">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
        className="w-8 h-9 flex items-center justify-center text-ravetto-text hover:bg-ravetto-offwhite-paper disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="w-10 text-center text-xs font-mono font-medium">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={disabled || quantity >= max}
        className="w-8 h-9 flex items-center justify-center text-ravetto-text hover:bg-ravetto-offwhite-paper disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};
