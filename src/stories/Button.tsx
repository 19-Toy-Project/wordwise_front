import React from "react";
import { IconType } from "react-icons";
import "./button.css";

export interface ButtonProps {
  /** 버튼의 링크 */
  href?: string;
  /** 로딩 상태 여부 */
  isLoading?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: IconType;
  /** 오른쪽 아이콘 */
  rightIcon?: IconType;
  /** 아이콘에 대한 추가 클래스 */
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 버튼 스타일 */
  intent?: "primary" | "secondary" | "danger" | "default";
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg";
  /** 아웃라인 스타일 */
  outline?: boolean;
}

/** 기본 UI 버튼 컴포넌트 */
export const Button = ({
  children,
  isLoading = false,
  intent = "default",
  size = "md",
  outline = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  classNames,
  ...props
}: ButtonProps) => {
  const mode =
    intent === "primary"
      ? "storybook-button--primary"
      : intent === "secondary"
      ? "storybook-button--secondary"
      : intent === "danger"
      ? "storybook-button--danger"
      : "storybook-button--default";

  return (
    <button
      type="button"
      className={[
        "storybook-button",
        `storybook-button--${size}`,
        mode,
        outline ? "storybook-button--outline" : "",
      ].join(" ")}
      disabled={isLoading}
      {...props}
    >
      {LeftIcon && (
        <div className={classNames?.leftIcon}>
          <LeftIcon size="1em" />
        </div>
      )}
      {isLoading ? "Loading..." : children}
      {RightIcon && (
        <div className={classNames?.rightIcon}>
          <RightIcon size="1em" />
        </div>
      )}
    </button>
  );
};
