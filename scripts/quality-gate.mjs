#!/usr/bin/env node
/**
 * Quality gate (website SEO standard, section 7). Runs after `next build`
 * over every prerendered page in .next/server/app and fails the build on:
 *  - title, description, canonical or H1 problems; "licensed" in title or
 *    description (MHG is a registered NJ home improvement contractor)
 *  - hidden copy, em or en dashes in visible copy
 *  - invalid JSON-LD, self-serving rating/review markup, more than one
 *    business entity, FAQ answers in schema that are not visible,
 *    breadcrumb schema without a visible trail
 *  - a statute, code section or survey cited in a page that is not in that
 *    page's visible Sources list
 *  - broken internal links, links to redirected URLs, orphan pages,
 *    redirects that point at dead routes or shadow live ones
 *  - a dollar figure typed anywhere in src/ outside src/data/costs.ts
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP = join(ROOT, ".next/server/app");
const BASE_URL = "https://mhgcon.com";
const BUSINESS_ID = `${BASE_URL}/#business`;

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"');
const count = (s, re) => (s.match(re) || []).length;
const text = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");

// Citation in the page -> text that must appear in its Sources list.
const CITATIONS = [
  [/5:23-2\.7\b/, "5:23-2.7"], [/5:23-2\.14\b/, "5:23-2.14"], [/5:23-2\.15\b/, "5:23-2.15"],
  [/5:23-2\.16\b/, "5:23-2.16"], [/5:23-2\.18\b/, "5:23-2.18"], [/13:45A-16\.2/, "13:45A-16.2"],
  [/56:8-151/, "56:8-151"], [/56:8-142/, "56:8-142"], [/56:8-13[8]|56:8-144/, "56:8-138"],
  [/40:55D-70/, "40:55D-70"], [/45:5A-9/, "45:5A-9"], [/45:14C-12\.3/, "45:14C-12.3"],
  [/International Residential Code|\bR3(?:05|10)\b/, "International Residential Code"],
  [/Houzz/, "Houzz"], [/Cost vs\. Value/, "Cost vs. Value Report"], [/NAHB/, "Constructing a Home"],
  [/American Community Survey|Census ACS/, "American Community Survey"], [/40 CFR 745/, "40 CFR 745"],
  [/DCA roster/, "Municipal Construction Code"], [/License Verification System/, "License Verification System"],
  [/54:4-63\.3/, "54:4-63.3"], [/745\.84|Renovate Right/, "745.84"],
];

// ─── Pages ───
const pages = new Map(); // path -> html
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith(".html")) {
      const rel = relative(APP, full).replace(/\.html$/, "");
      if (rel === "_global-error") continue;
      pages.set(rel === "index" ? "/" : rel === "_not-found" ? "/404" : `/${rel}`, readFileSync(full, "utf-8"));
    }
  }
};
walk(APP);
const routes = new Set([...pages.keys()].filter((p) => p !== "/404"));

function check(path, html, indexable) {
  const problems = [];
  const head = (html.match(/<head[\s\S]*?<\/head>/) || [""])[0];
  if (count(head, /<title[^>]*>/g) !== 1) problems.push(`title x${count(head, /<title[^>]*>/g)}`);
  if (count(head, /<meta[^>]*name="description"/g) !== 1) problems.push("description missing or duplicated");
  if (count(html, /<h1[\s>]/g) !== 1) problems.push(`h1 x${count(html, /<h1[\s>]/g)}`);
  if (indexable) {
    const tl = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/) || ["", ""])[1]).trim();
    const dl = decode((head.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) || ["", ""])[1]).trim();
    if (tl.length > 60) problems.push(`title is ${tl.length} chars (max 60): "${tl}"`);
    if (dl.length > 155) problems.push(`description is ${dl.length} chars (max 155)`);
    if (dl.length < 70) problems.push(`description is ${dl.length} chars (min 70)`);
    if (/licensed/i.test(tl + " " + dl)) problems.push('title or description says "licensed" (MHG is registered)');
    const canon = head.match(/<link[^>]*rel="canonical"[^>]*>/g) || [];
    const want = path === "/" ? [`"${BASE_URL}"`, `"${BASE_URL}/"`] : [`"${BASE_URL}${path}"`];
    if (canon.length !== 1) problems.push(`canonical x${canon.length}`);
    else if (!want.some((w) => canon[0].includes(w))) problems.push(`canonical is ${canon[0]}`);
    if (/name="robots" content="noindex/.test(head)) problems.push("noindex on an indexable route");
  } else if (!/name="robots" content="[^"]*noindex/.test(head)) problems.push("404 page is not noindex");

  // Hidden copy. A form honeypot (off-screen input, short label) is allowed.
  for (const m of html.matchAll(/<div[^>]*left:\s*-9999px[^>]*>([\s\S]*?)<\/div>/g)) {
    const t = text(m[1]).trim();
    if (!/<input/.test(m[1]) || t.length > 60) problems.push(`hidden-text pattern: "${t.slice(0, 60)}"`);
  }
  if (/seo-prerender|clip:\s*rect\(0/.test(html)) problems.push("hidden-text pattern (clip rect / seo-prerender)");
  for (const m of html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)) {
    if (text(m[1]).trim().length > 60) problems.push("noscript body copy");
  }
  // Writing rule: no em or en dashes in visible copy. Verbatim review quotes are exempt.
  const copy = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<head[\s\S]*?<\/head>/, "");
  if (/[–—]/.test(copy) || /&mdash;|&ndash;/.test(copy)) {
    const at = copy.search(/[–—]|&mdash;|&ndash;/);
    problems.push(`em/en dash in copy: "${text(copy.slice(Math.max(0, at - 60), at + 20))}"`);
  }

  // Structured data.
  const nodes = [];
  for (const block of html.match(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) || []) {
    try {
      const data = JSON.parse(block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, ""));
      const w = (n) => {
        if (Array.isArray(n)) return n.forEach(w);
        if (n && typeof n === "object") {
          if (n["@type"]) nodes.push(n);
          Object.values(n).forEach(w);
        }
      };
      w(data);
    } catch {
      problems.push("invalid JSON-LD");
    }
  }
  const types = nodes.map((n) => [].concat(n["@type"]).join("/"));
  if (types.some((t) => /AggregateRating|^Review$/.test(t))) problems.push("self-serving rating/review markup");
  if (indexable && nodes.filter((n) => n["@id"] === BUSINESS_ID && n.name).length !== 1) problems.push("business entity not declared exactly once");
  const extra = nodes.filter((n) => /LocalBusiness|GeneralContractor|HomeAndConstructionBusiness|Organization/.test([].concat(n["@type"]).join("/")) && n["@id"] !== BUSINESS_ID && !/GovernmentOrganization/.test(n["@type"]));
  if (extra.length) problems.push(`extra business node(s): ${extra.map((n) => n["@type"]).join(", ")}`);
  if (count(html, /"@type":"FAQPage"/g) > 1) problems.push("FAQPage x" + count(html, /"@type":"FAQPage"/g));
  const body = text((html.match(/<body[\s\S]*<\/body>/) || [""])[0]);
  for (const q of nodes.filter((n) => n["@type"] === "Question")) {
    const a = decode(String(q.acceptedAnswer?.text ?? "")).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!body.includes(a.slice(0, 80))) problems.push(`FAQ answer not visible: "${String(q.name).slice(0, 60)}"`);
  }
  const crumbs = nodes.filter((n) => n["@type"] === "BreadcrumbList");
  if (crumbs.length > 1) problems.push(`BreadcrumbList x${crumbs.length}`);
  if (crumbs.length === 1 && !/aria-label="Breadcrumb"/.test(html)) problems.push("BreadcrumbList without a visible breadcrumb");
  if (indexable && path !== "/" && crumbs.length === 0) problems.push("no BreadcrumbList / visible trail");

  // Answer pages open with a 40 to 60 word direct answer (standard 6.1).
  const box = html.match(/<div data-answer[^>]*>([\s\S]*?)<\/div>/);
  if (path.startsWith("/answers/")) {
    if (!box) problems.push("answer page without a direct-answer box");
    else {
      const n = text(box[1]).trim().split(/\s+/).length;
      if (n < 40 || n > 60) problems.push(`direct answer is ${n} words (40 to 60)`);
    }
  }

  // Cited sources must be listed.
  if (indexable) {
    const main = (html.match(/<main[\s\S]*<\/main>/) || [""])[0];
    const srcBlocks = (main.match(/<div data-sources[\s\S]*?<\/ol><\/div>/g) || []).join(" ");
    const mainText = text(main.replace(/<div data-sources[\s\S]*?<\/ol><\/div>/g, " "));
    const sources = text(srcBlocks);
    for (const [cite, needle] of CITATIONS) {
      if (cite.test(mainText) && !sources.includes(needle)) problems.push(`cites ${needle} but its Sources list does not`);
    }
  }
  return problems;
}

const failures = [];
for (const [path, html] of pages) {
  const p = check(path, html, path !== "/404");
  if (p.length) failures.push(`${path}: ${p.join("; ")}`);
}

// ─── Links and redirects ───
const config = readFileSync(join(ROOT, "next.config.ts"), "utf-8");
const redirects = [...config.matchAll(/\{ source: "([^"]+)",(?: has: \[[^\]]*\],)? destination: "([^"]+)"/g)].map((m) => ({ source: m[1], destination: m[2] }));
const redirected = new Map(redirects.filter((r) => !r.source.includes(":")).map((r) => [r.source, r.destination]));
const inbound = new Map();
for (const [from, html] of pages) {
  const body = (html.match(/<body[\s\S]*<\/body>/) || [""])[0].replace(/<script[\s\S]*?<\/script>/g, "");
  for (const m of body.matchAll(/href="(\/[^"#?]*)/g)) {
    const link = m[1].length > 1 ? m[1].replace(/\/$/, "") : m[1];
    if (routes.has(link)) {
      if (link !== from) inbound.set(link, (inbound.get(link) || 0) + 1);
      continue;
    }
    if (link.startsWith("/api/") || link.startsWith("/_next/") || existsSync(join(ROOT, "public", link))) continue;
    if (["/sitemap.xml", "/robots.txt", "/llms.txt"].includes(link)) continue;
    if (redirected.has(link)) failures.push(`${from}: links to redirected ${link} (link ${redirected.get(link)} directly)`);
    else failures.push(`${from}: broken internal link ${link}`);
  }
}
for (const [src, dest] of redirected) {
  if (routes.has(src)) failures.push(`${src} is redirected but still a live route`);
  if (!dest.startsWith("http") && !routes.has(dest)) failures.push(`redirect ${src} -> ${dest}, which is not a live route`);
}
for (const path of routes) {
  if (path !== "/" && !inbound.get(path)) failures.push(`${path}: orphan page (no internal links point to it)`);
}

// ─── Sitemap lists every indexable route, and nothing else ───
{
  const sm = ["sitemap.xml.body", "sitemap.xml"].map((f) => join(APP, f)).find((f) => existsSync(f));
  if (!sm) failures.push("sitemap.xml not found in the build");
  else {
    const locs = new Set([...readFileSync(sm, "utf-8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(BASE_URL, "") || "/"));
    for (const r of routes) if (!locs.has(r)) failures.push(`${r}: missing from sitemap.xml`);
    for (const l of locs) if (!routes.has(l)) failures.push(`sitemap.xml lists ${l}, which is not a live route`);
  }
}

// ─── One price sheet ───
const PRICE_EXEMPT = new Set(["src/data/costs.ts", "src/data/gbp-reviews.json"]);
const walkSrc = (dir) => {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`;
    if (e.isDirectory()) walkSrc(rel);
    else if (/\.(tsx?|json)$/.test(e.name) && !PRICE_EXEMPT.has(rel)) {
      const hits = readFileSync(join(ROOT, rel), "utf-8").match(/\$\d{1,3}(,\d{3})+|\$\d{3,}|\$\d+(\.\d+)?k\b/gi);
      if (hits) failures.push(`${rel}: hard-coded price(s) ${[...new Set(hits)].slice(0, 3).join(", ")} (use src/data/costs.ts)`);
    }
  }
};
walkSrc("src");

if (failures.length) {
  console.error(`\nQuality gate failed on ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\nQuality gate passed: ${routes.size} routes + 404.\n`);
