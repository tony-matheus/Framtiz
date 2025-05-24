import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

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
      <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
        <Search size={16} className='text-slate-500' />
      </div>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => handleTyping(e.target.value)}
        className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
        placeholder={placeholder}
      />
    </div>
  );
}
