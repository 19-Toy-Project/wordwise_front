import { setCookie } from "../constants/cookie"; // 쿠키 관리 유틸 함수

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  console.log("🔄 fetchWithAUth 실행됨!!", url);
  // ✅ Access Token이 없으면 바로 Refresh Token으로 재발급 시도

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
    credentials: "include",
  });
  console.log("response =", response);

  if (response.status !== 200) {
    const refreshResponse = await refreshAccessToken();

    setCookie("accessToken", refreshResponse.data.accessToken);

    const newResponse = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${refreshResponse.data.accessToken}`,
      },
      credentials: "include",
    });
    return newResponse;
  }
  return response;
}

// ✅ Access Token 갱신 함수
export async function refreshAccessToken() {
  try {
    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${undefined}`,
        },
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
