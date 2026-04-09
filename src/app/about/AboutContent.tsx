"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import CharHighlight from "@/components/animations/CharHighlight";
import ScrollSlider from "@/components/animations/ScrollSlider";
import { teamMembers } from "@/lib/data";
import { company } from "@/lib/constants";

const WORK_SLIDES = [
  { image: "/images/projects/fullreno-01-3.jpg", label: "Full Renovation", title: "Whole-Home Transformation", location: "Hamilton, NJ" },
  { image: "/images/projects/gallery/kitchen-02/1.jpg", label: "Kitchen Renovation", title: "Traditional Chef's Kitchen", location: "West Windsor, NJ" },
  { image: "/images/projects/bath-01.jpg", label: "Bathroom Renovation", title: "Spa-Inspired Master Bath", location: "Hamilton, NJ" },
  { image: "/images/projects/addition-01.jpg", label: "Addition", title: "Sunroom & Family Room Addition", location: "West Windsor, NJ" },
];

const VALUES = [
  { title: "Quality", description: "We never cut corners. Every joint, every finish, every detail is done right the first time." },
  { title: "Transparency", description: "No surprises. Clear pricing, honest timelines, and open communication from day one." },
  { title: "Family", description: "We treat your home like our own — with care, respect, and genuine pride in every project." },
  { title: "Craftsmanship", description: "Years of hands-on experience combined with an eye for detail that elevates every space." },
  { title: "Communication", description: "You'll always know what's happening. Regular updates, responsive answers, easy to reach." },
];

// Project images used as placeholders until team photos are available
const TEAM_PLACEHOLDER_IMAGES = [
  "/images/projects/kitchen-02.jpg",
  "/images/projects/fullreno-01.jpg",
  "/images/projects/bath-01.jpg",
  "/images/projects/addition-01.jpg",
  "/images/projects/basement-01.jpg",
];

export default function AboutContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/projects/fullreno-01-2.jpg" alt="MHG Contracting craftsmanship" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">
              About Us
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              Family-Owned Residential Contractor in Hamilton, NJ
            </h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">
              MHG Contracting is a family-owned general contracting company serving Central New Jersey, specializing in kitchen renovations, bathroom remodels, basement finishing, home additions, and new construction.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <FadeIn>
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img src="/images/projects/kitchen-02.jpg" alt="MHG Contracting craftsmanship" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>

            {/* Story */}
            <div>
              <FadeIn>
                <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
                  Our Story
                </span>
              </FadeIn>
              <LineReveal className="mb-6">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">
                  Built on Family Values, Driven by Craft
                </h2>
              </LineReveal>

              <CharHighlight className="font-heading text-2xl md:text-3xl font-semibold text-text-primary leading-snug mb-8" start="top 90%" end="top 40%">
                &ldquo;Family-owned, quality driven — that&rsquo;s not just a tagline, it&rsquo;s how we work.&rdquo;
              </CharHighlight>

              <FadeIn delay={0.2}>
                <p className="font-body text-text-secondary text-lg leading-relaxed mb-4">
                  MHG Contracting was built on a simple belief: every homeowner deserves quality craftsmanship, honest communication, and a team that treats their home with the same care they would. As a family business, we bring a personal touch to every project that larger contractors simply can't match.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-body text-text-secondary text-lg leading-relaxed">
                  Based in Hamilton, NJ, MHG Contracting serves homeowners throughout Central New Jersey,
                  from Princeton and West Windsor to Lawrenceville, Plainsboro, and Yardley, PA. Every
                  project is an opportunity to build something we&apos;re proud of.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 lg:px-10 bg-background-alt">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <FadeIn>
              <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
                What Drives Us
              </span>
            </FadeIn>
            <LineReveal className="mb-4">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]">
                Our Values
              </h2>
            </LineReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {VALUES.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.08}>
                <div className="p-6 bg-white rounded-lg border border-border h-full">
                  <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary font-heading font-bold text-sm mb-5">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-text-secondary text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Work Showcase Slider */}
      <section>
        <ScrollSlider showDots={true}>
          {WORK_SLIDES.map((slide) => (
            <div key={slide.title} className="relative w-full h-screen flex items-end mobile-slide">
              <div className="absolute inset-0">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-14 lg:p-20 max-w-3xl">
                <span className="inline-block font-body text-xs font-medium text-white/60 uppercase tracking-[0.15em] mb-3">
                  {slide.label}
                </span>
                <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-[1.1]">
                  {slide.title}
                </h2>
                <p className="font-body text-white/50 text-sm tracking-wide">{slide.location}</p>
              </div>
            </div>
          ))}
        </ScrollSlider>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14 md:mb-20">
            <FadeIn>
              <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
                The Team
              </span>
            </FadeIn>
            <LineReveal>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">
                The People Behind MHG
              </h2>
            </LineReveal>
            <FadeIn delay={0.2}>
              <p className="font-body text-text-secondary text-lg mt-4 max-w-2xl leading-relaxed">
                When you hire MHG, you get to know the people doing the work. From the owners to our team leads, these are the faces behind every project.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.id} delay={index * 0.1}>
                <div className="group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-5 bg-background-alt">
                    <img
                      src={TEAM_PLACEHOLDER_IMAGES[index % TEAM_PLACEHOLDER_IMAGES.length]}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-primary text-sm font-medium mb-3">{member.title}</p>
                  <p className="font-body text-text-secondary text-sm leading-relaxed">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-10" style={{ backgroundColor: "#2D3380" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Let&apos;s Build Something
              <br />Together
            </h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10 leading-relaxed">
              Ready to start your renovation? We&apos;d love to hear about your project.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white text-white font-body font-semibold text-sm px-10 py-4 rounded-md hover:bg-white hover:text-primary transition-all duration-300">
              {company.ctaPrimary}
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
