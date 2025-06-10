import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function destroyExperience(id: number) {
  const { data } = await axios.delete(`/api/admin/experiences/${id}`);

  return data;
}

export const useDestroyExperience = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: destroyExperience,
    onSuccess: options?.onSuccess,
  });
