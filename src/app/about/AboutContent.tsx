"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import CharHighlight from "@/components/animations/CharHighlight";
import { teamMembers } from "@/lib/data";
import { company } from "@/lib/constants";

const VALUES = [
  { title: "Quality", description: "We never cut corners. Every joint, every finish, every detail is done right the first time." },
  { title: "Transparency", description: "No surprises. Clear pricing, honest timelines, and open communication from day one." },
  { title: "Family", description: "We treat your home like our own — with care, respect, and genuine pride in every project." },
  { title: "Craftsmanship", description: "Years of hands-on experience combined with an eye for detail that elevates every space." },
  { title: "Communication", description: "You'll always know what's happening. Regular updates, responsive answers, easy to reach." },
];

export default function AboutContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/projects/fullreno-01-2.jpg" alt="MHG Contracting craftsmanship" className="w-full h-full object-cover" />
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
              Who We Are
            </h1>
          </LineReveal>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo placeholder */}
            <FadeIn>
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img src="/images/projects/kitchen-01.jpg" alt="Shahzeb Malik — Founder" className="w-full h-full object-cover" />
              </div>
            </FadeIn>

            {/* Bio */}
            <div>
              <FadeIn>
                <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
                  Our Founder
                </span>
              </FadeIn>
              <LineReveal className="mb-6">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">
                  Shahzeb Malik
                </h2>
              </LineReveal>

              <CharHighlight className="font-heading text-2xl md:text-3xl font-semibold text-text-primary leading-snug mb-8" start="top 90%" end="top 40%">
                &ldquo;We love what we do and take pride in every project.&rdquo;
              </CharHighlight>

              <FadeIn delay={0.2}>
                <p className="font-body text-text-secondary text-lg leading-relaxed mb-4">
                  {teamMembers[0].bio}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-body text-text-secondary text-lg leading-relaxed">
                  Based in Hamilton, NJ, MHG Contracting serves homeowners throughout Central New Jersey —
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.id} delay={index * 0.1}>
                <div className="group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-5">
                    <img src={`/images/projects/${["kitchen-01", "bath-01", "fullreno-01"][index % 3]}.jpg`} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-text-secondary text-sm mb-3">{member.title}</p>
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
