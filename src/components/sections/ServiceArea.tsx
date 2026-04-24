"use client";

/**
 * ServiceArea - Coverage area display
 *
 * "Proudly Serving Central New Jersey" with primary and expanded
 * area listings. Clean, minimal layout with accent styling for
 * primary markets.
 */

import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { serviceAreas } from "@/lib/constants";

export default function ServiceArea() {
  return (
    <section id="service-area" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: heading + description */}
          <div>
            <FadeIn>
              <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
                Service Area
              </span>
            </FadeIn>
            <LineReveal className="mb-6">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">
                Proudly Serving
                <br />
                Central New Jersey
              </h2>
            </LineReveal>
            <FadeIn delay={0.2}>
              <p className="font-body text-text-secondary text-lg leading-relaxed max-w-lg">
                Based in Hamilton, NJ, we serve homeowners within 25 minutes of
                our home base - ensuring we&apos;re always close, responsive, and
                invested in our local community.
              </p>
            </FadeIn>
          </div>

          {/* Right: area listings */}
          <div>
            <FadeIn delay={0.3}>
              <div className="space-y-8">
                {/* Primary markets */}
                <div>
                  <h3 className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4">
                    Primary Markets
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {serviceAreas.primary.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary/5 border border-primary/15 font-body text-sm font-medium text-primary"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Also serving */}
                <div>
                  <h3 className="font-body text-xs font-medium text-text-light uppercase tracking-[0.15em] mb-4">
                    Also Serving
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {serviceAreas.active.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center px-5 py-2.5 rounded-md bg-background-alt border border-border font-body text-sm text-text-secondary"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Radius note */}
                <p className="font-body text-xs text-text-light">
                  {serviceAreas.radius}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
