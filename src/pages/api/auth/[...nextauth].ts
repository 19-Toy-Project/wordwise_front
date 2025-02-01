import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const authOptions = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // Kakao 로그인에서 accessToken을 가져옵니다.
      const accessToken = account?.access_token;
      // accessToken이 존재하면 백엔드로 전송
      if (accessToken) {
        // Spring Boot 서버로 데이터 전송

        await fetch("http://example.com/api/v1/auth/kakao/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: accessToken, // Kakao access token
            redirect_url: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL, // redirect URL
          }),
        });
      }

      return true; // signIn 성공 처리
    },
  },
});

export default authOptions;
