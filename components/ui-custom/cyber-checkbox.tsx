'use client';

import * as React from 'react';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';

const CyberCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  React.ComponentPropsWithoutRef<typeof Checkbox>
>(({ className, ...props }, ref) => (
  <Checkbox
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 border border-slate-600 bg-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-500 data-[state=checked]:text-slate-100',
      'hover:border-purple-500 transition-colors',
      className
    )}
    {...props}
  />
));
CyberCheckbox.displayName = Checkbox.displayName;

export { CyberCheckbox };
