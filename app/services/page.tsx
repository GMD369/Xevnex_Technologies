"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import styles from "./services.module.css";

// ── Variants ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Orbital SVG (preserved + refined) ───────────────────────────────────────
function OrbitalVisual() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        maskImage: "radial-gradient(ellipse 78% 78% at 50% 50%, black 15%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(ellipse 78% 78% at 50% 50%, black 15%, transparent 72%)",
      }}
    >
      <svg viewBox="0 0 500 500" fill="none" style={{ width: "100%", height: "100%", color: "var(--color-accent)" }}>
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="65%" stopColor="currentColor" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softglow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="250" cy="250" r="210" fill="url(#bg)" />
        {[45, 90, 135, 175, 210].map((r) => (
          <circle key={r} cx="250" cy="250" r={r} stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        ))}
        <line x1="40" y1="250" x2="460" y2="250" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        <line x1="250" y1="40" x2="250" y2="460" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        {(["M74 74 L74 90 M74 74 L90 74","M426 74 L426 90 M426 74 L410 74","M74 426 L74 410 M74 426 L90 426","M426 426 L426 410 M426 426 L410 426"] as string[]).map((d, i) => (
          <path key={i} d={d} stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        {/* Ring 1 */}
        <circle cx="250" cy="250" r="80" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 10" />
        <circle cx="330" cy="250" r="6" fill="currentColor" filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="330" cy="250" r="3" fill="#fff" opacity="0.92">
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
        </circle>
        <text x="348" y="244" fill="currentColor" fontSize="9.5" fontWeight="700" letterSpacing="0.14em">STRATEGY</text>
        {/* Ring 2 */}
        <circle cx="250" cy="250" r="140" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="250" cy="110" r="5.5" fill="currentColor" opacity="0.85" filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="-360 250 250" dur="32s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="110" r="2.5" fill="#fff" opacity="0.88">
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="-360 250 250" dur="32s" repeatCount="indefinite" />
        </circle>
        <text x="262" y="104" fill="currentColor" fontSize="9.5" fontWeight="700" letterSpacing="0.14em" opacity="0.85">DESIGN</text>
        {/* Ring 3 */}
        <circle cx="250" cy="250" r="190" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 14" />
        <circle cx="86" cy="155" r="4.5" fill="currentColor" opacity="0.65" filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="48s" repeatCount="indefinite" />
        </circle>
        <text x="50" y="143" fill="currentColor" fontSize="9.5" fontWeight="700" letterSpacing="0.12em" opacity="0.7">ENGINEERING</text>
        {/* Centre */}
        <circle cx="250" cy="250" r="24" fill="currentColor" opacity="0.07" filter="url(#softglow)" />
        <circle cx="250" cy="250" r="13" fill="currentColor" opacity="0.14" />
        <circle cx="250" cy="250" r="7" fill="currentColor" opacity="0.9" filter="url(#glow)" />
        <circle cx="250" cy="250" r="3.5" fill="#fff" opacity="0.96" />
      </svg>
    </div>
  );
}

// ── Service icon glyphs ──────────────────────────────────────────────────────
function ServiceIcon({ index, active }: { index: number; active: boolean }) {
  const icons = [
    <svg key="0" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 11L16 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    <svg key="1" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L16 9L9 12L6 9L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 9L1 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    <svg key="2" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 4L2 9L6 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4L16 9L12 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="2" x2="8" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    <svg key="3" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polyline points="1,13 6,8 10,12 17,4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="12,4 17,4 17,9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="4" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    </svg>,
    <svg key="5" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="10" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="7" y="6" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="13" y="2" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>,
  ];
  return (
    <motion.div
      animate={{ color: active ? "var(--color-accent)" : "rgba(255,255,255,0.22)" }}
      transition={{ duration: 0.3 }}
      style={{ lineHeight: 0, flexShrink: 0 }}
    >
      {icons[index % icons.length]}
    </motion.div>
  );
}

// ── Service row ──────────────────────────────────────────────────────────────
function ServiceRow({
  service,
  index,
}: {
  service: { slug: string; kicker: string; title: string; description: string; deliverables: readonly string[] };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        backgroundColor: hovered
          ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface, #0c0a07))"
          : "var(--color-surface, #0c0a07)",
        borderColor: hovered
          ? "color-mix(in srgb, var(--color-accent) 25%, rgba(255,255,255,0.07))"
          : "rgba(255,255,255,0.07)",
      }}
      transition={{ duration: 0.3 }}
      className={styles.serviceRow}
      style={{ position: "relative", cursor: "default" }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 2,
          background: "var(--color-accent)",
          transformOrigin: "top",
          borderRadius: 1,
        }}
      />

      {/* Index + icon column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem", paddingTop: "0.2rem" }}>
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.12)" }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <ServiceIcon index={index} active={hovered} />
      </div>

      {/* Title + description */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <motion.p
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", margin: 0 }}
        >
          {service.kicker}
        </motion.p>
        <h2
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          {service.title}
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--color-muted, #777)", margin: 0 }}>
          {service.description}
        </p>
      </div>

      {/* Deliverables */}
      <div className={styles.deliverables}>
        <motion.p
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.85rem" }}
        >
          Deliverables
        </motion.p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {service.deliverables.map((item: string) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "var(--color-muted, #777)", lineHeight: 1.65 }}>
              <motion.span
                animate={{ opacity: hovered ? 1 : 0.3, backgroundColor: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.3)" }}
                transition={{ duration: 0.3 }}
                style={{ flexShrink: 0, marginTop: 7, width: 4, height: 4, borderRadius: "50%", display: "inline-block" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, var(--color-accent), transparent 65%)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const listInView = useInView(listRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ paddingTop: "1.5rem", paddingBottom: "5rem", overflow: "hidden", position: "relative" }}>
        {/* Atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 60% 50% at 70% 50%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent)",
        }} />

        <div ref={heroRef} className={`shell ${styles.heroGrid}`}>
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <motion.div variants={lineReveal} style={{ width: 32, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                Services
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              One team.
              <br />
              Every{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>layer.</em>
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              style={{ fontSize: 15, lineHeight: 1.85, color: "var(--color-muted, #777)", maxWidth: "42ch", margin: 0 }}
            >
              Strategy, design, and engineering delivered as a single continuous motion — no handoffs, no silos, no lost context.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className={styles.statsGrid}>
              {[
                { value: "3", label: "Core disciplines" },
                { value: "1", label: "Unified team" },
                { value: "∞", label: "Combined focus" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <p style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--foreground)", margin: 0, lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted, #666)", margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--background)", background: "var(--color-accent)",
                  border: "1px solid var(--color-accent)", borderRadius: 2,
                  padding: "0.9rem 1.75rem", textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                Start a project
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/case-studies"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--color-accent)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 2, padding: "0.9rem 1.75rem", textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "color-mix(in srgb, var(--color-accent) 45%, transparent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)")}
              >
                See our work
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — orbital */}
          <div className={styles.orbitalWrapper}>
            <OrbitalVisual />
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={heroInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)", transformOrigin: "left" }}
      />

      {/* ── Services list ── */}
      <section style={{ paddingBlock: "5rem" }}>
        <div ref={listRef}>
          {/* List header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
            style={{ maxWidth: 1240, margin: "0 auto", padding: "0 1.5rem 3rem" }}
          >
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
              <motion.div variants={lineReveal} style={{ width: 32, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                What we offer
              </span>
            </motion.div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
              <motion.h2
                variants={fadeUp}
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                  margin: 0,
                  maxWidth: "20ch",
                }}
              >
                Every engagement,{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                  fully covered.
                </em>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--color-muted, #666)", maxWidth: "38ch", margin: 0 }}
              >
                Each service is designed to interlock — so you can start anywhere and scale without friction.
              </motion.p>
            </div>

            <motion.div variants={lineReveal} style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)", transformOrigin: "left" }} />
          </motion.div>

          {/* Rows */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
            className="shell"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {services.map((service, i) => (
              <motion.div key={service.slug} variants={fadeUp}>
                <ServiceRow service={service} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", maxWidth: 1240, margin: "0 auto" }} />

      {/* ── CTA ── */}
      <section style={{ paddingBlock: "6rem 7rem", position: "relative" }} ref={ctaRef}>
        {/* Atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 55% 45% at 50% 100%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent)",
        }} />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          style={{ maxWidth: 1240, margin: "0 auto", padding: "0 1.5rem" }}
        >
          {/* Panel */}
          <motion.div
            variants={fadeUp}
            style={{
              position: "relative",
              border: "1px solid color-mix(in srgb, var(--color-accent) 20%, rgba(255,255,255,0.07))",
              borderRadius: 2,
              overflow: "hidden",
              background: "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
            }}
          >
            {/* Top accent sweep */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={ctaInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: 2,
                background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 25%, transparent) 70%, transparent)",
                transformOrigin: "left",
              }}
            />

            {/* Glow orbs */}
            <motion.div
              animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", top: "-30%", right: "5%",
                width: 350, height: 350, borderRadius: "50%",
                background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            {/* Grid */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none" }} viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" fill="none">
              {Array.from({ length: 7 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 55} x2="1200" y2={i * 55} stroke="var(--color-accent)" strokeWidth="0.6" />)}
              {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="320" stroke="var(--color-accent)" strokeWidth="0.6" />)}
            </svg>

            <div style={{ position: "relative", zIndex: 2, padding: "4.5rem 4rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                {/* Left */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <div style={{ width: 32, height: 1, background: "var(--color-accent)" }} />
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                      Ready to start
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                    fontWeight: 700, lineHeight: 0.97,
                    letterSpacing: "-0.04em",
                    color: "var(--foreground)", margin: 0,
                  }}>
                    Let&apos;s build something{" "}
                    <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                      worth shipping.
                    </em>
                  </h2>
                  <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--color-muted, #777)", margin: 0, maxWidth: "40ch" }}>
                    Tell us where you are and where you want to go. We&apos;ll map the fastest honest path.
                  </p>
                </div>

                {/* Right */}
                <div style={{ paddingLeft: "3rem", borderLeft: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <span style={{
                    fontSize: "clamp(4rem, 7vw, 6rem)",
                    fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1,
                    color: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                    fontVariantNumeric: "tabular-nums", userSelect: "none",
                  }}>
                    01
                  </span>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)", margin: 0 }}>Next step</p>
                    <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--foreground)", margin: 0 }}>
                      Book a 30-minute<br />discovery call
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--color-muted, #666)", margin: 0 }}>
                      No commitment. We&apos;ll scope the challenge, outline a path, and tell you honestly if we&apos;re the right fit.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link
                      href="/contact"
                      onMouseEnter={() => setCtaHovered(true)}
                      onMouseLeave={() => setCtaHovered(false)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase",
                        color: ctaHovered ? "var(--color-accent)" : "var(--background)",
                        background: ctaHovered ? "transparent" : "var(--color-accent)",
                        border: "1px solid var(--color-accent)",
                        borderRadius: 2, padding: "1rem 2rem",
                        textDecoration: "none", whiteSpace: "nowrap",
                        transition: "background 0.25s, color 0.25s",
                      }}
                    >
                      Start a project
                      <motion.span
                        animate={{ x: ctaHovered ? 4 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ display: "flex" }}
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    </Link>

                    <Link href="/case-studies" style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--color-muted, #555)", textDecoration: "none", transition: "color 0.2s",
                    }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted, #555)")}
                    >
                      Or explore our work first
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div style={{
                marginTop: "3.5rem", paddingTop: "1.75rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
                  Xevnex · Product studio
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.12)" }}>
                  Typically respond within 24h
                </span>
              </div>
            </div>

            {/* Bottom accent */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 22%, transparent) 50%, transparent)",
            }} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}