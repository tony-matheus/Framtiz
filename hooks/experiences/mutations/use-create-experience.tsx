import { ExperienceInput } from '@/lib/schemas/experience-schemas';
import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function createExperience(experience: ExperienceInput) {
  const { data } = await axios.post('/api/admin/experiences', experience);

  return data;
}

export const useCreateExperience = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: createExperience,
    onSuccess: options?.onSuccess,
  });
