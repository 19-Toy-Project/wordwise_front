"use client";
import { SentenceType } from "@/types/type";
import { useState } from "react";
import { IoMdClose, IoMdMic } from "react-icons/io";
import { IconButton } from "../buttons";
import BackDrop from "./BackDrop";
type ModalProps = {
  handleModal: () => void;
  sentence: SentenceType;
};

const Modal = ({ handleModal, sentence }: ModalProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const handleRecord = () => {};
  return (
    <BackDrop>
      <div className="flex flex-row justify-between">
        <h5></h5>
        <IconButton
          onClick={handleModal}
          icon={() => <IoMdClose color="black" />}
        ></IconButton>
      </div>
      <div className="text-center">
        <h5>{sentence.sentence}</h5>
        <p>{sentence.sentence_kr}</p>

        <IconButton
          onClick={handleRecord}
          icon={() => <IoMdMic color="black" size={40} />}
        />
      </div>
    </BackDrop>
  );
};

export default Modal;
