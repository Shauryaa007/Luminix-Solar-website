
'use client';

import React from 'react';
import Image from 'next/image';
import {
  Building2,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  CalendarDays,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Sun,
  Zap,
  Leaf,
  ClipboardCheck,
  Search,
  PanelsTopLeft,
  PlugZap,
} from 'lucide-react';
import {
  COMPANY_INFO,
  AUTHORIZED_PARTNERS,
  STEP_PROCESS,
} from '@/data/solarData';

const stepIcons = [
  Search,
  PanelsTopLeft,
  FileCheck2,
  PlugZap,
  CheckCircle2,
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Company introduction */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
              <Sun className="h-4 w-4" />
              Get to know LuminixSolar
            </div>

            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Engineering a cleaner future,
              <span className="block text-emerald-700">
                one rooftop at a time.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Established in{' '}
              <strong className="font-semibold text-slate-900">
                {COMPANY_INFO.establishedYear}
              </strong>
              ,{' '}
              <strong className="font-semibold text-slate-900">
                {COMPANY_INFO.name}
              </strong>{' '}
              is associated with{' '}
              <strong className="font-semibold text-slate-900">
                {COMPANY_INFO.parentCompany}
              </strong>
              . We help residential, commercial and agricultural customers
              explore solar solutions designed around their energy needs.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              From system selection and installation planning to coordination
              of applicable approvals, our focus is on making the transition
              to solar simpler, clearer and more accessible.
            </p>

            {/* Key highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                  Since {COMPANY_INFO.establishedYear}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Working toward a solar-powered future
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-100">
                  <Leaf className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                  Cleaner energy
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Solutions for homes and businesses
                </p>
              </div>
            </div>

            {/* Corporate details */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-950">
                    Company credentials
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Business and certification information
                  </p>
                </div>
              </div>

              <div className="grid gap-x-6 sm:grid-cols-2">
                <div className="border-b border-slate-100 px-5 py-4 sm:border-r">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Registered entity
                  </p>
                  <p className="mt-1.5 break-words text-sm font-semibold text-slate-900">
                    {COMPANY_INFO.name}
                  </p>
                </div>

                <div className="border-b border-slate-100 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    GSTIN
                  </p>
                  <p className="mt-1.5 break-all font-mono text-sm font-semibold text-slate-900">
                    {COMPANY_INFO.gstin}
                  </p>
                </div>

                <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    MNRE vendor ID
                  </p>
                  <p className="mt-1.5 break-words font-mono text-sm font-semibold text-emerald-800">
                    {COMPANY_INFO.mnreVendorId}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Certifications
                  </p>
                  <p className="mt-1.5 break-words text-sm font-semibold text-slate-900">
                    {COMPANY_INFO.isoCertifications}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Installation image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -right-3 -top-3 h-28 w-28 rounded-tr-[2rem] border-r-2 border-t-2 border-emerald-300 sm:-right-4 sm:-top-4" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.35)]">
                <div className="relative h-[430px] sm:h-[520px]">
                  <Image
                    src="/images/installation-team.jpg"
                    alt="Solar installation team at work"
                    fill
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#082c20]/95 via-[#082c20]/15 to-transparent" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-xl border border-white/25 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur sm:left-6 sm:top-6">
                    <ShieldCheck className="h-5 w-5 text-emerald-800" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Quality-focused execution
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Planning to installation
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-100 backdrop-blur">
                      <Zap className="h-3.5 w-3.5" />
                      Solar engineering
                    </div>

                    <h3 className="max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
                      Designed thoughtfully.
                      <span className="block text-emerald-200">
                        Installed professionally.
                      </span>
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                      Every property has different requirements. The right
                      solution starts with careful planning and a clear
                      understanding of your needs.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white">
                        Site assessment
                      </span>
                      <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white">
                        System planning
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl sm:left-8 sm:right-8 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      A clear process, from day one
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Understand the steps before your installation begins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand partnerships */}
        <div className="mt-24 border-t border-slate-200 pt-16 sm:mt-28 sm:pt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">
              <PanelsTopLeft className="h-4 w-4" />
              Technology ecosystem
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              The right components make a difference.
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Explore the manufacturers and technology categories in our
              partner network.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {AUTHORIZED_PARTNERS.map((partner) => (
              <div
                key={`${partner.name}-${partner.category}`}
                className="group flex min-h-[170px] flex-col items-start rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 sm:p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-white">
                  {partner.name.charAt(0)}
                </div>

                <h4 className="mt-4 text-sm font-bold leading-snug text-slate-950">
                  {partner.name}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {partner.category}
                </p>

                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800">
                    <CheckCircle2 className="h-3 w-3" />
                    {partner.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation process */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-slate-200 bg-[#f7faf8] sm:mt-24">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative overflow-hidden bg-[#103c2c] p-7 text-white sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-200">
                  <ArrowRight className="h-5 w-5" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
                  How it works
                </p>

                <h3 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Your solar journey,
                  <span className="block text-emerald-200">
                    made simpler.
                  </span>
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100/80">
                  A structured approach helps you understand the process,
                  from evaluating your property to commissioning your solar
                  system.
                </p>

                <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <MapPin className="h-5 w-5 text-emerald-200" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Planned for your property
                    </p>
                    <p className="mt-1 text-xs text-emerald-100/70">
                      Needs, roof space and system requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-9 lg:p-12">
              <div className="space-y-0">
                {STEP_PROCESS.map((step, index) => {
                  const StepIcon = stepIcons[index % stepIcons.length];
                  const isLast = index === STEP_PROCESS.length - 1;

                  return (
                    <div
                      key={`${step.step}-${step.title}`}
                      className="group relative flex gap-4 pb-7 last:pb-0 sm:gap-5"
                    >
                      {!isLast && (
                        <div className="absolute bottom-0 left-[19px] top-11 w-px bg-emerald-200" />
                      )}

                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-800 transition group-hover:border-emerald-800 group-hover:bg-emerald-800 group-hover:text-white">
                        <StepIcon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800">
                            Step {step.step}
                          </span>
                        </div>

                        <h4 className="mt-1.5 text-base font-bold text-slate-950">
                          {step.title}
                        </h4>

                        <p className="mt-1.5 text-sm leading-6 text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white">
              <Sun className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-950">
                Ready to explore solar for your property?
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Start with your electricity usage and discover a suitable
                system for your needs.
              </p>
            </div>
          </div>

          <a
            href="#calculator"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Explore solar savings
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
