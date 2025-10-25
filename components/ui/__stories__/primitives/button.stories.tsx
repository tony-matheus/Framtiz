import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/primitives/button';
import { Download, Heart, Settings, Trash2, ExternalLink } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'xl', 'icon'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// All variants showcase
export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button variant='default'>Default</Button>
      <Button variant='destructive'>Destructive</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='link'>Link</Button>
    </div>
  ),
};

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-4'>
      <Button size='sm'>Small</Button>
      <Button size='default'>Default</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
      <Button size='icon'>
        <Settings className='h-4 w-4' />
      </Button>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button>
        <Download className='mr-2 h-4 w-4' />
        Download
      </Button>
      <Button variant='outline'>
        <Heart className='mr-2 h-4 w-4' />
        Like
      </Button>
      <Button variant='destructive'>
        <Trash2 className='mr-2 h-4 w-4' />
        Delete
      </Button>
      <Button variant='ghost'>
        <ExternalLink className='mr-2 h-4 w-4' />
        External Link
      </Button>
    </div>
  ),
};

// Icon only buttons
export const IconOnly: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button size='icon' variant='default'>
        <Settings className='h-4 w-4' />
      </Button>
      <Button size='icon' variant='outline'>
        <Heart className='h-4 w-4' />
      </Button>
      <Button size='icon' variant='destructive'>
        <Trash2 className='h-4 w-4' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Download className='h-4 w-4' />
      </Button>
    </div>
  ),
};

// Disabled states
export const Disabled: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button disabled>Disabled Default</Button>
      <Button variant='destructive' disabled>
        Disabled Destructive
      </Button>
      <Button variant='outline' disabled>
        Disabled Outline
      </Button>
      <Button variant='secondary' disabled>
        Disabled Secondary
      </Button>
      <Button variant='ghost' disabled>
        Disabled Ghost
      </Button>
      <Button variant='link' disabled>
        Disabled Link
      </Button>
    </div>
  ),
};

// Loading state simulation
export const Loading: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button disabled>
        <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
        Loading...
      </Button>
      <Button variant='outline' disabled>
        <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
        Processing
      </Button>
    </div>
  ),
};

// Interactive examples
export const Interactive: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-4'>
        <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
        <Button
          variant='outline'
          onClick={() => console.log('Outline clicked')}
        >
          Console Log
        </Button>
        <Button variant='destructive' onClick={() => confirm('Are you sure?')}>
          Confirm Action
        </Button>
      </div>
    </div>
  ),
};

// Full width example
export const FullWidth: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-2'>
      <Button className='w-full'>Full Width Button</Button>
      <Button variant='outline' className='w-full'>
        Full Width Outline
      </Button>
    </div>
  ),
};

// Button groups
export const ButtonGroup: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Button variant='outline'>Cancel</Button>
        <Button>Save</Button>
      </div>
      <div className='flex gap-2'>
        <Button variant='ghost'>Back</Button>
        <Button variant='outline'>Save Draft</Button>
        <Button>Publish</Button>
      </div>
      <div className='flex gap-2'>
        <Button variant='destructive'>Delete</Button>
        <Button variant='outline'>Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </div>
  ),
};

// Custom styling example
export const CustomStyling: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'>
        Gradient Button
      </Button>
      <Button className='rounded-full'>Rounded Button</Button>
      <Button className='shadow-lg hover:shadow-xl'>Shadow Button</Button>
    </div>
  ),
};

// As child example (using as a link)
export const AsChild: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button asChild>
        <a href='https://example.com' target='_blank' rel='noopener noreferrer'>
          <ExternalLink className='mr-2 h-4 w-4' />
          External Link
        </a>
      </Button>
      <Button variant='outline' asChild>
        <a href='/about'>About Page</a>
      </Button>
    </div>
  ),
};

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-4'>
        <Button aria-label='Close dialog'>×</Button>
        <Button aria-describedby='help-text'>Submit Form</Button>
        <Button disabled aria-disabled='true'>
          Disabled with aria-disabled
        </Button>
      </div>
      <p id='help-text' className='text-sm text-gray-600'>
        This button submits the form when clicked.
      </p>
    </div>
  ),
};
