"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#070410" }}
      aria-label="Call to action"
    >

      {/* Top/bottom gradient lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(200,162,232,0.65), rgba(200,162,232,0.65), rgba(200,162,232,0.65), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(42,19,99,0.25), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-end justify-start pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span style={{ fontSize: "clamp(7rem, 20vw, 20rem)", fontWeight: 900, letterSpacing: "-0.06em", color: "rgba(212,204,255,0.022)", lineHeight: 1, userSelect: "none", transform: "translateX(-6%)" }}>
          Nexa
        </span>
      </div>

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="text-xs tracking-[0.18em] uppercase mb-6 font-semibold"
              style={{ color: "rgba(200,162,232,0.65)" }}
            >
              {lang === "en" ? "Next step" : "Próximo passo"}
            </motion.p>

            <h2
              className="font-bold leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
            >
              {lang === "en" ? (
                <>
                  <span style={{ color: "#D4CCFF" }}>Ready to build</span>
                  <br />
                  <span style={{ color: "#FFFFFF", fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em" }}>something</span>
                  <br />
                  <span style={{ color: "#D4CCFF" }}>exceptional?</span>
                </>
              ) : (
                <>
                  <span style={{ color: "#D4CCFF" }}>Prontos para construir</span>
                  <br />
                  <span style={{ color: "#FFFFFF", fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em" }}>algo</span>
                  <br />
                  <span style={{ color: "#D4CCFF" }}>extraordinário?</span>
                </>
              )}
            </h2>
          </motion.div>

          {/* Right: CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="lg:pb-2 flex flex-col gap-7 lg:items-end shrink-0"
          >
            <p
              className="text-sm leading-relaxed max-w-xs lg:text-right"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t.cta.subtext}
            </p>

            {/* CTA button with glow */}
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ color: "#070410", background: "#EDE8FF" }}
            >
              <span>{t.cta.button}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            {/* Trust signals */}
            <div className="flex items-center gap-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t.cta.trustSignals.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="text-[11px] tracking-wide"
                >
                  ✓ {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
