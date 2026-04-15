"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 120, damping: 18 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 120, damping: 18 });
  const ringXMv = useRef(ringX);
  const ringYMv = useRef(ringY);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const rx = ringXMv.current;
    const ry = ringYMv.current;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rx.set(e.clientX);
      ry.set(e.clientY);
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as Element;
      const interactive =
        el.closest("a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]");
      setHovered(!!interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Dot — tracks exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.5 : hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
      </motion.div>

      {/* Ring — spring follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid #ffffff",
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.85 : hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
