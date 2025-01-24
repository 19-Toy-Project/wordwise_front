"use client";

import { createContext, PropsWithChildren, useContext } from "react";

const initialValue = {};

const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const value = {};
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
