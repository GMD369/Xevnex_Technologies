"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Animated background grid ────────────────────────────────────────────────
function GridLines() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.045,
      }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 400"
      fill="none"
    >
      {/* Horizontals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={i * 58} x2="1200" y2={i * 58}
          stroke="var(--color-accent)" strokeWidth="0.6"
        />
      ))}
      {/* Verticals */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 95} y1="0" x2={i * 95} y2="400"
          stroke="var(--color-accent)" strokeWidth="0.6"
        />
      ))}
      {/* Diagonal accent */}
      <line x1="0" y1="400" x2="600" y2="0" stroke="var(--color-accent)" strokeWidth="0.4" opacity="0.5" />
      <line x1="600" y1="400" x2="1200" y2="0" stroke="var(--color-accent)" strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

// ── Floating accent orbs ────────────────────────────────────────────────────
function AccentOrbs() {
  return (
    <>
      <motion.div
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-20%",
          right: "10%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "5%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

// ── Trust badges ────────────────────────────────────────────────────────────
const badges = [
  { icon: "*", label: "AI product focused" },
  { icon: "+", label: "Senior execution" },
  { icon: ">", label: "Clear delivery plan" },
];

// ── Section ─────────────────────────────────────────────────────────────────
export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      style={{ background: "transparent", position: "relative", padding: "5rem 0 7rem" }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .cta-inner {
            padding: 4rem 2rem 3.5rem !important;
          }

          .cta-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .cta-side {
            padding-left: 0 !important;
            border-left: none !important;
            padding-top: 2rem !important;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
          }
        }

        @media (max-width: 767px) {
          .cta-shell {
            padding: 0 1rem !important;
          }

          .cta-inner {
            padding: 3rem 1.25rem !important;
          }

          .cta-actions a:first-child {
            width: 100%;
            justify-content: center;
          }

          .cta-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
      <div className="cta-shell" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Outer wrapper ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid color-mix(in srgb, var(--color-accent) 22%, rgba(255,255,255,0.07))",
          }}
        >
          {/* Background layers */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--color-surface, #0c0a07)",
            }}
          />
          <AccentOrbs />
          <GridLines />

          {/* Top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, transparent) 70%, transparent)",
              transformOrigin: "left",
            }}
          />

          {/* Inner content */}
          <div
            className="cta-inner"
            style={{
              position: "relative",
              zIndex: 2,
              padding: "5rem 4rem 4.5rem",
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Eyebrow */}
              <motion.div
                variants={fadeUpVariants}
                style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.25rem" }}
              >
                <motion.div
                  variants={lineVariants}
                  style={{ width: 32, height: 1, background: "var(--color-accent)", transformOrigin: "left" }}
                />
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                  Start with Xevnex
                </span>
              </motion.div>

              {/* Main layout: headline + right column */}
              <div
                className="cta-layout"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "4rem",
                  alignItems: "center",
                }}
              >
                {/* Left: headline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <motion.h2
                    variants={fadeUpVariants}
                    style={{
                      fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                      fontWeight: 700,
                      lineHeight: 0.97,
                      letterSpacing: "-0.04em",
                      color: "var(--foreground)",
                      margin: 0,
                    }}
                  >
                    Build your next{" "}
                    <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                      AI-powered product
                    </em>{" "}
                    with confidence.
                  </motion.h2>

                  <motion.p
                    variants={fadeUpVariants}
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.85,
                      color: "var(--color-muted, #777)",
                      margin: 0,
                      maxWidth: "42ch",
                    }}
                  >
                    Whether you need AI services, web development, app development,
                    UI/UX design, or architecture design, we help you move from idea to launch with clarity.
                  </motion.p>

                  {/* Trust badges */}
                  <motion.div
                    variants={fadeUpVariants}
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
                  >
                    {badges.map((b) => (
                      <span
                        key={b.label}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--color-muted, #555)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 2,
                          padding: "5px 12px",
                        }}
                      >
                        <span style={{ fontSize: 12, opacity: 0.6 }}>{b.icon}</span>
                        {b.label}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Right: CTA block */}
                <motion.div
                  className="cta-side"
                  variants={fadeUpVariants}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "2rem",
                    paddingLeft: "3rem",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Large ghost number */}
                  <span
                    style={{
                      fontSize: "clamp(5rem, 8vw, 7rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.06em",
                      lineHeight: 1,
                      color: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                      fontVariantNumeric: "tabular-nums",
                      userSelect: "none",
                    }}
                  >
                    01
                  </span>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)", margin: 0 }}>
                      Next step
                    </p>
                    <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3, color: "var(--foreground)", margin: 0 }}>
                      Share your project goal<br />with our team
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--color-muted, #666)", margin: 0 }}>
                      We&apos;ll review your scope, suggest a practical approach, and provide a clear delivery path.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="cta-actions" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link
                      href="/contact"
                      onMouseEnter={() => setBtnHovered(true)}
                      onMouseLeave={() => setBtnHovered(false)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: btnHovered ? "var(--color-accent)" : "var(--background)",
                        background: btnHovered ? "transparent" : "var(--color-accent)",
                        border: "1px solid var(--color-accent)",
                        borderRadius: 2,
                        padding: "1rem 2rem",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        transition: "background 0.25s, color 0.25s",
                      }}
                    >
                      Contact Xevnex
                      <motion.span
                        animate={{ x: btnHovered ? 4 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ display: "flex" }}
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    </Link>

                    <Link
                      href="/case-studies"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--color-muted, #555)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted, #555)")
                      }
                    >
                      Or review our case studies
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* ── Bottom divider + footer note ── */}
              <motion.div
                className="cta-footer"
                variants={fadeUpVariants}
                style={{
                  marginTop: "4rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
                  Xevnex Technologies
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.14)" }}>
                  Typical response within 24 hours
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom accent sweep */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 25%, transparent) 50%, transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
