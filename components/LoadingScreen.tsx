"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#070410",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {/* Symbol */}
          <motion.img
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 72, width: "auto" }}
          />

          {/* Wordmark — crop SVG whitespace (viewBox 237×135, text y≈41–93) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 28, overflow: "hidden", display: "flex", alignItems: "flex-start" }}
          >
            <img
              src="/name_light.svg"
              alt="Nexa"
              style={{ height: 72, width: "auto", display: "block", marginTop: -21 }}
            />
          </motion.div>

          {/* Sweep line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: 80, height: 1, background: "rgba(200,162,232,0.12)", borderRadius: 1, overflow: "hidden", marginTop: 8 }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
              style={{ width: "100%", height: "100%", background: "rgba(200,162,232,0.65)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
