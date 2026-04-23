"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: "#FAFAF8",
        backgroundImage: "radial-gradient(circle, rgba(42,19,99,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      aria-label="Our services"
    >
      {/* Fade out the dot grid at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, #FAFAF8 90%)" }}
        aria-hidden="true"
      />


      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

          {/* Left: sticky header */}
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
              style={{ color: "rgba(26,26,26,0.65)" }}
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
                className="group relative"
                style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Purple left accent — appears on hover */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: "linear-gradient(to bottom, #2A1363, rgba(200,162,232,0.5))",
                    transformOrigin: "top",
                  }}
                  aria-hidden="true"
                />

                <div className="flex gap-6 py-7 pl-6">
                  <motion.span
                    className="text-xs tracking-[0.2em] tabular-nums shrink-0 pt-1 transition-colors duration-300"
                    animate={{ color: hoveredIndex === index ? "rgba(42,19,99,0.9)" : "rgba(26,26,26,0.5)" }}
                  >
                    {item.number}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold tracking-[-0.025em] mb-2 transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                        color: hoveredIndex === index ? "#2A1363" : "#111111",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.7)" }}>
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
