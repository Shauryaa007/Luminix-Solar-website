import React from 'react';
import Image from 'next/image';
import { ChevronDown, Mail, Navigation, Phone } from 'lucide-react';
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
  { label: 'FAQ', href: '#faq' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

type Office = {
  name: string;
  address?: string;
  phones: string[];
};

const OFFICES: Office[] = [
  {
    name: 'Head office, Barabanki',
    address: 'MP-2824, Dashrabagh, Makhdumpur Road, Barabanki (225001)',
    phones: ['8127554008'],
  },
  {
    name: 'Bijnaur office, Lucknow',
    address: 'Subhash Hotel, Mati, Bijnaur Road, Lucknow (226002)',
    phones: ['9793078997', '8127554008'],
  },
  {
    name: 'Alamnagar branch',
    phones: ['9793078997'],
  },
  {
    name: 'Indira Nagar branch',
    phones: ['7355464235'],
  },
];

const formatPhone = (digits: string) => `${digits.slice(0, 5)} ${digits.slice(5)}`;

const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Footer() {
  const year = 2026;

  return (
    <footer id="contact" className="w-full bg-[#102E24] text-white">
      <div className="mx-auto w-full px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Brand + call */}
            {/* Brand + call */}
            <div className="flex flex-col items-start gap-5 lg:col-span-4">
              <a
                href="#home"
                aria-label="LuminixSolar home"
                className="flex w-fit items-center gap-3"
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
                <span className="text-[21px] font-extrabold tracking-tight">
                  Luminix<span className="text-emerald-300">Solar</span>
                </span>
              </a>

              <div className="space-y-2">
                <p className="text-xs text-white/60">Talk to our team</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-emerald-300"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-emerald-300" />
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-emerald-300 break-all"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-emerald-300" />
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer navigation" className="lg:col-span-3">
              <p className="text-sm font-bold tracking-wide">Quick links</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-emerald-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Offices (click to open) */}
            <div className="lg:col-span-5">
              <p className="text-sm font-bold tracking-wide">Our offices</p>

              <div className="mt-4 divide-y divide-white/15 border-t border-white/15">
                {OFFICES.map((office) => (
                  <details key={office.name} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-white/85 transition-colors hover:text-emerald-300 [&::-webkit-details-marker]:hidden">
                      {office.name}
                      <ChevronDown className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-200 group-open:rotate-180" />
                    </summary>

                    <div className="pb-4 text-sm leading-6 text-white/65">
                      {office.address && <p>{office.address}</p>}

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {office.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:+91${p}`}
                            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-emerald-300"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {formatPhone(p)}
                          </a>
                        ))}

                        {office.address && (
                          <a
                            href={mapsLink(office.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 hover:underline"
                          >
                            <Navigation className="h-3.5 w-3.5" />
                            Directions
                          </a>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-white/60">
              © {year} Luminix Solar Pvt. Ltd. in association with A &amp; V Agrivoltaics. All
              rights reserved.
            </p>


          </div>
        </div>
      </div>
    </footer>
  );
}