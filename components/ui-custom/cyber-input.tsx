import { forwardRef } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ label, type = 'text', className, ...props }: CyberInputProps, ref) => {
    return (
      <div className='w-full'>
        {!!label && <Label className='mb-2 block'>{label}</Label>}
        <Input
          ref={ref}
          type={type}
          className={cn(
            'w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';

export default CyberInput;
