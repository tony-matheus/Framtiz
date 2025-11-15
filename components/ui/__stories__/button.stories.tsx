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
    loadingText: {
      control: { type: "text" },
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
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">
        <Settings className="size-4" />
      </Button>
    </div>
  ),
}

// With left and right icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Download className="size-4" />}>Download</Button>
      <Button variant="secondary" leftIcon={<Heart className="size-4" />}>
        Like
      </Button>
      <Button variant="destructive" leftIcon={<Trash2 className="size-4" />}>
        Delete
      </Button>
      <Button variant="warning" rightIcon={<ExternalLink className="size-4" />}>
        External Link
      </Button>
      <Button
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
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button size="icon" variant="default">
        <Settings className="size-4" />
      </Button>
      <Button size="icon" variant="secondary">
        <Heart className="size-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash2 className="size-4" />
      </Button>
      <Button size="icon" variant="warning">
        <Download className="size-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Save className="size-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Upload className="size-4" />
      </Button>
    </div>
  ),
}

// Loading states
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button isLoading>Loading...</Button>
      <Button variant="secondary" isLoading loadingText="Processing...">
        Save Changes
      </Button>
      <Button variant="destructive" isLoading>
        Deleting...
      </Button>
      <Button variant="warning" isLoading loadingText="Uploading...">
        Upload File
      </Button>
      <Button size="icon" variant="default" isLoading>
        <Settings className="size-4" />
      </Button>
    </div>
  ),
}

// Disabled states
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button variant="warning" disabled>
        Disabled Warning
      </Button>
      <Button variant="ghost" disabled>
        Disabled Ghost
      </Button>
    </div>
  ),
}

// Interactive examples
export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => alert("Cyber button clicked!")}>Click Me</Button>
        <Button
          variant="outline"
          onClick={() => console.log("Outline clicked")}
        >
          Console Log
        </Button>
        <Button variant="destructive" onClick={() => confirm("Are you sure?")}>
          Confirm Action
        </Button>
        <Button variant="warning" onClick={() => alert("Warning action!")}>
          Warning Action
        </Button>
      </div>
    </div>
  ),
}

// Full width example
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <Button className="w-full">Full Width Primary</Button>
      <Button variant="outline" className="w-full">
        Full Width Outline
      </Button>
      <Button variant="secondary" className="w-full">
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

// Custom styling example
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button className="border-purple-400 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        Gradient Cyber
      </Button>
      <Button className="rounded-full border-green-400 text-green-400">
        Rounded Cyber
      </Button>
      <Button className="border-yellow-400 text-yellow-400 shadow-lg hover:shadow-xl">
        Shadow Cyber
      </Button>
      <Button className="border-4 border-cyan-400 text-cyan-400 hover:bg-cyan-900/30">
        Thick Border
      </Button>
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
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button isLoading loadingText="Connecting...">
          Connect
        </Button>
        <Button variant="secondary" isLoading loadingText="Saving...">
          Save Changes
        </Button>
        <Button variant="warning" isLoading loadingText="Uploading...">
          Upload File
        </Button>
        <Button variant="destructive" isLoading loadingText="Deleting...">
          Delete Item
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button size="sm" isLoading loadingText="Processing...">
          Process
        </Button>
        <Button
          size="lg"
          variant="outline"
          isLoading
          loadingText="Initializing..."
        >
          Initialize System
        </Button>
        <Button size="xl" variant="ghost" isLoading loadingText="Loading...">
          Load Data
        </Button>
      </div>
    </div>
  ),
}
