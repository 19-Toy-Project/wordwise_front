import { NextRequest, NextResponse } from "next/server";

import isValidToken from "@/utils/is-valid-token";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
/**
case1 : access token과 refresh token 모두가 만료된 경우 → 에러 발생 (재 로그인하여 둘다 새로 발급)
case2 : access token은 만료됐지만, refresh token은 유효한 경우 →  refresh token을 검증하여 access token 재발급
case3 : access token은 유효하지만, refresh token은 만료된 경우 →  access token을 검증하여 refresh token 재발급
case4 : access token과 refresh token 모두가 유효한 경우 → 정상 처리

참고 : https://velog.io/@clydehan/Next.js%EB%A1%9C-Access-Token-%EB%A7%8C%EB%A3%8C-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EC%9E%AC%EB%B0%9C%EA%B8%89-%EB%B0%9B%EA%B8%B0
 */
export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value; //15분
  const refreshToken = request.cookies.get("refreshToken")?.value; //7일

  if (!accessToken && !refreshToken) {
    //case1: accesstoken 없고 refreshtoken도 없는 경우
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
    accesstoken: accessToken,
    refreshtoken: refreshToken,
  });

  if (!isRefreshTokenValid) {
    // case3 ?: refreshtoken 유효하지 않는 경우
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isAccessTokenValid) {
    // case2: accesstoken은 유효하지만 refreshtoken은 만료된경우 accesstoken 재발급
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            cookie: `refreshtoken=${refreshToken}`,
          },
          credentials: "include",
        }
      ); // 새 accesstoken과 refreshtoken 요청

      if (!response.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      const res = NextResponse.next();
      const resCookies = new ResponseCookies(response.headers);

      const accesstoken = resCookies.get("accessToken");
      const refreshtoken = resCookies.get("refreshToken");

      if (accesstoken) {
        res.cookies.set("accessToken", accesstoken.value, {
          httpOnly: accesstoken.httpOnly,
          sameSite: accesstoken.sameSite,
          path: accesstoken.path,
          secure: accesstoken.secure,
        });
      }
      if (refreshtoken) {
        res.cookies.set("refreshToken", refreshtoken.value, {
          httpOnly: refreshtoken.httpOnly,
          sameSite: refreshtoken.sameSite,
          path: refreshtoken.path,
          secure: refreshtoken.secure,
        });
      }
      return res;
    } catch (error) {
      console.error("accesstoken 재발급 중 오류 발생 : ", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  //case4:access token과 refresh token 모두가 유효한 경우 → 정상 처리
  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/words/:path*"],
}; // 이 미들웨어를 '/auth' 경로에서만 실행
