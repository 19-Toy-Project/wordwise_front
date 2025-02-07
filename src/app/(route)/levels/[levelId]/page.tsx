"use client";
import Pagination from "@/components/pagination";
import { useWordsQuery } from "@/hooks/query";
import { WordType } from "@/types/type";
import { useParams } from "next/navigation";
import { useState } from "react";
import WordItem from "./_components/WordItem";

const levels: Record<string, string> = {
  Beginner: "초급",
  Intermediate: "중급",
  Advanced: "고급",
  Conversation: "회화",
};
export default function LevelPage() {
  const params = useParams<{ levelId: string }>();
  const levelId = params?.levelId ?? "";
  const [page, setPage] = useState<number>(1);
  const size = 10;
  const { data: words } = useWordsQuery({ levelId, page, size });

  return (
    <>
      <h2>{levels[levelId]}</h2>
      <div className="wrapper">
        <div className="flex flex-col gap-3">
          {words?.data.content.map((word: WordType) => (
            <WordItem key={word.wordId} word={word} />
          ))}
        </div>
        <Pagination
          maxPage={words?.data.totalPages}
          pageCountPerPage={size}
          clickListener={(page) => setPage(page)}
        />
      </div>
    </>
  );
}
