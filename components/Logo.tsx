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
      className={`inline-flex items-center group focus-visible:outline-none ${className}`}
      aria-label="Nexa — Go to homepage"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/white.svg" : "/dark.svg"}
        alt="Nexa"
        style={{ height: 40, width: "auto" }}
        className="group-hover:opacity-70 transition-opacity duration-200"
      />
    </Link>
  );
}
