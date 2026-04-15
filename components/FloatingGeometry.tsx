"use client";

import { motion } from "framer-motion";

// ── Wireframe ring (flat disc tilted in 3D space) ───────────
function Ring({
  size,
  style,
  animClass,
  opacity = 0.22,
  color = "rgba(42,19,99,1)",
}: {
  size: number;
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
  color?: string;
}) {
  return (
    <div
      className={animClass}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${color.replace("1)", `${opacity})`)}`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// ── Wireframe cube ──────────────────────────────────────────
function Cube({
  size,
  style,
  animClass,
  opacity = 0.18,
}: {
  size: number;
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
}) {
  const half = size / 2;
  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        perspective: size * 5,
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        className={animClass}
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              border: `0.5px solid rgba(42,19,99,${opacity})`,
              background: `rgba(42,19,99,${opacity * 0.08})`,
              transform: face.transform,
              left: 0,
              top: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Diamond (octahedron-like using rotated squares) ─────────
function Diamond({
  size,
  style,
  animClass,
  opacity = 0.2,
}: {
  size: number;
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        perspective: size * 4,
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        className={animClass}
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {[0, 60, 120].map((rot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              border: `0.5px solid rgba(200,162,232,${opacity})`,
              background: `rgba(200,162,232,${opacity * 0.05})`,
              transform: `rotateZ(${rot}deg) rotateX(${50 + i * 5}deg)`,
              left: 0,
              top: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Floating glow orb ───────────────────────────────────────
function GlowOrb({
  size,
  style,
  color = "rgba(42,19,99,0.12)",
  blur = 60,
}: {
  size: number;
  style?: React.CSSProperties;
  color?: string;
  blur?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        scale: [1, 1.06, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 7 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// ── Hero background geometry ────────────────────────────────
export function HeroGeometry() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Large ambient glow top-right */}
      <GlowOrb
        size={700}
        color="rgba(42,19,99,0.1)"
        blur={80}
        style={{ top: -200, right: -150 }}
      />
      <GlowOrb
        size={400}
        color="rgba(200,162,232,0.08)"
        blur={60}
        style={{ bottom: 50, left: -100 }}
      />

      {/* Tilted spinning rings */}
      <Ring
        size={220}
        animClass="animate-spin-ring"
        opacity={0.18}
        style={{ top: "8%", right: "12%", animationDuration: "14s" }}
      />
      <Ring
        size={120}
        animClass="animate-spin-ring-y"
        opacity={0.14}
        style={{ top: "55%", right: "5%", animationDuration: "20s" }}
      />
      <Ring
        size={80}
        animClass="animate-spin-ring"
        opacity={0.12}
        color="rgba(200,162,232,1)"
        style={{ bottom: "20%", right: "25%", animationDuration: "10s", animationDirection: "reverse" }}
      />

      {/* Wireframe cube */}
      <Cube
        size={70}
        animClass="animate-rotate-cube"
        opacity={0.15}
        style={{ top: "15%", left: "5%", animationDuration: "22s" }}
      />
      <Cube
        size={40}
        animClass="animate-rotate-cube-r"
        opacity={0.12}
        style={{ bottom: "28%", left: "8%", animationDuration: "16s" }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,26,26,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

// ── CTA / dark-section background geometry ──────────────────
export function DarkGeometry() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <GlowOrb
        size={600}
        color="rgba(42,19,99,0.2)"
        blur={100}
        style={{ top: -150, left: "15%" }}
      />
      <GlowOrb
        size={350}
        color="rgba(200,162,232,0.15)"
        blur={70}
        style={{ bottom: -80, right: "20%" }}
      />

      <Ring
        size={280}
        animClass="animate-spin-ring"
        opacity={0.1}
        color="rgba(255,255,255,1)"
        style={{ top: "-10%", right: "-5%", animationDuration: "18s" }}
      />
      <Ring
        size={160}
        animClass="animate-spin-ring-y"
        opacity={0.08}
        color="rgba(255,255,255,1)"
        style={{ bottom: "10%", left: "10%", animationDuration: "24s" }}
      />

      <Diamond
        size={90}
        animClass="animate-spin-diamond"
        opacity={0.12}
        style={{ top: "20%", right: "8%", animationDuration: "16s" }}
      />
      <Diamond
        size={55}
        animClass="animate-spin-diamond"
        opacity={0.1}
        style={{ bottom: "30%", left: "5%", animationDuration: "20s", animationDirection: "reverse" }}
      />

      <Cube
        size={80}
        animClass="animate-rotate-cube"
        opacity={0.08}
        style={{ bottom: "15%", right: "15%", animationDuration: "20s" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// ── Generic section floating shapes ─────────────────────────
export function SectionGeometry({ dark = false }: { dark?: boolean }) {
  const c = dark ? "rgba(255,255,255,1)" : "rgba(42,19,99,1)";
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Ring size={140} animClass="animate-spin-ring" opacity={0.1} color={c}
        style={{ top: "10%", right: "-3%", animationDuration: "18s" }} />
      <Cube size={50} animClass="animate-rotate-cube-r" opacity={0.1}
        style={{ bottom: "15%", left: "-2%", animationDuration: "25s" }} />
    </div>
  );
}
