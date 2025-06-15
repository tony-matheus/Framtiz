import { ReactNode } from 'react';
import FloatingNav from '@/components/home/floating-nav/floating-nav';

type LayoutProps = {
  children: ReactNode;
  params: { slug: string };
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className='relative min-h-screen bg-slate-950 text-slate-50'>
      {children}
      <FloatingNav />
    </div>
  );
}
