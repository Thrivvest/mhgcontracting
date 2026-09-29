/**
 * Which outside source a piece of text cites (website SEO standard 5.4).
 * Pages build their visible Sources list from this, and
 * scripts/quality-gate.mjs uses the same patterns to fail the build when a
 * page cites something its Sources list does not name.
 */
import { SOURCES, type Source, type SourceId } from "@/data/sources";

export const CITATION_PATTERNS: [RegExp, SourceId][] = [
  [/5:23-2\.7\b/, "njOrdinaryMaintenance"],
  [/5:23-2\.14\b/, "njPermits"],
  [/5:23-2\.15\b/, "njPermitApplication"],
  [/5:23-2\.16\b/, "njPermitReview"],
  [/5:23-2\.18\b/, "njInspections"],
  [/13:45A-16\.2\b/, "njHomeImprovementPractices"],
  [/56:8-13[8]\b|56:8-144\b/, "njHicRegistration"],
  [/56:8-142\b/, "njHicInsurance"],
  [/56:8-151\b/, "njHicContracts"],
  [/45:5A-9\b/, "njElectrical"],
  [/45:14C-12\.3\b/, "njPlumbing"],
  [/40:55D-70\b/, "njZoningVariance"],
  [/Houzz/, "houzz"],
  [/Cost vs\. Value/, "cvv"],
  [/NAHB/, "nahb"],
  [/American Community Survey|Census ACS/, "acs"],
  [/40 CFR 745/, "epaRrp"],
  [/International Residential Code/, "njResidentialCode"],
  [/License Verification System|mylicense\.com/, "njLicenseLookup"],
  [/DCA roster/, "njConstructionOffices"],
  [/54:4-63\.3\b/, "njAddedAssessment"],
  [/745\.84\b|Renovate Right/, "epaPamphlet"],
];

/** Sources cited anywhere in the given text, in a stable order, deduped. */
export function citedSources(...texts: string[]): Source[] {
  const all = texts.join("\n");
  const ids = new Set<SourceId>();
  for (const [re, id] of CITATION_PATTERNS) if (re.test(all)) ids.add(id);
  return [...ids].map((id) => SOURCES[id]);
}
