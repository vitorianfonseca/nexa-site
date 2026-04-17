"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DarkGeometry } from "./FloatingGeometry";

// Canvas particle field
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

    const N = 60;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
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

export default function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0A0A12" }}
      aria-label="Call to action"
    >
      {/* Particle canvas */}
      <ParticleField />

      {/* CSS 3D geometry */}
      <DarkGeometry />

      {/* Top/bottom gradient lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(42,19,99,0.6), rgba(200,162,232,0.4), transparent)",
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {lang === "en" ? "Next step" : "Próximo passo"}
            </motion.p>

            <h2
              className="font-bold leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
            >
              {lang === "en" ? (
                <>
                  <span style={{ color: "#EDE8FF" }}>Ready to</span>
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg, #2A1363, #C8A2E8, #2A1363, #C8A2E8)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "textShimmer 3s linear infinite",
                      display: "inline-block",
                    }}
                  >
                    build something
                  </span>
                  <br />
                  <span style={{ color: "#EDE8FF" }}>exceptional?</span>
                </>
              ) : (
                <>
                  <span style={{ color: "#EDE8FF" }}>Prontos para</span>
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg, #2A1363, #C8A2E8, #2A1363, #C8A2E8)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "textShimmer 3s linear infinite",
                      display: "inline-block",
                    }}
                  >
                    construir algo
                  </span>
                  <br />
                  <span style={{ color: "#EDE8FF" }}>extraordinário?</span>
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
              style={{ color: "#0A0A12", background: "#EDE8FF" }}
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
