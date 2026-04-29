"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const SPLINE_CTA_SRC = "https://my.spline.design/ai-ab586tHgjlNDgx12H1Fqd6YT/";

export default function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    // Start loading as soon as the hero Spline is ready (or immediately if already done)
    const load = () => setShowSpline(true);

    const globalWindow = window as Window & { __nexaSplineReady?: boolean };
    if (globalWindow.__nexaSplineReady) {
      load();
      return;
    }

    // Fall back to IntersectionObserver with a large margin so we preload well ahead
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          obs.disconnect();
        }
      },
      { rootMargin: "1200px" }
    );
    obs.observe(section);

    window.addEventListener("nexa:spline-ready", load, { once: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("nexa:spline-ready", load);
    };
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#070410" }}
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
        className="absolute pointer-events-none hidden md:block"
        style={{
          zIndex: 2, left: "45%", right: "-5%", top: "0", bottom: "0",
          background: "radial-gradient(ellipse at 55% 50%, rgba(125,43,110,0.25) 0%, rgba(42,19,99,0.18) 40%, transparent 70%)",
          filter: "blur(45px)",
        }}
        aria-hidden="true"
      />

      {/* Cover Spline watermark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: 160, height: 40, background: "#070410", zIndex: 20 }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto relative" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-[1fr_480px] items-center min-h-[640px]">

          {/* Content */}
          <div
            className="px-10 lg:px-24 py-20 lg:py-28 flex flex-col pointer-events-none"
            style={{ pointerEvents: "none" }}
          >
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
                <h2 className="font-bold leading-[0.92] tracking-[-0.04em] mb-8" style={{ fontSize: "clamp(2.2rem, 4.5vw, 5.5rem)" }}>
                  <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ color: "#D4CCFF" }}>
                    Ready to build
                  </motion.span>
                  <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} style={{ color: "#FFFFFF", fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em", paddingLeft: "clamp(0rem, 2.5vw, 3rem)" }}>
                    something
                  </motion.span>
                  <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }} style={{ color: "#D4CCFF", paddingLeft: "clamp(0rem, 5vw, 6rem)" }}>
                    exceptional?
                  </motion.span>
                </h2>
              ) : (
                <h2 className="font-bold leading-[0.92] tracking-[-0.04em] mb-8" style={{ fontSize: "clamp(2.2rem, 4.5vw, 5.5rem)" }}>
                  <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ color: "#D4CCFF" }}>
                    Prontos para
                  </motion.span>
                  <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} style={{ color: "#FFFFFF", fontStyle: "italic", fontWeight: 200, letterSpacing: "0.01em", paddingLeft: "clamp(0rem, 2.5vw, 3rem)" }}>
                    construir algo
                  </motion.span>
                  <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }} style={{ color: "#D4CCFF", paddingLeft: "clamp(0rem, 5vw, 6rem)" }}>
                    extraordinário?
                  </motion.span>
                </h2>
              )}
            </div>

            {/* Button + trust — aligned with end of title */}
            <div className="flex flex-col items-center gap-6" style={{ paddingLeft: "clamp(0rem, 5vw, 6rem)" }}>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4"
                style={{ pointerEvents: "auto" }}
              >
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
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
                      className="text-[11px] font-medium tracking-wide"
                      style={{ color: "#FFFFFF" }}
                    >
                      ✓ {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Spline stars */}
          <div className="hidden lg:block relative self-stretch" style={{ overflow: "hidden" }} aria-hidden="true">
            {showSpline && (
              <iframe
                src={SPLINE_CTA_SRC}
                style={{ position: "absolute", top: "-10%", left: "-20%", right: "0", bottom: "-10%", width: "120%", height: "120%", border: "none" }}
                title="CTA visual"
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
