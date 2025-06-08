import { z } from 'zod';

export const BlogInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  published: z.boolean(),
  content: z.string().nullable(),
  excerpt: z.string().nullable(),
  image_url: z.string().nullable(),
});

export type BlogInput = z.infer<typeof BlogInputSchema>;
