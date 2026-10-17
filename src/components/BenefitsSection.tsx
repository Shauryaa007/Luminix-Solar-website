
'use client';

import React from 'react';
import {
  TrendingDown,
  ShieldCheck,
  ArrowLeftRight,
  Award,
  BatteryMedium,
  Wrench,
  CheckCircle2,
  CircleMinus,
  Sparkles,
  Zap,
  ArrowUpRight,
  Sun,
  Leaf,
  BadgeCheck,
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingDown,
      number: '01',
      title: 'Lower electricity bills',
      description:
        'Generate your own electricity from sunlight and reduce your dependence on grid power.',
      highlight: 'Long-term savings potential',
    },
    {
      icon: ShieldCheck,
      number: '02',
      title: 'Government subsidy support',
      description:
        'Explore applicable rooftop solar subsidies and get guidance through the documentation process.',
      highlight: 'Guidance on PM Surya Ghar',
    },
    {
      icon: ArrowLeftRight,
      number: '03',
      title: 'Smarter energy management',
      description:
        'With an approved net-metering setup, eligible surplus generation may offset electricity drawn from the grid.',
      highlight: 'Make surplus power count',
    },
    {
      icon: Award,
      number: '04',
      title: 'Built for the long run',
      description:
        'Choose quality solar modules with manufacturer-backed product and performance warranties.',
      highlight: 'Warranty-backed components',
    },
    {
      icon: BatteryMedium,
      number: '05',
      title: 'Backup when you need it',
      description:
        'Pair a compatible hybrid inverter with battery storage to power selected appliances during outages.',
      highlight: 'Optional battery integration',
    },
    {
      icon: Wrench,
      number: '06',
      title: 'A simpler installation journey',
      description:
        'Get support with system selection, site assessment, installation coordination and applicable approvals.',
      highlight: 'Support from start to finish',
    },
  ];

  const comparison = [
    {
      feature: 'Electricity expenses',
      traditional: 'Continued dependence on grid tariffs',
      solar: 'Potential to reduce purchased electricity',
    },
    {
      feature: 'Energy generation',
      traditional: 'Power supplied through the utility grid',
      solar: 'Generate electricity on your own rooftop',
    },
    {
      feature: 'Government support',
      traditional: 'No rooftop solar installation',
      solar: 'Eligible systems may qualify for applicable subsidies',
    },
    {
      feature: 'Power outages',
      traditional: 'Grid supply alone stops during outages',
      solar: 'Compatible battery backup can power selected loads',
    },
    {
      feature: 'Long-term planning',
      traditional: 'Ongoing exposure to electricity tariffs',
      solar: 'Greater control over a portion of energy costs',
    },
    {
      feature: 'Environmental impact',
      traditional: 'Grid electricity has a location-dependent emissions profile',
      solar: 'Rooftop solar can reduce reliance on grid generation',
    },
  ];

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle brand background */}
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-50/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
            <Sparkles className="h-4 w-4" />
            The LuminixSolar advantage
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            More control over your
            <span className="block text-emerald-700">
              energy. More room to grow.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Solar is more than installing panels. It is a practical step
            toward smarter energy use, predictable planning and a cleaner
            energy future.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.number}
                className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_45px_-22px_rgba(6,78,59,0.22)] sm:p-7"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <span className="text-xs font-bold tracking-[0.16em] text-slate-300">
                    {benefit.number}
                  </span>
                </div>

                {/* Card content */}
                <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>

                {/* Bottom highlight */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="text-xs font-semibold text-emerald-800">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>

                {/* Decorative hover accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-700 transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* Comparison section */}
        <div className="mt-20 sm:mt-24">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                <ArrowLeftRight className="h-4 w-4" />
                At a glance
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Grid electricity vs. rooftop solar
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                See how generating your own power can change the way you
                manage household or business energy.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              <Sun className="h-4 w-4 text-emerald-700" />
              A smarter energy choice
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_-30px_rgba(15,23,42,0.25)]">
            {/* Table header */}
            <div className="grid grid-cols-2 border-b border-slate-200 sm:grid-cols-[1fr_1fr_1fr]">
              <div className="col-span-2 bg-slate-50 px-5 py-4 sm:col-span-1 sm:px-6 sm:py-5">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  Compare your options
                </span>
              </div>

              <div className="hidden items-center bg-slate-50 px-6 py-5 sm:flex">
                <span className="text-sm font-semibold text-slate-600">
                  Traditional grid
                </span>
              </div>

              <div className="flex items-center gap-2 bg-emerald-800 px-4 py-4 text-white sm:px-6 sm:py-5">
                <Sun className="h-4 w-4 shrink-0 text-emerald-200" />
                <span className="text-sm font-bold">
                  LuminixSolar
                </span>
              </div>
            </div>

            {/* Comparison rows */}
            {comparison.map((item, index) => (
              <div
                key={item.feature}
                className={`grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr] ${
                  index !== comparison.length - 1
                    ? 'border-b border-slate-100'
                    : ''
                }`}
              >
                <div className="col-span-2 px-5 pb-2 pt-5 sm:col-span-1 sm:px-6 sm:py-5">
                  <span className="text-sm font-bold text-slate-900">
                    {item.feature}
                  </span>
                </div>

                <div className="px-5 pb-5 pt-2 sm:px-6 sm:py-5">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:hidden">
                    Grid
                  </div>

                  <div className="flex items-start gap-2">
                    <CircleMinus className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span className="text-xs leading-5 text-slate-600 sm:text-sm">
                      {item.traditional}
                    </span>
                  </div>
                </div>

                <div className="border-l border-emerald-100 bg-emerald-50/60 px-4 pb-5 pt-2 sm:border-l-0 sm:px-6 sm:py-5">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-800 sm:hidden">
                    Solar
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="text-xs font-medium leading-5 text-slate-800 sm:text-sm">
                      {item.solar}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Actual savings, subsidy eligibility, backup capability and
            installation outcomes depend on your location, electricity
            connection, system design and applicable regulations.
          </p>
        </div>

        {/* Closing CTA banner */}
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#103c2c] px-6 py-9 sm:px-10 sm:py-10 lg:mt-20 lg:px-12">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-1 -top-16 h-48 w-48 rounded-full border border-white/10" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-200">
                <Leaf className="h-4 w-4" />
                Your solar journey starts here
              </div>

              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                Ready to explore solar for your property?
              </h3>

              <p className="mt-3 text-sm leading-6 text-emerald-100/80">
                Get a tailored recommendation based on your electricity
                usage, available roof space and energy requirements.
              </p>
            </div>

            <a
              href="#calculator"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Calculate my savings
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
