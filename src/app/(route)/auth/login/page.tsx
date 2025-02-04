"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams?.get("code") as string;
  //
  useEffect(() => {
    if (!code) {
      router.push("/");
      return;
    }
    const handleKaKaoLogin = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/auth/kakao/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ code: code }),
          }
        );

        if (!response.ok) throw new Error("로그인 실패");
        const data = await response.json();
        console.log("로그인 성공:", data);

        //router.push("/"); // 로그인 성공 시 메인 페이지로 이동
      } catch (error) {
        console.error(error);
      }
    };

    handleKaKaoLogin();
  }, [code, router]);
  return <div>로그인중...</div>;
}
