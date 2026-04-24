"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SRC = "https://my.spline.design/abstractnirvana-KYhkRlGqxUrOI1xAsyknGLDl/";

export default function SplineBg() {
  const ref = useRef<HTMLDivElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [canLoadSpline, setCanLoadSpline] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const globalWindow = window as Window & { __nexaPageLoaded?: boolean };
    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };
    const connection = nav.connection as
      | { saveData?: boolean; effectiveType?: string }
      | undefined;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const markPageLoaded = () => {
      if (prefersReducedMotion || connection?.saveData) return;

      const schedule = () => {
        setCanLoadSpline(true);
        globalWindow.__nexaPageLoaded = true;
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(schedule, { timeout: 1800 });
      } else {
        globalThis.setTimeout(schedule, 900);
      }
    };

    if (globalWindow.__nexaPageLoaded === true || document.readyState === "complete") {
      markPageLoaded();
    } else {
      window.addEventListener("nexa:page-loaded", markPageLoaded);
      window.addEventListener("load", markPageLoaded, { once: true });
    }

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
      return () => {
        window.removeEventListener("nexa:page-loaded", markPageLoaded);
        window.removeEventListener("load", markPageLoaded);
        clearTimeout(timer);
        obs.disconnect();
      };
    }

    return () => {
      window.removeEventListener("nexa:page-loaded", markPageLoaded);
      window.removeEventListener("load", markPageLoaded);
      obs.disconnect();
    };
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
      {canLoadSpline && (
        <iframe
          src={SPLINE_SRC}
          title="background"
          loading="lazy"
          onLoad={() => {
            setIsIframeLoaded(true);
            const globalWindow = window as Window & { __nexaSplineReady?: boolean };
            globalWindow.__nexaSplineReady = true;
            window.dispatchEvent(new Event("nexa:spline-ready"));
          }}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            opacity: 1,
          }}
        />
      )}

      <div
        className="spline-fallback"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: isIframeLoaded ? 0 : 1,
          transition: "opacity 0.4s ease",
          background:
            "radial-gradient(1400px 900px at 70% 35%, rgba(130, 70, 220, 0.28), transparent 60%), radial-gradient(900px 700px at 30% 75%, rgba(74, 31, 153, 0.2), transparent 60%), linear-gradient(135deg, #06030f 0%, #070410 45%, #0a0720 100%)",
        }}
      >
        <div
          className="spline-fallback-orb spline-fallback-orb-a"
          style={{
            position: "absolute",
            top: "16%",
            left: "52%",
            width: "26vw",
            height: "26vw",
            maxWidth: 360,
            maxHeight: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(203,155,255,0.24) 0%, rgba(203,155,255,0) 70%)",
            filter: "blur(16px)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="spline-fallback-orb spline-fallback-orb-b"
          style={{
            position: "absolute",
            bottom: "14%",
            right: "12%",
            width: "20vw",
            height: "20vw",
            maxWidth: 300,
            maxHeight: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(143,87,255,0.18) 0%, rgba(143,87,255,0) 70%)",
            filter: "blur(14px)",
          }}
        />
      </div>

      <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 44, background: "#070410" }} />

      <style jsx>{`
        .spline-fallback {
          animation: splineFallbackPulse 5s ease-in-out infinite;
        }

        .spline-fallback-orb {
          will-change: transform, opacity;
        }

        .spline-fallback-orb-a {
          animation: splineOrbA 8s ease-in-out infinite;
        }

        .spline-fallback-orb-b {
          animation: splineOrbB 10s ease-in-out infinite;
        }

        @keyframes splineFallbackPulse {
          0% { filter: saturate(0.95) brightness(0.96); }
          50% { filter: saturate(1.07) brightness(1.02); }
          100% { filter: saturate(0.95) brightness(0.96); }
        }

        @keyframes splineOrbA {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-52%, -48%) scale(1.08); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
        }

        @keyframes splineOrbB {
          0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50% { transform: translate(-3%, 2%) scale(1.06); opacity: 0.95; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
