"use client";

import Link from "next/link";
import { stats } from "@/lib/constants";

const trustedBy = [
  "Fintech",
  "HealthTech",
  "E-Commerce",
  "SaaS",
  "Deep Tech",
  "Enterprise",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-divider)] bg-[var(--background)]">
      <div className="shell grid gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        {/* Left column — copy */}
        <div>
          <div
            className="animate-enter-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-4 py-2"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Available for new engagements
            </span>
          </div>

          <h1
            className="animate-enter-up max-w-2xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--foreground)]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              animationDelay: "80ms",
            }}
          >
            Great products don&apos;t happen.
            <br />
            They&apos;re{" "}
            <span style={{ color: "var(--color-accent)" }}>engineered.</span>
          </h1>

          <p
            className="animate-enter-up mt-6 max-w-[46ch] text-[var(--color-muted)]"
            style={{ fontSize: "1.0625rem", lineHeight: 1.75, animationDelay: "160ms" }}
          >
            Xevnex Technologies builds AI products and delivers end-to-end services
            in Web Development, App Development, UI/UX Design, and Architecture Design —
            engineered for scale, built for impact.
          </p>

          <div
            className="animate-enter-up mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200"
              style={{
                color: "#ffffff",
                background: "var(--color-accent)",
              }}
            >
              Start a project
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-200"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--color-divider)",
              }}
            >
              See our work
            </Link>
          </div>

          <div
            className="animate-enter-up mt-14 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-[var(--color-divider)] pt-8"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <p
                  className="font-bold"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--foreground)", lineHeight: 1, margin: 0 }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, color: "var(--color-muted)", maxWidth: "18ch", lineHeight: 1.5, margin: "6px 0 0" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — flat visual panel */}
        <div
          className="animate-enter-up relative aspect-[4/5] w-full overflow-hidden rounded-3xl lg:aspect-square"
          style={{
            animationDelay: "160ms",
            background: "linear-gradient(160deg, var(--color-highlight) 0%, var(--color-surface) 100%)",
            border: "1px solid var(--color-divider)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-divider) 1px, transparent 1px), linear-gradient(90deg, var(--color-divider) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              opacity: 0.4,
            }}
          />
          <div className="absolute inset-6 flex flex-col justify-between rounded-2xl border border-[var(--color-divider)] bg-[var(--background)] p-6 shadow-[var(--shadow-soft)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                Delivery snapshot
              </p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                Senior product, design, and engineering execution in focused sprints.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] px-4 py-3"
                >
                  <span className="text-sm font-semibold text-[var(--foreground)]">{stat.value}</span>
                  <span className="text-right text-xs text-[var(--color-muted)]" style={{ maxWidth: "16ch" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by strip */}
      <div className="animate-enter-up border-t border-[var(--color-divider)] bg-[var(--color-surface)] px-4 py-5" style={{ animationDelay: "420ms" }}>
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-muted)", margin: 0 }}>
            Trusted by teams in
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {trustedBy.map((label) => (
              <span
                key={label}
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", opacity: 0.7 }}
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
