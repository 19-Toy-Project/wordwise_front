"use client";

import { ToastType } from "@/types/type";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IconButton } from "../buttons";

interface ToastProps {
  toast: ToastType;
}

const alertVariants = cva(
  "m-3 bg-gray-200 border border-l-4 border-l-gray-500 translation rounded-md px-4 py-3 shadow-sm flex flex-row justify-between items-center duration-500",
  {
    variants: {
      isDisplayed: {
        true: "translate-x-[calc(20px)]",
        false: "translate-x-[calc(-100%)]",
      },
    },
    defaultVariants: {
      isDisplayed: false,
    },
  }
);
function Toast({ toast }: ToastProps) {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  useEffect(() => {
    setIsDisplayed(true);
    setTimeout(() => setIsDisplayed(false), 2000 - 500);
  }, []);

  const handleDelete = () => {
    setIsDisplayed(false);
  };
  return (
    <div className={alertVariants({ isDisplayed })}>
      <div className="flex flex-row gap-3">
        <span>{toast.label}</span>
      </div>

      <div className="ml-3">
        <IconButton
          onClick={handleDelete}
          icon={() => <IoClose color="black" />}
        />
      </div>
    </div>
  );
}

export default Toast;
