import { Experience } from '@/lib/schemas/experience-schemas';
import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function updateExperience(exp: Experience) {
  const { data } = await axios.put(`/api/admin/experiences/${exp.id}`, exp);

  return data;
}

export const useUpdateExperience = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: updateExperience,
    onSuccess: options?.onSuccess,
  });
