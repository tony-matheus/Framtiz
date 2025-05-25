import { forwardRef } from 'react';
import { Input } from '../ui/input';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
}

const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ label, type = 'text', ...props }: CyberInputProps, ref) => {
    return (
      <div className='w-full'>
        {!!label && (
          <label className='mb-2 block font-mono text-sm text-slate-400'>
            {label}
          </label>
        )}
        <Input
          ref={ref}
          type={type}
          className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
          {...props}
        />
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';

export default CyberInput;
