import { useEffect, useState } from "react"
import { useCreateBlog } from "./use-create-blog"
import { GithubGist } from "@/app/api/github/gists/route"

export const useCreateBlogFromGists = (onSave?: () => void) => {
  const [progress, setProgress] = useState<number>(0)
  const [saving, setSaving] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [failedGists, setFailedGists] = useState<GithubGist[]>([])
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [successful, setSuccessful] = useState(false)

  const { mutateAsync } = useCreateBlog()
  const createBlogFromGists = async (
    gists: GithubGist[],
    handleLogUpdate: (message: string) => void,
  ) => {
    setSaving(true)
    setProgress(0)
    setFailedGists([])

    const failedGistList: GithubGist[] = []
    const errors: string[] = []

    handleLogUpdate("Start Creation")
    handleLogUpdate("")

    for (let index = 0; index < gists.length; index++) {
      const selectedGist = gists[index]
      handleLogUpdate(`processing ${selectedGist.name}...`)

      try {
        await mutateAsync({
          title: selectedGist.name,
          content: selectedGist.description,
          published: false,
          type: "gist",
        })
        handleLogUpdate(`gist ${selectedGist.name} successfully created ✅`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const errorMessage =
          e?.response?.data?.error || "Unknown error occurred"
        failedGists.push(selectedGist)
        errors.push(errorMessage)
        handleLogUpdate(
          `gist ${selectedGist.name} failed to be created ❌, error: ${errorMessage}`,
        )
      }

      setProgress(Math.round(((index + 1) / gists.length) * 100))
    }

    setSaving(false)
    setFailedGists(failedGistList)
    setHasError(failedGistList.length > 0)
    setSuccessful(failedGistList.length === 0)
    setErrorMessages(errors)
    onSave?.()
  }

  return {
    progress,
    saving,
    hasError,
    successful,
    failedGists,
    errorMessages,
    createBlogFromGists,
  }
}

export default function useImportGists({
  logContainerRef,
  onSave,
}: {
  logContainerRef: React.RefObject<HTMLDivElement>
  onSave?: () => void
}) {
  const { createBlogFromGists: mutate, ...data } =
    useCreateBlogFromGists(onSave)

  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs, logContainerRef])

  const handleLogUpdate = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message])
  }

  const createBlogFromGistsWithLogging = async (
    selectedGists: GithubGist[],
  ) => {
    await mutate(selectedGists, handleLogUpdate)
  }
  return {
    ...data,
    createBlogFromGistsWithLogging,
    logs,
    logContainerRef,
  }
}
