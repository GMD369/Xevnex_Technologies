import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyDetailPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[projectIndex + 1] ?? projects[0];

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
        {/* Atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(ellipse 65% 100% at 15% 60%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent)",
        }} />
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 80% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 80% 50%, black, transparent)",
        }} />

        <div
          className="shell"
          style={{
            position: "relative", zIndex: 1,
            padding: "6rem 1.5rem 5rem",
            display: "flex", flexDirection: "column", gap: "3rem",
          }}
        >
          {/* Back + breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/case-studies"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
                textDecoration: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M12 6.5H1M6.5 1L1 6.5l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Case studies
            </Link>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.12)", letterSpacing: "0.1em" }}>/</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              {project.client}
            </span>
          </div>

          {/* Main hero row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Client badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: 24, height: 1, background: "var(--color-accent)" }} />
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-strong)",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                  borderRadius: 3, padding: "0.3rem 0.75rem",
                }}>
                  {project.client}
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.035em",
                color: "var(--foreground)", margin: 0,
              }}>
                {project.title}
              </h1>

              {/* Summary */}
              <p style={{
                fontSize: 15, lineHeight: 1.85,
                color: "var(--color-muted)", margin: 0, maxWidth: "54ch",
              }}>
                {project.summary}
              </p>

              {/* Tags row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 2, padding: "5px 12px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Index watermark */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "flex-end", gap: "0.5rem",
              paddingBottom: "0.5rem",
            }}>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "7rem", fontWeight: 200, lineHeight: 1,
                color: "var(--color-accent)", opacity: 0.08,
                userSelect: "none", letterSpacing: "-0.05em",
              }}>
                {String(projectIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body grid ── */}
      <div
        className="shell"
        style={{ padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "4rem" }}
      >

        {/* Main content + sidebar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "4rem", alignItems: "start",
        }}>

          {/* ── Left: narrative ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>

            {/* Challenge */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10, color: "var(--color-accent)", opacity: 0.5,
                  letterSpacing: "0.1em",
                }}>01</span>
                <div style={{ width: 20, height: 1, background: "var(--color-accent)", opacity: 0.4 }} />
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
                }}>
                  The challenge
                </span>
              </div>
              <p style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                lineHeight: 1.9, color: "var(--foreground)",
                margin: 0, fontWeight: 450, letterSpacing: "-0.005em",
              }}>
                {project.challenge}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

            {/* Approach */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10, color: "var(--color-accent)", opacity: 0.5,
                  letterSpacing: "0.1em",
                }}>02</span>
                <div style={{ width: 20, height: 1, background: "var(--color-accent)", opacity: 0.4 }} />
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
                }}>
                  Our approach
                </span>
              </div>

              {/* Pull quote treatment */}
              <div style={{
                padding: "1.75rem 2rem",
                borderLeft: "2px solid var(--color-accent)",
                background: "color-mix(in srgb, var(--color-accent) 4%, transparent)",
              }}>
                <p style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                  lineHeight: 1.85, color: "var(--foreground)",
                  margin: 0, fontWeight: 450, fontStyle: "italic",
                  letterSpacing: "-0.008em",
                }}>
                  {project.approach}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

            {/* Outcome */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10, color: "var(--color-accent)", opacity: 0.5,
                  letterSpacing: "0.1em",
                }}>03</span>
                <div style={{ width: 20, height: 1, background: "var(--color-accent)", opacity: 0.4 }} />
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
                }}>
                  The outcome
                </span>
              </div>
              <p style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                lineHeight: 1.9, color: "var(--foreground)",
                margin: 0, fontWeight: 450, letterSpacing: "-0.005em",
              }}>
                {project.outcome}
              </p>
            </div>

          </div>

          {/* ── Right: sidebar ── */}
          <div style={{
            position: "sticky", top: "2rem",
            display: "flex", flexDirection: "column", gap: "1.5px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2, overflow: "hidden",
          }}>

            {/* Results panel */}
            <div style={{
              padding: "2rem",
              background: "var(--color-surface, #0c0a07)",
              display: "flex", flexDirection: "column", gap: "1.25rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 16, height: 1, background: "var(--color-accent)" }} />
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "var(--color-accent)",
                }}>
                  Results
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {project.results.map((result, i) => (
                  <div key={result} style={{
                    display: "flex", alignItems: "flex-start", gap: "0.875rem",
                    paddingBottom: "0.875rem",
                    borderBottom: i < project.results.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: 9, color: "var(--color-accent)", opacity: 0.45,
                      letterSpacing: "0.08em", flexShrink: 0, paddingTop: 2,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontSize: 13, lineHeight: 1.65,
                      color: "var(--color-muted)", letterSpacing: "0.005em",
                    }}>
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services panel */}
            <div style={{
              padding: "2rem",
              background: "var(--color-surface, #0c0a07)",
              display: "flex", flexDirection: "column", gap: "1.25rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 16, height: 1, background: "var(--color-accent)" }} />
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "var(--color-accent)",
                }}>
                  Services
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)",
                    borderRadius: 2, padding: "5px 12px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA panel */}
            <div style={{
              padding: "2rem",
              background: "color-mix(in srgb, var(--color-accent) 5%, var(--color-surface, #0c0a07))",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}>
              <p style={{
                fontSize: 13, lineHeight: 1.7,
                color: "rgba(255,255,255,0.35)", margin: 0,
              }}>
                Want results like these for your product?
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontSize: 11, fontWeight: 800, letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--background)",
                  background: "var(--color-accent)",
                  border: "1px solid var(--color-accent)",
                  borderRadius: 2, padding: "0.9rem 1.5rem",
                  textDecoration: "none",
                }}
              >
                Start a project
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* ── Next project band ── */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link
            href={`/case-studies/${nextProject.slug}`}
            style={{
              position: "relative", overflow: "hidden",
              display: "grid", gridTemplateColumns: "1fr auto",
              alignItems: "center", gap: "2rem",
              border: "1px solid color-mix(in srgb, var(--color-accent) 15%, rgba(255,255,255,0.06))",
              borderRadius: 2,
              background: "color-mix(in srgb, var(--color-accent) 3%, var(--color-surface, #0c0a07))",
              padding: "2.5rem 3rem",
              textDecoration: "none",
            }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, var(--color-accent), transparent 60%)",
              opacity: 0.4,
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.24em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
              }}>
                Next case study
              </span>
              <span style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                fontWeight: 600, letterSpacing: "-0.02em",
                color: "var(--foreground)", lineHeight: 1.2,
              }}>
                {nextProject.title}
              </span>
              <span style={{
                fontSize: 12, color: "var(--color-muted)",
              }}>
                {nextProject.client}
              </span>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--color-accent)",
              opacity: 0.7, flexShrink: 0,
            }}>
              View
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .shell [style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
          .shell [style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .shell [style*="padding: 2.5rem 3rem"] {
            padding: 1.75rem 1.5rem !important;
          }
        }
      `}</style>

    </section>
  );
}