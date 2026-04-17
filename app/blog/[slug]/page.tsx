import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/constants";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {

  const { slug } = await props.params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) notFound();

  const siblings = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <section style={{ paddingBlock: "0 6rem" }}>

      {/* ── Hero band ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          marginBottom: "5rem",
        }}
      >
        {/* Atmospheric glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(ellipse 70% 90% at 20% 50%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent)",
          }}
        />

        {/* Ruled-line texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 40px)",
          }}
        />

        <div
          className="shell"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "6rem 1.5rem 5rem",
            display: "grid",
            gridTemplateColumns: "1fr min(52ch, 100%)",
            gap: "4rem",
            alignItems: "end",
          }}
        >
          {/* Left — meta column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Back link */}
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                width: "fit-content",
                transition: "color 0.2s",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M12 6.5H1M6.5 1L1 6.5l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All articles
            </Link>

            {/* Category badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <div style={{ width: 24, height: 1, background: "var(--color-accent)" }} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-strong)",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                  borderRadius: 3,
                  padding: "0.3rem 0.75rem",
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Index watermark */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "5rem",
                  fontWeight: 200,
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  opacity: 0.1,
                  userSelect: "none",
                  letterSpacing: "-0.04em",
                }}
              >
                {String(blogPosts.findIndex((p) => p.slug === slug) + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Date + read time */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.06em",
                }}
              >
                {post.date}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11,
                  color: "var(--color-accent)",
                  opacity: 0.6,
                  letterSpacing: "0.06em",
                }}
              >
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Right — title column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.85,
                color: "var(--color-muted)",
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {post.excerpt}
            </p>

            {/* Progress pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                width: "fit-content",
                background: "color-mix(in srgb, var(--color-accent) 6%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-accent) 16%, transparent)",
                borderRadius: 2,
                padding: "0.6rem 1rem",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.5" />
                <path d="M8 4.5V8.5L10.5 10" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                }}
              >
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="shell"
        style={{
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "200px 1fr 200px",
          gap: "4rem",
          alignItems: "start",
        }}
      >

        {/* Left sticky sidebar */}
        <div
          style={{
            position: "sticky",
            top: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Section label */}
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                margin: "0 0 0.75rem",
              }}
            >
              Article
            </p>
            <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Vertical accent line */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: 2,
                height: 80,
                background: "linear-gradient(to bottom, var(--color-accent), transparent)",
                opacity: 0.35,
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.2)",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {post.category}
            </p>
          </div>

          {/* Share hint */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.15)",
                margin: 0,
              }}
            >
              Share
            </p>
            {["Twitter / X", "LinkedIn", "Copy link"].map((label) => (
              <button
                key={label}
                type="button"
                style={{
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.22)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Center — article content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

          {/* Lead paragraph */}
          {post.content.length > 0 && (
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                lineHeight: 1.85,
                color: "var(--foreground)",
                margin: "0 0 2.5rem",
                fontWeight: 450,
                letterSpacing: "-0.005em",
              }}
            >
              {post.content[0]}
            </p>
          )}

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "0 0 2.5rem",
            }}
          >
            <div style={{ width: 24, height: 1, background: "var(--color-accent)", opacity: 0.6 }} />
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* Body paragraphs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {post.content.slice(1).map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: 15,
                  lineHeight: 1.95,
                  color: "var(--color-muted)",
                  margin: 0,
                  letterSpacing: "0.005em",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pull-quote accent block */}
          {post.content.length > 2 && (
            <div
              style={{
                margin: "3rem 0",
                padding: "1.75rem 2rem",
                borderLeft: "2px solid var(--color-accent)",
                background: "color-mix(in srgb, var(--color-accent) 4%, transparent)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                  lineHeight: 1.75,
                  color: "var(--foreground)",
                  margin: 0,
                  fontWeight: 450,
                  letterSpacing: "-0.01em",
                  fontStyle: "italic",
                }}
              >
                {post.content[Math.floor(post.content.length / 2)]}
              </p>
            </div>
          )}

          {/* Article footer */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "color-mix(in srgb, var(--color-accent) 6%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)",
                borderRadius: 2,
                padding: "0.65rem 1rem",
              }}
            >
              <span style={{ position: "relative", display: "flex", width: 7, height: 7, flexShrink: 0 }}>
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    opacity: 0.55,
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                }}
              >
                Available for new work
              </span>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              xevnex.com
            </span>
          </div>
        </div>

        {/* Right sticky sidebar */}
        <div
          style={{
            position: "sticky",
            top: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                margin: "0 0 0.75rem",
              }}
            >
              More reading
            </p>
            <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {siblings.map((s, i) => (
              <Link
                key={s.slug}
                href={`/blog/${s.slug}`}
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10,
                    color: "var(--color-accent)",
                    opacity: 0.4,
                    letterSpacing: "0.08em",
                  }}
                >
                  {String(blogPosts.findIndex((p) => p.slug === s.slug) + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s",
                  }}
                >
                  {s.title}
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                  {s.readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ── CTA band ── */}
      <div
        className="shell"
        style={{
          padding: "5rem 1.5rem 0",
          marginTop: "5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            border: "1px solid color-mix(in srgb, var(--color-accent) 18%, rgba(255,255,255,0.07))",
            borderRadius: 2,
            background: "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface, #0c0a07))",
            padding: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 20%, transparent) 70%, transparent)",
            }}
          />

          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "-40%",
              right: "-5%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                margin: "0 0 0.75rem",
              }}
            >
              Work with us
            </p>
            <p
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              Ready to build something?
            </p>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                padding: "0.9rem 1.75rem",
                transition: "color 0.25s, border-color 0.25s",
              }}
            >
              ← More articles
            </Link>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--background)",
                background: "var(--color-accent)",
                border: "1px solid var(--color-accent)",
                borderRadius: 2,
                padding: "0.9rem 2rem",
                textDecoration: "none",
                transition: "background 0.25s, color 0.25s",
              }}
            >
              Start a project
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 960px) {
          .blog-post-body {
            grid-template-columns: 1fr !important;
          }
          .blog-post-left-sidebar,
          .blog-post-right-sidebar {
            display: none !important;
          }
          .blog-post-hero {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .blog-post-cta {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>

    </section>
  );
}