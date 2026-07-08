import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-200",
        variant === "primary"
          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)] hover:border-[var(--color-accent-strong)]"
          : "border-[var(--color-border)] bg-transparent text-[var(--foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
