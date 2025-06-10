import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function getFormattedDate(
  dateTime: string,
  format: string | null = null
) {
  const parsed = dayjs(dateTime);
  if (format) return parsed.format(format);

  return parsed.format('MMM D, YYYY');
}

type DateInput = string | Date;

export function formatElapsedDuration(
  startDate: DateInput,
  endDate?: DateInput | null,
  options?: { short?: boolean }
): string {
  dayjs.extend(relativeTime);

  const start = dayjs(
    startDate instanceof Date ? startDate : `${startDate}-01`
  );
  const end = endDate
    ? dayjs(endDate instanceof Date ? endDate : `${endDate}-01`)
    : dayjs();

  const totalMonths = end.diff(start, 'month');
  if (totalMonths <= 0) return 'just now';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (options?.short) {
    const parts = [];
    if (years) parts.push(`${years}y`);
    if (months) parts.push(`${months}m`);
    return parts.join(' ') || '0m';
  }

  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${months} month${
      months !== 1 ? 's' : ''
    }`;
  }
}
