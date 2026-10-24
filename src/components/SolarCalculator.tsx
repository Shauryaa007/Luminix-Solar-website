'use client';

import React, { useState, useRef } from 'react';
import {
  Calculator,
  Zap,
  TrendingDown,
  BadgeIndianRupee,
  Leaf,
  ShieldCheck,
  Sun,
  CheckCircle2,
  Info,
  PanelsTopLeft,
  Building2,
  Plus,
  Minus,
  ArrowDown,
} from 'lucide-react';

interface SolarCalculatorProps {
  onApplyForCapacity?: (capacityText: string) => void;
}

const formatINR = (amount: number) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`;

// Constants based on official Luminix Solar benchmarks
const AVG_DAILY_UNITS_MIN = 5; // 5 units/day/kW
const AVG_DAILY_UNITS_MAX = 6; // 6 units/day/kW
const AVG_MONTHLY_UNITS_PER_KW = 5.5 * 30; // ~165 units/month/kW
const ROOF_AREA_PER_KW = 80; // 8 * 10 sqft = 80 sqft per 1kW

// Pricing model:
// 1kW: 70k
// 2kW: 125k
// 3kW: 180k
// After 3kW up to 5kW: +55k/kW
// After 5kW: +50k/kW
const calculateGrossCost = (kw: number): number => {
  if (kw <= 0) return 0;
  if (kw <= 1) return Math.round(70000 * Math.max(0.5, kw));
  if (kw <= 2) return Math.round(70000 + (kw - 1) * (125000 - 70000));
  if (kw <= 3) return Math.round(125000 + (kw - 2) * (180000 - 125000));
  if (kw <= 5) return Math.round(180000 + (kw - 3) * 55000);
  return Math.round(290000 + (kw - 5) * 50000);
};

// Subsidy model:
// 1kW: 30k (Central) + 15k (State) = 45k
// 2kW: 60k (Central) + 30k (State) = 90k
// >= 3kW: 78k (Central) + 30k (State) = 108k (fixed)
const calculateSubsidy = (kw: number) => {
  if (kw < 2) {
    return {
      central: 30000,
      state: 15000,
      total: 45000,
    };
  } else if (kw < 3) {
    return {
      central: 60000,
      state: 30000,
      total: 90000,
    };
  } else {
    return {
      central: 78000,
      state: 30000,
      total: 108000,
    };
  }
};

const POPULAR_CAPACITIES = [3, 5, 10];

const SolarCalculator = ({
  // onApplyForCapacity is retained for backwards compatibility
}: SolarCalculatorProps) => {
  // Configurable tariff per unit with default ₹7 / unit
  const [tariffPerUnit, setTariffPerUnit] = useState<number>(7);

  // System capacity in kW (default to 3 kW - most popular residential capacity)
  const [capacityKw, setCapacityKw] = useState<number>(3);
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [inputMode, setInputMode] = useState<'capacity' | 'bill'>('capacity');

  // Ref to scroll to results and KPIs on mobile
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Tariff adjustment helpers
  const decreaseTariff = () => {
    setTariffPerUnit((prev) => Math.max(3, Math.round((prev - 0.5) * 10) / 10));
  };

  const increaseTariff = () => {
    setTariffPerUnit((prev) => Math.min(25, Math.round((prev + 0.5) * 10) / 10));
  };

  // Handlers for bidirectional syncing & manual input
  const handleCapacityChange = (kw: number) => {
    const clampedKw = Math.max(0.5, Math.min(50, kw));
    setCapacityKw(clampedKw);
    // Sync approx monthly bill based on generation at current tariff
    const approxBill = Math.round(clampedKw * AVG_MONTHLY_UNITS_PER_KW * tariffPerUnit);
    setMonthlyBill(approxBill);
    setInputMode('capacity');
  };

  const handleBillChange = (bill: number) => {
    const clampedBill = Math.max(100, bill);
    setMonthlyBill(clampedBill);
    // Estimated units consumed = bill / tariff
    const unitsConsumed = clampedBill / Math.max(1, tariffPerUnit);
    // Capacity needed to offset this bill:
    const calculatedKw = Math.max(1, Math.min(50, Math.round((unitsConsumed / AVG_MONTHLY_UNITS_PER_KW) * 10) / 10));
    setCapacityKw(calculatedKw);
    setInputMode('bill');
  };

  // Steppers for quick adjustment
  const stepCapacity = (delta: number) => {
    handleCapacityChange(Math.round((capacityKw + delta) * 10) / 10);
  };

  const stepBill = (delta: number) => {
    handleBillChange(Math.max(500, monthlyBill + delta));
  };

  // Technical Calculations
  const roofAreaSqFt = Math.round(capacityKw * ROOF_AREA_PER_KW); // 8 * 10 sqft per 1kW
  const dailyUnitsMin = (capacityKw * AVG_DAILY_UNITS_MIN).toFixed(1).replace(/\.0$/, '');
  const dailyUnitsMax = (capacityKw * AVG_DAILY_UNITS_MAX).toFixed(1).replace(/\.0$/, '');
  const monthlyGenerationUnits = Math.round(capacityKw * AVG_MONTHLY_UNITS_PER_KW);

  // Financial Calculations
  const grossCost = calculateGrossCost(capacityKw);
  const subsidy = calculateSubsidy(capacityKw);
  const netEstimatedCost = Math.max(0, grossCost - subsidy.total);

  // Monthly savings based on generation at user's tariff rate
  const potentialMonthlySavings = Math.round(monthlyGenerationUnits * tariffPerUnit);
  const monthlySavings = inputMode === 'bill'
    ? Math.min(monthlyBill, potentialMonthlySavings)
    : potentialMonthlySavings;
  const annualSavings = monthlySavings * 12;

  // 25-Year Lifetime Savings
  const lifetimeSavings = Math.round(annualSavings * 25);

  // Payback period
  const paybackYears = (netEstimatedCost / Math.max(annualSavings, 1)).toFixed(1);

  // Environmental offset
  const annualCO2Tons = (monthlyGenerationUnits * 12 * 0.00082).toFixed(1);

  return (
    <section
      id="calculator"
      className="relative isolate overflow-hidden bg-[#F5F8F3] py-14 sm:py-20 lg:py-24"
    >
      {/* Background with soft solar ambiance */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=85')",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F5F8F3]/90 via-[#F5F8F3]/95 to-[#E8F2E8]/80"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Top Tiles */}
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-sm">
              <Sun className="h-4 w-4 text-amber-500 fill-amber-400" />
              PM Surya Ghar Muft Bijli Yojana
            </div>

            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-[#183D2B] sm:text-4xl lg:text-5xl">
              Solar Savings & Subsidy Calculator
            </h2>
          </div>

          {/* Symmetrical Equal-Size Metric Tiles: Same line on mobile */}
          <div className="lg:col-span-5 lg:justify-self-end w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
              {/* Tile 1: Tariff Cost Adjuster */}
              <div className="flex flex-col justify-between rounded-2xl border border-emerald-200/90 bg-white/95 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm min-h-[84px]">
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 truncate">
                  Electricity Tariff
                </p>
                <div className="mt-1 flex items-center justify-between gap-1">
                  <p className="text-base sm:text-lg font-extrabold text-[#183D2B] whitespace-nowrap">
                    ₹{tariffPerUnit} <span className="text-[11px] font-normal text-slate-500">/ Unit</span>
                  </p>
                  <div className="flex items-center gap-0.5 sm:gap-1 rounded-lg bg-emerald-50 p-0.5 border border-emerald-200/80">
                    <button
                      type="button"
                      onClick={decreaseTariff}
                      aria-label="Decrease electricity tariff rate"
                      title="Decrease tariff by ₹0.5"
                      className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md bg-white text-emerald-900 shadow-xs border border-emerald-200/60 hover:bg-emerald-100 hover:text-emerald-950 active:scale-95 transition"
                    >
                      <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={increaseTariff}
                      aria-label="Increase electricity tariff rate"
                      title="Increase tariff by ₹0.5"
                      className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md bg-white text-emerald-900 shadow-xs border border-emerald-200/60 hover:bg-emerald-100 hover:text-emerald-950 active:scale-95 transition"
                    >
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tile 2: Benchmark Output (Exact same size) */}
              <div className="flex flex-col justify-between rounded-2xl border border-emerald-200/90 bg-white/95 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm min-h-[84px]">
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 truncate">
                  Benchmark Output
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <p className="text-base sm:text-lg font-extrabold text-[#183D2B] whitespace-nowrap">
                    5 – 6 Units
                  </p>
                  <span className="text-[11px] font-normal text-slate-500 truncate">
                    / Day / kW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="mt-10 grid items-stretch gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Interactive Controls & Detailed Benchmark Standards */}
          <div className="flex h-full flex-col justify-between gap-4 lg:col-span-5">
            <div className="flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl shadow-slate-900/10">
              {/* Header */}
              <div className="bg-[#123A2C] px-6 py-5 text-white sm:px-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Calculator className="h-5 w-5 text-emerald-300" />
                    </div>
                    <h3 className="text-base font-bold sm:text-lg">Configure Your System</h3>
                  </div>

                  {/* Desktop: Full Live Calculation badge with blinking pulse */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-200 border border-emerald-400/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    Live Calculation
                  </span>

                  {/* Mobile: Compact Live Blinking Signal */}
                  <div
                    className="inline-flex sm:hidden items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-200 border border-emerald-400/30"
                    title="Live calculation active"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    Live
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setInputMode('capacity')}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                      inputMode === 'capacity'
                        ? 'bg-white text-emerald-950 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PanelsTopLeft className="h-3.5 w-3.5 text-emerald-700" />
                    By System Size (kW)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('bill')}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                      inputMode === 'bill'
                        ? 'bg-white text-emerald-950 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BadgeIndianRupee className="h-3.5 w-3.5 text-emerald-700" />
                    By Monthly Bill (₹)
                  </button>
                </div>

                {/* Primary Metric Box with Direct Manual Input */}
                <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      {inputMode === 'capacity' ? 'System Size' : 'Monthly Electricity Bill'}
                    </p>
                    {inputMode === 'bill' && (
                      <span className="rounded-md bg-emerald-200/70 px-2 py-0.5 text-[11px] font-bold text-emerald-900">
                        Recommends {capacityKw} kW
                      </span>
                    )}
                  </div>

                  {/* Small 3 tiles with N kW only on top of manual input bar */}
                  {inputMode === 'capacity' && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {POPULAR_CAPACITIES.map((kw) => {
                        const active = capacityKw === kw;
                        return (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => handleCapacityChange(kw)}
                            aria-pressed={active}
                            className={`rounded-xl border py-1.5 text-xs font-bold transition text-center shadow-xs ${
                              active
                                ? 'border-emerald-700 bg-emerald-700 text-white'
                                : 'border-emerald-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50'
                            }`}
                          >
                            {kw} kW
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Manual Number Input Field with Stepper Buttons */}
                  <div className="mt-3 flex items-center gap-2">
                    {inputMode === 'capacity' ? (
                      <div className="relative flex flex-1 items-center">
                        <input
                          type="number"
                          min="0.5"
                          max="50"
                          step="0.5"
                          value={capacityKw}
                          onChange={(e) => handleCapacityChange(parseFloat(e.target.value) || 1)}
                          className="w-full rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123A2C] shadow-inner focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="3"
                          aria-label="Manual solar system size in kW"
                        />
                        <span className="pointer-events-none absolute right-4 text-sm font-bold text-slate-500">
                          kW Rooftop
                        </span>
                      </div>
                    ) : (
                      <div className="relative flex flex-1 items-center">
                        <span className="pointer-events-none absolute left-4 text-xl sm:text-2xl font-bold text-slate-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="500"
                          max="100000"
                          step="100"
                          value={monthlyBill}
                          onChange={(e) => handleBillChange(parseFloat(e.target.value) || 0)}
                          className="w-full rounded-xl border border-emerald-300 bg-white pl-9 pr-16 py-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123A2C] shadow-inner focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="3500"
                          aria-label="Manual monthly electricity bill in rupees"
                        />
                        <span className="pointer-events-none absolute right-4 text-xs font-semibold text-slate-500">
                          / month
                        </span>
                      </div>
                    )}

                    {/* Small Increment / Decrement Steppers */}
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => (inputMode === 'capacity' ? stepCapacity(1) : stepBill(500))}
                        aria-label="Increase value"
                        title={inputMode === 'capacity' ? 'Increase by 1 kW' : 'Increase by ₹500'}
                        className="flex h-6 w-8 items-center justify-center rounded-lg bg-white border border-emerald-300 text-emerald-900 shadow-xs hover:bg-emerald-50 active:scale-95 transition"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => (inputMode === 'capacity' ? stepCapacity(-1) : stepBill(-500))}
                        aria-label="Decrease value"
                        title={inputMode === 'capacity' ? 'Decrease by 1 kW' : 'Decrease by ₹500'}
                        className="flex h-6 w-8 items-center justify-center rounded-lg bg-white border border-emerald-300 text-emerald-900 shadow-xs hover:bg-emerald-50 active:scale-95 transition"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2.5 hidden sm:block text-xs text-slate-600">
                    {inputMode === 'capacity' ? (
                      <>
                        Generates approximately <strong className="text-slate-900">{dailyUnitsMin} to {dailyUnitsMax} units/day</strong> ({monthlyGenerationUnits.toLocaleString('en-IN')} units/month)
                      </>
                    ) : (
                      <>
                        Approximately <strong className="text-slate-900">{Math.round(monthlyBill / tariffPerUnit).toLocaleString('en-IN')} units</strong> consumed per month at ₹{tariffPerUnit}/unit
                      </>
                    )}
                  </p>
                </div>

                {/* Rooftop Area Specification Card */}
                <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <PanelsTopLeft className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Required Rooftop Area</p>
                      <p className="text-sm font-bold text-slate-900">
                        {roofAreaSqFt} sq. ft. shadow-free roof
                      </p>
                      <p className="text-[10px] text-slate-500 hidden sm:block">
                        Based on 8 × 10 ft (80 sq. ft.) per 1 kW
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-center">
                    <span className="block text-xs font-semibold text-emerald-800">Capacity</span>
                    <span className="text-base font-extrabold text-emerald-950">{capacityKw} kW</span>
                  </span>
                </div>

                {/* Mobile CTA to focus on estimated bill reduction & other KPIs */}
                <button
                  type="button"
                  onClick={scrollToResults}
                  className="mt-4 flex sm:hidden w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 px-4 text-sm font-bold text-white shadow-md shadow-emerald-950/15 hover:bg-emerald-800 active:scale-[0.99] transition"
                >
                  <TrendingDown className="h-4 w-4 text-emerald-200" />
                  <span>View Estimate Savings</span>
                  <ArrowDown className="h-4 w-4 text-emerald-200 animate-bounce" />
                </button>
              </div>
            </div>

            {/* Detailed Point-Wise Benchmark Standards Card for Left Column (Desktop & Tablet only) */}
            <div className="hidden sm:flex flex-1 flex-col justify-between rounded-3xl border border-white/80 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-6">
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#183D2B]">
                      Benchmark Specifications & Standards
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Official technical sizing & government scheme rules
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <Zap className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Energy Generation: </span>
                      <span className="text-slate-600">
                        1 kW rooftop plant produces <strong className="text-emerald-950 font-bold">5 to 6 units (kWh)/day</strong> (~165 units/month).
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <PanelsTopLeft className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Rooftop Requirement: </span>
                      <span className="text-slate-600">
                        Requires <strong className="text-emerald-950 font-bold">80 sq. ft. (8 × 10 ft)</strong> of shadow-free rooftop area per 1 kW.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <BadgeIndianRupee className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Tariff Basis: </span>
                      <span className="text-slate-600">
                        Calculated on base rate of <strong className="text-emerald-950 font-bold">₹{tariffPerUnit}/unit</strong> (adjustable using top buttons).
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <Building2 className="h-2.5 w-2.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Subsidy Scheme: </span>
                      <span className="text-slate-600">
                        Eligible for <strong className="text-emerald-950 font-bold">PM Surya Ghar (Central)</strong> + State Govt. DBT grants.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-[10px] text-slate-400">
                <Info className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
                <span>
                  Final system sizing and savings will be confirmed during the on-site technical inspection.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Financial Results & Detailed Subsidy Breakdown */}
          <div
            ref={resultsRef}
            id="calculator-results"
            className="flex h-full flex-col justify-between gap-4 lg:col-span-7 scroll-mt-6"
          >
            {/* Top Savings Feature Card */}
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
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-200">
                    <TrendingDown className="h-4 w-4" />
                    Estimated Bill Reduction
                  </div>

                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    Based on your inputs
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-emerald-100/70 font-semibold">
                    Potential Monthly Savings
                  </p>

                  <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
                      {formatINR(monthlySavings)}
                    </span>
                    <span className="text-sm font-semibold text-emerald-200">
                      / month
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-emerald-100/80">
                    Saves approximately{' '}
                    <strong className="text-white font-bold">
                      {formatINR(annualSavings)} every year
                    </strong>{' '}
                    on your electricity expenses.
                  </p>
                </div>

                {/* Sub metrics inside hero card */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-emerald-100/65">Daily Generation</p>
                    <p className="mt-1 text-lg font-bold sm:text-xl">
                      {dailyUnitsMin} – {dailyUnitsMax} units
                    </p>
                    <p className="mt-0.5 text-[10px] text-emerald-200/60 hidden sm:block">
                      ~{monthlyGenerationUnits.toLocaleString('en-IN')} units / month
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-emerald-100/65">Payback Period</p>
                    <p className="mt-1 text-lg font-bold text-amber-300 sm:text-xl">
                      ~{paybackYears} Years
                    </p>
                    <p className="mt-0.5 text-[10px] text-emerald-200/60 hidden sm:block">
                      Fast capital recovery
                    </p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-emerald-100/65">25-Year Lifetime Savings</p>
                    <p className="mt-1 text-lg font-bold text-emerald-200 sm:text-xl">
                      ₹{(lifetimeSavings / 100000).toFixed(2)} Lakh
                    </p>
                    <p className="mt-0.5 text-[10px] text-emerald-200/60 hidden sm:block">
                      25 years warranty output
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Investment & Subsidy Cards */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
              {/* Card 1: Gross Cost */}
              <div className="rounded-2xl border border-white bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <BadgeIndianRupee className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold text-slate-500">
                  System Cost (Gross)
                </p>
                <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {formatINR(grossCost)}
                </p>
                <p className="mt-1 text-[10px] text-slate-400 hidden sm:block">
                  Standard benchmark before subsidy
                </p>
              </div>

              {/* Card 2: Total Subsidy Highlight */}
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold text-emerald-900">
                  Total Govt. Subsidy
                </p>
                <p className="mt-1 text-xl font-extrabold tracking-tight text-emerald-900 sm:text-2xl">
                  {formatINR(subsidy.total)}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-emerald-800 hidden sm:block">
                  Central + State combined
                </p>
              </div>

              {/* Card 3: Detailed Central & State Subsidy Breakdown */}
              <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Building2 className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold text-slate-500">
                  Subsidy Breakup
                </p>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Central (PM Surya Ghar):</span>
                    <span className="font-bold text-slate-900">{formatINR(subsidy.central)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">State Govt.:</span>
                    <span className="font-bold text-slate-900">{formatINR(subsidy.state)}</span>
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-slate-400 hidden sm:block">
                  Direct Bank Transfer (DBT) scheme
                </p>
              </div>

              {/* Card 4: Net Cost */}
              <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-950 p-4 text-white shadow-lg shadow-emerald-950/20 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-emerald-200">
                  <Zap className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold text-emerald-200">
                  Effective Net Cost*
                </p>
                <p className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  {formatINR(netEstimatedCost)}
                </p>
                <p className="mt-1 text-[10px] text-emerald-200/80 hidden sm:block">
                  Your actual out-of-pocket cost
                </p>
              </div>
            </div>

            {/* Environmental Benefit Banner */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-[#123A2C] p-4 text-white shadow-lg shadow-slate-900/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">
                  Zero Emission Clean Energy
                </p>
                <p className="mt-0.5 text-xs text-emerald-100/80">
                  Reduces carbon footprint by{' '}
                  <span className="font-bold text-white">
                    {annualCO2Tons} tonnes of CO₂ per year
                  </span>
                  , equivalent to planting ~{(Number(annualCO2Tons) * 45).toFixed(0)} trees.
                </p>
              </div>
              <CheckCircle2 className="ml-auto hidden h-5 w-5 shrink-0 text-emerald-300 sm:block" />
            </div>

            {/* Minimal Benchmark for Phone View only */}
            <div className="mt-4 flex sm:hidden items-start gap-2.5 rounded-xl border border-slate-200 bg-white/70 p-3 text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <p className="text-[11px] leading-relaxed">
                <strong>Benchmark Specifications:</strong> 1 kW system produces 5 to 6 units/day; rooftop area estimated at 80 sq. ft. (8 × 10 ft) per kW; adjustable electricity tariff. Subsidies follow PM Surya Ghar Muft Bijli Yojana (Central) plus applicable State Government grants. Final system capacity and savings will be confirmed during the on-site technical inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
