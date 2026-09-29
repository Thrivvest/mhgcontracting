/**
 * One answer page (website SEO standard 6.1): the direct answer is the first
 * thing under the H1, everything is in the server render, and the FAQ schema
 * is built from the FAQs printed on the page.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import LeadForm from "@/components/sections/LeadForm";
import SourcesList from "@/components/sections/SourcesList";
import { ANSWER_CTA, answers, getAnswer } from "@/data/answers";
import { businessRef, SITE_URL } from "@/data/business";
import { SOURCES } from "@/data/sources";
import { citedSources } from "@/lib/citations";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

type Params = { slug: string };

export function generateStaticParams() {
  return answers.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const a = getAnswer((await params).slug);
  if (!a) return { title: "Page Not Found" };
  return buildSeoMetadata({ path: `/answers/${a.slug}`, title: a.metaTitle, description: a.description, ogImageAlt: a.question });
}

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function AnswerPage({ params }: { params: Promise<Params> }) {
  const a = getAnswer((await params).slug);
  if (!a) notFound();

  const path = `/answers/${a.slug}`;
  const detected = citedSources(a.answer, ...a.sections.map((s) => s.html), ...a.faqs.map((f) => f.answer));
  const sources = [...a.sources.map((id) => SOURCES[id]), ...detected.filter((d) => !a.sources.includes(d.id as never))];
  const others = answers.filter((x) => x.slug !== a.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${SITE_URL}${path}#article`,
      mainEntityOfPage: `${SITE_URL}${path}`,
      headline: a.question,
      description: a.description,
      datePublished: a.published,
      dateModified: a.updated,
      author: businessRef,
      publisher: businessRef,
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{ question: a.question, answer: a.answer }, ...a.faqs].map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>
        <section className="relative bg-[#1A1A2E] px-6 pt-28 pb-10 md:pt-40 md:pb-16 lg:px-10">
          <div className="mx-auto max-w-[760px]">
            <Link href="/answers" className="mb-5 inline-block font-body text-sm text-white/60 hover:text-white/80">All answers</Link>
            <h1 className="font-heading text-3xl font-bold leading-[1.15] text-white md:text-5xl">{a.question}</h1>
            <p className="mt-4 font-body text-sm text-white/60">Updated {fmt(a.updated)}</p>
          </div>
        </section>

        <section className="px-6 pt-10 pb-4 md:pt-14 lg:px-10">
          <div className="mx-auto max-w-[760px]">
            <div data-answer className="rounded-lg border-l-4 border-primary bg-[#F5F5FA] p-6 md:p-8">
              <p className="font-body text-lg leading-relaxed text-text-primary">{a.answer}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:py-12 lg:px-10">
          <div className="blog-content mx-auto max-w-[760px] font-body text-lg leading-relaxed text-text-secondary">
            {a.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            ))}
            <p>{ANSWER_CTA}</p>
          </div>
        </section>

        {a.faqs.length > 0 && (
          <section className="px-6 pb-8 lg:px-10">
            <div className="mx-auto max-w-[760px]">
              <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary md:text-3xl">Related questions</h2>
              <div className="space-y-6">
                {a.faqs.map((f) => (
                  <div key={f.question} className="border-b border-border pb-6">
                    <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">{f.question}</h3>
                    <p className="font-body leading-relaxed text-text-secondary">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 pb-12 lg:px-10">
          <div className="mx-auto max-w-[760px]">
            <h2 className="mb-4 font-heading text-xl font-bold text-text-primary">Keep reading</h2>
            <ul className="space-y-2 font-body">
              {a.related.map((r) => (
                <li key={r.href}><Link href={r.href} className="text-primary hover:underline">{r.label}</Link></li>
              ))}
              {others.slice(0, 2).map((o) => (
                <li key={o.slug}><Link href={`/answers/${o.slug}`} className="text-primary hover:underline">{o.question}</Link></li>
              ))}
            </ul>
            <SourcesList sources={sources} />
          </div>
        </section>

        <section id="estimate" className="scroll-mt-20 bg-[#F7F6F4] px-6 py-16 md:py-24 lg:px-10">
          <div className="mx-auto max-w-[720px]">
            <LeadForm source={`mhgcon.com ${path} embed`} heading="Planning a project?" subheading="Tell us about it. The estimate is free." />
          </div>
        </section>
      </main>
      <Breadcrumbs
        schema={buildBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Answers", href: "/answers" },
          { name: a.question, href: path },
        ])}
      />
    </>
  );
}
