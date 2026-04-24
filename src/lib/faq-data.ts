export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  intro?: string;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: "Working with MHG",
    items: [
      {
        question: "What areas do you serve?",
        answer: "We serve Central New Jersey and Bucks County, PA. Our primary markets are Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Hopewell, Pennington, Robbinsville, East Windsor, and Yardley PA. We occasionally take projects outside this radius for existing clients.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes. We carry an active NJ Home Improvement Contractor registration, general liability insurance of $1,000,000, and workers compensation for all employees. We will provide certificates of insurance listing you as the certificate holder before any work begins.",
      },
      {
        question: "Who will actually be at my house?",
        answer: "Our own team. We use our own carpenters, project leads, and finish crews for the majority of the work. For specialty trades like electrical, plumbing, and HVAC, we use a short list of licensed subcontractors we have worked with for years. You will meet the project lead on day one and they will be on site daily.",
      },
      {
        question: "How do you communicate during the project?",
        answer: "Weekly on-site meetings with the project lead, plus day-to-day updates by text or email for anything that needs a decision. We document every change in writing before work proceeds. If you prefer a different cadence, we adjust.",
      },
      {
        question: "How long have you been in business?",
        answer: "MHG Contracting is a family-owned company with years of hands-on residential contracting experience across Central NJ. We focus on kitchen, bathroom, basement, addition, and new construction work for homeowners.",
      },
    ],
  },
  {
    title: "Project Process and Timeline",
    items: [
      {
        question: "What happens on the first visit?",
        answer: "We come to your home, look at the space, talk through what you want to change and why, take measurements, and discuss your budget range. The visit takes 45 to 90 minutes depending on scope. You get a written estimate within a week.",
      },
      {
        question: "How long do projects typically take?",
        answer: "Powder rooms run 2 to 3 weeks. Hall bathrooms run 4 to 6 weeks. Kitchens run 6 to 12 weeks depending on scope. Basement finishes run 8 to 14 weeks. Additions run 12 to 20 weeks. These are on-site timelines. Planning and ordering happens before demo starts.",
      },
      {
        question: "Can I stay in my home during the renovation?",
        answer: "Almost always yes. We use dust containment, protect flooring on all traffic paths, and clean the site daily. For kitchen remodels, most homeowners set up a temporary kitchen in the dining room or basement. For bathrooms, we sequence work so at least one bathroom is always functional.",
      },
      {
        question: "Do you provide design services?",
        answer: "We do design for the projects we build. For kitchens and bathrooms, we handle layout, cabinetry design, material selection, and fixture specification in-house. For larger remodels and additions where an architect is needed, we coordinate with an outside architect or you can bring your own.",
      },
      {
        question: "What if something comes up mid-project?",
        answer: "Renovations uncover surprises, especially in older homes. When something comes up, we stop, document what we found, price the fix, and get your approval in writing before the work happens. No surprises on your invoice.",
      },
    ],
  },
  {
    title: "Cost and Payment",
    items: [
      {
        question: "Do you provide free estimates?",
        answer: "Yes. Our in-home consultations and written estimates are free. You get a line-item quote with specific materials, brands, and scope defined, not a single number with nothing behind it.",
      },
      {
        question: "How do payments work?",
        answer: "Payments are milestone-based, not calendar-based. A small deposit at contract signing, then payments tied to demo, rough-in, drywall, substantial completion, and final punch list. You pay for work that has been completed, not for a date on the calendar.",
      },
      {
        question: "Do you require a large deposit up front?",
        answer: "No. Our contracts comply with NJ home improvement law on deposit limits. If a contractor is asking for 50 percent up front to start, that is a red flag regardless of who it is.",
      },
      {
        question: "Do you offer financing?",
        answer: "We do not offer in-house financing, but we can provide guidance on common options like home equity lines of credit and dedicated renovation financing programs. Most of our clients finance through their existing bank or credit union.",
      },
      {
        question: "Why are your estimates sometimes higher than others we received?",
        answer: "Usually because our scope is more complete. We include proper waterproofing, permit fees, realistic contingency, and specific material allowances. A cheaper quote with a vague scope often ends up costing more once change orders add up for items that should have been in the original number.",
      },
    ],
  },
  {
    title: "Permits and Logistics",
    items: [
      {
        question: "Do I need a permit for my renovation?",
        answer: "Most likely yes. NJ requires permits for structural, electrical, plumbing, and mechanical work, which covers almost every real kitchen, bathroom, basement, or addition project. We pull permits in our name, schedule inspections, and close out the permit at the end of the job.",
      },
      {
        question: "Who handles inspections?",
        answer: "We do. We coordinate with the local construction official, meet the inspector on site, and handle any follow-up items. You do not need to be home for inspections.",
      },
      {
        question: "What about HOA approval?",
        answer: "If you live in a development with an HOA, most exterior work and some structural work requires HOA architectural review. We can provide the documentation they typically need. Getting HOA approval before we start is your responsibility, but we help with the paperwork.",
      },
      {
        question: "Do you handle demolition and disposal?",
        answer: "Yes. We bring a dumpster to the site, remove all demo debris, and clean the jobsite daily. At project end, we do a full final cleaning before the walkthrough.",
      },
    ],
  },
  {
    title: "After the Project",
    items: [
      {
        question: "What kind of warranty do you offer?",
        answer: "One year on all labor and workmanship as a minimum. Specific materials and appliances carry their own manufacturer warranties, which we will document for you at project close. For certain items like waterproofing, we carry longer coverage. Full warranty terms are in your contract.",
      },
      {
        question: "What happens if I find an issue after the project is done?",
        answer: "Call or text us. Most small punch-list items we handle within a week of the final walkthrough. Warranty items discovered later, we come back out and fix. We do not disappear after the invoice is paid.",
      },
      {
        question: "Do you do smaller touch-up or maintenance work?",
        answer: "For past clients, yes. If we built your kitchen and you need a cabinet door adjusted or a tile replaced a year later, we come out. For small one-off repairs from homeowners we have not worked with, we usually refer out to handyman services rather than taking on the job.",
      },
      {
        question: "Can I see projects you have completed?",
        answer: "Our portfolio is online at /portfolio. We can also arrange a walkthrough of a completed project with a homeowner who agreed to host, or a visit to a currently-active jobsite so you can see how we work. Just ask during your consultation.",
      },
    ],
  },
];

export function getAllFAQItems(): FAQItem[] {
  return FAQ_CATEGORIES.flatMap((cat) => cat.items);
}
