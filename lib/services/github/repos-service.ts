import { GithubRepo } from "@/app/api/github/repos/route"
import axios from "axios"

export type RepoRequestOutput = {
  repos: GithubRepo[]
  totalPages: number
}

export async function fetchGitHubRepos({ page = 1, limit = 30 } = {}) {
  const { data, headers } = await axios.get("/api/github/repos", {
    params: { page, limit },
  })

  return { repos: data, totalPages: headers["x-total-pages"] ?? null }
}
