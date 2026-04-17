"use client";

import Link from "next/link";
import { ParticleField } from "@/components/ui/particle-field";
import { stats } from "@/lib/constants";

const trustedBy = [
  "Fintech",
  "HealthTech",
  "E-Commerce",
  "SaaS",
  "Deep Tech",
  "Enterprise",
];

// Replace your stats in lib/constants.ts with these:
// { value: "50+", label: "Products shipped" },
// { value: "3x", label: "Avg. speed to market" },
// { value: "98%", label: "Client satisfaction" },
// { value: "12+", label: "Industries served" },

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* ... keep all your existing styles ... */}

      <ParticleField />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 45%, transparent 10%, var(--background) 82%)",
        }}
      />

      <div className="hero-content relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-8 text-center">

        {/* Availability pill */}
        <div
          className="hero-availability animate-enter-up mb-10 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)]/80 px-5 py-2 backdrop-blur-sm"
          style={{ animationDelay: "0ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-strong)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-strong)]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Available for new engagements
          </span>
        </div>

        {/* Headline */}
        <h1
  className="animate-enter-up mx-auto max-w-5xl font-semibold leading-[0.9] tracking-[-0.015em] text-[var(--foreground)]"
  style={{
    fontSize: "clamp(2.75rem, 7.5vw, 6.75rem)",
    animationDelay: "80ms",
  }}
>
  Great products don't happen.
  <br />
  They're{" "}
  <em
    className="not-italic"
    style={{ color: "var(--color-accent-strong)" }}
  >
    engineered.
  </em>
</h1>

        {/* Subtext */}
        <p
          className="hero-copy animate-enter-up mt-8 max-w-[48ch] leading-8 text-[var(--color-muted)]"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", animationDelay: "160ms" }}
        >
          Xevnex Technologies builds AI products and delivers end-to-end services
          in Web Development, App Development, UI/UX Design, and Architecture Design —
          engineered for scale, built for impact.
        </p>

        {/* Service pills */}
        {/* <div
          className="animate-enter-up mt-6 flex flex-wrap items-center justify-center gap-2"
          style={{ animationDelay: "200ms" }}
        >
          {["AI Products", "Web Development", "App Development", "UI/UX Design", "Architecture Design"].map((service) => (
            <span
              key={service}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                border: "1px solid var(--color-divider)",
                borderRadius: 99,
                padding: "0.3rem 0.9rem",
              }}
            >
              {service}
            </span>
          ))}
        </div> */}

        {/* CTAs */}
        <div
          className="hero-ctas animate-enter-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--background)",
              background: "var(--color-accent)",
              border: "1px solid var(--color-accent)",
              borderRadius: 6,
              padding: "0.8rem 1.6rem",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Start a project
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/case-studies"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              border: "1px solid var(--color-divider)",
              borderRadius: 6,
              padding: "0.8rem 1.6rem",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            See our work
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="hero-stats animate-enter-up mt-20 flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
          style={{ animationDelay: "320ms" }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <p style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-highlight)", margin: 0, lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.04em", maxWidth: "15ch", textAlign: "center", lineHeight: 1.5, margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — unchanged */}
      {/* Trusted by strip */}
      <div
        className="animate-enter-up relative z-10 border-t border-[var(--color-divider)] px-4 py-5"
        style={{ animationDelay: "420ms" }}
      >
        <div className="hero-trusted-shell shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-muted)", opacity: 0.5, margin: 0 }}>
            Trusted by teams in
          </p>
          <div className="hero-trusted-list flex flex-wrap items-center gap-x-8 gap-y-2">
            {trustedBy.map((label) => (
              <span
                key={label}
                style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", opacity: 0.38, transition: "opacity 0.2s", cursor: "default" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.38")}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}