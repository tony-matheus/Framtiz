import { ReactNode } from "react"
import FloatingNav from "@/components/home/floating-nav/floating-nav"
import ReactQueryProvider from "@/lib/contexts/react-query-provider"

type LayoutProps = {
  children: ReactNode
  params: { slug: string }
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <ReactQueryProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-50">
        {children}
        <FloatingNav />
      </div>
    </ReactQueryProvider>
  )
}
