
'use client';

import React, { useId, useState } from 'react';
import {
  Calculator,
  Zap,
  TrendingDown,
  BadgeIndianRupee,
  Leaf,
  Clock3,
  ArrowUpRight,
  ShieldCheck,
  Sun,
  CheckCircle2,
  Info,
  PanelsTopLeft,
} from 'lucide-react';

interface SolarCalculatorProps {
  onApplyForCapacity: (capacityText: string) => void;
}

const formatINR = (amount: number) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`;

const SolarCalculator = ({
  onApplyForCapacity,
}: SolarCalculatorProps) => {
  const [monthlyBill, setMonthlyBill] = useState(4500);
  const billSliderId = useId();

  const monthlyUnits = Math.round(monthlyBill / 8.5);

  const recommendedKw = Math.min(
    25,
    Math.max(1, Math.round((monthlyUnits / 120) * 2) / 2)
  );

  const monthlyGeneration = Math.round(recommendedKw * 120);
  const roofAreaSqFt = Math.round(recommendedKw * 85);

  const monthlySavings = Math.round(
    Math.min(monthlyBill * 0.9, monthlyGeneration * 8.2)
  );

  const annualSavings = monthlySavings * 12;

  const lifetimeSavings = Math.round(
    monthlySavings * 12 * 25 * 1.35
  );

  let govtSubsidy = 0;

  if (recommendedKw >= 3) {
    govtSubsidy = 78000;
  } else if (recommendedKw >= 2) {
    govtSubsidy = 60000;
  } else {
    govtSubsidy = 30000;
  }

  const estimatedGrossCost = Math.round(recommendedKw * 65000);

  const netEstimatedCost = Math.max(
    0,
    estimatedGrossCost - govtSubsidy
  );

  const paybackYears = (
    netEstimatedCost / Math.max(annualSavings, 1)
  ).toFixed(1);

  const annualCO2Tons = (
    monthlyGeneration * 12 * 0.00082
  ).toFixed(1);

  const billPresets = [2500, 5000, 8500, 15000];

  return (
    <section
      id="calculator"
      className="relative isolate overflow-hidden bg-[#F5F8F3] py-14 sm:py-20 lg:py-24"
    >
      {/* Bright solar image background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=85')",
        }}
      />

      {/* Light overlay keeps the entire section bright */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#F7FAF5]/25"
      />

      {/* Soft, subtle green tint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/35 via-transparent to-[#E8F2E8]/50"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Business-focused heading */}
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-sm">
              <Sun className="h-4 w-4" />
              Your roof. Your power. Your savings.
            </div>

            <h2 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#183D2B] sm:text-5xl lg:text-6xl">
              Stop paying more
              <br className="hidden sm:block" />
              for electricity.
              <span className="block text-emerald-700">
                Start saving with solar.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              See how rooftop solar could reduce your electricity
              expenses, recover your investment and deliver savings
              over time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <div className="rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-sm">
              <p className="text-xs text-slate-500">
                Your potential benefit
              </p>
              <p className="mt-1 text-sm font-bold text-[#183D2B]">
                Lower power costs
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-sm">
              <p className="text-xs text-slate-500">
                Built around you
              </p>
              <p className="mt-1 text-sm font-bold text-[#183D2B]">
                Personalised estimate
              </p>
            </div>
          </div>
        </div>

        {/* Calculator and financial results */}
        <div className="mt-10 grid items-stretch gap-5 lg:mt-12 lg:grid-cols-12 lg:gap-6">
          {/* Left: bill input */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-slate-900/10">
              {/* Keep the calculator header dark */}
              <div className="bg-[#123A2C] px-6 py-6 text-white sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Calculator className="h-5 w-5 text-emerald-200" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      Calculate your savings
                    </h3>
                    <p className="mt-0.5 text-xs text-emerald-100/75">
                      Takes less than a minute
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <label
                  htmlFor={billSliderId}
                  className="text-sm font-semibold text-slate-700"
                >
                  What is your monthly electricity bill?
                </label>

                <div className="mt-4 rounded-2xl bg-emerald-50 p-5">
                  <p className="text-xs font-medium text-emerald-900/65">
                    MONTHLY BILL
                  </p>

                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-[#123A2C] sm:text-5xl">
                      {formatINR(monthlyBill)}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      / month
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Approximately {monthlyUnits.toLocaleString('en-IN')} units
                    of electricity per month
                  </p>
                </div>

                <input
                  id={billSliderId}
                  type="range"
                  min={1200}
                  max={30000}
                  step={200}
                  value={monthlyBill}
                  onChange={(event) =>
                    setMonthlyBill(Number(event.target.value))
                  }
                  aria-label="Monthly electricity bill in rupees"
                  className="mt-7 h-2.5 w-full cursor-pointer appearance-none rounded-full bg-emerald-100 accent-emerald-700"
                />

                <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                  <span>₹1,200</span>
                  <span>₹15,000</span>
                  <span>₹30,000</span>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold text-slate-600">
                    Or select your typical bill
                  </p>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {billPresets.map((preset) => {
                      const active = monthlyBill === preset;

                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setMonthlyBill(preset)}
                          aria-pressed={active}
                          className={`rounded-xl border px-2 py-2.5 text-xs font-bold transition ${
                            active
                              ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-700'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50'
                          }`}
                        >
                          ₹{preset.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <PanelsTopLeft className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Suggested system size
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-slate-900">
                        {roofAreaSqFt} sq. ft. approximate roof area
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-2xl font-bold text-emerald-800">
                    {recommendedKw}
                    <span className="ml-1 text-sm">kW</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onApplyForCapacity(
                      `${recommendedKw} kW Rooftop Solar System (Monthly Bill: ₹${monthlyBill})`
                    )
                  }
                  className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 active:scale-[0.99]"
                >
                  Get my solar quote
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                  Final system sizing and pricing depend on your property
                  assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Right: financial impact */}
          <div className="flex flex-col lg:col-span-7">
            {/* Keep the main savings card dark green */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-[#103C2C] p-6 text-white shadow-xl shadow-emerald-950/15 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-7 h-40 w-40 rounded-full border border-white/10"
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100">
                    <TrendingDown className="h-4 w-4" />
                    Your estimated savings
                  </div>

                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-100">
                    Based on your bill
                  </span>
                </div>

                <div className="mt-7">
                  <p className="text-sm text-white/65">
                    Potential monthly bill reduction
                  </p>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-5xl font-bold tracking-tight sm:text-6xl">
                      {formatINR(monthlySavings)}
                    </span>
                    <span className="text-sm text-emerald-200">
                      / month
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-white/70">
                    That's approximately{' '}
                    <strong className="text-white">
                      {formatINR(annualSavings)} per year
                    </strong>{' '}
                    in potential bill savings.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/15 pt-5">
                  <div>
                    <p className="text-xs text-white/55">
                      Estimated monthly generation
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {monthlyGeneration.toLocaleString('en-IN')} kWh
                    </p>
                    <p className="mt-1 text-[10px] text-white/45">
                      Approximate output per month
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/55">
                      Potential 25-year savings
                    </p>
                    <p className="mt-1 text-xl font-bold text-emerald-200">
                      ₹{(lifetimeSavings / 100000).toFixed(2)} lakh
                    </p>
                    <p className="mt-1 text-[10px] text-white/45">
                      Illustrative projection
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment metrics */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <BadgeIndianRupee className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                  Estimated system cost*
                </p>

                <p className="mt-1 break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {formatINR(estimatedGrossCost)}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  Before any applicable subsidy
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-800">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs font-medium text-emerald-900/70">
                  Potential subsidy*
                </p>

                <p className="mt-1 break-words text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
                  {formatINR(govtSubsidy)}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-emerald-900/60">
                  Subject to scheme eligibility
                </p>
              </div>

              <div className="rounded-2xl border border-white bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Clock3 className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                  Indicative payback
                </p>

                <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {paybackYears} years
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  Based on estimated net cost
                </p>
              </div>

              <div className="rounded-2xl border border-white bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Zap className="h-5 w-5" />
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                  Approx. net system cost*
                </p>

                <p className="mt-1 break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {formatINR(netEstimatedCost)}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  After assumed subsidy
                </p>
              </div>
            </div>

            {/* Environmental benefit: solid dark card for contrast */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-[#123A2C] p-4 text-white shadow-lg shadow-slate-900/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
                <Leaf className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold">
                  Save on power. Reduce your footprint.
                </p>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  Estimated avoided emissions:{' '}
                  <span className="font-semibold text-white">
                    {annualCO2Tons} tonnes of CO₂ per year
                  </span>
                  .
                </p>
              </div>

              <CheckCircle2 className="ml-auto hidden h-5 w-5 shrink-0 text-emerald-300 sm:block" />
            </div>

            {/* Disclaimer on the light background */}
            <div className="mt-4 flex items-start gap-2 text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />
              <p className="text-[10px] leading-5">
                Illustrative estimates only, not guaranteed savings or a
                confirmed subsidy offer. Actual results depend on location,
                tariff, roof conditions, system design and current scheme
                rules. Costs and subsidy values should be verified before
                publication or making a purchase decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
