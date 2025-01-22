import Image from "next/image";
import { PropsWithChildren } from "react";
import { Button, IconButton } from "./buttons";

export const ClientWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="sticky top-0 z-20 w-full shadow-md px-5 bg-white flex justify-between items-center gap-5">
        <IconButton
          href="/"
          icon={() => (
            <Image src="./svg/Logo.svg" width={70} height={40} alt="Logo" />
          )}
        />
        <div className="flex-1"></div>
        <Button href="/about">about us</Button>
        <Button href="/mypage">내 정보</Button>
      </div>
      {children}
    </div>
  );
};
