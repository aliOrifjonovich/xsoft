import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { UserInterface, UserProvider } from "@/providers/UserProvider";
import { Toaster } from "sonner";
import {
  API_CONFIG,
  fetchServerData,
  getServerAuthToken,
} from "@/lib/api-server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Management System",
  description: "A comprehensive car rental and management system",
};

async function fetchUserData() {
  const token = await getServerAuthToken();
  // Using our centralized API service for server components
  if (token) {
    const data = await fetchServerData(API_CONFIG.ENDPOINTS.USER_DATA);
    return data;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const data = await fetchUserData();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <UserProvider value={data?.result as UserInterface}>
            <NextTopLoader
              color="oklch(.551 .027 264.364)"
              showSpinner={false}
            />
            {children}
            <Toaster />
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
