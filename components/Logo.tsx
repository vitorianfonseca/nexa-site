"use client";

import Link from "next/link";
import Image from "next/image";

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
      <Image
        src="/nexa.svg"
        alt="Nexa"
        width={90}
        height={41}
        className={`h-10 w-auto transition-opacity group-hover:opacity-70 ${dark ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}
