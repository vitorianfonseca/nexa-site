"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
    // Start loading as soon as hero leaves viewport — Spline is ready long before user reaches CTA
    const hero = document.getElementById("hero");
    if (!hero) { setSplineReady(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setSplineReady(true);
          obs.disconnect();
        }
      },
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#070410", paddingTop: "clamp(5rem, 10vw, 9rem)", paddingBottom: "clamp(5rem, 10vw, 9rem)" }}
      aria-label="Call to action"
    >
      {/* Top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(200,162,232,0.65), transparent)" }}
        aria-hidden="true"
      />


      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2, left: "38%", right: "-5%", top: "0", bottom: "0",
          background: "radial-gradient(ellipse at 55% 50%, rgba(125,43,110,0.25) 0%, rgba(42,19,99,0.18) 40%, transparent 70%)",
          filter: "blur(45px)",
        }}
        aria-hidden="true"
      />

      {/* Spline stars — desktop only, loads after hero WebGL unloads */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{ zIndex: 3, left: "42%", right: "-10%", top: "2%", bottom: "-12%" }}
        aria-hidden="true"
      >
        {splineReady && (
          <iframe
            src="https://my.spline.design/ai-ab586tHgjlNDgx12H1Fqd6YT/?v=3"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="CTA visual"
          />
        )}
      </div>

      {/* Cover Spline watermark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: 160, height: 40, background: "#070410", zIndex: 20 }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative pointer-events-none" style={{ zIndex: 10 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.18em] uppercase mb-8 font-semibold"
          style={{ color: "rgba(200,162,232,0.65)" }}
        >
          {lang === "en" ? "Next step" : "Próximo passo"}
        </motion.p>

        {/* Staircase headline */}
        <div style={{ overflow: "hidden" }}>
          {lang === "en" ? (
            <h2
              className="font-bold leading-[0.92] tracking-[-0.04em] mb-16"
              style={{ fontSize: "clamp(2.2rem, 5vw, 6.5rem)" }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "#D4CCFF" }}
              >
                Ready to build
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "#FFFFFF", fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em", paddingLeft: "clamp(0rem, 4vw, 5rem)" }}
              >
                something
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "#D4CCFF", paddingLeft: "clamp(0rem, 8vw, 10rem)" }}
              >
                exceptional?
              </motion.span>
            </h2>
          ) : (
            <h2
              className="font-bold leading-[0.92] tracking-[-0.04em] mb-16"
              style={{ fontSize: "clamp(2.2rem, 5vw, 6.5rem)" }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "#D4CCFF" }}
              >
                Prontos para
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "#FFFFFF", fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em", paddingLeft: "clamp(0rem, 4vw, 5rem)" }}
              >
                construir algo
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "#D4CCFF", paddingLeft: "clamp(0rem, 8vw, 10rem)" }}
              >
                extraordinário?
              </motion.span>
            </h2>
          )}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-8 lg:gap-16 pointer-events-auto"
        >
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            {t.cta.subtext}
          </p>

          <div className="flex flex-col gap-5">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 self-start"
              style={{ color: "#070410", background: "#EDE8FF" }}
            >
              <span>{t.cta.button}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <div className="flex items-center gap-5">
              {t.cta.trustSignals.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className="text-[11px] tracking-wide"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  ✓ {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
