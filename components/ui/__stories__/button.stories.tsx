import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import {
  Download,
  Heart,
  Settings,
  Trash2,
  ExternalLink,
  Play,
  Pause,
  Save,
  Upload,
} from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0a0a" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "warning",
        "ghost",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "xl", "icon"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    asChild: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "Cyber Button",
  },
}

// All variants showcase
export const Variants: Story = {
  render: (props) => (
    <div className="flex flex-wrap gap-4">
      <Button {...props} variant="default">
        Default
      </Button>
      <Button {...props} variant="secondary">
        Secondary
      </Button>
      <Button {...props} variant="destructive">
        Destructive
      </Button>
      <Button {...props} variant="outline">
        Outline
      </Button>
      <Button {...props} variant="warning">
        Warning
      </Button>
      <Button {...props} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
}

// All sizes showcase
export const Sizes: Story = {
  render: (props) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...props} size="sm">
        Small
      </Button>
      <Button {...props} size="default">
        Default
      </Button>
      <Button {...props} size="lg">
        Large
      </Button>
      <Button {...props} size="xl">
        Extra Large
      </Button>
      <Button {...props} size="icon">
        <Settings className="size-4" />
      </Button>
    </div>
  ),
}

// With left and right icons
export const WithIcons: Story = {
  render: (props) => (
    <div className="flex flex-wrap gap-4">
      <Button {...props} leftIcon={<Download className="size-4" />}>
        Download
      </Button>
      <Button
        {...props}
        variant="secondary"
        leftIcon={<Heart className="size-4" />}
      >
        Like
      </Button>
      <Button
        {...props}
        variant="destructive"
        leftIcon={<Trash2 className="size-4" />}
      >
        Delete
      </Button>
      <Button
        {...props}
        variant="warning"
        rightIcon={<ExternalLink className="size-4" />}
      >
        External Link
      </Button>
      <Button
        {...props}
        variant="outline"
        leftIcon={<Play className="size-4" />}
        rightIcon={<Pause className="size-4" />}
      >
        Play/Pause
      </Button>
    </div>
  ),
}

// Icon only buttons
export const IconOnly: Story = {
  render: (props) => (
    <div className="flex flex-wrap gap-4">
      <Button {...props} size="icon" variant="default">
        <Settings className="size-4" />
      </Button>
      <Button {...props} size="icon" variant="secondary">
        <Heart className="size-4" />
      </Button>
      <Button {...props} size="icon" variant="destructive">
        <Trash2 className="size-4" />
      </Button>
      <Button {...props} size="icon" variant="warning">
        <Download className="size-4" />
      </Button>
      <Button {...props} size="icon" variant="outline">
        <Save className="size-4" />
      </Button>
      <Button {...props} size="icon" variant="ghost">
        <Upload className="size-4" />
      </Button>
    </div>
  ),
}

// Loading states
export const Loading: Story = {
  render: (props) => (
    <div className="flex flex-wrap gap-4">
      <Button {...props} isLoading>
        Loading...
      </Button>
      <Button {...props} variant="secondary" isLoading>
        Save Changes
      </Button>
      <Button {...props} variant="destructive" isLoading>
        Deleting...
      </Button>
      <Button {...props} variant="warning" isLoading>
        Upload File
      </Button>
      <Button {...props} size="icon" variant="default" isLoading>
        <Settings className="size-4" />
      </Button>
    </div>
  ),
}

// Disabled states
export const Disabled: Story = {
  render: (props) => (
    <div className="flex flex-wrap gap-4">
      <Button {...props} disabled>
        Disabled Primary
      </Button>
      <Button {...props} variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button {...props} variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button {...props} variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button {...props} variant="warning" disabled>
        Disabled Warning
      </Button>
      <Button {...props} variant="ghost" disabled>
        Disabled Ghost
      </Button>
    </div>
  ),
}

// Interactive examples
export const Interactive: Story = {
  render: (props) => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button {...props} onClick={() => alert("Cyber button clicked!")}>
          Click Me
        </Button>
        <Button
          {...props}
          variant="outline"
          onClick={() => console.log("Outline clicked")}
        >
          Console Log
        </Button>
        <Button
          {...props}
          variant="destructive"
          onClick={() => confirm("Are you sure?")}
        >
          Confirm Action
        </Button>
        <Button
          {...props}
          variant="warning"
          onClick={() => alert("Warning action!")}
        >
          Warning Action
        </Button>
      </div>
    </div>
  ),
}

// Full width example
export const FullWidth: Story = {
  render: (props) => (
    <div className="w-full max-w-md space-y-2">
      <Button {...props} className="w-full">
        Full Width Primary
      </Button>
      <Button {...props} variant="outline" className="w-full">
        Full Width Outline
      </Button>
      <Button {...props} variant="secondary" className="w-full">
        Full Width Secondary
      </Button>
    </div>
  ),
}

// Button groups
export const ButtonGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost">Back</Button>
        <Button variant="outline">Save Draft</Button>
        <Button>Publish</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="warning">Warning</Button>
        <Button variant="secondary">Secondary</Button>
        <Button>Primary</Button>
      </div>
    </div>
  ),
}

// As child example (using as a link)
export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 size-4" />
          External Link
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="/about">About Page</a>
      </Button>
      <Button variant="secondary" asChild>
        <a href="/contact">Contact Us</a>
      </Button>
    </div>
  ),
}

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button aria-label="Close dialog">×</Button>
        <Button aria-describedby="help-text">Submit Form</Button>
        <Button disabled aria-disabled="true">
          Disabled with aria-disabled
        </Button>
        <Button isLoading aria-label="Loading content">
          Loading...
        </Button>
      </div>
      <p id="help-text" className="text-sm text-gray-400">
        This cyber button submits the form when clicked.
      </p>
    </div>
  ),
}

// Cyber theme showcase
export const CyberTheme: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-4 font-mono text-lg text-purple-300">
          Cyber Interface
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" leftIcon={<Play className="size-4" />}>
            Initialize
          </Button>
          <Button
            variant="secondary"
            leftIcon={<Settings className="size-4" />}
          >
            Configure
          </Button>
          <Button variant="warning" leftIcon={<Upload className="size-4" />}>
            Upload Data
          </Button>
          <Button
            variant="destructive"
            leftIcon={<Trash2 className="size-4" />}
          >
            Delete All
          </Button>
        </div>
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-mono text-lg text-green-300">
          System Controls
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="icon" variant="default">
            <Play className="size-4" />
          </Button>
          <Button size="icon" variant="secondary">
            <Pause className="size-4" />
          </Button>
          <Button size="icon" variant="warning">
            <Settings className="size-4" />
          </Button>
          <Button size="icon" variant="destructive">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
}

// Loading states with different text
export const LoadingVariations: Story = {
  render: (props) => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button isLoading>Connect</Button>
        <Button {...props} variant="secondary" isLoading>
          Save Changes
        </Button>
        <Button {...props} variant="warning" isLoading>
          Upload File
        </Button>
        <Button {...props} variant="destructive" isLoading>
          Delete Item
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button {...props} size="sm" isLoading>
          Process
        </Button>
        <Button {...props} size="lg" variant="outline" isLoading>
          Initialize System
        </Button>
        <Button {...props} size="xl" variant="ghost" isLoading>
          Load Data
        </Button>
      </div>
    </div>
  ),
}
