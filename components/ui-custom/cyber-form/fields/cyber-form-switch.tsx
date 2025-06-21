import { FieldValues, UseControllerProps } from 'react-hook-form';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import {
  CyberFormControl,
  CyberFormField,
  CyberFormItem,
  CyberFormLabel,
  CyberFormMessage,
} from '../cyber-form';
import { ReactNode } from 'react';
import { CyberSwitch } from '../../cyber-switch';

type CyberFormSwitchProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    'defaultChecked' | 'checked' | 'onCheckedChange'
  > & {
    label?: string;
    icon?: ReactNode;
    placeholder?: string;
    activeLabel?: string;
    inactiveLabel?: string;
  };

export default function CyberFormSwitch<T extends FieldValues>({
  name,
  control,
  activeLabel,
  inactiveLabel,
  label,
}: CyberFormSwitchProps<T>) {
  return (
    <CyberFormField
      control={control}
      name={name}
      render={({ field }) => (
        <CyberFormItem>
          {label && <CyberFormLabel>{label}</CyberFormLabel>}
          <CyberFormControl>
            <div className='flex items-center gap-2'>
              <CyberSwitch
                id='status'
                size='compact'
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {activeLabel && inactiveLabel && (
                <CyberFormLabel className='mb-0'>
                  <span className='font-mono text-sm text-slate-300'>
                    {field.value ? activeLabel : inactiveLabel}
                  </span>
                </CyberFormLabel>
              )}
            </div>
          </CyberFormControl>
          <CyberFormMessage />
        </CyberFormItem>
      )}
    />
  );
}
