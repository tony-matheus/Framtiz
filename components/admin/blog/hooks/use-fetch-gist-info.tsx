import { GithubGist } from "@/app/api/github/gists/route"
import { GithubFile, useGithubFiles } from "@/hooks/github/use-github-file"
import { useGithubGist } from "@/hooks/github/use-github-gists"
import { useEffect, useState } from "react"

const LANGUAGE_TO_LANGUAGE_CODE = {
  "c++": "cpp",
}

const getLanguageCode = (language: string) => {
  return (
    LANGUAGE_TO_LANGUAGE_CODE[
      language.toLocaleLowerCase() as keyof typeof LANGUAGE_TO_LANGUAGE_CODE
    ] ?? language
  )
}

const getFormattedMarkdown = (files: GithubFile[], gist: GithubGist) => {
  return `\n${gist.description ?? ""}\n---\n
${files.map((file) => `\n# ${file.filename ?? "Untitled File"} \n\`\`\`${getLanguageCode(file.language ?? "text")} \n${file.content ?? ""} \n\`\`\``).join("\n")}
    `
}

export const useFetchGistInfo = (gistId: string | null) => {
  const [filesToFetch, setFilesToFetch] = useState<GithubFile[]>([])
  const [gistInfo, setGistInfo] = useState<
    (GithubGist & { content: string }) | null
  >(null)

  const { data, isError, isPending } = useGithubGist(gistId ?? "", {
    enabled: !!gistId,
  })

  const { data: files } = useGithubFiles(filesToFetch, {
    enabled: !!gistId && filesToFetch.length > 0,
  })

  useEffect(() => {
    setFilesToFetch([])
    setGistInfo(null)
  }, [gistId])

  useEffect(() => {
    if (!data) return
    setFilesToFetch(data.filesList)
  }, [data])

  useEffect(() => {
    if (!files || !data) return
    setGistInfo({
      ...data,
      content: getFormattedMarkdown(files, data),
    })
  }, [data, files])

  return { data, gistInfo, isError, isPending }
}
