/**
 * MHG Contracting - Google Reviews
 *
 * Curated real Google reviews from satisfied clients.
 * Only 5-star reviews with meaningful content are included.
 */

export interface GoogleReview {
  id: number;
  name: string;
  text: string;
  projectType: string;
  timeAgo: string;
  rating: 5;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    name: "Costadinos Georgiou",
    text: "Shazeb is the best! He renovated me and my wife's bathroom and kitchen. He transformed them from outdated spaces that we were embarrassed to show people into luxurious areas that now make us want to host guests!",
    projectType: "Kitchen & Bathroom",
    timeAgo: "11 months ago",
    rating: 5,
  },
  {
    id: 2,
    name: "Keith Dyke",
    text: "A Complete Transformation - Couldn't Be Happier. We hired MHG Contracting to do a full basement finish along with some additional work, and they absolutely delivered. Professional, communicative, and skilled from start to finish.",
    projectType: "Basement Finishing",
    timeAgo: "2 weeks ago",
    rating: 5,
  },
  {
    id: 3,
    name: "Zara Malik",
    text: "I recently hired MHG Contracting to remodel my bathroom, and I couldn't be happier with the results. From the very beginning, they were professional, responsive, and detail-oriented. They listened carefully to what I wanted and offered helpful suggestions.",
    projectType: "Bathroom Remodel",
    timeAgo: "11 months ago",
    rating: 5,
  },
  {
    id: 4,
    name: "Josue Paul",
    text: "We used MHG Contracting to completely remodel our kitchen. They did an amazing job. They showed up on time, they communicated clearly with us and they were respectful. MHG Contracting provides high quality work - our kitchen looks amazing.",
    projectType: "Kitchen Remodel",
    timeAgo: "4 years ago",
    rating: 5,
  },
  {
    id: 5,
    name: "Sue Gordon",
    text: "I'm so happy I found Malik and company (MHG Contracting). First they installed a ceiling fan quickly and expertly. Then I called them to rescue a wall-hung vanity, which was falling off the wall in my powder room. They are true professionals.",
    projectType: "Home Repairs",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    id: 6,
    name: "Bilal Amjad",
    text: "I recently had the pleasure of working with MHG Contracting on a home renovation project, and I must say they were absolutely amazing. From start to finish, their professionalism and attention to detail were impeccable.",
    projectType: "Home Renovation",
    timeAgo: "2 years ago",
    rating: 5,
  },
  {
    id: 7,
    name: "MoeBreezy",
    text: "Saw the reviews and gave them a try on short notice. These guys are legit. Did my whole bathroom in 2 days, left the place spotless. Great work and NO surprises - just all good. Trust me, you can't go wrong with MHG.",
    projectType: "Bathroom Remodel",
    timeAgo: "4 years ago",
    rating: 5,
  },
  {
    id: 8,
    name: "Varun Rusiya",
    text: "One of the best teams I have ever worked with. Very professional. Shahzeb knows what he is doing and always brings the right set of people for the job. We are very happy with the work he and his team did.",
    projectType: "Full Renovation",
    timeAgo: "11 months ago",
    rating: 5,
  },
  {
    id: 9,
    name: "Anum Khan",
    text: "Shahzeb and his team did a great job on our basement! Flawless finish, and NO painstaking negotiation process. He was honest with his pricing and gave us the most reasonable out of all the estimates we received.",
    projectType: "Basement Finishing",
    timeAgo: "5 years ago",
    rating: 5,
  },
  {
    id: 10,
    name: "John Griffith III",
    text: "MHG was a pleasure to work with. They were very responsive, worked efficiently, and kept the work area very clean throughout the project. They adapted smoothly and delivered a great finished product.",
    projectType: "Attic Build Out",
    timeAgo: "4 years ago",
    rating: 5,
  },
  {
    id: 11,
    name: "Ahmad Yousafzai",
    text: "It's rare to find a contractor who's honest and a perfectionist with his work! I've used MHG Contracting for multiple projects around the house and their work is impressive! Will continue working with them for any future projects!",
    projectType: "Multiple Projects",
    timeAgo: "4 years ago",
    rating: 5,
  },
  {
    id: 12,
    name: "Sean Ford",
    text: "Known the team for quite some time. They have done some great work for my kitchen and bathroom. I have recommended them to family members who have been equally pleased by their service and dedication.",
    projectType: "Kitchen & Bathroom",
    timeAgo: "3 years ago",
    rating: 5,
  },
];
