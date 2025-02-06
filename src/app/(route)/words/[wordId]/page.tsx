"use client";
import { useWordQuery } from "@/hooks/query";
import { SentenceType } from "@/types/type";
import { useParams } from "next/navigation";
import SentenceItem from "./_components/SentenceItem";

export default function WordPage() {
  const params = useParams<{ wordId: string }>();
  const wordId = params?.wordId ?? "";
  const { data: word } = useWordQuery(wordId);

  return (
    <div className="wrapper">
      <div className="mb-4 text-center">
        <h2>{word?.data.word}</h2>
        <p>
          {word?.data.word_kr.map((word_kr: string) => (
            <span>{word_kr}</span>
          ))}
        </p>
        <hr />
      </div>

      <div>
        {word?.data.sentences.map((sentence: SentenceType) => (
          <SentenceItem key={sentence.sentenceId} sentence={sentence} />
        ))}
      </div>
    </div>
  );
}
