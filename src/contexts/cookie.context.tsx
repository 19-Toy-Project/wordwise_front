"use client";

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
  const [cookie, setCookie] = useState<string | null>(null);

  const value = {
    cookie,
    login: (accessToken: string) => {
      setCookie(accessToken);
      console.log(accessToken);
    },
    logout: () => {
      setCookie(null);
    },
  };

  return (
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
}
