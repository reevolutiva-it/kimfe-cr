'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "next-themes";
import i18n from "../i18n";

export function Providers({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Evita el parpadeo durante la hidratación
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}