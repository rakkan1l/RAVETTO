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
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-[0.14em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none font-outfit active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-[11px] px-5 py-2.5',
    md: 'text-xs px-7 py-3.5',
    lg: 'text-xs px-8 py-4',
  };

  const variantStyles = {
    primary: 'bg-[#879E57] text-white hover:bg-[#728848] hover:-translate-y-0.5 shadow-sm hover:shadow-md active:bg-[#5C4033]',
    secondary: 'bg-[#FFFFFF] text-[#5C4033] border border-[#5C4033]/25 hover:bg-[#5C4033] hover:text-[#FDFCF5] hover:-translate-y-0.5 shadow-sm active:bg-[#483126]',
    outline: 'border border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-[#FDFCF5] hover:-translate-y-0.5',
    ghost: 'text-[#5C4033] hover:text-[#879E57] hover:bg-[#FDFCF5]',
    mint: 'bg-[#879E57] text-white hover:bg-[#728848] font-semibold hover:-translate-y-0.5',
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
