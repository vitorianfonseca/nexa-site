"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MemberCard({
  member,
  index,
}: {
  member: { name: string; role: string; initials: string; image?: string };
  index: number;
}) {
  const gradients = [
    { from: "#2A1363", to: "#C8A2E8" },
    { from: "#6366F1", to: "#8B5CF6" },
    { from: "#8B5CF6", to: "#C8A2E8" },
  ];
  const g = gradients[index % gradients.length];
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(500px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.015)`;
  };

  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(500px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={tiltRef}
      style={{ transition: "transform 0.15s ease" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group flex items-center gap-5 rounded-2xl p-5 cursor-default"
    >
      <div className="relative shrink-0" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.8 }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${g.from}55, transparent 70%)`,
            filter: "blur(10px)",
            transform: "scale(1.3)",
          }}
        />
        <div
          className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
            boxShadow: `0 4px 20px ${g.from}44`,
          }}
        >
          {member.image ? (
            <Image src={member.image} alt={member.name} fill className="object-cover rounded-full" sizes="72px" />
          ) : (
            <span className="text-white text-base font-bold tracking-tight">{member.initials}</span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm tracking-[-0.01em]" style={{ color: "#111111" }}>
          {member.name}
        </p>
        <p className="text-xs mt-0.5 tracking-[-0.01em]" style={{ color: "rgba(26,26,26,0.5)" }}>
          {member.role}
        </p>
      </div>

    </div>
  );
}

export default function Team() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#FAFAF8" }}
      aria-label="Our team"
    >
      <div
        className="absolute right-0 top-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(42,19,99,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1536px] mx-auto px-10 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={-0.1}
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "rgba(200,162,232,0.75)" }}
            >
              {t.team.members.length} builders
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              className="font-bold tracking-[-0.03em] mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)", color: "#111111" }}
            >
              {t.team.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
              className="text-sm leading-relaxed max-w-lg"
              style={{ color: "rgba(26,26,26,0.5)" }}
            >
              {t.team.description}
            </motion.p>

            <div className="mt-10 relative h-24 hidden lg:block" aria-hidden="true">
              {[80, 56, 38].map((s, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                  transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    left: i * 24,
                    top: "50%",
                    marginTop: -(s / 2),
                    width: s,
                    height: s,
                    borderRadius: "50%",
                    border: `0.5px solid rgba(42,19,99,${0.18 - i * 0.04})`,
                  }}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col gap-3"
          >
            {t.team.members.map((member, index) => (
              <motion.div key={index} variants={fadeUp} custom={index * 0.1}>
                <MemberCard member={member} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
