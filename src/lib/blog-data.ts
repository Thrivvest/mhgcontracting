/**
 * Blog post data — shared between index and detail pages
 *
 * Exported as a plain data module (no "use client") so it can be
 * consumed by both server-side generateStaticParams and client components.
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-things-to-consider-before-kitchen-renovation",
    title: "5 Things to Consider Before Your Kitchen Renovation",
    date: "March 15, 2026",
    excerpt: "Planning a kitchen renovation? Before you start picking countertops, here are the five most important decisions that will shape your entire project — and how to get each one right.",
    category: "Kitchen",
    readTime: "5 min read",
  },
  {
    slug: "how-long-does-bathroom-remodel-take",
    title: "How Long Does a Bathroom Remodel Take?",
    date: "March 8, 2026",
    excerpt: "One of the most common questions we hear. The answer depends on scope, materials, and complexity. Here's an honest, detailed timeline breakdown from our team.",
    category: "Bathroom",
    readTime: "4 min read",
  },
  {
    slug: "choosing-the-right-contractor",
    title: "Choosing the Right Contractor: What to Look For",
    date: "February 28, 2026",
    excerpt: "Not all contractors are created equal. Learn what separates a great contractor from the rest, the questions you should ask, and the red flags to watch out for.",
    category: "Tips",
    readTime: "6 min read",
  },
  {
    slug: "basement-finishing-guide-central-nj",
    title: "The Complete Guide to Basement Finishing in Central NJ",
    date: "February 20, 2026",
    excerpt: "Your basement is the biggest untapped space in your home. Here's everything you need to know about turning it into a beautiful, functional living area.",
    category: "Basement",
    readTime: "7 min read",
  },
  {
    slug: "kitchen-renovation-cost-breakdown",
    title: "Kitchen Renovation Cost Breakdown: What to Expect",
    date: "February 10, 2026",
    excerpt: "We break down the real costs of a kitchen renovation in Central New Jersey — from cabinetry and countertops to plumbing and permits.",
    category: "Kitchen",
    readTime: "5 min read",
  },
  {
    slug: "why-we-love-what-we-do",
    title: "Why We Love What We Do",
    date: "January 30, 2026",
    excerpt: "Shahzeb shares what drives MHG Contracting — from the satisfaction of a perfect finish to the relationships we build with homeowners.",
    category: "About",
    readTime: "3 min read",
  },
];
