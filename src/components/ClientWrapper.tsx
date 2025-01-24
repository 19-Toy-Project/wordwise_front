"use client";
import { about, home, mypage } from "@/constants/pathname";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button, IconButton } from "./buttons";

export const ClientWrapper = ({ children }: PropsWithChildren) => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 관리

  return (
    <>
      <div className="sticky top-0 z-20 bg-[#FFE486] w-full h-20 px-5 flex items-center justify-between sm:gap-5">
        {/* 로고 */}
        <IconButton
          href={home}
          icon={() => (
            <Image src="/svg/Logo.svg" width={70} height={40} alt="Logo" />
          )}
        />

        {/* 메뉴 버튼 (모바일 전용) */}
        <div className="md:hidden">
          <IoMenu
            size={30}
            className="cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>

        {/* 버튼 리스트 */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-5 absolute md:static top-20 left-0 w-full bg-[#FFE486] px-5 py-3 md:py-0 transition-all duration-300 ease-in-out`}
        >
          <Button href={about}>ABOUT US</Button>
          <Button>로그인</Button>
          <Button>로그아웃</Button>
          <Button href={mypage}>내 정보</Button>
        </div>
      </div>

      <div className="w-full">{children}</div>
    </>
  );
};
