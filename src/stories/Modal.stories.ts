import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    message: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    message: "english sentence",
    type: "default",
  },
};
export const Alert: Story = {
  args: {
    message: "english sentence",
    type: "alert",
  },
};
