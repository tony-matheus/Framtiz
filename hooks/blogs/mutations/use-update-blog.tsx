import { Blog } from '@/lib/services/blog-service/helpers';
import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function updateBlog(blog: Blog) {
  const { data } = await axios.put(`/api/admin/blogs/${blog.id}`, blog);

  return data;
}

export const useUpdateBlog = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: updateBlog,
    onSuccess: options?.onSuccess,
  });
