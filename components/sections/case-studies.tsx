"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

// ── Types ──────────────────────────────────────────────────────────────────
type Project = (typeof projects)[number];

// ── Constants ──────────────────────────────────────────────────────────────

// ── Stagger variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ── Metric chip ────────────────────────────────────────────────────────────
function MetricChip({
  value,
  label,
  active,
}: {
  value: string;
  label: string;
  active: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <motion.span
        animate={{ color: active ? "var(--color-accent)" : "var(--foreground)" }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </motion.span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-muted, #666)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Featured card (large, left) ────────────────────────────────────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [active, setActive] = useState(false);

  return (
    <motion.div variants={fadeUpVariants} style={{ height: "100%" }}>
      <Link
        href={`/case-studies/${project.slug}`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        style={{ display: "block", height: "100%", textDecoration: "none" }}
      >
        <motion.article
          className="case-study-featured"
          animate={{
            borderColor: active
              ? "color-mix(in srgb, var(--color-accent) 40%, transparent)"
              : "rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.35 }}
          style={{
            position: "relative",
            height: "100%",
            minHeight: 560,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "var(--color-surface, #0c0a07)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Background texture pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--color-accent) 3%, transparent) 0%, transparent 40%)
              `,
              pointerEvents: "none",
            }}
          />

          {/* Grid lines decoration */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "55%",
              height: "55%",
              opacity: active ? 0.18 : 0.07,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
            viewBox="0 0 200 200"
            fill="none"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 40}
                x2="200"
                y2={i * 40}
                stroke="var(--color-accent)"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="200"
                stroke="var(--color-accent)"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* Top bar */}
          <div
            className="case-study-featured-topbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.75rem 2.25rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {project.tags?.[0] && (
              <motion.span
                animate={{
                  color: active ? "var(--color-accent)" : "var(--color-muted, #555)",
                  borderColor: active
                    ? "color-mix(in srgb, var(--color-accent) 45%, transparent)"
                    : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  padding: "4px 11px",
                }}
              >
                {project.tags[0]}
              </motion.span>
            )}
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--color-muted, #444)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Main content */}
          <div
            className="case-study-featured-content"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "2.5rem 2.25rem 2.25rem",
              gap: "1.25rem",
            }}
          >
            <motion.p
              animate={{ color: active ? "var(--color-accent)" : "var(--color-muted, #555)" }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {project.client}
            </motion.p>

            <h3
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.85,
                color: "var(--color-muted, #666)",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              {project.summary}
            </p>

            {/* CTA */}
            <motion.div
              animate={{
                opacity: active ? 1 : 0,
                x: active ? 0 : -8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              View case study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M7.5 1.5L13 7l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div
                className="case-study-featured-metrics"
                style={{
                  display: "flex",
                  gap: "2.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  marginTop: "0.5rem",
                }}
              >
                {project.metrics.slice(0, 3).map((m, mi) => (
                  <MetricChip key={mi} value={m.value} label={m.label} active={active} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom accent line */}
          <motion.div
            animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, var(--color-accent), transparent 70%)",
              transformOrigin: "left",
            }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

// ── Compact list card (right column) ──────────────────────────────────────
function ListCard({
  project,
  totalIndex,
}: {
  project: Project;
  totalIndex: number;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.div variants={fadeUpVariants}>
      <Link
        href={`/case-studies/${project.slug}`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        style={{ display: "block", textDecoration: "none" }}
      >
        <motion.article
          className="case-study-list-card"
          animate={{
            backgroundColor: active
              ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface, #0c0a07))"
              : "var(--color-surface, #0c0a07)",
            borderColor: active
              ? "color-mix(in srgb, var(--color-accent) 35%, transparent)"
              : "rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "relative",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2,
            padding: "1.75rem 2rem",
            overflow: "hidden",
          }}
        >
          {/* Subtle bg glow */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  top: "-40%",
                  right: "-20%",
                  width: "60%",
                  height: "200%",
                  background:
                    "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

          <div
            className="case-study-list-row"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.5rem",
            }}
          >
            {/* Index */}
            <motion.span
              animate={{
                color: active ? "var(--color-accent)" : "rgba(255,255,255,0.15)",
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.12em",
                fontVariantNumeric: "tabular-nums",
                paddingTop: 3,
                flexShrink: 0,
              }}
            >
              {String(totalIndex + 1).padStart(2, "0")}
            </motion.span>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div
                className="case-study-list-heading"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <motion.p
                  animate={{
                    color: active ? "var(--color-accent)" : "var(--color-muted, #555)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {project.client}
                </motion.p>

                {project.tags?.[0] && (
                  <motion.span
                    animate={{
                      color: active
                        ? "var(--color-accent)"
                        : "var(--color-muted, #444)",
                      borderColor: active
                        ? "color-mix(in srgb, var(--color-accent) 40%, transparent)"
                        : "rgba(255,255,255,0.08)",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      padding: "3px 8px",
                      flexShrink: 0,
                    }}
                  >
                    {project.tags[0]}
                  </motion.span>
                )}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.75,
                  color: "var(--color-muted, #666)",
                  margin: 0,
                }}
              >
                {project.summary}
              </p>

              {/* Metrics inline */}
              {project.metrics && project.metrics.length > 0 && (
                <div
                  className="case-study-list-metrics"
                  style={{
                    display: "flex",
                    gap: "1.75rem",
                    marginTop: "0.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {project.metrics.slice(0, 3).map((m, mi) => (
                    <MetricChip key={mi} value={m.value} label={m.label} active={active} />
                  ))}
                </div>
              )}
            </div>

            {/* Arrow */}
            <motion.div
              animate={{
                opacity: active ? 1 : 0,
                x: active ? 0 : -5,
                color: "var(--color-accent)",
              }}
              transition={{ duration: 0.25 }}
              style={{ paddingTop: 2, flexShrink: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M7.5 1.5L13 7l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, var(--color-accent), transparent 60%)",
              transformOrigin: "left",
            }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const featured = projects[0];
  const rest = projects.slice(1, 4); // up to 3 in the right column

  return (
    <section
      ref={sectionRef}
      style={{
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .case-studies-shell {
            padding: 5rem 1.25rem !important;
          }

          .case-studies-grid {
            grid-template-columns: 1fr !important;
          }

          .case-study-featured {
            min-height: 0 !important;
          }
        }

        @media (max-width: 767px) {
          .case-studies-header-row,
          .case-studies-footer {
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }

          .case-studies-shell {
            padding: 4.5rem 1rem !important;
          }

          .case-study-featured-topbar,
          .case-study-featured-content,
          .case-study-list-card {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          .case-study-featured-topbar {
            padding-top: 1.25rem !important;
            padding-bottom: 1.25rem !important;
            gap: 0.75rem !important;
            flex-wrap: wrap !important;
          }

          .case-study-featured-content {
            padding-top: 1.75rem !important;
            padding-bottom: 1.75rem !important;
          }

          .case-study-featured-metrics,
          .case-study-list-metrics {
            flex-wrap: wrap !important;
            gap: 1rem !important;
          }

          .case-study-list-row {
            gap: 1rem !important;
          }

          .case-study-list-heading {
            flex-wrap: wrap !important;
          }

          .case-studies-footer {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
      {/* Very subtle full-section gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in srgb, var(--color-accent) 4%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="case-studies-shell" style={{ maxWidth: 1240, margin: "0 auto", padding: "7rem 1.5rem" }}>

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginBottom: "5rem" }}
        >
          {/* Eyebrow row */}
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
              Case studies
            </span>
          </motion.div>

          {/* Title + CTA row */}
          <div
            className="case-studies-header-row"
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
                maxWidth: "16ch",
              }}
            >
              Real projects with{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                }}
              >
                measurable outcomes.
              </em>
            </motion.h2>

            <motion.div variants={fadeUpVariants}>
              <Link
                href="/case-studies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                  paddingBottom: 4,
                }}
              >
                View case studies
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Divider */}
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

        {/* ── Cards grid ── */}
        <motion.div
          className="case-studies-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: rest.length > 0 ? "1fr 1fr" : "1fr",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {/* Featured (left) */}
          {featured && (
            <FeaturedCard project={featured} index={0} />
          )}

          {/* List column (right) */}
          {rest.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {rest.map((project, i) => (
                <ListCard
                  key={project.slug}
                  project={project}
                  totalIndex={i + 1}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Bottom count bar ── */}
        <motion.div
          className="case-studies-footer"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--color-muted, #555)",
              textTransform: "uppercase",
            }}
          >
            {projects.length} featured project stories
          </span>

          <Link
            href="/case-studies"
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
            Explore all case studies
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 6h10M6 1l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
