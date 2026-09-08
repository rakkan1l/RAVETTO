import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-[0.14em] uppercase transition-all duration-300 focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-[11px] px-4 py-2.5',
    md: 'text-xs px-6 py-3.5',
    lg: 'text-xs px-8 py-4',
  };

  const variantStyles = {
    primary: 'bg-ravetto-teal text-white hover:bg-ravetto-teal-dark active:bg-black',
    secondary: 'bg-ravetto-offwhite-paper text-ravetto-text hover:bg-ravetto-border border border-ravetto-border',
    outline: 'border border-ravetto-text text-ravetto-text hover:bg-ravetto-text hover:text-white',
    ghost: 'text-ravetto-text hover:text-ravetto-teal hover:bg-ravetto-offwhite-paper',
    mint: 'bg-ravetto-mint text-ravetto-text hover:bg-ravetto-mint-dark font-semibold',
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
