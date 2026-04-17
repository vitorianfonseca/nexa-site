"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const STEP = 420;   // card width (400) + gap (20)
const SPEED = 0.10; // px/ms  →  full loop in ~(N×STEP / SPEED) ms

// ── Project-specific visual mockups ────────────────────────────

function MockupDSTools() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0e0e0a 0%, #161408 60%, #0a0a06 100%)" }}>
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.5)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[7px] opacity-30 text-white">dstools.app</span>
        </div>
      </div>
      {/* Nav bar */}
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4 gap-4" style={{ background: "rgba(0,0,0,0.3)", borderBottom: "0.5px solid rgba(245,166,35,0.12)" }}>
        <span className="text-[8px] font-bold tracking-wider" style={{ color: "#f5a623" }}>DSTools</span>
        {["Guide", "Builder", "Crafting"].map((n) => (
          <span key={n} className="text-[7px] opacity-25 text-white">{n}</span>
        ))}
      </div>
      {/* Stats grid */}
      <div className="absolute inset-0 top-15 p-3 pt-[60px] grid grid-cols-2 gap-1.5">
        {[
          { label: "Health", value: "150", color: "#ef4444", bar: 0.8 },
          { label: "Hunger", value: "75%", color: "#f59e0b", bar: 0.5 },
          { label: "Sanity", value: "200", color: "#8b5cf6", bar: 0.65 },
          { label: "Day", value: "42", color: "#22c55e", bar: 1 },
        ].map((s) => (
          <div key={s.label} className="rounded p-2" style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</span>
              <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.value}</span>
            </div>
            <div className="h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${s.bar * 100}%`, background: s.color, opacity: 0.6 }} />
            </div>
          </div>
        ))}
      </div>
      {/* Decorative icon */}
      <div className="absolute bottom-3 right-3 text-2xl select-none" style={{ opacity: 0.08 }}>⚔</div>
    </div>
  );
}

function MockupLeiriagenda() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #060c1f 0%, #0a1535 60%, #060c1f 100%)" }}>
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.4)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="text-[7px] opacity-30 text-white">leiriagenda.pt</span>
        </div>
      </div>
      {/* Header */}
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4 gap-3" style={{ background: "rgba(59,130,246,0.08)", borderBottom: "0.5px solid rgba(59,130,246,0.15)" }}>
        <span className="text-[8px] font-bold tracking-wider" style={{ color: "#3b82f6" }}>Leiriagenda</span>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.2)", border: "0.5px solid rgba(59,130,246,0.3)" }}>
          <span className="text-[7px]" style={{ color: "#60a5fa" }}>📅 Abril</span>
        </div>
      </div>
      {/* Event cards */}
      <div className="absolute inset-0 top-[60px] p-3 flex flex-col gap-1.5 overflow-hidden">
        {[
          { title: "Jazz no Mercado", time: "21:00", color: "#6366f1", tag: "Música" },
          { title: "Feira de Artesanato", time: "10:00", color: "#f59e0b", tag: "Arte" },
          { title: "Corrida da Cidade", time: "09:00", color: "#22c55e", tag: "Desporto" },
        ].map((ev) => (
          <div key={ev.title} className="flex items-center gap-2 rounded p-1.5" style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
            <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: ev.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-semibold text-white opacity-80 truncate">{ev.title}</div>
              <div className="text-[7px] opacity-35 text-white">{ev.time}</div>
            </div>
            <span className="text-[6px] px-1.5 py-0.5 rounded-full shrink-0" style={{ background: `${ev.color}22`, color: ev.color }}>{ev.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupRestaurante() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a0a04 0%, #2d1508 60%, #180902 100%)" }}>
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.4)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="text-[7px] opacity-30 text-white">restaurante.pt</span>
        </div>
      </div>
      {/* Nav */}
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4" style={{ background: "rgba(0,0,0,0.2)" }}>
        <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#d97706" }}>Casa do Petisco</span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ background: "#d97706", opacity: 0.9 }}>
          <span className="text-[7px] font-semibold text-black">Reservar</span>
        </div>
      </div>
      {/* Hero area */}
      <div className="absolute top-[60px] left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-2 px-4">
        {/* Decorative circle — plate */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)", border: "0.5px solid rgba(217,119,6,0.25)" }}>
          <div className="w-10 h-10 rounded-full" style={{ background: "rgba(217,119,6,0.08)", border: "0.5px solid rgba(217,119,6,0.2)" }} />
        </div>
        <div className="text-center">
          <div className="text-[10px] font-bold text-white opacity-70 tracking-[-0.02em]">Cozinha tradicional</div>
          <div className="text-[7px] opacity-30 text-white mt-0.5">Aberto todos os dias · Leiria</div>
        </div>
      </div>
    </div>
  );
}

function MockupClinica() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #040d1a 0%, #071428 60%, #040d1a 100%)" }}>
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.4)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="text-[7px] opacity-30 text-white">clinica.pt</span>
        </div>
      </div>
      {/* Nav */}
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4" style={{ background: "rgba(14,165,233,0.05)", borderBottom: "0.5px solid rgba(14,165,233,0.1)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: "rgba(14,165,233,0.2)" }}>
            <span className="text-[7px]" style={{ color: "#38bdf8" }}>+</span>
          </div>
          <span className="text-[8px] font-bold tracking-wide" style={{ color: "#38bdf8" }}>ClínicaSaúde</span>
        </div>
        <div className="ml-auto px-2.5 py-1 rounded" style={{ background: "rgba(14,165,233,0.25)", border: "0.5px solid rgba(14,165,233,0.4)" }}>
          <span className="text-[7px] font-semibold" style={{ color: "#7dd3fc" }}>Marcar Consulta</span>
        </div>
      </div>
      {/* Appointment booking card */}
      <div className="absolute top-[62px] left-3 right-3 bottom-3 rounded-lg p-3 flex flex-col gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(14,165,233,0.12)" }}>
        <div className="text-[9px] font-semibold opacity-60 text-white">Próximas consultas</div>
        {[
          { name: "Medicina Geral", date: "Seg, 14 Abr", time: "10:30", dot: "#22c55e" },
          { name: "Pediatria", date: "Qui, 17 Abr", time: "15:00", dot: "#f59e0b" },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-2 rounded px-2 py-1.5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.dot }} />
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-medium text-white opacity-70 truncate">{c.name}</div>
              <div className="text-[7px] opacity-30 text-white">{c.date} · {c.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockups = [MockupDSTools, MockupLeiriagenda, MockupRestaurante, MockupClinica];

// ── Project Card ────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onHoverStart,
  onHoverEnd,
}: {
  project: { name: string; description: string; tags: string[]; href: string; image?: string };
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const Mockup = mockups[index % mockups.length];

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
    onHoverEnd();
  };

  return (
    <motion.article
      onMouseEnter={() => { setHovered(true); onHoverStart(); }}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="shrink-0 w-[320px] md:w-[400px] cursor-pointer"
      ref={tiltRef}
      style={{ transition: "transform 0.15s ease" }}
    >
      <Link href={project.href} aria-label={`View project: ${project.name}`}>
        {/* Mockup thumbnail */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-5"
          style={{ aspectRatio: "16/10" }}
        >
          {/* Real screenshot or CSS mockup fallback */}
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 320px, 400px"
            />
          ) : (
            <Mockup />
          )}

          {/* Hover overlay: grid pattern */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(42,19,99,0.6) 1px, transparent 1px), linear-gradient(to right, rgba(42,19,99,0.6) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  opacity: 0.06,
                }}
              />
            )}
          </AnimatePresence>

          {/* Hover CTA overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(10,10,18,0.55)", backdropFilter: "blur(4px)" }}
              >
                <span
                  className="text-white font-semibold text-sm tracking-[-0.01em] px-5 py-2 rounded-full"
                  style={{
                    background: "#EDE8FF",
                    color: "#0A0A12",
                    boxShadow: "0 4px 20px rgba(42,19,99,0.3)",
                  }}
                >
                  {t.work.viewProject}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project number badge */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold z-10"
            style={{
              background: hovered ? "rgba(42,19,99,0.5)" : "rgba(0,0,0,0.45)",
              color: hovered ? "rgba(200,162,232,0.95)" : "rgba(255,255,255,0.4)",
              border: hovered ? "0.5px solid rgba(200,162,232,0.35)" : "0.5px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
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
                  background: hovered ? "rgba(42,19,99,0.35)" : "rgba(255,255,255,0.06)",
                  color: hovered ? "rgba(200,162,232,0.95)" : "rgba(255,255,255,0.3)",
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

// ── Work Section ─────────────────────────────────────────────────

export default function Work() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const projects = t.work.projects;
  const N = projects.length;

  // Triple copies for seamless infinite loop in both directions
  const looped = [...projects, ...projects, ...projects];

  // x starts at copy-2 origin: -(N × STEP)
  const xMV = useMotionValue(-(N * STEP));
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | undefined>(undefined);

  // Keep x in the middle-copy range [-(2N×STEP), -(N×STEP)]
  const normalize = useCallback(() => {
    let x = xMV.get();
    while (x <= -(2 * N * STEP)) x += N * STEP;
    while (x > -(N * STEP)) x -= N * STEP;
    xMV.set(x);
  }, [N, xMV]);

  // ── Continuous RAF marquee ───────────────────────────────────
  useEffect(() => {
    if (!inView) return;

    const tick = (now: number) => {
      if (lastTimeRef.current !== undefined) {
        const dt = Math.min(now - lastTimeRef.current, 50); // cap on tab-switch
        if (!hoveredRef.current && !draggingRef.current) {
          const next = xMV.get() - SPEED * dt;
          // seamless loop: once past copy-3 origin, teleport back to copy-2
          xMV.set(next <= -(2 * N * STEP) ? next + N * STEP : next);
        }
      }
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, N, xMV]);

  // ── Trackpad / wheel support ─────────────────────────────────
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Ignore mostly-vertical scroll (page scroll)
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.4) return;
      e.preventDefault();

      let x = xMV.get() - e.deltaX;
      // Keep within looped range
      while (x <= -(2 * N * STEP)) x += N * STEP;
      while (x > -(N * STEP)) x -= N * STEP;
      xMV.set(x);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [N, xMV]);

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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12">
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
      </div>

      {/* Carousel — continuous marquee */}
      <motion.div
        ref={outerRef}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pl-6 lg:pl-[max(24px,calc((100vw-1280px)/2+32px))] relative z-10"
      >
        <motion.div
          ref={trackRef}
          className="flex gap-5 pr-12"
          drag="x"
          dragConstraints={{ left: -(looped.length * STEP), right: 0 }}
          style={{ x: xMV }}
          onDragStart={() => { draggingRef.current = true; }}
          onDragEnd={() => {
            normalize();
            // short delay so Framer's drag release doesn't conflict with RAF
            setTimeout(() => { draggingRef.current = false; }, 60);
          }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {looped.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i % N}
              onHoverStart={() => { hoveredRef.current = true; }}
              onHoverEnd={() => { hoveredRef.current = false; }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
