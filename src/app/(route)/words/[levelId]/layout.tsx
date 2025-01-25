"use client";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

const levels: Record<string, string> = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
  conversation: "회화",
};

function WordLayout({ children }: PropsWithChildren) {
  const { levelId } = useParams<{ levelId: string }>();
  return (
    <>
      <h2>{levels[levelId]}</h2>
      {children}
    </>
  );
}

export default WordLayout;
