"use client";

/**
 * CallbackWindows - step 2 of every lead form.
 *
 * The lead marks up to three windows when they are free, and MHG calls them at
 * one of them. Deliberately NOT a booking calendar: nothing is reserved and no
 * appointment is created (Shahzeb's call, 2026-09-15).
 *
 * Shared by the contact page and the LeadForm embeds (including the mobile
 * sticky-CTA sheet) so the flow and the payload stay identical everywhere.
 * The lead is already saved by the time this renders, so every failure path
 * here just moves on.
 */

import { useState } from "react";

const CALL_BLOCKS = [
  { id: "morning", label: "Morning", detail: "9am - 12pm" },
  { id: "afternoon", label: "Afternoon", detail: "12pm - 3pm" },
  { id: "late", label: "Late Day", detail: "3pm - 5pm" },
];

export const MAX_WINDOWS = 3;

/** Call hours are Mon-Fri 9-5, so weekends are skipped. */
function nextWeekdays(count: number): Array<{ key: string; weekday: string; date: string }> {
  const out: Array<{ key: string; weekday: string; date: string }> = [];
  const cursor = new Date();
  while (out.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day === 0 || day === 6) continue;
    out.push({
      key: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`,
      weekday: cursor.toLocaleDateString("en-US", { weekday: "short" }),
      date: cursor.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }
  return out;
}

export interface LeadMeta {
  first_name: string;
  last_name: string;
  phone: string;
  project_type: string;
}

interface CallbackWindowsProps {
  contactId: string;
  lead: LeadMeta;
  theme?: "light" | "dark";
  /** Called with how many windows were saved (0 when skipped). */
  onDone: (picked: number) => void;
}

export default function CallbackWindows({ contactId, lead, theme = "light", onDone }: CallbackWindowsProps) {
  const [days] = useState(() => nextWeekdays(5));
  const [activeDay, setActiveDay] = useState(() => nextWeekdays(5)[0].key);
  const [selected, setSelected] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const dark = theme === "dark";

  /** "2026-09-16|morning" becomes "Wed Sep 16, Morning (9am - 12pm)". */
  const windowLabel = (value: string) => {
    const [dayKey, blockId] = value.split("|");
    const day = days.find((d) => d.key === dayKey);
    const block = CALL_BLOCKS.find((b) => b.id === blockId);
    if (!day || !block) return value;
    return `${day.weekday} ${day.date}, ${block.label} (${block.detail})`;
  };

  const toggle = (value: string) => {
    setSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= MAX_WINDOWS) return prev;
      return [...prev, value];
    });
  };

  const save = async () => {
    if (selected.length === 0) {
      onDone(0);
      return;
    }
    setIsSaving(true);
    try {
      await fetch("/api/contact/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          windowKeys: selected,
          windows: selected.map(windowLabel),
          ...lead,
        }),
      });
    } catch (error) {
      console.error("Availability save error:", error);
    } finally {
      setIsSaving(false);
      onDone(selected.length);
    }
  };

  return (
    <div>
      <div className={`flex items-center gap-2 mb-4 ${dark ? "text-white" : "text-primary"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <p className="font-body text-xs font-medium uppercase tracking-[0.12em]">Request received</p>
      </div>

      <h3 className={`font-heading text-xl md:text-2xl font-bold leading-tight ${dark ? "text-white" : "text-text-primary"}`}>
        When can we call you?
      </h3>
      <p className={`font-body text-sm mt-2 mb-5 ${dark ? "text-white/60" : "text-text-secondary"}`}>
        Optional. Pick up to {MAX_WINDOWS} windows and we&apos;ll call at one of them.
      </p>

      {/* Day row */}
      <div className="flex gap-2 mb-4">
        {days.map((day) => {
          const active = day.key === activeDay;
          const count = selected.filter((v) => v.startsWith(day.key)).length;
          return (
            <button
              key={day.key}
              type="button"
              onClick={() => setActiveDay(day.key)}
              className={`relative flex-1 py-2 border font-body text-center transition-colors duration-200 ${
                active
                  ? dark
                    ? "border-white bg-white/10 text-white"
                    : "border-primary bg-white text-primary"
                  : dark
                    ? "border-white/20 bg-transparent text-white/60 hover:border-white/50"
                    : "border-[#E0E0E0] bg-white/60 text-text-secondary hover:border-[#BBBBBB]"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-[0.1em]">{day.weekday}</span>
              <span className="block text-sm font-medium mt-0.5">{day.date.split(" ")[1]}</span>
              {count > 0 && (
                <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${dark ? "bg-white" : "bg-primary"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Blocks for the selected day */}
      <div className="grid grid-cols-3 gap-2">
        {CALL_BLOCKS.map((block) => {
          const value = `${activeDay}|${block.id}`;
          const active = selected.includes(value);
          const full = selected.length >= MAX_WINDOWS && !active;
          return (
            <button
              key={block.id}
              type="button"
              onClick={() => toggle(value)}
              disabled={full}
              aria-pressed={active}
              className={`px-2 py-2.5 border font-body text-xs transition-colors duration-200 ${
                active
                  ? dark
                    ? "border-white bg-white text-primary"
                    : "border-primary bg-primary text-white"
                  : full
                    ? dark
                      ? "border-white/10 text-white/25 cursor-not-allowed"
                      : "border-[#EEEEEE] bg-white text-[#CCCCCC] cursor-not-allowed"
                    : dark
                      ? "border-white/20 text-white hover:border-white"
                      : "border-[#E0E0E0] bg-white text-text-primary hover:border-primary"
              }`}
            >
              <span className="block font-medium">{block.label}</span>
              <span className={`block text-[10px] mt-0.5 ${active ? (dark ? "text-primary/60" : "text-white/70") : dark ? "text-white/40" : "text-text-light"}`}>
                {block.detail}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chosen windows */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selected.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              className={`group flex items-center gap-1.5 pl-2.5 pr-2 py-1 border font-body text-[11px] transition-colors duration-200 ${
                dark
                  ? "border-white/30 text-white hover:border-white"
                  : "border-primary/30 bg-white text-text-primary hover:border-primary"
              }`}
            >
              {windowLabel(value)}
              <span className={dark ? "text-white/50 group-hover:text-white" : "text-text-light group-hover:text-primary"}>&times;</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-5 mt-6">
        <button
          type="button"
          onClick={save}
          disabled={isSaving || selected.length === 0}
          className={`font-body font-medium text-sm px-7 py-3 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
            dark ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {isSaving ? "Saving..." : "Done"}
        </button>
        <button
          type="button"
          onClick={() => onDone(0)}
          className={`font-body text-sm underline underline-offset-4 transition-colors duration-200 ${
            dark ? "text-white/60 hover:text-white" : "text-text-secondary hover:text-primary"
          }`}
        >
          Skip, just call me
        </button>
      </div>
    </div>
  );
}
