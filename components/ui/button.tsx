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
        "inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-200",
        variant === "primary"
          ? "border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--background)]"
          : "border-[var(--color-border)] bg-transparent text-[var(--foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
