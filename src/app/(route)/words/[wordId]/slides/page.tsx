"use client";

import { IconButton } from "@/components/buttons";
import { useCookie } from "@/contexts/cookie.context";
import { useWordQuery } from "@/hooks/query";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { SentenceType } from "@/types/type";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function SlidePage() {
  const params = useParams<{ wordId: string }>();
  const wordId = params?.wordId ?? "";
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const page = searchParams.get("page") ?? "1";

  const { data: word } = useWordQuery(wordId);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [onRec, setOnRec] = useState<boolean>(true);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [score, setScore] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean[]>([false]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { cookie } = useCookie();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const onRecAudio = async () => {
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
        if (audioUrls[Number(page)]) {
          URL.revokeObjectURL(audioUrls[Number(page)]);
        }
        const newAudioUrl = URL.createObjectURL(audioBlob);

        const formData = new FormData();
        formData.append("file", audioBlob);

        setAudioUrls((prev) => ({ ...prev, [page]: newAudioUrl }));

        if (audioRef.current) {
          audioRef.current.src = newAudioUrl;
        }

        setOnRec(true);
        setIsLoading((prev) => ({ ...prev, [page]: true }));
        try {
          const response = await fetchWithAuth(
            `${
              process.env.NEXT_PUBLIC_SERVICE_URL
            }/api/v1/sentences/record/${Number(page)}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
              body: formData,
            }
          );
          const data = await response.json();
          setScore(Number(data.data.score));
        } catch (error) {
          console.error("점수 분석 오류: ", error);
        } finally {
          setIsLoading((prev) => ({ ...prev, [page]: true }));
        }
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
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Suspense>
      <div className="wrapper text-center">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          initialSlide={word?.data.sentences.findIndex(
            (sentence: SentenceType) => sentence.sentenceId.toString() === page
          )}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            const currentSentence = word.data.sentences[swiper.activeIndex];
            if (currentSentence) {
              setSearchParams({ page: currentSentence.sentenceId.toString() });
            }
          }}
        >
          {word?.data.sentences.map((sentence: SentenceType) => (
            <SwiperSlide key={sentence.sentenceId}>
              <h5>{sentence.sentence}</h5>
              <p>{sentence.sentence_kr}</p>
              {audioUrls[Number(page)] && (
                <audio className="hidden" ref={audioRef} controls>
                  <source src={audioUrls[Number(page)]} type="audio/webm" />
                  브라우저가 오디오 태그를 지원하지 않습니다.
                </audio>
              )}
              <div className="p-5">
                {isLoading[Number(page)] ? (
                  <h5>점수 분석중..</h5>
                ) : (
                  score > 0 && (
                    <>
                      <h5>
                        <span
                          className={
                            score > 3 ? "text-subColor" : "text-mainColor"
                          }
                        >
                          {score}점
                        </span>{" "}
                        / 100점
                      </h5>
                      <h5
                        className={
                          score > 3 ? "text-subColor" : "text-mainColor"
                        }
                      >
                        {score > 3 ? "훌륭합니다 !" : "좀 더 노력하세요 !"}
                      </h5>
                    </>
                  )
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
              {audioUrls[Number(page)] && (
                <IconButton
                  onClick={playAudio}
                  icon={() =>
                    isPlaying ? (
                      <AiOutlinePause color="black" size={40} />
                    ) : (
                      <FaPlay color="black" size={40} />
                    )
                  }
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Suspense>
  );
}
