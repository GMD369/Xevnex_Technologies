"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./contact.module.css";

// ── Data ─────────────────────────────────────────────────────────────────────
const meta = [
  {
    kicker: "Response time",
    text: "Within one business day.",
    detail: "We read every message personally — no auto-responders, no ticketing queue.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    kicker: "Format",
    text: "30-min video call or async brief.",
    detail: "We adapt to how you work best — synchronous or written, your call.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3.5" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M11 6.5L15 4.5V11.5L11 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    kicker: "No commitment",
    text: "Discovery is free. We scope before we charge.",
    detail: "If we're not the right fit, we'll tell you — and point you to someone who is.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    kicker: "Confidential",
    text: "Everything shared stays private.",
    detail: "We're happy to sign an NDA before the first call if your project requires it.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const budgetRanges = [
  "< $10k",
  "$10k – $30k",
  "$30k – $75k",
  "$75k – $150k",
  "$150k+",
  "Not sure yet",
];

const projectTypes = [
  "New product build",
  "Product redesign",
  "Design system",
  "AI integration",
  "Growth / optimisation",
  "Other",
];

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          {label}
        </span>
        {hint && (
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

// ── Text input ────────────────────────────────────────────────────────────────
function TextInput({
  name,
  type = "text",
  placeholder,
  required,
  focused,
  onFocus,
  onBlur,
}: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  focused: string | null;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const isActive = focused === name;
  return (
    <div style={{ position: "relative" }}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: "100%",
          background: isActive
            ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface, #0c0a07))"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${isActive ? "color-mix(in srgb, var(--color-accent) 60%, transparent)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 2,
          padding: "0.8rem 1rem",
          fontSize: 14,
          color: "var(--foreground)",
          outline: "none",
          transition: "border-color 0.25s, background 0.25s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
        }}
      />
      {/* Focus indicator line */}
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 1,
          background: "var(--color-accent)",
          transformOrigin: "left",
          borderRadius: "0 0 2px 2px",
        }}
      />
    </div>
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────────
function TextArea({
  name,
  placeholder,
  rows,
  required,
  focused,
  onFocus,
  onBlur,
}: {
  name: string;
  placeholder: string;
  rows: number;
  required?: boolean;
  focused: string | null;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const isActive = focused === name;
  return (
    <div style={{ position: "relative" }}>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: "100%",
          background: isActive
            ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface, #0c0a07))"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${isActive ? "color-mix(in srgb, var(--color-accent) 60%, transparent)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 2,
          padding: "0.8rem 1rem",
          fontSize: 14,
          color: "var(--foreground)",
          outline: "none",
          transition: "border-color 0.25s, background 0.25s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          resize: "vertical",
          lineHeight: 1.75,
        }}
      />
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 1,
          background: "var(--color-accent)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

// ── Pill selector ─────────────────────────────────────────────────────────────
function PillSelector({
  options,
  value,
  onChange,
  multi,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string) => void;
  multi?: boolean;
}) {
  const selected = Array.isArray(value) ? value : [value];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <motion.button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            animate={{
              borderColor: active
                ? "var(--color-accent)"
                : "rgba(255,255,255,0.08)",
              backgroundColor: active
                ? "color-mix(in srgb, var(--color-accent) 12%, transparent)"
                : "rgba(255,255,255,0.02)",
              color: active ? "var(--color-accent)" : "rgba(255,255,255,0.45)",
            }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "none",
            }}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Meta info card ────────────────────────────────────────────────────────────
function MetaCard({ item, index }: { item: typeof meta[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        backgroundColor: hovered
          ? "color-mix(in srgb, var(--color-accent) 5%, var(--color-surface, #0c0a07))"
          : "var(--color-surface, #0c0a07)",
      }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative", padding: "1.75rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", cursor: "default" }}
    >
      {/* Left accent */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "var(--color-accent)", transformOrigin: "top", borderRadius: 1 }}
      />

      {/* Icon + kicker row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <motion.div
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.25)" }}
          transition={{ duration: 0.3 }}
          style={{ lineHeight: 0, flexShrink: 0 }}
        >
          {item.icon}
        </motion.div>
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" }}
        >
          {item.kicker}
        </motion.span>
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.1)" }}
          transition={{ duration: 0.3 }}
          style={{ marginLeft: "auto", fontSize: 10, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "0.1em" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Main text */}
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--foreground)", margin: 0, fontWeight: 500 }}>
        {item.text}
      </p>

      {/* Expand detail */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 13, lineHeight: 1.75, color: "var(--color-muted, #666)", margin: 0, overflow: "hidden", fontStyle: "italic" }}
          >
            {item.detail}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Bottom sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, var(--color-accent), transparent 65%)", transformOrigin: "left" }}
      />
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  const [focused, setFocused] = useState<string | null>(null);
  const [budget, setBudget] = useState("");
  const [projectType, setProjectType] = useState<string[]>([]);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleTypeToggle = (val: string) => {
    setProjectType((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      timeline: (form.elements.namedItem("timeline") as HTMLInputElement).value,
      budget,
      project_type: projectType,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ paddingTop: "0.5rem", paddingBottom: 0, position: "relative" }}>

      {/* ── Hero header ── */}
      <div ref={heroRef} style={{ position: "relative" }}>
        {/* Atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 55% 60% at 50% 0%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent)",
        }} />

        <motion.div
          className="shell"
          variants={stagger}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          style={{ padding: "1.5rem 1.5rem 4rem" }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
            <motion.div variants={lineReveal} style={{ width: 32, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              Get in touch
            </span>
          </motion.div>

          {/* Title + subtext row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2.5rem", marginBottom: "3rem" }}>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                fontWeight: 700, lineHeight: 0.93,
                letterSpacing: "-0.045em",
                color: "var(--foreground)", margin: 0, maxWidth: "16ch",
              }}
            >
              Tell us what you&apos;re building and where things feel{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>stuck.</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{ fontSize: 15, lineHeight: 1.9, color: "var(--color-muted, #777)", maxWidth: "38ch", margin: 0, alignSelf: "flex-end" }}
            >
              Share a little context about your product, timeline, and goals.
              We&apos;ll follow up within one business day — no runaround.
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            variants={lineReveal}
            style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)", transformOrigin: "left" }}
          />
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div ref={bodyRef} className="shell" style={{ padding: "4rem 1.5rem 7rem" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={bodyInView ? "visible" : "hidden"}
          className={styles.bodyGrid}
        >

          {/* ── Left sidebar ── */}
          <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* What to expect */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 20, height: 1, background: "var(--color-accent)" }} />
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                  What to expect
                </span>
              </div>

              <motion.div
                variants={stagger}
                style={{
                  display: "flex", flexDirection: "column",
                  gap: "1.5px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 2, overflow: "hidden",
                }}
              >
                {meta.map((item, i) => (
                  <MetaCard key={item.kicker} item={item} index={i} />
                ))}
              </motion.div>
            </div>

            {/* Availability pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "color-mix(in srgb, var(--color-accent) 6%, transparent)",
              border: "1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)",
              borderRadius: 2, padding: "1rem 1.25rem",
            }}>
              <span style={{ position: "relative", display: "flex", width: 8, height: 8, flexShrink: 0 }}>
                <span style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "var(--color-accent)", opacity: 0.65,
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }} />
                <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent)" }} />
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                Available for new engagements
              </span>
            </div>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingTop: "0.5rem" }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: "0 0 0.5rem" }}>
                Direct contact
              </p>
              {[
                { label: "Email", value: "hello@xevnex.com" },
                { label: "Location", value: "Remote-first · Worldwide" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", flexShrink: 0, width: "4.5rem" }}>
                    {c.label}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--color-muted, #666)", letterSpacing: "0.01em" }}>
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div variants={fadeUp}>
            <div style={{
              position: "relative",
              border: "1px solid color-mix(in srgb, var(--color-accent) 18%, rgba(255,255,255,0.07))",
              borderRadius: 2, overflow: "hidden",
              background: "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
            }}>
              {/* Top accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={bodyInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 20%, transparent) 70%, transparent)",
                  transformOrigin: "left",
                }}
              />

              {/* Glow orb */}
              <div style={{
                position: "absolute", top: "-30%", right: "-10%",
                width: 300, height: 300, borderRadius: "50%",
                background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />

              <div style={{ position: "relative", zIndex: 1, padding: "2.75rem 2.5rem" }}>
                {/* Form header */}
                <div style={{ marginBottom: "2.25rem" }}>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)", margin: "0 0 0.75rem" }}>
                    Project inquiry
                  </p>
                  <h2 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--foreground)", margin: 0 }}>
                    Let&apos;s scope your project
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: "1.5rem", padding: "3rem 0", textAlign: "center",
                      }}
                    >
                      <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                      }}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <path d="M4 11L9 16L18 6" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--foreground)", margin: "0 0 0.5rem" }}>
                          Message sent
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--color-muted, #666)", margin: 0, maxWidth: "32ch" }}>
                          We&apos;ll review your brief and be in touch within one business day.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                    >
                      {/* Name + email */}
                      <div className={styles.nameEmailGrid}>
                        <Field label="Name" hint="Required">
                          <TextInput name="name" placeholder="Your name" required focused={focused} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                        </Field>
                        <Field label="Email" hint="Required">
                          <TextInput name="email" type="email" placeholder="you@company.com" required focused={focused} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                        </Field>
                      </div>

                      {/* Company */}
                      <Field label="Company" hint="Optional">
                        <TextInput name="company" placeholder="Where do you work?" focused={focused} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />
                      </Field>

                      {/* Project type */}
                      <Field label="Project type" hint="Select all that apply">
                        <PillSelector
                          options={projectTypes}
                          value={projectType}
                          onChange={handleTypeToggle}
                          multi
                        />
                      </Field>

                      {/* Budget */}
                      <Field label="Approximate budget">
                        <PillSelector
                          options={budgetRanges}
                          value={budget}
                          onChange={setBudget}
                        />
                      </Field>

                      {/* Brief */}
                      <Field label="Project brief" hint="Required">
                        <TextArea
                          name="message"
                          required
                          rows={5}
                          placeholder="What are you building? Where are you stuck? What does success look like in 6 months?"
                          focused={focused}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                        />
                      </Field>

                      {/* Timeline */}
                      <Field label="Timeline">
                        <TextInput name="timeline" placeholder="When do you need to launch?" focused={focused} onFocus={() => setFocused("timeline")} onBlur={() => setFocused(null)} />
                      </Field>

                      {/* Divider */}
                      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                      {/* Error message */}
                      {submitError && (
                        <p style={{
                          fontSize: 12, lineHeight: 1.65,
                          color: "#ff6b6b",
                          background: "rgba(255,107,107,0.08)",
                          border: "1px solid rgba(255,107,107,0.2)",
                          borderRadius: 2, padding: "0.65rem 1rem",
                          margin: 0,
                        }}>
                          {submitError}
                        </p>
                      )}

                      {/* Submit row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <button
                          type="submit"
                          disabled={loading}
                          onMouseEnter={() => !loading && setSubmitHovered(true)}
                          onMouseLeave={() => setSubmitHovered(false)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 10,
                            fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase",
                            color: loading ? "var(--color-accent)" : submitHovered ? "var(--color-accent)" : "var(--background)",
                            background: loading ? "transparent" : submitHovered ? "transparent" : "var(--color-accent)",
                            border: "1px solid var(--color-accent)",
                            borderRadius: 2, padding: "1rem 2rem",
                            cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
                            opacity: loading ? 0.7 : 1,
                            transition: "background 0.25s, color 0.25s, opacity 0.25s",
                          }}
                        >
                          {loading ? (
                            <>
                              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10" />
                              </svg>
                              Sending…
                            </>
                          ) : (
                            <>
                              Send inquiry
                              <motion.span
                                animate={{ x: submitHovered ? 4 : 0 }}
                                transition={{ duration: 0.25 }}
                                style={{ display: "flex" }}
                              >
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                  <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </motion.span>
                            </>
                          )}
                        </button>
                        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                          No commitment · 100% confidential
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom accent */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 20%, transparent) 50%, transparent)",
              }} />
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}