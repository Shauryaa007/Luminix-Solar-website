'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FaqSectionProps {
  onOpenConsultation?: (prefill?: string) => void;
}

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How much government subsidy can I get?',
    a: 'Under PM Surya Ghar (PMSG), homes receive up to ₹1,08,000 (Central + UP state). Under PMFME, micro food processing businesses receive a 35% capital subsidy up to ₹10 Lakhs.',
  },
  {
    q: 'Who is eligible for PMSG and PMFME schemes?',
    a: 'PM Surya Ghar covers residential homeowners with an active grid meter. PMFME covers food processing units, flour mills, cold storage, and agro-enterprises across Uttar Pradesh.',
  },
  {
    q: 'How much roof space is required for installation?',
    a: 'Every 1 kW solar setup requires approximately 80 to 100 sq. ft. of shadow-free rooftop or open ground area for both residential and commercial projects.',
  },
  {
    q: 'How much electricity will my solar plant generate?',
    a: 'A 1 kW solar plant generates around 4 to 5.5 units daily. A standard 3 kW residential setup produces 360–420 units monthly, cutting bills by up to 90%.',
  },
  {
    q: 'Will solar power work during a power outage or grid cut?',
    a: 'Standard on-grid solar systems pause during power cuts for grid safety. For round-the-clock uninterrupted power backup, hybrid systems with battery storage are installed.',
  },
  {
    q: 'What happens to the excess solar electricity generated?',
    a: 'Excess electricity automatically exports to the grid via government bi-directional net metering, earning solar credit units directly adjusted against your monthly bill.',
  },
  {
    q: 'Is the site inspection and subsidy paperwork really free?',
    a: 'Yes, our engineer visits your site for a 100% free shadow audit, custom design, and handles end-to-end documentation for both PMSG and PMFME approvals.',
  },
  {
    q: 'What is the lifespan and warranty of the solar equipment?',
    a: 'Tier-1 solar panels provide a 25-year performance warranty with 30+ year lifespan, while inverters include 5 to 10 years of comprehensive brand warranty.',
  },
];

export default function FaqSection({
  onOpenConsultation,
}: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Simple one-line heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-[#102E24] sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion - Spanning standard max-w-7xl content width */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs divide-y divide-slate-200">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={item.q}
                className={`transition-colors duration-200 ${
                  isOpen ? 'bg-emerald-50/40' : 'bg-white'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-emerald-50/50 sm:px-6 sm:py-5"
                  >
                    <span className="flex min-w-0 items-center gap-3.5">
                      <span
                        className={`text-xs font-semibold tabular-nums sm:text-sm ${
                          isOpen ? 'font-bold text-emerald-700' : 'text-slate-400'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm font-semibold leading-snug sm:text-base ${
                          isOpen ? 'text-[#102E24]' : 'text-slate-800'
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-8 sm:w-8 ${
                        isOpen
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pl-10 pr-6 text-sm leading-relaxed text-slate-600 sm:pl-14 sm:pr-10 sm:text-[15px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
    </section>
  );
}