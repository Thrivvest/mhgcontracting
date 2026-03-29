"use client";

/**
 * Testimonials — Client review quotes
 *
 * "What Our Clients Say" heading + 3 testimonial cards in a row.
 * Each: quote, client name, project type, 5 stars. FadeIn stagger.
 */

import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { testimonials } from "@/lib/data";

const SERVICE_TYPE_LABELS: Record<string, string> = {
  kitchen: "Kitchen Renovation",
  bathroom: "Bathroom Renovation",
  basement: "Basement Finishing",
  "full-renovation": "Full Home Renovation",
  addition: "Addition",
  "new-construction": "New Construction",
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 lg:py-32 px-6 lg:px-10 bg-background-alt">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-20">
          <FadeIn>
            <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
              Testimonials
            </span>
          </FadeIn>
          <LineReveal className="mb-4">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]">
              What Our Clients Say
            </h2>
          </LineReveal>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.12}>
              <div className="bg-white rounded-lg p-8 h-full flex flex-col border border-border">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#2D3380"
                      className="text-primary"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-body text-text-primary text-base leading-relaxed mb-8 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="pt-6 border-t border-border">
                  <p className="font-heading text-sm font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-xs text-text-secondary mt-1">
                    {SERVICE_TYPE_LABELS[testimonial.projectType]} · {testimonial.location}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
