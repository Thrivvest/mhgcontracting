/**
 * Sourced copy for the service-in-town pages (website SEO standard 3.1 and
 * 3.4). Every local fact comes from the Census ACS (data/town-housing.json)
 * or the NJ DCA construction-office roster (data/permit-offices.json); every
 * cost comes from data/costs.ts. Nothing here is typed per town, so a town
 * page can only say what the sources say.
 */
import { business } from "@/data/business";
import { CVV, CVV_CITE, HOUZZ, HOUZZ_HOUSEHOLD, HOUZZ_STUDY, HOUZZ_TIME, NAHB, money } from "@/data/costs";
import { HOUSING, PERMIT_OFFICES, SOURCES, townHousing, townOffices, type PermitOffice, type Source } from "@/data/sources";

export interface TownFaq {
  question: string;
  answer: string;
}

interface TownInput {
  serviceSlug: string;
  serviceName: string;
  citySlug: string;
  cityName: string;
  state: string;
}

const NOUN: Record<string, string> = {
  "kitchen-renovations": "kitchen remodel",
  "bathroom-renovations": "bathroom remodel",
  "basement-finishing": "basement finish",
  "full-home-renovations": "whole-home renovation",
  additions: "home addition",
  "new-construction": "new home",
};

export const serviceNoun = (slug: string) => NOUN[slug] ?? "renovation";

/** What the published surveys say this kind of project costs. */
export function costAnswer(serviceSlug: string): { text: string; sources: Source[] } {
  const houzz = `the ${HOUZZ_STUDY}`;
  switch (serviceSlug) {
    case "kitchen-renovations":
      return {
        text: `Nationally, homeowners spent a median of ${money(HOUZZ.kitchenSmall.median)} on a major kitchen remodel under 200 square feet and ${money(HOUZZ.kitchenLarge.median)} on larger ones in 2025, according to ${houzz}. For the Middle Atlantic region, a midrange major kitchen remodel runs about ${money(CVV.majorKitchen.jobCost)} and a midrange minor one about ${money(CVV.minorKitchen.jobCost)}, ${CVV_CITE}.`,
        sources: [SOURCES.houzz, SOURCES.cvv],
      };
    case "bathroom-renovations":
      return {
        text: `Nationally, homeowners spent a median of ${money(HOUZZ.bathSmall.median)} on a major primary bath remodel under 100 square feet and ${money(HOUZZ.bathLarge.median)} on larger ones in 2025, according to ${houzz}. A midrange bathroom remodel in the Middle Atlantic region runs about ${money(CVV.bath.jobCost)}, ${CVV_CITE}.`,
        sources: [SOURCES.houzz, SOURCES.cvv],
      };
    case "basement-finishing":
      return {
        text: `A basement remodel in the Middle Atlantic region runs about ${money(CVV.basement.jobCost)}, ${CVV_CITE}. The final number depends on how much of the space you finish and whether it needs a bathroom or an egress window.`,
        sources: [SOURCES.cvv],
      };
    case "additions":
      return {
        text: `A midrange primary suite addition in the Middle Atlantic region runs about ${money(CVV.primarySuite.jobCost)}, ${CVV_CITE}. Smaller additions cost less; size, foundation and roof tie-in drive the number.`,
        sources: [SOURCES.cvv],
      };
    case "full-home-renovations":
      return {
        text: `No survey prices a "whole-home renovation" as one job. For scale, ${houzz} found the median renovating household spent ${money(HOUZZ_HOUSEHOLD.median)} across all its 2025 projects, and the top 10% spent ${money(HOUZZ_HOUSEHOLD.p90)} or more.`,
        sources: [SOURCES.houzz],
      };
    case "new-construction":
      return {
        text: `Builders nationwide reported an average construction cost of ${money(NAHB.constructionCost)}, about ${money(NAHB.perSqft)} per square foot, for a ${NAHB.sqft.toLocaleString("en-US")} square foot single-family home in ${NAHB.year}, according to the NAHB's Cost of Constructing a Home survey. That excludes the lot, financing and the builder's overhead and profit.`,
        sources: [SOURCES.nahb],
      };
    default:
      return { text: "", sources: [] };
  }
}

/** How long it takes: Houzz for kitchens and baths, MHG's own process otherwise. */
export function timeAnswer(serviceSlug: string): { text: string; sources: Source[] } {
  if (serviceSlug === "kitchen-renovations" || serviceSlug === "bathroom-renovations") {
    const t = serviceSlug === "kitchen-renovations" ? HOUZZ_TIME.kitchen : HOUZZ_TIME.primaryBath;
    return {
      text: `Across the U.S. in 2025, a ${t.label.toLowerCase()} renovation averaged ${t.plan} months of planning and ${t.build} months of construction, according to the ${HOUZZ_STUDY}. MHG sets your schedule while the plan and budget are finalized, before work starts, and walks you through progress week by week.`,
      sources: [SOURCES.houzz],
    };
  }
  return {
    text: `It depends on the size of the job. MHG sets your schedule while the plan and budget are finalized, before work starts, and walks you through progress week by week.`,
    sources: [],
  };
}

function officeLine(o: PermitOffice) {
  const note = o.note ? ` (${o.note})` : "";
  return `${o.municipality} construction office${note} at ${o.street}, ${o.city} ${o.zip}, ${o.phone}`;
}

export function permitAnswer(citySlug: string, cityName: string): { text: string; sources: Source[] } {
  const offices = townOffices(citySlug);
  if (citySlug === "yardley-pa") {
    const o = offices[0];
    return {
      text: `Yardley Borough takes permit applications at Borough Hall, ${o.street} (${o.phone}), and building permits go to the Borough's Building Code Official, according to the Borough's permit page.`,
      sources: [SOURCES.yardleyPermits],
    };
  }
  const where =
    offices.length > 1
      ? `It depends which side of the line you are on: the ${offices.map(officeLine).join("; or the ")}.`
      : `Permits in ${cityName} come from the ${officeLine(offices[0])}.`;
  return {
    text: `${where} That is from the New Jersey DCA roster of construction offices (as of ${PERMIT_OFFICES.asOf}). Under N.J.A.C. 5:23-2.14 most renovation work needs a construction permit; N.J.A.C. 5:23-2.7 lists the ordinary maintenance that does not.`,
    sources: [SOURCES.njConstructionOffices, SOURCES.njPermits, SOURCES.njOrdinaryMaintenance],
  };
}

export function housingAnswer(citySlug: string, cityName: string): { text: string; sources: Source[] } | null {
  const h = townHousing(citySlug);
  if (!h) return null;
  return {
    text: `${h.geography} has about ${h.housingUnits.toLocaleString("en-US")} homes. The median home was built in ${h.medianYearBuilt}, and ${h.pctBuiltBefore1980}% were built before 1980, according to the Census Bureau's American Community Survey (${HOUSING.release}). Homes built before 1978 can contain lead paint, so federal rules require lead-safe work practices when a renovation disturbs painted surfaces (EPA, 40 CFR 745).`,
    sources: [SOURCES.acs, SOURCES.epaRrp],
  };
}

/** Intro paragraphs for the page body. */
export function townIntro(p: TownInput): string[] {
  const h = townHousing(p.citySlug);
  const first = `MHG Contracting is a family-owned contractor at ${business.address.street} in ${business.address.city}, NJ, run by Shahzeb and Shahmi Malik with a crew of ${business.teamSize} plus subcontractors. We take ${serviceNoun(p.serviceSlug)} work within about ${business.radiusMinutes} minutes of Hamilton, and ${p.cityName}, ${p.state} is inside that area.`;
  const second = h
    ? `The median home in ${h.geography} was built in ${h.medianYearBuilt}, ${h.pctBuiltBefore1980}% were built before 1980, and ${h.pctSingleFamilyDetached}% are single-family detached houses (Census ${HOUSING.release}).`
    : "";
  return [first, second].filter(Boolean);
}

/** The visible FAQ block. Schema is built from exactly this list. */
export function townFaqs(p: TownInput): { faqs: TownFaq[]; sources: Source[] } {
  const noun = serviceNoun(p.serviceSlug);
  const cost = costAnswer(p.serviceSlug);
  const time = timeAnswer(p.serviceSlug);
  const permit = permitAnswer(p.citySlug, p.cityName);
  const housing = housingAnswer(p.citySlug, p.cityName);
  const faqs: TownFaq[] = [
    {
      question: `How much does a ${noun} cost in ${p.cityName}?`,
      answer: `${cost.text} MHG prices your project at a free in-home estimate.`,
    },
    { question: `Who issues building permits in ${p.cityName}, ${p.state}?`, answer: permit.text },
    ...(housing ? [{ question: `How old are the homes in ${p.cityName}?`, answer: housing.text }] : []),
    { question: `How long does a ${noun} take?`, answer: time.text },
    {
      question: `Does MHG Contracting work in ${p.cityName}?`,
      answer: `Yes. MHG is based in ${business.address.city}, NJ and works within about ${business.radiusMinutes} minutes of the office, which includes ${p.cityName}. Call ${business.phone} or send the form on this page for a free estimate.`,
    },
  ];
  const seen = new Set<string>();
  const sources = [...cost.sources, ...permit.sources, ...(housing?.sources ?? []), ...time.sources].filter((s) =>
    seen.has(s.id) ? false : (seen.add(s.id), true),
  );
  return { faqs, sources };
}

/** Meta description, kept under 155 characters. */
export function townMeta(p: TownInput): string {
  const h = townHousing(p.citySlug);
  const base = `${p.serviceName} in ${p.cityName}, ${p.state} from MHG Contracting, a family-owned contractor in Hamilton.`;
  const extra = h ? ` ${h.pctBuiltBefore1980}% of ${p.cityName} homes predate 1980.` : "";
  const tail = " Free estimates.";
  const out = base + extra + tail;
  return out.length <= 155 ? out : base + tail;
}
