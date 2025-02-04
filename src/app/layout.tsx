import { ClientWrapper } from "@/components/ClientWrapper";
import { ModalProvider } from "@/contexts/modal.context";

import MswComponent from "@/pages/_app";
import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WordWise",
  description: "Generated by create next app",
  icons: {
    icon: "/svg/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MswComponent />
        <QueryProvider>
          <ModalProvider>
            <ClientWrapper>
              <Suspense fallback={<div>loading...</div>}>
                <main>{children}</main>
              </Suspense>
            </ClientWrapper>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
