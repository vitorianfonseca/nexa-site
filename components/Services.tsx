"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#FAFAF8" }}
      aria-label="Our services"
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span style={{ fontSize: "clamp(7rem, 20vw, 20rem)", fontWeight: 900, letterSpacing: "-0.06em", color: "rgba(26,26,26,0.04)", lineHeight: 1, userSelect: "none", transform: "translateX(8%)" }}>
          Nexa
        </span>
      </div>

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

          {/* Left: header */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ color: "rgba(200,162,232,0.75)" }}
            >
              {lang === "en" ? "What we offer" : "O que oferecemos"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-bold tracking-[-0.03em] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#111111" }}
            >
              {t.services.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(26,26,26,0.45)" }}
            >
              {lang === "en"
                ? "Everything you need to build a strong online presence."
                : "Tudo o que precisa para construir uma presença online sólida."}
            </motion.p>
          </div>

          {/* Right: service list */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {t.services.items.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
                }}
                className="group"
                style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}
              >
                <div className="flex gap-6 py-7">
                  <span
                    className="text-xs tracking-[0.2em] tabular-nums shrink-0 pt-1"
                    style={{ color: "rgba(26,26,26,0.3)" }}
                  >
                    {item.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold tracking-[-0.025em] mb-2 transition-colors duration-200 group-hover:text-accent"
                      style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#111111" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.5)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
