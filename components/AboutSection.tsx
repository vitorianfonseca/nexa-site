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


function MemberCard({
  member,
  index,
  inView,
}: {
  member: { name: string; role: string; initials: string; image?: string };
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
        <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,26,0.75)" }}>{member.role}</p>
      </div>
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
              style={{ color: "rgba(26,26,26,0.8)" }}
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
              style={{ color: "rgba(26,26,26,0.8)" }}
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
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.75)" }}>
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
