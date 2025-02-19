export const setCookie = (
  name: string,
  value: string,
  expires: number,
  secure: boolean = true,
  sameSite: string = "None"
) => {
  const date = new Date(expires * 1000);
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(date.getTime() + kstOffset);

  const expiresUTC = kstDate.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  document.cookie =
    name +
    "=" +
    value +
    "; expires=" +
    expiresUTC +
    "; path=/; Secure=" +
    secure +
    "; SameSite=" +
    sameSite +
    ";";
};

export const getCookie = (name: string) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");

  return value ? value[2] : null;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};
