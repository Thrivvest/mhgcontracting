/**
 * THE business facts file (website SEO standard 2.1 and 5.2). Name, address,
 * phone and hours match the Google Business Profile exactly; everything else
 * comes from Shahzeb's intake form (2026-03-28). Checked against GBP
 * 2026-09-28. If it is not in this file, the site does not claim it.
 */

export const SITE_URL = "https://mhgcon.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const business = {
  name: "MHG Contracting",
  legalName: "Malik Holding Group LLC DBA MHG Contracting",
  owners: ["Shahzeb Malik", "Shahmi Malik"],
  phone: "(609) 712-2474",
  phoneHref: "tel:+16097122474",
  phoneE164: "+16097122474",
  email: "shahzeb@mhgcon.com",
  address: {
    street: "2145 Nottingham Way",
    city: "Hamilton",
    state: "NJ",
    zip: "08619",
  },
  geo: { latitude: 40.2354, longitude: -74.6914 },
  /** GBP "opened" date. */
  opened: "2021-02",
  /** NJ Division of Consumer Affairs registration (registered, not licensed). */
  hic: "13VH13286900",
  /** Intake: "a team of 7 guys along with our subcontractors". */
  teamSize: 7,
  /** Intake: travels "within 25 minutes tops" of Hamilton. */
  radiusMinutes: 25,
  /** GBP regular hours. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
    { days: ["Saturday"], opens: "09:00", closes: "16:00" },
  ],
  hoursText: "Mon to Fri 8:00 AM to 7:00 PM, Sat 9:00 AM to 4:00 PM",
  mapsUrl: "https://maps.google.com/maps?cid=16908656143003943659",
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJjwzsQZ1fwYkR6wL6GC2dp-o",
  social: {
    instagram: "https://instagram.com/mhgcontracting",
    facebook: "https://facebook.com/mhgcontracting",
    houzz: "https://www.houzz.com/professionals/general-contractors/mhg-contracting-pfvwus-pf~566670827",
  },
} as const;

/**
 * Google rating, shown as text only (never as AggregateRating markup, standard
 * 2.3). Update from the GBP reviews pull; date says when.
 */
export const googleRating = { rating: 4.9, count: 28, checked: "2026-09-28" } as const;

/** Schema node pointing at the one business entity declared in the layout. */
export const businessRef = { "@id": BUSINESS_ID } as const;
