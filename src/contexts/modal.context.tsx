"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import Modal from "./../components/modals/Modal";

type InitialValueType = {
  open: (options: string) => void;
  close: () => void;
};
const initialValue: InitialValueType = {
  open: () => {},
  close: () => {},
};

const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalOptions, setModalOptions] = useState<string | null>(null);

  const value = {
    open: (options: string) => {
      setModalOptions(options);
    },
    close: () => {
      setModalOptions(null);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && (
        <Modal handleModal={() => value.close()} message={modalOptions} />
      )}
    </ModalContext.Provider>
  );
}
