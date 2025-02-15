import { getCookie, setCookie } from "../constants/cookie"; // 쿠키 관리 유틸 함수

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = getCookie("accessToken");
  console.log("🔄 fetchWithAUth 실행됨!!", url);
  // ✅ Access Token이 없으면 바로 Refresh Token으로 재발급 시도
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshResponse = await refreshAccessToken();

    setCookie("accessToken", refreshResponse.data.accessToken, 15);

    await fetch(`http://localhost:3000/api/v1/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "refreshToken",
        value: refreshResponse.data.refreshToken.split(" ")[1],
        exp: 7 * 24 * 60,
        httpOnly: true,
      }),
    }); //7 * 24 * 60
    return refreshResponse;
  }

  return response;
}

// ✅ Access Token 갱신 함수
export async function refreshAccessToken() {
  try {
    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/token`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("=>", response2);
    const data2 = await response2.json();

    return data2;
  } catch (error) {
    console.error("🔴 Refresh Token 인증 실패:", error);
  }
}
