import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';
import Heading from '@/components/ui/typography/heading';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: string;
  info: string;
  status?: 'default' | 'success' | 'warning' | 'danger';
}

const STATUS_COLOR = {
  default: {
    bg: 'bg-purple-600',
    text: 'text-purple-400',
  },
  success: {
    bg: 'bg-green-400',
    text: 'text-green-300',
  },
  warning: {
    bg: 'bg-yellow-400',
    text: 'text-yellow-300',
  },
  danger: {
    bg: 'bg-red-400',
    text: 'text-red-300',
  },
};

export default function MetricCard({
  title,
  value,
  subtitle,
  info,
  status = 'default',
}: MetricCardProps) {
  const colorStyles = STATUS_COLOR[status];

  return (
    <CyberCard>
      <CyberCardContent>
        <Heading as='h5' className=' text-slate-200 mb-4 font-mono'>
          <div className={cn('w-2 h-2  mr-2 inline-flex', colorStyles.bg)} />
          {title}
        </Heading>

        <Heading as='h2' className={cn('mb-2', colorStyles.text)}>
          {value}
        </Heading>
        <p className='text-sm text-slate-400'>{subtitle}</p>
        <CyberProgress status={status} value={65} className='mt-4 mb-2' />
        <p className='text-xs text-green-400'>{info}</p>
      </CyberCardContent>
    </CyberCard>
  );
}
