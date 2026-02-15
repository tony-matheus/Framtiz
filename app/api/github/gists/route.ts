import { NextRequest, NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"
import { z } from "zod"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { extractGithubPaginationData } from "@/lib/helpers/extract-github-pagination-data"

export const GISTSchema = z.object({
  id: z.number(),
  url: z.string(),
  truncated: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  files: z.record(
    z.string(),
    z.object({
      filename: z.string(),
      raw_url: z.string(),
      language: z.string(),
      size: z.number(),
    }),
  ),
})

export const RepoArraySchema = z.array(GISTSchema)
export type GithubGist = z.infer<typeof GISTSchema>

function parseQueryParam(value: string | null, fallback = 1): number {
  const parsed = Number(value)
  return Number.isNaN(parsed) || parsed <= 0 ? fallback : parsed
}

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
  const page = parseQueryParam(url.searchParams.get("page"), 1)
  const per_page = parseQueryParam(url.searchParams.get("limit"), 30)

  const octokit = new Octokit({ auth: token })

  try {
    const { data: repos, headers } = await octokit.rest.gists.listForUser({
      username: "WLSF",
      page,
      per_page,
    })

    const pagination = extractGithubPaginationData(headers.link)
    const parsed = RepoArraySchema.safeParse(repos)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid GIST data received" },
        { status: 502 },
      )
    }

    const response = NextResponse.json(parsed.data)

    // Set pagination headers
    response.headers.set(
      "x-total-pages",
      pagination.last?.toString() ?? String(page),
    )

    response.headers.set(
      "x-page",
      (pagination.next ? pagination.next - 1 : page).toString(),
    )

    return response
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
