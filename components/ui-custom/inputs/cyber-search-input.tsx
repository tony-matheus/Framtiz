import { Search } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface CyberSearchInputProps {
  term?: string;
  onSearch: (arg0: string) => void;
}

export default function CyberSearchInput({
  term,
  onSearch,
}: CyberSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(term);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
    onSearch(term);
  }, 300);

  const handleTyping = (newTerm: string) => {
    setSearchTerm(newTerm);
    handleSearch(newTerm);
  };

  return (
    <div className='relative flex-1'>
      <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
        <Search size={16} className='text-slate-500' />
      </div>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => handleTyping(e.target.value)}
        className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
        placeholder='Search repositories...'
      />
    </div>
  );
}
