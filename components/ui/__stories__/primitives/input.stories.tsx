import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PrimitiveInput } from "@/components/ui/primitives/input"

const meta: Meta<typeof PrimitiveInput> = {
  title: "UI/Primitives/Input",
  component: PrimitiveInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "search"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    placeholder: {
      control: { type: "text" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "Hello world",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
}

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "0",
  },
}

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <label htmlFor="input-with-label" className="text-sm font-medium">
        Label
      </label>
      <PrimitiveInput id="input-with-label" placeholder="Type here..." />
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <PrimitiveInput placeholder="Full width input" className="w-full" />
      <PrimitiveInput placeholder="Another full width" className="w-full" />
    </div>
  ),
}
