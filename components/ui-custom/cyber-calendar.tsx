'use client';

import type * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CyberCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <Calendar
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-slate-900 border border-slate-700', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-mono text-slate-200',
        nav: 'space-x-1 flex items-center',
        button: cn(
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-slate-400 hover:text-purple-400 border border-slate-700 hover:border-purple-500'
        ),
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-slate-500 rounded-md w-9 font-mono text-[0.8rem] font-normal',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-800/50 [&:has([aria-selected])]:bg-slate-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          'h-9 w-9 p-0 font-mono text-slate-200 hover:bg-slate-800 hover:text-purple-400 focus:bg-slate-800 focus:text-purple-400 aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-purple-600 text-slate-100 hover:bg-purple-600 hover:text-slate-100 focus:bg-purple-600 focus:text-slate-100',
        day_today: 'bg-slate-800 text-purple-400',
        day_outside:
          'day-outside text-slate-600 opacity-50 aria-selected:bg-slate-800/50 aria-selected:text-slate-600 aria-selected:opacity-30',
        day_disabled: 'text-slate-600 opacity-50',
        day_range_middle:
          'aria-selected:bg-slate-800 aria-selected:text-slate-200',
        day_hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  );
}
CyberCalendar.displayName = 'CyberCalendar';

export { CyberCalendar };
