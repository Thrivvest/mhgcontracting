/**
 * Footer - Dark background site footer
 *
 * Three-row layout on #1A1A2E background:
 * - Top: Logo + "Get Your Free Estimate" outlined button
 * - Middle: 4 columns - Nav | Services | Contact | Social
 * - Bottom: Copyright
 *
 * Generous padding, underline hover animations on links.
 */

import Link from "next/link";
import { company, navLinks, serviceAreas } from "@/lib/constants";
import { services } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="bg-primary-dark text-white"
      role="contentinfo"
    >
      {/* ─── Top Row: Logo + CTA ─────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-20 pb-14 border-b border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Logo (white version) */}
          <Link href="/" className="flex items-center group" aria-label="MHG Contracting Home">
            <img
              src="/images/logo/mhg-logo-web.png"
              alt="MHG Contracting"
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-white text-white font-body font-semibold text-sm px-8 py-4 rounded-md hover:bg-white hover:text-primary-dark transition-all duration-300"
          >
            {company.ctaPrimary}
          </Link>
        </div>
      </div>

      {/* ─── Middle Row: 4 Columns ───────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-block relative group"
                >
                  FAQ
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-block relative group"
                  >
                    {service.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={company.phoneHref}
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200"
                >
                  {company.email}
                </a>
              </li>
              <li className="text-white/50 text-sm font-body">
                {company.location}
              </li>
              <li className="text-white/40 text-xs font-body pt-2">
                Serving {serviceAreas.primary.join(", ")} &amp; surrounding areas
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={company.social.houzz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <HouzzIcon />
                  Houzz
                </a>
              </li>
              <li>
                <a
                  href={company.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm font-body hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <GoogleIcon />
                  Google
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Row: Copyright ───────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-white/30 text-xs font-body">
            © {currentYear} {company.name}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-body">
            Marketing by{" "}
            <a
              href="https://thrivvest.com"
              target="_blank"
              rel="noopener"
              className="hover:text-white/60 transition-colors underline-offset-2 hover:underline"
            >
              Thrivvest
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Social Icons (inline SVGs) ─────────────────────────

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function HouzzIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-60 group-hover:opacity-100 transition-opacity">
      <path d="M12 2L5 8v14h5v-6h4v6h5V8L12 2zm0 3.5L16 9v9h-1v-6H9v6H8V9l4-3.5z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}
