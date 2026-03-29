"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { processSteps, getFeaturedProjects } from "@/lib/data";
import { company } from "@/lib/constants";

const PROCESS_DETAILS = [
  { subsections: [
    { title: "What Happens", desc: "We visit your home, take measurements, discuss your ideas and budget, and answer all your questions. Zero pressure." },
    { title: "What You Get", desc: "A clear understanding of what's possible, a rough timeline, and confidence that MHG is the right fit for your project." },
  ]},
  { subsections: [
    { title: "Collaborative Design", desc: "We work with you on material selections, layout options, and design decisions. You see everything before we start." },
    { title: "Detailed Scope", desc: "A comprehensive scope of work document, itemized estimate, and realistic project schedule — no ambiguity." },
  ]},
  { subsections: [
    { title: "Daily Progress", desc: "Our skilled team executes the plan with precision. Shahzeb is on-site regularly to ensure quality at every stage." },
    { title: "Clean & Respectful", desc: "We protect your home, clean up daily, and minimize disruption to your family's routine." },
  ]},
  { subsections: [
    { title: "Quality Check", desc: "We walk through every detail together, make sure everything meets your expectations, and address any final items." },
    { title: "Your Home, Perfected", desc: "Your home is left spotless and ready to enjoy. Plus, we stand behind our work with a warranty." },
  ]},
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

      {/* Process Phases */}
      <section className="pb-24 md:pb-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-0">
            {processSteps.map((step, index) => (
              <FadeIn key={step.id} delay={0.1}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 md:py-20 ${index < processSteps.length - 1 ? "border-b border-border" : ""}`}>
                  {/* Left: step info */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="font-heading text-6xl md:text-7xl font-bold text-primary/10 block mb-4 leading-none">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
                      {step.title}
                    </h3>
                    <p className="font-body text-text-secondary text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>

                    {/* Subsections */}
                    {PROCESS_DETAILS[index] && (
                      <div className="space-y-5">
                        {PROCESS_DETAILS[index].subsections.map((sub) => (
                          <div key={sub.title} className="pl-5 border-l-2 border-primary/20">
                            <h4 className="font-heading text-base font-semibold text-text-primary mb-1">{sub.title}</h4>
                            <p className="font-body text-text-secondary text-sm leading-relaxed">{sub.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: image */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img src={`/images/projects/${["kitchen-01", "bath-01", "fullreno-01", "kitchen-02"][index % 4]}.jpg`} alt={step.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 md:py-32 px-6 lg:px-10 bg-background-alt">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <LineReveal><h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">See the Results</h2></LineReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <Link href={`/portfolio/${project.slug}`} className="block group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                    <img src={project.imagePath} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="block font-body text-white/50 text-xs uppercase tracking-[0.1em] mb-1">{project.type.replace("-", " ")}</span>
                      <h3 className="font-heading text-white text-base font-semibold group-hover:text-primary-light transition-colors">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
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
