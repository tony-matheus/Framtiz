import { GithubGist } from "@/app/api/github/gists/route"
import { useGithubGists } from "@/hooks/github/use-github-gists"
import { createContext, useCallback, useContext, useState } from "react"

interface GistListState {
  gists: GithubGist[]
  selectedGists: GithubGist[]
  totalPages: number
  currentPage: number
  isLoading: boolean
  isError: boolean
}

interface GistListActions {
  onSelectGist: (_value: GithubGist) => void
  goToPage: (_value: number) => void
}

const GistListStateContext = createContext<GistListState | null>(null)
const GistListActionsContext = createContext<GistListActions | null>(null)

export const useGistListState = () => {
  const context = useContext(GistListStateContext)
  if (!context) {
    throw new Error(
      "useGistListState must be used within a GistListContextProvider",
    )
  }
  return context
}

export const useGistListActions = () => {
  const context = useContext(GistListActionsContext)
  if (!context) {
    throw new Error(
      "useGistListActions must be used within a GistListContextProvider",
    )
  }
  return context
}

export default function GistListContext({
  children,
  enabled = true,
}: {
  children: React.ReactNode
  enabled: boolean
}) {
  const {
    data: gists,
    totalPages,
    currentPage,
    goToPage,
    isLoading,
    isError,
  } = useGithubGists(1, 10, { enabled })
  const [selectedGists, setSelectedGists] = useState<GithubGist[]>([])

  const handleSelectGist = useCallback(
    (gist: GithubGist) => {
      if (selectedGists.some((g) => g.id === gist.id)) {
        return setSelectedGists(selectedGists.filter((g) => g.id !== gist.id))
      }
      setSelectedGists([...selectedGists, gist])
    },
    [selectedGists],
  )

  return (
    <GistListStateContext.Provider
      value={{
        gists,
        totalPages,
        currentPage,
        isLoading,
        isError,
        selectedGists,
      }}
    >
      <GistListActionsContext.Provider
        value={{ onSelectGist: handleSelectGist, goToPage }}
      >
        {children}
      </GistListActionsContext.Provider>
    </GistListStateContext.Provider>
  )
}
