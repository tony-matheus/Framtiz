import { BlogInput } from "@/lib/schemas/blog-schemas"
import { AnyUseMutationOptions, useMutation } from "@tanstack/react-query"
import axios from "axios"

async function createBlog(blog: BlogInput) {
  const { data } = await axios.post("/api/admin/blogs", blog)

  return data
}

export const useCreateBlog = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: createBlog,
    onSuccess: options?.onSuccess,
  })
