'use client';

import * as React from 'react';
import * as PopoverUI from '../ui/popover';
import { cn } from '@/lib/utils';

const CyberPopover = PopoverUI.Popover;

const CyberPopoverTrigger = PopoverUI.PopoverTrigger;

const CyberPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverUI.PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverUI.PopoverContent>
>(({ className, ...props }, ref) => (
  <PopoverUI.PopoverContent
    ref={ref}
    className={cn(
      'z-50 w-72 bg-slate-900 border border-slate-700 p-4 text-slate-200 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
CyberPopoverContent.displayName = PopoverUI.PopoverContent.displayName;

export { CyberPopover, CyberPopoverTrigger, CyberPopoverContent };
