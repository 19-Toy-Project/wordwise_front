"use client";
import { useWordQuery } from "@/hooks/query";
import { SentenceType } from "@/types/type";
import { useParams } from "next/navigation";

import { useWordMutation } from "@/hooks/mutation";
import { useCookies } from "next-client-cookies";
import SentenceItem from "./_components/SentenceItem";

export default function WordPage() {
  const params = useParams<{ wordId: string }>();
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") ?? "";
  const wordId = params?.wordId ?? "";
  const { data: word } = useWordQuery(wordId);
  const addMutation = useWordMutation({
    wordId: wordId,
  });
  const handleWish = (sentenceId: number, wish: boolean) => {
    console.log("=>=>=>", sentenceId, wish);
    if (accessToken && word) {
      addMutation.mutate({
        sentenceId: sentenceId,
        wish: wish,
      });
    } else {
      alert("로그인이 필요한 서비스입니다");
    }
  };
  return (
    <div className="wrapper">
      <div className="mb-4 text-center">
        <h2>{word?.data.word}</h2>
        <p>
          {word?.data.word_krs.map((word_kr: string) => (
            <span key={word_kr}>{word_kr}</span>
          ))}
        </p>
        <hr />
      </div>

      <div>
        {word?.data.sentences.map((sentence: SentenceType) => (
          <SentenceItem
            key={sentence.sentenceId}
            sentence={sentence}
            handleWish={() => handleWish(sentence.sentenceId, !sentence.wish)}
          />
        ))}
      </div>
    </div>
  );
}
