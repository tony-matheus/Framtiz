import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PrimitiveCheckbox } from "@/components/ui/primitives/checkbox"
import { useState } from "react"

const meta: Meta<typeof PrimitiveCheckbox> = {
  title: "UI/Primitives/Checkbox",
  component: PrimitiveCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <PrimitiveCheckbox disabled />
        <span className="text-sm">Disabled unchecked</span>
      </div>
      <div className="flex items-center gap-2">
        <PrimitiveCheckbox disabled checked />
        <span className="text-sm">Disabled checked</span>
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <PrimitiveCheckbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Controlled: Story = {
  render: function ControlledStory() {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-2">
        <PrimitiveCheckbox
          id="controlled"
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <label
          htmlFor="controlled"
          className="cursor-pointer text-sm font-medium leading-none"
        >
          {checked ? "Checked" : "Unchecked"}
        </label>
      </div>
    )
  },
}

export const Indeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <PrimitiveCheckbox checked="indeterminate" />
      <span className="text-sm">Indeterminate state</span>
    </div>
  ),
}
