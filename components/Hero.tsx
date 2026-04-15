"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import HeroVisual from "./HeroVisual";

// Particle field (same as CTA section)
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 80;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 162, 232, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(42, 19, 99, ${0.18 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();


  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#0A0A12" }}
      aria-label="Hero section"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,19,99,0.18) 0%, transparent 70%)", filter: "blur(100px)", top: -150, left: "15%" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,232,0.1) 0%, transparent 70%)", filter: "blur(70px)", bottom: -80, right: "20%" }} />
      </div>

      {/* Particle canvas */}
      <ParticleField />


      {/* Sphere — top right, beside title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute hidden lg:block pointer-events-none"
        style={{ zIndex: 5, opacity: 0.45, right: "4%", top: "16%" }}
        aria-hidden="true"
      >
        <HeroVisual />
      </motion.div>

      {/* Top gradient edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(42,19,99,0.5), rgba(200,162,232,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col min-h-[calc(100vh-64px)]">

        {/* TOP: pill + headline + subheadline */}
        <div className="pt-28 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full"
            style={{ background: "rgba(200,162,232,0.08)", border: "0.5px solid rgba(200,162,232,0.25)" }}
          >
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#C8A2E8" }} />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: "#C8A2E8" }}>Leiria, Portugal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-bold leading-[1.05] tracking-[-0.04em] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6.8rem)", color: "#EDE8FF" }}
          >
            {lang === "en" ? (
              <>We build{" "}<span style={{ background: "linear-gradient(90deg, #2A1363, #C8A2E8, #2A1363, #C8A2E8)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block", animation: "textShimmer 3s linear infinite" }}>websites</span><br />that work.</>
            ) : (
              <>Construímos{" "}<span style={{ background: "linear-gradient(90deg, #2A1363, #C8A2E8, #2A1363, #C8A2E8)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block", animation: "textShimmer 3s linear infinite" }}>websites</span><br />que funcionam.</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base lg:text-lg tracking-[-0.01em] max-w-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {t.hero.subheadline}
          </motion.p>
        </div>

        {/* MIDDLE: horizontal feature strip */}
        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-0"
          >
            {(lang === "en"
              ? ["Performance", "Clean Design", "SEO", "Mobile-first", "Fast delivery"]
              : ["Performance", "Design limpo", "SEO", "Mobile-first", "Entrega rápida"]
            ).map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center"
              >
                <span
                  className="text-xs font-medium tracking-[0.12em] uppercase px-5"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {item}
                </span>
                {i < 4 && (
                  <span style={{ color: "rgba(200,162,232,0.2)", fontSize: 10 }}>·</span>
                )}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM: CTAs + stats */}
        <div
          className="pb-20 lg:pb-24 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 pt-8"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#work"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300"
              style={{ color: "#EDE8FF", background: "linear-gradient(135deg, #2A1363, #7E4CC4, #C8A2E8)", boxShadow: "0 4px 32px rgba(42,19,99,0.6), 0 0 60px rgba(42,19,99,0.3)" }}
            >
              <motion.span className="absolute inset-0 rounded-full" initial={false} whileHover={{ opacity: 1 }} animate={{ opacity: 0 }} style={{ background: "linear-gradient(135deg, #7E4CC4, #C8A2E8)" }} transition={{ duration: 0.3 }} />
              <span className="relative">{t.hero.ctaPrimary}</span>
              <motion.span className="relative" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </Link>
            <Link href="#contact" className="text-sm font-medium tracking-[-0.01em]" style={{ color: "rgba(255,255,255,0.45)" }}>
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

        </div>
      </div>

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
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(200,162,232,0.5), transparent)" }}
        />
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A12)" }}
        aria-hidden="true"
      />
    </section>
  );
}
