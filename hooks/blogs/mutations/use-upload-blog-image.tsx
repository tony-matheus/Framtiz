import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function uploadImage({ id, image }: { id: number; image: File }) {
  const formData = new FormData();
  formData.append('image', image);

  const { data, ...rest } = await axios.post(
    `/api/admin/blogs/${id}/upload_image`,
    formData
  );

  console.log(rest);
  return data;
}

export const useUploadBlogImage = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: uploadImage,
    onSuccess: options?.onSuccess,
  });
