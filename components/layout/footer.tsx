import Link from "next/link";
import { navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer style={{ background: "var(--color-accent-strong)" }}>
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-base font-bold tracking-[-0.01em] text-white">
            Xevnex Technologies
          </p>
          <p className="mt-2 max-w-[36ch] text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            Product strategy, design systems, and engineering delivery.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="shell py-5 text-center text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          © {new Date().getFullYear()} Xevnex Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
