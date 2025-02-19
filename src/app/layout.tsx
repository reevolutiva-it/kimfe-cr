import React from "react";
import "@/styles/globals.css";
import "../i18n";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { MainMenu } from "@/components/main-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: "AI Agent Configuration",
  description: "Configure and manage AI agents",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${GeistSans.variable} font-sans`}>
        <Providers>
          <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-4 md:gap-6">
                <h1 className="text-lg md:text-xl font-semibold">AI Agent Hub</h1>
                <div className="hidden md:block">
                  <MainMenu />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
