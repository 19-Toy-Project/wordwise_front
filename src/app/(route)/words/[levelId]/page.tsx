"use client";
import { useWordsQuery } from "@/hooks/query";
import { useParams } from "next/navigation";
import WordItem from "./_components/WordItem";

export default function WordLevelPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const { data: words } = useWordsQuery(levelId);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-3">
        {words?.data.map((word) => (
          <WordItem key={word.wordId} word={word} />
        ))}
      </div>
    </div>
  );
}
