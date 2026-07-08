"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const badges = [
  { icon: "*", label: "AI product focused" },
  { icon: "+", label: "Senior execution" },
  { icon: ">", label: "Clear delivery plan" },
];

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="section">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid overflow-hidden rounded-3xl border border-[var(--color-divider)] md:grid-cols-2"
        >
          {/* Left — headline on light-blue tint */}
          <div
            className="flex flex-col justify-center gap-6 p-10 md:p-14"
            style={{ background: "var(--color-highlight)" }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-6"
            >
              <motion.span
                variants={fadeUpVariants}
                className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]"
              >
                Start with Xevnex
              </motion.span>

              <motion.h2
                variants={fadeUpVariants}
                className="text-3xl font-bold leading-[1.1] text-[var(--foreground)] sm:text-4xl"
              >
                Build your next{" "}
                <span style={{ color: "var(--color-accent)" }}>AI-powered product</span>{" "}
                with confidence.
              </motion.h2>

              <motion.p variants={fadeUpVariants} className="max-w-[42ch] text-sm leading-relaxed text-[var(--color-muted)]">
                Whether you need AI services, web development, app development,
                UI/UX design, or architecture design, we help you move from idea to launch with clarity.
              </motion.p>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-divider)] bg-[var(--background)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]"
                  >
                    <span className="opacity-60">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right — plain CTA card */}
          <div className="flex flex-col justify-center gap-6 bg-[var(--background)] p-10 md:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Next step
              </p>
              <p className="mt-3 text-lg font-bold leading-snug text-[var(--foreground)]">
                Share your project goal with our team
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                We&apos;ll review your scope, suggest a practical approach, and provide a clear delivery path.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors duration-200"
                style={{ background: "var(--color-accent)" }}
              >
                Contact Xevnex
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                Or review our case studies
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-divider)] pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
              <span>Xevnex Technologies</span>
              <span>Typical response within 24 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
