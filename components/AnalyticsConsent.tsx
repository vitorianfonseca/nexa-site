"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { hasAnalyticsConsent } from "@/lib/consent";

export default function AnalyticsConsent() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());

    const handler = (e: Event) => {
      setConsented((e as CustomEvent<{ analytics: boolean }>).detail?.analytics ?? false);
    };
    window.addEventListener("nexa:consent-updated", handler);
    return () => window.removeEventListener("nexa:consent-updated", handler);
  }, []);

  if (!consented) return null;
  return <GoogleAnalytics gaId="G-PR7MLF19JH" />;
}
