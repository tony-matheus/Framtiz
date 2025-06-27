'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const gridOverlay = `
  before:content-['']
  before:absolute
  before:inset-0
  before:pointer-events-none
  before:bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)]
  before:bg-[size:10px_10px]
  before:z-[-1]
`;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast: cn(
            'group toast group-[.toaster]:bg-[#020617]/90 group-[.toaster]:text-purple-400 group-[.toaster]:border-purple-400 group-[.toaster]:border-border group-[.toaster]:shadow-lg !border-0 !border-l-4 !backdrop-blur-sm !rounded-none',
            gridOverlay
          ),
          description: 'text-sm',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: '!border-green-400 !text-green-400',
          warning: '!border-yellow-400 !text-yellow-400',
          error: '!border-red-400 !text-red-400',
          content: 'font-mono text-xs',
        },
      }}
      duration={50000}
      {...props}
    />
  );
};

export { Toaster };
