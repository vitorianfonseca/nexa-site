"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

/** Syncs the <html lang> attribute to the active language on the client. */
export default function LangSync() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);

  return null;
}
