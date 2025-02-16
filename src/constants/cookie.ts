export const setCookie = (name: string, value: string) => {
  // const date = new Date();
  // date.setTime(date.getTime() + exp * 60 * 1000);
  document.cookie = name + "=" + value + ";" + ";path=/";
};

export const getCookie = (name: string) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");

  return value ? value[2] : null;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};
