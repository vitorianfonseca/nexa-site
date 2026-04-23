"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Work() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = t.work.projects;
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const canSwipe = useRef(true);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((i) => (i - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((i) => (i + 1) % projects.length);
  }, [projects.length]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaX) < 20) return;
    if (!canSwipe.current) return;
    canSwipe.current = false;
    if (e.deltaX > 0) next(); else prev();
    setTimeout(() => { canSwipe.current = true; }, 600);
  }, [next, prev]);

  const project = projects[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 32 : -32, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -32 : 32, opacity: 0 }),
  };

  return (
    <section
      id="work"
      ref={ref}
      className="relative"
      style={{ background: "#070410", paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}
      aria-label="Our work"
    >
      <div className="max-w-[1536px] mx-auto px-10 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(200,162,232,0.65)" }}>
              Selected work
            </p>
            <h2 className="font-bold tracking-[-0.03em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#EDE8FF" }}>
              {t.work.title}
            </h2>
          </div>
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.22em] uppercase pb-1" style={{ color: "rgba(255,255,255,0.9)" }}>
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </motion.div>

        {/* Split layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] lg:gap-16 xl:gap-24 items-start"
          onWheel={onWheel}
          style={{ touchAction: "pan-y" }}
        >

          {/* Left: single project info + nav */}
          <div>
            {/* Top separator */}
            <div style={{ borderTop: "0.5px solid rgba(200,162,232,0.1)" }} />

            {/* Project info — animated */}
            <div className="relative overflow-hidden" style={{ minHeight: 180 }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 lg:py-10"
                >
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 sm:gap-7 outline-none"
                  >
                    {/* Number */}
                    <span
                      className="hidden sm:block font-mono tabular-nums shrink-0 pt-1.5"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.18em", width: "2.2rem", color: "rgba(200,162,232,0.75)" }}
                    >
                      {String(current + 1).padStart(2, "0")}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3
                          className="font-bold tracking-[-0.03em] group-hover:text-white transition-colors duration-300"
                          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: "rgba(237,232,255,0.9)" }}
                        >
                          {project.name}
                        </h3>
                        <span
                          className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                          style={{ color: "#C8A2E8", fontSize: "1rem" }}
                        >
                          ↗
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "30rem" }}>
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(42,19,99,0.5)", color: "rgba(200,162,232,0.85)", border: "0.5px solid rgba(200,162,232,0.18)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mobile preview */}
                      {project.image && (
                        <div
                          className="mt-5 block lg:hidden relative rounded-xl overflow-hidden"
                          style={{ aspectRatio: "16/10", border: "0.5px solid rgba(200,162,232,0.12)" }}
                        >
                          <Image src={project.image} alt={project.name} fill className="object-cover object-top" sizes="90vw" />
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom separator */}
            <div style={{ borderBottom: "0.5px solid rgba(200,162,232,0.1)" }} />

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[rgba(200,162,232,0.08)]"
                style={{ border: "0.5px solid rgba(200,162,232,0.2)", color: "rgba(200,162,232,0.7)" }}
                aria-label="Previous project"
              >
                ←
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                    aria-label={`Go to project ${i + 1}`}
                    style={{
                      width: current === i ? 20 : 4,
                      height: 3,
                      borderRadius: 999,
                      background: current === i ? "rgba(200,162,232,0.85)" : "rgba(200,162,232,0.22)",
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      cursor: "pointer",
                      border: "none",
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[rgba(200,162,232,0.08)]"
                style={{ border: "0.5px solid rgba(200,162,232,0.2)", color: "rgba(200,162,232,0.7)" }}
                aria-label="Next project"
              >
                →
              </button>

              <span className="ml-auto font-mono text-[10px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.75)" }}>
                {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: image panel — desktop only */}
          <div className="hidden lg:block self-start" style={{ position: "sticky", top: "6rem" }}>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "16/10",
                border: "0.5px solid rgba(200,162,232,0.15)",
                background: "#0d0921",
              }}
            >
              <AnimatePresence mode="wait" custom={dir}>
                {project.image && (
                  <motion.div
                    key={current}
                    custom={dir}
                    initial={{ clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    exit={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top"
                      sizes="460px"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(7,4,16,0.6) 0%, transparent 60%)" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Project label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="font-bold tracking-[-0.02em]" style={{ color: "#EDE8FF", fontSize: "0.95rem" }}>
                  {project.name}
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
