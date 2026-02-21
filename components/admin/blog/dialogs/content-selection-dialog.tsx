import { Button } from "@/components/ui/button"
import SimpleDialog from "@/components/ui/dialogs/simple-dialog"
import {
  CodeSquareIcon,
  FileEditIcon,
  FileTextIcon,
  PencilRulerIcon,
} from "lucide-react"
import { useState } from "react"
import BlogEditorDialog, { BlogEditorDialogProps } from "./blog-editor-dialog"
import { Button as PrimitiveButton } from "@/components/ui/primitives/button"
import { Blog } from "@/lib/services/blog-service/helpers"

type ContentSelectionOption = "blog" | "gist" | null

interface ContentSelectionDialogProps extends Omit<
  BlogEditorDialogProps,
  "isOpen" | "onOpenChange"
> {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export default function ContentSelectionDialog({
  open = true,
  onOpenChange,
  onSave,
  blog,
  onCancel,
}: ContentSelectionDialogProps) {
  const [selectedOption, setSelectedOption] =
    useState<ContentSelectionOption>(null)
  const [optionSelected, setOptionSelected] = useState<boolean>(false)

  const handleCancel = () => {
    setSelectedOption(null)
    setOptionSelected(false)
    onCancel()
  }

  const handleSave = ({
    shouldClose,
    blog,
  }: {
    shouldClose?: boolean
    blog?: Blog | null
  }) => {
    if (shouldClose) {
      setSelectedOption(null)
      setOptionSelected(false)
    }
    onSave({
      shouldClose,
      blog,
    })
  }

  if (optionSelected && selectedOption === "blog") {
    return (
      <BlogEditorDialog
        isOpen={open}
        onOpenChange={onOpenChange}
        onSave={handleSave}
        onCancel={handleCancel}
        blog={blog}
      />
    )
  }

  if (optionSelected && selectedOption === "gist") {
    return (
      <BlogEditorDialog
        isOpen={open}
        onOpenChange={onOpenChange}
        onSave={handleSave}
        onCancel={handleCancel}
        blog={blog}
        type="gist"
      />
    )
  }

  return (
    <SimpleDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={<FileEditIcon />}
      title="Criar conteúdo"
      hideFooter
      className="!min-h-[50vh] md:!max-w-[60vw]"
    >
      <div className="flex h-full flex-col gap-6">
        <p className="text-lg">
          Fala pra mim manito, tu quer criar o que hoje?
        </p>
        <div className="flex flex-1 gap-4">
          <PrimitiveButton
            variant={selectedOption === "blog" ? "default" : "outline"}
            onClick={() => setSelectedOption("blog")}
            className="h-full flex-1"
          >
            <div className="flex flex-col items-center gap-2">
              <FileTextIcon className="size-10 md:size-16" />
              <p className="font-mono">Blogzada?</p>
            </div>
          </PrimitiveButton>

          <PrimitiveButton
            variant={selectedOption === "gist" ? "default" : "outline"}
            onClick={() => setSelectedOption("gist")}
            className="h-full flex-1"
          >
            <div className="flex flex-col items-center gap-2">
              <CodeSquareIcon className="size-10 md:size-16" />
              <p className="font-mono">GISTzeira?</p>
            </div>
          </PrimitiveButton>
        </div>
        <Button
          variant="secondary"
          onClick={() => setOptionSelected(true)}
          leftIcon={<PencilRulerIcon size={16} />}
          disabled={!selectedOption}
          size="lg"
          className="w-full"
        >
          Começar a criar
        </Button>
      </div>
    </SimpleDialog>
  )
}
