"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMessages({
      common: {
        dashboard: "Dashboard",
        agents: "Agents",
        conversations: "Conversations",
        analytics: "Analytics",
        team: "Team",
        settings: "Settings",
        help: "Help"
      }
    });
  }, []);
  const router = useRouter();

  useEffect(() => {
    const storedLang = localStorage?.getItem('language') as Language;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch(`/messages/${language}.json`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    
    if (typeof window !== 'undefined') {
      loadMessages();
      localStorage.setItem('language', language);
    }
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return String(value || key);
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
