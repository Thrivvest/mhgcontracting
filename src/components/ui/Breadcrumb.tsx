import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo-utils";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean; // white text for dark backgrounds
}

export default function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  const textColor = light ? "text-white/60" : "text-text-secondary";
  const activeColor = light ? "text-white/90" : "text-text-primary";
  const hoverColor = light ? "hover:text-white" : "hover:text-primary";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`flex-shrink-0 ${textColor}`}>
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {isLast ? (
                <span className={`font-body text-xs font-medium ${activeColor}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`font-body text-xs font-medium ${textColor} ${hoverColor} transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
