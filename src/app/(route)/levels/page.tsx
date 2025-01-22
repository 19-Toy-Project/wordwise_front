"use client";
import { Button } from "@/components/buttons";

function LevelPage() {
  return (
    <div className="container mx-auto p-5">
      <h1 className="font-bold text-4xl text-center text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-clip-text">
        원하시는 레벨을 선택해주세요 !
      </h1>
      <div className="flex flex-col gap-5">
        <Button href="/words/1">초급</Button>
        <Button href="/words/2">중급</Button>
        <Button href="/words/3">고급</Button>
        <Button href="/words/4">회화</Button>
      </div>
    </div>
  );
}

export default LevelPage;
