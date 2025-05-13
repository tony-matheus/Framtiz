import { forwardRef } from 'react';
import { Input } from '../ui/input';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
}

const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ label, type = 'text', ...props }: CyberInputProps, ref) => {
    return (
      <div className='w-full mt-4'>
        {!!label && (
          <label className='block text-slate-400 text-sm font-mono mb-2'>
            {label}
          </label>
        )}
        <Input
          ref={ref}
          type={type}
          className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
          {...props}
        />
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';

export default CyberInput;
