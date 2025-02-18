"use client";
import { useCookie } from "@/contexts/cookie.context";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { login } = useCookie();
  const { searchParams } = useCustomSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 오류 상태 추가

  const code = searchParams?.get("code") || "";

  useEffect(() => {
    if (!code) {
      router.push("/"); // code가 없으면 홈으로 리다이렉트
      return;
    }

    const handleKaKaoLogin = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ code: code }),
          }
        );

        if (!response.ok) {
          throw new Error("로그인 실패!"); // 응답 실패 처리
        }

        const data = await response.json();

        const accessToken = data.data.accessToken.split(" ")[1];
        const decoded = jwtDecode<{ exp: number }>(accessToken);

        login(accessToken, decoded?.exp);

        const refreshToken = data.data.refreshToken.split(" ")[1];
        const decoded2 = jwtDecode<{ exp: number }>(refreshToken);

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "refreshToken",
            value: refreshToken,
            expires: decoded2?.exp,
            httpOnly: true,
          }),
        });

        router.push("/"); // 로그인 후 홈으로 리다이렉트
      } catch (err) {
        console.error(err);
        setError("로그인 과정에서 문제가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    handleKaKaoLogin();
  }, [code, router]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 UI 표시
  }

  if (error) {
    return <div>{error}</div>; // 오류 메시지 표시
  }

  return (
    <div>로그인중...</div> // 로그인 완료 후 표시
  );
}
