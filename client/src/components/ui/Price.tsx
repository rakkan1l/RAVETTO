import React from 'react';
import { clsx } from 'clsx';

interface PriceProps {
  amount: number;
  compareAtPrice?: number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Price: React.FC<PriceProps> = ({ amount, compareAtPrice, className, size = 'md' }) => {
  const formatted = `₹${amount.toLocaleString('en-IN')}`;
  const formattedCompare = compareAtPrice ? `₹${compareAtPrice.toLocaleString('en-IN')}` : null;

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-medium',
    xl: 'text-lg font-medium',
  };

  return (
    <div className={clsx('inline-flex items-center space-x-2 tracking-tight text-ravetto-text', sizeClasses[size], className)}>
      <span className="font-sans font-medium">{formatted}</span>
      {formattedCompare && (
        <span className="text-xs text-ravetto-muted line-through font-normal">{formattedCompare}</span>
      )}
    </div>
  );
};
