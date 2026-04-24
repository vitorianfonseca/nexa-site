"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADER_MIN_DURATION_MS = 250;
const SPLINE_READY_MAX_DURATION_MS = 8000;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let closed = false;
    let minDurationReached = false;
    let pageLoaded = document.readyState === "complete";
    let splineReady = false;

    const globalWindow = window as Window & {
      __nexaPageLoaded?: boolean;
      __nexaSplineReady?: boolean;
    };

    if (globalWindow.__nexaPageLoaded === true) {
      pageLoaded = true;
    }

    if (globalWindow.__nexaSplineReady === true) {
      splineReady = true;
    }

    const closeLoader = () => {
      if (closed) return;
      closed = true;
      setVisible(false);
    };

    const tryClose = () => {
      if (minDurationReached && pageLoaded && splineReady) {
        closeLoader();
      }
    };

    const onPageLoaded = () => {
      pageLoaded = true;
      globalWindow.__nexaPageLoaded = true;
      window.dispatchEvent(new Event("nexa:page-loaded"));
      tryClose();
    };

    const onSplineReady = () => {
      splineReady = true;
      globalWindow.__nexaSplineReady = true;
      tryClose();
    };

    if (!pageLoaded) {
      window.addEventListener("load", onPageLoaded, { once: true });
    } else {
      onPageLoaded();
    }

    window.addEventListener("nexa:spline-ready", onSplineReady);

    const minTimer = window.setTimeout(() => {
      minDurationReached = true;
      tryClose();
    }, LOADER_MIN_DURATION_MS);

    const failSafeTimer = window.setTimeout(() => {
      closeLoader();
    }, SPLINE_READY_MAX_DURATION_MS);

    return () => {
      window.removeEventListener("load", onPageLoaded);
      window.removeEventListener("nexa:spline-ready", onSplineReady);
      window.clearTimeout(minTimer);
      window.clearTimeout(failSafeTimer);
    };
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
            gap: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/logo_light.svg"
            alt="byNexa"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 48, width: "auto" }}
          />

          {/* Sweep line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: 80, height: 1, background: "rgba(200,162,232,0.12)", borderRadius: 1, overflow: "hidden" }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 0.9,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.25,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.15,
              }}
              style={{ width: "100%", height: "100%", background: "rgba(200,162,232,0.65)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
