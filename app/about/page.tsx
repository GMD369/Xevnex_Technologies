"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./about.module.css";

// ── Data ─────────────────────────────────────────────────────────────────────
const values = [
  {
    kicker: "Execution",
    title: "Senior team, real delivery.",
    text: "We run lean, high-skill teams that move from strategy to shipping without unnecessary handoffs.",
    detail: "You work with builders and decision-makers directly, so progress stays fast and focused.",
  },
  {
    kicker: "Clarity",
    title: "Problem first, then product.",
    text: "Before we design screens or write code, we align on business goals, user outcomes, and technical constraints.",
    detail: "Clear scope and architecture decisions early prevent expensive rework later.",
  },
  {
    kicker: "Scale",
    title: "Built for growth.",
    text: "From UI systems to backend architecture, we design products to perform now and evolve with your business.",
    detail: "Our approach balances speed, maintainability, and long-term product quality.",
  },
];

const stats = [
  { value: "50+", label: "Digital and AI projects delivered" },
  { value: "5", label: "Core service verticals" },
  { value: "End-to-end", label: "From strategy to launch" },
  { value: "24h", label: "Typical response time" },
];

const timeline = [
  { year: "2020", event: "Xevnex launched", detail: "Founded with a mission to build practical digital products that create measurable business value." },
  { year: "2022", event: "Web and app delivery expansion", detail: "Scaled into full-cycle web and app development with integrated UI/UX execution." },
  { year: "2024", event: "Architecture-led engagements", detail: "Introduced architecture design as a core service for teams scaling complex platforms." },
  { year: "2026", event: "AI product acceleration", detail: "Expanded AI product and automation services for startups and enterprise innovation teams." },
];

const disciplines = [
  { label: "AI Product Development", desc: "Discovery, MVP planning, product design, and launch execution for AI solutions" },
  { label: "AI Services and Automation", desc: "Workflow automation, assistant systems, and model-powered operations" },
  { label: "Web Development", desc: "High-performance websites and web platforms with scalable architecture" },
  { label: "App Development", desc: "Cross-platform and mobile-first application design and implementation" },
  { label: "UI/UX Design", desc: "Research-driven interfaces, design systems, and conversion-focused user journeys" },
  { label: "Architecture Design", desc: "System architecture, service boundaries, and scalable technical foundations" },
];

// ── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── About visual — SVG network graph (preserved + refined) ───────────────────
function AboutVisual() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 15%, transparent 72%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 15%, transparent 72%)",
    }}>
      <svg viewBox="0 0 500 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--color-accent)" }}>
        <defs>
          <radialGradient id="aboutBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id="aboutGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse cx="250" cy="200" rx="220" ry="180" fill="url(#aboutBg)" />
        {[
          [250,200,140,110],[250,200,360,110],[250,200,130,290],
          [250,200,370,290],[250,200,250,80],[250,200,420,200],
          [250,200,80,200],[140,110,360,110],[130,290,370,290],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
        ))}
        {[[140,110],[360,110],[130,290],[370,290],[250,80],[420,200],[80,200]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="10" fill="currentColor" opacity="0.06" />
            <circle cx={cx} cy={cy} r="4" fill="currentColor" opacity="0.35" />
            <circle cx={cx} cy={cy} r="2" fill="currentColor" opacity="0.7" />
          </g>
        ))}
        <circle cx="250" cy="200" r="28" fill="currentColor" opacity="0.06" filter="url(#aboutGlow)" />
        <circle cx="250" cy="200" r="16" fill="currentColor" opacity="0.1" />
        <circle cx="250" cy="200" r="8" fill="currentColor" opacity="0.9" filter="url(#aboutGlow)" />
        <circle cx="250" cy="200" r="4" fill="#fff" opacity="0.95" />
        <text x="95" y="107" fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="0.12em" opacity="0.7">STRATEGY</text>
        <text x="370" y="107" fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="0.12em" opacity="0.7">DESIGN</text>
        <text x="64" y="307" fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="0.12em" opacity="0.6">ENGINEERING</text>
        <text x="262" y="72" fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="0.12em" opacity="0.55">GROWTH</text>
        {(["M60 60 L60 74 M60 60 L74 60","M440 60 L440 74 M440 60 L426 60","M60 350 L60 336 M60 350 L74 350","M440 350 L440 336 M440 350 L426 350"] as string[]).map((d,i) => (
          <path key={i} d={d} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}

// ── Animated stat counter ────────────────────────────────────────────────────
function StatCounter({ value }: { value: string }) {
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>;
}

// ── Principle card ───────────────────────────────────────────────────────────
function PrincipleCard({ value, index }: { value: typeof values[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        backgroundColor: hovered
          ? "color-mix(in srgb, var(--color-accent) 5%, var(--color-surface, #0c0a07))"
          : "var(--color-surface, #0c0a07)",
      }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative", padding: "2.25rem 2rem", display: "flex", flexDirection: "column", gap: "1rem", cursor: "default" }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "var(--color-accent)", transformOrigin: "top", borderRadius: 1 }}
      />

      {/* Index + kicker row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.18)" }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" }}
        >
          {value.kicker}
        </motion.span>
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.12)", opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 11, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "0.1em" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--foreground)", margin: 0 }}>
        {value.title}
      </h3>

      {/* Body */}
      <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--color-muted, #777)", margin: 0 }}>
        {value.text}
      </p>

      {/* Expanded detail */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--color-accent)", margin: 0, fontStyle: "italic", opacity: 0.8 }}>
                {value.detail}
              </p>
            </div>
          </motion.div>
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

// ── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({ item, index, total }: { item: typeof timeline[0]; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  const isLast = index === total - 1;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "grid", gridTemplateColumns: "5rem 1px 1fr", gap: "0 1.75rem", cursor: "default" }}
    >
      {/* Year */}
      <motion.span
        animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.25)" }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", paddingTop: "0.35rem", fontVariantNumeric: "tabular-nums", textAlign: "right" }}
      >
        {item.year}
      </motion.span>

      {/* Rail + node */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div
          animate={{
            borderColor: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.12)",
            backgroundColor: hovered ? "color-mix(in srgb, var(--color-accent) 15%, transparent)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
          style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", flexShrink: 0, zIndex: 1 }}
        />
        {!isLast && (
          <div style={{
            flex: 1, width: 1, marginTop: 4,
            background: hovered ? "linear-gradient(to bottom, var(--color-accent), rgba(255,255,255,0.05))" : "rgba(255,255,255,0.05)",
            transition: "background 0.4s ease", minHeight: "2.5rem",
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : "2.25rem", paddingTop: "0.1rem" }}>
        <motion.p
          animate={{ color: hovered ? "var(--foreground)" : "rgba(255,255,255,0.75)" }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 0.4rem" }}
        >
          {item.event}
        </motion.p>
        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--color-muted, #666)", margin: 0 }}>
          {item.detail}
        </p>
      </div>
    </motion.div>
  );
}

// ── Discipline row ───────────────────────────────────────────────────────────
function DisciplineRow({ item, index, isLast }: { item: typeof disciplines[0]; index: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <motion.div
        animate={{ backgroundColor: hovered ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface, #0c0a07))" : "transparent" }}
        transition={{ duration: 0.3 }}
        style={{
          display: "grid", gridTemplateColumns: "2rem 1.5rem 1fr 1fr",
          alignItems: "center", gap: "1.25rem",
          padding: "1.25rem 1.5rem",
        }}
      >
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.15)" }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", fontVariantNumeric: "tabular-nums" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.div
          animate={{ backgroundColor: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.12)" }}
          transition={{ duration: 0.3 }}
          style={{ width: 6, height: 6, borderRadius: "50%" }}
        />

        <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", fontWeight: 700, letterSpacing: "-0.015em", color: "var(--foreground)", margin: 0 }}>
          {item.label}
        </p>

        <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-muted, #666)", margin: 0 }}>
          {item.desc}
        </p>
      </motion.div>

      {!isLast && <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginLeft: "1.5rem" }} />}

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "var(--color-accent)", transformOrigin: "top", borderRadius: 1 }}
      />
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const disciplinesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const principlesInView = useInView(principlesRef, { once: true, margin: "-60px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });
  const disciplinesInView = useInView(disciplinesRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section style={{ paddingTop: "0.5rem", paddingBottom: 0, position: "relative" }}>

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ position: "relative", overflow: "hidden" }}>
        {/* Atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 55% 50% at 65% 50%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent)",
        }} />

        <motion.div
          className={`shell ${styles.headerGrid}`}
          variants={stagger}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            {/* Eyebrow */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <motion.div variants={lineReveal} style={{ width: 32, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                About Xevnex
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                fontWeight: 700, lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "var(--foreground)", margin: 0,
              }}
            >
              Building the next generation of{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                AI and digital products
              </em>
              .
            </motion.h1>

            {/* Body copy */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--color-muted, #777)", margin: 0 }}>
                Xevnex Technologies helps startups and teams design, build, and scale AI-powered digital products with confidence.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--color-muted, #777)", margin: 0 }}>
                Our core services include AI Product Development, AI Services, Web Development, App Development, UI/UX Design, and Architecture Design.
              </p>
            </motion.div>

            {/* CTA */}
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
                Start your project
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
                View case studies
              </Link>
            </motion.div>
          </div>

          {/* Right — visual */}
          <div className={styles.visualWrapper}>
            <AboutVisual />
          </div>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={heroInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)", transformOrigin: "left", margin: "0" }}
      />

      {/* ── Stats strip ── */}
      <div ref={statsRef} style={{ position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 60% 100% at 50% 50%, color-mix(in srgb, var(--color-accent) 3%, transparent), transparent)",
        }} />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className={`shell ${styles.statsGrid}`}
          style={{ padding: "4rem 1.5rem" }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--foreground)", margin: 0, lineHeight: 1 }}>
                <StatCounter value={s.value} />
              </p>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted, #555)", margin: 0, lineHeight: 1.5 }}>
                {s.label}
              </p>
              {/* Accent under each stat */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={statsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
                style={{ width: 24, height: 2, background: "var(--color-accent)", opacity: 0.5, transformOrigin: "left", marginTop: 6, borderRadius: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

      {/* ── Two-column: timeline + disciplines ── */}
      <div className="shell" style={{ padding: "6rem 1.5rem" }}>
        <div className={styles.twoCol}>

          {/* Left — timeline */}
          <div ref={timelineRef}>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
            >
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
                <motion.div variants={lineReveal} style={{ width: 28, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                  Our story
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700, lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  color: "var(--foreground)", margin: "0 0 3rem",
                }}
              >
                Evolving with technology,{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>grounded in delivery.</em>
              </motion.h2>

              {timeline.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} total={timeline.length} />
              ))}
            </motion.div>
          </div>

          {/* Right — disciplines */}
          <div ref={disciplinesRef}>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={disciplinesInView ? "visible" : "hidden"}
            >
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
                <motion.div variants={lineReveal} style={{ width: 28, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                  Disciplines
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700, lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  color: "var(--foreground)", margin: "0 0 3rem",
                }}
              >
                Services that work{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>together.</em>
              </motion.h2>

              <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                {disciplines.map((item, i) => (
                  <DisciplineRow key={item.label} item={item} index={i} isLast={i === disciplines.length - 1} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

      {/* ── Principles ── */}
      <div ref={principlesRef} className="shell" style={{ padding: "6rem 1.5rem" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={principlesInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
            <motion.div variants={lineReveal} style={{ width: 28, height: 1, background: "var(--color-accent)", transformOrigin: "left" }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              How we think
            </span>
          </motion.div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700, lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "var(--foreground)", margin: 0, maxWidth: "22ch",
              }}
            >
              Principles we build{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                every engagement on.
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--color-muted, #666)", maxWidth: "36ch", margin: 0 }}
            >
              These principles shape how we deliver AI, web, app, UX, and architecture outcomes.
            </motion.p>
          </div>

          <motion.div
            variants={lineReveal}
            style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)", transformOrigin: "left", marginBottom: "0" }}
          />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2, overflow: "hidden",
          }}>
            {values.map((value, i) => (
              <PrincipleCard key={value.kicker} value={value} index={i} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

      {/* ── CTA strip ── */}
      <div ref={ctaRef} style={{ position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 55% 100% at 50% 100%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent)",
        }} />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="shell"
          style={{ padding: "5rem 1.5rem 7rem" }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              position: "relative",
              border: "1px solid color-mix(in srgb, var(--color-accent) 20%, rgba(255,255,255,0.07))",
              borderRadius: 2, overflow: "hidden",
              background: "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
            }}
          >
            {/* Top accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={ctaInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 20%, transparent) 70%, transparent)",
                transformOrigin: "left",
              }}
            />

            {/* Glow */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", top: "-40%", right: "0%",
                width: 360, height: 360, borderRadius: "50%",
                background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 9%, transparent) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 2, padding: "4rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                {/* Left */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <div style={{ width: 28, height: 1, background: "var(--color-accent)" }} />
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                      Ready to collaborate?
                    </span>
                  </div>
                  <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 0.97, letterSpacing: "-0.04em", color: "var(--foreground)", margin: 0 }}>
                    Let&apos;s build your next{" "}
                    <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>AI product.</em>
                  </h2>
                  <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--color-muted, #777)", margin: 0, maxWidth: "38ch" }}>
                    Share your goals and constraints. We&apos;ll recommend a practical roadmap and delivery approach tailored to your team.
                  </p>
                </div>

                {/* Right */}
                <div style={{ paddingLeft: "3rem", borderLeft: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <span style={{ fontSize: "clamp(4rem, 7vw, 6rem)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1, color: "color-mix(in srgb, var(--color-accent) 10%, transparent)", fontVariantNumeric: "tabular-nums", userSelect: "none" }}>
                    01
                  </span>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)", margin: 0 }}>Next step</p>
                    <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--foreground)", margin: 0 }}>
                      Contact the team for a<br />project discussion
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--color-muted, #666)", margin: 0 }}>
                      We&apos;ll review your scope, align on priorities, and propose the best next steps.
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
                        border: "1px solid var(--color-accent)", borderRadius: 2,
                        padding: "1rem 2rem", textDecoration: "none", whiteSpace: "nowrap",
                        transition: "background 0.25s, color 0.25s",
                      }}
                    >
                      Contact Xevnex
                      <motion.span animate={{ x: ctaHovered ? 4 : 0 }} transition={{ duration: 0.25 }} style={{ display: "flex" }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    </Link>
                    <Link href="/services" style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--color-muted, #555)", textDecoration: "none", transition: "color 0.2s",
                    }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted, #555)")}
                    >
                      Explore our services
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: "3rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
                  Xevnex Technologies
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.12)" }}>
                  Typical response within 24 hours
                </span>
              </div>
            </div>

            {/* Bottom accent */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 22%, transparent) 50%, transparent)" }} />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}