'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const CyberSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer relative h-6 w-12 shrink-0 cursor-pointer appearance-none rounded-none border-2 border-slate-700 bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-900/30',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none absolute left-0 top-0 flex h-5 w-5 items-center justify-center border border-slate-700 bg-slate-900 transition-all data-[state=checked]:translate-x-6 data-[state=checked]:border-green-600',
        "after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-br after:from-slate-700 after:to-slate-900 after:opacity-80 data-[state=checked]:after:bg-gradient-to-br data-[state=checked]:after:from-green-400 data-[state=checked]:after:to-green-600",
        "before:absolute before:inset-[3px] before:z-10 before:content-[''] before:bg-slate-800 data-[state=checked]:before:bg-green-900/50"
      )}
    >
      <span className='absolute z-20 size-1 animate-pulse rounded-none bg-slate-400 data-[state=checked]:bg-green-400' />
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
CyberSwitch.displayName = SwitchPrimitives.Root.displayName;

export { CyberSwitch };
