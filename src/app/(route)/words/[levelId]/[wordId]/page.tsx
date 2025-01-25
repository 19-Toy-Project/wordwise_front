"use client";
import { useWordQuery } from "@/hooks/query";
import { useParams } from "next/navigation";
import SentenceItem from "./_components/SentenceItem";

export default function WordPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const { data: word } = useWordQuery(wordId);
  return (
    <div className="wrapper">
      <div className="text-center">
        <h2>{word?.data.word}</h2>
        <p>{word?.data.meaning}</p>
      </div>

      <div>
        {word?.data.sentences.map((sentence) => (
          <SentenceItem key={sentence.sentenceId} sentence={sentence} />
        ))}
      </div>
    </div>
  );
}
