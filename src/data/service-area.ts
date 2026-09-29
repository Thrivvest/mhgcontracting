/**
 * Towns MHG serves. Intake (2026-03-28): based in Hamilton, travels "within
 * 25 minutes tops"; best jobs in Princeton, Hamilton, West Windsor,
 * Lawrenceville, Plainsboro and Yardley PA. GBP service area adds Hopewell,
 * Pennington and Robbinsville. East Windsor and Ewing sit inside the radius.
 */
export const SERVICE_AREA_TOWNS = [
  { name: "Hamilton", state: "NJ" },
  { name: "Princeton", state: "NJ" },
  { name: "West Windsor", state: "NJ" },
  { name: "Lawrenceville", state: "NJ" },
  { name: "Plainsboro", state: "NJ" },
  { name: "Robbinsville", state: "NJ" },
  { name: "Hopewell", state: "NJ" },
  { name: "Pennington", state: "NJ" },
  { name: "East Windsor", state: "NJ" },
  { name: "Ewing", state: "NJ" },
  { name: "Yardley", state: "PA" },
] as const;
