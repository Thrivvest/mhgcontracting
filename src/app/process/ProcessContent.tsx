"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import ScrollSlider from "@/components/animations/ScrollSlider";
import { processSteps, getFeaturedProjects } from "@/lib/data";
import { company } from "@/lib/constants";

const PROCESS_SLIDES = [
  {
    image: "/images/projects/gallery/kitchen-01/3.jpg",
    subsections: [
      { title: "What Happens", desc: "We visit your home, take measurements, discuss your ideas and budget, and answer all your questions. Zero pressure." },
      { title: "What You Get", desc: "A clear understanding of what's possible, a rough timeline, and confidence that MHG is the right fit for your project." },
    ],
  },
  {
    image: "/images/projects/gallery/fullreno-01/3.jpg",
    subsections: [
      { title: "Collaborative Design", desc: "We work with you on material selections, layout options, and design decisions. You see everything before we start." },
      { title: "Detailed Scope", desc: "A comprehensive scope of work document, itemized estimate, and realistic project schedule — no ambiguity." },
    ],
  },
  {
    image: "/images/projects/gallery/bath-02/4.jpg",
    subsections: [
      { title: "Daily Progress", desc: "Our skilled team executes the plan with precision. Shahzeb is on-site regularly to ensure quality at every stage." },
      { title: "Clean & Respectful", desc: "We protect your home, clean up daily, and minimize disruption to your family's routine." },
    ],
  },
  {
    image: "/images/projects/kitchen-01-3.jpg",
    subsections: [
      { title: "Quality Check", desc: "We walk through every detail together, make sure everything meets your expectations, and address any final items." },
      { title: "Your Home, Perfected", desc: "Your home is left spotless and ready to enjoy. Plus, we stand behind our work with a warranty." },
    ],
  },
];

export default function ProcessContent() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/services/kitchen-hero.jpg" alt="Our renovation process" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn><span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">How We Work</span></FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">Our Process</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">From Vision to Reality</p>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">We Keep It Simple</h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              We believe renovations shouldn&apos;t be stressful. Our process is designed around clear
              communication, honest timelines, and zero surprises. You&apos;ll always know what&apos;s
              happening, what&apos;s next, and exactly what to expect.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Steps Slider */}
      <section>
        <ScrollSlider showDots={true}>
          {processSteps.map((step, index) => {
            const slide = PROCESS_SLIDES[index];
            return (
              <div key={step.id} className="relative w-full h-screen flex items-center">
                {/* Background image */}
                <div className="absolute inset-0">
                  <img src={slide.image} alt={step.title} className="w-full h-full object-cover" />
                  {/* Gradient heavier on left so text is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
                </div>

                {/* Text content */}
                <div className="relative z-10 px-8 md:px-14 lg:px-20 max-w-2xl">
                  {/* Step number */}
                  <span className="font-heading text-[6rem] md:text-[8rem] font-bold text-white/10 leading-none block mb-2">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
                    {step.title}
                  </h2>

                  {/* Description */}
                  <p className="font-body text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                    {step.description}
                  </p>

                  {/* Subsections */}
                  <div className="space-y-5">
                    {slide.subsections.map((sub) => (
                      <div key={sub.title} className="pl-5 border-l-2 border-white/30">
                        <h4 className="font-heading text-base font-semibold text-white mb-1">{sub.title}</h4>
                        <p className="font-body text-white/55 text-sm leading-relaxed">{sub.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollSlider>
      </section>

      {/* Portfolio Preview — Scroll Slider */}
      <section>
        <div className="py-16 px-6 lg:px-10 text-center">
          <LineReveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">See the Results</h2>
          </LineReveal>
        </div>
        <ScrollSlider showDots={true}>
          {featured.map((project) => (
            <div key={project.id} className="relative w-full h-screen flex items-end">
              <div className="absolute inset-0">
                <img src={project.imagePath} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-14 lg:p-20 max-w-3xl">
                <span className="inline-block font-body text-xs font-medium text-white/60 uppercase tracking-[0.15em] mb-3">
                  {project.type.replace(/-/g, " ")}
                </span>
                <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-[1.1]">
                  {project.title}
                </h3>
                <p className="font-body text-white/50 text-sm tracking-wide">{project.location}</p>
              </div>
            </div>
          ))}
        </ScrollSlider>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-10" style={{ backgroundColor: "#2D3380" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">Start Your Project</h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10">The first step is a conversation. Let&apos;s talk about your vision.</p>
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
