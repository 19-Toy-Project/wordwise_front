"use client";

import Pagination from "@/components/pagination";
import { useSearchQuery } from "@/hooks/query";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { WordType } from "@/types/type";
import { Suspense, useState } from "react";
import WordItem from "../levels/[levelId]/_components/WordItem";

export default function SearchPage() {
  const { searchParams } = useCustomSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [page, setPage] = useState<number>(1);
  const { data: sentences = [] } = useSearchQuery({ page, size: 10, keyword });

  return (
    <Suspense>
      <div className="wrapper">
        <p>검색한 결과가 {sentences?.data?.content.length}건 있습니다.</p>
        <div className="flex flex-col gap-3">
          {sentences?.data?.content.map((word: WordType) => (
            <WordItem key={word.wordId} word={word} />
          ))}
        </div>
        <Pagination
          maxPage={sentences?.data?.totalPages}
          pageCountPerPage={10}
          clickListener={(page) => setPage(page)}
        />
      </div>
    </Suspense>
  );
}
