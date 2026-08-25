"use client";

/**
 * LeadForm - embeddable estimate-request form.
 *
 * Single shared component for every on-page form embed (service hubs, town
 * pages, blog posts). Submits the exact same payload shape to /api/contact
 * as the main contact page, so every placement flows through the same GHL
 * upsert + n8n notification path. The `source` prop carries per-page
 * attribution into the CRM.
 */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
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

interface LeadFormProps {
  /** Attribution string stored on the GHL contact, e.g. "mhgcon.com /services/kitchen-renovations embed" */
  source: string;
  /** Pre-select the project type dropdown (must match a PROJECT_TYPES value) */
  defaultProjectType?: string;
  heading?: string;
  subheading?: string;
  /** "light" for white/neutral page sections, "dark" for navy sections */
  theme?: "light" | "dark";
  /** Render without the outer white card wrapper (for embedding in a sheet/modal that supplies its own surface) */
  bare?: boolean;
}

type VerifyState = "idle" | "verifying" | "verified";

export default function LeadForm({
  source,
  defaultProjectType = "",
  heading = "Get Your Free Estimate",
  subheading = "Tell us about your project. We respond within 24 hours.",
  theme = "light",
  bare = false,
}: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  } = useForm<LeadFormData>({ defaultValues: { projectType: defaultProjectType } });

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

  const onSubmit = async (data: LeadFormData) => {
    if (data.website && data.website.trim() !== "") {
      setIsSubmitted(true);
      return;
    }
    if (verifyState !== "verified") {
      setVerifyError("Please confirm you are not a robot.");
      return;
    }
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
          source,
          human_verified: true,
          mouse_events: mouseEventsRef.current,
          verified_at_ms: verifiedAtRef.current ?? 0,
          form_duration_ms: Date.now() - formStartRef.current,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error ?? "Submission failed");
      }

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "form_submit_lead", {
          form_source: source,
          project_type: data.projectType || "(none)",
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Lead form submission error:", error);
      alert("There was an error submitting the form. Please try again or call (609) 712-2474.");
      setVerifyState("idle");
      verifiedAtRef.current = null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const dark = theme === "dark";
  const headingColor = dark ? "text-white" : "text-text-primary";
  const subColor = dark ? "text-white/60" : "text-text-secondary";
  const inputClass = dark
    ? "w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors duration-200"
    : "w-full bg-white border border-[#D8D8D8] rounded-md px-4 py-3 font-body text-sm text-text-primary placeholder:text-[#BBBBBB] focus:outline-none focus:border-primary transition-colors duration-200";
  const errorClass = "text-red-400 text-[11px] mt-1.5 font-body";

  if (isSubmitted) {
    return (
      <div className={`text-center py-12 px-6 ${dark || bare ? "" : "bg-white border border-[#E5E5E5] rounded-lg"}`}>
        <h3 className={`font-heading text-2xl font-bold mb-3 ${headingColor}`}>Request Received</h3>
        <p className={`font-body text-base max-w-sm mx-auto leading-relaxed ${subColor}`}>
          We&apos;ll be in touch within 24 hours to talk through your project.
        </p>
      </div>
    );
  }

  return (
    <div className={dark || bare ? "" : "bg-white border border-[#E5E5E5] rounded-lg p-6 md:p-10"}>
      <div className="mb-8">
        <h3 className={`font-heading text-2xl md:text-3xl font-bold leading-tight ${headingColor}`}>{heading}</h3>
        <p className={`font-body text-sm mt-3 ${subColor}`}>{subheading}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot: hidden from humans, bots fill it in */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
          <label htmlFor={`lf-website-${source}`}>Website</label>
          <input id={`lf-website-${source}`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              aria-label="First name"
              {...register("firstName", { required: "First name required" })}
              className={inputClass}
              placeholder="First name *"
            />
            {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
          </div>
          <div>
            <input
              type="text"
              aria-label="Last name"
              {...register("lastName", { required: "Last name required" })}
              className={inputClass}
              placeholder="Last name *"
            />
            {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              aria-label="Email"
              {...register("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className={inputClass}
              placeholder="Email *"
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="tel"
              aria-label="Phone"
              {...register("phone", { required: "Phone required" })}
              className={inputClass}
              placeholder="Phone *"
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <select aria-label="Project type" {...register("projectType")} className={`${inputClass} cursor-pointer appearance-none`}>
            <option value="">What are you planning?</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="text-text-primary">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Human verification */}
        <div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-md ${dark ? "border border-white/20 bg-white/5" : "border border-[#D8D8D8] bg-[#FAFAFA]"}`}>
            <button
              type="button"
              onClick={handleVerifyClick}
              disabled={verifyState !== "idle"}
              aria-checked={verifyState === "verified"}
              role="checkbox"
              className={`relative w-6 h-6 border ${
                verifyState === "verified"
                  ? "border-primary bg-primary"
                  : dark
                    ? "border-white/50 bg-transparent"
                    : "border-[#999] bg-white"
              } flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                verifyState === "idle" ? "cursor-pointer" : "cursor-default"
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
              className={`font-body text-sm select-none ${dark ? "text-white/80" : "text-text-primary"} ${verifyState === "idle" ? "cursor-pointer" : "cursor-default"}`}
            >
              I am not a robot
            </label>
          </div>
          {verifyError && <p className={errorClass}>{verifyError}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-body font-semibold text-sm px-8 py-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            dark ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? "Sending..." : "Request Free Estimate"}
        </button>
      </form>
    </div>
  );
}
