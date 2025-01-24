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
      <h1 className="font-bold text-lg text-center">{levels[levelId]}</h1>
      {children}
    </>
  );
}

export default WordLayout;
