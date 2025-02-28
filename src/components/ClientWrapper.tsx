"use client";
import { about, home, mypage } from "@/constants/pathname";
import { useCookie } from "@/contexts/cookie.context";
import { useToast } from "@/contexts/toast.context";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, PropsWithChildren, Suspense, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button, IconButton } from "./buttons";

const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=	
${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

export const ClientWrapper = ({ children }: PropsWithChildren) => {
  const { cookie, logout } = useCookie();
  const { open } = useToast();
  const { setSearchParams } = useCustomSearchParams();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // 메뉴 상태 관리

  const handleLogin = () => {
    router.push(KAKAO_LOGIN_URL);
  };
  const handleLogout = async () => {
    try {
      // await fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/logout`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `${cookie}`,
      //   },
      // });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) logout();
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const keyword = formData.get("keyword") as string;

    if (!keyword.trim()) {
      open({ label: "검색어를 입력해주세요 !" });
      return;
    }
    setSearchParams({ keyword: keyword });
    router.push(`/search?keyword=${keyword}`);
  };
  return (
    <Suspense>
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
          {cookie ? (
            <>
              <Button onClick={handleLogout}>로그아웃</Button>
              <Button href={mypage}>내 정보</Button>
              <form onSubmit={handleSearch}>
                <input
                  className="focus:outline-none focus:ring-0 rounded-md p-2"
                  name="keyword"
                  required
                />
                <Button type="submit">검색</Button>
              </form>
            </>
          ) : (
            <Button onClick={handleLogin}>로그인</Button>
          )}
        </div>
      </div>

      {children}
    </Suspense>
  );
};
