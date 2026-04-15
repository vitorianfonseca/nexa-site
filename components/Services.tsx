"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Animated SVG icons per service index
function ServiceIcon({ index, active }: { index: number; active: boolean }) {
  const color = active ? "#C8A2E8" : "rgba(26,26,26,0.25)";
  const icons = [
    // 0 — Code / Web dev
    <svg key="code" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.path
        d="M7 7L2 11L7 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0.4 }}
        transition={{ duration: 0.35 }}
      />
      <motion.path
        d="M15 7L20 11L15 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0.4 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      />
      <motion.path
        d="M13 4L9 18"
        stroke={active ? "#C8A2E8" : "rgba(26,26,26,0.15)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0.3 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </svg>,
    // 1 — Design
    <svg key="design" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5"
        initial={false} animate={{ pathLength: active ? 1 : 0.4 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="11" cy="11" r="3" stroke={active ? "#C8A2E8" : "rgba(26,26,26,0.2)"} strokeWidth="1.5"
        initial={false} animate={{ scale: active ? 1 : 0.7, opacity: active ? 1 : 0.4 }}
        style={{ originX: "50%", originY: "50%" }} transition={{ duration: 0.3 }} />
      <motion.line x1="11" y1="3" x2="11" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        initial={false} animate={{ scaleY: active ? 1 : 0 }} transition={{ duration: 0.25 }} />
    </svg>,
    // 2 — Performance / Rocket
    <svg key="rocket" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.path d="M11 2C11 2 16 6 16 11C16 14 14 16 11 17C8 16 6 14 6 11C6 6 11 2 11 2Z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"
        initial={false} animate={{ pathLength: active ? 1 : 0.4 }} transition={{ duration: 0.4 }} />
      <motion.path d="M8 19L11 17L14 19" stroke={active ? "#C8A2E8" : "rgba(26,26,26,0.2)"}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={false} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.2 }} />
      <motion.circle cx="11" cy="10" r="1.5" fill={color}
        initial={false} animate={{ scale: active ? 1 : 0 }} transition={{ duration: 0.2 }} />
    </svg>,
    // 3 — E-commerce / Shop
    <svg key="shop" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.path d="M3 3H5L6.5 12H16.5L18 6H7" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        initial={false} animate={{ pathLength: active ? 1 : 0.4 }} transition={{ duration: 0.4 }} />
      <motion.circle cx="9" cy="16" r="1.5" fill={color}
        initial={false} animate={{ scale: active ? 1 : 0 }} transition={{ duration: 0.2, delay: 0.15 }} />
      <motion.circle cx="15" cy="16" r="1.5" fill={active ? "#C8A2E8" : "rgba(26,26,26,0.2)"}
        initial={false} animate={{ scale: active ? 1 : 0 }} transition={{ duration: 0.2, delay: 0.2 }} />
    </svg>,
    // 4 — Maintenance / Shield
    <svg key="shield" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.path d="M11 2L19 6V11C19 15.4 15.4 19.4 11 20C6.6 19.4 3 15.4 3 11V6L11 2Z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"
        initial={false} animate={{ pathLength: active ? 1 : 0.4 }} transition={{ duration: 0.5 }} />
      <motion.path d="M8 11L10 13L14 9" stroke={active ? "#C8A2E8" : "rgba(26,26,26,0.2)"}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={false} animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }} />
    </svg>,
  ];

  return icons[index % icons.length];
}

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
      aria-label="Our services"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(42,19,99,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-bold text-foreground tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)" }}
          >
            {t.services.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm text-muted max-w-xs leading-relaxed lg:text-right"
          >
            {t.services.items.length} services · hover to explore
          </motion.p>
        </div>

        {/* Service list */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {t.services.items.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                },
              }}
              className="group relative cursor-pointer"
              style={{ borderTop: "0.5px solid rgba(26,26,26,0.08)" }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {/* Hover background fill */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="absolute inset-0 origin-left rounded-r-2xl"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(42,19,99,0.04), rgba(200,162,232,0.02))",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Active left border */}
              <motion.div
                animate={{
                  scaleY: activeIndex === index ? 1 : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-full"
                style={{ background: "linear-gradient(to bottom, #2A1363, #7E4CC4, #C8A2E8)" }}
              />

              <motion.div
                animate={{
                  paddingTop: activeIndex === index ? 26 : 20,
                  paddingBottom: activeIndex === index ? 26 : 20,
                  paddingLeft: activeIndex === index ? 18 : 8,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="relative flex items-start justify-between gap-8 z-10"
              >
                {/* Icon + content */}
                <div className="flex items-start gap-5 min-w-0">
                  {/* Animated icon */}
                  <motion.div
                    animate={{ scale: activeIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 mt-0.5 w-6 flex items-center justify-center"
                  >
                    <ServiceIcon index={index} active={activeIndex === index} />
                  </motion.div>

                  {/* Number */}
                  <span
                    className="text-xs font-semibold tracking-widest shrink-0 mt-1.5 w-8"
                    style={{
                      background:
                        activeIndex === index
                          ? "linear-gradient(135deg, #2A1363, #7E4CC4, #C8A2E8)"
                          : "none",
                      WebkitBackgroundClip: activeIndex === index ? "text" : undefined,
                      WebkitTextFillColor: activeIndex === index ? "transparent" : undefined,
                      backgroundClip: activeIndex === index ? "text" : undefined,
                      color: activeIndex === index ? "transparent" : "rgba(26,26,26,0.25)",
                    }}
                  >
                    {item.number}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className="font-semibold tracking-[-0.02em] leading-snug transition-colors duration-200"
                      style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                        color: activeIndex === index ? "#2A1363" : "#1A1A1A",
                      }}
                    >
                      {item.title}
                    </h3>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                          className="text-sm text-muted leading-relaxed tracking-[-0.01em] max-w-lg overflow-hidden"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Arrow */}
                <motion.span
                  animate={{
                    x: activeIndex === index ? 5 : 0,
                    rotate: activeIndex === index ? -45 : 0,
                    color: activeIndex === index ? "#2A1363" : "rgba(26,26,26,0.25)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-lg mt-1 shrink-0"
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </motion.div>

              {index === t.services.items.length - 1 && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "rgba(26,26,26,0.08)" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
