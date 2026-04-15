"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

// ── Connector lines: badge-edge → sphere surface, all in 520×520 space ──────
// Sphere center = (260,260), visual radius ≈ 175px
// Collapsed badge size ≈ 62×28px. Padding "7px 10px".
// Badge edge positions:
//   left badges: right-edge = left + 62
//   right badges: left-edge = 520 - right_offset - 62
const CONNECTORS: { x1: number; y1: number; x2: number; y2: number }[] = [
  { x1: 70,  y1: 30,  x2: 149, y2: 125 }, // live      → NW sphere
  { x1: 450, y1: 60,  x2: 380, y2: 133 }, // perf      → NE sphere
  { x1: 450, y1: 436, x2: 388, y2: 379 }, // deploy    → SE sphere
  { x1: 70,  y1: 379, x2: 112, y2: 353 }, // typescript → SW sphere
  { x1: 68,  y1: 240, x2: 86,  y2: 242 }, // code       → W  sphere
];

// Dot position = sphere end of each line
const SPHERE_DOTS = CONNECTORS.map((c) => ({ cx: c.x2, cy: c.y2 }));

// Per-badge float params
const FLOAT = [
  { dy: [-6, 0, -6], dur: 4.2, delay: 0   },
  { dy: [-8, 0, -8], dur: 3.6, delay: 0.6 },
  { dy: [-5, 0, -5], dur: 5.0, delay: 1.1 },
  { dy: [-7, 0, -7], dur: 4.6, delay: 0.4 },
  { dy: [-6, 0, -6], dur: 3.9, delay: 1.4 },
];

function ThoughtDots({ accent }: { accent?: boolean }) {
  return (
    <span className="flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: accent ? "rgba(255,255,255,0.9)" : "rgba(200,162,232,0.75)",
          }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function ThoughtBadge({
  children,
  delay,
  style,
  accent = false,
  icon,
  floatIndex,
}: {
  children: React.ReactNode;
  delay: number;
  style: React.CSSProperties;
  accent?: boolean;
  icon?: React.ReactNode;
  floatIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const f = FLOAT[floatIndex];

  const bgStyle = accent
    ? {
        background: "linear-gradient(135deg, rgba(42,19,99,0.92), rgba(126,76,196,0.88))",
        border: "0.5px solid rgba(255,255,255,0.2)",
        color: "#EDE8FF",
        boxShadow: "0 4px 20px rgba(42,19,99,0.45)",
      }
    : {
        background: "rgba(10,10,18,0.8)",
        border: "0.5px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.85)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, y: f.dy }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y: { duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay, repeatType: "loop" },
      }}
      className="absolute z-20 select-none cursor-default"
      style={style}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <motion.div
        layout
        className="flex items-center gap-2 backdrop-blur-md rounded-xl overflow-hidden"
        style={{ ...bgStyle, padding: "7px 10px" }}
        transition={{ layout: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.span
              key="dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <ThoughtDots accent={accent} />
            </motion.span>
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[11px] font-semibold whitespace-nowrap"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function PulsingDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
  );
}

export default function HeroVisual() {
  return (
    // Fixed 520×520 coordinate space — same as the canvas SIZE
    <div className="relative w-[520px] h-[520px] select-none" aria-hidden="true">

      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.07, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(42,19,99,0.2) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />

      {/* 3D sphere — fills the container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute inset-0 z-10"
      >
        <Scene3D />
      </motion.div>

      {/* Orbit rings */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <div style={{ position: "absolute", inset: "10%", borderRadius: "50%", border: "0.5px solid rgba(42,19,99,0.12)", animation: "spinRingX 22s linear infinite" }} />
        <div style={{ position: "absolute", inset: "5%",  borderRadius: "50%", border: "0.5px solid rgba(200,162,232,0.07)", animation: "spinRingY 28s linear infinite reverse" }} />
      </div>

      {/* SVG connector lines + sphere dots */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        style={{ zIndex: 15 }}
      >
        {CONNECTORS.map((c, i) => (
          <g key={i}>
            <motion.line
              x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
              stroke="rgba(200,162,232,0.25)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + i * 0.2 }}
            />
            {/* Glowing dot at sphere surface */}
            <motion.circle
              cx={SPHERE_DOTS[i].cx}
              cy={SPHERE_DOTS[i].cy}
              r="3"
              fill="rgba(200,162,232,0.7)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                scale:   { duration: 2, repeat: Infinity, delay: 2 + i * 0.3 },
                opacity: { duration: 2, repeat: Infinity, delay: 2 + i * 0.3 },
                default: { delay: 1.6 + i * 0.2, duration: 0.4 },
              }}
            />
            {/* Outer glow ring on dot */}
            <motion.circle
              cx={SPHERE_DOTS[i].cx}
              cy={SPHERE_DOTS[i].cy}
              r="6"
              fill="none"
              stroke="rgba(200,162,232,0.2)"
              strokeWidth="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 2 + i * 0.3 }}
            />
          </g>
        ))}
      </svg>

      {/* ── Thought badges (positioned in 520×520 space) ── */}

      {/* Live — top-left */}
      <ThoughtBadge
        delay={1.5}
        floatIndex={0}
        accent
        icon={<PulsingDot />}
        style={{ top: 16, left: 8 }}
      >
        Site live em produção
      </ThoughtBadge>

      {/* Performance — top-right */}
      <ThoughtBadge
        delay={1.8}
        floatIndex={1}
        icon={<span style={{ color: "#22c55e", fontSize: 12 }}>⚡</span>}
        style={{ top: 46, right: 8 }}
      >
        100 no Lighthouse
      </ThoughtBadge>

      {/* Deploy — bottom-right */}
      <ThoughtBadge
        delay={2.1}
        floatIndex={2}
        icon={<span style={{ fontSize: 11 }}>🚀</span>}
        style={{ bottom: 70, right: 8 }}
      >
        Deploy automático
      </ThoughtBadge>

      {/* TypeScript — bottom-left */}
      <ThoughtBadge
        delay={2.4}
        floatIndex={3}
        icon={<span style={{ color: "#60a5fa", fontSize: 10, fontWeight: 700 }}>TS</span>}
        style={{ bottom: 127, left: 8 }}
      >
        TypeScript & Next.js
      </ThoughtBadge>

      {/* Code — left */}
      <ThoughtBadge
        delay={2.7}
        floatIndex={4}
        icon={<span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(200,162,232,0.9)" }}>{"</>"}</span>}
        style={{ top: 226, left: 4 }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 10 }}>código limpo</span>
      </ThoughtBadge>
    </div>
  );
}
