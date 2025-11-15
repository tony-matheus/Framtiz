import { ExperienceInputSchema } from "@/lib/schemas/experience-schemas"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { serverExperienceService } from "@/lib/services/experience-service"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const user = await serverAuthService.getCurrentUser()

    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const options = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "30"),
    }

    const { experiences, totalPages: totalPages } =
      await serverExperienceService.getAll(options)

    const response = NextResponse.json(experiences, { status: 200 })
    response.headers.set("x-page", options.page.toString())
    response.headers.set("x-total-pages", totalPages.toString())

    return response
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await serverAuthService.getCurrentUser()

    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const parsedData = ExperienceInputSchema.safeParse(data)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: parsedData.error.errors },
        { status: 400 },
      )
    }

    const blog = await serverExperienceService.create(parsedData.data)

    return NextResponse.json(blog)
  } catch (err) {
    console.error("Error fetching experiences:", err)

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
