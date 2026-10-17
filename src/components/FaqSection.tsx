
'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Download,
  FileText,
  PhoneCall,
  Sun,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Zap,
  Leaf,
} from 'lucide-react';
import { FAQ_DATA, COMPANY_INFO } from '@/data/solarData';

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#f7faf8] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-teal-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 shadow-sm">
            <HelpCircle className="h-4 w-4" />
            Here to help
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Good questions lead to
            <span className="block text-emerald-700">
              better solar decisions.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            From installation and costs to subsidies and maintenance,
            find the information you need to make a confident decision.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* FAQ accordion */}
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                  Your questions, answered
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-950">
                  Frequently asked questions
                </h3>
              </div>

              <span className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 sm:inline-flex">
                {FAQ_DATA.length} topics
              </span>
            </div>

            <div className="space-y-3">
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqId === faq.id;
                const answerId = `faq-answer-${faq.id}`;

                return (
                  <article
                    key={faq.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition duration-300 ${
                      isOpen
                        ? 'border-emerald-200 shadow-[0_12px_35px_-24px_rgba(6,78,59,0.35)]'
                        : 'border-slate-200 hover:border-emerald-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="flex w-full items-center gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600 sm:gap-4 sm:p-5"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition ${
                          isOpen
                            ? 'bg-emerald-800 text-white'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="mb-1.5 block">
                          <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            {faq.category}
                          </span>
                        </span>

                        <span className="block text-sm font-bold leading-6 text-slate-900 sm:text-base">
                          {faq.question}
                        </span>
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-emerald-50 text-emerald-800'
                            : 'bg-slate-50 text-slate-500'
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      id={answerId}
                      hidden={!isOpen}
                      className="border-t border-slate-100"
                    >
                      <div className="flex gap-3 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 sm:flex">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <p className="text-sm leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* FAQ bottom note */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Still have a question?
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                  Every property is different. Speak with the team about
                  your roof, energy usage and installation requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Right-hand resource cards */}
          <aside className="space-y-5 lg:col-span-4">
            {/* Catalogue card */}
            <div className="relative overflow-hidden rounded-3xl bg-[#103c2c] p-6 text-white shadow-[0_20px_55px_-25px_rgba(6,50,35,0.45)] sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-200">
                    <FileText className="h-6 w-6" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[10px] font-bold text-emerald-100">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Product information
                  </span>
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-emerald-200">
                  Explore your options
                </p>

                <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  Your solar guide,
                  <span className="block text-emerald-200">
                    all in one place.
                  </span>
                </h3>

                <p className="mt-4 text-sm leading-7 text-emerald-100/80">
                  Explore product specifications, system options and
                  information to help plan your solar installation.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    'Solar product information',
                    'Installation planning checklist',
                    'Subsidy and warranty guidance',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-200" />
                      <span className="text-xs font-medium text-white/90">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="/documents/luminix-solar-catalogue-2026.pdf"
                  download
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-4 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  <Download className="h-4 w-4" />
                  Download solar catalogue
                  <ArrowUpRight className="ml-auto h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <p className="mt-3 text-center text-[10px] leading-5 text-emerald-100/60">
                  PDF guide · Available once uploaded
                </p>
              </div>
            </div>

            {/* Expert support card */}
            <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
              <div className="p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <PhoneCall className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Let’s talk about your roof.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Need help choosing a system or understanding the
                  installation process? Get in touch with our team.
                </p>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="group mt-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 transition hover:border-emerald-400 hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800">
                      Call our team
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-950">
                      {COMPANY_INFO.phoneDisplay}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white transition group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Contact us to discuss your requirements and next steps.
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-7">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 ring-1 ring-slate-200">
                  <Leaf className="h-4 w-4" />
                </div>
                <p className="text-xs leading-5 text-slate-600">
                  <span className="font-bold text-slate-900">
                    Your property. Your requirements.
                  </span>
                  <br />
                  Get guidance suited to your energy needs.
                </p>
              </div>
            </div>

            {/* Small trust note */}
            <div className="flex items-start gap-3 px-1 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-800 ring-1 ring-slate-200">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Make an informed decision
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Final costs, savings and subsidy eligibility depend on
                  your system, property and applicable scheme rules.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
