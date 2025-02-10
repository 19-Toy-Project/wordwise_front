"use client";

import { useCookie } from "@/contexts/cookie.context";
import { SentenceType } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
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
  const [score, setScore] = useState<number>(-1);
  const { cookie } = useCookie();
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      // navigator : 브라우저의 정보와 상태에 엑세스 할 수 있는 객체
      // mediaDevices : 미디어 장치(예: 마이크, 카메라)에 엑세스하기 위한 API 제공
      // getUserMedia() : 사용자의 미디어 디바이스(카메라, 오디오..)에 엑세스 할 수 있도록 권한 요청하는 메서드

      const mediaRecorder = new MediaRecorder(stream);

      setStream(stream);
      setMedia(mediaRecorder);

      mediaRecorder.start();
      setOnRec(false);

      const audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const formData = new FormData();
        formData.append("file", audioBlob);
        setAudioUrl(audioUrl);
        setOnRec(true);

        const response = await fetch(
          `http://localhost:8080/api/v1/sentences/record/${sentence.sentenceId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        setScore(data.data.score);
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
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
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
          <audio className="hidden" ref={audioRef} controls>
            <source src={audioUrl} type="audio/webm" />
            브라우저가 오디오 태그를 지원하지 않습니다.
          </audio>
        )}
        {score > 0 && (
          <h1 className={score > 50 ? "text-subColor" : "text-mainColor"}>
            {score}점
          </h1>
        )}
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
        {audioUrl && (
          <IconButton
            onClick={playAudio}
            icon={() => <FaPlay color="black" size={40} />}
          />
        )}
      </div>
    </BackDrop>
  );
};

export default Modal;
