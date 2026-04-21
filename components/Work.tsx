"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Work() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = t.work.projects;

  return (
    <section
      id="work"
      ref={ref}
      className="relative"
      style={{ background: "#070410", paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}
      aria-label="Our work"
    >
      <div className="max-w-[1536px] mx-auto px-10 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(200,162,232,0.65)" }}>
              Selected work
            </p>
            <h2 className="font-bold tracking-[-0.03em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#EDE8FF" }}>
              {t.work.title}
            </h2>
          </div>
          <span className="text-sm font-mono tabular-nums pb-1 hidden sm:block" style={{ color: "rgba(255,255,255,0.18)" }}>
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </motion.div>

        {/* Project rows */}
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderTop: "0.5px solid rgba(200,162,232,0.1)" }}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-6 lg:gap-10 py-6 lg:py-7 -mx-4 px-4 rounded-xl transition-all duration-300"
              >
                {/* Hover row bg */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "rgba(42,19,99,0.07)" }}
                />

                {/* Number */}
                <span
                  className="hidden sm:block font-mono text-xs tracking-[0.2em] tabular-nums shrink-0 w-7 transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="font-bold tracking-[-0.03em] transition-colors duration-300 group-hover:text-white"
                      style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)", color: "rgba(237,232,255,0.65)" }}
                    >
                      {project.name}
                    </h3>
                    <span
                      className="text-sm transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      style={{ color: "#C8A2E8" }}
                    >
                      ↗
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(42,19,99,0.45)", color: "rgba(200,162,232,0.85)", border: "0.5px solid rgba(200,162,232,0.18)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Thumbnail */}
                <div
                  className="hidden md:block shrink-0 rounded-xl overflow-hidden relative z-10 transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(42,19,99,0.5)] group-hover:border-[rgba(200,162,232,0.25)]"
                  style={{
                    width: "clamp(180px, 18vw, 260px)",
                    aspectRatio: "16/10",
                    border: "0.5px solid rgba(200,162,232,0.08)",
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 1024px) 180px, 260px"
                      priority={i < 2}
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2A1363, #7D2B6E)" }} />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
          <div style={{ borderTop: "0.5px solid rgba(200,162,232,0.1)" }} />
        </div>

      </div>
    </section>
  );
}
