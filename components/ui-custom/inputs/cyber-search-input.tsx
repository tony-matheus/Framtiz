import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import CyberInput from '../cyber-input';

interface CyberSearchInputProps {
  term?: string;
  onSearch: (arg0: string) => void;
  className?: string;
  placeholder?: string;
}

export default function CyberSearchInput({
  term,
  onSearch,
  className,
  placeholder,
}: CyberSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>(term ?? '');

  const debouncedSearch = useDebouncedCallback((newTerm: string) => {
    saveSearchParams(newTerm);

    onSearch(newTerm);
  }, 500);

  const saveSearchParams = (newTerm: string) => {
    const url = new URL(window.location.href);

    if (newTerm) {
      url.searchParams.set('query', newTerm);
    } else {
      url.searchParams.delete('query');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const handleTyping = (newTerm: string) => {
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  return (
    <div className={cn('relative flex-1', className)}>
      <div className='absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700'>
        <Search size={16} className='text-slate-500' />
      </div>
      <CyberInput
        type='text'
        value={searchTerm}
        className='p-3 pl-12'
        onChange={(e) => handleTyping(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
