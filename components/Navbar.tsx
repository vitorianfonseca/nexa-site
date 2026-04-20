"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const darkIds = new Set(["hero", "work", "cta"]);
    const allIds = ["hero", "work", "cta", "services", "team", "contact"];

    const check = () => {
      const checkY = 65; // just below navbar
      let current = "hero";
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom > checkY) {
          current = id;
          break;
        }
      }
      setIsDark(darkIds.has(current));
    };

    window.addEventListener("lenis-scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("lenis-scroll", check);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["work", "services", "team", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { label: t.navbar.services, href: "#services", id: "services" },
    { label: t.navbar.work, href: "#work", id: "work" },
    { label: t.navbar.about, href: "#team", id: "team" },
    { label: t.navbar.contact, href: "#contact", id: "contact" },
  ];


  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: isDark
          ? "rgba(7,4,16,0.97)"
          : "rgba(250,250,248,0.97)",
        borderBottom: isDark
          ? "0.5px solid rgba(255,255,255,0.07)"
          : "0.5px solid rgba(42,19,99,0.08)",
        boxShadow: isDark
          ? "0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)"
          : "0 1px 0 rgba(255,255,255,0.9), 0 4px 24px rgba(42,19,99,0.05)",
        transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      <nav
        className="max-w-[1536px] mx-auto px-10 lg:px-24 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo — inverted on dark hero */}
        <Logo dark={isDark} />

        {/* Desktop nav links — centered */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm tracking-[-0.01em] relative px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  color: activeSection === link.id
                    ? isDark ? "#EDE8FF" : "#1A1A1A"
                    : isDark ? "rgba(237,232,255,0.45)" : "#6B6B6B",
                  background: activeSection === link.id
                    ? isDark ? "rgba(255,255,255,0.08)" : "rgba(42,19,99,0.06)"
                    : "transparent",
                }}
                onMouseEnter={e => {
                  if (activeSection !== link.id)
                    (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(42,19,99,0.04)";
                }}
                onMouseLeave={e => {
                  if (activeSection !== link.id)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: language toggle + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={toggle}
            className="text-sm font-medium transition-colors duration-300 tracking-wide"
            style={{ color: isDark ? "rgba(237,232,255,0.45)" : "#6B6B6B" }}
            aria-label={`Switch to ${lang === "en" ? "Portuguese" : "English"}`}
          >
            <span style={{ color: lang === "pt" ? (isDark ? "#EDE8FF" : "#1A1A1A") : undefined }}>PT</span>
            <span className="mx-1 opacity-30">/</span>
            <span style={{ color: lang === "en" ? (isDark ? "#EDE8FF" : "#1A1A1A") : undefined }}>EN</span>
          </button>

          <Link
            href="#contact"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 tracking-[-0.01em] hover:opacity-85"
            style={{
              color: isDark ? "#070410" : "#EDE8FF",
              background: isDark ? "#EDE8FF" : "#2A1363",
            }}
          >
            {t.navbar.cta}
          </Link>
        </div>

        {/* Mobile: language + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggle}
            className="text-xs font-medium"
            style={{ color: isDark ? "rgba(237,232,255,0.45)" : "#6B6B6B" }}
            aria-label={`Switch to ${lang === "en" ? "Portuguese" : "English"}`}
          >
            <span style={{ color: lang === "pt" ? (isDark ? "#EDE8FF" : "#1A1A1A") : undefined }}>PT</span>
            <span className="mx-0.5 opacity-30">/</span>
            <span style={{ color: lang === "en" ? (isDark ? "#EDE8FF" : "#1A1A1A") : undefined }}>EN</span>
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col gap-[5px] w-6 h-5 justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[
              menuOpen ? "rotate-45 translate-y-[3px]" : "",
              menuOpen ? "opacity-0 scale-x-0" : "",
              menuOpen ? "-rotate-45 -translate-y-[9px]" : "",
            ].map((cls, i) => (
              <span
                key={i}
                className={`block h-px transition-all duration-300 origin-center ${cls}`}
                style={{ background: isDark ? "rgba(255,255,255,0.8)" : "#1A1A1A" }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden backdrop-blur-xl border-b px-6 pb-6 pt-2"
            style={{
              background: isDark ? "rgba(10,10,18,0.88)" : "rgba(250,250,248,0.95)",
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(26,26,26,0.07)",
            }}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base transition-colors"
                    style={{ color: isDark ? "rgba(237,232,255,0.6)" : "#6B6B6B" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full"
                  style={{ color: "#EDE8FF", background: "#2A1363" }}
                >
                  {t.navbar.cta}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
