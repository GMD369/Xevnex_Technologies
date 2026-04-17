import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn("panel rounded-[10px] p-6 md:p-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
