/**
 * MHG Contracting — Homepage
 *
 * Assembles all section components in the specified order
 * from BUILD-PLAN.md Section 5A.
 *
 * Section order:
 * 1. Hero (ClipReveal + LineReveal headline + CTA)
 * 2. PortfolioSlider (scroll-driven project showcase)
 * 3. FeaturedProjects (2×2 DirectionalHover grid)
 * 4. AboutTeaser (60/40 split)
 * 5. ServicesGrid (6-card grid)
 * 6. CTABanner (navy CTA)
 * 7. Testimonials (3 review cards)
 * 8. ServiceArea (coverage display)
 * 9. BlogPreview (3 placeholder articles)
 */

import Hero from "@/components/sections/Hero";
import PortfolioSlider from "@/components/sections/PortfolioSlider";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTABanner from "@/components/sections/CTABanner";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import ServiceArea from "@/components/sections/ServiceArea";
import BlogPreview from "@/components/sections/BlogPreview";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PortfolioSlider />
      <FeaturedProjects />
      <AboutTeaser />
      <ServicesGrid />
      <CTABanner />
      <ReviewsSlider />
      <ServiceArea />
      <BlogPreview />
    </main>
  );
}
