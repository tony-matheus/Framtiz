import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function destroyBlog(id: number) {
  const { data } = await axios.delete(`/api/admin/blogs/${id}`);

  return data;
}

export const useDestroyBlog = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: destroyBlog,
    onSuccess: options?.onSuccess,
  });
