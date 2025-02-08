"use client";

import { useCookies } from "next-client-cookies";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type InitialValueType = {
  cookie: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
};
const initialValue: InitialValueType = {
  cookie: null,
  login: () => {},
  logout: () => {},
};

const CookieContext = createContext(initialValue);

export const useCookie = () => useContext(CookieContext);

export function CookieProvider({ children }: PropsWithChildren) {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") ?? null;
  const [cookie, setCookie] = useState<string | null>(accessToken);

  const value = {
    cookie,
    login: (accessToken: string) => {
      cookies.set("accessToken", accessToken);
      setCookie(accessToken);
    },
    logout: () => {
      cookies.remove("accessToken", { path: "/" });
      setCookie(null);
    },
  };

  return (
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
}
