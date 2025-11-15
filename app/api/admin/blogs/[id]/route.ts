import { BlogInputSchema } from "@/lib/schemas/blog-schemas"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { serverBlogService } from "@/lib/services/blog-service/server"
import { NextResponse } from "next/server"

export async function GET(
  requet: Request,
  { params }: { params: { id: number } },
) {
  try {
    const isAdmin = await serverAuthService.isAdmin()

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await serverBlogService.getBlog(id)

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } },
) {
  try {
    const isAdmin = await serverAuthService.isAdmin()

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const data = await request.json()
    const parsedData = BlogInputSchema.safeParse(data)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    const responseData = serverBlogService.updateBlog(id, parsedData.data)

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const isAdmin = await serverAuthService.isAdmin()

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: paramID } = await params
    const id = Number.parseInt(paramID)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    serverBlogService.deleteBlog(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
