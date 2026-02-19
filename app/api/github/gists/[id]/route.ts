import { NextRequest, NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { GISTSchema } from "../route"

export async function GET(req: NextRequest) {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 500 })
  }

  const user = await serverAuthService.getCurrentUser()
  if (!user?.githubUsername) {
    return NextResponse.json(
      { error: "Missing GitHub username" },
      { status: 500 },
    )
  }

  const url = new URL(req.url)
  const gistId = url.pathname.split("/").pop()

  if (!gistId) {
    return NextResponse.json({ error: "Missing GIST ID" }, { status: 400 })
  }

  const octokit = new Octokit({ auth: token })

  try {
    const { data: gist } = await octokit.rest.gists.get({
      gist_id: gistId,
    })
    if (!gist) {
      return NextResponse.json({ error: "GIST not found" }, { status: 404 })
    }

    const filesNames = Object.keys(gist.files ?? {})
    const formattedGist = {
      ...gist,
      name: filesNames[0] ?? "Untitled Gist",
      filesList: filesNames.map((file) => ({
        filename: file,
        raw_url: gist.files?.[file]?.raw_url ?? "",
        language: gist.files?.[file]?.language ?? null,
        size: gist.files?.[file]?.size ?? 0,
      })),
    }
    const parsed = GISTSchema.safeParse(formattedGist)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid GIST data received" },
        { status: 502 },
      )
    }

    return NextResponse.json(parsed.data)
  } catch (error: unknown) {
    console.error(error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
