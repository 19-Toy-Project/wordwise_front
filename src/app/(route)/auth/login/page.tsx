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
          `http://localhost:8080/api/v1/auth/kakao/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ code: code }),
          }
        );
        const data = await response.json();

        login(data.data.split(" ")[1]);

        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    handleKaKaoLogin();
  }, [code, router]);
  return <div>로그인중...</div>;
}
