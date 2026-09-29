/**
 * Outside sources the site cites (website SEO standard 5.2 and 5.4: facts are
 * attributed in the sentence and listed under "Sources"). Every entry was
 * checked against the source on the date shown. Add a source here before
 * citing it anywhere; never paraphrase a number that is not in this file.
 */
import housing from './town-housing.json';
import permitOffices from './permit-offices.json';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  checked: string;
}

export const SOURCES = {
  acs: {
    id: 'acs',
    title: `American Community Survey, ${housing.release} (tables B25034, B25035, B25077)`,
    publisher: 'U.S. Census Bureau, via Census Reporter',
    url: 'https://censusreporter.org/',
    checked: housing.retrieved,
  },
  epaRrp: {
    id: 'epaRrp',
    title: 'Lead Renovation, Repair and Painting Program Rules, 40 CFR 745 Subpart E',
    publisher: 'U.S. Environmental Protection Agency',
    url: 'https://www.epa.gov/lead/lead-renovation-repair-and-painting-program-rules',
    checked: '2026-09-26',
  },
  njPermits: {
    id: 'njPermits',
    title: 'N.J.A.C. 5:23-2.14, Construction permits: when required',
    publisher: 'New Jersey Uniform Construction Code',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-5-23-2-14',
    checked: '2026-09-26',
  },
  njResidentialCode: {
    id: 'njResidentialCode',
    title: 'International Residential Code 2021, New Jersey Edition: R303.3 bathroom ventilation, R305 ceiling height, R310 emergency escape and rescue openings',
    publisher: 'International Code Council / N.J. Uniform Construction Code',
    url: 'https://up.codes/viewer/new_jersey/irc-2021/chapter/3/building-planning',
    checked: '2026-09-26',
  },
  njHicInsurance: {
    id: 'njHicInsurance',
    title: 'N.J.S.A. 56:8-142, Liability and workers\' compensation insurance for registered contractors',
    publisher: 'New Jersey Revised Statutes',
    url: 'https://law.justia.com/codes/new-jersey/title-56/section-56-8-142/',
    checked: '2026-09-26',
  },
  houzz: {
    id: 'houzz',
    title: '2026 U.S. Houzz & Home Study (renovation spend and project length in 2025)',
    publisher: 'Houzz Inc.',
    url: 'https://st.hzcdn.com/static/econ/2026_U.S._Houzz_and_Home_Study_RenovationTrends.pdf',
    checked: '2026-09-26',
  },
  houzzKitchen: {
    id: 'houzzKitchen',
    title: '2026 U.S. Houzz Kitchen Trends Study (1,780 renovating homeowners, surveyed July 2025)',
    publisher: 'Houzz Inc.',
    url: 'https://st.hzcdn.com/static/econ/2026_Houzz_US_Kitchen_Trends_Report.pdf',
    checked: '2026-09-26',
  },
  houzzBath: {
    id: 'houzzBath',
    title: '2025 U.S. Houzz Bathroom Trends Study (1,738 renovating homeowners, surveyed July 2025)',
    publisher: 'Houzz Inc.',
    url: 'https://st.hzcdn.com/static/econ/2025_US_Houzz_Bathroom_Trends_Study_.pdf',
    checked: '2026-09-26',
  },
  cvv: {
    id: 'cvv',
    title: 'Remodeling 2025 Cost vs. Value Report, Middle Atlantic region',
    publisher: 'Zonda Media',
    url: 'https://www.costvsvalue.com/',
    checked: '2026-09-26',
  },
  njOrdinaryMaintenance: {
    id: 'njOrdinaryMaintenance',
    title: 'N.J.A.C. 5:23-2.7, Ordinary maintenance (work that needs no permit)',
    publisher: 'New Jersey Uniform Construction Code',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-5-23-2-7',
    checked: '2026-09-26',
  },
  njHicRegistration: {
    id: 'njHicRegistration',
    title: 'N.J.S.A. 56:8-138 and 56:8-144, Contractor registration and display of the registration number',
    publisher: 'New Jersey Revised Statutes (Contractors\' Registration Act)',
    url: 'https://law.justia.com/codes/new-jersey/title-56/section-56-8-138/',
    checked: '2026-09-26',
  },
  njHicContracts: {
    id: 'njHicContracts',
    title: 'N.J.S.A. 56:8-151, Home improvement contracts: writing, contents and three-day cancellation',
    publisher: 'New Jersey Revised Statutes (Contractors\' Registration Act)',
    url: 'https://law.justia.com/codes/new-jersey/title-56/section-56-8-151/',
    checked: '2026-09-26',
  },
  njHomeImprovementPractices: {
    id: 'njHomeImprovementPractices',
    title: 'N.J.A.C. 13:45A-16.2, Home Improvement Practices (contract terms, permits, warranties)',
    publisher: 'New Jersey Division of Consumer Affairs',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-45A-16-2',
    checked: '2026-09-26',
  },
  njLicenseLookup: {
    id: 'njLicenseLookup',
    title: 'License Verification System (search home improvement contractor registrations)',
    publisher: 'New Jersey Division of Consumer Affairs',
    url: 'https://newjersey.mylicense.com/verification/',
    checked: '2026-09-26',
  },
  epaRrpFirms: {
    id: 'epaRrpFirms',
    title: 'Renovation, Repair and Painting Program: Contractors (firm certification, minor repair exemption)',
    publisher: 'U.S. Environmental Protection Agency',
    url: 'https://www.epa.gov/lead/renovation-repair-and-painting-program-contractors',
    checked: '2026-09-26',
  },
  njInspections: {
    id: 'njInspections',
    title: 'N.J.A.C. 5:23-2.18, Inspections (work stops for each required inspection; performed within three business days of a request)',
    publisher: 'New Jersey Uniform Construction Code',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-5-23-2-18',
    checked: '2026-09-26',
  },
  njElectrical: {
    id: 'njElectrical',
    title: 'N.J.S.A. 45:5A-9, Electrical contractors: business permit and license required',
    publisher: 'New Jersey Revised Statutes',
    url: 'https://law.justia.com/codes/new-jersey/title-45/section-45-5a-9/',
    checked: '2026-09-26',
  },
  njPlumbing: {
    id: 'njPlumbing',
    title: 'N.J.S.A. 45:14C-12.3, Plumbing contractors must be authorized under the master plumbers act',
    publisher: 'New Jersey Revised Statutes',
    url: 'https://law.justia.com/codes/new-jersey/title-45/section-45-14c-12-3/',
    checked: '2026-09-26',
  },
  njPermitApplication: {
    id: 'njPermitApplication',
    title: 'N.J.A.C. 5:23-2.15, Construction permits: application (prior approvals, licensed trades, contractor registration)',
    publisher: 'New Jersey Uniform Construction Code',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-5-23-2-15',
    checked: '2026-09-26',
  },
  njPermitReview: {
    id: 'njPermitReview',
    title: 'N.J.A.C. 5:23-2.16, Construction permits: procedure (20 business days to approve or deny)',
    publisher: 'New Jersey Uniform Construction Code',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-5-23-2-16',
    checked: '2026-09-26',
  },
  njZoningVariance: {
    id: 'njZoningVariance',
    title: 'N.J.S.A. 40:55D-70, Powers of the zoning board of adjustment (variances)',
    publisher: 'New Jersey Municipal Land Use Law',
    url: 'https://law.justia.com/codes/new-jersey/title-40/section-40-55d-70/',
    checked: '2026-09-26',
  },
  njConstructionOffices: {
    id: 'njConstructionOffices',
    title: `Listing of NJ Municipal Construction Code Enforcement Officials (as of ${permitOffices.asOf})`,
    publisher: 'New Jersey Department of Community Affairs',
    url: permitOffices.url,
    checked: permitOffices.retrieved,
  },
  njAddedAssessment: {
    id: 'njAddedAssessment',
    title: 'N.J.S.A. 54:4-63.3, Added assessments for improvements completed during the year',
    publisher: 'New Jersey Revised Statutes',
    url: 'https://law.justia.com/codes/new-jersey/title-54/section-54-4-63-3/',
    checked: '2026-09-26',
  },
  nahb: {
    id: 'nahb',
    title: 'Cost of Constructing a Home 2024 (national builder survey, January 2025)',
    publisher: 'National Association of Home Builders',
    url: 'https://www.nahb.org/-/media/NAHB/news-and-economics/docs/housing-economics-plus/special-studies/2025/special-study-cost-of-constructing-a-home-2024-january-2025.pdf',
    checked: '2026-09-28',
  },
  yardleyPermits: {
    id: 'yardleyPermits',
    title: 'Yardley Borough: Submit a permit',
    publisher: 'Yardley Borough, Bucks County, PA',
    url: 'https://www.yardleyboro.org/submit-a-permit',
    checked: '2026-09-28',
  },
  epaPamphlet: {
    id: 'epaPamphlet',
    title: '40 CFR 745.84, Information distribution (Renovate Right pamphlet)',
    publisher: 'U.S. Environmental Protection Agency, Code of Federal Regulations',
    url: 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-745/subpart-E/section-745.84',
    checked: '2026-09-26',
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

export type TownHousing = (typeof housing.towns)[keyof typeof housing.towns];
export const townHousing = (slug: string): TownHousing | undefined => (housing.towns as Record<string, TownHousing>)[slug];
export const HOUSING = housing;

/** Moved to data/costs.ts (the only file allowed to hold dollar figures); re-exported for older imports. */
export { NJ_HIC_MIN_LIABILITY } from './costs';

/** The construction office(s) for a town page, from the DCA roster (data/permit-offices.json). */
export interface PermitOffice {
  municipality: string;
  county: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
  note?: string;
  sourceUrl?: string;
}
export const townOffices = (slug: string): PermitOffice[] =>
  (permitOffices.offices as Record<string, PermitOffice[]>)[slug] ?? [];
export const PERMIT_OFFICES = permitOffices;
