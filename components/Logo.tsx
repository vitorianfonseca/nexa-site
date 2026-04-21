"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  dark?: boolean;
}

// name SVG viewBox is 0 0 237 135, text runs ~y41–y94 (53 units of 135)
// To show text at ~20px: total img height = 20 * (135/53) ≈ 51px
// Clip top whitespace: marginTop = -51 * (41/135) ≈ -15px
// Container height = 20px + small filter buffer = 24px

export default function Logo({ className = "", dark = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus-visible:outline-none shrink-0 ${className}`}
      aria-label="Nexa — Go to homepage"
    >
      {/* Symbol */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        aria-hidden="true"
        style={{ height: 40, width: "auto", flexShrink: 0, display: "block" }}
        className="group-hover:opacity-80 transition-opacity duration-200"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/name_light.svg" : "/name_dark.svg"}
        alt="Nexa"
        style={{ height: 22, width: "auto", flexShrink: 0, display: "block" }}
        className="group-hover:opacity-80 transition-opacity duration-200"
      />
    </Link>
  );
}
