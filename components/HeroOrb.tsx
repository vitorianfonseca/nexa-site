"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[380px] h-[380px] lg:w-[480px] lg:h-[480px]"
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-purple-500/20 via-purple-900/10 to-transparent blur-3xl" />

        {/* Main sphere */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #9333EA 0deg, #2A1363 90deg, #4F46E5 180deg, #2A1363 270deg, #9333EA 360deg)",
            opacity: 0.15,
            filter: "blur(1px)",
          }}
        />

        {/* Core sphere */}
        <div
          className="absolute inset-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(200,162,232,0.25) 0%, rgba(42,19,99,0.12) 40%, rgba(79,70,229,0.08) 70%, transparent 100%)",
            border: "0.5px solid rgba(200,162,232,0.3)",
          }}
        />

        {/* Floating ring 1 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: "0.5px solid rgba(42,19,99,0.25)",
              transform: "rotateX(60deg)",
            }}
          />
        </motion.div>

        {/* Floating ring 2 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: "0.5px solid rgba(200,162,232,0.2)",
              transform: "rotateY(55deg)",
            }}
          />
        </motion.div>

        {/* Floating dots */}
        {[
          { x: "20%", y: "15%", size: 5, delay: 0 },
          { x: "75%", y: "25%", size: 4, delay: 1 },
          { x: "85%", y: "65%", size: 6, delay: 2 },
          { x: "15%", y: "70%", size: 4, delay: 0.5 },
          { x: "50%", y: "88%", size: 5, delay: 1.5 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              opacity: 0.6,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Abstract geometric shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {/* Triangle-like shape */}
          <svg
            className="absolute"
            style={{ top: "8%", left: "60%", width: 40, height: 40 }}
            viewBox="0 0 40 40"
            fill="none"
          >
            <polygon
              points="20,4 36,34 4,34"
              stroke="rgba(200,162,232,0.3)"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>

          {/* Small square */}
          <svg
            className="absolute"
            style={{ bottom: "20%", left: "12%", width: 20, height: 20 }}
            viewBox="0 0 20 20"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="16"
              height="16"
              stroke="rgba(42,19,99,0.25)"
              strokeWidth="0.5"
              transform="rotate(15 10 10)"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Inner glow pulse */}
        <motion.div
          className="absolute inset-[35%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,19,99,0.4) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
