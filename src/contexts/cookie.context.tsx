"use client";

import { deleteCookie, getCookie, setCookie } from "@/constants/cookie";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type InitialValueType = {
  cookie: string | null;
  login: (
    accessToken: string,
    accessTokenExpiry: number,
    secure: boolean,
    sameSite: string
  ) => void;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const cookie = getCookie("accessToken") ?? null;
    setAccessToken(cookie);
  }, []);

  const value = {
    cookie: accessToken,
    login: (
      accessToken: string,
      accessTokenExpiry: number,
      secure: boolean,
      sameSite: string
    ) => {
      setCookie(
        "accessToken",
        accessToken,
        accessTokenExpiry,
        secure,
        sameSite
      ); //15

      setAccessToken(accessToken);
    },
    logout: () => {
      deleteCookie("accessToken");
      setAccessToken(null);
    },
  };

  return (
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
}
