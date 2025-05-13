import { cn } from '@/lib/utils';

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

const AS_SIZE_MAP: Record<NonNullable<HeadingProps['as']>, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
};

export default function Heading({
  children,
  className,
  as = 'h1',
}: HeadingProps) {
  const Tag = as;
  const sizeClass = AS_SIZE_MAP[as];

  return <Tag className={cn(sizeClass, className)}>{children}</Tag>;
}
