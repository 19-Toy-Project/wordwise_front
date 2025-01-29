import { IoMdClose, IoMdMic } from "react-icons/io";
import { IconButton } from "../buttons";
import BackDrop from "./BackDrop";
type ModalProps = {
  handleModal: () => void;
  message: string;
};

const Modal = ({ handleModal, message }: ModalProps) => {
  return (
    <BackDrop>
      <div className="flex flex-row justify-between">
        <h5></h5>
        <IconButton
          onClick={handleModal}
          icon={() => <IoMdClose color="black" />}
        ></IconButton>
      </div>
      <div>
        <h5>{message}</h5>
        <IconButton icon={() => <IoMdMic color="black" />} />
      </div>
    </BackDrop>
  );
};

export default Modal;
