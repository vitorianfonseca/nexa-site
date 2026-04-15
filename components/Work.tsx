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
                ? "linear-gradient(135deg, #130d20 0%, #1e1040 100%)"
                : "#0D0D1A",
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
              border: hovered ? "1px solid rgba(200,162,232,0.4)" : "1px solid rgba(255,255,255,0.1)",
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
              border: hovered ? "0.5px solid rgba(42,19,99,0.4)" : "0.5px solid rgba(255,255,255,0.06)",
              transition: "border-color 0.3s",
            }}
          />

          {/* Project number badge */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: hovered ? "rgba(42,19,99,0.3)" : "rgba(255,255,255,0.05)",
              color: hovered ? "rgba(200,162,232,0.9)" : "rgba(255,255,255,0.25)",
              border: hovered ? "0.5px solid rgba(200,162,232,0.3)" : "0.5px solid rgba(255,255,255,0.08)",
              transition: "all 0.3s",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Info */}
        <div>
          <motion.h3
            animate={{ color: hovered ? "#C8A2E8" : "#EDE8FF" }}
            transition={{ duration: 0.2 }}
            className="font-bold tracking-[-0.03em] mb-2 leading-snug"
            style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)" }}
          >
            {project.name}
          </motion.h3>
          <p className="text-sm leading-relaxed mb-3 tracking-[-0.01em]" style={{ color: "rgba(255,255,255,0.4)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                animate={{
                  background: hovered ? "rgba(42,19,99,0.3)" : "rgba(255,255,255,0.06)",
                  color: hovered ? "rgba(200,162,232,0.9)" : "rgba(255,255,255,0.3)",
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
      className="py-24 lg:py-32 overflow-hidden relative"
      style={{ background: "#0A0A12" }}
      aria-label="Our work"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,19,99,0.2) 0%, transparent 70%)", filter: "blur(80px)", top: -100, right: "10%" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,232,0.08) 0%, transparent 70%)", filter: "blur(60px)", bottom: 0, left: "20%" }} />
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Spinning rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: "0.5px solid rgba(200,162,232,0.1)", top: "-5%", right: "3%" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "0.5px solid rgba(42,19,99,0.25)", top: "5%", right: "7%" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", border: "0.5px solid rgba(200,162,232,0.08)", bottom: "10%", left: "5%" }}
        />
        {/* Wireframe cube — bottom right */}
        <motion.div
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: 60, height: 60, border: "0.5px solid rgba(42,19,99,0.3)", bottom: "18%", right: "4%", transformStyle: "preserve-3d" }}
        />
        {/* Rotated square — top left */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: 50, height: 50, border: "0.5px solid rgba(200,162,232,0.12)", top: "20%", left: "2%", transform: "rotate(45deg)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-3"
              style={{ color: "rgba(200,162,232,0.7)" }}
            >
              Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#EDE8FF" }}
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
              { fn: prev, label: "Previous", icon: "←" },
              { fn: next, label: "Next", icon: "→" },
            ].map(({ fn, label, icon }) => (
              <motion.button
                key={icon}
                onClick={fn}
                aria-label={label}
                whileHover={{ scale: 1.05, backgroundColor: "#2A1363", color: "#EDE8FF", borderColor: "transparent" }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)" }}
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
        className="pl-6 lg:pl-[max(24px,calc((100vw-1280px)/2+32px))] relative z-10"
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
      <div className="flex gap-2 mt-8 pl-6 lg:pl-[max(24px,calc((100vw-1280px)/2+32px))] relative z-10">
        {projects.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            animate={{
              width: i === activeIndex ? 28 : 7,
              background: i === activeIndex ? "#C8A2E8" : "rgba(255,255,255,0.15)",
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
