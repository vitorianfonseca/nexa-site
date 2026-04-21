"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MemberCard({
  member,
  index,
  inView,
}: {
  member: { name: string; role: string; initials: string; image?: string; linkedin: string };
  index: number;
  inView: boolean;
}) {
  const gradients = [
    { from: "#2A1363", to: "#7D2B6E" },
    { from: "#7D2B6E", to: "#C8A2E8" },
    { from: "#2A1363", to: "#C8A2E8" },
  ];
  const g = gradients[index % gradients.length];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.1}
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ border: "0.5px solid rgba(26,26,26,0.07)", background: "rgba(255,255,255,0.6)" }}
    >
      <div className="relative shrink-0">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})`, boxShadow: `0 4px 16px ${g.from}33` }}
        >
          {member.image ? (
            <Image src={member.image} alt={member.name} fill className="object-cover rounded-full" sizes="56px" />
          ) : (
            <span className="text-white text-sm font-bold tracking-tight">{member.initials}</span>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm tracking-[-0.01em]" style={{ color: "#111111" }}>{member.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,26,0.45)" }}>{member.role}</p>
      </div>
      <a
        href={member.linkedin}
        aria-label={`${member.name} on LinkedIn`}
        className="shrink-0 transition-colors duration-200 hover:text-accent"
        style={{ color: "rgba(26,26,26,0.2)" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </a>
    </motion.div>
  );
}

export default function AboutSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#FAFAF8" }}
      aria-label="About us"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(42,19,99,0.08), transparent)" }}
        aria-hidden="true"
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span style={{ fontSize: "clamp(7rem, 20vw, 20rem)", fontWeight: 900, letterSpacing: "-0.06em", color: "rgba(26,26,26,0.035)", lineHeight: 1, userSelect: "none" }}>
          Nexa
        </span>
      </div>

      {/* Thin purple accent line — left edge, full height */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ background: "linear-gradient(to bottom, #2A1363, rgba(200,162,232,0.3), transparent)", transformOrigin: "top" }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">

        {/* Section label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-14"
          style={{ color: "rgba(200,162,232,0.75)" }}
        >
          {lang === "en" ? "About us" : "Sobre nós"}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-0 lg:gap-0">

          {/* LEFT: Team */}
          <div className="lg:pr-16 lg:border-r pb-16 lg:pb-0" style={{ borderColor: "rgba(26,26,26,0.07)" }}>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              className="font-bold tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", color: "#111111" }}
            >
              {t.team.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: "rgba(26,26,26,0.5)" }}
            >
              {t.team.description}
            </motion.p>

            <div className="flex flex-col gap-2.5">
              {t.team.members.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index} inView={inView} />
              ))}
            </div>
          </div>

          {/* RIGHT: Process */}
          <div className="lg:pl-16 pt-16 lg:pt-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
              className="font-bold tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", color: "#111111" }}
            >
              {t.process.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.3}
              className="text-sm leading-relaxed mb-10 max-w-sm"
              style={{ color: "rgba(26,26,26,0.5)" }}
            >
              {lang === "en"
                ? "A clear, collaborative process from first conversation to final launch."
                : "Um processo claro e colaborativo, da primeira conversa ao lançamento final."}
            </motion.p>

            {/* Vertical steps */}
            <div className="relative">
              {/* Connector line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.4 }}
                className="absolute left-[19px] top-5 bottom-5 w-px origin-top"
                style={{ background: "linear-gradient(to bottom, #2A1363, rgba(200,162,232,0.25), transparent)" }}
                aria-hidden="true"
              />

              <div className="space-y-0">
                {t.process.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={0.35 + index * 0.1}
                    className="flex gap-6 pb-8 last:pb-0"
                  >
                    {/* Step dot */}
                    <div className="relative shrink-0 z-10" style={{ width: 40 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300, damping: 22 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(42,19,99,0.08), rgba(200,162,232,0.05))",
                          border: "1px solid rgba(42,19,99,0.2)",
                        }}
                      >
                        <span className="text-[10px] tracking-[0.12em] tabular-nums font-semibold" style={{ color: "rgba(42,19,99,0.5)" }}>
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2.5">
                      <h3
                        className="font-semibold tracking-[-0.02em] mb-1.5"
                        style={{ fontSize: "1rem", color: "#111111" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.48)" }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
