import { Button } from "@/components/buttons";
import { mypage, mystudy, mywish } from "@/constants/pathname";
import { PropsWithChildren } from "react";

export default function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="wrapper grid grid-cols-[1fr_2fr]">
      <nav className="flex flex-col justify-start gap-5 p-5">
        <Button href={mypage}>내 정보</Button>
        <Button href={mystudy}>나의 학습</Button>
        <Button href={mywish}>내가 찜한 문장</Button>
      </nav>
      {children}
    </div>
  );
}
