"use client";
import { getSpeech } from "@/app/api/v1/api.tts";
import { IconButton } from "@/components/buttons";
import { useModal } from "@/contexts/modal.context";
import { useWishMutation } from "@/hooks/mutation";
import { useWishQuery } from "@/hooks/query";
import { SentenceType } from "@/types/type";
import { useEffect } from "react";
import { AiOutlineSound } from "react-icons/ai";
import { IoMdMic } from "react-icons/io";
import { TbJewishStar, TbJewishStarFilled } from "react-icons/tb";

const SentenceItem = ({ sentence }: { sentence: SentenceType }) => {
  const { data: wish } = useWishQuery({
    wish: sentence.wish,
    sentenceId: sentence.sentenceId,
  });

  const addMutation = useWishMutation({
    wish: sentence.wish,
    sentenceId: Number(sentence.sentenceId),
  });
  const { open } = useModal();
  useEffect(() => {
    // 목소리 목록을 미리 로드
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () =>
        window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSoundButton = () => {
    //throttle 기법 추가
    getSpeech(sentence.sentence);
  };
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h5>{sentence.sentence}</h5>
        <p>{sentence.meaning}</p>
      </div>

      {/* 아이콘 버튼 클릭 시 음성 출력 */}
      <div>
        <IconButton
          onClick={handleSoundButton}
          icon={() => <AiOutlineSound color="black" />}
        />
        <IconButton
          onClick={() => open(sentence.sentence)}
          icon={() => <IoMdMic color="black" />}
        />
        <IconButton
          onClick={() => addMutation.mutate()}
          icon={() =>
            wish?.wish ? (
              <TbJewishStarFilled color="black" />
            ) : (
              <TbJewishStar color="black" />
            )
          }
        />
      </div>
    </div>
  );
};

export default SentenceItem;
