import { Meta, StoryObj } from "@storybook/react";
import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  title: "Components/Title",
  component: Title,
  argTypes: {
    title: { control: "text" },
    size: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Medium: Story = {
  args: {
    title: "title",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    title: "title",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    title: "title",
    size: "lg",
  },
};
