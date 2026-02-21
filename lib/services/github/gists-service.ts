import { GithubGist } from "@/app/api/github/gists/route"
import axios from "axios"

export type GistRequestOutput = {
  gists: GithubGist[]
  totalPages: number
}

export async function fetchGitHubGists({ page = 1, limit = 30 } = {}) {
  const { data, headers } = await axios.get("/api/github/gists", {
    params: { page, limit },
  })

  return { gists: data, totalPages: headers["x-total-pages"] ?? null }
}
