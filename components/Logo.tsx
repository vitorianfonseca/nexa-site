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
      className={`inline-flex shrink-0 group focus-visible:outline-none ${className}`}
      aria-label="byNexa — Go to homepage"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/logo_light.svg" : "/logo_dark.svg"}
        alt="byNexa"
        style={{ height: "clamp(22px, 2.5vw, 34px)", width: "auto", display: "block" }}
        className="group-hover:opacity-80 transition-opacity duration-200"
      />
    </Link>
  );
}
