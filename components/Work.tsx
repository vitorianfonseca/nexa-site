"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function ProjectCard({
  project,
  index,
  isActive,
}: {
  project: { name: string; description: string; tags: string[]; href: string };
  index: number;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.02)`;
  };

  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0) rotateY(0) scale(1)";
    setHovered(false);
  };

  return (
    <motion.article
      animate={{ scale: isActive ? 1 : 0.97, opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="shrink-0 w-[320px] md:w-[400px] cursor-pointer"
      ref={tiltRef}
      style={{ transition: "transform 0.15s ease, opacity 0.35s ease, scale 0.35s ease" }}
    >
      <Link href={project.href} aria-label={`View project: ${project.name}`}>
        {/* Image placeholder */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-5"
          style={{ aspectRatio: "16/10" }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #0a0a14 0%, #130d20 100%)"
                : "#ECEAE6",
            }}
          />

          {/* Grid pattern (visible on hover) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(42,19,99,1) 1px, transparent 1px), linear-gradient(to right, rgba(42,19,99,1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            )}
          </AnimatePresence>

          {/* Gradient overlay on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="text-white font-semibold text-sm tracking-[-0.01em] px-5 py-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(42,19,99,0.85), rgba(200,162,232,0.8))",
                    boxShadow: "0 4px 20px rgba(42,19,99,0.3)",
                  }}
                >
                  View project →
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating 3D ring decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: hovered
                ? "1px solid rgba(200,162,232,0.4)"
                : "1px solid rgba(26,26,26,0.15)",
              transition: "border-color 0.3s",
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: hovered
                ? "0.5px solid rgba(42,19,99,0.3)"
                : "0.5px solid rgba(26,26,26,0.1)",
              transition: "border-color 0.3s",
            }}
          />

          {/* Project number badge */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: hovered
                ? "rgba(42,19,99,0.2)"
                : "rgba(26,26,26,0.06)",
              color: hovered
                ? "rgba(200,150,255,0.9)"
                : "rgba(26,26,26,0.35)",
              border: hovered
                ? "0.5px solid rgba(200,162,232,0.3)"
                : "0.5px solid transparent",
              transition: "all 0.3s",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Info */}
        <div>
          <motion.h3
            animate={{ color: hovered ? "#2A1363" : "#1A1A1A" }}
            transition={{ duration: 0.2 }}
            className="font-bold tracking-[-0.03em] mb-2 leading-snug"
            style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)" }}
          >
            {project.name}
          </motion.h3>
          <p className="text-sm text-muted leading-relaxed mb-3 tracking-[-0.01em]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                animate={{
                  background: hovered
                    ? "rgba(42,19,99,0.08)"
                    : "rgba(26,26,26,0.05)",
                  color: hovered
                    ? "rgba(200,162,232,0.9)"
                    : "rgba(26,26,26,0.45)",
                }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Work() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const projects = t.work.projects;
  const cardWidth = 420;
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);

  // Triple the projects for seamless infinite loop
  const looped = [...projects, ...projects, ...projects];
  const N = projects.length;

  // Virtual index — starts at copy 2 (index N)
  const virtualRef = useRef(N);
  const xMV = useMotionValue(-N * cardWidth);

  const goTo = (vIdx: number, instant = false) => {
    virtualRef.current = vIdx;
    setActiveIndex(vIdx % N);
    if (instant) {
      xMV.set(-vIdx * cardWidth);
    } else {
      animate(xMV, -vIdx * cardWidth, { type: "spring", stiffness: 280, damping: 38 });
    }
  };

  const prev = () => goTo(virtualRef.current - 1);
  const next = () => goTo(virtualRef.current + 1);

  // Infinite forward auto-rotate — on arrival at copy 3, silently jump to copy 2
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      if (hoveringRef.current || draggingRef.current) return;
      const nextV = virtualRef.current + 1;
      // If we've reached the start of copy 3, animate there then silently reset to copy 2
      if (nextV >= N * 2) {
        animate(xMV, -nextV * cardWidth, {
          type: "spring", stiffness: 280, damping: 38,
          onComplete: () => {
            // silent teleport: copy 3 pos == copy 2 pos visually
            const reset = nextV - N;
            virtualRef.current = reset;
            setActiveIndex(reset % N);
            xMV.set(-reset * cardWidth);
          },
        });
      } else {
        goTo(nextV);
      }
    }, 2800);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section
      id="work"
      ref={ref}
      className="py-24 lg:py-32 overflow-hidden"
      style={{ background: "#F5F5F2" }}
      aria-label="Our work"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-semibold tracking-[0.15em] uppercase text-accent/70 mb-3"
            >
              Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-bold text-foreground tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)" }}
            >
              {t.work.title}
            </motion.h2>
          </div>

          {/* Arrow nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex gap-2"
          >
            {[
              { fn: prev, label: "Previous", icon: "←", disabled: false },
              { fn: next, label: "Next", icon: "→", disabled: false },
            ].map(({ fn, label, icon, disabled }) => (
              <motion.button
                key={icon}
                onClick={fn}
                disabled={disabled}
                aria-label={label}
                whileHover={!disabled ? { scale: 1.05, backgroundColor: "#2A1363", color: "#fff" } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors duration-200 ${
                  disabled
                    ? "text-muted/30 border border-[rgba(26,26,26,0.08)] cursor-not-allowed"
                    : "text-foreground border border-[rgba(26,26,26,0.15)]"
                }`}
              >
                {icon}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pl-6 lg:pl-[max(24px,calc((100vw-1280px)/2+32px))]"
        onMouseEnter={() => { hoveringRef.current = true; }}
        onMouseLeave={() => { hoveringRef.current = false; }}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-5 pr-12"
          drag="x"
          dragConstraints={{ left: -(looped.length - 1) * cardWidth, right: 0 }}
          style={{ x: xMV, cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
          onDragStart={() => { draggingRef.current = true; }}
          onDragEnd={(_, info) => {
            draggingRef.current = false;
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
        >
          {looped.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i % N}
              isActive={i % N === activeIndex}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Dots */}
      <div className="flex gap-2 mt-8 pl-6 lg:pl-[max(24px,calc((100vw-1280px)/2+32px))]">
        {projects.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            animate={{
              width: i === activeIndex ? 28 : 7,
              background: i === activeIndex ? "#2A1363" : "rgba(26,26,26,0.2)",
            }}
            className="h-1 rounded-full"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  );
}
