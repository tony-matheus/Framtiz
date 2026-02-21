import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

type UseGithubFileResult = {
  data: string | undefined
  isError: boolean
  isPending: boolean
}

export const useGithubFile = (fileRawUrl: string): UseGithubFileResult => {
  const { data, isError, isPending } = useQuery<string>({
    queryKey: ["github-file", fileRawUrl],
    queryFn: async () => {
      const response = await fetch(fileRawUrl)
      return response.text()
    },
  })

  return { data, isError, isPending }
}

export interface GithubFile {
  filename: string
  content?: string | undefined
  language?: string | undefined | null
  raw_url: string
}

interface UseGithubFilesResult {
  data: GithubFile[] | undefined
  isError: boolean
  isPending: boolean
}

export const useGithubFiles = (
  files: GithubFile[],
  { enabled = true } = {},
): UseGithubFilesResult => {
  const [fetchedFiles, setFetchedFiles] = useState<GithubFile[]>([])
  const { data, isError, isPending } = useQuery<
    { content: string; raw_url: string }[]
  >({
    queryKey: ["github-files", files.map((file) => file.raw_url).join("|")],
    queryFn: async () => {
      const responses = await Promise.all(
        files.map((file) => fetch(file.raw_url)),
      )
      const data = await Promise.all(
        responses.map(async (response) => {
          return { content: await response.text(), raw_url: response.url }
        }),
      )

      return data
    },
    enabled,
  })

  useEffect(() => {
    if (data) {
      setFetchedFiles(
        data.map((file) => {
          const fileData = files.find((f) => f.raw_url === file.raw_url)
          return {
            filename: fileData?.filename ?? "Untitled File",
            content: file.content,
            language: fileData?.language ?? "text",
            raw_url: file.raw_url,
          }
        }),
      )
    }
  }, [data, files])

  return { data: fetchedFiles, isError, isPending }
}
