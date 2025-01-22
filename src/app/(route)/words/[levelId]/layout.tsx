"use client";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

const levels: Record<number, string> = {
  1: "초급",
  2: "중급",
  3: "고급",
  4: "회화",
};

function WordLayout({ children }: PropsWithChildren) {
  const { levelId } = useParams<{ levelId: string }>();

  const levelName = levels[Number(levelId)];
  return (
    <>
      <h1 className="font-bold text-lg text-center">{levelName}</h1>
      {children}
    </>
  );
}

export default WordLayout;
