"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  dark?: boolean;
}

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
        style={{ height: "clamp(18px, 3.5vw, 40px)", width: "auto", flexShrink: 0, display: "block" }}
        className="group-hover:opacity-80 transition-opacity duration-200"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/name_light.svg" : "/name_dark.svg"}
        alt="Nexa"
        style={{ height: "clamp(12px, 2.5vw, 30px)", width: "auto", flexShrink: 0, display: "block", marginTop: -3 }}
        className="group-hover:opacity-80 transition-opacity duration-200"
      />
    </Link>
  );
}
