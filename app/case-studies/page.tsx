"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { projects } from "@/data/projects";
import styles from "./case-studies.module.css";

/* ── Breakpoint hook ── */
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [bp]);
  return mobile;
}

const ACCENT = "var(--color-accent)";
const ACCENT_S = "var(--color-accent-strong)";

/* ── Metric pill ─────────────────────────────────────────────────────────── */
function MetricPill({
  value,
  label,
  hovered,
}: {
  value: string;
  label: string;
  hovered: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "0.75rem 1.25rem",
        borderRight: "1px solid var(--color-divider)",
        transition: "background 0.3s",
        background: hovered
          ? "color-mix(in srgb, var(--color-accent) 5%, transparent)"
          : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: hovered ? ACCENT_S : "var(--foreground)",
          transition: "color 0.3s",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Featured hero card ──────────────────────────────────────────────────── */
function FeaturedCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <Link
        href={`/case-studies/${project.slug}`}
        className={styles.mobileCard}
        style={{
          borderColor: hovered
            ? "color-mix(in srgb, var(--color-accent) 40%, transparent)"
            : "var(--color-divider)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header row: index + client */}
        <div className={styles.mobileCardHeader}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: ACCENT, opacity: 0.6 }}>
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-muted)" }}>
            {project.client}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--color-divider)" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, opacity: 0.7 }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Body: title + summary */}
        <div className={styles.mobileCardBody}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT, margin: 0 }}>
            Featured Work
          </p>
          <h2 style={{ fontSize: "clamp(1.3rem, 5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--foreground)", margin: 0 }}>
            {project.title}
          </h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--color-muted)", margin: 0 }}>
            {project.summary}
          </p>

          {/* Outcomes */}
          {project.results.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid var(--color-divider)" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)", margin: 0 }}>Outcomes</p>
              {project.results.map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M1 5h8M5 1l4 4-4 4" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--color-muted)", margin: 0 }}>{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Metrics 2-col grid */}
        {project.metrics && (
          <div className={styles.mobileCardMetrics}>
            {project.metrics.map((m: { value: string; label: string }) => (
              <div key={m.label} className={styles.mobileMetricPill}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "1.1rem", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--foreground)" }}>{m.value}</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted)" }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className={styles.mobileCardFooter}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT }}>Read full story</span>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Bottom accent */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${ACCENT}, transparent 70%)`, opacity: hovered ? 0.8 : 0, transition: "opacity 0.4s" }} />
      </Link>
    );
  }

  /* ── Desktop layout ── */
  return (
    <Link
      ref={cardRef}
      href={`/case-studies/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${hovered ? "color-mix(in srgb, var(--color-accent) 40%, transparent)" : "var(--color-divider)"}`,
        background: "var(--color-surface)",
        textDecoration: "none",
        position: "relative",
        transition: "border-color 0.4s ease",
      }}
    >
      {/* Radial cursor glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 60%)`,
        }}
      />

      {/* Top strip: index + tags + client */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          borderBottom: "1px solid var(--color-divider)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Index block */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderRight: "1px solid var(--color-divider)",
            display: "flex",
            alignItems: "center",
            background: hovered
              ? "color-mix(in srgb, var(--color-accent) 6%, transparent)"
              : "var(--color-surface-strong)",
            transition: "background 0.35s",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: hovered ? ACCENT : "var(--color-muted)",
              transition: "color 0.3s",
            }}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 1.5rem",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: hovered ? ACCENT : "var(--color-muted)",
                transition: "color 0.3s",
              }}
            >
              {tag}
              {i < project.tags.length - 1 && (
                <span style={{ margin: "0 0.4rem", opacity: 0.3 }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Client */}
        <div
          style={{
            padding: "0.875rem 1.5rem",
            borderLeft: "1px solid var(--color-divider)",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            {project.client}
          </span>
        </div>
      </div>

      {/* Main body: 3-column architectural grid */}
      <div className={styles.featuredBody}>
        {/* Col 1 — vertical label + outcomes */}
        <div
          style={{
            borderRight: "1px solid var(--color-divider)",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Vertical "Case Study" label */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 1,
                height: 40,
                background: hovered ? ACCENT : "var(--color-divider)",
                transition: "background 0.3s",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: hovered ? ACCENT : "var(--color-muted)",
                transition: "color 0.3s",
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
            >
              Case Study
            </span>
          </div>

          {/* Outcome bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: hovered ? ACCENT : "var(--color-muted)",
                margin: 0,
                transition: "color 0.3s",
              }}
            >
              Outcomes
            </p>
            {project.results.map((r, i) => (
              <div
                key={r}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.65rem",
                  opacity: hovered ? 1 : 0.7,
                  transform: hovered ? "translateX(0)" : "translateX(-4px)",
                  transition: `opacity 0.3s ${i * 60}ms, transform 0.3s ${i * 60}ms`,
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 3 }}
                >
                  <path
                    d="M1 5h8M5 1l4 4-4 4"
                    stroke={ACCENT}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "var(--color-muted)",
                    margin: 0,
                  }}
                >
                  {r}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2 — hero content */}
        <div
          style={{
            padding: "3rem 2.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Overline */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: ACCENT,
                  opacity: hovered ? 1 : 0.4,
                  transition: "opacity 0.3s",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  opacity: hovered ? 1 : 0.5,
                  transition: "opacity 0.3s",
                }}
              >
                Featured Work
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.75rem, 2.8vw, 2.6rem)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              {project.title}
            </h2>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.85,
                color: "var(--color-muted)",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              {project.summary}
            </p>
          </div>

          {/* CTA */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: "0.5rem",
              borderBottom: `1px solid ${hovered ? ACCENT : "transparent"}`,
              transition: "border-color 0.3s",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ACCENT,
                opacity: hovered ? 1 : 0.55,
                transition: "opacity 0.3s",
              }}
            >
              Read the full story
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                transform: hovered ? "translateX(4px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            >
              <path
                d="M1 7h12M7 1l6 6-6 6"
                stroke={ACCENT}
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={hovered ? 1 : 0.55}
              />
            </svg>
          </div>
        </div>

        {/* Col 3 — giant index watermark + year */}
        <div className={styles.watermarkCol}>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "var(--color-muted)",
              opacity: 0.6,
            }}
          >
            {project.year ?? "2024"}
          </span>

          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "clamp(5rem, 9vw, 8rem)",
              fontWeight: 700,
              lineHeight: 0.85,
              color: ACCENT,
              opacity: hovered ? 0.14 : 0.05,
              transition: "opacity 0.4s ease",
              userSelect: "none",
              letterSpacing: "-0.04em",
              alignSelf: "flex-end",
              marginRight: "-0.1em",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Metrics strip */}
      {project.metrics && (
        <div className={styles.metricsStrip}>
          {project.metrics.map(
            (m: { value: string; label: string }, i: number) => (
              <MetricPill key={i} value={m.value} label={m.label} hovered={hovered} />
            )
          )}

          {/* View project ghost */}
          <div
            style={{
              marginLeft: "auto",
              padding: "0.75rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderLeft: "1px solid var(--color-divider)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: hovered ? ACCENT : "var(--color-muted)",
                opacity: hovered ? 0.8 : 0.35,
                transition: "color 0.3s, opacity 0.3s",
              }}
            >
              View project
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{
                transform: hovered ? "translate(2px, -2px)" : "translate(0,0)",
                transition: "transform 0.3s",
              }}
            >
              <path
                d="M1 9L9 1M9 1H3M9 1v6"
                stroke={hovered ? ACCENT : "var(--color-muted)"}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={hovered ? 0.8 : 0.35}
              />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom accent sweep */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, ${ACCENT}, color-mix(in srgb, var(--color-accent) 0%, transparent) 70%)`,
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 2,
        }}
      />

      {/* Left accent sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 1,
          background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
          opacity: hovered ? 0.5 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 2,
        }}
      />
    </Link>
  );
}

/* ── Compact project row ──────────────────────────────────────────────────── */
function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <Link
        href={`/case-studies/${project.slug}`}
        className={styles.mobileProjectRow}
        style={{ background: hovered ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "var(--color-surface)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.mobileProjectRowTop}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "1.5rem", fontWeight: 300, color: ACCENT, opacity: 0.25, lineHeight: 1, flexShrink: 0 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, border: "1px solid var(--color-divider)", borderRadius: 2, padding: "0.15rem 0.45rem" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-muted)", margin: 0 }}>
          {project.client}
        </p>
        <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.2rem)", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.3, color: "var(--foreground)", margin: 0 }}>
          {project.title}
        </h2>
        {/* Bottom rule */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: ACCENT, opacity: hovered ? 0.35 : 0, transition: "opacity 0.3s" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: ACCENT, opacity: hovered ? 0.7 : 0, transition: "opacity 0.3s" }} />
      </Link>
    );
  }

  return (
    <Link
      href={`/case-studies/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.projectRow}
      style={{
        background: hovered
          ? "color-mix(in srgb, var(--color-accent) 4%, transparent)"
          : "var(--color-surface)",
      }}
    >
      {/* Index */}
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "2rem",
          fontWeight: 300,
          lineHeight: 1,
          color: ACCENT,
          opacity: hovered ? 0.6 : 0.12,
          transition: "opacity 0.3s",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: hovered ? ACCENT : "var(--color-muted)",
              margin: 0,
              transition: "color 0.3s",
            }}
          >
            {project.client}
          </p>
          {/* Tags inline */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: hovered ? ACCENT : "var(--color-muted)",
                  border: `1px solid ${
                    hovered
                      ? "color-mix(in srgb, var(--color-accent) 30%, transparent)"
                      : "var(--color-divider)"
                  }`,
                  borderRadius: 2,
                  padding: "0.15rem 0.5rem",
                  transition: "color 0.3s, border-color 0.3s",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h2
          style={{
            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            lineHeight: 1.25,
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          {project.title}
        </h2>
      </div>

      {/* Arrow + label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: ACCENT,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 0.3s, transform 0.3s",
          whiteSpace: "nowrap",
        }}
      >
        View case study
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <path
            d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: ACCENT,
          opacity: hovered ? 0.35 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Left accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 2,
          background: ACCENT,
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function CaseStudiesPage() {
  const [featured, ...rest] = projects;

  return (
    <section style={{ paddingTop: "0.5rem", paddingBottom: "5rem" }}>
      <div
        className="shell"
        style={{ display: "flex", flexDirection: "column", gap: "5rem" }}
      >
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: 0,
                }}
              >
                Case Studies
              </p>
              <h1
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "var(--foreground)",
                  maxWidth: "22ch",
                  margin: 0,
                }}
              >
                Launches where{" "}
                <em style={{ fontStyle: "normal", color: ACCENT }}>craft</em>{" "}
                and speed both mattered.
              </h1>
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.85,
                color: "var(--color-muted)",
                maxWidth: "44ch",
                margin: 0,
                alignSelf: "flex-end",
              }}
            >
              Each engagement is scoped for clarity — product direction,
              interface design, and engineering delivered without handoffs or
              lost context.
            </p>
          </div>
          <div style={{ height: 1, background: "var(--color-divider)" }} />
        </div>

        {/* Featured project */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            Featured engagement
          </p>
          <FeaturedCard project={featured} index={0} />
        </div>

        {/* Additional projects */}
        {rest.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              More work
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5px",
                background: "var(--color-divider)",
                border: "1px solid var(--color-divider)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {rest.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* CTA strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-divider)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: "0.6rem",
              }}
            >
              Ready to build?
            </p>
            <p
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              Your engagement could be next.
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--background)",
              background: ACCENT,
              border: `1px solid ${ACCENT}`,
              borderRadius: 2,
              padding: "0.875rem 1.75rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
          >
            Start a project
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <path
                d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}