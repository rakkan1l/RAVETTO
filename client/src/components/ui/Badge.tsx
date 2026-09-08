import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'subtle' | 'mint' | 'teal' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'subtle', className }) => {
  const variantStyles = {
    subtle: 'bg-ravetto-offwhite-paper text-ravetto-text border border-ravetto-border',
    mint: 'bg-ravetto-mint-subtle text-ravetto-teal border border-ravetto-mint font-medium',
    teal: 'bg-ravetto-teal text-white',
    outline: 'border border-ravetto-border text-ravetto-muted',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.16em] uppercase font-medium select-none',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
