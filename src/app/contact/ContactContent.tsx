"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { company, serviceAreas } from "@/lib/constants";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  projectAddress: string;
  timeline: string;
  message: string;
}

const PROJECT_TYPES = [
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Basement Finishing",
  "Full Home Renovation",
  "Addition",
  "New Construction",
  "Other",
];

const TIMELINES = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Just exploring",
];

const labelClass =
  "font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.13em] block mb-2.5";

const baseInputClass =
  "w-full bg-transparent border-0 border-b border-[#C8C8C8] rounded-none px-0 py-3 font-body text-sm text-text-primary placeholder:text-[#BBBBBB] focus:outline-none focus:border-primary transition-colors duration-200";

const errorInputClass =
  "w-full bg-transparent border-0 border-b border-red-400 rounded-none px-0 py-3 font-body text-sm text-text-primary placeholder:text-[#BBBBBB] focus:outline-none focus:border-red-400 transition-colors duration-200";

export default function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          project_type: data.projectType,
          project_address: data.projectAddress,
          timeline: data.timeline,
          message: data.message,
          source: "mhgcon.com Contact Form",
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error ?? "Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/projects/fullreno-01-1.jpg"
            alt="Contact MHG Contracting"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">
              Contact
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              Let&apos;s Talk About Your Project
            </h1>
          </LineReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 md:py-32 px-6 lg:px-10 bg-[#F7F6F4]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">

            {/* ── Left: Form ── */}
            <FadeIn>
              <div>
                {/* Section intro */}
                <div className="mb-12">
                  <span className="font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.15em] block mb-4">
                    Free Consultation
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                    Tell Us About<br />Your Vision
                  </h2>
                  <div className="w-10 h-[2px] bg-primary mt-5" />
                </div>

                {isSubmitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-8">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2D3380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">
                      Message Received
                    </h3>
                    <p className="font-body text-text-secondary text-base max-w-xs mx-auto leading-relaxed">
                      We&apos;ll be in touch within 24 hours to discuss your project.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>

                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>First Name *</label>
                        <input
                          id="firstName"
                          type="text"
                          {...register("firstName", { required: "Required" })}
                          className={errors.firstName ? errorInputClass : baseInputClass}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-[11px] mt-1.5 font-body">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                        <input
                          id="lastName"
                          type="text"
                          {...register("lastName", { required: "Required" })}
                          className={errors.lastName ? errorInputClass : baseInputClass}
                          placeholder="Smith"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-[11px] mt-1.5 font-body">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className={labelClass}>Email *</label>
                        <input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                          })}
                          className={errors.email ? errorInputClass : baseInputClass}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[11px] mt-1.5 font-body">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone *</label>
                        <input
                          id="phone"
                          type="tel"
                          {...register("phone", { required: "Required" })}
                          className={errors.phone ? errorInputClass : baseInputClass}
                          placeholder="(609) 555-1234"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[11px] mt-1.5 font-body">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className={labelClass}>Project Type</label>
                      <div className="relative">
                        <select
                          id="projectType"
                          {...register("projectType")}
                          className={`${baseInputClass} cursor-pointer appearance-none pr-6`}
                        >
                          <option value="">Select a project type</option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Project Address */}
                    <div>
                      <label htmlFor="projectAddress" className={labelClass}>Project Address</label>
                      <input
                        id="projectAddress"
                        type="text"
                        {...register("projectAddress")}
                        className={baseInputClass}
                        placeholder="123 Main St, Hamilton, NJ"
                      />
                    </div>

                    {/* Timeline */}
                    <div>
                      <label htmlFor="timeline" className={labelClass}>Timeline</label>
                      <div className="relative">
                        <select
                          id="timeline"
                          {...register("timeline")}
                          className={`${baseInputClass} cursor-pointer appearance-none pr-6`}
                        >
                          <option value="">When are you looking to start?</option>
                          {TIMELINES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelClass}>Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register("message")}
                        className={`${baseInputClass} resize-none`}
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full bg-primary text-white font-body font-medium text-sm px-8 py-4 flex items-center justify-center gap-3 hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Request Your Free Estimate"}
                        {!isSubmitting && (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="group-hover:translate-x-1 transition-transform duration-200"
                          >
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </FadeIn>

            {/* ── Right: Image + Contact Info ── */}
            <FadeIn delay={0.2}>
              <div className="space-y-12">

                {/* Project image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/projects/gallery/kitchen-02/1.jpg"
                    alt="MHG Contracting — recent project"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Direct contact */}
                <div>
                  <span className="font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.15em] block mb-6">
                    Reach Us Directly
                  </span>
                  <div className="space-y-5">
                    <a href={company.phoneHref} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 border border-[#D8D8D8] flex items-center justify-center text-text-secondary group-hover:border-primary group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-body text-[10px] text-text-secondary uppercase tracking-[0.12em] mb-0.5">Phone</p>
                        <p className="font-body text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">{company.phone}</p>
                      </div>
                    </a>
                    <a href={company.emailHref} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 border border-[#D8D8D8] flex items-center justify-center text-text-secondary group-hover:border-primary group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-body text-[10px] text-text-secondary uppercase tracking-[0.12em] mb-0.5">Email</p>
                        <p className="font-body text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">{company.email}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-[#D8D8D8] flex items-center justify-center text-text-secondary flex-shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-body text-[10px] text-text-secondary uppercase tracking-[0.12em] mb-0.5">Location</p>
                        <p className="font-body text-sm font-medium text-text-primary">{company.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service area */}
                <div>
                  <span className="font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.15em] block mb-4">
                    Service Area
                  </span>
                  <p className="font-body text-text-secondary text-sm leading-relaxed mb-4">
                    Serving homeowners within 25 minutes of Hamilton, NJ.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...serviceAreas.primary, ...serviceAreas.active].map((area) => (
                      <span key={area} className="px-3 py-1.5 border border-[#D8D8D8] font-body text-xs text-text-secondary">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div>
                  <span className="font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.15em] block mb-4">
                    Follow Us
                  </span>
                  <div className="flex gap-3">
                    {Object.entries(company.social).map(([name, url]) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-[#D8D8D8] font-body text-xs font-medium text-text-secondary hover:text-primary hover:border-primary transition-all duration-200 capitalize"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </div>
      </section>
    </main>
  );
}
