/**
 * The answer library at /answers (website SEO standard 6.1 and 6.2): one
 * question per page, a 40 to 60 word direct answer first, then detail,
 * visible FAQs and a Sources list. None of these duplicates a guide: costs,
 * permits and hiring live in the blog guides, which these pages link to.
 *
 * Rules for this file:
 *  - Dollar figures only through data/costs.ts; the build fails otherwise.
 *  - Every statute, rule or survey is named in the sentence and listed in
 *    `sources`. Facts checked against the sources in data/sources.ts
 *    (NJ rules checked 2026-09-26, Kubat; figures and offices 2026-09-28).
 *  - Written for MHG in its own words. Do not paste Kubat's answer text:
 *    the same page on two client domains competes with itself.
 *  - Body strings are HTML; links are internal paths only.
 */
import { CVV, CVV_CITE, money } from "./costs";
import { business } from "./business";
import { HOUSING, PERMIT_OFFICES, townHousing, townOffices, type SourceId } from "./sources";

export interface Answer {
  slug: string;
  question: string;
  /** <title>, max 60 characters. */
  metaTitle: string;
  /** Meta description, 70 to 155 characters. */
  description: string;
  /** The direct answer, 40 to 60 words, plain text. */
  answer: string;
  sections: { heading: string; html: string }[];
  faqs: { question: string; answer: string }[];
  sources: SourceId[];
  related: { href: string; label: string }[];
  published: string;
  updated: string;
}

const MERCER = ["hamilton-nj", "ewing-nj", "princeton-nj", "lawrenceville-nj", "hopewell-nj", "east-windsor-nj", "west-windsor-nj", "robbinsville-nj", "pennington-nj"];

function housingTable(): string {
  const rows = MERCER.map((s) => townHousing(s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .map((h) => `<tr><td>${h.geography}</td><td>${h.medianYearBuilt}</td><td>${h.pctBuiltBefore1980}%</td></tr>`)
    .join("");
  return `<div class="cost-table-wrap"><table class="cost-table"><caption>Housing age in Mercer County towns (Census ${HOUSING.release})</caption><thead><tr><th>Town</th><th>Median year built</th><th>Built before 1980</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

const HAM = townOffices("hamilton-nj")[0];
const HAMILTON_PRE1980 = townHousing("hamilton-nj")?.pctBuiltBefore1980;

export const answers: Answer[] = [
  {
    slug: "cancel-home-improvement-contract-nj",
    question: "Can I cancel a home improvement contract in New Jersey?",
    metaTitle: "Can You Cancel a Home Improvement Contract in NJ?",
    description: "New Jersey gives homeowners three business days to cancel a home improvement contract for any reason. How to do it and when your money comes back.",
    answer: "Yes. Under N.J.S.A. 56:8-151 you can cancel a home improvement contract for any reason until midnight of the third business day after you get your copy. Send a signed, dated written notice by certified or registered mail, or hand it in at the contractor's address, and the contractor has 30 days to refund you.",
    sections: [
      {
        heading: "How to cancel",
        html: `<ol>
<li>Write a short notice saying you are cancelling the contract. Sign and date it.</li>
<li>Send it by registered or certified mail with a return receipt, or deliver it by hand, to the address printed in the contract.</li>
<li>Do it before midnight of the third business day after you received your copy.</li>
<li>Keep a copy of the notice and the mail receipt.</li>
</ol>`,
      },
      {
        heading: "What happens to your money",
        html: "<p>Everything you paid under the contract has to be refunded within 30 days of the contractor receiving your notice. If you signed a loan or credit agreement through the contractor to pay for the work, it is cancelled too, without penalty (N.J.S.A. 56:8-151).</p>",
      },
      {
        heading: "Look for the notice before you sign",
        html: `<p>New Jersey requires every home improvement contract to include a "Notice to Consumer" that explains this right in at least 10-point bold type, with the contractor's name, address and phone number (N.J.S.A. 56:8-151). If a contract does not have one, ask why. After the three days, cancelling depends on what the contract itself says. More on what a contract must include in <a href="/blog/choosing-a-contractor">how to choose a contractor in NJ</a>.</p>`,
      },
    ],
    faqs: [
      { question: "Do I need a reason to cancel?", answer: "No. The three-day right applies for any reason (N.J.S.A. 56:8-151)." },
      { question: "Can I cancel by email or phone?", answer: "The statute calls for written notice sent by registered or certified mail, return receipt requested, or delivered in person to the address in the contract (N.J.S.A. 56:8-151)." },
    ],
    sources: ["njHicContracts"],
    related: [
      { href: "/blog/choosing-a-contractor", label: "How to choose a contractor in NJ" },
      { href: "/answers/building-permit-time-hamilton-nj", label: "How long a building permit takes in Hamilton" },
    ],
    published: "2026-09-28",
    updated: "2026-09-28",
  },
  {
    slug: "basement-bedroom-requirements-nj",
    question: "What does a basement bedroom need in New Jersey?",
    metaTitle: "What a Basement Bedroom Needs in New Jersey",
    description: "The New Jersey code rules for a basement bedroom: an emergency escape opening, ceiling height, and the construction permit that finishing a basement needs.",
    answer: "Under the New Jersey edition of the International Residential Code, a basement bedroom needs an emergency escape and rescue opening, usually an egress window with a window well (section R310), and habitable basement space needs a ceiling at least 7 feet high, with beams and ducts allowed down to 6 feet 4 inches (section R305).",
    sections: [
      {
        heading: "The escape opening",
        html: "<p>Section R310 of the New Jersey edition of the International Residential Code requires an emergency escape and rescue opening for basement sleeping rooms. In most houses that means cutting a larger window into the foundation and adding a window well, which is structural work and part of the permit.</p>",
      },
      {
        heading: "Ceiling height",
        html: "<p>Habitable space in a basement needs a ceiling height of at least 7 feet, and beams, ducts and pipes may hang down to 6 feet 4 inches (section R305 of the New Jersey edition). Measure before you plan: moving ductwork or pipes to clear the height adds cost.</p>",
      },
      {
        heading: "The permit",
        html: `<p>Finishing a basement means framing, wiring and usually plumbing, none of which is ordinary maintenance (N.J.A.C. 5:23-2.7), so it needs a construction permit (N.J.A.C. 5:23-2.14). The inspector checks the escape opening and ceiling height before the room can be used. See <a href="/blog/basement-finishing-cost">basement finishing cost</a> for the budget side.</p>`,
      },
    ],
    faqs: [
      { question: "Can I finish a basement without a bedroom and skip the egress window?", answer: "The escape-opening rule in section R310 of the New Jersey edition of the International Residential Code applies to basement sleeping rooms. A basement with no bedroom is still habitable space and still needs a construction permit under N.J.A.C. 5:23-2.14." },
      { question: "Is 7 feet the ceiling height everywhere in the basement?", answer: "Habitable basement space needs at least 7 feet, and beams, ducts and pipes may project down to 6 feet 4 inches (section R305, New Jersey edition of the International Residential Code)." },
    ],
    sources: ["njResidentialCode", "njOrdinaryMaintenance", "njPermits"],
    related: [
      { href: "/blog/basement-finishing-cost", label: "What it costs to finish a basement in Central NJ" },
      { href: "/blog/basement-finishing-ideas", label: "Basement finishing ideas" },
      { href: "/services/basement-finishing", label: "Basement finishing with MHG" },
    ],
    published: "2026-09-28",
    updated: "2026-09-28",
  },
  {
    slug: "lead-paint-rules-renovation-nj",
    question: "Do lead paint rules apply to my renovation in New Jersey?",
    metaTitle: "Lead Paint Rules for Renovating a NJ Home",
    description: "If your house was built before 1978, EPA lead-safe rules cover most renovations: who must be certified, the pamphlet you get, and Mercer housing ages.",
    answer: `If your home was built before 1978, yes. Under the EPA's Renovation, Repair and Painting Rule (40 CFR 745), anyone paid to disturb paint must work through an EPA-certified firm using lead-safe practices, and must give you the Renovate Right pamphlet before starting. In Hamilton, ${HAMILTON_PRE1980}% of homes were built before 1980.`,
    sections: [
      {
        heading: "Mercer County homes are old enough",
        html: `<p>Many renovations near Hamilton happen in houses the rule covers. The Census Bureau's American Community Survey (${HOUSING.release}) shows how old the housing is:</p>${housingTable()}<p>The rule's cutoff is 1978, and the Census groups homes by decade, so the share built before 1980 is the closest public measure.</p>`,
      },
      {
        heading: "What the rule requires",
        html: "<ul><li><strong>Certification.</strong> A firm paid to do renovation that disturbs paint in pre-1978 housing must be EPA-certified, and the work must follow lead-safe practices (EPA).</li><li><strong>The pamphlet.</strong> No more than 60 days before work starts, the firm must give the owner the EPA's Renovate Right pamphlet and get a written acknowledgment (40 CFR 745.84).</li><li><strong>Lead-safe work.</strong> Containing dust, cleaning up and verifying the cleanup are part of the job, not extras.</li></ul>",
      },
      {
        heading: "The minor repair exemption",
        html: "<p>Small jobs that disturb 6 square feet of paint or less per room inside, or 20 square feet or less outside, are exempt. Window replacement and demolition of painted surfaces are always covered, whatever the size (EPA).</p>",
      },
      {
        heading: "What to ask a contractor",
        html: `<p>Ask for the firm's EPA certification before you sign, and expect the Renovate Right pamphlet before work starts. Then see <a href="/blog/choosing-a-contractor">how to choose a contractor in NJ</a> for the registration, insurance and contract checks.</p>`,
      },
    ],
    faqs: [
      { question: "Does the lead paint rule apply to a kitchen or bathroom remodel?", answer: "If the house was built before 1978 and the work disturbs painted surfaces beyond the minor repair limits, yes. Demolition of painted surfaces is always covered (EPA Renovation, Repair and Painting Rule)." },
      { question: "What is the Renovate Right pamphlet?", answer: "An EPA pamphlet on lead-safe renovation that the firm must give the owner no more than 60 days before work starts in a pre-1978 home, with a written acknowledgment that you received it (40 CFR 745.84)." },
    ],
    sources: ["epaRrp", "epaRrpFirms", "epaPamphlet", "acs"],
    related: [
      { href: "/blog/home-remodeling-cost-hamilton-nj", label: "Home remodeling cost in Hamilton, NJ" },
      { href: "/blog/choosing-a-contractor", label: "How to choose a contractor in NJ" },
    ],
    published: "2026-09-28",
    updated: "2026-09-28",
  },
  {
    slug: "renovation-property-taxes-nj",
    question: "Will a renovation raise my property taxes in New Jersey?",
    metaTitle: "Will a Renovation Raise Your NJ Property Taxes?",
    description: "How New Jersey taxes a finished addition or renovation: the added assessment for the rest of the year, and which projects tend to change it.",
    answer: "It can. When an improvement that adds value is finished during the year, New Jersey's added assessment law (N.J.S.A. 54:4-63.3) lets the tax assessor value the property as of the first of the next month and bill a prorated added assessment for the rest of that year. The new value then carries into the next year's assessment.",
    sections: [
      {
        heading: "How the added assessment works",
        html: "<p>Say an addition is finished in June. The assessor can value the house as of July 1 and add a prorated assessment for July through December (N.J.S.A. 54:4-63.3). From the next year on, the higher assessment is part of your regular tax bill.</p>",
      },
      {
        heading: "Which projects are most likely to change it",
        html: `<p>Work that adds living space, like an <a href="/services/additions">addition</a> or a <a href="/services/basement-finishing">finished basement</a>, is the most likely to raise an assessment, because it changes what the house is. Replacing things that already exist, like new cabinets or a new vanity, is less likely to. Your municipal tax assessor makes the call.</p>`,
      },
      {
        heading: "How the assessor finds out",
        html: `<p>A construction permit is a public record of the work (N.J.A.C. 5:23-2.14). Skipping the permit to avoid taxes is a bad trade: unpermitted work can surface at sale, and the town can require it opened up for inspection. See <a href="/blog/permits-nj">do you need a permit in NJ</a>.</p>`,
      },
    ],
    faqs: [
      { question: "When does the higher tax start after a renovation in NJ?", answer: "For an improvement completed during the year, the assessor can value it as of the first of the following month and bill a prorated added assessment for the rest of the year (N.J.S.A. 54:4-63.3)." },
      { question: "Will a new kitchen raise my property taxes?", answer: "It can if it adds value. Your municipal tax assessor decides; projects that add living space, like additions, are the most likely to change the assessment." },
    ],
    sources: ["njAddedAssessment", "njPermits"],
    related: [
      { href: "/blog/home-additions-cost-mercer-county-nj", label: "Home addition cost in Mercer County" },
      { href: "/answers/remodel-resale-value-nj", label: "Which remodel pays back the most at resale" },
    ],
    published: "2026-09-28",
    updated: "2026-09-28",
  },
  {
    slug: "remodel-resale-value-nj",
    question: "Which home remodel pays back the most at resale in New Jersey?",
    metaTitle: "Which Remodel Pays Back the Most in NJ?",
    description: "Resale payback for kitchens, baths, basements and additions in the Middle Atlantic region, from the Remodeling 2025 Cost vs. Value Report.",
    answer: `A minor kitchen remodel. In the Middle Atlantic region, which includes New Jersey, a midrange minor kitchen remodel recoups about ${CVV.minorKitchen.recouped}% of its cost at resale, more than a bathroom remodel at ${CVV.bath.recouped}% or a basement at ${CVV.basement.recouped}%, ${CVV_CITE}. A major kitchen remodel and a primary suite addition recoup less.`,
    sections: [
      {
        heading: "Payback by project",
        html: `<p>For the Middle Atlantic region, ${CVV_CITE}:</p><ul>
<li>A midrange minor kitchen remodel costs about ${money(CVV.minorKitchen.jobCost)} and recoups about ${CVV.minorKitchen.recouped}% at resale.</li>
<li>A midrange bathroom remodel costs about ${money(CVV.bath.jobCost)} and recoups about ${CVV.bath.recouped}%.</li>
<li>A basement remodel costs about ${money(CVV.basement.jobCost)} and recoups about ${CVV.basement.recouped}%.</li>
<li>A midrange major kitchen remodel costs about ${money(CVV.majorKitchen.jobCost)} and recoups about ${CVV.majorKitchen.recouped}%.</li>
<li>A midrange primary suite addition costs about ${money(CVV.primarySuite.jobCost)} and recoups about ${CVV.primarySuite.recouped}%.</li>
</ul>`,
      },
      {
        heading: "How to use these numbers",
        html: `<p>If you are selling soon, the smaller jobs win: a refreshed kitchen or bathroom returns more of its cost than a big remodel or an addition. If you are staying, payback is only part of it. People add a primary suite because they need the room, not to profit. The cost guides break down each project: <a href="/blog/kitchen-remodel-cost">kitchen</a>, <a href="/blog/bathroom-remodel-cost">bathroom</a>, <a href="/blog/basement-finishing-cost">basement</a> and <a href="/blog/home-additions-cost-mercer-county-nj">additions</a>.</p>`,
      },
    ],
    faqs: [
      { question: "Does a bathroom remodel add value in NJ?", answer: `Some. A midrange bathroom remodel recoups about ${CVV.bath.recouped}% of its cost at resale in the Middle Atlantic region, ${CVV_CITE}.` },
      { question: "Is a major kitchen remodel worth it for resale?", answer: `Less so than a minor one. A midrange major kitchen remodel recoups about ${CVV.majorKitchen.recouped}% of its cost at resale in the Middle Atlantic region, against about ${CVV.minorKitchen.recouped}% for a minor one, ${CVV_CITE}.` },
    ],
    sources: ["cvv"],
    related: [
      { href: "/blog/kitchen-remodel-cost", label: "What a kitchen remodel costs in NJ" },
      { href: "/answers/renovation-property-taxes-nj", label: "Will a renovation raise your property taxes" },
    ],
    published: "2026-09-28",
    updated: "2026-09-28",
  },
  {
    slug: "building-permit-time-hamilton-nj",
    question: "How long does a building permit take in Hamilton Township, NJ?",
    metaTitle: "How Long a Building Permit Takes in Hamilton, NJ",
    description: "NJ gives a construction office 20 business days to act on a complete permit application. Hamilton Township's office, inspections, and what needs no permit.",
    answer: `New Jersey gives a construction office 20 business days to approve or deny a complete permit application (N.J.A.C. 5:23-2.16), and once work starts, the town performs a requested inspection within three business days (N.J.A.C. 5:23-2.18). In Hamilton Township, applications go to the construction office at ${HAM.street}, ${HAM.phone}.`,
    sections: [
      {
        heading: "Hamilton Township's construction office",
        html: `<p>${HAM.municipality} construction office: ${HAM.street}, ${HAM.city}, NJ ${HAM.zip}, ${HAM.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}). Call to confirm hours and fees before you apply; fees are set locally.</p>`,
      },
      {
        heading: "What makes an application complete",
        html: "<p>The application has to name the licensed electrical and plumbing contractors doing that work and the home improvement contractor's registration (N.J.A.C. 5:23-2.15). The 20 business days run on a complete application, so missing drawings or trade information restart the wait.</p>",
      },
      {
        heading: "During the job",
        html: "<p>Work stops at each required inspection, such as rough plumbing and wiring before the walls close, and the town performs an inspection within three business days of the request (N.J.A.C. 5:23-2.18). A contractor may not start before the permit is issued (N.J.A.C. 13:45A-16.2).</p>",
      },
      {
        heading: "Work that needs no permit",
        html: `<p>Ordinary maintenance, like painting, flooring, new cabinets or swapping a fixture without changing the piping, needs no permit (N.J.A.C. 5:23-2.7). The full list is in <a href="/blog/permits-nj">do you need a permit in NJ</a>.</p>`,
      },
    ],
    faqs: [
      { question: "Where do I get a building permit in Hamilton Township?", answer: `From the ${HAM.municipality} construction office at ${HAM.street}, ${HAM.city}, ${HAM.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}).` },
      { question: "How fast are inspections in Hamilton, NJ?", answer: "New Jersey requires the town to perform a requested inspection within three business days (N.J.A.C. 5:23-2.18)." },
    ],
    sources: ["njPermitReview", "njInspections", "njPermitApplication", "njHomeImprovementPractices", "njOrdinaryMaintenance", "njConstructionOffices"],
    related: [
      { href: "/blog/permits-nj", label: "Do you need a permit to remodel in NJ" },
      { href: "/blog/home-remodeling-cost-hamilton-nj", label: "Home remodeling cost in Hamilton, NJ" },
    ],
    published: "2026-09-28",
    updated: "2026-09-28",
  },
];

export const getAnswer = (slug: string) => answers.find((a) => a.slug === slug);

/** Contact line appended to every answer page. */
export const ANSWER_CTA = `MHG Contracting is a family-owned contractor at ${business.address.street} in Hamilton, NJ (NJ HIC #${business.hic}). Estimates are free: call ${business.phone}.`;
