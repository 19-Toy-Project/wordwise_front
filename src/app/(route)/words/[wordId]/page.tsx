"use client";
import { useCookie } from "@/contexts/cookie.context";
import { useWordQuery } from "@/hooks/query";
import { SentenceType } from "@/types/type";
import { useParams, useRouter } from "next/navigation";

import { useWordMutation } from "@/hooks/mutation";
import SentenceItem from "./_components/SentenceItem";

export default function WordPage() {
  const params = useParams<{ wordId: string }>();
  const { cookie } = useCookie();
  const router = useRouter();
  const wordId = params?.wordId ?? "";
  const { data: word } = useWordQuery(wordId);
  const addMutation = useWordMutation({
    wordId: wordId,
  });
  const handleWish = (sentenceId: number, wish: boolean) => {
    console.log("=>=>=>", sentenceId, wish);
    if (cookie && word) {
      addMutation.mutate({
        sentenceId: sentenceId,
        wish: wish,
      });
    } else {
      router.push("/");
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
