import { z } from 'zod';

export const BlogInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  published: z.boolean(),
  content: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
});

export type BlogInput = z.infer<typeof BlogInputSchema>;
