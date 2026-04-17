import Link from "next/link";
import { navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--color-accent)]">
            Xevnex Technologies
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Product strategy, design systems, and engineering delivery.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--foreground)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
