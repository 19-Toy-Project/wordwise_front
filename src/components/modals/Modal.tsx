"use client";

import { SentenceType } from "@/types/type";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdMic, IoMdMicOff } from "react-icons/io";
import { IconButton } from "../buttons";
import BackDrop from "./BackDrop";

type ModalProps = {
  handleModal: () => void;
  sentence: SentenceType;
};

const Modal = ({ handleModal, sentence }: ModalProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [onRec, setOnRec] = useState<boolean>(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const onRecAudio = async () => {
    if (typeof window === "undefined") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);

      mediaRecorder.start();
      setOnRec(false);

      const audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setOnRec(true);
      };

      setTimeout(() => {
        mediaRecorder.stop();
      }, 60000);
    } catch (error) {
      console.error("마이크 접근 오류:", error);
    }
  };

  const offRecAudio = () => {
    if (media) {
      media.stop();
      setOnRec(true);
    }
  };

  return (
    <BackDrop>
      <div className="flex flex-row justify-between">
        <h5></h5>
        <IconButton
          onClick={handleModal}
          icon={() => <IoMdClose color="black" />}
        />
      </div>
      <div className="text-center">
        <h5>{sentence.sentence}</h5>
        <p>{sentence.sentence_kr}</p>
        {audioUrl && (
          <audio controls>
            <source src={audioUrl} type="audio/webm" />
            브라우저가 오디오 태그를 지원하지 않습니다.
          </audio>
        )}
      </div>
      <IconButton
        onClick={onRec ? onRecAudio : offRecAudio}
        icon={() =>
          onRec ? (
            <IoMdMic color="black" size={40} />
          ) : (
            <IoMdMicOff color="black" size={40} />
          )
        }
      />
    </BackDrop>
  );
};

export default Modal;
