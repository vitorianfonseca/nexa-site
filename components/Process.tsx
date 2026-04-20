"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
    el.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
    el.style.boxShadow = `${-x * 10}px ${-y * 10}px 28px rgba(42,19,99,0.08)`;
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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
      style={{ background: "#FAFAF8" }}
      aria-label="Our process"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(42,19,99,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-bold tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#111111" }}
          >
            {t.process.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.12em] uppercase"
            style={{ color: "rgba(26,26,26,0.3)" }}
          >
            {t.process.steps.length} steps
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {t.process.steps.map((step, index) => (
            <motion.div key={index} variants={fadeUp} custom={index}>
              <TiltCard
                className="relative h-full rounded-2xl p-7 cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "0.5px solid rgba(42,19,99,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: "rgba(26,26,26,0.3)" }}>
                    {step.number}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ background: "linear-gradient(135deg, #2A1363, #C8A2E8)", opacity: 0.5 }}
                  />
                </div>
                <h3
                  className="font-semibold tracking-[-0.02em] mb-2 leading-snug"
                  style={{ fontSize: "1rem", color: "#111111" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.5)" }}>
                  {step.description}
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: "linear-gradient(to right, #2A1363, #C8A2E8)" }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
