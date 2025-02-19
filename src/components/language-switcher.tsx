"use client";

import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span>{language.toUpperCase()}</span>
    </Button>
  );
}
