import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutHeader() {
  return (
    <div className='relative z-30 py-6'>
      <Link
        href='/'
        className='group inline-flex items-center text-sm text-green-400 transition-colors duration-300 hover:text-purple-400'
        prefetch={true}
      >
        <ArrowLeft className='mr-2 size-4 transition-transform group-hover:-translate-x-1' />
        <span className='font-mono'>BACK_TO_HOME</span>
      </Link>
    </div>
  );
}
