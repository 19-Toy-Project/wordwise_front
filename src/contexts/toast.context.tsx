"use client";

import Toast from "@/components/Toasts/Toast";
import { ToastType } from "@/types/type";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type InitialValueType = {
  open: (toast: ToastType) => void;
  close: (id: string) => void;
};
const initialValue: InitialValueType = {
  open: () => {},
  close: () => {},
};

const ToastContext = createContext(initialValue);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const value = {
    open: (toast: Omit<ToastType, "id">) => {
      const id = crypto.randomUUID();
      if (toasts.some((t) => t.label === toast.label)) return;
      setToasts((prev) => [...prev, { ...toast, id }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 2000);
    },
    close: (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <ul className="fixed right-6 z-20 grid grid-cols-1 gap-y-3">
          {toasts.map((toast: ToastType) => (
            <li key={toast.id}>
              <Toast toast={toast} />
            </li>
          ))}
        </ul>
      )}
    </ToastContext.Provider>
  );
}
