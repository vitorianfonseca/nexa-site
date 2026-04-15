"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// 3D tilt card
function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
    el.style.boxShadow = `${-x * 12}px ${-y * 12}px 32px rgba(42,19,99,0.12)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 0.15s ease, box-shadow 0.15s ease", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

// ── Unique looping animation per step ─────────────────────────
function StepIcon({ index }: { index: number }) {
  const icons = [
    // 0 — Discover: sonar / radar pulses
    <div key="sonar" className="relative w-10 h-10 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: "rgba(42,19,99,0.5)" }}
          animate={{ width: [8, 38], height: [8, 38], opacity: [0.8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.65,
            ease: "easeOut",
          }}
        />
      ))}
      <div
        className="w-2 h-2 rounded-full"
        style={{ background: "linear-gradient(135deg,#2A1363,#7E4CC4,#C8A2E8)" }}
      />
    </div>,

    // 1 — Design: morphing square → circle → square
    <div key="morph" className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        animate={{ borderRadius: ["4px", "50%", "4px"], rotate: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 22,
          height: 22,
          border: "1.5px solid rgba(42,19,99,0.7)",
          background: "rgba(42,19,99,0.08)",
        }}
      />
      <motion.div
        animate={{ scale: [0.4, 1, 0.4], opacity: [0, 0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#C8A2E8",
        }}
      />
    </div>,

    // 2 — Build: three bars loading
    <div key="bars" className="relative w-10 h-10 flex items-end justify-center gap-[3px] pb-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[5px] rounded-sm"
          style={{ background: "linear-gradient(to top, #2A1363, #7E4CC4, #C8A2E8)" }}
          animate={{ height: ["6px", `${14 + i * 5}px`, "6px"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>,

    // 3 — Launch: arrow shooting upward with glow trail
    <div key="launch" className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
      {/* Trail dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            marginLeft: -1,
            width: 2,
            borderRadius: 2,
            background: `linear-gradient(to top, rgba(42,19,99,${0.6 - i * 0.15}), transparent)`,
          }}
          animate={{ bottom: [2 + i * 4, 8 + i * 4, 2 + i * 4], height: [3, 7, 3], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
      {/* Arrow */}
      <motion.div
        animate={{ y: [4, -18], opacity: [1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", repeatDelay: 0.3 }}
        style={{ position: "absolute" }}
      >
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <motion.path
            d="M7 16V2M7 2L2 7M7 2L12 7"
            stroke="url(#lg)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="lg" x1="7" y1="2" x2="7" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C8A2E8" />
              <stop offset="1" stopColor="#2A1363" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>,
  ];

  return icons[index % icons.length];
}

// ── Traveling dot connector (desktop only) ─────────────────
function ProcessConnector({ count, inView }: { count: number; inView: boolean }) {
  // Duration for one full pass across all steps
  const duration = 4;

  return (
    <div
      className="hidden lg:block relative mb-6 mx-1"
      style={{ height: 2 }}
      aria-hidden="true"
    >
      {/* Base line */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(42,19,99,0.1)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Segment fills that light up in sequence */}
      {Array.from({ length: count - 1 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 rounded-full"
          style={{
            left: `${(i / (count - 1)) * 100}%`,
            width: `${(1 / (count - 1)) * 100}%`,
            background: "linear-gradient(to right, #2A1363, #7E4CC4, #C8A2E8)",
            transformOrigin: "left",
          }}
          animate={inView ? { scaleX: [0, 1, 1, 0] } : {}}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: i * (duration / (count - 1)),
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        />
      ))}

      {/* Glowing traveling dot */}
      {inView && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          animate={{ left: ["0%", "100%"] }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ zIndex: 10 }}
        >
          {/* Outer glow */}
          <div
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "rgba(200,162,232,0.3)",
              filter: "blur(4px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Core dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2A1363, #7E4CC4, #C8A2E8)",
              boxShadow: "0 0 8px rgba(42,19,99,0.9)",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}

      {/* Step markers */}
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{
            left: `${(i / (count - 1)) * 100}%`,
            background: "rgba(42,19,99,0.25)",
            border: "0.5px solid rgba(42,19,99,0.4)",
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Process() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Our process"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(42,19,99,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-12">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-bold text-foreground tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)" }}
          >
            {t.process.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs text-muted/50 tracking-[0.12em] uppercase"
          >
            {t.process.steps.length} steps
          </motion.p>
        </div>

        {/* Traveling dot connector */}
        <ProcessConnector count={t.process.steps.length} inView={inView} />

        {/* Steps grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {t.process.steps.map((step, index) => (
            <motion.div key={index} variants={fadeUp} custom={index}>
              <TiltCard
                className="relative h-full rounded-2xl p-7 cursor-default overflow-hidden"
                style={{
                  background: "rgba(42,19,99,0.025)",
                  border: "0.5px solid rgba(26,26,26,0.08)",
                }}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-[0.2em] text-muted/35">
                    {step.number}
                  </span>
                  {/* Unique per-step animation */}
                  <StepIcon index={index} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-foreground tracking-[-0.02em] mb-3 leading-snug text-base">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed tracking-[-0.01em]">
                  {step.description}
                </p>

                {/* Bottom accent bar on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: "linear-gradient(to right, #2A1363, #7E4CC4, #C8A2E8)" }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
