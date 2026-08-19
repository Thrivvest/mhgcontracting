/**
 * SEO Content Generator - Auto-generate keyword-rich HTML for SeoPrerender blocks
 *
 * These functions produce structured, keyword-rich HTML from existing data
 * for each dynamic page type. The content is injected via SeoPrerender and
 * is visible to search engine crawlers in the static HTML.
 */

import type { Service } from "@/lib/data";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import type { PortfolioProject } from "@/lib/data";
import type { AreaPage } from "@/lib/area-pages-data";
import { SERVICE_BLOG_MAP } from "@/lib/seo-utils";

const COMPANY = "MHG Contracting";
const LOCATION = "Hamilton, NJ";
const PHONE = "(609) 712-2474";
const CITIES = ["Hamilton", "Princeton", "West Windsor", "Lawrenceville", "Plainsboro", "Yardley"];

/**
 * Map service type slugs to human-readable names for SEO content
 */
const SERVICE_TYPE_LABELS: Record<string, string> = {
  kitchen: "Kitchen Renovation",
  bathroom: "Bathroom Renovation",
  basement: "Basement Finishing",
  "full-renovation": "Full Home Renovation",
  addition: "Home Addition",
  "new-construction": "New Construction",
};

/**
 * Anchor text for related cost-guide links, matched to the striking-distance
 * GSC query each post is closest to ranking for. Falls back to the post
 * title when a service's related post has no override.
 */
const RELATED_BLOG_ANCHOR_TEXT: Record<string, string> = {
  "kitchen-remodel-cost": "kitchen remodel cost in NJ",
  "bathroom-remodel-cost": "average bathroom remodel cost in Hamilton, NJ",
};

/**
 * Generate keyword-rich SEO content for a service detail page
 */
export function generateServiceSeoContent(service: Service): string {
  const scopeList = service.scopeItems
    .map((item) => `<li>${item}</li>`)
    .join("\n");

  const faqSection = service.faqs
    .map(
      (faq) => `
      <h3>${faq.question}</h3>
      <p>${faq.answer}</p>`
    )
    .join("\n");

  const cityMentions = CITIES.map(
    (city) => `${service.name} in ${city}`
  ).join(", ");

  const relatedPosts = (SERVICE_BLOG_MAP[service.slug] ?? [])
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));

  const costGuideSection = relatedPosts.length
    ? `
      <h2>${service.name} Cost Guides</h2>
      <p>${relatedPosts
        .map(
          (p) =>
            `<a href="/blog/${p.slug}">${RELATED_BLOG_ANCHOR_TEXT[p.slug] ?? p.title}</a>`
        )
        .join(" &middot; ")}</p>`
    : "";

  return `
    <article>
      <h2>${service.name} by ${COMPANY} | Central New Jersey</h2>
      <p>${COMPANY} provides expert ${service.name.toLowerCase()} services for homeowners throughout Central New Jersey. Based in ${LOCATION}, our family-owned team specializes in ${service.shortDescription.toLowerCase()} We serve ${CITIES.join(", ")}, and the surrounding communities.</p>

      <h2>About Our ${service.name} Services</h2>
      <p>${service.description}</p>

      <h2>What's Included in Our ${service.name}</h2>
      <ul>${scopeList}</ul>

      <h2>Frequently Asked Questions: ${service.name}</h2>
      ${faqSection}
      ${costGuideSection}

      <h2>Service Areas for ${service.name}</h2>
      <p>${COMPANY} provides ${service.name.toLowerCase()} throughout Central New Jersey, including ${cityMentions}. Contact us at ${PHONE} for a free estimate.</p>

      <h2>Why Choose ${COMPANY} for Your ${service.name}?</h2>
      <p>${COMPANY} is a family-owned residential contracting company based in ${LOCATION}. We bring a hands-on approach to every project. From the initial consultation through project completion, you work directly with the people building your space. Our commitment to quality craftsmanship, transparent communication, and fair pricing has earned us the trust of homeowners across Central New Jersey.</p>

      <p>Ready to start your ${service.name.toLowerCase()} project? Call ${COMPANY} at ${PHONE} or visit our website to schedule your free in-home consultation.</p>
    </article>
  `;
}

/**
 * Generate keyword-rich SEO content for a blog post page
 */
export function generateBlogSeoContent(post: BlogPost): string {
  return `
    <article>
      <h2>${post.title}</h2>
      <p>Published on ${post.date} by ${COMPANY} | ${post.readTime} | Category: ${post.category}</p>
      <p>${post.excerpt}</p>

      <h2>About This Article</h2>
      <p>This article from ${COMPANY} covers important information about ${post.category.toLowerCase()} projects for Central New Jersey homeowners. Whether you're planning a renovation in Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, or Yardley, ${COMPANY} provides expert guidance and professional contracting services to help you make informed decisions about your home improvement project.</p>

      <h2>About ${COMPANY}</h2>
      <p>${COMPANY} is a family-owned residential contracting company based in ${LOCATION}, specializing in kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction. We serve homeowners throughout Central New Jersey and Bucks County, PA. Contact us at ${PHONE} for a free estimate.</p>

      <p>Read more articles on our <a href="/blog">blog</a> or explore our <a href="/portfolio">portfolio</a> to see examples of our work throughout Central New Jersey.</p>
    </article>
  `;
}

/**
 * Generate keyword-rich SEO content for a portfolio project page
 */
export function generatePortfolioSeoContent(project: PortfolioProject): string {
  const typeLabel = SERVICE_TYPE_LABELS[project.type] || project.type;

  return `
    <article>
      <h2>${project.title} - ${typeLabel} in ${project.location} | ${COMPANY} Portfolio</h2>
      <p>${project.description}</p>

      <h2>Project Details</h2>
      <ul>
        <li><strong>Project:</strong> ${project.title}</li>
        <li><strong>Type:</strong> ${typeLabel}</li>
        <li><strong>Location:</strong> ${project.location}</li>
        <li><strong>Year Completed:</strong> ${project.year}</li>
        <li><strong>Contractor:</strong> ${COMPANY}, ${LOCATION}</li>
      </ul>

      <h2>About This ${typeLabel} Project</h2>
      <p>${COMPANY} completed this ${typeLabel.toLowerCase()} project in ${project.location} in ${project.year}. ${project.description} This project demonstrates our commitment to quality craftsmanship and attention to detail in every ${typeLabel.toLowerCase()} we undertake.</p>

      <h2>${typeLabel} Services by ${COMPANY}</h2>
      <p>Looking for a similar transformation for your home? ${COMPANY} provides expert ${typeLabel.toLowerCase()} services throughout Central New Jersey, including ${CITIES.join(", ")}, and beyond. Contact us at ${PHONE} to schedule your free in-home consultation and discuss your project vision.</p>

      <p>Browse more projects in our <a href="/portfolio">${COMPANY} portfolio</a> or learn about our <a href="/services">full range of services</a>.</p>
    </article>
  `;
}

/**
 * Generate keyword-rich SEO content for a geo-targeted area page
 */
export function generateAreaSeoContent(page: AreaPage): string {
  const faqSection = page.faqs
    .map(
      (faq) => `
      <h3>${faq.question}</h3>
      <p>${faq.answer}</p>`
    )
    .join("\n");

  return `
    <article>
      <h2>${page.h1}</h2>
      <p>${page.metaDescription}</p>

      <h2>${page.serviceName} Services in ${page.cityName}, ${page.state}</h2>
      <p>${COMPANY} provides professional ${page.serviceName.toLowerCase()} services for homeowners in ${page.cityName}, ${page.state}. As a family-owned contracting company based in ${LOCATION}, we are committed to delivering quality craftsmanship and personal service to every ${page.cityName} project. Call us at ${PHONE} for a free in-home estimate.</p>

      <h2>Frequently Asked Questions: ${page.serviceName} in ${page.cityName}</h2>
      ${faqSection}

      <h2>About ${COMPANY}</h2>
      <p>${COMPANY} is a family-owned residential contracting company specializing in kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction. From our base in ${LOCATION}, we serve homeowners in ${CITIES.join(", ")}, and surrounding communities in Central New Jersey and Bucks County, PA.</p>

      <p>Ready to start your ${page.serviceName.toLowerCase()} project in ${page.cityName}? <a href="/contact">Contact ${COMPANY}</a> today or call ${PHONE} to schedule your free consultation.</p>
    </article>
  `;
}
