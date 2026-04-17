"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { processSteps } from "@/lib/constants";

// ── Variants ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};


// ── Step icons — unique per step ────────────────────────────────────────────
function StepIcon({ index, active }: { index: number; active: boolean }) {
  const icons = [
    // Discovery — magnifier
    <svg key="0" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13 13L18 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    // Strategy — target
    <svg key="1" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>,
    // Design — pen
    <svg key="2" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L18 10L10 13L7 10L10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 10L2 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    // Build — layers
    <svg key="3" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L18 7L10 12L2 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 12L10 17L18 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Launch — rocket
    <svg key="4" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C10 2 14 4 14 10C14 13 12 15 10 16C8 15 6 13 6 10C6 4 10 2 10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 12L3 15M14 12L17 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="9" r="1.5" fill="currentColor" />
    </svg>,
    // Iterate — refresh
    <svg key="5" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 10C3 6.13 6.13 3 10 3C12.76 3 15.16 4.55 16.37 6.85" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M17 10C17 13.87 13.87 17 10 17C7.24 17 4.84 15.45 3.63 13.15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14 4L17 7L14 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 16L3 13L6 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];

  return (
    <motion.div
      animate={{
        color: active ? "var(--color-accent)" : "rgba(255,255,255,0.3)",
      }}
      transition={{ duration: 0.3 }}
      style={{ lineHeight: 0, flexShrink: 0 }}
    >
      {icons[index % icons.length]}
    </motion.div>
  );
}

// ── Single process step ─────────────────────────────────────────────────────
function ProcessStep({
  step,
  index,
  total,
  isActive,
  onEnter,
  onLeave,
}: {
  step: { title: string; description: string };
  index: number;
  total: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isLast = index === total - 1;

  return (
    <motion.div
      variants={fadeUpVariants}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onEnter}
      className="process-step"
      style={{
        display: "grid",
        gridTemplateColumns: "3rem 1px 1fr",
        gap: "0 1.75rem",
        cursor: "default",
      }}
    >
      {/* ── Left: node + rail ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Node circle */}
        <motion.div
          animate={{
            borderColor: isActive
              ? "var(--color-accent)"
              : "rgba(255,255,255,0.12)",
            backgroundColor: isActive
              ? "color-mix(in srgb, var(--color-accent) 15%, transparent)"
              : "transparent",
            scale: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <StepIcon index={index} active={isActive} />

          {/* Pulse ring on active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                key="pulse"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid var(--color-accent)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Connector rail */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: 1,
              marginTop: 4,
              background: isActive
                ? "linear-gradient(to bottom, var(--color-accent), rgba(255,255,255,0.06))"
                : "rgba(255,255,255,0.06)",
              transition: "background 0.5s ease",
              minHeight: "3rem",
            }}
          />
        )}
      </div>

      {/* ── Right: content ── */}
      <div style={{ paddingBottom: isLast ? 0 : "3rem", paddingTop: "0.6rem" }}>
        {/* Step label */}
        <motion.p
          animate={{
            color: isActive ? "var(--color-accent)" : "rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            margin: "0 0 0.6rem",
          }}
        >
          Step {String(index + 1).padStart(2, "0")}
        </motion.p>

        {/* Title */}
        <motion.h3
          animate={{
            color: isActive ? "var(--foreground)" : "rgba(255,255,255,0.75)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            margin: "0 0 0.85rem",
          }}
        >
          {step.title}
        </motion.h3>

        {/* Description — expands on hover */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 13.5,
                lineHeight: 1.85,
                color: "var(--color-muted, #777)",
                margin: 0,
                overflow: "hidden",
              }}
            >
              {step.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      ref={sectionRef}
      style={{ background: "transparent", position: "relative" }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .process-shell {
            padding: 5rem 1.25rem !important;
          }

          .process-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          .process-detail-panel {
            position: static !important;
            top: auto !important;
          }
        }

        @media (max-width: 767px) {
          .process-header-row,
          .process-footer {
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }

          .process-shell {
            padding: 4.5rem 1rem !important;
          }

          .process-step {
            grid-template-columns: 2.5rem 1fr !important;
            gap: 0 1rem !important;
          }

          .process-step-detail-card,
          .process-step-idle-card {
            padding: 1.5rem !important;
          }

          .process-footer {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
      {/* Section atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 0% 50%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="process-shell" style={{ maxWidth: 1240, margin: "0 auto", padding: "7rem 1.5rem" }}>

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginBottom: "5rem" }}
        >
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            <motion.div
              variants={lineVariants}
              style={{
                width: 32,
                height: 1,
                background: "var(--color-accent)",
                transformOrigin: "left",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              Delivery process
            </span>
          </motion.div>

          <div
            className="process-header-row"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            <motion.h2
              variants={fadeUpVariants}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "var(--foreground)",
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              A focused system that keeps{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                execution clear.
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              style={{
                fontSize: 14,
                lineHeight: 1.85,
                color: "var(--color-muted, #666)",
                maxWidth: "38ch",
                margin: 0,
              }}
            >
              From discovery to launch, we follow a structured flow that keeps speed, quality, and accountability in balance.
            </motion.p>
          </div>

          <motion.div
            variants={lineVariants}
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
              transformOrigin: "left",
            }}
          />
        </motion.div>

        {/* ── Two-column: timeline left, active detail right ── */}
        <div
          className="process-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left — timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={i}
                total={processSteps.length}
                isActive={activeIndex === i}
                onEnter={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}
          </motion.div>

          {/* Right — sticky detail panel */}
          <motion.div
            className="process-detail-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "sticky", top: "6rem" }}
          >
            <AnimatePresence mode="wait">
              {activeIndex !== null ? (
                <motion.div
                  className="process-step-detail-card"
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "relative",
                    border:
                      "1px solid color-mix(in srgb, var(--color-accent) 22%, rgba(255,255,255,0.07))",
                    borderRadius: 2,
                    padding: "2.5rem",
                    background:
                      "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
                    overflow: "hidden",
                  }}
                >
                  {/* BG glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-40%",
                      right: "-30%",
                      width: "70%",
                      height: "80%",
                      background:
                        "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Grid decoration */}
                  <svg
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "45%",
                      height: "45%",
                      opacity: 0.06,
                      pointerEvents: "none",
                    }}
                    viewBox="0 0 140 140"
                    fill="none"
                  >
                    {Array.from({ length: 4 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 46} x2="140" y2={i * 46} stroke="var(--color-accent)" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2="140" stroke="var(--color-accent)" strokeWidth="0.5" />
                    ))}
                  </svg>

                  {/* Large step number */}
                  <span
                    style={{
                      fontSize: "clamp(5rem, 9vw, 7.5rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.06em",
                      lineHeight: 1,
                      color:
                        "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                      fontVariantNumeric: "tabular-nums",
                      display: "block",
                      marginBottom: "1.5rem",
                      position: "relative",
                    }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>

                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: "0.26em",
                        textTransform: "uppercase",
                        color: "var(--color-accent)",
                        margin: 0,
                      }}
                    >
                      Step {String(activeIndex + 1).padStart(2, "0")}
                    </p>

                    <h3
                      style={{
                        fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        color: "var(--foreground)",
                        margin: 0,
                      }}
                    >
                      {processSteps[activeIndex].title}
                    </h3>

                    <p
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.85,
                        color: "var(--color-muted, #777)",
                        margin: 0,
                      }}
                    >
                      {processSteps[activeIndex].description}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      marginTop: "2rem",
                      position: "relative",
                    }}
                  >
                    {processSteps.map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          width: i === activeIndex ? 24 : 6,
                          background:
                            i === activeIndex
                              ? "var(--color-accent)"
                              : i < activeIndex
                              ? "color-mix(in srgb, var(--color-accent) 35%, transparent)"
                              : "rgba(255,255,255,0.1)",
                        }}
                        transition={{ duration: 0.35 }}
                        style={{
                          height: 4,
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background:
                        "linear-gradient(90deg, var(--color-accent), transparent 70%)",
                      opacity: 0.65,
                    }}
                  />
                </motion.div>
              ) : (
                /* Idle state — placeholder */
                <motion.div
                  className="process-step-idle-card"
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "1rem",
                    minHeight: 220,
                    justifyContent: "center",
                  }}
                >
                  {/* Dotted idle pattern */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ opacity: 0.08 }}>
                    {Array.from({ length: 5 }).map((_, row) =>
                      Array.from({ length: 5 }).map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={col * 20}
                          cy={row * 20}
                          r="1.5"
                          fill="var(--color-accent)"
                        />
                      ))
                    )}
                  </svg>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.18)",
                      margin: 0,
                    }}
                  >
                    Hover a step to preview
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="process-footer"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-muted, #555)",
            }}
          >
            {processSteps.length} steps · delivery timeline based on project scope
          </span>

          <Link
            href="/process"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-muted, #555)",
              textDecoration: "none",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-muted, #555)")
            }
          >
            See full process
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
