"use client";
import { Button } from "@/components/buttons";
import { mypage, mystudy, mywish } from "@/constants/pathname";
import { useCookie } from "@/contexts/cookie.context";
import { useToast } from "@/contexts/toast.context";
import { UserType } from "@/types/type";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
const ranks: Record<string, string> = {
  DIAMOND: "💎",
  GOLD: "🥇",
  SILVER: "🥈",
  BRONZE: "🥉",
  IRON: "🌱",
};
export default function MyPageLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { cookie } = useCookie();
  const { open } = useToast();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/profiles`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const { data: user } = await response.json();
      setUser(user);
    };
    fetchUser();
  }, [cookie]);

  const handleDelete = () => {
    open({ label: "준비중입니다" });
  };
  return (
    <div className="wrapper flex flex-col md:flex-row gap-5">
      <nav className="flex flex-col w-full md:w-1/3">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">
            {ranks[user?.userTier ?? "IRON"]}
          </h3>
          <p className="text-lg font-semibold text-gray-800">
            {user?.userName}
          </p>
          <p className="text-sm text-gray-500">{user?.userEmail}</p>
        </div>
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
      <div className="w-full md:w-2/3">{children}</div>
    </div>
  );
}
