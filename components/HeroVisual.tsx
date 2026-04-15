"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function HeroVisual() {
  return (
    <div className="relative w-[480px] h-[480px] select-none" aria-hidden="true">
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

      {/* 3D sphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute inset-0 z-10"
      >
        <Scene3D />
      </motion.div>
    </div>
  );
}
