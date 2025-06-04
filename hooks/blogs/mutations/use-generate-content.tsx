import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export async function generateBlogContent(userText: string) {
  const response = await axios.post('/api/admin/blogs/analyze', { userText });
  return response.data;
}

export function useGenerateBlogContent() {
  return useMutation({
    mutationFn: generateBlogContent,
  });
}
