"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 1L7.35 4.27L11 4.64L8.5 6.97L9.18 10.5L6 8.77L2.82 10.5L3.5 6.97L1 4.64L4.65 4.27L6 1Z"
            fill="#C8A2E8"
            fillOpacity="0.9"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = t.testimonials.items;

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#070410" }}
      aria-label="Client testimonials"
    >
      {/* Top fade from light section */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(200,162,232,0.12), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(42,19,99,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-3"
            style={{ color: "rgba(200,162,232,0.75)" }}
          >
            {t.testimonials.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-[-0.03em]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.8rem)",
              color: "#FFFFFF",
              fontFamily: "var(--font-cabinet)",
            }}
          >
            {t.testimonials.title}
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col justify-between rounded-2xl p-7 gap-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(200,162,232,0.1)",
                boxShadow: "0 1px 0 rgba(200,162,232,0.06) inset",
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-5 right-6 select-none pointer-events-none"
                aria-hidden="true"
                style={{
                  fontSize: "5rem",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  color: "rgba(200,162,232,0.07)",
                  fontWeight: 700,
                }}
              >
                &ldquo;
              </span>

              <div className="flex flex-col gap-4 relative">
                <StarRow />
                <blockquote>
                  <p
                    className="text-sm leading-[1.75] tracking-[-0.01em]"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
              </div>

              <footer className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(42,19,99,0.6), rgba(200,162,232,0.2))",
                    border: "0.5px solid rgba(200,162,232,0.2)",
                    color: "rgba(200,162,232,0.9)",
                    fontFamily: "var(--font-cabinet)",
                  }}
                  aria-hidden="true"
                >
                  {item.name.charAt(0)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-sm font-semibold tracking-[-0.01em]"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-xs tracking-[-0.005em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {item.role}, {item.company}
                  </span>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(200,162,232,0.08), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
