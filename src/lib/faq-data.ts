import { HOUZZ_STUDY, HOUZZ_TIME, money, NJ_HIC_MIN_LIABILITY } from "@/data/costs";
import { googleRating } from "@/data/business";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  intro?: string;
  items: FAQItem[];
}

/**
 * The /faq page. Answers use only what MHG told us (intake form 2026-03-28,
 * owner preferences 2026-09-16), its Google Business Profile, and New Jersey
 * law with the section named. No promised timelines, warranty terms or
 * insurance amounts until Shahzeb confirms them.
 */
export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: "Working with MHG",
    items: [
      {
        question: "What areas do you serve?",
        answer: "MHG works within about 25 minutes of its office at 2145 Nottingham Way in Hamilton, NJ: Hamilton, Princeton, West Windsor, Lawrenceville, Ewing, Hopewell, Pennington, Robbinsville and East Windsor in Mercer County, Plainsboro in Middlesex County, and Yardley, PA.",
      },
      {
        question: "Who runs MHG Contracting?",
        answer: "Brothers Shahzeb and Shahmi Malik. MHG is family owned and has been open since 2021.",
      },
      {
        question: "Is MHG registered in New Jersey?",
        answer: "Yes. MHG Contracting (Malik Holding Group LLC) is a registered New Jersey home improvement contractor, #13VH13286900. Every home improvement business has to register with the Division of Consumer Affairs (N.J.S.A. 56:8-138); you can look the number up at newjersey.mylicense.com.",
      },
      {
        question: "What insurance does a New Jersey contractor carry?",
        answer: `A registered contractor must carry commercial general liability insurance of at least ${money(NJ_HIC_MIN_LIABILITY)} per occurrence (N.J.S.A. 56:8-142), and the contract must include a copy of the certificate and the insurer's phone number (N.J.S.A. 56:8-151). Ask to see it at your estimate.`,
      },
      {
        question: "Who will be working at my house?",
        answer: "MHG's own crew of seven, run by its team leads, plus licensed subcontractors for the trades that need a license, such as electrical and plumbing.",
      },
    ],
  },
  {
    title: "Process and Timeline",
    items: [
      {
        question: "What happens after I reach out?",
        answer: "A short phone call to hear what you want and set up a visit, then a first meeting at your house and a written preconstruction estimate. You go through the estimate together and settle the scope. After a deposit, the plan, budget and schedule are finalized before work starts, you get week-by-week progress, and there is a final walkthrough before the last payment.",
      },
      {
        question: "How long do projects take?",
        answer: `It depends on the scope, and your schedule is set before work starts. As a national benchmark, kitchen projects averaged ${HOUZZ_TIME.kitchen.plan} months of planning and ${HOUZZ_TIME.kitchen.build} months of construction in 2025, according to the ${HOUZZ_STUDY}, including do-it-yourself work.`,
      },
      {
        question: "What if something unexpected turns up mid-project?",
        answer: "It gets priced and agreed before the work is done. New Jersey requires every change to a home improvement contract to be in writing and signed (N.J.S.A. 56:8-151).",
      },
      {
        question: "Can I stay in my home during the renovation?",
        answer: "For most single-room projects, yes. For a whole-house gut renovation, usually not for the whole job. It comes up at the estimate.",
      },
    ],
  },
  {
    title: "Cost and Payment",
    items: [
      {
        question: "Are estimates free?",
        answer: "Yes. Call (609) 712-2474 or send the form on the contact page.",
      },
      {
        question: "How do payments work?",
        answer: "A deposit when you sign, and the final payment after the final walkthrough, with the schedule written into your contract. Under N.J.A.C. 13:45A-16.2 a contractor may not ask for final payment before the work is finished as the contract describes.",
      },
      {
        question: "What will my project cost?",
        answer: "The cost guides on the blog show what published surveys say kitchens, bathrooms, basements, additions and new homes cost. Your own number comes from the free estimate.",
      },
    ],
  },
  {
    title: "Permits and Contracts",
    items: [
      {
        question: "Do I need a permit for my renovation?",
        answer: "Usually. New Jersey requires a construction permit for most work that alters a house (N.J.A.C. 5:23-2.14). Painting, flooring, cabinets and like-for-like fixture swaps are ordinary maintenance and need none (N.J.A.C. 5:23-2.7).",
      },
      {
        question: "Can work start before the permit is issued?",
        answer: "No. A home improvement contractor may not start until every required permit has been issued (N.J.A.C. 13:45A-16.2).",
      },
      {
        question: "What about HOA approval?",
        answer: "An HOA's architectural approval is separate from the town's permit. Get it before work starts.",
      },
      {
        question: "Can I cancel a contract after I sign?",
        answer: "Yes, for any reason, before midnight of the third business day after you receive your copy, by written notice sent by registered or certified mail or delivered in person (N.J.S.A. 56:8-151).",
      },
      {
        question: "What about warranties?",
        answer: "Under N.J.A.C. 13:45A-16.2, any guarantee or warranty has to be given to you in writing, saying what it covers and for how long. Ask to see the terms with your estimate.",
      },
    ],
  },
  {
    title: "Our Work",
    items: [
      {
        question: "Can I see projects you have completed?",
        answer: `Yes. The portfolio shows finished kitchens, bathrooms, basements, additions and new homes, and MHG has ${googleRating.count} Google reviews averaging ${googleRating.rating} stars.`,
      },
    ],
  },
];

export function getAllFAQItems(): FAQItem[] {
  return FAQ_CATEGORIES.flatMap((cat) => cat.items);
}
