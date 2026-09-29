/**
 * The cost guides, rebuilt 2026-09-28 on published sources (website SEO
 * standard 5.1, 5.4 and 6.1). Rules for this file:
 *  - Every dollar figure comes from data/costs.ts through money() or k().
 *    The build fails on a dollar amount typed here.
 *  - Every statute, survey or dataset named in a post is in its `sources`.
 *  - Cost vs. Value figures appear only in sentences, never in a table
 *    (license terms in data/costs.ts).
 *  - Nothing about MHG beyond data/business.ts and the intake form: no job
 *    counts, response times, warranties or "our average" numbers.
 */
import type { BlogPost } from "@/lib/blog-data";
import { business } from "@/data/business";
import {
  CVV, CVV_CITE, HOUZZ, HOUZZ_HOUSEHOLD, HOUZZ_ROOM_MEDIAN, HOUZZ_STUDY, HOUZZ_TIME, NAHB, NJ_HIC_MIN_LIABILITY, NJ_WRITTEN_CONTRACT_OVER, k, money,
} from "@/data/costs";
import { HOUSING, PERMIT_OFFICES, townHousing, townOffices } from "@/data/sources";
import { SERVICE_AREA_TOWNS } from "@/data/service-area";

const HAMILTON = townHousing("hamilton-nj")!;
const HAMILTON_OFFICE = townOffices("hamilton-nj")[0];
const MERCER_TOWNS = ["hamilton-nj", "ewing-nj", "princeton-nj", "lawrenceville-nj", "hopewell-nj", "east-windsor-nj", "plainsboro-nj", "west-windsor-nj", "robbinsville-nj"];

/** Census housing-age table for a set of town slugs. */
function housingTable(slugs: string[], caption: string): string {
  const rows = slugs
    .map((s) => townHousing(s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .map((h) => `<tr><td>${h.geography}</td><td>${h.medianYearBuilt}</td><td>${h.pctBuiltBefore1980}%</td></tr>`)
    .join("");
  return `<div class="cost-table-wrap"><table class="cost-table"><caption>${caption}</caption><thead><tr><th>Town</th><th>Median year built</th><th>Built before 1980</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

/** Construction offices for every NJ town MHG serves (DCA roster). */
function officesTable(): string {
  const rows = SERVICE_AREA_TOWNS.filter((t) => t.state === "NJ")
    .flatMap((t) => townOffices(`${t.name.toLowerCase().replace(/ /g, "-")}-nj`))
    .map((o) => `<tr><td>${o.municipality}</td><td>${o.street}, ${o.city}</td><td>${o.phone}</td></tr>`)
    .join("");
  return `<div class="cost-table-wrap"><table class="cost-table"><caption>Construction offices near Hamilton (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf})</caption><thead><tr><th>Municipality</th><th>Address</th><th>Phone</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

const PROCESS = `<ol>
<li>A short phone call to hear what you want and set up a visit.</li>
<li>A first meeting at your house to walk the space.</li>
<li>A written preconstruction estimate.</li>
<li>A second pass through the estimate together to settle scope and finishes.</li>
<li>A deposit, then the final plan, budget and schedule before work starts.</li>
<li>Week-by-week progress updates while the work is underway.</li>
<li>A final walkthrough with you before the last payment.</li>
</ol>`;

const notOurPrices = (what: string) =>
  `No. They are published survey figures. MHG prices every ${what} after a free in-home estimate, because the room, the house and your finish choices decide the number.`;

export const GUIDES: Record<string, BlogPost> = {
  "bathroom-remodel-cost": {
    slug: "bathroom-remodel-cost",
    seoTitle: "Average Bathroom Remodel Cost in Hamilton, NJ (2026)",
    title: "What Does a Bathroom Remodel Cost in Hamilton, NJ? (2026)",
    date: "September 28, 2026",
    excerpt: "What published surveys say a bathroom remodel costs near Hamilton, what moves the price in an older Mercer County house, and how permits and timing work.",
    metaDescription: `Bathroom remodel cost near Hamilton, NJ: Houzz 2026 medians of ${k(HOUZZ.bathSmall.median)} to ${k(HOUZZ.bathLarge.median)} for a major primary bath, plus permits, timing and what moves the price.`,
    category: "Bathroom",
    readTime: "6 min read",
    sources: ["houzz", "cvv", "acs", "njConstructionOffices", "njPermits", "njOrdinaryMaintenance", "epaRrp"],
    content: `
<p><strong>A full midrange bathroom remodel in the Middle Atlantic region, which includes Hamilton, costs about ${money(CVV.bath.jobCost)}, ${CVV_CITE}. Nationally, homeowners spent a median of ${money(HOUZZ.bathSmall.median)} on a major remodel of a small bathroom (under 100 square feet) and ${money(HOUZZ.bathLarge.median)} on a larger one in 2025, according to the ${HOUZZ_STUDY}.</strong></p>

<p>Those are the most reliable public numbers for a bathroom near Hamilton. Nobody publishes a Hamilton-only survey, and any contractor quoting you "the Hamilton average" is quoting their own jobs. Below is what the surveys say, what pushes a bathroom above or below them, and how the permit side works in Hamilton Township.</p>

<h2>What bathroom remodels cost in 2025</h2>
<p>The ${HOUZZ_STUDY} asked U.S. homeowners what they spent on bathroom projects in 2025. It counts a "major" primary bath remodel as one that replaced at least the vanity, countertops and toilet.</p>
<div class="cost-table-wrap"><table class="cost-table">
<caption>Major primary bathroom remodels, U.S., 2025 (${HOUZZ_STUDY})</caption>
<thead><tr><th>Bathroom size</th><th>Median spend</th><th>Top 10% spent</th></tr></thead>
<tbody>
<tr><td>Under 100 sq ft</td><td>${money(HOUZZ.bathSmall.median)}</td><td>${money(HOUZZ.bathSmall.p90)} or more</td></tr>
<tr><td>100 sq ft or more</td><td>${money(HOUZZ.bathLarge.median)}</td><td>${money(HOUZZ.bathLarge.p90)} or more</td></tr>
</tbody>
</table></div>
<p>Smaller jobs pull the averages down a lot. Counting every bathroom project of any size, the median spend in 2025 was ${money(HOUZZ_ROOM_MEDIAN.primaryBath)} for a primary bath and ${money(HOUZZ_ROOM_MEDIAN.guestBath)} for a guest bath, according to the same study. Those medians include refreshes like a new vanity and paint.</p>
<p>For our region specifically, a midrange bathroom remodel costs about ${money(CVV.bath.jobCost)}, ${CVV_CITE}. That report prices a defined job: updating a 5-by-7-foot bathroom with a new tub and tile surround, toilet, vanity, tile floor and fixtures.</p>

<h2>Small bathroom remodel cost</h2>
<p>For a bathroom under 100 square feet, the median major remodel (at least a new vanity, countertop and toilet) cost ${money(HOUZZ.bathSmall.median)} in 2025, and the top 10% of homeowners spent ${money(HOUZZ.bathSmall.p90)} or more (${HOUZZ_STUDY}). A lighter refresh costs less: the median guest bathroom project of any scope was ${money(HOUZZ_ROOM_MEDIAN.guestBath)}. A powder room with no tub or shower usually sits at the low end, because it has the least tile and plumbing.</p>

<h2>Full bathroom remodel cost</h2>
<p>A full bathroom has a tub or shower, a toilet and a vanity. The closest published figure is the midrange bathroom remodel in the Remodeling 2025 Cost vs. Value Report: a new tub with a tile surround, toilet, vanity, tile floor and fixtures in a 5-by-7-foot room. It costs about ${money(CVV.bath.jobCost)} in the Middle Atlantic region, ${CVV_CITE}. Larger primary bathrooms with a separate shower and a double vanity run higher: the median major remodel of a bathroom 100 square feet or larger was ${money(HOUZZ.bathLarge.median)} in 2025 (${HOUZZ_STUDY}).</p>

<h2>What moves the price of a bathroom</h2>
<ul>
<li><strong>Size and layout.</strong> Keeping the toilet, tub and sink where they are is the cheapest path. Moving a drain means new plumbing and a permit.</li>
<li><strong>How much tile.</strong> A tiled floor and tub surround costs far less than floor-to-ceiling tile, a curbless shower and a built-in niche or bench.</li>
<li><strong>The shower system.</strong> A single valve and showerhead is one price. A rain head, handheld and body sprays, plus frameless glass, is another.</li>
<li><strong>Fixtures and vanity.</strong> A stock vanity and a custom one with a stone top can differ by thousands on their own.</li>
<li><strong>What is behind the walls.</strong> In an older house, opening a wall can turn up work nobody could see at the estimate.</li>
</ul>

<h2>Hamilton homes are older than they look</h2>
<p>The median home in ${HAMILTON.geography} was built in ${HAMILTON.medianYearBuilt}, and ${HAMILTON.pctBuiltBefore1980}% of its ${HAMILTON.housingUnits.toLocaleString("en-US")} homes were built before 1980, according to the Census Bureau's American Community Survey (${HOUSING.release}). That matters for a bathroom in two ways. Older walls and plumbing are more likely to need work once opened. And in a home built before 1978, federal rules require lead-safe work practices when a renovation disturbs painted surfaces (EPA, 40 CFR 745).</p>
${housingTable(MERCER_TOWNS, `Housing age near Hamilton (Census ${HOUSING.release})`)}

<h2>Permits for a bathroom in Hamilton Township</h2>
<p>Swapping a fixture for a similar one without changing the pipes, or replacing a faucet or shower valve, is ordinary maintenance under N.J.A.C. 5:23-2.7 and needs no permit. Moving a drain or supply line, adding a circuit or changing the layout is not, and needs a construction permit under N.J.A.C. 5:23-2.14.</p>
<p>In Hamilton, permits come from the ${HAMILTON_OFFICE.municipality} construction office at ${HAMILTON_OFFICE.street}, ${HAMILTON_OFFICE.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}).</p>

<h2>How long a bathroom remodel takes</h2>
<p>Primary bathroom projects averaged ${HOUZZ_TIME.primaryBath.plan} months of planning and ${HOUZZ_TIME.primaryBath.build} months of construction across the U.S. in 2025, according to the ${HOUZZ_STUDY}. Those averages include do-it-yourself projects, which run long. A contractor-run bathroom is set by the scope, the permit and how quickly finishes arrive.</p>

<h2>How MHG prices your bathroom</h2>
<p>MHG Contracting is a family-owned contractor at ${business.address.street} in Hamilton. Every bathroom gets a free in-home estimate, and the process runs like this:</p>
${PROCESS}
<p>See finished bathrooms in the <a href="/portfolio">portfolio</a>, or read about <a href="/services/bathroom-renovations">bathroom renovations with MHG</a>.</p>
`,
    faqs: [
      {
        question: "What is the average cost of a bathroom remodel in Hamilton, NJ?",
        answer: `No survey publishes a Hamilton-only figure. For the Middle Atlantic region, a midrange bathroom remodel costs about ${money(CVV.bath.jobCost)}, ${CVV_CITE}. Nationally, the median major primary bath remodel was ${money(HOUZZ.bathSmall.median)} under 100 square feet and ${money(HOUZZ.bathLarge.median)} for larger rooms in 2025 (${HOUZZ_STUDY}).`,
      },
      {
        question: "How much does a full bathroom remodel cost in Hamilton, NJ?",
        answer: `A midrange full bathroom remodel (new tub and tile surround, toilet, vanity, tile floor and fixtures) costs about ${money(CVV.bath.jobCost)} in the Middle Atlantic region, ${CVV_CITE}. Larger primary bathrooms cost more: the 2025 median for rooms 100 square feet or larger was ${money(HOUZZ.bathLarge.median)} (${HOUZZ_STUDY}).`,
      },
      {
        question: "How much does a small bathroom remodel cost in Hamilton, NJ?",
        answer: `A major remodel of a primary bath under 100 square feet had a median cost of ${money(HOUZZ.bathSmall.median)} in 2025, and the top 10% spent ${money(HOUZZ.bathSmall.p90)} or more (${HOUZZ_STUDY}). Guest bath projects of any scope had a median of ${money(HOUZZ_ROOM_MEDIAN.guestBath)}.`,
      },
      {
        question: "Does a bathroom remodel pay off when you sell?",
        answer: `Partly. A midrange bathroom remodel recoups about ${CVV.bath.recouped}% of its cost at resale in the Middle Atlantic region, ${CVV_CITE}.`,
      },
      {
        question: "Do I need a permit to remodel a bathroom in Hamilton?",
        answer: "It depends on the work. Like-for-like fixture swaps and new faucets or shower valves are ordinary maintenance under N.J.A.C. 5:23-2.7. Moving plumbing, adding circuits or changing the layout needs a construction permit (N.J.A.C. 5:23-2.14) from the Hamilton Township construction office.",
      },
      {
        question: "Are these MHG's prices?",
        answer: notOurPrices("bathroom"),
      },
    ],
  },

  "kitchen-remodel-cost": {
    slug: "kitchen-remodel-cost",
    seoTitle: `Kitchen Remodel Cost in NJ (2026): ${k(HOUZZ.kitchenSmall.median)} to ${k(HOUZZ.kitchenLarge.median)} Median`,
    title: "What Does a Kitchen Remodel Cost in New Jersey? (2026)",
    date: "September 28, 2026",
    excerpt: "What published surveys say a kitchen remodel costs in New Jersey, minor versus major, resale, and what moves the price in an older Central NJ house.",
    metaDescription: `Kitchen remodel cost in NJ: Houzz 2026 medians of ${k(HOUZZ.kitchenSmall.median)} to ${k(HOUZZ.kitchenLarge.median)} for a major remodel, Middle Atlantic resale data, permits and timing.`,
    category: "Kitchen",
    readTime: "7 min read",
    sources: ["houzz", "cvv", "acs", "njConstructionOffices", "njPermits", "njOrdinaryMaintenance", "epaRrp"],
    content: `
<p><strong>Nationally, homeowners spent a median of ${money(HOUZZ.kitchenSmall.median)} on a major kitchen remodel under 200 square feet and ${money(HOUZZ.kitchenLarge.median)} on a larger one in 2025, according to the ${HOUZZ_STUDY}. In the Middle Atlantic region, which includes New Jersey, a midrange major kitchen remodel costs about ${money(CVV.majorKitchen.jobCost)}, ${CVV_CITE}.</strong></p>

<p>Those are the best public numbers for a New Jersey kitchen. No survey publishes a New Jersey-only kitchen figure. Here is what the surveys measure, what moves a kitchen up or down, and what Central New Jersey's older housing adds to the picture.</p>

<h2>What kitchen remodels cost in 2025</h2>
<p>The ${HOUZZ_STUDY} counts a "major" kitchen remodel as one that replaced at least all the cabinets and appliances.</p>
<div class="cost-table-wrap"><table class="cost-table">
<caption>Major kitchen remodels, U.S., 2025 (${HOUZZ_STUDY})</caption>
<thead><tr><th>Kitchen size</th><th>Median spend</th><th>Top 10% spent</th></tr></thead>
<tbody>
<tr><td>Under 200 sq ft</td><td>${money(HOUZZ.kitchenSmall.median)}</td><td>${money(HOUZZ.kitchenSmall.p90)} or more</td></tr>
<tr><td>200 sq ft or more</td><td>${money(HOUZZ.kitchenLarge.median)}</td><td>${money(HOUZZ.kitchenLarge.p90)} or more</td></tr>
</tbody>
</table></div>
<p>Counting kitchen projects of every scope, including refreshes that kept the cabinets, the median spend in 2025 was ${money(HOUZZ_ROOM_MEDIAN.kitchen)} (same study).</p>
<p>For our region, a midrange minor kitchen remodel (new cabinet fronts, counters, sink, appliances and flooring in a 200-square-foot kitchen) costs about ${money(CVV.minorKitchen.jobCost)}, and a midrange major remodel with new cabinets and an island costs about ${money(CVV.majorKitchen.jobCost)}, ${CVV_CITE}.</p>

<h2>What should you budget for a kitchen remodel in New Jersey?</h2>
<p>Start from the scope. For a refresh that keeps the cabinet boxes and layout, the Middle Atlantic benchmark is about ${money(CVV.minorKitchen.jobCost)}; for a full remodel with new cabinets and an island, about ${money(CVV.majorKitchen.jobCost)}, ${CVV_CITE}. Then hold back a contingency for what turns up once walls and floors are open, which is more likely in an older house.</p>
<p>Four ways to keep the number in check:</p>
<ul>
<li><strong>Keep the layout.</strong> Leaving the sink, range and walls where they are avoids new plumbing, gas and structural work.</li>
<li><strong>Decide before demolition.</strong> Cabinets, counters and appliances chosen up front do not stall the job or force rush orders.</li>
<li><strong>Spend where you touch.</strong> Cabinets, the sink, the faucet and the range get used every day; paint and backsplash are easy to change later.</li>
<li><strong>Get the scope in writing.</strong> New Jersey requires home improvement contracts over ${money(NJ_WRITTEN_CONTRACT_OVER)}, and every change to them, to be written and signed (N.J.S.A. 56:8-151).</li>
</ul>

<h2>Minor or major: the choice that sets the budget</h2>
<p>The gap between those two Cost vs. Value jobs is the single biggest decision in a kitchen. Keeping the cabinet boxes and the layout keeps plumbing, gas and electrical where they are. A full remodel that moves the sink, adds an island or takes out a wall brings in new cabinets, new rough-in work and a permit.</p>
<ul>
<li><strong>Cabinets.</strong> Usually the largest line. Stock, semi-custom and custom lines differ a lot in price and lead time.</li>
<li><strong>Layout changes.</strong> Moving the sink, range or a wall means plumbing, gas or structural work.</li>
<li><strong>Counters and backsplash.</strong> Material, edge detail and how much wall you tile.</li>
<li><strong>Appliances.</strong> A standard package and a pro-style range with a custom hood are different budgets.</li>
<li><strong>The house itself.</strong> Older wiring, plaster walls and out-of-level floors show up once demolition starts.</li>
</ul>

<h2>Does a kitchen remodel pay off when you sell?</h2>
<p>The smaller job wins on resale. In the Middle Atlantic region a midrange minor kitchen remodel recoups about ${CVV.minorKitchen.recouped}% of its cost at sale, while a midrange major remodel recoups about ${CVV.majorKitchen.recouped}%, ${CVV_CITE}. If you are remodeling to sell, that is a strong argument for a refresh. If you are staying, it is your kitchen.</p>

<h2>Central New Jersey kitchens sit in older houses</h2>
<p>Most homes near Hamilton were built before 1980, according to the Census Bureau's American Community Survey (${HOUSING.release}):</p>
${housingTable(MERCER_TOWNS, `Housing age near Hamilton (Census ${HOUSING.release})`)}
<p>In a home built before 1978, federal rules require lead-safe work practices when a renovation disturbs painted surfaces (EPA, 40 CFR 745). Older electrical service may also need an upgrade to carry new appliances.</p>

<h2>Permits for a kitchen in New Jersey</h2>
<p>Replacing cabinets or flooring is ordinary maintenance under N.J.A.C. 5:23-2.7 and needs no permit. Moving the sink, adding circuits or running a gas line does, under N.J.A.C. 5:23-2.14. In Hamilton, permits come from the ${HAMILTON_OFFICE.municipality} construction office at ${HAMILTON_OFFICE.street}, ${HAMILTON_OFFICE.phone}; each town page on this site lists its own office from the New Jersey DCA roster (as of ${PERMIT_OFFICES.asOf}).</p>

<h2>How long a kitchen remodel takes</h2>
<p>Kitchen projects averaged ${HOUZZ_TIME.kitchen.plan} months of planning and ${HOUZZ_TIME.kitchen.build} months of construction across the U.S. in 2025, according to the ${HOUZZ_STUDY}. Those averages include do-it-yourself projects. Cabinet lead time is usually what sets a contractor-run kitchen's start date. More detail in our <a href="/blog/kitchen-renovation-timeline-nj">kitchen timeline guide</a>.</p>

<h2>How MHG prices your kitchen</h2>
<p>MHG Contracting is a family-owned contractor at ${business.address.street} in Hamilton. Every kitchen gets a free in-home estimate, and the process runs like this:</p>
${PROCESS}
<p>See finished kitchens in the <a href="/portfolio">portfolio</a>, or read about <a href="/services/kitchen-renovations">kitchen renovations with MHG</a>.</p>
`,
    faqs: [
      {
        question: "What is the average cost of a kitchen remodel in NJ?",
        answer: `No survey publishes a New Jersey-only figure. In the Middle Atlantic region, a midrange major kitchen remodel costs about ${money(CVV.majorKitchen.jobCost)} and a midrange minor one about ${money(CVV.minorKitchen.jobCost)}, ${CVV_CITE}. Nationally, the 2025 median for a major remodel was ${money(HOUZZ.kitchenSmall.median)} under 200 square feet and ${money(HOUZZ.kitchenLarge.median)} for larger kitchens (${HOUZZ_STUDY}).`,
      },
      {
        question: "What should I budget for a kitchen remodel in New Jersey?",
        answer: `Budget by scope. A midrange minor kitchen remodel costs about ${money(CVV.minorKitchen.jobCost)} in the Middle Atlantic region and a midrange major one about ${money(CVV.majorKitchen.jobCost)}, ${CVV_CITE}. Add a contingency for surprises behind the walls in an older house.`,
      },
      {
        question: "What does a high-end kitchen remodel cost?",
        answer: `The top 10% of homeowners spent ${money(HOUZZ.kitchenSmall.p90)} or more on a major kitchen remodel under 200 square feet and ${money(HOUZZ.kitchenLarge.p90)} or more on a larger one in 2025, according to the ${HOUZZ_STUDY}.`,
      },
      {
        question: "Is a kitchen remodel worth it for resale?",
        answer: `A smaller one is. In the Middle Atlantic region a midrange minor kitchen remodel recoups about ${CVV.minorKitchen.recouped}% of its cost at sale and a midrange major remodel about ${CVV.majorKitchen.recouped}%, ${CVV_CITE}.`,
      },
      {
        question: "Do I need a permit to remodel a kitchen in New Jersey?",
        answer: "Not to replace cabinets or flooring; that is ordinary maintenance under N.J.A.C. 5:23-2.7. Moving the sink, adding circuits or running a gas line needs a construction permit under N.J.A.C. 5:23-2.14 from your town's construction office.",
      },
      {
        question: "Are these MHG's prices?",
        answer: notOurPrices("kitchen"),
      },
    ],
  },
  "basement-finishing-cost": {
    slug: "basement-finishing-cost",
    seoTitle: "Basement Finishing Cost in Central NJ (2026)",
    title: "What Does It Cost to Finish a Basement in Central NJ?",
    date: "September 28, 2026",
    excerpt: "What published data says a basement finish costs in our region, what drives the number, the New Jersey code rules for ceilings and bedrooms, and permits.",
    metaDescription: "Basement finishing cost in Central NJ: the Middle Atlantic Cost vs. Value figure, what drives the price, NJ ceiling and egress rules, and permits.",
    category: "Basement",
    readTime: "5 min read",
    sources: ["cvv", "njResidentialCode", "njPermits", "acs", "njConstructionOffices"],
    content: `
<p><strong>A basement remodel in the Middle Atlantic region costs about ${money(CVV.basement.jobCost)}, ${CVV_CITE}. How much of the space you finish, whether you add a bathroom, and whether a bedroom needs an egress window move the number more than anything else.</strong></p>

<h2>What that figure covers</h2>
<p>The Cost vs. Value report prices one defined basement project and reports what it cost in our region. Treat it as a midpoint: finishing part of the space costs less, and adding a full bath, a wet bar or a bedroom costs more.</p>
<p>At resale, a basement remodel recoups about ${CVV.basement.recouped}% of its cost in our region, ${CVV_CITE}.</p>

<h2>What drives the cost</h2>
<ul>
<li><strong>Square footage finished.</strong> Framing, insulation, drywall and flooring scale with area.</li>
<li><strong>A bathroom.</strong> Below-grade plumbing often needs a pump or ejector if the drain sits below the sewer line.</li>
<li><strong>Moisture.</strong> Any water problem has to be solved before walls go up. Finishing over a damp wall traps it.</li>
<li><strong>A bedroom.</strong> It triggers the egress rule below.</li>
<li><strong>Ceiling height.</strong> Ducts, beams and pipes sometimes have to move to meet the height rule.</li>
</ul>

<h2>New Jersey code rules that shape a basement</h2>
<p>New Jersey uses its own edition of the International Residential Code. Under section R305, habitable basement space needs a ceiling at least 7 feet high, and beams, ducts and pipes may project down to 6 feet 4 inches. Under section R310, a basement sleeping room needs an emergency escape and rescue opening, usually an egress window with a window well.</p>

<h2>Permits</h2>
<p>Finishing a basement means framing, wiring and usually plumbing, so it needs a construction permit under N.J.A.C. 5:23-2.14. Each town page on this site lists its construction office from the New Jersey DCA roster.</p>

<h2>Why the house matters</h2>
<p>Most houses near Hamilton predate 1980, according to the Census Bureau's American Community Survey (${HOUSING.release}):</p>
${housingTable(MERCER_TOWNS, `Housing age near Hamilton (Census ${HOUSING.release})`)}
<p>An older foundation is more likely to need moisture work before a finish. That is found at the estimate, not after.</p>

<h2>How MHG prices your basement</h2>
<p>Every basement gets a free in-home estimate:</p>
${PROCESS}
<p>More on <a href="/services/basement-finishing">basement finishing with MHG</a> and <a href="/blog/basement-finishing-ideas">basement ideas</a>.</p>
`,
    faqs: [
      { question: "How much does it cost to finish a basement in NJ?", answer: `No survey publishes a New Jersey-only figure. A basement remodel in the Middle Atlantic region costs about ${money(CVV.basement.jobCost)}, ${CVV_CITE}.` },
      { question: "Do I need a permit to finish my basement in NJ?", answer: "Yes. Framing, wiring and plumbing all fall outside ordinary maintenance, so a finished basement needs a construction permit under N.J.A.C. 5:23-2.14." },
      { question: "Does a basement bedroom need an egress window in NJ?", answer: "Yes. Under section R310 of the New Jersey edition of the International Residential Code, a basement sleeping room needs an emergency escape and rescue opening." },
      { question: "How high does a finished basement ceiling have to be?", answer: "At least 7 feet for habitable space under section R305 of the New Jersey edition of the International Residential Code, with beams, ducts and pipes allowed down to 6 feet 4 inches." },
      { question: "Are these MHG's prices?", answer: notOurPrices("basement") },
    ],
  },

  "full-home-renovation-cost-nj": {
    slug: "full-home-renovation-cost-nj",
    seoTitle: "Full Home Renovation Cost in NJ (2026)",
    title: "What Does a Full Home Renovation Cost in NJ? (2026)",
    date: "September 28, 2026",
    excerpt: `No survey prices a whole-house renovation as one job. Here is what the published data says room by room, what renovating households spend in total, and how to scope a whole-home project in an older New Jersey house.`,
    metaDescription: "Full home renovation cost in NJ, built from published data: Houzz 2026 household spend, Middle Atlantic room costs, and what drives a whole-house budget.",
    category: "Remodeling",
    readTime: "6 min read",
    sources: ["houzz", "cvv", "nahb", "acs", "njPermits"],
    content: `
<p><strong>No survey publishes one price for a whole-home renovation, because the scope varies too much. For scale: the median U.S. renovating household spent ${money(HOUZZ_HOUSEHOLD.median)} across all its 2025 projects and the top 10% spent ${money(HOUZZ_HOUSEHOLD.p90)} or more, according to the ${HOUZZ_STUDY}.</strong></p>

<h2>Build the number room by room</h2>
<p>A whole-home project is a set of room projects plus the systems that tie them together. The Middle Atlantic figures from the Remodeling 2025 Cost vs. Value Report give a starting point for the biggest rooms: a midrange major kitchen remodel costs about ${money(CVV.majorKitchen.jobCost)}, a midrange bathroom remodel about ${money(CVV.bath.jobCost)}, and a basement remodel about ${money(CVV.basement.jobCost)}, ${CVV_CITE}.</p>
<p>A house that needs a kitchen, two baths and a finished basement adds up quickly. Then come the parts no single room owns:</p>
<ul>
<li><strong>Electrical service.</strong> An older panel may not carry a new kitchen and added circuits.</li>
<li><strong>Heating and cooling.</strong> Moving walls often means moving ducts.</li>
<li><strong>Plumbing.</strong> Old supply and drain lines are usually replaced while the walls are open.</li>
<li><strong>Structure.</strong> Removing a bearing wall needs a beam, and usually an engineer.</li>
<li><strong>Flooring, drywall and paint</strong> across the whole house.</li>
</ul>

<h2>When renovating costs more than building</h2>
<p>At the far end, a gut renovation can approach the cost of new construction. For comparison, builders reported an average construction cost of about ${money(NAHB.perSqft)} per square foot for a new single-family home in ${NAHB.year}, not counting the lot, according to the NAHB's Cost of Constructing a Home survey. A renovation keeps the lot, the foundation and often the frame, which is why it usually still comes in lower.</p>

<h2>Older houses carry more unknowns</h2>
<p>Most houses near Hamilton were built before 1980 (Census ${HOUSING.release}):</p>
${housingTable(MERCER_TOWNS, `Housing age near Hamilton (Census ${HOUSING.release})`)}
<p>A whole-home job in an older house opens every wall, so plan a contingency for what is behind them. A whole-house renovation also needs construction permits for the structural, electrical and plumbing work (N.J.A.C. 5:23-2.14).</p>

<h2>How MHG scopes a whole-home project</h2>
<p>MHG Contracting is a family-owned contractor at ${business.address.street} in Hamilton, with a crew of ${business.teamSize} plus subcontractors. A whole-home estimate is free and runs the same way as any other job:</p>
${PROCESS}
<p>More on <a href="/services/full-home-renovations">full home renovations with MHG</a> and the <a href="/blog/full-home-renovation-timeline-nj">whole-home timeline</a>.</p>
`,
    faqs: [
      { question: "What is the average full home renovation cost in NJ?", answer: `No survey publishes one. The median U.S. renovating household spent ${money(HOUZZ_HOUSEHOLD.median)} on all its 2025 projects and the top 10% spent ${money(HOUZZ_HOUSEHOLD.p90)} or more (${HOUZZ_STUDY}). A whole-home project is best priced room by room.` },
      { question: "What is the biggest cost in a full home renovation?", answer: `Usually the kitchen. A midrange major kitchen remodel in the Middle Atlantic region costs about ${money(CVV.majorKitchen.jobCost)}, ${CVV_CITE}.` },
      { question: "Is it cheaper to renovate or build new in NJ?", answer: `Usually renovating, because you keep the lot, foundation and often the frame. For comparison, new single-family homes averaged about ${money(NAHB.perSqft)} per square foot in construction cost in ${NAHB.year}, before the lot (NAHB Cost of Constructing a Home survey).` },
      { question: "Are these MHG's prices?", answer: notOurPrices("whole-home project") },
    ],
  },

  "home-remodeling-cost-hamilton-nj": {
    slug: "home-remodeling-cost-hamilton-nj",
    seoTitle: "Home Remodeling Cost in Hamilton, NJ (2026 Guide)",
    title: "What Does Home Remodeling Cost in Hamilton, NJ? (2026)",
    date: "September 28, 2026",
    excerpt: "Published 2026 cost figures for the projects Hamilton homeowners ask about most, plus the facts about Hamilton's housing and permit office that shape a remodel here.",
    metaDescription: "Home remodeling cost in Hamilton, NJ: published 2026 figures for kitchens, baths, basements and additions, plus Hamilton housing data and permits.",
    category: "Remodeling",
    readTime: "5 min read",
    sources: ["houzz", "cvv", "acs", "njConstructionOffices", "njPermits", "epaRrp"],
    content: `
<p><strong>In the Middle Atlantic region, a midrange bathroom remodel costs about ${money(CVV.bath.jobCost)}, a midrange minor kitchen remodel about ${money(CVV.minorKitchen.jobCost)}, a basement remodel about ${money(CVV.basement.jobCost)} and a midrange primary suite addition about ${money(CVV.primarySuite.jobCost)}, ${CVV_CITE}. No survey publishes Hamilton-only figures.</strong></p>

<h2>Cost by project</h2>
<p>Nationally, the median major kitchen remodel was ${money(HOUZZ.kitchenSmall.median)} under 200 square feet and ${money(HOUZZ.kitchenLarge.median)} for larger kitchens in 2025, and the median major primary bath remodel was ${money(HOUZZ.bathSmall.median)} under 100 square feet and ${money(HOUZZ.bathLarge.median)} for larger rooms (${HOUZZ_STUDY}).</p>
<p>For the full detail on each: <a href="/blog/kitchen-remodel-cost">kitchen remodel cost</a>, <a href="/blog/bathroom-remodel-cost">bathroom remodel cost</a>, <a href="/blog/basement-finishing-cost">basement finishing cost</a> and <a href="/blog/home-additions-cost-mercer-county-nj">home addition cost</a>.</p>

<h2>Hamilton's housing shapes the budget</h2>
<p>${HAMILTON.geography} has about ${HAMILTON.housingUnits.toLocaleString("en-US")} homes. The median home was built in ${HAMILTON.medianYearBuilt}, ${HAMILTON.pctBuiltBefore1980}% were built before 1980, and ${HAMILTON.pctSingleFamilyDetached}% are single-family detached houses, according to the Census Bureau's American Community Survey (${HOUSING.release}).</p>
<p>An older house costs more to remodel for reasons you cannot see from the room: wiring, plumbing and framing that need work once the walls open. In a home built before 1978, federal rules also require lead-safe work practices when a renovation disturbs painted surfaces (EPA, 40 CFR 745).</p>

<h2>Permits in Hamilton Township</h2>
<p>Most remodeling beyond ordinary maintenance needs a construction permit under N.J.A.C. 5:23-2.14. In Hamilton, permits come from the ${HAMILTON_OFFICE.municipality} construction office at ${HAMILTON_OFFICE.street}, ${HAMILTON_OFFICE.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}).</p>

<h2>A Hamilton contractor</h2>
<p>MHG Contracting is based at ${business.address.street} in Hamilton. It is family owned, run by Shahzeb and Shahmi Malik, and registered as a New Jersey home improvement contractor (#${business.hic}). Every project gets a free in-home estimate:</p>
${PROCESS}
`,
    faqs: [
      { question: "How much does home remodeling cost in Hamilton, NJ?", answer: `It depends on the project. For the Middle Atlantic region, a midrange bathroom remodel costs about ${money(CVV.bath.jobCost)} and a midrange minor kitchen remodel about ${money(CVV.minorKitchen.jobCost)}, ${CVV_CITE}.` },
      { question: "How old are the houses in Hamilton, NJ?", answer: `The median home in ${HAMILTON.geography} was built in ${HAMILTON.medianYearBuilt}, and ${HAMILTON.pctBuiltBefore1980}% were built before 1980 (Census ${HOUSING.release}).` },
      { question: "Where do I get a building permit in Hamilton Township?", answer: `From the ${HAMILTON_OFFICE.municipality} construction office at ${HAMILTON_OFFICE.street}, ${HAMILTON_OFFICE.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}).` },
      { question: "Are these MHG's prices?", answer: notOurPrices("project") },
    ],
  },

  "home-additions-cost-mercer-county-nj": {
    slug: "home-additions-cost-mercer-county-nj",
    seoTitle: "Home Addition Cost in NJ (2026): Mercer County Guide",
    title: "What Does a Home Addition Cost in Mercer County, NJ? (2026)",
    date: "September 28, 2026",
    excerpt: "What published data says a home addition costs in our region, what drives the price, zoning and permits in Mercer County, and resale.",
    metaDescription: "Home addition cost in Mercer County, NJ: the Middle Atlantic Cost vs. Value figure, what drives the price, zoning, permits and resale value.",
    category: "Additions",
    readTime: "6 min read",
    sources: ["cvv", "nahb", "njPermits", "njZoningVariance", "njConstructionOffices"],
    content: `
<p><strong>A midrange primary suite addition in the Middle Atlantic region costs about ${money(CVV.primarySuite.jobCost)}, ${CVV_CITE}. Smaller additions cost less. Size, the foundation, the roof tie-in and whether the addition carries plumbing decide where yours lands.</strong></p>

<h2>What that figure covers</h2>
<p>The Cost vs. Value report prices a defined job: a 24-by-16-foot primary bedroom suite over a crawlspace, with a walk-in closet, a soaking tub, a separate shower and a double vanity. A single-room bump-out without plumbing costs less. A two-story addition or one with a kitchen costs more.</p>
<p>For another yardstick, builders reported an average construction cost of about ${money(NAHB.perSqft)} per square foot for new single-family homes in ${NAHB.year}, according to the NAHB's Cost of Constructing a Home survey. Additions often cost more per square foot than new homes, because the new work has to tie into an existing house.</p>

<h2>What drives addition costs</h2>
<ul>
<li><strong>Foundation.</strong> Slab, crawlspace or full basement.</li>
<li><strong>Stories.</strong> A second story over existing space needs the structure below checked, and often reinforced.</li>
<li><strong>Plumbing.</strong> A bathroom or kitchen in the addition adds rough-in and fixtures.</li>
<li><strong>Roof tie-in and siding match.</strong> Making new work look original takes time.</li>
<li><strong>Heating and cooling.</strong> The existing system may not carry the new space.</li>
</ul>

<h2>Zoning and permits in Mercer County</h2>
<p>An addition needs a construction permit under N.J.A.C. 5:23-2.14 from the town's construction office; each town page on this site lists its office from the New Jersey DCA roster. It also has to meet the town's zoning setbacks and lot coverage. If it cannot, the owner can apply to the zoning board of adjustment for a variance under N.J.S.A. 40:55D-70, which adds time before any permit.</p>

<h2>Resale</h2>
<p>A midrange primary suite addition recoups about ${CVV.primarySuite.recouped}% of its cost at resale in the Middle Atlantic region, ${CVV_CITE}. People add on because they need the space, not to turn a profit.</p>

<h2>How MHG prices an addition</h2>
<p>Every addition gets a free in-home estimate:</p>
${PROCESS}
<p>More on <a href="/services/additions">home additions with MHG</a> and <a href="/blog/permits-nj">New Jersey permits</a>.</p>
`,
    faqs: [
      { question: "How much does a home addition cost in NJ?", answer: `No survey publishes a New Jersey-only figure. A midrange primary suite addition in the Middle Atlantic region costs about ${money(CVV.primarySuite.jobCost)}, ${CVV_CITE}.` },
      { question: "Do I need a variance to build an addition in NJ?", answer: "Only if the addition breaks the town's zoning rules, such as setbacks or lot coverage. Then the owner applies to the zoning board of adjustment for a variance under N.J.S.A. 40:55D-70." },
      { question: "Does an addition add value to a home?", answer: `Some. A midrange primary suite addition recoups about ${CVV.primarySuite.recouped}% of its cost at resale in the Middle Atlantic region, ${CVV_CITE}.` },
      { question: "Are these MHG's prices?", answer: notOurPrices("addition") },
    ],
  },

  "new-home-construction-cost-nj": {
    slug: "new-home-construction-cost-nj",
    seoTitle: "Cost to Build a Custom Home in NJ (2026)",
    title: "What Does It Cost to Build a New Home in NJ? (2026)",
    date: "September 28, 2026",
    excerpt: "What the national builder survey says a new home costs to build, what that figure leaves out, and what changes the number for a custom home in New Jersey.",
    metaDescription: "What it costs to build a new home in NJ: the NAHB construction cost survey, what its per-square-foot figure leaves out, and what raises it.",
    category: "New Construction",
    readTime: "5 min read",
    sources: ["nahb", "njPermits", "njZoningVariance"],
    content: `
<p><strong>Builders reported an average construction cost of ${money(NAHB.constructionCost)}, about ${money(NAHB.perSqft)} per square foot, for a ${NAHB.sqft.toLocaleString("en-US")} square foot single-family home in ${NAHB.year}, according to the NAHB's Cost of Constructing a Home survey. That figure is national and leaves out the lot, financing and the builder's overhead and profit.</strong></p>

<h2>What the survey measures</h2>
<p>The National Association of Home Builders surveys builders on what their homes cost. In ${NAHB.year} the average sales price was ${money(NAHB.salesPrice)}. Construction was ${NAHB.pctConstruction}% of that price and the finished lot ${NAHB.pctLot}%, with the rest going to financing, overhead, marketing, commissions and profit.</p>
<p>No survey publishes a New Jersey-only construction cost. A custom home is also a different animal from the average home in the survey, most of which are built by production builders.</p>

<h2>What raises the number for a custom home</h2>
<ul>
<li><strong>The lot.</strong> Clearing, grading, utilities and a septic system or sewer connection.</li>
<li><strong>Size and shape.</strong> More corners, rooflines and stories cost more than a simple box.</li>
<li><strong>Finishes.</strong> Cabinets, counters, flooring, windows and fixtures.</li>
<li><strong>Design and engineering.</strong> Architect's drawings, structural engineering and surveys.</li>
</ul>

<h2>Permits and approvals</h2>
<p>A new home needs construction permits under N.J.A.C. 5:23-2.14 and has to meet the town's zoning. If the plan does not, a variance under N.J.S.A. 40:55D-70 comes first. Build the approval time into the schedule.</p>

<h2>How MHG approaches new construction</h2>
<p>MHG Contracting builds new homes as well as renovating them, from its office at ${business.address.street} in Hamilton. The first step is the same free meeting and written estimate as any other project:</p>
${PROCESS}
<p>More on <a href="/services/new-construction">new construction with MHG</a>.</p>
`,
    faqs: [
      { question: "How much does it cost to build a house in NJ?", answer: `No survey publishes a New Jersey-only figure. Nationally, builders reported an average construction cost of ${money(NAHB.constructionCost)}, about ${money(NAHB.perSqft)} per square foot, in ${NAHB.year}, before the lot, financing, overhead and profit (NAHB Cost of Constructing a Home survey).` },
      { question: "What share of a new home's price is the lot?", answer: `The finished lot was ${NAHB.pctLot}% of the average sales price in ${NAHB.year}, and construction was ${NAHB.pctConstruction}%, according to the NAHB's Cost of Constructing a Home survey.` },
      { question: "Are these MHG's prices?", answer: notOurPrices("new home") },
    ],
  },
  "permits-nj": {
    slug: "permits-nj",
    title: "Do You Need a Permit to Remodel in NJ?",
    seoTitle: "Do You Need a Permit to Remodel in NJ? (2026 Rules)",
    date: "September 28, 2026",
    excerpt: "Which remodeling work needs a construction permit in New Jersey, which counts as ordinary maintenance, how inspections work, and where to get a permit in each town near Hamilton.",
    metaDescription: "What needs a construction permit in NJ and what is ordinary maintenance under the Uniform Construction Code, plus permit offices near Hamilton.",
    category: "Tips",
    readTime: "6 min read",
    sources: ["njPermits", "njOrdinaryMaintenance", "njPermitApplication", "njPermitReview", "njInspections", "njHomeImprovementPractices", "njConstructionOffices"],
    content: `
<p><strong>Usually, yes. New Jersey's Uniform Construction Code requires a construction permit to build, alter or renovate a house (N.J.A.C. 5:23-2.14) unless the work is ordinary maintenance. Painting, flooring, cabinets and a like-for-like fixture swap need no permit (N.J.A.C. 5:23-2.7). Moving plumbing, adding wiring or touching structure does.</strong></p>

<h2>Work that needs no permit</h2>
<p>The code lists work that counts as ordinary maintenance in a one- or two-family home. It needs no permit and no inspection (N.J.A.C. 5:23-2.7). The list includes:</p>
<ul>
<li>Painting and wallpaper, inside and out.</li>
<li>Replacing flooring.</li>
<li>Installing or replacing cabinets, built-ins, trim and moldings.</li>
<li>New drywall or plaster over less than a quarter of the wall area.</li>
<li>Replacing a window or door in the same opening, without changing its size or framing.</li>
<li>Replacing faucets, shower valves and traps, or swapping a fixture for a similar one without changing the piping.</li>
<li>Replacing a switch, outlet or light fixture with a similar one.</li>
</ul>

<h2>Work that needs a permit</h2>
<p>The same section says ordinary maintenance never includes:</p>
<ul>
<li>Cutting into a load-bearing wall, or removing or cutting a beam or support.</li>
<li>Changing a required way out of the house, such as an egress window.</li>
<li>Adding, moving or replacing water, drain, vent or gas piping.</li>
<li>Electrical wiring, other than low-voltage communications wiring.</li>
<li>Any work that affects structural or fire safety.</li>
</ul>

<h2>What that means for common projects</h2>
<ul>
<li><strong>Kitchen.</strong> New cabinets, counters and flooring alone are ordinary maintenance. Moving the sink, running gas or adding circuits needs a permit. See <a href="/blog/kitchen-remodel-cost">kitchen remodel cost</a>.</li>
<li><strong>Bathroom.</strong> Swapping a vanity or toilet in place is ordinary maintenance. Moving a drain, as a tub-to-shower conversion often does, needs a permit. See <a href="/blog/bathroom-remodel-cost">bathroom remodel cost</a>.</li>
<li><strong>Basement.</strong> Framing, wiring and plumbing all need permits. See <a href="/blog/basement-finishing-cost">basement finishing cost</a>.</li>
<li><strong>Addition.</strong> Always needs a permit, and zoning approval if it breaks setbacks or lot coverage. See <a href="/blog/home-additions-cost-mercer-county-nj">home addition cost</a>.</li>
</ul>

<h2>How the permit process works</h2>
<p>The application has to list the licensed electrical and plumbing contractors doing that work and the home improvement contractor's registration (N.J.A.C. 5:23-2.15). The construction office then has 20 business days to approve or deny a complete application (N.J.A.C. 5:23-2.16).</p>
<p>During the job, work stops at each required inspection, such as rough plumbing and wiring before the walls close, and the town performs an inspection within three business days of the request (N.J.A.C. 5:23-2.18).</p>
<p>Under New Jersey's Home Improvement Practices rules, a contractor may not start work until every required permit has been issued, and must give you copies of the inspection approvals before final payment is due (N.J.A.C. 13:45A-16.2).</p>

<h2>Where to get a permit near Hamilton</h2>
<p>Each town runs its own construction office. Fees are set locally, so ask the office for its fee schedule.</p>
${officesTable()}
<p>Yardley, Pennsylvania is outside this system: Yardley Borough takes permit applications at Borough Hall, 56 S. Main Street.</p>

<h2>Planning a project?</h2>
<p>MHG Contracting (NJ home improvement contractor #${business.hic}) is based at ${business.address.street} in Hamilton. Call <a href="${business.phoneHref}">${business.phone}</a> or <a href="/contact">ask for a free estimate</a>.</p>
`,
    faqs: [
      { question: "Do I need a permit to replace kitchen cabinets in NJ?", answer: "No. Installing or replacing cabinets and flooring is ordinary maintenance under N.J.A.C. 5:23-2.7. Moving the sink, running a gas line or adding circuits needs a permit." },
      { question: "Do I need a permit to replace a toilet or shower valve in NJ?", answer: "Not for a like-for-like swap. Replacing a fixture with a similar one without changing the piping, and replacing faucets and shower valves, are ordinary maintenance under N.J.A.C. 5:23-2.7." },
      { question: "How long does a building permit take in NJ?", answer: "The construction office has 20 business days to approve or deny a complete application (N.J.A.C. 5:23-2.16)." },
      { question: "Can a contractor start before the permit is issued?", answer: "No. Under N.J.A.C. 13:45A-16.2, a home improvement contractor may not begin work until every required permit has been issued." },
    ],
  },
  "walk-in-shower-installation-nj": {
    slug: "walk-in-shower-installation-nj",
    seoTitle: "Walk-In Shower Installation in NJ: What to Know",
    title: "Walk-In Shower Installation in NJ: Cost, Permits and What to Know",
    date: "September 28, 2026",
    excerpt: "Tub-to-shower conversions and custom walk-ins: what the published bathroom cost data says, when you need a permit in New Jersey, and the waterproofing details that decide how long a shower lasts.",
    metaDescription: "Walk-in shower installation in NJ: published bathroom cost data, when a tub-to-shower conversion needs a permit, and what to ask about waterproofing.",
    category: "Bathroom",
    readTime: "4 min read",
    sources: ["houzz", "cvv", "njOrdinaryMaintenance", "njPermits"],
    content: `
<p><strong>No survey publishes a price for a walk-in shower on its own. A shower is usually part of a bathroom remodel, and a midrange bathroom remodel in the Middle Atlantic region costs about ${money(CVV.bath.jobCost)}, ${CVV_CITE}. Moving the drain for a tub-to-shower conversion also means a construction permit in New Jersey.</strong></p>

<h2>What a walk-in shower costs</h2>
<p>For whole bathrooms, the ${HOUZZ_STUDY} found a 2025 median of ${money(HOUZZ.bathSmall.median)} for a major primary bath remodel under 100 square feet and ${money(HOUZZ.bathLarge.median)} for larger rooms. A conversion that keeps the rest of the bathroom costs less than a full remodel. The <a href="/blog/bathroom-remodel-cost">bathroom remodel cost guide</a> has the full breakdown.</p>
<p>Four things move the price of the shower itself:</p>
<ul>
<li><strong>Size.</strong> A shower in the old tub footprint, or a larger one that takes floor space.</li>
<li><strong>Tile coverage.</strong> Floor-to-ceiling tile and large-format tile cost more to set.</li>
<li><strong>Glass.</strong> Frameless glass costs more than a framed door and is measured after the tile is finished.</li>
<li><strong>A curbless entry.</strong> The floor has to be recessed or built up to create the slope to the drain, which is framing work, not tile work.</li>
</ul>

<h2>Permits for a tub-to-shower conversion</h2>
<p>Replacing a fixture with a similar one without changing the piping, and replacing a shower valve, are ordinary maintenance under N.J.A.C. 5:23-2.7. A conversion usually moves the drain, and changing drain, waste or supply piping needs a construction permit under N.J.A.C. 5:23-2.14.</p>

<h2>The part you cannot see decides how long it lasts</h2>
<p>A walk-in shower is a waterproofing job with tile on top. The pan, the membrane, the slope to the drain and the drain detail decide whether it stays dry for decades or leaks into the floor below. When you interview contractors, ask which waterproofing system they use and how they test the pan before tile goes on. A specific product and method is a good answer.</p>

<h2>Details worth deciding early</h2>
<ul>
<li><strong>Niches.</strong> A tiled niche has to be framed before the walls close.</li>
<li><strong>A bench.</strong> Worth it only if the shower is big enough that it does not crowd the space.</li>
<li><strong>A linear drain.</strong> It lets large-format floor tile run with a single slope.</li>
<li><strong>Keep one tub.</strong> If this is the only tub in the house, think about resale before removing it.</li>
</ul>

<p>See a finished shower in the <a href="/portfolio">portfolio</a>, or <a href="/contact">ask for a free estimate</a> and tell us what you are picturing.</p>
`,
    faqs: [
      { question: "How much does a walk-in shower cost in NJ?", answer: `No survey prices a shower on its own. A midrange bathroom remodel in the Middle Atlantic region costs about ${money(CVV.bath.jobCost)}, ${CVV_CITE}, and a conversion that keeps the rest of the room costs less.` },
      { question: "Do I need a permit to convert a tub to a shower in NJ?", answer: "Usually. Moving the drain or supply piping needs a construction permit under N.J.A.C. 5:23-2.14. A like-for-like fixture or valve swap is ordinary maintenance under N.J.A.C. 5:23-2.7." },
      { question: "Should I keep a bathtub for resale?", answer: "If it is the only tub in the house, think twice. Families with young children often look for one." },
    ],
  },
  "choosing-a-contractor": {
    slug: "choosing-a-contractor",
    seoTitle: "How to Choose a Contractor in NJ: 3 Checks",
    title: "How to Choose a Contractor in NJ: 3 Checks Before You Sign",
    date: "September 28, 2026",
    excerpt: "Check the registration, see the insurance, read the contract. What New Jersey law requires at each step, and the questions worth asking on the first visit.",
    metaDescription: "Three checks before you hire a NJ contractor: the HIC registration lookup, the insurance the law requires, and what the contract must include.",
    category: "Tips",
    readTime: "6 min read",
    sources: ["njHicRegistration", "njLicenseLookup", "njHicInsurance", "njHicContracts", "njHomeImprovementPractices"],
    content: `
<p><strong>Before you sign with a New Jersey contractor, check three things: its home improvement contractor registration in the state's License Verification System (N.J.S.A. 56:8-138), a certificate for the liability insurance the law requires (N.J.S.A. 56:8-142), and a written contract with everything N.J.S.A. 56:8-151 and N.J.A.C. 13:45A-16.2 require.</strong></p>

<p>Most contractor horror stories, the vanished deposit or the half-finished kitchen, trace back to skipping one of these. Here is each one.</p>

<h2>Check one: the registration</h2>
<p>No contractor business may offer or perform home improvements in New Jersey without registering with the Division of Consumer Affairs, and it renews every year (N.J.S.A. 56:8-138). The number starts with "13VH", and it has to appear on the contractor's advertising, contracts and commercial vehicles (N.J.S.A. 56:8-144).</p>
<p>Look it up in the Division's License Verification System at newjersey.mylicense.com. Search the business name or the number, and check that the name matches the one on your contract. MHG Contracting's registration is #${business.hic}.</p>

<h2>Check two: the insurance</h2>
<p>A registered contractor must carry commercial general liability insurance of at least ${money(NJ_HIC_MIN_LIABILITY)} per occurrence (N.J.S.A. 56:8-142), and the contract must include a copy of the certificate and the insurer's phone number (N.J.S.A. 56:8-151). Call the insurer to confirm the policy is current. Ask for proof of workers' compensation coverage for the crew as well.</p>

<h2>Check three: the contract</h2>
<p>Any home improvement contract over ${money(NJ_WRITTEN_CONTRACT_OVER)}, and every change to it, must be in writing and signed (N.J.S.A. 56:8-151). New Jersey requires it to include:</p>
<ul>
<li>The contractor's legal name, address and registration number.</li>
<li>A copy of the liability insurance certificate.</li>
<li>The total price, including any finance charges.</li>
<li>A description of the work and the main products and materials, with make, model and size where they apply.</li>
<li>The dates or time period for starting and finishing the work.</li>
<li>A statement of any guarantee or warranty.</li>
<li>A "Notice to Consumer" explaining your right to cancel within three business days.</li>
</ul>
<p>The price, product, schedule and warranty items come from N.J.A.C. 13:45A-16.2; the rest from N.J.S.A. 56:8-151. The same rules say a contractor may not start before the required permits are issued, and may not ask for final payment before the work is finished as the contract describes.</p>

<h2>You can cancel within three business days</h2>
<p>You can cancel a home improvement contract for any reason before midnight of the third business day after you receive your copy. The notice goes in writing by registered or certified mail, or by hand, to the address in the contract, and your money must be refunded within 30 days (N.J.S.A. 56:8-151).</p>

<h2>Warning signs</h2>
<ul>
<li><strong>No written estimate.</strong> Every number and product should be on paper.</li>
<li><strong>A price far below the others.</strong> Usually the scope or the materials are different. Compare line by line.</li>
<li><strong>A payment schedule that runs ahead of the work.</strong> Payments tied to milestones keep both sides even.</li>
<li><strong>Pressure to sign today.</strong> A real price survives a day or two of thinking.</li>
<li><strong>Changes handled out loud.</strong> The law requires them in writing.</li>
</ul>

<h2>Questions worth asking on the first visit</h2>
<ul>
<li>Who will be on site every day, and are they employees or subcontractors?</li>
<li>Can I talk to two or three homeowners whose projects you finished recently?</li>
<li>How do you handle something unexpected once the walls are open?</li>
<li>Which permits does this job need, and who applies for them?</li>
</ul>

<p>If you want to see how MHG works, call <a href="${business.phoneHref}">${business.phone}</a> or <a href="/contact">ask for a free in-home estimate</a>. Our process is on the <a href="/process">process page</a>.</p>
`,
    faqs: [
      { question: "How do I check a contractor's license in NJ?", answer: "Search the business in the Division of Consumer Affairs License Verification System at newjersey.mylicense.com. Home improvement contractor businesses must register every year (N.J.S.A. 56:8-138) and show the number on their ads, contracts and vehicles (N.J.S.A. 56:8-144)." },
      { question: "What insurance does a NJ contractor need?", answer: `Commercial general liability insurance of at least ${money(NJ_HIC_MIN_LIABILITY)} per occurrence (N.J.S.A. 56:8-142), with a copy of the certificate included in the contract (N.J.S.A. 56:8-151).` },
      { question: "Can I cancel a home improvement contract in NJ?", answer: "Yes, for any reason, before midnight of the third business day after you receive your copy, by written notice sent by registered or certified mail or delivered in person (N.J.S.A. 56:8-151)." },
    ],
  },
  "general-contractor-vs-handyman-hamilton-nj": {
    slug: "general-contractor-vs-handyman-hamilton-nj",
    title: "Contractor vs Handyman in Hamilton, NJ: Which Do You Need?",
    seoTitle: "Contractor vs Handyman in Hamilton, NJ",
    date: "September 28, 2026",
    excerpt: "The question that decides it is whether the job needs a permit or a licensed trade. How New Jersey's rules sort common projects, and what to check either way.",
    metaDescription: "Contractor or handyman in Hamilton, NJ? The permit test, which trades need a state license, and the registration every home improvement business needs.",
    category: "Hiring",
    readTime: "5 min read",
    sources: ["njOrdinaryMaintenance", "njPermits", "njPermitApplication", "njElectrical", "njPlumbing", "njHicRegistration", "njLicenseLookup"],
    content: `
<p><strong>If the job is ordinary maintenance under New Jersey's construction code (N.J.A.C. 5:23-2.7), like painting, flooring or a like-for-like fixture swap, a handyman can fit. If it needs a construction permit, new wiring or plumbing, or several trades in sequence, hire a contractor who brings licensed electricians and plumbers.</strong></p>

<h2>The permit test</h2>
<p>New Jersey requires a construction permit for most work that alters a house (N.J.A.C. 5:23-2.14). The code lists what does not need one. That list is a good map of handyman work:</p>
<ul>
<li>Painting, wallpaper, trim and moldings.</li>
<li>Replacing flooring, cabinets or built-ins.</li>
<li>Patching drywall or plaster over less than a quarter of a wall.</li>
<li>Replacing a faucet, shower valve or trap, or a fixture with a similar one without changing the piping.</li>
<li>Replacing a switch, outlet or light fixture with a similar one.</li>
</ul>
<p>Moving plumbing, adding wiring, cutting a bearing wall or changing an egress window is outside that list and needs a permit (N.J.A.C. 5:23-2.7).</p>

<h2>The licensed-trade test</h2>
<p>Electrical work needs a licensed electrical contractor (N.J.S.A. 45:5A-9), and plumbing work needs a licensed master plumber (N.J.S.A. 45:14C-12.3). A permit application has to name the licensed trades doing that work (N.J.A.C. 5:23-2.15). A handyman who is neither cannot legally run new circuits or move a drain, however capable.</p>

<h2>Registration applies to both</h2>
<p>Any business that offers or performs home improvements in New Jersey has to register with the Division of Consumer Affairs (N.J.S.A. 56:8-138). That includes handyman businesses doing home improvement work, not only general contractors. Look up either one in the state's License Verification System at newjersey.mylicense.com. More on that in <a href="/blog/choosing-a-contractor">how to choose a contractor in NJ</a>.</p>

<h2>A quick way to decide</h2>
<ol>
<li>Is it on the ordinary maintenance list above? A handyman can fit.</li>
<li>Does it need a permit? Hire a contractor.</li>
<li>Does it touch wiring or plumbing beyond a like-for-like swap? You need licensed trades.</li>
<li>Does it need more than one trade in order, like a kitchen or bathroom? A contractor sequences them.</li>
</ol>

<h2>Where MHG fits</h2>
<p>MHG Contracting is a family-owned contractor at ${business.address.street} in Hamilton, registered as a New Jersey home improvement contractor (#${business.hic}). It takes on kitchens, bathrooms, basements, whole-home renovations, additions and new construction. If your project is on that side of the line, call <a href="${business.phoneHref}">${business.phone}</a> or <a href="/contact">ask for a free estimate</a>. The <a href="/blog/permits-nj">NJ permit guide</a> covers the permit side in more detail.</p>
`,
    faqs: [
      { question: "Does a handyman need to be registered in NJ?", answer: "Yes, if the business offers or performs home improvements. New Jersey requires home improvement contractor businesses to register with the Division of Consumer Affairs (N.J.S.A. 56:8-138)." },
      { question: "Can a handyman do electrical work in NJ?", answer: "Not beyond replacing a switch, outlet or fixture with a similar one. New wiring needs a permit (N.J.A.C. 5:23-2.7) and a licensed electrical contractor (N.J.S.A. 45:5A-9)." },
      { question: "Can a handyman move plumbing in NJ?", answer: "No. Adding or moving water, drain or gas piping needs a permit (N.J.A.C. 5:23-2.7) and a licensed master plumber (N.J.S.A. 45:14C-12.3)." },
    ],
  },
  "full-home-renovation-timeline-nj": {
    slug: "full-home-renovation-timeline-nj",
    seoTitle: "How Long a Full Home Renovation Takes in NJ",
    title: "How Long Does a Full Home Renovation Take in NJ?",
    date: "September 28, 2026",
    excerpt: "What published data says about renovation timelines, the permit and inspection deadlines New Jersey's code sets, and the order a whole-home project runs in.",
    metaDescription: "How long a full home renovation takes in NJ: Houzz project-length data, NJ permit and inspection deadlines, and the order the work runs in.",
    category: "Remodeling",
    readTime: "5 min read",
    sources: ["houzz", "njPermitReview", "njInspections", "njHomeImprovementPractices"],
    content: `
<p><strong>No survey measures whole-home renovations as one job. The best benchmarks are room projects: across the U.S. in 2025, kitchen projects averaged ${HOUZZ_TIME.kitchen.plan} months of planning and ${HOUZZ_TIME.kitchen.build} months of construction, and primary bathrooms ${HOUZZ_TIME.primaryBath.plan} and ${HOUZZ_TIME.primaryBath.build} months (${HOUZZ_STUDY}). A whole house takes longer than any one room.</strong></p>

<h2>What New Jersey's code sets</h2>
<p>Two deadlines in the Uniform Construction Code shape every schedule. The construction office has 20 business days to approve or deny a complete permit application (N.J.A.C. 5:23-2.16). During construction, work stops at each required inspection, and the town performs an inspection within three business days of the request (N.J.A.C. 5:23-2.18).</p>
<p>Your contract also has to state the dates or time period for starting and finishing the work, and any change to them has to be in writing (N.J.A.C. 13:45A-16.2).</p>

<h2>The order the work happens in</h2>
<p>Every renovation follows a sequence, and each step waits on the one before it:</p>
<ol>
<li>Design, selections and, if walls move, engineering.</li>
<li>Permit application and review.</li>
<li>Ordering materials, with the longest lead times ordered first.</li>
<li>Demolition and any structural work.</li>
<li>Rough plumbing, electrical and mechanical work, then the rough inspections.</li>
<li>Insulation and drywall, once the rough work has passed.</li>
<li>Cabinets, then counters (templated after the cabinets are set), tile and finishes.</li>
<li>Final inspections and the punch list.</li>
</ol>
<p>A selection that is not made before demolition becomes a stoppage later: counters cannot be templated until cabinets are set, and walls cannot close until the rough work passes inspection.</p>

<h2>Can you live in the house?</h2>
<p>During a phased renovation, often yes, if the phases are planned so a working kitchen or bathroom is always available. During a full gut renovation, usually no. Plan where you will live before the schedule is set.</p>

<h2>Plan it with MHG</h2>
<p>MHG sets your schedule while the plan and budget are finalized, before work starts, and walks you through progress week by week. Start with the <a href="/blog/full-home-renovation-cost-nj">full home renovation cost guide</a>, then <a href="/contact">ask for a free estimate</a>.</p>
`,
    faqs: [
      { question: "How long does a full home renovation take in NJ?", answer: `No survey measures whole-home projects. As benchmarks, U.S. kitchen projects averaged ${HOUZZ_TIME.kitchen.plan} months of planning and ${HOUZZ_TIME.kitchen.build} months of construction in 2025 (${HOUZZ_STUDY}), and a whole house takes longer than any single room.` },
      { question: "How long does a building permit take in NJ?", answer: "The construction office has 20 business days to approve or deny a complete application (N.J.A.C. 5:23-2.16)." },
      { question: "How fast are inspections in NJ?", answer: "The town performs a requested inspection within three business days, and work stops until each required inspection is done (N.J.A.C. 5:23-2.18)." },
    ],
  },

  "kitchen-renovation-timeline-nj": {
    slug: "kitchen-renovation-timeline-nj",
    seoTitle: "Kitchen Renovation Timeline in NJ (2026)",
    title: "How Long Does a Kitchen Renovation Take in NJ?",
    date: "September 28, 2026",
    excerpt: "How long kitchen projects take according to published data, and what sets a New Jersey kitchen's schedule, step by step.",
    metaDescription: "How long a kitchen renovation takes in NJ: Houzz 2026 project-length data, NJ permit and inspection deadlines, and the order the work happens in.",
    category: "Kitchen",
    readTime: "5 min read",
    sources: ["houzz", "njPermitReview", "njInspections", "njOrdinaryMaintenance", "njHomeImprovementPractices"],
    content: `
<p><strong>Across the U.S. in 2025, kitchen projects averaged ${HOUZZ_TIME.kitchen.plan} months of planning and ${HOUZZ_TIME.kitchen.build} months of construction, according to the ${HOUZZ_STUDY}. Those averages include do-it-yourself projects, which run long. In New Jersey, the permit review and inspections add fixed steps to the schedule.</strong></p>

<h2>Planning takes longer than building</h2>
<p>Most of a kitchen's calendar goes to decisions: layout, cabinets, counters, appliances and tile. Cabinets usually have the longest lead time, so the cabinet order often sets the start date. Every selection made before demolition is a delay that cannot happen later.</p>

<h2>Permits and inspections</h2>
<p>A kitchen that only replaces cabinets and flooring is ordinary maintenance and needs no permit (N.J.A.C. 5:23-2.7). Moving the sink, running gas or adding circuits needs one. The construction office has 20 business days to approve or deny a complete application (N.J.A.C. 5:23-2.16), and work stops at each required inspection, which the town performs within three business days of the request (N.J.A.C. 5:23-2.18).</p>

<h2>The order the work happens in</h2>
<p>Every renovation follows a sequence, and each step waits on the one before it:</p>
<ol>
<li>Design, selections and, if walls move, engineering.</li>
<li>Permit application and review.</li>
<li>Ordering materials, with the longest lead times ordered first.</li>
<li>Demolition and any structural work.</li>
<li>Rough plumbing, electrical and mechanical work, then the rough inspections.</li>
<li>Insulation and drywall, once the rough work has passed.</li>
<li>Cabinets, then counters (templated after the cabinets are set), tile and finishes.</li>
<li>Final inspections and the punch list.</li>
</ol>
<p>A selection that is not made before demolition becomes a stoppage later: counters cannot be templated until cabinets are set, and walls cannot close until the rough work passes inspection.</p>

<h2>What the contract has to say</h2>
<p>New Jersey requires a home improvement contract to state the dates or time period for starting and finishing the work, and any change to them has to be in writing (N.J.A.C. 13:45A-16.2).</p>

<h2>Plan it with MHG</h2>
<p>MHG sets your schedule while the plan and budget are finalized, before work starts, and walks you through progress week by week. See the <a href="/blog/kitchen-remodel-cost">kitchen remodel cost guide</a>, or <a href="/contact">ask for a free estimate</a>.</p>
`,
    faqs: [
      { question: "How long does a kitchen remodel take?", answer: `Kitchen projects averaged ${HOUZZ_TIME.kitchen.plan} months of planning and ${HOUZZ_TIME.kitchen.build} months of construction across the U.S. in 2025 (${HOUZZ_STUDY}), including do-it-yourself work.` },
      { question: "Do I need a permit for a kitchen remodel in NJ?", answer: "Not to replace cabinets or flooring (N.J.A.C. 5:23-2.7). Moving the sink, running gas or adding circuits needs a construction permit." },
      { question: "What delays a kitchen renovation?", answer: "Late selections, cabinet lead times and the inspection steps. Work stops at each required inspection until it is done (N.J.A.C. 5:23-2.18)." },
    ],
  },
};
