import { IoMdClose } from "react-icons/io";
import { IconButton } from "../buttons";
import BackDrop from "./BackDrop";

type ModalProps = {
  handleModal: () => void;
  message: string;
};

const MessageModal = ({ handleModal, message }: ModalProps) => {
  return (
    <BackDrop>
      <div className="flex flex-row justify-between">
        <h5>{message}</h5>
        <IconButton
          onClick={handleModal}
          icon={() => <IoMdClose color="black" />}
        ></IconButton>
      </div>
    </BackDrop>
  );
};

export default MessageModal;
