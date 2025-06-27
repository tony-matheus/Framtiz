import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import Spinner from '../ui/spinner';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'warning'
    | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
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
      warning:
        'border-2 border-yellow-600 text-yellow-300 hover:bg-yellow-900/30',
      destructive: 'border-2 border-red-600 text-red-300 hover:bg-red-900/30',
      outline:
        'border border-slate-700 text-slate-300 hover:border-purple-600 hover:text-purple-300',
      ghost:
        'bg-transparent text-slate-300 hover:bg-purple-900/30 rounded-full hover:text-purple-300',
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          'bg-transparent transition-colors font-mono flex items-center justify-center ripple ripple-hover break-words',
          variantStyles[variant],
          className,
          isLoading ? 'ripple-loop' : ''
        )}
        size={size}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            {size != 'icon' && <span>{loadingText || children}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

CyberButton.displayName = 'CyberButton';
