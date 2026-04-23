"use client";

import { useEffect, useRef } from "react";

const SPLINE_SRC = "https://my.spline.design/abstractnirvana-KYhkRlGqxUrOI1xAsyknGLDl/";

export default function SplineBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ensure visible on mount
    el.style.opacity = "1";

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
        } else {
          el.style.opacity = "0";
        }
      },
      { threshold: 0 }
    );

    const setup = () => {
      const hero = document.getElementById("hero");
      if (!hero) return false;
      obs.observe(hero);
      return true;
    };

    if (!setup()) {
      const timer = setTimeout(setup, 200);
      return () => { clearTimeout(timer); obs.disconnect(); };
    }

    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        transition: "opacity 0.4s",
        background: "#070410",
      }}
      aria-hidden="true"
    >
      <iframe
        src={SPLINE_SRC}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="background"
      />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 44, background: "#070410" }} />
    </div>
  );
}
