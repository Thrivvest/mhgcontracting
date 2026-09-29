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
import CallbackWindows, { type LeadMeta } from "@/components/forms/CallbackWindows";
import { splitName } from "@/lib/split-name";

interface LeadFormData {
  name: string;
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
  /**
   * One question per screen (used by the mobile estimate sheet): project type,
   * then name, then phone and email. Same fields, same verification and the
   * same /api/contact payload as the single-page form.
   */
  multistep?: boolean;
}

type VerifyState = "idle" | "verifying" | "verified";

export default function LeadForm({
  source,
  defaultProjectType = "",
  heading = "Get Your Free Estimate",
  subheading = "Tell us about your project. The estimate is free.",
  theme = "light",
  bare = false,
  multistep = false,
}: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Step 2: once the lead is saved, offer callback windows. Same flow as the contact page.
  const [contactId, setContactId] = useState<string | null>(null);
  const [leadMeta, setLeadMeta] = useState<LeadMeta | null>(null);
  const [pickedWindows, setPickedWindows] = useState(0);
  const [verifyState, setVerifyState] = useState<VerifyState>("idle");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const formStartRef = useRef<number>(Date.now());
  const mouseEventsRef = useRef<number>(0);
  const verifiedAtRef = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
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
          source,
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

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "form_submit_lead", {
          form_source: source,
          project_type: data.projectType || "(none)",
        });
      }

      // Lead is captured. Step 2 is a bonus, so a missing id just shows the
      // confirmation rather than a dead end.
      if (result?.contactId) {
        setContactId(result.contactId);
        setLeadMeta({
          first_name: firstName,
          last_name: lastName,
          phone: data.phone,
          project_type: data.projectType,
        });
      } else {
        setIsSubmitted(true);
      }
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
    ? "w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 font-body text-base text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors duration-200"
    : "w-full bg-white border border-[#D8D8D8] rounded-md px-4 py-3 font-body text-base text-text-primary placeholder:text-[#BBBBBB] focus:outline-none focus:border-primary transition-colors duration-200";
  const errorClass = "text-red-400 text-[11px] mt-1.5 font-body";

  if (contactId && leadMeta && !isSubmitted) {
    return (
      <div className={dark || bare ? "" : "bg-white border border-[#E5E5E5] rounded-lg p-6 md:p-8"}>
        <CallbackWindows
          contactId={contactId}
          lead={leadMeta}
          theme={dark ? "dark" : "light"}
          onDone={(picked) => {
            setPickedWindows(picked);
            setIsSubmitted(true);
          }}
        />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={`text-center py-12 px-6 ${dark || bare ? "" : "bg-white border border-[#E5E5E5] rounded-lg"}`}>
        <h3 className={`font-heading text-2xl font-bold mb-3 ${headingColor}`}>Request Received</h3>
        <p className={`font-body text-base max-w-sm mx-auto leading-relaxed ${subColor}`}>
          {pickedWindows > 0
            ? "We'll call you at one of the times you picked. Need us sooner? Call (609) 712-2474."
            : "We'll call you to set up your free estimate. Need us sooner? Call (609) 712-2474."}
        </p>
      </div>
    );
  }

  const honeypot = (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
      <label htmlFor={`lf-website-${source}`}>Website</label>
      <input id={`lf-website-${source}`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
    </div>
  );

  const robotCheck = (
    <div>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-md ${dark ? "border border-white/20 bg-white/5" : "border border-[#D8D8D8] bg-[#FAFAFA]"}`}>
        <button
          type="button"
          onClick={handleVerifyClick}
          disabled={verifyState !== "idle"}
          aria-checked={verifyState === "verified"}
          role="checkbox"
          className={`relative w-6 h-6 border ${
            verifyState === "verified" ? "border-primary bg-primary" : dark ? "border-white/50 bg-transparent" : "border-[#999] bg-white"
          } flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${verifyState === "idle" ? "cursor-pointer" : "cursor-default"}`}
        >
          {verifyState === "verifying" && <span className="block w-3 h-3 border-2 border-[#999] border-t-primary rounded-full animate-spin" />}
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
  );

  if (multistep) {
    const STEPS = 3;
    const next = async (fields: (keyof LeadFormData)[]) => {
      if (await trigger(fields)) setStep((n) => n + 1);
    };
    const primaryBtn = `w-full font-body font-semibold text-base px-8 py-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
      dark ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary-dark"
    }`;
    return (
      <div className={dark || bare ? "" : "bg-white border border-[#E5E5E5] rounded-lg p-6 md:p-10"}>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3 pr-12">
            {step > 0 && (
              <button type="button" onClick={() => setStep((n) => n - 1)} className={`font-body text-sm font-medium ${subColor} hover:underline`}>
                &larr; Back
              </button>
            )}
            <span className={`font-body text-xs font-medium uppercase tracking-[0.12em] ${subColor}`}>
              Step {step + 1} of {STEPS}
            </span>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: STEPS }, (_, i) => (
              <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-[#E5E5E5]"}`} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {honeypot}

          {step === 0 && (
            <div>
              <h3 className={`font-heading text-2xl font-bold leading-tight mb-5 ${headingColor}`}>What are you planning?</h3>
              <input type="hidden" {...register("projectType")} />
              <div className="grid grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setValue("projectType", type);
                      setStep(1);
                    }}
                    className="min-h-[56px] rounded-md border border-[#D8D8D8] bg-white px-3 py-3 text-left font-body text-base text-text-primary hover:border-primary active:bg-[#F5F5FA]"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className={`font-heading text-2xl font-bold leading-tight mb-5 ${headingColor}`}>What&apos;s your name?</h3>
              <input
                type="text"
                aria-label="Name"
                autoComplete="name"
                autoFocus
                {...register("name", { required: "Name required" })}
                className={inputClass}
                placeholder="Name *"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void next(["name"]);
                  }
                }}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              <button type="button" onClick={() => next(["name"])} className={`${primaryBtn} mt-5`}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className={`font-heading text-2xl font-bold leading-tight ${headingColor}`}>Where can we reach you?</h3>
              <div>
                <input
                  type="tel"
                  inputMode="tel"
                  aria-label="Phone"
                  autoComplete="tel"
                  autoFocus
                  {...register("phone", { required: "Phone required" })}
                  className={inputClass}
                  placeholder="Phone *"
                />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
              <div>
                <input
                  type="email"
                  inputMode="email"
                  aria-label="Email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className={inputClass}
                  placeholder="Email *"
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
              {robotCheck}
              <button type="submit" disabled={isSubmitting} className={primaryBtn}>
                {isSubmitting ? "Sending..." : "Get my free estimate"}
              </button>
              <p className={`text-center font-body text-xs ${subColor}`}>{subheading}</p>
            </div>
          )}
        </form>
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
        {honeypot}

        <div>
          <input
            type="text"
            aria-label="Name"
            autoComplete="name"
            {...register("name", { required: "Name required" })}
            className={inputClass}
            placeholder="Name *"
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
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

        {robotCheck}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-body font-semibold text-sm px-8 py-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            dark ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? "Sending..." : "Next"}
        </button>
      </form>
    </div>
  );
}
