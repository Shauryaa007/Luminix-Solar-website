
'use client';

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Clock,
  ShieldCheck,
  Leaf,
  Zap,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Solar Products', href: '#products' },
  { label: 'Savings Calculator', href: '#calculator' },
  { label: 'Benefits & Subsidies', href: '#benefits' },
  { label: 'Our Projects', href: '#projects' },
  { label: 'About LuminixSolar', href: '#about' },
  { label: 'Frequently Asked Questions', href: '#faq' },
  { label: 'Contact Our Team', href: '#contact' },
];

const solutionLinks = [
  { label: 'Residential Rooftop Solar', href: '#products' },
  { label: 'Commercial & Industrial Solar', href: '#products' },
  { label: 'Solar Panels & Inverters', href: '#products' },
  { label: 'Hybrid Systems & Batteries', href: '#products' },
  { label: 'Solar Water Pump Solutions', href: '#products' },
  { label: 'Solar Subsidy Information', href: '#benefits' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: COMPANY_INFO.socialLinks.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: COMPANY_INFO.socialLinks.instagram,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2.2A2.8 2.8 0 0 0 4.2 7v10a2.8 2.8 0 0 0 2.8 2.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7zm5 2.3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.7-3.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: COMPANY_INFO.socialLinks.facebook,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.43H7.08v-3.5h3.05V9.4c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24V7.9h-1.52c-1.49 0-1.96.93-1.96 1.88v2.29h3.33l-.53 3.5h-2.8V24C19.61 23.07 24 18.09 24 12.07z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: COMPANY_INFO.socialLinks.youtube,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: COMPANY_INFO.socialLinks.twitter,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#102d22] text-white">
      {/* Subtle brand accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/[0.06]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main brand and CTA */}
        <div className="grid gap-8 border-b border-white/10 py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:py-16">
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              aria-label="LuminixSolar home"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-800 shadow-lg shadow-black/10">
                <Sun className="h-7 w-7" strokeWidth={1.8} />
              </div>

              <div>
                <div className="text-2xl font-bold tracking-tight text-white">
                  Luminix
                  <span className="text-emerald-300">Solar</span>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100/65">
                  Clean energy. Brighter future.
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/70 sm:text-base">
              {COMPANY_INFO.name} helps customers explore solar products and
              energy solutions for homes, businesses and larger projects.
              Build a cleaner energy future with a solution tailored to your
              needs.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-emerald-100/70">
              <span className="inline-flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald-300" />
                Cleaner energy
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-300" />
                Smarter power
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit LuminixSolar on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-100/70 transition hover:border-emerald-300/40 hover:bg-emerald-400/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="mt-5 text-xs text-emerald-100/55">
              <span className="font-semibold text-emerald-100/80">
                Mother company:
              </span>{' '}
              {COMPANY_INFO.parentCompany}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 lg:w-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <Sun className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">
              Ready to explore solar?
            </h3>

            <p className="mt-2 text-sm leading-6 text-emerald-50/65">
              Tell us about your project and find a solution that suits your
              property and energy needs.
            </p>

            <a
              href="#contact"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-bold text-[#102d22] transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-300/25"
            >
              Talk to our team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-14">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-300">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-emerald-50/65 transition hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400/50 transition group-hover:bg-emerald-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-300">
              Solar solutions
            </h4>
            <ul className="mt-5 space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-start gap-2 text-sm leading-6 text-emerald-50/65 transition hover:text-white"
                  >
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400/60 transition group-hover:translate-x-1 group-hover:text-emerald-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-300">
              Contact us
            </h4>

            <div className="mt-5 space-y-5">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300 transition group-hover:bg-emerald-400/10">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-xs text-emerald-100/50">
                    Phone
                  </span>
                  <span className="mt-1 block break-words text-sm font-semibold text-emerald-50 transition group-hover:text-white">
                    {COMPANY_INFO.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300 transition group-hover:bg-emerald-400/10">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-xs text-emerald-100/50">
                    Email
                  </span>
                  <span className="mt-1 block break-all text-sm font-semibold text-emerald-50 transition group-hover:text-white">
                    {COMPANY_INFO.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="block text-xs text-emerald-100/50">
                    Office address
                  </span>
                  <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                    {COMPANY_INFO.address}
                  </p>
                  {COMPANY_INFO.mapsUrl && (
                    <a
                      href={COMPANY_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 transition hover:text-white"
                    >
                      Get directions
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-300">
              Business information
            </h4>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Operating hours
                  </p>
                  <p className="mt-2 text-xs leading-5 text-emerald-50/65">
                    {COMPANY_INFO.operatingHours.weekdays}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-50/50">
                    {COMPANY_INFO.operatingHours.sunday}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Company details
                  </p>
                  <p className="mt-2 text-xs leading-5 text-emerald-50/50">
                    Registered name
                  </p>
                  <p className="break-words text-xs leading-5 text-emerald-50/75">
                    {COMPANY_INFO.name}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-emerald-50/50">
                    GSTIN
                  </p>
                  <p className="break-all font-mono text-xs leading-5 text-emerald-50/75">
                    {COMPANY_INFO.gstin}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-emerald-50/50">
                    MNRE vendor ID
                  </p>
                  <p className="break-words font-mono text-xs leading-5 text-emerald-50/75">
                    {COMPANY_INFO.mnreVendorId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom legal strip */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 text-xs text-emerald-100/50 md:flex-row md:items-center md:justify-between">
            <p className="leading-6">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </a>
              <span aria-hidden="true" className="text-white/20">•</span>
              <a
                href="/terms"
                className="transition hover:text-white"
              >
                Terms of Service
              </a>
              <span aria-hidden="true" className="text-white/20">•</span>
              <a
                href="#benefits"
                className="transition hover:text-white"
              >
                Subsidy Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
