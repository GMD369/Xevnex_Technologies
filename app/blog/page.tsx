"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { blogPosts } from "@/lib/constants";
import styles from "./blog.module.css";

const ACCENT = "var(--color-accent)";
const ACCENT_S = "var(--color-accent-strong)";

/* ─── Animated grid background visual ─── */
function BlogVisual() {
  return (
    <div className={styles.visualContainer}>
      <svg
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.visualSvg}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="30%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vertGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="30%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="fadeMask">
            <radialGradient id="maskGrad" cx="50%" cy="50%" r="55%">
              <stop offset="20%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <rect width="520" height="380" fill="url(#maskGrad)" />
          </mask>
        </defs>

        <g mask="url(#fadeMask)" style={{ color: "var(--color-accent)" }}>
          {/* Horizontal grid lines */}
          {[60, 100, 140, 180, 220, 260, 300, 340].map((y, i) => (
            <line
              key={`h${i}`}
              x1="20"
              y1={y}
              x2="500"
              y2={y}
              stroke="url(#lineGrad)"
              strokeWidth="0.75"
            />
          ))}

          {/* Vertical grid lines */}
          {[80, 140, 200, 260, 320, 380, 440].map((x, i) => (
            <line
              key={`v${i}`}
              x1={x}
              y1="20"
              x2={x}
              y2="360"
              stroke="url(#vertGrad)"
              strokeWidth="0.75"
            />
          ))}

          {/* Text line blocks */}
          {[
            { y: 96, x: 95, w: 200, op: 0.45, delay: 0 },
            { y: 136, x: 95, w: 280, op: 0.3, delay: 0.4 },
            { y: 176, x: 95, w: 160, op: 0.35, delay: 0.8 },
            { y: 216, x: 95, w: 240, op: 0.28, delay: 1.2 },
            { y: 256, x: 95, w: 210, op: 0.22, delay: 1.6 },
            { y: 296, x: 95, w: 260, op: 0.2, delay: 2.0 },
          ].map((l, i) => (
            <rect
              key={i}
              x={l.x}
              y={l.y - 4}
              width={l.w}
              height={4}
              rx="2"
              fill="currentColor"
              opacity={l.op}
              className={styles.svgLineBlock}
              style={{ animationDelay: `${l.delay}s` }}
            />
          ))}

          {/* Highlighted active line */}
          <rect
            x="95"
            y="172"
            width="160"
            height="4"
            rx="2"
            fill="currentColor"
            opacity="0.85"
            filter="url(#glow)"
          />

          {/* Cursor blink */}
          <rect
            x="259"
            y="171"
            width="2"
            height="6"
            rx="1"
            fill="var(--color-accent-strong)"
            className={styles.cursor}
          />

          {/* Intersection dots */}
          {[
            [80, 60], [140, 100], [200, 140], [260, 180],
            [320, 220], [380, 260], [440, 300],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="currentColor"
              opacity="0.25"
            />
          ))}

          {/* Accent intersection dot */}
          <circle cx="200" cy="140" r="3.5" fill="currentColor" opacity="0.9" filter="url(#glow)" />

          {/* Corner markers */}
          {[
            "M48 48 L48 62 M48 48 L62 48",
            "M472 48 L472 62 M472 48 L458 48",
            "M48 332 L48 318 M48 332 L62 332",
            "M472 332 L472 318 M472 332 L458 332",
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ─── Category pill ─── */
function CategoryTag({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: active ? ACCENT_S : "var(--color-muted)",
        border: `1px solid ${active ? "color-mix(in srgb, var(--color-accent) 40%, transparent)" : "var(--color-divider)"}`,
        borderRadius: 3,
        padding: "0.22rem 0.6rem",
        background: active ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Featured post card ─── */
function FeaturedPost({
  post,
  index,
}: {
  post: (typeof blogPosts)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.featuredPost}
      style={{
        border: `1px solid ${
          hovered
            ? "color-mix(in srgb, var(--color-accent) 28%, transparent)"
            : "var(--color-divider)"
        }`,
      }}
    >
      {/* Left content */}
      <div className={styles.featuredContent}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <CategoryTag label={post.category} active />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                opacity: 0.6,
              }}
            >
              · Featured
            </span>
          </div>

          <h2 className={styles.featuredTitle}>{post.title}</h2>

          <p className={styles.featuredExcerpt}>{post.excerpt}</p>
        </div>

        <div className={styles.featuredMeta}>
          <span style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.04em" }}>
            {post.date}&ensp;·&ensp;{post.readTime}
          </span>
          <span
            className={styles.readLink}
            style={{
              opacity: hovered ? 1 : 0.45,
              transform: hovered ? "translateX(5px)" : "translateX(0)",
            }}
          >
            Read article
            <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
              <path
                d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Right number panel */}
      <div
        className={styles.featuredNumber}
        style={{
          background: hovered
            ? "color-mix(in srgb, var(--color-accent) 4%, transparent)"
            : "transparent",
        }}
      >
        <span
          className={styles.featuredIndex}
          style={{ opacity: hovered ? 0.18 : 0.06 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom sweep */}
      <div
        className={styles.featuredSweep}
        style={{ opacity: hovered ? 0.7 : 0 }}
      />
    </Link>
  );
}

/* ─── Post row ─── */
function PostRow({
  post,
  index,
}: {
  post: (typeof blogPosts)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.postRow}
      style={{
        background: hovered
          ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface))"
          : "var(--color-surface)",
      }}
    >
      {/* Index number */}
      <span
        className={styles.rowIndex}
        style={{ opacity: hovered ? 0.55 : 0.12 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Body */}
      <div className={styles.rowBody}>
        <div className={styles.rowMeta}>
          <CategoryTag label={post.category} active={hovered} />
          <span style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.03em" }}>
            {post.date}&ensp;·&ensp;{post.readTime}
          </span>
        </div>

        <h2 className={styles.rowTitle}>{post.title}</h2>
        <p className={styles.rowExcerpt}>{post.excerpt}</p>
      </div>

      {/* Arrow */}
      <span
        className={styles.rowArrow}
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
        }}
      >
        Read
        <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
          <path
            d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Bottom bar */}
      <div
        className={styles.rowBar}
        style={{ opacity: hovered ? 0.35 : 0 }}
      />
    </Link>
  );
}

/* ─── Page ─── */
export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className={styles.page}>
      <div className={`shell ${styles.shell}`}>

        {/* Header */}
        <header className={styles.headerGrid}>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>Blog</p>
            <h1 className={styles.headline}>
              Notes on product,{" "}
              <em className={styles.headlineAccent}>systems</em>,<br />
              and modern teams.
            </h1>
            <p className={styles.subline}>
              Practical thinking from our design and engineering work —
              written for founders, operators, and product leads who ship.
            </p>
          </div>

          <BlogVisual />
        </header>

        <div className={styles.divider} />

        {/* Featured */}
        {featured && (
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Latest post</p>
            <FeaturedPost post={featured} index={0} />
          </div>
        )}

        {/* More posts */}
        {rest.length > 0 && (
          <div className={styles.section}>
            <p className={styles.sectionLabel}>More articles</p>
            <div className={styles.postList}>
              {rest.map((post, i) => (
                <PostRow key={post.slug} post={post} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* CTA strip */}
        <div className={styles.cta}>
          <div>
            <p className={styles.ctaEyebrow}>Work with us</p>
            <p className={styles.ctaHeadline}>Ready to build something?</p>
          </div>
          <Link href="/contact" className={styles.ctaButton}>
            Start a project
            <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
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

      </div>
    </section>
  );
}