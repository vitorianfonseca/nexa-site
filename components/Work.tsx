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
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(200,162,232,0.65)" }}>
              Selected work
            </p>
            <h2 className="font-bold tracking-[-0.03em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#EDE8FF" }}>
              {t.work.title}
            </h2>
          </div>
          <span className="text-sm font-mono tabular-nums pb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl overflow-hidden"
                style={{ border: "0.5px solid rgba(200,162,232,0.1)", background: "rgba(255,255,255,0.02)" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 2}
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2A1363, #7D2B6E)" }} />
                  )}
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(7,4,16,0.55)" }}
                  >
                    <span className="text-sm font-semibold px-5 py-2.5 rounded-full" style={{ background: "#EDE8FF", color: "#070410" }}>
                      {t.work.viewProject}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold tracking-[-0.02em] text-sm leading-snug" style={{ color: "#EDE8FF" }}>
                      {project.name}
                    </h3>
                    <span
                      className="text-base shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "#C8A2E8" }}
                    >
                      ↗
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(42,19,99,0.4)", color: "rgba(200,162,232,0.85)", border: "0.5px solid rgba(200,162,232,0.2)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
