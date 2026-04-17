"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";

// ── Variants ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ── Service icon — a clean SVG glyph that draws in on hover ────────────────
function ServiceIcon({ index, active }: { index: number; active: boolean }) {
  // Each service gets a distinct minimal glyph
  const icons = [
    // Strategy — compass / crosshair
    <svg key="0" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.2" />
      <line x1="11" y1="2" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="11" y1="16" x2="11" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="11" x2="6" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
    // Design — pen nib
    <svg key="1" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2L20 11L11 14L8 11L11 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 11L2 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 14L13 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
    // Engineering — brackets
    <svg key="2" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M8 5L3 11L8 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 5L19 11L14 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="10" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
    // Growth — trending up
    <svg key="3" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polyline points="2,16 8,10 12,14 20,5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14,5 20,5 20,11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Analytics — bar chart
    <svg key="4" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="13" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="8" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="16" y="3" width="4" height="17" rx="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>,
    // Brand — diamond
    <svg key="5" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2L20 9L11 20L2 9Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="2" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="1.2" />
    </svg>,
  ];

  return (
    <motion.div
      animate={{ color: active ? "var(--color-accent)" : "rgba(255,255,255,0.25)" }}
      transition={{ duration: 0.3 }}
      style={{ lineHeight: 0, flexShrink: 0 }}
    >
      {icons[index % icons.length]}
    </motion.div>
  );
}

// ── Expanded description panel ──────────────────────────────────────────────
function ExpandedPanel({ service }: { service: (typeof services)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div
        className="service-expanded-panel"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "end",
          gap: "2rem",
          paddingTop: "1.5rem",
          paddingBottom: "0.25rem",
        }}
      >
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.85,
            color: "var(--color-muted, #777)",
            margin: 0,
            maxWidth: "60ch",
          }}
        >
          {service.description}
        </p>

        <Link
          href={`/services/${service.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            paddingBottom: 3,
            borderBottom:
              "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
          }}
        >
          Learn more
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
      </div>
    </motion.div>
  );
}

// ── Single service row ──────────────────────────────────────────────────────
function ServiceRow({
  service,
  index,
  isActive,
  onEnter,
  onLeave,
  isLast,
}: {
  service: (typeof services)[number];
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={rowVariants}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onEnter}
      style={{ position: "relative" }}
    >
      {/* Hover background sweep */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "color-mix(in srgb, var(--color-accent) 4%, transparent)",
              pointerEvents: "none",
              borderRadius: 2,
            }}
          />
        )}
      </AnimatePresence>

      {/* Left accent bar */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
          scaleY: isActive ? 1 : 0.4,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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

      {/* Row content */}
      <div
        className="service-row-inner"
        style={{
          position: "relative",
          padding: isActive ? "1.75rem 2rem 1.5rem 2.25rem" : "1.75rem 2rem 1.75rem 2.25rem",
          transition: "padding 0.3s ease",
        }}
      >
        {/* Top row: icon + number + title + kicker */}
        <div
          className="service-row-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2rem 3.5rem 1fr auto",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          {/* Icon */}
          <ServiceIcon index={index} active={isActive} />

          {/* Index */}
          <motion.span
            animate={{
              color: isActive ? "var(--color-accent)" : "rgba(255,255,255,0.18)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          {/* Title */}
          <h3
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            {service.title}
          </h3>

          {/* Kicker tag */}
          <motion.span
            animate={{
              color: isActive
                ? "var(--color-accent)"
                : "var(--color-muted, #555)",
              borderColor: isActive
                ? "color-mix(in srgb, var(--color-accent) 45%, transparent)"
                : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              padding: "4px 10px",
              whiteSpace: "nowrap",
              display: "none", // show via media query — we'll handle with a class or inline below
            }}
            className="service-kicker-tag"
          >
            {service.kicker}
          </motion.span>
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {isActive && (
            <ExpandedPanel key={service.slug} service={service} />
          )}
        </AnimatePresence>
      </div>

      {/* Row divider */}
      {!isLast && (
        <div
          className="service-row-divider"
          style={{
            height: 1,
            background: isActive
              ? "color-mix(in srgb, var(--color-accent) 20%, rgba(255,255,255,0.06))"
              : "rgba(255,255,255,0.06)",
            transition: "background 0.3s ease",
            marginLeft: "2.25rem",
          }}
        />
      )}
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <>
      {/* Kicker tag visibility — shown on md+ */}
      <style>{`
        @media (min-width: 640px) {
          .service-kicker-tag { display: inline-block !important; }
        }

        @media (max-width: 1023px) {
          .services-shell {
            padding: 5rem 1.25rem !important;
          }

          .services-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          .services-featured-panel {
            position: static !important;
            top: auto !important;
          }
        }

        @media (max-width: 767px) {
          .services-header-row,
          .services-footer {
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }

          .services-shell {
            padding: 4.5rem 1rem !important;
          }

          .service-row-inner {
            padding: 1.25rem 1rem 1.1rem 1.25rem !important;
          }

          .service-row-grid {
            grid-template-columns: 1.5rem 2rem 1fr !important;
            gap: 0.75rem !important;
            align-items: flex-start !important;
          }

          .service-row-divider {
            margin-left: 1.25rem !important;
          }

          .service-expanded-panel {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding-top: 1rem !important;
          }

          .services-featured-card {
            padding: 1.5rem !important;
            gap: 1.25rem !important;
          }

          .services-footer {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{ background: "transparent", position: "relative" }}
      >
        {/* Subtle section atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 60% 40% at 100% 60%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent)",
            pointerEvents: "none",
          }}
        />

        <div className="services-shell" style={{ maxWidth: 1240, margin: "0 auto", padding: "7rem 1.5rem" }}>

          {/* ── Header ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ marginBottom: "5rem" }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={rowVariants}
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
                Our services
              </span>
            </motion.div>

            {/* Title + CTA */}
            <div
              className="services-header-row"
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
                variants={rowVariants}
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                  margin: 0,
                  maxWidth: "18ch",
                }}
              >
                Built to deliver{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                  AI and digital products
                </em>{" "}
                end to end.
              </motion.h2>

              <motion.div variants={rowVariants}>
                <Link
                  href="/services"
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
                    borderBottom:
                      "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                    paddingBottom: 4,
                  }}
                >
                  Explore services
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

          {/* ── Two-column layout: list left, large active panel right ── */}
          <div
            className="services-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Left — scrollable service rows */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {services.map((service, i) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  index={i}
                  isActive={activeIndex === i}
                  onEnter={() => setActiveIndex(i)}
                  onLeave={() => {}}
                  isLast={i === services.length - 1}
                />
              ))}
            </motion.div>

            {/* Right — large featured panel for active service */}
            <motion.div
              className="services-featured-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "sticky", top: "6rem" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex !== null && services[activeIndex] && (
                  <motion.div
                    className="services-featured-card"
                    key={activeIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      border: "1px solid color-mix(in srgb, var(--color-accent) 20%, rgba(255,255,255,0.07))",
                      borderRadius: 2,
                      padding: "2.5rem",
                      background:
                        "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2rem",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Background glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-30%",
                        right: "-20%",
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
                        width: "50%",
                        height: "50%",
                        opacity: 0.07,
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 160 160"
                      fill="none"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={i * 40} x2="160" y2={i * 40} stroke="var(--color-accent)" strokeWidth="0.5" />
                      ))}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="160" stroke="var(--color-accent)" strokeWidth="0.5" />
                      ))}
                    </svg>

                    {/* Service number */}
                    <span
                      style={{
                        fontSize: "clamp(5rem, 8vw, 7rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.06em",
                        lineHeight: 1,
                        color: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                        fontVariantNumeric: "tabular-nums",
                        position: "relative",
                      }}
                    >
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>

                    {/* Kicker */}
                    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                        {services[activeIndex].kicker}
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
                        {services[activeIndex].title}
                      </h3>

                      <p
                        style={{
                          fontSize: 14.5,
                          lineHeight: 1.85,
                          color: "var(--color-muted, #777)",
                          margin: 0,
                        }}
                      >
                        {services[activeIndex].description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div style={{ position: "relative" }}>
                      <Link
                        href={`/services/${services[activeIndex].slug}`}
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
                          borderBottom:
                            "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                          paddingBottom: 4,
                        }}
                      >
                        Explore service
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
                        opacity: 0.7,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Footer count bar ── */}
          <motion.div
            className="services-footer"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
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
              {services.length} service capabilities
            </span>

            <Link
              href="/services"
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
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-muted, #555)")
              }
            >
              View all services
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
    </>
  );
}
