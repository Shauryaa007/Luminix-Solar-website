'use client';

import React from 'react';
import { MapPin, MessageCircle, Navigation, Phone, Sun } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Details taken from the company flyer                                      */
/* -------------------------------------------------------------------------- */

// Number used for the big "Call" and "WhatsApp" buttons (10 digits, no +91)
const PRIMARY_PHONE = '9793078997';

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

export default function ContactSection() {
  const whatsappUrl = `https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
    'Hi, I want to know about rooftop solar.'
  )}`;

  return (
    <section id="contact" className="overflow-hidden bg-[#F5F8F3] py-10 sm:py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-3.5 sm:px-7 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ---------- Left: heading + actions ---------- */}
          <div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-900 sm:px-4 sm:py-2 sm:text-sm">
              <Sun className="h-4 w-4 shrink-0 text-emerald-700" />
              Contact
            </div>

            <h2 className="mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-[#102E24] sm:text-5xl xl:text-6xl">
              Call, chat
              <br />
              <span className="font-semibold text-emerald-700">or visit us</span>
            </h2>

            <p className="mt-3 max-w-md text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8">
              Talk to our team about your roof, your bill or the subsidy. Free site visit and
              free consultation.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:+91${PRIMARY_PHONE}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-[0.99] sm:w-auto"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Call {formatPhone(PRIMARY_PHONE)}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-700" />
                WhatsApp us
              </a>
            </div>
          </div>

          {/* ---------- Right: offices ---------- */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-emerald-950/5 sm:p-6">
            <p className="text-sm font-semibold text-slate-900">Our offices</p>

            <ul className="mt-3 divide-y divide-slate-200">
              {OFFICES.map((office) => (
                <li key={office.name} className="flex items-start gap-3.5 py-3.5 last:pb-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                    <MapPin className="h-4 w-4" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 sm:text-base">
                      {office.name}
                    </p>

                    {office.address && (
                      <p className="mt-0.5 text-sm leading-5 text-slate-600">{office.address}</p>
                    )}

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                      {office.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:+91${p}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline"
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
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:underline"
                        >
                          <Navigation className="h-3.5 w-3.5" />
                          Directions
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}