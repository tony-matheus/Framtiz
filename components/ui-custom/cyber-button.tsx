import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Button;

    const variantStyles = {
      primary:
        'border-2 border-purple-600 text-purple-300 hover:bg-purple-900/30',
      secondary:
        'border-2 border-green-600 text-green-300 hover:bg-green-900/30',
      danger: 'border-2 border-red-600 text-red-300 hover:bg-red-900/30',
      outline:
        'border border-slate-700 text-slate-300 hover:border-purple-600 hover:text-purple-300',
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          'bg-transparent transition-colors font-mono flex items-center justify-center',
          variantStyles[variant],
          {
            'h-9 px-4 py-2 text-sm': size === 'default',
            'h-8 px-3 text-xs': size === 'sm',
            'h-11 px-6 text-base': size === 'lg',
            'h-9 w-9 p-0': size === 'icon',
          },
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className='mr-2'>{leftIcon}</span>}
            {children}
            {rightIcon && <span className='ml-2'>{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

CyberButton.displayName = 'CyberButton';
