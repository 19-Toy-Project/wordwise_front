import Link from "next/link";
import { PropsWithChildren } from "react";

export const ClientWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="sticky top-0 w-full h-[60px] shadow-md p-5 flex justify-between gap-5">
        <Link href="/" className="flex-1">
          홈
        </Link>
        <Link href="/words/1">학습</Link>
        <Link href="/mypage">내 정보</Link>
      </div>
      {children}
    </div>
  );
};
