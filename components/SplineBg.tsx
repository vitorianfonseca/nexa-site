"use client";

import { useEffect, useRef, useState } from "react";

export default function SplineBg() {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        const el = ref.current;
        const iframeEl = iframeRef.current;
        if (!el || !iframeEl) return;

        if (e.isIntersecting) {
          iframeEl.style.display = "block";
          el.style.opacity = "1";
        } else {
          el.style.opacity = "0";
          setTimeout(() => {
            if (iframeRef.current && ref.current?.style.opacity === "0") {
              iframeRef.current.style.display = "none";
            }
          }, 450);
        }
      },
      { threshold: 0 }
    );
    obs.observe(hero);
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
        ref={iframeRef}
        src="https://my.spline.design/abstractnirvana-KYhkRlGqxUrOI1xAsyknGLDl/"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease",
        }}
        sandbox="allow-scripts allow-same-origin"
        title="background"
      />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 44, background: "#070410" }} />
    </div>
  );
}
