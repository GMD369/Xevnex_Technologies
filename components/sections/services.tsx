"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/data/services";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const icons = [
  <svg key="0" width="24" height="24" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
    <line x1="11" y1="2" x2="11" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="11" y1="16" x2="11" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  <svg key="1" width="24" height="24" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L20 11L11 14L8 11L11 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8 11L2 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 22 22" fill="none">
    <path d="M8 5L3 11L8 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 5L19 11L14 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 22 22" fill="none">
    <polyline points="2,16 8,10 12,14 20,5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="14,5 20,5 20,11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="4" width="24" height="24" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="13" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9" y="8" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="16" y="3" width="4" height="17" rx="1" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="5" width="24" height="24" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L20 9L11 20L2 9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <line x1="2" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
];

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  return (
    <motion.div variants={fadeUpVariants}>
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-divider)] bg-[var(--background)] p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-soft)]"
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--color-highlight)", color: "var(--color-accent)" }}
        >
          {icons[index % icons.length]}
        </div>
        <h3 className="text-lg font-bold text-[var(--foreground)]">{service.title}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{service.description}</p>
        <span
          className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          Learn more
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="section" style={{ background: "var(--color-surface)" }}>
      <div className="shell">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-4 flex items-center justify-center gap-3">
            <motion.div
              variants={lineVariants}
              style={{ width: 28, height: 2, background: "var(--color-accent)", transformOrigin: "left", borderRadius: 2 }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Our Services
            </span>
          </motion.div>
          <motion.h2 variants={fadeUpVariants} className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
            Built to deliver AI and digital products end to end.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-divider)] pt-8"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            {services.length} service capabilities
          </span>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-accent-strong)]"
          >
            View all services
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
