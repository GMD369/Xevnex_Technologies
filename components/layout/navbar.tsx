"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScroll(20);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mainLinks = navLinks.filter((item) => item.href !== "/contact");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background transition-shadow duration-200",
        scrolled ? "border-divider shadow-[0_1px_0_rgba(15,42,74,0.04)]" : "border-divider",
      )}
    >
      <div className="shell flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Xevnex Technolog
          <span style={{ color: "var(--color-accent)" }}>i</span>
          es
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {mainLinks.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active
                    ? "text-accent"
                    : "text-foreground hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-3 rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors duration-200"
            style={{ background: "var(--color-accent)" }}
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          id="navbar-mobile-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-divider transition-all duration-200 hover:border-accent md:hidden"
        >
          <span
            className={cn(
              "block h-[1.5px] w-4 rounded-full bg-accent origin-center transition-all duration-300",
              menuOpen ? "translate-y-[6.5px] rotate-45" : "",
            )}
          />
          <span
            className={cn(
              "block h-[1.5px] w-4 rounded-full bg-accent transition-all duration-300",
              menuOpen ? "opacity-0 scale-x-0" : "",
            )}
          />
          <span
            className={cn(
              "block h-[1.5px] w-4 rounded-full bg-accent origin-center transition-all duration-300",
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : "",
            )}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-divider bg-background transition-all duration-300 ease-in-out md:hidden",
          menuOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none border-transparent",
        )}
      >
        <nav className="shell flex flex-col py-3">
          {mainLinks.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150",
                  active
                    ? "bg-surface text-accent"
                    : "text-foreground hover:bg-surface hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mx-4 my-2 h-px bg-divider" />

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mx-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-200"
            style={{ background: "var(--color-accent)" }}
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
