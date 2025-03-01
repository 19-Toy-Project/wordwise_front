"use client";
import { Button } from "@/components/buttons";
import { useRouter } from "next/navigation";

const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=	
${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push(KAKAO_LOGIN_URL);
  };
  return (
    <div className="wrapper text-center">
      <Button onClick={handleLogin}>카카오로 로그인</Button>
    </div>
  );
}
