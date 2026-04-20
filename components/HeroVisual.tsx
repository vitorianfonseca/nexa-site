"use client";

import { motion } from "framer-motion";

const S = 72; // cube size px
const R = 96; // ring radius px

const faceColors = [
  { // front
    bg: "linear-gradient(135deg, #4A1A9A 0%, #7C3AED 50%, #A78BFA 100%)",
    border: "rgba(196,181,253,0.25)",
  },
  { // back
    bg: "linear-gradient(135deg, #1E0A4A 0%, #3B1280 100%)",
    border: "rgba(139,92,246,0.15)",
  },
  { // right
    bg: "linear-gradient(135deg, #6D28D9 0%, #C084FC 60%, #E879F9 100%)",
    border: "rgba(232,121,249,0.2)",
  },
  { // left
    bg: "linear-gradient(135deg, #2E1065 0%, #5B21B6 100%)",
    border: "rgba(139,92,246,0.15)",
  },
  { // top
    bg: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)",
    border: "rgba(196,181,253,0.3)",
  },
  { // bottom
    bg: "linear-gradient(135deg, #1A0740 0%, #4C1D95 100%)",
    border: "rgba(109,40,217,0.2)",
  },
];

function CubeFace({ transform, colorIdx }: { transform: string; colorIdx: number }) {
  const c = faceColors[colorIdx];
  return (
    <div
      style={{
        position: "absolute",
        width: S,
        height: S,
        transform,
        background: c.bg,
        border: `0.5px solid ${c.border}`,
        boxShadow: `inset 0 0 12px rgba(0,0,0,0.4)`,
        backfaceVisibility: "hidden",
      }}
    />
  );
}

function Cube({ x, y, z, ry, delay }: { x: number; y: number; z: number; ry: number; delay: number }) {
  const half = S / 2;
  return (
    <div
      style={{
        position: "absolute",
        width: S,
        height: S,
        left: "50%",
        top: "50%",
        marginLeft: x - half,
        marginTop: y - half,
        transformStyle: "preserve-3d",
        transform: `translateZ(${z}px) rotateY(${ry}deg) rotateX(22deg)`,
        animation: `cubeSpin 18s ${delay}s linear infinite`,
      }}
    >
      <CubeFace transform={`rotateY(0deg)   translateZ(${half}px)`} colorIdx={0} />
      <CubeFace transform={`rotateY(180deg) translateZ(${half}px)`} colorIdx={1} />
      <CubeFace transform={`rotateY(90deg)  translateZ(${half}px)`} colorIdx={2} />
      <CubeFace transform={`rotateY(-90deg) translateZ(${half}px)`} colorIdx={3} />
      <CubeFace transform={`rotateX(90deg)  translateZ(${half}px)`} colorIdx={4} />
      <CubeFace transform={`rotateX(-90deg) translateZ(${half}px)`} colorIdx={5} />
    </div>
  );
}

const cubes = [
  { x: 0,    y: -R,         z: 0,  ry: 0,   delay: 0 },
  { x: R*0.866,  y: -R*0.5, z: 0,  ry: 60,  delay: -3 },
  { x: R*0.866,  y: R*0.5,  z: 0,  ry: 120, delay: -6 },
  { x: 0,    y: R,          z: 0,  ry: 180, delay: -9 },
  { x: -R*0.866, y: R*0.5,  z: 0,  ry: 240, delay: -12 },
  { x: -R*0.866, y: -R*0.5, z: 0,  ry: 300, delay: -15 },
];

export default function HeroVisual() {
  const size = 460;
  return (
    <motion.div
      className="relative select-none pointer-events-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      aria-hidden="true"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          perspective: 800,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            position: "relative",
            animation: "ringRotate 24s linear infinite",
          }}
        >
          {cubes.map((c, i) => (
            <Cube key={i} {...c} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
