import { Meta, StoryObj } from "@storybook/react";
import { FaBeer } from "react-icons/fa";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    intent: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "default"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    outline: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    leftIcon: {
      control: { type: "boolean" },
    },
    rightIcon: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
    intent: "default",
    size: "md",
    outline: false,
    isLoading: false,
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    intent: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    intent: "secondary",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    intent: "danger",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Outline: Story = {
  args: {
    children: "Outlined Button",
    outline: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading...",
    isLoading: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Left Icon",
    leftIcon: FaBeer,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Right Icon",
    rightIcon: FaBeer,
  },
};

export const LinkButton: Story = {
  args: {
    children: "Go to Google",
    href: "https://google.com",
  },
};
