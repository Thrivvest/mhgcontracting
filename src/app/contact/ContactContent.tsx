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
      const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;

      if (webhookUrl) {
        await fetch(webhookUrl, {
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
      } else {
        // Fallback: log to console
        console.log("Contact form submission:", data);
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
          <img src="/images/services/addition-hero.jpg" alt="Contact MHG Contracting" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn><span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">Contact</span></FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              Let&apos;s Talk About Your Project
            </h1>
          </LineReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Form */}
            <FadeIn>
              <div>
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">Thank You!</h3>
                    <p className="font-body text-text-secondary text-lg">
                      We&apos;ll be in touch within 24 hours to discuss your project.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="font-body text-sm font-medium text-text-primary block mb-2">First Name *</label>
                        <input
                          id="firstName"
                          type="text"
                          {...register("firstName", { required: "First name is required" })}
                          className={`w-full px-4 py-3 rounded-md border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.firstName ? "border-red-400" : "border-border"}`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1 font-body">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="font-body text-sm font-medium text-text-primary block mb-2">Last Name *</label>
                        <input
                          id="lastName"
                          type="text"
                          {...register("lastName", { required: "Last name is required" })}
                          className={`w-full px-4 py-3 rounded-md border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.lastName ? "border-red-400" : "border-border"}`}
                          placeholder="Smith"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1 font-body">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="font-body text-sm font-medium text-text-primary block mb-2">Email *</label>
                        <input
                          id="email"
                          type="email"
                          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                          className={`w-full px-4 py-3 rounded-md border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.email ? "border-red-400" : "border-border"}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-body">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="font-body text-sm font-medium text-text-primary block mb-2">Phone *</label>
                        <input
                          id="phone"
                          type="tel"
                          {...register("phone", { required: "Phone number is required" })}
                          className={`w-full px-4 py-3 rounded-md border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.phone ? "border-red-400" : "border-border"}`}
                          placeholder="(609) 555-1234"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-body">{errors.phone.message}</p>}
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="font-body text-sm font-medium text-text-primary block mb-2">Project Type</label>
                      <select
                        id="projectType"
                        {...register("projectType")}
                        className="w-full px-4 py-3 rounded-md border border-border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">Select a project type</option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Project Address */}
                    <div>
                      <label htmlFor="projectAddress" className="font-body text-sm font-medium text-text-primary block mb-2">Project Address</label>
                      <input
                        id="projectAddress"
                        type="text"
                        {...register("projectAddress")}
                        className="w-full px-4 py-3 rounded-md border border-border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="123 Main St, Hamilton, NJ"
                      />
                    </div>

                    {/* Timeline */}
                    <div>
                      <label htmlFor="timeline" className="font-body text-sm font-medium text-text-primary block mb-2">Timeline</label>
                      <select
                        id="timeline"
                        {...register("timeline")}
                        className="w-full px-4 py-3 rounded-md border border-border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">When are you looking to start?</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="font-body text-sm font-medium text-text-primary block mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        className="w-full px-4 py-3 rounded-md border border-border font-body text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-body font-semibold text-sm px-8 py-4 rounded-md hover:bg-primary-light hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Request Your Free Estimate"}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Right: Contact Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-10">
                {/* Direct contact */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <a href={company.phoneHref} className="flex items-center gap-3 font-body text-text-secondary hover:text-primary transition-colors group">
                      <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </div>
                      {company.phone}
                    </a>
                    <a href={company.emailHref} className="flex items-center gap-3 font-body text-text-secondary hover:text-primary transition-colors group">
                      <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      {company.email}
                    </a>
                    <div className="flex items-center gap-3 font-body text-text-secondary">
                      <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      {company.location}
                    </div>
                  </div>
                </div>

                {/* Service area */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-4">Service Area</h3>
                  <p className="font-body text-text-secondary text-sm leading-relaxed mb-4">
                    We serve homeowners within 25 minutes of Hamilton, NJ. Our primary markets include:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...serviceAreas.primary, ...serviceAreas.active].map((area) => (
                      <span key={area} className="px-3 py-1.5 rounded-md bg-background-alt border border-border font-body text-xs text-text-secondary">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {Object.entries(company.social).map(([name, url]) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 rounded-md bg-background-alt border border-border font-body text-xs font-medium text-text-secondary hover:text-primary hover:border-primary/20 transition-all capitalize">
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
