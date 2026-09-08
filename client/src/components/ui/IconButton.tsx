import React from 'react';
import { clsx } from 'clsx';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'ghost',
  size = 'md',
  label,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2.5',
    lg: 'w-12 h-12 p-3',
  };

  const variantStyles = {
    ghost: 'text-ravetto-text hover:text-ravetto-teal hover:bg-ravetto-offwhite-paper',
    outline: 'border border-ravetto-border text-ravetto-text hover:border-ravetto-teal hover:text-ravetto-teal',
    solid: 'bg-ravetto-offwhite-paper text-ravetto-text hover:bg-ravetto-teal hover:text-white',
  };

  return (
    <button
      aria-label={label}
      className={clsx(
        'inline-flex items-center justify-center transition-colors duration-200 focus-visible:outline-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
