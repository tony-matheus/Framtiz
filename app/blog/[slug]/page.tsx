import { serverBlogService } from "@/lib/services/blog-service/server"
import BlogPost from "@/components/blog/blog-post"
import { notFound } from "next/navigation"
import { cache } from "react"
import PageTracker from "@/components/analytics/page-tracker"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"

type Props = {
  params: { slug: string }
}

const getBlog = cache(async (blogId: number) => {
  const blog = await serverBlogService.getBlog(blogId)

  return blog
})

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const blogId = Number(slug)
  const blog = await getBlog(blogId)

  return {
    title: `${blog.title} | Willian Frantz's Blog`,
    description:
      blog.excerpt ||
      "Read this article by Willian Frantz on software development, security, and technology.",
    openGraph: {
      title: blog.title,
      description:
        blog.excerpt ||
        "Read this article by Willian Frantz on software development, security, and technology.",
      url: `https://rubyeex.dev/blog/${blog.id}`,
      type: "article",
      images: blog.image_url
        ? [
            {
              url: blog.image_url,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : ["https://rubyeex.dev/will.jpg"],
    },
    twitter: {
      title: blog.title,
      description:
        blog.excerpt ||
        "Read this article by Willian Frantz on software development, security, and technology.",
      images: [blog.image_url || "https://rubyeex.dev/will.jpg"],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const blogId = Number(slug)
  if (isNaN(blogId)) {
    notFound()
  }
  const user = await serverAuthService.getCurrentUser()

  try {
    const blog = await getBlog(blogId)

    if (!blog.published) {
      throw new Error("Not published")
    }

    return (
      <>
        <PageTracker
          user={user ?? undefined}
          metadata={{
            slug: blog.id,
            title: blog.title,
          }}
        />
        <BlogPost blog={blog} />
      </>
    )
  } catch {
    notFound()
  }
}
