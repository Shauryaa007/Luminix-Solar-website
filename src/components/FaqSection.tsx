'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Minus,
  Phone,
  Plus,
  Sun,
} from 'lucide-react';

interface FaqSectionProps {
  onOpenConsultation?: (prefill?: string) => void;
}

const PRIMARY_PHONE = '9793078997';

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How much subsidy can I get?',
    a: 'The central PM Surya Ghar subsidy is ₹30,000 per kW for the first 2 kW and ₹18,000 for the 3rd kW, so up to ₹78,000 for a 3 kW system or bigger. With state support, the total can go up to ₹1,08,000. The exact amount depends on your system size and government rules.',
  },
  {
    q: 'Who can get the subsidy?',
    a: 'The PM Surya Ghar subsidy is for homes with an electricity connection. For shops, offices, factories and farms, the rules are different. Our engineer will tell you what applies to you during the free site visit.',
  },
  {
    q: 'How much roof space do I need?',
    a: 'About 80 sq. ft. of shade-free roof for every 1 kW. A 3 kW plant needs around 240 sq. ft.',
  },
  {
    q: 'How much power will my solar plant make?',
    a: 'Every 1 kW makes about 5 to 6 units a day on a sunny day. On cloudy days it makes less. Use our savings calculator to see an estimate for your home.',
  },
  {
    q: 'Will my lights work during a power cut?',
    a: 'A normal grid-connected solar plant switches off when the grid goes off, for safety. If you want light during power cuts, add a hybrid inverter with a battery. We can help you choose.',
  },
  {
    q: 'What happens to the extra power?',
    a: 'With net metering, extra power goes to the grid and is adjusted against your bill. It is one of the reasons your electricity bill comes down.',
  },
  {
    q: 'Is the site visit really free?',
    a: 'Yes. The site visit and consultation are free, with no obligation. Our engineer checks your roof and your light bill and suggests the right plant size.',
  },
  {
    q: 'How long do solar panels last?',
    a: 'Solar panels come with a power warranty of up to 25 years and need very little care. Cleaning them with water now and then is usually enough. Other warranty details are shared in your quote.',
  },
];

export default function FaqSection({
  onOpenConsultation,
}: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      document.getElementById('home')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      id="faq"
      className="bg-white py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">

        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12 lg:gap-16">

          {/* LEFT: HEADING AND CONTACT */}
          <div className="lg:col-span-5">

            <div className="lg:sticky lg:top-28">

              {/* Section label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5">
                <Sun className="h-3.5 w-3.5 text-emerald-700" />
                <span className="text-xs font-semibold tracking-wide text-emerald-800">
                  Frequently asked questions
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-[36px] font-medium leading-[1.12] tracking-[-0.045em] text-[#102E24] sm:text-5xl lg:text-[54px]">
                Everything you
                <br />
                need to know
                <span className="mt-1 block font-semibold text-emerald-700">
                  about going solar.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                From installation and subsidies to savings and maintenance,
                find answers to the questions that matter before making
                the switch to solar.
              </p>

              {/* Contact */}
              {/* <div className="mt-8 hidden border-t border-slate-200 pt-7 lg:block">

                <p className="text-sm font-semibold text-[#102E24]">
                  Still have questions?
                </p>

                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  Our solar experts are happy to help you find the right solution.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">

                  <a
                    href={`tel:+91${PRIMARY_PHONE}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#174b35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103b29] active:scale-[0.98]"
                  >
                    <Phone className="h-4 w-4" />
                    Call us
                  </a>

                  <button
                    type="button"
                    onClick={handleConsultation}
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#174b35] transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    Free consultation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                </div>
              </div> */}

            </div>
          </div>

          {/* RIGHT: FAQ ACCORDION */}
          <div className="lg:col-span-7">

            <div className="border-t border-slate-200">

              {FAQS.map((item, i) => {
                const isOpen = openIndex === i;

                return (
                  <div
                    key={item.q}
                    className={`border-b border-slate-200 transition-colors duration-200 ${
                      isOpen ? 'bg-emerald-50/50' : 'bg-white'
                    }`}
                  >

                    {/* Question */}
                    <h3>
                      <button
                        type="button"
                        id={`faq-button-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        onClick={() =>
                          setOpenIndex(isOpen ? null : i)
                        }
                        className="flex w-full items-center justify-between gap-5 px-3 py-5 text-left transition-colors duration-200 hover:bg-emerald-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600 sm:px-5 sm:py-6"
                      >

                        <span className="flex min-w-0 items-center gap-4">

                          <span
                            className={`hidden text-xs font-semibold tabular-nums sm:block ${
                              isOpen
                                ? 'text-emerald-700'
                                : 'text-slate-300'
                            }`}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>

                          <span
                            className={`text-[15px] font-semibold leading-6 transition-colors sm:text-base ${
                              isOpen
                                ? 'text-[#174b35]'
                                : 'text-slate-800'
                            }`}
                          >
                            {item.q}
                          </span>

                        </span>

                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                            isOpen
                              ? 'bg-[#174b35] text-white'
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

                    {/* Answer */}
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                        isOpen
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">

                        <p className="max-w-2xl pb-6 pl-3 pr-12 text-sm leading-7 text-slate-600 sm:pl-12 sm:pr-10 sm:text-[15px] sm:leading-7">
                          {item.a}
                        </p>

                      </div>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Mobile and tablet contact */}
            {/* <div className="mt-8 border-t border-slate-200 pt-6 lg:hidden">

              <p className="text-sm font-semibold text-[#102E24]">
                Still have questions?
              </p>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Talk to our team and get expert guidance for your solar installation.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                <a
                  href={`tel:+91${PRIMARY_PHONE}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#174b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103b29]"
                >
                  <Phone className="h-4 w-4" />
                  Call {PRIMARY_PHONE.slice(0, 5)} {PRIMARY_PHONE.slice(5)}
                </a>

                <button
                  type="button"
                  onClick={handleConsultation}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-[#174b35] transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  Get free consultation
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </div> */}

          </div>

        </div>
      </div>
    </section>
  );
}