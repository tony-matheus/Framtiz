import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  PrimitivePopover,
  PrimitivePopoverTrigger,
  PrimitivePopoverContent,
} from "@/components/ui/primitives/popover"
import { Button } from "@/components/ui/primitives/button"

const meta: Meta<typeof PrimitivePopover> = {
  title: "UI/Primitives/Popover",
  component: PrimitivePopover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent>
        <div className="grid gap-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is the popover content. You can put any content here.
          </p>
        </div>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}

export const WithForm: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="width" className="text-sm">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="height" className="text-sm">
                Height
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
              />
            </div>
          </div>
        </div>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}

export const AlignStart: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent align="start" className="w-64">
        <p className="text-sm">
          This popover is aligned to the start of the trigger.
        </p>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Align End</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent align="end" className="w-64">
        <p className="text-sm">
          This popover is aligned to the end of the trigger.
        </p>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}

export const SideTop: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Open Above</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent side="top" className="w-64">
        <p className="text-sm">This popover opens above the trigger.</p>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}

export const SideLeft: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Open Left</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent side="left" className="w-48">
        <p className="text-sm">This popover opens to the left.</p>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}

export const ListContent: Story = {
  render: () => (
    <PrimitivePopover>
      <PrimitivePopoverTrigger asChild>
        <Button variant="outline">Options</Button>
      </PrimitivePopoverTrigger>
      <PrimitivePopoverContent className="w-48 p-0">
        <ul className="py-1">
          <li className="cursor-pointer px-3 py-2 text-sm hover:bg-accent">
            Option 1
          </li>
          <li className="cursor-pointer px-3 py-2 text-sm hover:bg-accent">
            Option 2
          </li>
          <li className="cursor-pointer px-3 py-2 text-sm hover:bg-accent">
            Option 3
          </li>
        </ul>
      </PrimitivePopoverContent>
    </PrimitivePopover>
  ),
}
