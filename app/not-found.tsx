"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#070410" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(42,19,99,0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Large background number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "clamp(12rem, 35vw, 32rem)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            color: "rgba(200,162,232,0.04)",
            lineHeight: 1,
            userSelect: "none",
            fontFamily: "var(--font-cabinet)",
          }}
        >
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "rgba(200,162,232,0.6)" }}
          >
            Page not found
          </p>
          <h1
            className="font-bold tracking-[-0.03em]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#FFFFFF",
              fontFamily: "var(--font-cabinet)",
            }}
          >
            Nothing here.
          </h1>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#EDE8FF", color: "#070410" }}
          >
            ← Back to home
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Contact us
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
