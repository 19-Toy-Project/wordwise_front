export async function fetchWithAuth(url: string, options: RequestInit = {}) {
 
  // ✅ Access Token이 없으면 바로 Refresh Token으로 재발급 시도

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshResponse = await refreshAccessToken(options);
    const newResponse = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${
          refreshResponse.data.accessToken.split(" ")[1]
        }`,
      },
      credentials: "include",
    });
    return newResponse;
  }
  return response;
}

// ✅ Access Token 갱신 함수
export async function refreshAccessToken(options: RequestInit = {}) {
  try {
    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth/token`,
      {
        method: "POST",
        headers: options.headers,
        credentials: "include",
      }
    );
    const data2 = await response2.json();
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "accessToken",
        value: data2.data.split(" ")[1],
      }),
    }); //7 * 24 * 60

    return data2;
  } catch (error) {
    console.error("🔴 Refresh Token 인증 실패:", error);
  }
}
