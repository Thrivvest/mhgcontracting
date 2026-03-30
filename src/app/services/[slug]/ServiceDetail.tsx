"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { type Service, getProjectsByType, type ServiceType, services } from "@/lib/data";
import { company } from "@/lib/constants";

const SERVICE_TYPE_MAP: Record<string, ServiceType> = {
  "kitchen-renovations": "kitchen",
  "bathroom-renovations": "bathroom",
  "basement-finishing": "basement",
  "full-home-renovations": "full-renovation",
  "additions": "addition",
  "new-construction": "new-construction",
};

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const serviceType = SERVICE_TYPE_MAP[service.slug];
  const relatedProjects = serviceType ? getProjectsByType(serviceType).slice(0, 3) : [];

  // Other services for cross-linking
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <main>
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: {
              "@type": "LocalBusiness",
              "@id": "https://mhgcon.com/#localbusiness",
              name: "MHG Contracting",
            },
            areaServed: [
              { "@type": "City", name: "Hamilton", containedIn: "NJ" },
              { "@type": "City", name: "Princeton", containedIn: "NJ" },
              { "@type": "City", name: "West Windsor", containedIn: "NJ" },
            ],
            url: `https://mhgcon.com/services/${service.slug}`,
          }),
        }}
      />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src={`/images/services/${serviceType || 'kitchen'}-hero.jpg`} alt={service.name} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <Link href="/services" className="inline-flex items-center gap-2 font-body text-white/40 text-sm hover:text-white/70 transition-colors mb-8 block">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              All Services
            </Link>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">{service.name}</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">{service.shortDescription}</p>
          </FadeIn>
        </div>
      </section>

      {/* Description + Image */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">Overview</h2>
                <p className="font-body text-text-secondary text-lg leading-relaxed">{service.description}</p>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={`/images/services/${serviceType || 'kitchen'}-hero.jpg`} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Scope of Work */}
      <section className="py-24 md:py-32 px-6 lg:px-10 bg-background-alt">
        <div className="max-w-[1400px] mx-auto">
          <LineReveal className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">What&apos;s Included</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.scopeItems.map((item, index) => (
              <FadeIn key={item} delay={Math.min(index * 0.06, 0.4)}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-md bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D3380" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="font-body text-text-primary text-sm leading-relaxed">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-10">
          <div className="max-w-[800px] mx-auto">
            <LineReveal className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Frequently Asked Questions</h2>
            </LineReveal>
            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="border-b border-border pb-6">
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">{faq.question}</h3>
                    <p className="font-body text-text-secondary text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-10 bg-background-alt">
          <div className="max-w-[1400px] mx-auto">
            <LineReveal className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">{service.name} Projects</h2>
            </LineReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <Link href={`/portfolio/${project.slug}`} className="block group">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative">
                      <img src={project.imagePath} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-5 left-5 font-body text-white/70 text-xs">{project.location}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="font-body text-text-secondary text-sm mt-1">{project.shortDescription}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <LineReveal className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Other Services</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other, i) => (
              <FadeIn key={other.id} delay={i * 0.1}>
                <Link href={`/services/${other.slug}`} className="block group p-6 rounded-lg border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">{other.name}</h3>
                  <p className="font-body text-text-secondary text-sm leading-relaxed">{other.shortDescription}</p>
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
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">Ready to Start Your {service.name.replace("s", "")} Project?</h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10">Schedule your free consultation today.</p>
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
