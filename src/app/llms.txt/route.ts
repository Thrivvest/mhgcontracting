/**
 * /llms.txt, generated at build from the same data the pages use (website SEO
 * standard 6.3), so it can never say something the site does not.
 */
import { business, googleRating, SITE_URL } from "@/data/business";
import { SERVICE_AREA_TOWNS } from "@/data/service-area";
import { services } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { AREA_PAGES } from "@/lib/area-pages-data";
import { getAllFAQItems } from "@/lib/faq-data";
import { answers } from "@/data/answers";

export const dynamic = "force-static";

const strip = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export function GET() {
  const towns = SERVICE_AREA_TOWNS.map((t) => `${t.name}, ${t.state}`).join("; ");
  const lines = [
    `# ${business.name}`,
    "",
    `> ${business.name} (${business.legalName}) is a family-owned residential contractor at ${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}, run by brothers Shahzeb and Shahmi Malik with a crew of ${business.teamSize}. It remodels kitchens, bathrooms and basements and builds additions, whole-home renovations and new homes within about ${business.radiusMinutes} minutes of Hamilton. Registered New Jersey home improvement contractor #${business.hic}. Phone ${business.phone}.`,
    "",
    "## Business facts",
    "",
    `- Name: ${business.name} (${business.legalName})`,
    `- Address: ${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`,
    `- Phone: ${business.phone}`,
    `- Email: ${business.email}`,
    `- Hours: ${business.hoursText}, closed Sunday`,
    `- NJ home improvement contractor registration: #${business.hic}`,
    `- Open since: ${business.opened}`,
    `- Google rating: ${googleRating.rating} from ${googleRating.count} reviews (as of ${googleRating.checked})`,
    `- Service area: ${towns}`,
    `- Estimates: free, in home`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.shortDescription}`),
    "",
    "## Answers",
    "",
    ...answers.flatMap((a) => [`### [${a.question}](${SITE_URL}/answers/${a.slug})`, "", a.answer, ""]),
    "## Guides",
    "",
    ...BLOG_POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Service pages by town",
    "",
    ...AREA_PAGES.map((p) => `- [${p.h1}](${SITE_URL}/services/${p.serviceSlug}/${p.citySlug})`),
    "",
    "## Frequently asked questions",
    "",
    ...getAllFAQItems().flatMap((f) => [`### ${f.question}`, "", strip(f.answer), ""]),
    "## Contact",
    "",
    `- Phone: ${business.phone}`,
    `- Free estimate form: ${SITE_URL}/contact`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
