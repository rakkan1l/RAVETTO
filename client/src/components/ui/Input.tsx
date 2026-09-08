import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-ravetto-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full bg-transparent border border-ravetto-border px-3.5 py-3 text-sm text-ravetto-text placeholder-ravetto-muted/60 transition-colors duration-200 focus:outline-none focus:border-ravetto-teal',
            error && 'border-red-600 focus:border-red-600',
            className
          )}
          {...props}
        />
        {error && <p className="text-[11px] text-red-600 tracking-wide">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
