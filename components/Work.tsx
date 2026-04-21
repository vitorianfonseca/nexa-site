"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// ── Project-specific visual mockups ────────────────────────────

function MockupDSTools() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0e0e0a 0%, #161408 60%, #0a0a06 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.5)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[7px] opacity-30 text-white">dstools.app</span>
        </div>
      </div>
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4 gap-4" style={{ background: "rgba(0,0,0,0.3)", borderBottom: "0.5px solid rgba(245,166,35,0.12)" }}>
        <span className="text-[8px] font-bold tracking-wider" style={{ color: "#f5a623" }}>DSTools</span>
        {["Guide", "Builder", "Crafting"].map((n) => (
          <span key={n} className="text-[7px] opacity-25 text-white">{n}</span>
        ))}
      </div>
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
      <div className="absolute bottom-3 right-3 text-2xl select-none" style={{ opacity: 0.08 }}>⚔</div>
    </div>
  );
}

function MockupLeiriagenda() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #060c1f 0%, #0a1535 60%, #060c1f 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.4)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="text-[7px] opacity-30 text-white">leiriagenda.pt</span>
        </div>
      </div>
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4 gap-3" style={{ background: "rgba(59,130,246,0.08)", borderBottom: "0.5px solid rgba(59,130,246,0.15)" }}>
        <span className="text-[8px] font-bold tracking-wider" style={{ color: "#3b82f6" }}>Leiriagenda</span>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.2)", border: "0.5px solid rgba(59,130,246,0.3)" }}>
          <span className="text-[7px]" style={{ color: "#60a5fa" }}>📅 Abril</span>
        </div>
      </div>
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
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.4)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="text-[7px] opacity-30 text-white">restaurante.pt</span>
        </div>
      </div>
      <div className="absolute top-7 left-0 right-0 h-8 flex items-center px-4" style={{ background: "rgba(0,0,0,0.2)" }}>
        <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#d97706" }}>Casa do Petisco</span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ background: "#d97706", opacity: 0.9 }}>
          <span className="text-[7px] font-semibold text-black">Reservar</span>
        </div>
      </div>
      <div className="absolute top-[60px] left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-2 px-4">
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
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: "rgba(0,0,0,0.4)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded-sm flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="text-[7px] opacity-30 text-white">clinica.pt</span>
        </div>
      </div>
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

// ── Work Section ─────────────────────────────────────────────────

export default function Work() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = t.work.projects;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const displayed = hovered !== null ? hovered : active;

  return (
    <section
      id="work"
      ref={ref}
      className="overflow-hidden relative"
      style={{ background: "#070410", paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}
      aria-label="Our work"
    >

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative" style={{ zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(200,162,232,0.65)" }}>
              Selected work
            </p>
            <h2
              className="font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#EDE8FF" }}
            >
              {t.work.title}
            </h2>
          </div>
          <span className="text-sm font-mono tabular-nums pb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            {String(displayed + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Two-column layout: list left, preview right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left: editorial project list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {projects.map((project, i) => {
              const isActive = displayed === i;
              return (
                <motion.div
                  key={project.name}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => { setHovered(null); setActive(i); }}
                  onClick={() => setActive(i)}
                  className="group relative cursor-pointer"
                  style={{ borderTop: i === 0 ? "0.5px solid rgba(200,162,232,0.15)" : undefined }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(200,162,232,0.15)" }} />

                  {/* Active left accent */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "linear-gradient(to bottom, #C8A2E8, #7D2B6E)",
                      transformOrigin: "top",
                    }}
                  />

                  <div className="flex items-center gap-5 py-4 pl-5 pr-2">
                    {/* Number */}
                    <motion.span
                      className="text-xs tracking-[0.2em] tabular-nums shrink-0 font-mono"
                      animate={{ color: isActive ? "rgba(200,162,232,0.8)" : "rgba(255,255,255,0.2)" }}
                      transition={{ duration: 0.25 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    {/* Name + description */}
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        className="font-bold tracking-[-0.03em] leading-tight"
                        animate={{ color: isActive ? "#EDE8FF" : "rgba(237,232,255,0.4)" }}
                        transition={{ duration: 0.25 }}
                        style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                      >
                        {project.name}
                      </motion.h3>
                      <motion.p
                        className="text-sm mt-1 leading-relaxed"
                        animate={{ color: isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}
                        transition={{ duration: 0.25 }}
                      >
                        {project.description}
                      </motion.p>

                      {/* Tags */}
                      <motion.div
                        className="flex flex-wrap gap-1.5 mt-2"
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(42,19,99,0.4)", color: "rgba(200,162,232,0.85)", border: "0.5px solid rgba(200,162,232,0.2)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Arrow — desktop: animated, mobile: always visible link */}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lg:hidden shrink-0 text-base"
                      style={{ color: "rgba(200,162,232,0.6)" }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${project.name}`}
                    >
                      ↗
                    </a>
                    <motion.span
                      className="shrink-0 text-lg hidden lg:block"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -6,
                        color: "#C8A2E8",
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      ↗
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: sticky preview panel */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ alignSelf: "center" }}
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16/10", border: "0.5px solid rgba(200,162,232,0.12)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayed}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {projects[displayed]?.image ? (
                    <Image
                      src={projects[displayed].image!}
                      alt={projects[displayed].name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    (() => { const M = mockups[displayed % mockups.length]; return <M />; })()
                  )}

                  {/* Overlay with project link */}
                  <motion.div
                    className="absolute inset-0 flex items-end p-6"
                    style={{ background: "linear-gradient(to top, rgba(7,4,16,0.7) 0%, transparent 50%)" }}
                  >
                    <Link
                      href={projects[displayed]?.href ?? "#"}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
                      style={{ background: "#EDE8FF", color: "#070410" }}
                    >
                      {t.work.viewProject}
                      <span>↗</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Corner accent */}
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold z-10"
                style={{ background: "rgba(42,19,99,0.6)", color: "rgba(200,162,232,0.9)", border: "0.5px solid rgba(200,162,232,0.25)" }}
              >
                {String(displayed + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-3 justify-center">
              {projects.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to project ${i + 1}`}
                  animate={{
                    width: displayed === i ? 24 : 6,
                    background: displayed === i ? "#C8A2E8" : "rgba(200,162,232,0.2)",
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
