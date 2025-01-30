"use client";
import { useWordsQuery } from "@/hooks/query";
import { WordType } from "@/types/type";
import { useParams } from "next/navigation";
import WordItem from "./_components/WordItem";

const levels: Record<string, string> = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
  conversation: "회화",
};
export default function LevelPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const { data: words } = useWordsQuery(levelId);
  return (
    <>
      <h2>{levels[levelId]}</h2>
      <div className="wrapper">
        <div className="flex flex-col gap-3">
          {words?.data.map((word: WordType) => (
            <WordItem key={word.wordId} word={word} />
          ))}
        </div>
      </div>
    </>
  );
}
