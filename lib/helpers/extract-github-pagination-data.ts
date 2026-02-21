export type GithubPagination = {
  prev: number | null
  next: number | null
  last: number | null
  first: number | null
}

function extractPage(urlPart: string): number | null {
  const match = urlPart.match(/page=(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

export function extractGithubPaginationData(
  linkHeader: string | undefined,
): GithubPagination {
  const response: GithubPagination = {
    prev: null,
    next: null,
    last: null,
    first: null,
  }

  if (!linkHeader) return response

  const links = linkHeader.split(",")

  for (const link of links) {
    const [urlPart, relPart] = link.split(";").map((part) => part.trim())

    const relMatch = relPart.match(/rel="(.+?)"/)
    if (!relMatch) continue

    const rel = relMatch[1] as keyof GithubPagination
    if (rel in response) {
      response[rel] = extractPage(urlPart)
    }
  }

  return response
}
