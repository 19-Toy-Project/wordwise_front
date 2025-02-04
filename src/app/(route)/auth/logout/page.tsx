"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/logout",
          {
            method: "POST",
            headers: {
              Authrization: `Bearer ${"kakaologin_accesstoken_value"}`,
            },
          }
        );
        if (!response.ok) throw new Error("로그아웃 실패");
        const data = await response.json();
        console.log("로그아웃 성공: ", data);

        router.push("/"); //로그아웃 성공시 메인페이지로 이동
      } catch (error) {
        console.error(error);
      }
    };
    handleLogout();
  }, [router]);

  return <div>로그아웃 중...</div>;
}
