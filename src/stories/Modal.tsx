import { useState } from "react";
import { IoMdClose, IoMdMic } from "react-icons/io";
import { IconButton } from "./IconButton";
import "./modal.css";

export interface ModalProps {
  message: string;
  type: "default" | "alert";
}

export const Modal = ({ type, message }: ModalProps) => {
  const [number, setNumber] = useState<number | null>(null);
  const handleRecord = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setNumber(randomNumber);
  };
  return (
    <div className="backdrop">
      <div className="frontdrop" onClick={(e) => e.stopPropagation()}>
        <div className="title">
          <h5></h5>
          <IconButton icon={() => <IoMdClose color="black" />} />
        </div>
        <div className="content">
          <h5>{message}</h5>

          {type === "default" && number !== null && (
            <h5 className={`${number > 50 ? "average-high" : "average-low"}`}>
              {number}점
            </h5>
          )}

          {type === "default" && (
            <IconButton
              onClick={handleRecord}
              icon={() => <IoMdMic color="black" size={40} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};
