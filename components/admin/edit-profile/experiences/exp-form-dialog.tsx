import SimpleDialog from '@/components/ui-custom/dialogs/simple-dialog';

import ExpForm, { ExperienceFormProps } from './exp-form';
import { useCreateExperience } from '@/hooks/experiences/mutations/use-create-experience';
import { useUpdateExperience } from '@/hooks/experiences/mutations/use-update-experience';
import {
  Experience,
  ExperienceInput,
  ExperienceInputSchema,
} from '@/lib/schemas/experience-schemas';
import { toast } from 'sonner';

interface ExperienceFormDialogProps
  extends Omit<ExperienceFormProps, 'onSubmit' | 'defaultValues' | 'loading'> {
  isOpen: boolean;
  experience?: Experience | null;
  onOpenChange: (arg0: boolean) => void;
  onSave: () => void;
}

export default function ExperienceFormDialog({
  isOpen,
  onOpenChange,
  onSave,
  experience,
  ...props
}: ExperienceFormDialogProps) {
  const { mutateAsync: createExperience, isPending: isCreating } =
    useCreateExperience();

  const { mutateAsync: updateExperience, isPending: isUpdating } =
    useUpdateExperience();

  const handleSubmit = async (values: ExperienceInput) => {
    if (experience) {
      await updateExperience({ ...experience, ...values });
      toast.success('SYSTEM_ACTION: COMPLETED', {
        description: 'Experience updated',
        position: 'bottom-right',
      });
      return onSave?.();
    }

    await createExperience(values);
    toast.success('SYSTEM_ACTION: COMPLETED', {
      description: `Experience ${values.position} created`,
      position: 'bottom-right',
    });
    onSave?.();
  };

  return (
    <SimpleDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      onCancel={() => onOpenChange(false)}
      hideFooter
      title={experience ? 'EDIT_EXPERIENCE' : 'ADD_NEW_EXPERIENCE'}
    >
      <ExpForm
        editingId={experience?.id}
        onSubmit={handleSubmit}
        defaultValues={
          experience ? ExperienceInputSchema.parse(experience) : undefined
        }
        loading={isCreating || isUpdating}
        {...props}
      />
    </SimpleDialog>
  );
}
