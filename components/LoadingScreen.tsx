"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [opacity, setOpacity] = useState(1);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Mostra por 900ms depois sai — não espera pelo Spline
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setGone(true), 700);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#070410",
        opacity,
        transition: "opacity 0.7s ease",
        pointerEvents: opacity === 0 ? "none" : "all",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span style={{ color: "#D4CCFF", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }}>
          Nexa
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#7B2FBE",
                animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
