"use client";
import { about, home, mypage } from "@/constants/pathname";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button, IconButton } from "./buttons";

export const ClientWrapper = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState<boolean>(false); // 메뉴 상태 관리

  const handleLogin = () => {
    signIn("kakao", { callbackUrl: "/" });
  };
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <div className="sticky top-0 z-20 bg-background w-full h-20 px-5 flex items-center justify-between sm:gap-5">
        {/* 로고 */}
        <IconButton
          href={home}
          icon={() => (
            <Image src="/svg/Logo.svg" width={70} height={40} alt="Logo" />
          )}
        />

        {/* 메뉴 버튼 (모바일 전용) */}
        <div className="md:hidden">
          <IconButton
            onClick={() => setMenuOpen((prev) => !prev)}
            icon={() => <IoMenu color="black" size={30} />}
          />
        </div>

        {/* 버튼 리스트 */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-5 absolute md:static top-20 left-0 w-full bg-background px-5 py-3 md:py-0 transition-all duration-300 ease-in-out`}
        >
          <Button href={about}>ABOUT US</Button>
          {session ? (
            <>
              <Button onClick={handleLogout}>로그아웃</Button>
              <Button href={mypage}>내 정보</Button>
            </>
          ) : (
            <Button onClick={handleLogin}>로그인</Button>
          )}
        </div>
      </div>

      {children}
    </>
  );
};
