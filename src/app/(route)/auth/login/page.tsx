"use client";
import { useCookie } from "@/contexts/cookie.context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { login } = useCookie();
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ code: code }),
          }
        );
        const data = await response.json();

        login(data.data.accessToken.split(" ")[1]); //15

        await fetch(`http://localhost:3000/api/v1/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "refreshToken",
            value: data.data.refreshToken.split(" ")[1],
            exp: 7 * 24 * 60,
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
  return <div>로그인중...</div>;
}
