import type { Config } from "tailwindcss";

/**
 * MHG Contracting — Tailwind CSS Configuration
 *
 * NOTE: With Tailwind v4, most theme config is handled via @theme in globals.css.
 * This file provides the traditional config format for reference and compatibility
 * with tools that read tailwind.config.ts (IDE plugins, etc).
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D3380",
          dark: "#1A1A2E",
          light: "#4A50A5",
        },
        background: {
          DEFAULT: "#FFFFFF",
          alt: "#F5F5F5",
        },
        "text-primary": "#333333",
        "text-secondary": "#666666",
        "text-light": "#999999",
        "accent-white": "#FFFFFF",
        "splash-bg": "#111118",
        border: "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(2.5rem, 5vw, 4.5rem)",
        section: "clamp(2rem, 4vw, 3rem)",
        subsection: "clamp(1.5rem, 3vw, 2rem)",
        large: "clamp(1.125rem, 2vw, 1.25rem)",
      },
      spacing: {
        "section-y": "clamp(60px, 8vw, 120px)",
        "section-y-sm": "clamp(40px, 6vw, 80px)",
      },
      maxWidth: {
        content: "1400px",
        "content-narrow": "1200px",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
