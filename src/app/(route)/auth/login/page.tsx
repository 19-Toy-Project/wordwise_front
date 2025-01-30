"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  useEffect(() => {
    if (!code) return;

    const handleKaKaoLogin = async () => {
      try {
        const response = await fetch("/api/v1/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            redirect_url: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
            code,
          }),
        });

        if (!response.ok) throw new Error("카카오 로그인 실패");

        const data = await response.json();
        console.log("로그인 성공:", data);

        router.push("/"); // 로그인 성공 시 메인 페이지로 이동
      } catch (error) {
        console.error(error);
      }
    };

    handleKaKaoLogin();
  }, [code, router]);
  return <div>로그인중...</div>;
}
