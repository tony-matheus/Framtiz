import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { ReactNode } from 'react';

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  withCornerAccents?: boolean;
}

export function CyberCard({
  children,
  className,
  // headerClassName,
  // contentClassName,
  // footerClassName,
  withCornerAccents = true,
}: CyberCardProps) {
  return (
    <Card
      className={cn(
        'bg-slate-900 border-slate-800 text-slate-200 relative group',
        // withCornerAccents && 'cyber-card-with-accents',
        className
      )}
    >
      {children}
      {withCornerAccents && (
        <>
          <div className='absolute -left-1 -top-1 hidden size-3 bg-purple-600 group-hover:block'></div>
          <div className='absolute -bottom-1 -right-1 hidden size-3 bg-green-400 group-hover:block'></div>
        </>
      )}
    </Card>
  );
}

export function CyberCardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CardHeader className={cn('px-4 py-3', className)}>{children}</CardHeader>
  );
}

export function CyberCardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CardContent className={cn('px-4 py-3', className)}>{children}</CardContent>
  );
}

export function CyberCardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CardFooter className={cn('px-4 py-3', className)}>{children}</CardFooter>
  );
}
