import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function getFormattedDate(
  dateTime: string | Date,
  format: string | null = null
) {
  const parsed = dayjs(dateTime);
  if (format) return parsed.format(format);

  return parsed.format('MMM D, YYYY');
}

type DateInput = string | Date;

export function formatElapsedDuration(
  startDate: DateInput,
  endDate?: DateInput | null
): string {
  dayjs.extend(relativeTime);

  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();

  return start.from(end, true);
}
