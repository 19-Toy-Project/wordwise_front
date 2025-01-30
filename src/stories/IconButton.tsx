import Link from "next/link";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";
import "./IconButton.css"; // 일반 CSS 적용

export interface IconButtonProps {
  href?: string;
  isLoading?: boolean;
  icon?: IconType;
  intent?: "primary" | "secondary" | "danger" | "default";
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  onClick?: () => void;
  className?: string;
}

/** 스토리북용 아이콘 버튼 컴포넌트 */
export const IconButton = ({
  href,
  isLoading = false,
  icon: Icon,
  intent = "default",
  size = "md",
  outline = false,
  onClick,
  className,
}: IconButtonProps) => {
  const buttonClass = [
    "icon-button",
    `icon-button--${intent}`,
    `icon-button--${size}`,
    outline ? "icon-button--outline" : "",
    className,
  ]
    .join(" ")
    .trim();

  // ✅ 링크 버튼 (href가 있는 경우)
  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {isLoading ? (
          <ImSpinner2 className="icon-spinner" />
        ) : (
          Icon && <Icon size="1em" />
        )}
      </Link>
    );
  }

  // ✅ 일반 버튼
  return (
    <button className={buttonClass} onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <ImSpinner2 className="icon-spinner" />
      ) : (
        Icon && <Icon size="1em" />
      )}
    </button>
  );
};
