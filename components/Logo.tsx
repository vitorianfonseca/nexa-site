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
        style={{ width: "auto", flexShrink: 0, display: "block" }}
        className="h-8 md:h-10 group-hover:opacity-80 transition-opacity duration-200"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/name_light.svg" : "/name_dark.svg"}
        alt="Nexa"
        style={{ width: "auto", flexShrink: 0, display: "block", marginTop: -4 }}
        className="h-[22px] md:h-[30px] group-hover:opacity-80 transition-opacity duration-200"
      />
    </Link>
  );
}
