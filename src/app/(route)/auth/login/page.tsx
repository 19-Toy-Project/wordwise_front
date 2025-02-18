"use client";
import { useCookie } from "@/contexts/cookie.context";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function LoginPage() {
  const { login } = useCookie();
  const { searchParams } = useCustomSearchParams();
  const router = useRouter();

  const code = (searchParams?.get("code") as string) || "";
  //
  useEffect(() => {
    if (!code) {
      router.push("/");
      return;
    }
    const handleKaKaoLogin = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ code: code }),
          }
        );
        const data = await response.json();

        const accessToken = data.data.accessToken.split(" ")[1];
        const decoded = jwtDecode<{ exp: number }>(accessToken);

        login(accessToken, decoded?.exp); //15

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
        }); //7 * 24 * 60

        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    handleKaKaoLogin();
  }, [code, router]);
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <div>로그인중...</div>
    </Suspense>
  );
}
