import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Badge({
  children,
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-[0.1em]",
        variant === "primary"
          ? "border-[var(--color-border)] bg-transparent text-[var(--color-accent)]"
          : "border-[var(--color-border)] bg-transparent text-[var(--color-muted)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
