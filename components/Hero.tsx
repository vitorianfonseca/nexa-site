"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function useMagnet(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = "transform 0.1s ease";
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
  };
  return { ref, onMove, onLeave };
}


export default function Hero() {
  const { t, lang } = useLanguage();
  const magnet = useMagnet(0.28);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "transparent" }}
      aria-label="Hero section"
    >

      {/* Vignette + depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Edge vignette — escurece bordas */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
        {/* Top-left darkening para contraste do texto */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
        {/* Bottom fade para próxima secção */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to bottom, transparent, rgba(7,4,16,0.9))" }} />
      </div>

      {/* Top gradient edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), rgba(201,169,110,0.6), rgba(201,169,110,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 w-full relative z-10 flex flex-col min-h-[calc(100vh-64px)]">

        {/* TOP: headline + subheadline */}
        <div className="pt-20 sm:pt-28 lg:pt-52">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-bold leading-[1.05] tracking-[-0.04em] mb-6"
            style={{
              fontSize: lang === "pt" ? "clamp(3.4rem, 6.5vw, 8.5rem)" : "clamp(3.6rem, 7vw, 9rem)",
              color: "#FFFFFF",
              textShadow: "0 2px 20px rgba(0,0,0,0.95)",
            }}
          >
            {lang === "en" ? (
              <>We build{" "}<span style={{ fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em" }}>websites</span><br />that perform.</>
            ) : (
              <>Construímos{" "}<span style={{ fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em" }}>websites</span><br />que performam.</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base lg:text-lg tracking-[-0.01em] max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
          >
            {t.hero.subheadline}
          </motion.p>
        </div>

        <div className="flex-1" />

        {/* BOTTOM: CTAs left + stats right */}
        <div
          className="pb-20 lg:pb-24 flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-0 pt-8"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          {/* Left: CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div ref={magnet.ref} onMouseMove={magnet.onMove} onMouseLeave={magnet.onLeave} style={{ display: "inline-block" }}>
              <Link
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full transition-all duration-200 hover:opacity-90"
                style={{ color: "#070410", background: "#EDE8FF" }}
              >
                <span>{t.hero.ctaPrimary}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <Link href="#contact" className="text-sm font-medium tracking-[-0.01em]" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Right: availability */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="lg:ml-auto flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#4ade80" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#4ade80" }} />
            </span>
            <span className="text-xs tracking-[0.08em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
              {lang === "en" ? "Available for new projects" : "Disponível para novos projetos"}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Rotating stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 right-8 lg:bottom-20 lg:right-24 hidden lg:flex items-center justify-center"
        aria-hidden="true"
        style={{ width: 120, height: 120 }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          width="120"
          height="120"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute" }}
        >
          <defs>
            <path id="stamp-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text fontSize="7.2" fill="rgba(255,255,255,0.28)" letterSpacing="2.2">
            <textPath href="#stamp-circle">WEB AGENCY · LEIRIA, PORTUGAL · NEXA · </textPath>
          </text>
        </motion.svg>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(200,162,232,0.55)" }} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8 scroll-line-pulse"
          style={{ background: "linear-gradient(to bottom, rgba(200,162,232,0.5), transparent)" }}
        />
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #070410)" }}
        aria-hidden="true"
      />
    </section>
  );
}
