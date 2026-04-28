"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getConsent, saveConsent } from "@/lib/consent";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  pt: {
    text: "Utilizamos cookies para melhorar a sua experiência e analisar o tráfego do site. Os cookies essenciais estão sempre ativos.",
    policy: "Política de Cookies",
    accept: "Aceitar todos",
    reject: "Rejeitar",
  },
  en: {
    text: "We use cookies to improve your experience and analyse site traffic. Essential cookies are always active.",
    policy: "Cookie Policy",
    accept: "Accept all",
    reject: "Reject",
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  const accept = () => { saveConsent(true); setVisible(false); };
  const reject = () => { saveConsent(false); setVisible(false); };

  const c = copy[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label={lang === "pt" ? "Preferências de cookies" : "Cookie preferences"}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6 pointer-events-none"
        >
          <div
            className="max-w-2xl mx-auto rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 pointer-events-auto"
            style={{
              background: "rgba(8, 5, 22, 0.97)",
              border: "0.5px solid rgba(200,162,232,0.2)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(200,162,232,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              {c.text}{" "}
              <Link
                href="/politica-de-cookies"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: "rgba(200,162,232,0.9)" }}
              >
                {c.policy}
              </Link>
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={reject}
                className="px-4 py-2 rounded-full text-xs font-medium transition-opacity duration-150 hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {c.reject}
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
                style={{ background: "#EDE8FF", color: "#070410" }}
              >
                {c.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
