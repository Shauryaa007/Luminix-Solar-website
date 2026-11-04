import React from 'react';
import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

/* -------------------------------------------------------------------------- */
/*  Edit these if anything changes                                            */
/* -------------------------------------------------------------------------- */

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Savings calculator', href: '#calculator' },
  { label: 'Our projects', href: '#projects' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'About us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#102E24] text-white">

      <div className="mx-auto w-full px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">

        <div className="mx-auto max-w-[1400px]">

          {/* Top Section */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-5">

              <a
                href="#home"
                aria-label="LuminixSolar home"
                className="inline-flex items-center gap-3"
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                  <Image
                    src={COMPANY_INFO.logo}
                    alt="Luminix Solar"
                    fill
                    sizes="44px"
                    className="object-contain p-1"
                  />
                </span>

                <span className="text-[21px] font-extrabold tracking-tight text-white">
                  Luminix<span className="text-emerald-300">Solar</span>
                </span>
              </a>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/70 sm:text-[15px]">
                Rooftop solar for homes, businesses and farms in Lucknow.
                Making clean energy accessible and affordable.
              </p>

            </div>

            {/* Quick Links */}
            <nav
              aria-label="Footer navigation"
              className="lg:col-span-3"
            >

              <p className="text-sm font-bold tracking-wide text-white">
                Quick links
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">

                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65 transition-colors duration-200 hover:text-emerald-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

              </ul>

            </nav>

            {/* Contact */}
            <div className="lg:col-span-4">

              <p className="text-sm font-bold tracking-wide text-white">
                Talk to us
              </p>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#153D2D] transition-colors duration-200 hover:bg-emerald-100 active:scale-[0.99]"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Call {COMPANY_INFO.phoneDisplay}
              </a>

              <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-white/70">

                <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />

                <span>
                  Offices in Barabanki and Lucknow.{' '}
                  <a
                    href="#contact"
                    className="font-semibold text-white transition-colors hover:text-emerald-300"
                  >
                    See all
                  </a>
                </span>

              </p>

            </div>

          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-white/15 pt-7 sm:mt-14 sm:pt-8">

            <p className="text-xs leading-6 text-white/60">
              <span className="font-semibold text-white/80">
                Luminix Solar Pvt. Ltd.
              </span>
              &nbsp;·&nbsp;
              GSTIN 09CCVPV0642N1ZM
              &nbsp;·&nbsp;
              ISO 9001:2015 &amp; ISO 14001:2015 certified
            </p>

            <p className="mt-2 max-w-3xl text-xs leading-6 text-white/50">
              Savings and subsidy amounts depend on your location,
              electricity connection and government rules.
            </p>

            {/* Copyright and Legal Links */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs leading-5 text-white/60">
                © {year} Luminix Solar Pvt. Ltd. All rights reserved.
              </p>

              {LEGAL_LINKS.length > 0 && (
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">

                  {LEGAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-xs text-white/60 transition-colors duration-200 hover:text-emerald-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}

                </ul>
              )}

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}
