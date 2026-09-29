import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { answers } from "@/data/answers";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";
import { pageNode } from "@/lib/schema";
import SourcesList from "@/components/sections/SourcesList";
import { citedSources } from "@/lib/citations";

export const metadata: Metadata = buildSeoMetadata({
  path: "/answers",
  title: "Renovation Answers for NJ Homeowners | MHG Contracting",
  description:
    "Short, sourced answers to the questions New Jersey homeowners ask before a renovation: contracts, permits, lead paint, basements, taxes and resale.",
  ogImageAlt: "Renovation answers from MHG Contracting",
});

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Answers", href: "/answers" },
]);

export default function AnswersHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageNode("CollectionPage", {
              name: "Renovation answers for New Jersey homeowners",
              path: "/answers",
              description: String(metadata.description ?? ""),
            }),
          ),
        }}
      />
      <main>
        <section className="relative bg-[#1A1A2E] px-6 pt-28 pb-12 md:pt-40 md:pb-20 lg:px-10">
          <div className="mx-auto max-w-[900px]">
            <span className="mb-4 block font-body text-xs font-medium uppercase tracking-[0.15em] text-white/60">Answers</span>
            <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white md:text-6xl">Renovation answers for New Jersey homeowners</h1>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-white/80">
              One question per page, answered first, with the New Jersey rule or published survey behind it. For costs by project, see the cost guides on the <Link href="/blog" className="underline">blog</Link>.
            </p>
          </div>
        </section>
        <section className="px-6 py-14 md:py-20 lg:px-10">
          <ul className="mx-auto grid max-w-[900px] gap-5">
            {answers.map((a) => (
              <li key={a.slug} className="rounded-lg border border-border bg-white p-6 md:p-8">
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  <Link href={`/answers/${a.slug}`} className="hover:text-primary">{a.question}</Link>
                </h2>
                <p className="mt-3 font-body leading-relaxed text-text-secondary">{a.answer}</p>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-[900px]">
            <SourcesList sources={citedSources(...answers.map((a) => a.answer))} />
          </div>
        </section>
      </main>
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
