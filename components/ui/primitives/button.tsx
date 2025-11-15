import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// eslint-disable-next-line tailwindcss/no-contradicting-classname
const buttonVariants = cva(
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ripple ripple-hover inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap break-words font-mono text-sm font-medium outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'border-2 border-purple-600 text-purple-300 hover:bg-purple-900/30',
        destructive:
          'border-2 border-red-600 text-red-300 hover:bg-red-900/30 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'border-2 border-slate-700 bg-transparent text-purple-300 text-slate-300 hover:border-purple-600 hover:bg-purple-900/30 hover:text-purple-300 dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'border-2 border-green-600 text-green-300 hover:bg-green-900/30',
        ghost:
          'rounded-full bg-transparent text-slate-300 hover:bg-purple-900/30 hover:text-purple-300',
        link: 'text-primary underline-offset-4 hover:underline',
        warning:
          'border-2 border-yellow-600 text-yellow-300 hover:bg-yellow-900/30',
      },
      size: {
        default: 'h-9 px-4 py-2 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'size-9 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
