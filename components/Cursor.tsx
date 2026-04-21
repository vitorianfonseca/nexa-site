"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : -100);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : -100);

  const ringX = useSpring(mouseX, { stiffness: 320, damping: 26, mass: 0.55 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 26, mass: 0.55 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
      const el = e.target as Element;
      setHovered(!!el.closest("a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]"));
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot — sits exactly on pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.4 : hovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#D4BCEF",
          }}
        />
      </motion.div>

      {/* Ring — spring follow, accent color (no blend mode) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.75 : hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.14 }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `1.5px solid rgba(200, 162, 232, ${hovered ? 0.9 : 0.7})`,
            backgroundColor: hovered ? "rgba(200, 162, 232, 0.1)" : "rgba(200, 162, 232, 0.04)",
            boxShadow: `0 0 12px rgba(200, 162, 232, ${hovered ? 0.3 : 0.15})`,
            transition: "border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
          }}
        />
      </motion.div>
    </>
  );
}
