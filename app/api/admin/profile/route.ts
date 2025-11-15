import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { NextResponse } from "next/server"
import { serverProfileService } from "@/lib/services/profile-service"

export async function PUT(request: Request) {
  try {
    // Check if user is authenticated
    const user = await serverAuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username, full_name, github_username } = await request.json()

    const { error, success } = await serverProfileService.updateProfile(
      {
        username,
        github_username,
        full_name: full_name || null,
      },
      user.id,
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success }, { status: 200 })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
