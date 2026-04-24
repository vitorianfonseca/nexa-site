"use client";

import { useEffect } from "react";

const FONTSHARE_URL = "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&display=swap";
const FONTSHARE_DATA_KEY = "nexa-fontshare-cabinet";

export default function FontshareStyles() {
  useEffect(() => {
    const existing = document.querySelector(`link[data-fontshare='${FONTSHARE_DATA_KEY}']`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTSHARE_URL;
    link.setAttribute("data-fontshare", FONTSHARE_DATA_KEY);
    document.head.appendChild(link);
  }, []);

  return null;
}
