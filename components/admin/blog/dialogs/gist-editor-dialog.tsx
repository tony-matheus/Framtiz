import SimpleDialog from "@/components/ui/dialogs/simple-dialog"

export default function GistEditorDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <SimpleDialog title="Gist Editor" open={open} onOpenChange={onOpenChange}>
      <div>GistEditorDialog</div>
    </SimpleDialog>
  )
}
