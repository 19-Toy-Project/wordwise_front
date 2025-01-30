import { about, home, mypage } from "@/constants/pathname";
import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  argTypes: {
    logoSrc: { control: "text" },
    homeUrl: { control: "text" },
    aboutUrl: { control: "text" },
    mypageUrl: { control: "text" },
    showAuthButtons: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoSrc: "/svg/Logo.svg",
    homeUrl: home,
    aboutUrl: about,
    mypageUrl: mypage,
    showAuthButtons: true,
  },
};

export const WithoutAuthButtons: Story = {
  args: {
    ...Default.args,
    showAuthButtons: false,
  },
};
