import Image from "next/image";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button } from "./Button";
import "./header.css"; // 일반 CSS 스타일 적용
import { IconButton } from "./IconButton";

export interface HeaderProps {
  logoSrc?: string; // 로고 이미지 경로
  homeUrl?: string; // 홈 URL
  aboutUrl?: string; // About 페이지 URL
  mypageUrl?: string; // 내 정보 페이지 URL
  showAuthButtons?: boolean; // 로그인/로그아웃 버튼 표시 여부
}

export const Header = ({
  logoSrc = "/svg/Logo.svg",
  homeUrl = "/",
  aboutUrl = "/about",
  mypageUrl = "/mypage",
  showAuthButtons = true,
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="header">
      {/* 로고 */}
      <IconButton
        href={homeUrl}
        icon={() => <Image src={logoSrc} width={70} height={40} alt="Logo" />}
      />

      {/* 모바일 메뉴 버튼 */}
      <IconButton
        className="icon-button--mobile"
        onClick={() => setMenuOpen((prev) => !prev)}
        icon={() => <IoMenu />}
      />

      {/* 버튼 리스트 */}
      <nav className={`menu ${menuOpen ? "open" : "close"}`}>
        <Button href={aboutUrl}>ABOUT US</Button>
        {showAuthButtons ? (
          <Button>로그인</Button>
        ) : (
          <>
            <Button>로그아웃</Button>
            <Button href={mypageUrl}>내 정보</Button>
          </>
        )}
      </nav>
    </header>
  );
};
