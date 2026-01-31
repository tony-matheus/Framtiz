"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import { Project } from "@/lib/services/project-service"
import Heading from "@/components/ui/typography/heading"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  id: Project["id"]
  title: Project["title"]
  status?: Project["status"]
  description?: Project["description"]
  githubUrl: Project["github_url"]
  onEdit: () => void
  onDelete: () => void
}

export default function ProjectCard({
  title,
  status,
  description,
  githubUrl,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card
      className="group h-full transition-[colors,shadow,transform]
 duration-300 ease-in-out hover:translate-y-[-5px] hover:border-purple-600 hover:shadow-accent"
    >
      <CardContent>
        <div className="mb-3 flex items-start justify-between gap-2">
          <Heading as="h4" className="h-[84px] font-mono">
            {title}
          </Heading>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={onEdit}
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="size-7 text-red-500"
              onClick={onDelete}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1 font-mono text-xs text-slate-400">STATUS</p>
          <div className="flex items-center">
            <span
              className={cn(
                "w-2 h-2  mr-2 animate-pulse",
                status === "INACTIVE" ? "bg-red-400" : "bg-green-400",
              )}
            ></span>
            <span
              className={cn(
                " text-sm font-mono",
                status === "INACTIVE" ? "text-red-400" : "text-green-400",
              )}
            >
              {status}
            </span>
          </div>
        </div>

        <p className="mb-3 text-sm text-slate-400">{description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-2 text-xs text-slate-500">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-purple-400 transition-colors hover:text-green-400"
          >
            <ExternalLink size={12} className="mr-1" />
            GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
