"use client";

import React, { createContext, useContext, useState } from "react";
import { translations, Lang, Translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  const toggle = () => setLang((l) => (l === "en" ? "pt" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggle }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
