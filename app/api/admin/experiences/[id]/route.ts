import { ExperienceInputSchema } from "@/lib/schemas/experience-schemas"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { serverExperienceService } from "@/lib/services/experience-service"
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
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const experience = await serverExperienceService.getOne(id)

    return NextResponse.json(experience)
  } catch (error) {
    console.error("Error fetching:", error)
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
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const data = await request.json()
    const parsedData = ExperienceInputSchema.safeParse(data)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    const responseData = serverExperienceService.update(id, parsedData.data)

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error updating experience:", error)
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
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    serverExperienceService.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
