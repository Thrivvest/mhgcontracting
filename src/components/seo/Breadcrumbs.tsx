/**
 * Visible breadcrumb trail plus its BreadcrumbList schema, from one source
 * (website SEO standard 2.4: breadcrumb schema only with a visible trail).
 * Rendered as a slim strip at the end of the page, above the footer, because
 * the fixed header overlays the top of every hero.
 */
import Link from "next/link";

interface Crumb {
  "@type": string;
  position: number;
  name: string;
  item: string;
}

export default function Breadcrumbs({ schema }: { schema: { itemListElement: Crumb[] } }) {
  const crumbs = schema.itemListElement;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="border-t border-border bg-white px-6 py-4 lg:px-10">
        <ol className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-2 gap-y-1 font-body text-sm text-text-secondary">
          {crumbs.map((c, i) => {
            const path = c.item.replace("https://mhgcon.com", "") || "/";
            const last = i === crumbs.length - 1;
            return (
              <li key={c.item} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-text-primary">{c.name}</span>
                ) : (
                  <Link href={path} className="hover:text-primary">{c.name}</Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
