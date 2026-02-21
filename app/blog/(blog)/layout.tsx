/* eslint-disable tailwindcss/no-contradicting-classname */
import FloatingNav from "@/components/home/floating-nav/floating-nav"
import Footer from "@/components/home/footer"
import { publicBlogQueryOptions } from "@/hooks/blogs/fetch/blog-options"
import ReactQueryProvider from "@/lib/contexts/react-query-provider"
import { getQueryClient } from "@/lib/helpers/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    publicBlogQueryOptions({
      page: 1,
      title: "",
      published: true,
      type: "blog",
    }),
  )

  await queryClient.prefetchQuery(
    publicBlogQueryOptions({
      page: 1,
      title: "",
      published: true,
      type: "gist",
    }),
  )

  return (
    <ReactQueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="min-h-screen bg-slate-950 text-slate-50">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
          {children}
          <Footer />
          <FloatingNav />
        </div>
      </HydrationBoundary>
    </ReactQueryProvider>
  )
}
