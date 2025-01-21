import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { ComponentProps } from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

type ButtonProps = ButtonVariantProps & {
  href?: string;
  isLoading?: boolean;
  icon?: IconType;
  classNames?: {
    icon?: string;
  };
} & (ComponentProps<"button"> | ComponentProps<typeof Link>);
type ButtonVariantProps = VariantProps<typeof buttonVariant>;

const buttonVariant = cva(
  "rounded-md border font-semibold hover:brightness-90 active:brightness-75",
  {
    variants: {
      intent: {
        primary: "bg-blue-500 border-blue-500",
        danger: "bg-red-500 border-red-500",
        secondary: "bg-yellow-500 border-yellow-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-[15px]",
        lg: "px-5 py-2.5 text-[17px]",
      },
      outline: {
        true: "bg-white",
        false: "text-white",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        outline: false,
        className: "text-blue-500",
      },
      {
        intent: "danger",
        outline: false,
        className: "text-red-500",
      },
      {
        intent: "secondary",
        outline: false,
        className: "text-yellow-500",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      outline: false,
    },
  }
);

const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { isLoading, intent, size, outline, icon: Icon, classNames, ...props },
    ref
  ) => {
    const buttonClass = buttonVariant({ intent, size, outline });
    if ("href" in props && props.href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={buttonClass}
          {...(props as ComponentProps<typeof Link>)}
        >
          {isLoading && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ImSpinner2 className="animate-spin" />
            </div>
          )}
          {Icon && <Icon size="1em" className={classNames?.icon} />}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClass}
        {...(props as ComponentProps<"button">)}
      >
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {Icon && <Icon size="1em" className={classNames?.icon} />}
      </button>
    );
  }
);

IconButton.displayName = "button";
export default IconButton;
