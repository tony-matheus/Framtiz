import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { CyberDataDisplay } from "@/components/ui-custom/cyber-data-display"
import Input from "@/components/ui/input"
import Heading from "@/components/ui/typography/heading"
import { useUpdateProfile } from "@/hooks/profile/use-update-profile"
import { cn } from "@/lib/utils"
import { Github, RefreshCw } from "lucide-react"
import { useState } from "react"

interface GithubConnection {
  connected?: boolean
  className?: string
  onSave: () => void
}

export default function GithubConnection({
  connected = false,
  className,
  onSave,
}: GithubConnection) {
  const { mutate, isPending, error, isSuccess } = useUpdateProfile()

  const [githubUsername, setGithubUsername] = useState("")

  const handleSubmit = async () => {
    await mutate({
      github_username: githubUsername,
    })

    onSave()
  }

  return (
    <Card className={cn("p-8 ", className)}>
      <CardContent>
        <div className="mb-4 flex flex-col items-center justify-between md:mx-auto md:max-w-[400px] lg:max-w-[600px]">
          <Github className="mr-2 text-purple-400" size={100} />
          <Heading as="h2" className="mt-8 font-mono">
            GITHUB_CONNECTION
          </Heading>
          <p className="mt-4 font-mono text-sm text-slate-200">
            Type your github username to sync repos from your account.
          </p>
          {connected ? (
            <CyberDataDisplay
              label="USERNAME"
              value={githubUsername}
              className="mt-4 w-full"
            />
          ) : (
            <Input
              label="GITHUB_USERNAME"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
            />
          )}
          {!!error && (
            <p className="my-4 font-mono text-sm text-red-200">
              Something went wrong! try again later
            </p>
          )}

          {isSuccess && (
            <p className="my-4 font-mono text-sm text-red-200">
              Github username saved!
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSubmit}
              variant="default"
              leftIcon={<RefreshCw size={16} />}
              isLoading={isPending}
            >
              SAVE_AND_SYNC_REPOSITORIES
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
