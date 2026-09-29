"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { company, serviceAreas } from "@/lib/constants";
import CallbackWindows, { type LeadMeta } from "@/components/forms/CallbackWindows";
import { business, googleRating } from "@/data/business";
import { splitName } from "@/lib/split-name";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectAddress: string;
  timeline: string;
  message: string;
  website: string;
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
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Just exploring",
];

const labelClass =
  "font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.13em] block mb-1.5";

const baseInputClass =
  "w-full bg-transparent border-0 border-b border-[#C8C8C8] rounded-none px-0 py-2 font-body text-base text-text-primary placeholder:text-[#BBBBBB] focus:outline-none focus:border-primary transition-colors duration-200";

const errorInputClass =
  "w-full bg-transparent border-0 border-b border-red-400 rounded-none px-0 py-2 font-body text-base text-text-primary placeholder:text-[#BBBBBB] focus:outline-none focus:border-red-400 transition-colors duration-200";

type VerifyState = "idle" | "verifying" | "verified";

type Step = "form" | "availability" | "done";

export default function ContactContent() {
  const [step, setStep] = useState<Step>("form");
  const [contactId, setContactId] = useState<string | null>(null);
  const [leadMeta, setLeadMeta] = useState<LeadMeta | null>(null);
  const [pickedWindows, setPickedWindows] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyState, setVerifyState] = useState<VerifyState>("idle");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const formStartRef = useRef<number>(Date.now());
  const mouseEventsRef = useRef<number>(0);
  const verifiedAtRef = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  useEffect(() => {
    formStartRef.current = Date.now();
    const onMove = () => {
      mouseEventsRef.current += 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onMove);
    };
  }, []);

  const handleVerifyClick = () => {
    if (verifyState !== "idle") return;
    if (mouseEventsRef.current < 2) {
      setVerifyError("Please move your cursor over the page before verifying.");
      return;
    }
    setVerifyState("verifying");
    setVerifyError(null);
    setTimeout(() => {
      setVerifyState("verified");
      verifiedAtRef.current = Date.now();
    }, 900);
  };

  const onSubmit = async (data: ContactFormData) => {
    if (data.website && data.website.trim() !== "") {
      setStep("done");
      return;
    }
    if (verifyState !== "verified") {
      setVerifyError("Please confirm you are not a robot.");
      return;
    }
    setIsSubmitting(true);
    const { firstName, lastName } = splitName(data.name);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: data.email,
          phone: data.phone,
          project_type: data.projectType,
          project_address: data.projectAddress,
          timeline: data.timeline,
          message: data.message,
          source: "mhgcon.com Contact Form",
          human_verified: true,
          mouse_events: mouseEventsRef.current,
          verified_at_ms: verifiedAtRef.current ?? 0,
          form_duration_ms: Date.now() - formStartRef.current,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result?.error ?? "Submission failed");
      }

      // Lead is captured at this point. Step 2 is a bonus, so a missing
      // contactId sends them straight to the confirmation instead of a dead end.
      if (result?.contactId) {
        setContactId(result.contactId);
        setLeadMeta({
          first_name: firstName,
          last_name: lastName,
          phone: data.phone,
          project_type: data.projectType,
        });
        setStep("availability");
      } else {
        setStep("done");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again or call us directly.");
      setVerifyState("idle");
      verifiedAtRef.current = null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative flex items-end pt-28 pb-10 md:min-h-[60vh] md:pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/projects/fullreno-01-1.jpg"
            alt="Contact MHG Contracting"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs font-medium text-white/60 uppercase tracking-[0.15em] mb-4 block">
              Contact
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              Get a Free Renovation Estimate
            </h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/85 text-lg md:text-xl mt-4 md:mt-6 max-w-xl leading-relaxed">
              Tell us about your kitchen, bath, basement, addition or new build and we&apos;ll set up a free in-home estimate. Or call the office.
            </p>
            <a
              href={business.phoneHref}
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary px-7 py-4 font-body text-base font-semibold text-white rounded-md hover:bg-primary-light transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Call {business.phone}
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-12 md:py-16 px-6 lg:px-10 bg-[#F7F6F4]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: Form ── */}
            <FadeIn>
              <div>
                {/* Section intro */}
                <div className="mb-5">
                  <span className="font-body text-[11px] font-medium text-text-secondary uppercase tracking-[0.15em] block mb-2.5">
                    Free Consultation
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                    Tell Us About Your Vision
                  </h2>
                  <div className="w-10 h-[2px] bg-primary mt-4" />
                </div>

                {/* Trust bar */}
                <div className="mb-7 grid grid-cols-3 gap-3 border-y border-[#E5E5E5] py-3">
                  <div className="text-center">
                    <p className="font-heading text-lg font-bold text-primary leading-none">{googleRating.rating.toFixed(1)}&#9733;</p>
                    <p className="font-body text-[10px] text-text-secondary uppercase tracking-[0.08em] mt-1">{googleRating.count} Google reviews</p>
                  </div>
                  <div className="text-center border-x border-[#E5E5E5]">
                    <p className="font-heading text-lg font-bold text-primary leading-none">Free</p>
                    <p className="font-body text-[10px] text-text-secondary uppercase tracking-[0.08em] mt-1">In-home estimate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-lg font-bold text-primary leading-none">NJ HIC</p>
                    <p className="font-body text-[10px] text-text-secondary uppercase tracking-[0.08em] mt-1">#{business.hic}</p>
                  </div>
                </div>

                {step === "done" ? (
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
                      {pickedWindows > 0
                        ? "We'll call you at one of the times you picked. If anything changes, reach us at (609) 712-2474."
                        : `We'll call you to set up your free estimate. You can also reach us at ${business.phone}.`}
                    </p>
                  </div>
                ) : step === "availability" && contactId && leadMeta ? (
                  <CallbackWindows
                    contactId={contactId}
                    lead={leadMeta}
                    onDone={(picked) => {
                      setPickedWindows(picked);
                      setStep("done");
                    }}
                  />
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                    {/* Honeypot: hidden from humans, bots fill it in */}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                      />
                    </div>


                    {/* Name */}
                    <div>
                      <label htmlFor="name" className={labelClass}>Name *</label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        {...register("name", { required: "Required" })}
                        className={errors.name ? errorInputClass : baseInputClass}
                        placeholder="John Smith"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[11px] mt-1.5 font-body">{errors.name.message}</p>
                      )}
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
                        placeholder="Street address, City, State"
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
                        rows={3}
                        {...register("message")}
                        className={`${baseInputClass} resize-none`}
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Human verification */}
                    <div className="pt-1">
                      <div className="flex items-center gap-3 border border-[#D8D8D8] bg-white px-4 py-2.5 max-w-sm">
                        <button
                          type="button"
                          onClick={handleVerifyClick}
                          disabled={verifyState !== "idle"}
                          aria-checked={verifyState === "verified"}
                          role="checkbox"
                          className={`relative w-6 h-6 border ${
                            verifyState === "verified" ? "border-primary bg-primary" : "border-[#999] bg-white"
                          } flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                            verifyState === "idle" ? "cursor-pointer hover:border-primary" : "cursor-default"
                          }`}
                        >
                          {verifyState === "verifying" && (
                            <span className="block w-3 h-3 border-2 border-[#999] border-t-primary rounded-full animate-spin" />
                          )}
                          {verifyState === "verified" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                        </button>
                        <label
                          onClick={handleVerifyClick}
                          className={`font-body text-sm text-text-primary select-none ${
                            verifyState === "idle" ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          I am not a robot
                        </label>
                      </div>
                      {verifyError && (
                        <p className="text-red-500 text-[11px] mt-2 font-body">{verifyError}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full bg-primary text-white font-body font-medium text-sm px-8 py-3.5 flex items-center justify-center gap-3 hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Next"}
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
              <div className="space-y-8">

                {/* Project image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/projects/gallery/kitchen-02/1.jpg"
                    alt="MHG Contracting - recent project"
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
                    Serving homeowners across Central New Jersey and Bucks County, PA.
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
