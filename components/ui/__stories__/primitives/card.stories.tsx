import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  PrimitiveCard,
  PrimitiveCardHeader,
  PrimitiveCardTitle,
  PrimitiveCardDescription,
  PrimitiveCardContent,
  PrimitiveCardFooter,
} from "@/components/ui/primitives/card"
import { Button } from "@/components/ui/primitives/button"

const meta: Meta<typeof PrimitiveCard> = {
  title: "UI/Primitives/Card",
  component: PrimitiveCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PrimitiveCard className="w-[350px]">
      <PrimitiveCardHeader>
        <PrimitiveCardTitle>Card Title</PrimitiveCardTitle>
        <PrimitiveCardDescription>
          A short description of the card content.
        </PrimitiveCardDescription>
      </PrimitiveCardHeader>
      <PrimitiveCardContent>
        <p className="text-sm">
          Card content goes here. You can put any content inside the card body.
        </p>
      </PrimitiveCardContent>
      <PrimitiveCardFooter>
        <Button size="sm">Action</Button>
      </PrimitiveCardFooter>
    </PrimitiveCard>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <PrimitiveCard className="w-[350px]">
      <PrimitiveCardHeader>
        <PrimitiveCardTitle>Header Only</PrimitiveCardTitle>
        <PrimitiveCardDescription>
          This card has no content or footer.
        </PrimitiveCardDescription>
      </PrimitiveCardHeader>
    </PrimitiveCard>
  ),
}

export const ContentOnly: Story = {
  render: () => (
    <PrimitiveCard className="w-[350px]">
      <PrimitiveCardContent className="pt-6">
        <p className="text-sm">
          This card has only content, no header or footer.
        </p>
      </PrimitiveCardContent>
    </PrimitiveCard>
  ),
}

export const WithFooterActions: Story = {
  render: () => (
    <PrimitiveCard className="w-[350px]">
      <PrimitiveCardHeader>
        <PrimitiveCardTitle>Confirm Action</PrimitiveCardTitle>
        <PrimitiveCardDescription>
          Are you sure you want to continue?
        </PrimitiveCardDescription>
      </PrimitiveCardHeader>
      <PrimitiveCardContent>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone.
        </p>
      </PrimitiveCardContent>
      <PrimitiveCardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </PrimitiveCardFooter>
    </PrimitiveCard>
  ),
}

export const MultipleCards: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <PrimitiveCard className="w-[280px]">
        <PrimitiveCardHeader>
          <PrimitiveCardTitle>Card 1</PrimitiveCardTitle>
          <PrimitiveCardDescription>First card</PrimitiveCardDescription>
        </PrimitiveCardHeader>
        <PrimitiveCardContent>
          <p className="text-sm">Content for card 1.</p>
        </PrimitiveCardContent>
      </PrimitiveCard>
      <PrimitiveCard className="w-[280px]">
        <PrimitiveCardHeader>
          <PrimitiveCardTitle>Card 2</PrimitiveCardTitle>
          <PrimitiveCardDescription>Second card</PrimitiveCardDescription>
        </PrimitiveCardHeader>
        <PrimitiveCardContent>
          <p className="text-sm">Content for card 2.</p>
        </PrimitiveCardContent>
      </PrimitiveCard>
      <PrimitiveCard className="w-[280px]">
        <PrimitiveCardHeader>
          <PrimitiveCardTitle>Card 3</PrimitiveCardTitle>
          <PrimitiveCardDescription>Third card</PrimitiveCardDescription>
        </PrimitiveCardHeader>
        <PrimitiveCardContent>
          <p className="text-sm">Content for card 3.</p>
        </PrimitiveCardContent>
      </PrimitiveCard>
    </div>
  ),
}
