import Link from "next/link";
import { type ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function BentoCard({ children, className = "", href }: BentoCardProps) {
  const cardClasses = `group relative rounded-2xl border border-slate-800/50 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-800/40 ${className}`;

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cardClasses}>
        {children}
      </Link>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}
