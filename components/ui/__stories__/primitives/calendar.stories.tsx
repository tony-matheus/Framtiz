import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Calendar } from "@/components/ui/primitives/calendar"
import { addDays, subDays } from "date-fns"

const meta: Meta<typeof Calendar> = {
  title: "UI/Primitives/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "range", "multiple"],
    },
    captionLayout: {
      control: { type: "select" },
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    showOutsideDays: {
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

export const WithSelectedDate: Story = {
  args: {
    mode: "single",
    selected: new Date(),
  },
}

export const WithDateRange: Story = {
  args: {
    mode: "range",
    selected: {
      from: subDays(new Date(), 3),
      to: addDays(new Date(), 3),
    },
  },
}

export const WithMultipleDates: Story = {
  args: {
    mode: "multiple",
    selected: [new Date(), addDays(new Date(), 2), addDays(new Date(), 5)],
  },
}

export const WithDisabledDates: Story = {
  args: {
    disabled: (date) => date.getDay() === 0 || date.getDay() === 6,
  },
}

export const DropdownCaption: Story = {
  args: {
    captionLayout: "dropdown",
  },
}

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Ghost (default)</p>
        <Calendar buttonVariant="ghost" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Outline</p>
        <Calendar buttonVariant="outline" />
      </div>
    </div>
  ),
}
