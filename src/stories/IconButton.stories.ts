import { Meta, StoryObj } from "@storybook/react";
import { FaCog, FaHome, FaUser } from "react-icons/fa";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
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
    icon: {
      control: { type: "select" },
      options: ["Home", "User", "Settings"], // 아이콘 이름을 문자열로 전달
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: FaHome,
    intent: "default",
    size: "md",
    outline: false,
    isLoading: false,
  },
};

export const Primary: Story = {
  args: {
    icon: FaHome,
    intent: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    icon: FaUser,
    intent: "secondary",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    icon: FaCog,
    intent: "danger",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    icon: FaHome,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    icon: FaHome,
    size: "lg",
  },
};

export const Outline: Story = {
  args: {
    icon: FaUser,
    outline: true,
  },
};

export const Loading: Story = {
  args: {
    icon: FaCog,
    isLoading: true,
  },
};

export const LinkButton: Story = {
  args: {
    icon: FaHome,
    href: "https://example.com",
  },
};
