"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const inputClass =
  "w-full bg-transparent border-b py-3 text-sm text-foreground placeholder:text-muted/35 focus:outline-none transition-colors duration-200 tracking-[-0.01em]";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [focused, setFocused] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const borderColor = (field: string) =>
    focused === field
      ? "border-accent"
      : "border-[rgba(26,26,26,0.12)]";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
      aria-label="Contact us"
    >
      {/* Background glow */}
      <div
        className="absolute left-0 bottom-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(42,19,99,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-semibold tracking-[0.15em] uppercase text-accent/70 mb-3"
            >
              Get in touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-bold text-foreground tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.8rem)" }}
            >
              {t.contact.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-1 md:items-end"
          >
            <motion.a
              href={`mailto:${t.contact.email}`}
              className="text-sm text-muted hover:text-accent transition-colors duration-200 tracking-[-0.01em]"
              whileHover={{ x: 2 }}
            >
              {t.contact.email}
            </motion.a>
            <span className="text-xs text-muted/40 tracking-[-0.01em]">
              {t.contact.location}
            </span>
          </motion.div>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="rounded-2xl p-8 lg:p-10"
          style={{
            background: "#F5F5F2",
            border: "0.5px solid rgba(26,26,26,0.07)",
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="py-12 flex flex-col items-center text-center gap-5"
              >
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(42,19,99,0.12), rgba(200,162,232,0.08))",
                    border: "0.5px solid rgba(42,19,99,0.2)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <motion.path
                      d="M4.5 11L9 15.5L17.5 7"
                      stroke="#2A1363"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground tracking-[-0.02em] text-lg">
                    Message sent.
                  </p>
                  <p className="text-sm text-muted mt-1.5 tracking-[-0.01em]">
                    We&apos;ll be in touch soon.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-x-8 gap-y-7"
                noValidate
              >
                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="text-[10px] font-semibold text-muted/45 tracking-[0.15em] uppercase block mb-1"
                  >
                    {t.contact.fields.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={`${inputClass} ${borderColor("name")}`}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  />
                  {focused === "name" && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(to right, #2A1363, #C8A2E8)" }}
                    />
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-semibold text-muted/45 tracking-[0.15em] uppercase block mb-1"
                  >
                    {t.contact.fields.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`${inputClass} ${borderColor("email")}`}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  />
                  {focused === "email" && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(to right, #2A1363, #C8A2E8)" }}
                    />
                  )}
                </div>

                {/* Company */}
                <div className="relative">
                  <label
                    htmlFor="company"
                    className="text-[10px] font-semibold text-muted/45 tracking-[0.15em] uppercase block mb-1"
                  >
                    {t.contact.fields.company}
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    className={`${inputClass} ${borderColor("company")}`}
                    onFocus={() => setFocused("company")}
                    onBlur={() => setFocused(null)}
                    value={form.company}
                    onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                  />
                  {focused === "company" && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(to right, #2A1363, #C8A2E8)" }}
                    />
                  )}
                </div>

                {/* Project type */}
                <div className="relative">
                  <label
                    htmlFor="projectType"
                    className="text-[10px] font-semibold text-muted/45 tracking-[0.15em] uppercase block mb-1"
                  >
                    {t.contact.fields.projectType}
                  </label>
                  <select
                    id="projectType"
                    required
                    className={`${inputClass} ${borderColor("projectType")} appearance-none cursor-pointer`}
                    onFocus={() => setFocused("projectType")}
                    onBlur={() => setFocused(null)}
                    value={form.projectType}
                    onChange={(e) => setForm((s) => ({ ...s, projectType: e.target.value }))}
                  >
                    <option value="" disabled>—</option>
                    {t.contact.projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {focused === "projectType" && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(to right, #2A1363, #C8A2E8)" }}
                    />
                  )}
                </div>

                {/* Message */}
                <div className="md:col-span-2 relative">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-semibold text-muted/45 tracking-[0.15em] uppercase block mb-1"
                  >
                    {t.contact.fields.message}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    className={`${inputClass} ${borderColor("message")} resize-none`}
                    placeholder={t.contact.fields.messagePlaceholder}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  />
                  {focused === "message" && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(to right, #2A1363, #C8A2E8)" }}
                    />
                  )}
                </div>

                {/* Submit */}
                <div className="md:col-span-2 pt-2">
                  <motion.button
                    type="submit"
                    className="relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold rounded-full text-white overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #2A1363, #C8A2E8)",
                      boxShadow: "0 4px 20px rgba(42,19,99,0.3)",
                    }}
                    whileHover={{ scale: 1.02, boxShadow: "0 6px 28px rgba(42,19,99,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t.contact.submit}
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
