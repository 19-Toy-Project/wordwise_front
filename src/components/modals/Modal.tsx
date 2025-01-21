import { PropsWithChildren, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  handleModal: () => void;
  message: string;
  children: ReactNode;
};

const BackDrop = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
      <div
        className="bg-white p-5 rounded-md shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
const Modal = ({ handleModal, message, children }: ModalProps) => {
  return (
    <BackDrop>
      <div className="flex flex-row justify-between">
        <h5>{message}</h5>
        <IoMdClose onClick={handleModal} />
        {children}
      </div>
    </BackDrop>
  );
};

export default Modal;
