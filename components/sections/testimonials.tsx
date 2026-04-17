"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";

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

// ── Star rating ─────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.29 2.61L10.5 4.1l-2.25 2.19.53 3.09L6 7.77l-2.78 1.61.53-3.09L1.5 4.1l3.21-.48L6 1z"
            fill="var(--color-accent)"
          />
        </svg>
      ))}
    </div>
  );
}

// ── Author thumb placeholder ─────────────────────────────────────────────────
function AuthorInitials({ name, active }: { name: string; active: boolean }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      animate={{
        borderColor: active
          ? "var(--color-accent)"
          : "rgba(255,255,255,0.1)",
        background: active
          ? "color-mix(in srgb, var(--color-accent) 15%, var(--color-surface, #0c0a07))"
          : "rgba(255,255,255,0.04)",
      }}
      transition={{ duration: 0.3 }}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <motion.span
        animate={{ color: active ? "var(--color-accent)" : "rgba(255,255,255,0.35)" }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.05em",
        }}
      >
        {initials}
      </motion.span>
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      style={{ background: "transparent", position: "relative" }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .testimonials-shell {
            padding: 5rem 1.25rem !important;
          }

          .testimonials-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 767px) {
          .testimonials-header-row,
          .testimonials-footer {
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }

          .testimonials-shell {
            padding: 4.5rem 1rem !important;
          }

          .testimonials-featured {
            min-height: 0 !important;
            padding: 1.5rem !important;
          }

          .testimonials-author-row {
            flex-wrap: wrap !important;
          }

          .testimonials-author-nav {
            margin-left: 0 !important;
          }

          .testimonials-list-item {
            padding: 1rem !important;
          }

          .testimonials-list-preview {
            display: none !important;
          }

          .testimonials-footer {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
      {/* Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 50% 0%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="testimonials-shell" style={{ maxWidth: 1240, margin: "0 auto", padding: "7rem 1.5rem" }}>

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginBottom: "5rem" }}
        >
          <motion.div
            variants={fadeUpVariants}
            style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}
          >
            <motion.div
              variants={lineVariants}
              style={{ width: 32, height: 1, background: "var(--color-accent)", transformOrigin: "left" }}
            />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              Client feedback
            </span>
          </motion.div>

          <div className="testimonials-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
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
              Trusted by teams building{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                AI and digital products
              </em>{" "}
              with confidence.
            </motion.h2>

            {/* Counter */}
            <motion.div
              variants={fadeUpVariants}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>
                {String(active + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>
                /
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.18)", fontVariantNumeric: "tabular-nums" }}>
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={lineVariants}
            style={{
              height: 1,
              background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
              transformOrigin: "left",
            }}
          />
        </motion.div>

        {/* ── Main layout: featured quote + author list ── */}
        <motion.div
          className="testimonials-layout"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* ── Left: large featured quote ── */}
          <div
            className="testimonials-featured"
            style={{
              position: "relative",
              border: "1px solid color-mix(in srgb, var(--color-accent) 18%, rgba(255,255,255,0.07))",
              borderRadius: 2,
              padding: "3.5rem",
              background: "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
              overflow: "hidden",
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* BG glow */}
            <div
              style={{
                position: "absolute",
                top: "-40%",
                right: "-20%",
                width: "60%",
                height: "80%",
                background: "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Large decorative quote mark */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "2.5rem",
                fontSize: "9rem",
                lineHeight: 1,
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "var(--color-accent)",
                opacity: 0.07,
                userSelect: "none",
                pointerEvents: "none",
                fontStyle: "italic",
              }}
            >
              &quot;
            </div>

            {/* Grid decoration */}
            <svg
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "35%",
                height: "40%",
                opacity: 0.05,
                pointerEvents: "none",
              }}
              viewBox="0 0 120 120"
              fill="none"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 40} x2="120" y2={i * 40} stroke="var(--color-accent)" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="120" stroke="var(--color-accent)" strokeWidth="0.5" />
              ))}
            </svg>

            {/* Stars */}
            <div style={{ position: "relative" }}>
              <Stars />
            </div>

            {/* Quote text */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                  lineHeight: 1.75,
                  letterSpacing: "-0.01em",
                  color: "var(--foreground)",
                  margin: "2rem 0",
                  fontStyle: "italic",
                  flex: 1,
                }}
              >
                &quot;{current.quote}&quot;
              </motion.blockquote>
            </AnimatePresence>

            {/* Author row */}
            <AnimatePresence mode="wait">
              <motion.div
                className="testimonials-author-row"
                key={`author-${active}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <AuthorInitials name={current.name} active={true} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--foreground)", margin: 0 }}>
                    {current.name}
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)", margin: "3px 0 0" }}>
                    {current.role}
                  </p>
                </div>

                {/* Nav arrows */}
                <div className="testimonials-author-nav" style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  {[
                    { dir: -1, path: "M8 6H2M2 6l3-3M2 6l3 3" },
                    { dir: 1, path: "M2 6h6M8 6L5 3M8 6L5 9" },
                  ].map(({ dir, path }) => (
                    <button
                      key={dir}
                      onClick={() => {
                        setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
                        resetTimer();
                      }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--color-muted, #666)",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "color-mix(in srgb, var(--color-accent) 50%, transparent)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted, #666)";
                      }}
                    >
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                        <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <motion.div
                key={active}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                style={{
                  height: "100%",
                  background: "var(--color-accent)",
                  transformOrigin: "left",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          {/* ── Right: author list ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {testimonials.map((t, i) => (
              <motion.button
                className="testimonials-list-item"
                key={t.name}
                onClick={() => { setActive(i); resetTimer(); }}
                animate={{
                  backgroundColor: active === i
                    ? "color-mix(in srgb, var(--color-accent) 6%, var(--color-surface, #0c0a07))"
                    : "transparent",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  background: "transparent",
                  border: "none",
                  borderBottom: i < testimonials.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  position: "relative",
                  width: "100%",
                }}
              >
                {/* Active left bar */}
                <motion.div
                  animate={{ opacity: active === i ? 1 : 0, scaleY: active === i ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: "var(--color-accent)",
                    transformOrigin: "top",
                    borderRadius: 1,
                  }}
                />

                <AuthorInitials name={t.name} active={active === i} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <motion.p
                    animate={{ color: active === i ? "var(--foreground)" : "rgba(255,255,255,0.5)" }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {t.name}
                  </motion.p>
                  <motion.p
                    animate={{ color: active === i ? "var(--color-accent)" : "rgba(255,255,255,0.2)" }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {t.role}
                  </motion.p>
                </div>

                {/* Mini quote preview */}
                <motion.p
                  className="testimonials-list-preview"
                  animate={{ opacity: active === i ? 0 : 0.22 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 11,
                    lineHeight: 1.5,
                    color: "var(--color-muted, #666)",
                    margin: 0,
                    maxWidth: "10ch",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {t.quote}
                </motion.p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Dot navigation ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: "2.5rem",
          }}
        >
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setActive(i); resetTimer(); }}
              animate={{
                width: active === i ? 28 : 6,
                background: active === i ? "var(--color-accent)" : "rgba(255,255,255,0.15)",
              }}
              transition={{ duration: 0.35 }}
              style={{
                height: 4,
                borderRadius: 2,
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="testimonials-footer"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted, #555)" }}>
            {testimonials.length} trusted partner voices
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
            Auto-advancing · 5s interval
          </span>
        </motion.div>
      </div>
    </section>
  );
}
