"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function TechMarquee() {
  const { t } = useLanguage();
  const items = t.marquee.items;
  const doubled = [...items, ...items];

  return (
    <section
      className="relative py-8 overflow-hidden"
      style={{
        borderTop: "0.5px solid rgba(26,26,26,0.06)",
        borderBottom: "0.5px solid rgba(26,26,26,0.06)",
      }}
      aria-label="Technologies we use"
    >
      {/* Edge fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #FAFAF8, transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #FAFAF8, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex">
        {/* Track 1 */}
        <div className="flex shrink-0 animate-marquee gap-0 will-change-transform">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-sm font-medium tracking-wide px-5 whitespace-nowrap"
                style={{ color: "rgba(26,26,26,0.4)" }}>
                {item}
              </span>
              <span style={{ color: "rgba(42,19,99,0.3)", fontSize: 10 }}>◆</span>
            </span>
          ))}
        </div>
        {/* Track 2 — clone */}
        <div className="flex shrink-0 animate-marquee gap-0 will-change-transform" aria-hidden="true">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-sm font-medium tracking-wide px-5 whitespace-nowrap"
                style={{ color: "rgba(26,26,26,0.4)" }}>
                {item}
              </span>
              <span style={{ color: "rgba(42,19,99,0.3)", fontSize: 10 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
