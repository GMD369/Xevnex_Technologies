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
    <header className="sticky top-0 z-50 px-4 py-4">
      <div
        className={cn(
          "shell flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-300",
          scrolled
            ? "border-accent bg-surface shadow-[0_4px_32px_rgba(201,148,58,0.12)] backdrop-blur-md"
            : "border-transparent bg-background backdrop-blur-sm",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
          style={{ color: "#fff" }}
        >
          Xevnex Technologies
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
                  "rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] transition-all duration-200",
                  active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-transparent text-foreground hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-2 rounded-full border border-accent px-5 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-accent transition-all duration-200 hover:bg-accent hover:text-background"
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
          className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-accent/40 transition-all duration-200 hover:border-accent md:hidden"
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
          "shell mt-2 overflow-hidden rounded-2xl border border-accent/30 bg-surface/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden",
          menuOpen
            ? "max-h-[400px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none border-transparent",
        )}
      >
        <nav className="flex flex-col px-2 py-3">
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
                  "rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-150",
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-accent/5 hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mx-4 my-2 h-px bg-accent/15" />

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mx-2 rounded-full border border-accent px-4 py-2.5 text-center text-sm font-medium uppercase tracking-[0.1em] text-accent transition-all duration-200 hover:bg-accent hover:text-background"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
