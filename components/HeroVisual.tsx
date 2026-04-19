"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function HeroVisual() {
  return (
    <div className="relative w-[520px] h-[520px] select-none" aria-hidden="true">
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.07, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(42,19,99,0.25) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Spline scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute inset-0 z-10"
      >
        <Spline
          scene="https://prod.spline.design/KtZN8led9CRTvYQdfT5wNH6b/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </div>
  );
}
