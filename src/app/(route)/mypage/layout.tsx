"use client";
import { Button } from "@/components/buttons";
import { mypage, mystudy, mywish } from "@/constants/pathname";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function MyPageLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const handleDelete = () => {
    alert("준비중입니다");
  };
  return (
    <div className="wrapper grid grid-cols-1 grid-rows-2 md:grid-cols-[1fr_2fr] md:grid-rows-1 gap-5">
      <nav className="flex flex-col">
        <Button
          href={mypage}
          className={`hover:bg-background hover:font-bold text-center p-3 ${
            pathname === mypage ? "bg-background font-bold" : ""
          }`}
        >
          내 정보
        </Button>
        <Button
          href={mystudy}
          className={`hover:bg-background hover:font-bold text-center p-3 ${
            pathname === mystudy ? "bg-background font-bold" : ""
          }`}
        >
          나의 학습
        </Button>
        <Button
          href={mywish}
          className={`hover:bg-background hover:font-bold text-center p-3 ${
            pathname === mywish ? "bg-background font-bold" : ""
          }`}
        >
          내가 찜한 문장
        </Button>
        <Button
          className="hover:bg-background hover:font-bold text-center p-3"
          onClick={handleDelete}
        >
          회원탈퇴
        </Button>
      </nav>
      <div className="wrapper">{children}</div>
    </div>
  );
}
