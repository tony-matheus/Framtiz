import * as FormPrimitive from '@/components/ui/form';
import * as LabelPrimitive from '@radix-ui/react-label';

import { CyberLabel } from './cyber-label';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const CyberFormProvider = FormPrimitive.Form;

const CyberFormField = FormPrimitive.FormField;

const useFormField = FormPrimitive.useFormField;

const CyberFormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <FormPrimitive.FormItem
      ref={ref}
      className={cn('space-y-2', className)}
      {...props}
    />
  );
});
CyberFormItem.displayName = 'CyberFormItem';

const CyberFormControl = FormPrimitive.FormControl;

const CyberFormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  );
});
CyberFormDescription.displayName = 'CyberFormDescription';

const CyberFormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-xs font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
CyberFormMessage.displayName = 'CyberFormMessage';

const CyberFormLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <CyberLabel
      ref={ref}
      className={cn(error && 'text-destructive', className, 'mb-2 blockn')}
      htmlFor={formItemId}
      {...props}
    />
  );
});

CyberFormLabel.displayName = 'CyberFormLabel';

export {
  useFormField,
  CyberFormProvider,
  CyberFormItem,
  CyberFormLabel,
  CyberFormControl,
  CyberFormDescription,
  CyberFormMessage,
  CyberFormField,
};
