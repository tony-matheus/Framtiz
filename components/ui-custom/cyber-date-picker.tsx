'use client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CyberButton } from './cyber-button';
import { CyberCalendar } from './cyber-calendar';
import {
  CyberPopover,
  CyberPopoverContent,
  CyberPopoverTrigger,
} from './cyber-popover';

interface CyberDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function CyberDatePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  disabled = false,
  className,
}: CyberDatePickerProps) {
  return (
    <CyberPopover>
      <CyberPopoverTrigger asChild>
        <CyberButton
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-mono h-12 bg-slate-900 border-slate-700 hover:border-slate-600',
            !date && 'text-slate-500',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className='mr-2 size-4 text-slate-500' />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </CyberButton>
      </CyberPopoverTrigger>
      <CyberPopoverContent className='w-auto p-0' align='start'>
        <CyberCalendar
          mode='single'
          selected={date}
          onSelect={onDateChange}
          disabled={disabled}
          initialFocus
        />
      </CyberPopoverContent>
    </CyberPopover>
  );
}
