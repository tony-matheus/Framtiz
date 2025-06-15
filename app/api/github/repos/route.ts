import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { z } from 'zod';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { extractGithubPaginationData } from '@/lib/helpers/extract-github-pagination-data';

export const RepoSchema = z
  .object({
    id: z.number(),
    blobs_url: z.string(),
    description: z.string().nullable(),
    watchers_count: z.number(),
    topics: z.array(z.string()),
    name: z.string(),
    html_url: z.string(),
    updated_at: z.string(),
  })
  .transform((data) => ({
    ...data,
    url: data.html_url,
  }));

export const RepoArraySchema = z.array(RepoSchema);
export type GithubRepo = z.infer<typeof RepoSchema>;

function parseQueryParam(value: string | null, fallback = 1): number {
  const parsed = Number(value);
  return Number.isNaN(parsed) || parsed <= 0 ? fallback : parsed;
}

export async function GET(req: NextRequest) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'Missing GitHub token' },
      { status: 500 }
    );
  }

  const user = await serverAuthService.getCurrentUser();
  if (!user?.githubUsername) {
    return NextResponse.json(
      { error: 'Missing GitHub username' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const page = parseQueryParam(url.searchParams.get('page'), 1);
  const per_page = parseQueryParam(url.searchParams.get('limit'), 30);

  const octokit = new Octokit({ auth: token });

  try {
    const { data: repos, headers } = await octokit.rest.repos.listForUser({
      username: user.githubUsername,
      page,
      per_page,
    });

    const pagination = extractGithubPaginationData(headers.link);
    const parsed = RepoArraySchema.safeParse(repos);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid repo data received' },
        { status: 502 }
      );
    }

    const response = NextResponse.json(parsed.data);

    // Set pagination headers
    response.headers.set(
      'x-total-pages',
      pagination.last?.toString() ?? String(page)
    );

    response.headers.set(
      'x-page',
      (pagination.next ? pagination.next - 1 : page).toString()
    );

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
