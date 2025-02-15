import { NextRequest, NextResponse } from "next/server";

import isValidToken from "@/utils/is-valid-token";
import { refreshAccessToken } from "./utils/fetchWithAuth";
/**
case1 : access token과 refresh token 모두가 만료된 경우 → 에러 발생 (재 로그인하여 둘다 새로 발급)
case2 : access token은 만료됐지만, refresh token은 유효한 경우 →  refresh token을 검증하여 access token 재발급
case3 : access token은 유효하지만, refresh token은 만료된 경우 →  access token을 검증하여 refresh token 재발급
case4 : access token과 refresh token 모두가 유효한 경우 → 정상 처리

참고 : https://velog.io/@clydehan/Next.js%EB%A1%9C-Access-Token-%EB%A7%8C%EB%A3%8C-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EC%9E%AC%EB%B0%9C%EA%B8%89-%EB%B0%9B%EA%B8%B0
 */
export default async function middleware(request: NextRequest) {
  console.log("🔹 Middleware 실행됨!", request.nextUrl.pathname);
  const accessToken = request.cookies.get("accessToken")?.value; //15분
  const refreshToken = request.cookies.get("refreshToken")?.value; //7일

  console.log("accessToken = ", accessToken, " refreshToken = ", refreshToken);
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
    // case2: accesstoken은 무효하지만 refreshtoken은 유효한 경우 accesstoken 재발급
    const response2 = await refreshAccessToken(accessToken ?? "");

    const data = await response2.json();
    const { accessToken: accesstoken, refreshToken: refreshtoken } = data;

    const res = NextResponse.next();

    if (accesstoken) {
      res.cookies.set("accessToken", accesstoken, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true,
      });
    }
    if (refreshtoken) {
      res.cookies.set("refreshToken", refreshtoken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      });
    }
    return res;
  }

  //case4:access token과 refresh token 모두가 유효한 경우 → 정상 처리
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage",
    "/mypage/:path*",
    "/levels/:path*",
    "/words",
    "/words/:path*",
  ],
}; // 이 미들웨어를 '/auth' 경로에서만 실행
