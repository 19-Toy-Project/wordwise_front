"use client";
import { useCookie } from "@/contexts/cookie.context";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const LoginComponent = () => {
  const { searchParams } = useCustomSearchParams();
  const router = useRouter();
  const { login } = useCookie();
  const code = searchParams?.get("code") || "";
  useEffect(() => {
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
        //setCookie("accessToken", accessToken, decoded?.exp); //15
        login(accessToken, decoded?.exp); //15
        // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     name: "accessToken",
        //     value: accessToken,
        //     expires: decoded?.exp,
        //   }),
        // });
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
  return <div>로그인중...</div>;
};
