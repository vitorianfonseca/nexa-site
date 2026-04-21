"use client";

import { useEffect, useRef, useState } from "react";
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
  const lastMoveAt = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      hasMoved.current = true;
      lastMoveAt.current = Date.now();
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const checkHover = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovered(
        !!el.closest(
          "a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]"
        )
      );
    };

    // Hide only when mouse enters an iframe (mousemove stops completely)
    const iframeCheck = setInterval(() => {
      if (hasMoved.current && Date.now() - lastMoveAt.current > 1500) setHidden(true);
    }, 500);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      clearInterval(iframeCheck);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", checkHover);
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
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#C8A2E8",
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
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: `1px solid rgba(200, 162, 232, ${hovered ? 0.75 : 0.45})`,
            backgroundColor: hovered ? "rgba(200, 162, 232, 0.07)" : "transparent",
            transition: "border-color 0.15s ease, background-color 0.15s ease",
          }}
        />
      </motion.div>
    </>
  );
}
