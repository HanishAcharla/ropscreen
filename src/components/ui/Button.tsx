import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
}

const variants = {
  primary:
    "bg-[image:var(--gradient-coral)] text-[#180a04] shadow-[0_0_0_1px_rgba(255,122,82,0.4),0_8px_30px_-8px_rgba(255,122,82,0.55)] hover:shadow-[0_0_0_1px_rgba(255,122,82,0.6),0_12px_40px_-6px_rgba(255,122,82,0.7)] hover:-translate-y-0.5",
  secondary:
    "bg-white/[0.04] text-foreground border border-border hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5",
  ghost: "text-muted hover:text-foreground",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out active:translate-y-0";

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
}: BaseProps & { href?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (href.startsWith("http") || href.startsWith("/") === false) {
      return (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
