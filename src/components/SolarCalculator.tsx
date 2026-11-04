'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeIndianRupee,
  Calculator,
  FileText,
  Info,
  Leaf,
  Minus,
  PanelsTopLeft,
  Plus,
  Sun,
  TrendingDown,
  X,
} from 'lucide-react';

interface SolarCalculatorProps {
  onApplyForCapacity?: (capacityText: string) => void;
}

const formatINR = (amount: number) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`;

// Benchmarks
const AVG_DAILY_UNITS_MIN = 5; // units/day/kW
const AVG_DAILY_UNITS_MAX = 6; // units/day/kW
const AVG_MONTHLY_UNITS_PER_KW = 5.5 * 30; // ~165 units/month/kW
const ROOF_AREA_PER_KW = 80; // 8 x 10 sq ft per kW

// Pricing model:
// 1kW: 70k | 2kW: 125k | 3kW: 180k | 3–5kW: +55k/kW | >5kW: +50k/kW
const calculateGrossCost = (kw: number): number => {
  if (kw <= 0) return 0;
  if (kw <= 1) return Math.round(70000 * Math.max(0.5, kw));
  if (kw <= 2) return Math.round(70000 + (kw - 1) * (125000 - 70000));
  if (kw <= 3) return Math.round(125000 + (kw - 2) * (180000 - 125000));
  if (kw <= 5) return Math.round(180000 + (kw - 3) * 55000);
  return Math.round(290000 + (kw - 5) * 50000);
};

// Subsidy model:
// <2kW: 30k central + 15k state | 2–3kW: 60k + 30k | >=3kW: 78k + 30k
const calculateSubsidy = (kw: number) => {
  if (kw < 2) return { central: 30000, state: 15000, total: 45000 };
  if (kw < 3) return { central: 60000, state: 30000, total: 90000 };
  return { central: 78000, state: 30000, total: 108000 };
};

const POPULAR_CAPACITIES = [3, 5, 10];

const SolarCalculator = ({ onApplyForCapacity }: SolarCalculatorProps) => {
  const [tariffPerUnit, setTariffPerUnit] = useState<number>(7);
  const [capacityKw, setCapacityKw] = useState<number>(3);
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [inputMode, setInputMode] = useState<'capacity' | 'bill'>('capacity');

  // Text drafts so people can clear / retype the fields freely on mobile
  const [capacityText, setCapacityText] = useState<string>('3');
  const [billText, setBillText] = useState<string>('3500');
  const [showTariff, setShowTariff] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // Close details sheet with Escape and stop the page behind it from scrolling
  useEffect(() => {
    if (!showDetails) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowDetails(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showDetails]);

  // ---------- handlers ----------
  const applyCapacity = (kw: number, tariff = tariffPerUnit, skipText = false) => {
    const clamped = Math.max(0.5, Math.min(50, kw));
    const approxBill = Math.round(clamped * AVG_MONTHLY_UNITS_PER_KW * tariff);
    setCapacityKw(clamped);
    setMonthlyBill(approxBill);
    setBillText(String(approxBill));
    if (!skipText) setCapacityText(String(clamped));
    setInputMode('capacity');
  };

  const applyBill = (bill: number, tariff = tariffPerUnit, skipText = false) => {
    const clampedBill = Math.max(100, bill);
    const units = clampedBill / Math.max(1, tariff);
    const kw = Math.max(
      1,
      Math.min(50, Math.round((units / AVG_MONTHLY_UNITS_PER_KW) * 10) / 10)
    );
    setMonthlyBill(clampedBill);
    setCapacityKw(kw);
    setCapacityText(String(kw));
    if (!skipText) setBillText(String(clampedBill));
    setInputMode('bill');
  };

  const changeTariff = (next: number) => {
    const t = Math.min(25, Math.max(3, Math.round(next * 10) / 10));
    setTariffPerUnit(t);
    // keep the active input as the source of truth
    if (inputMode === 'bill') applyBill(monthlyBill, t, true);
    else applyCapacity(capacityKw, t, true);
  };

  const stepCapacity = (delta: number) =>
    applyCapacity(Math.round((capacityKw + delta) * 10) / 10);
  const stepBill = (delta: number) =>
    applyBill(Math.max(500, monthlyBill + delta));

  // ---------- calculations ----------
  const roofAreaSqFt = Math.round(capacityKw * ROOF_AREA_PER_KW);
  const dailyUnitsMin = (capacityKw * AVG_DAILY_UNITS_MIN).toFixed(1).replace(/\.0$/, '');
  const dailyUnitsMax = (capacityKw * AVG_DAILY_UNITS_MAX).toFixed(1).replace(/\.0$/, '');
  const monthlyGenerationUnits = Math.round(capacityKw * AVG_MONTHLY_UNITS_PER_KW);

  const grossCost = calculateGrossCost(capacityKw);
  const subsidy = calculateSubsidy(capacityKw);
  const netEstimatedCost = Math.max(0, grossCost - subsidy.total);

  const potentialMonthlySavings = Math.round(monthlyGenerationUnits * tariffPerUnit);
  const monthlySavings =
    inputMode === 'bill'
      ? Math.min(monthlyBill, potentialMonthlySavings)
      : potentialMonthlySavings;
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings = Math.round(annualSavings * 25);
  const paybackYears = (netEstimatedCost / Math.max(annualSavings, 1)).toFixed(1);
  const annualCO2Tons = (monthlyGenerationUnits * 12 * 0.00082).toFixed(1);

  const handleApply = () => {
    if (onApplyForCapacity) {
      onApplyForCapacity(`${capacityKw} kW rooftop solar`);
    } else {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ---------- shared styles (same tokens as the hero form) ----------
  const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-600';
  const stepBtn =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-900 active:scale-95';

  // ---------- desktop layout (separate design from mobile) ----------
  const subsidyPct = Math.min(100, Math.round((subsidy.total / Math.max(grossCost, 1)) * 100));

  const desktopView = (
    <div className="hidden lg:block">
      {/* Header row */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-900 sm:px-4 sm:py-2 sm:text-sm">
            <Sun className="h-4 w-4 shrink-0 text-emerald-700" />
            PM Surya Ghar Muft Bijli Yojana
          </div>
          <h2 className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-[#102E24] sm:mt-5 sm:text-5xl xl:text-6xl">
            How much
            <br />
            <span className="font-semibold text-emerald-700">can you save?</span>
          </h2>
        </div>

        <div className="grid w-full grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50 lg:w-auto lg:shrink-0">
          {[
            { big: '5–6 units', small: 'made daily by 1 kW' },
            { big: '80 sq. ft.', small: 'roof space for 1 kW' },
            { big: '₹1,08,000', small: 'maximum subsidy' },
          ].map((f) => (
            <div key={f.big} className="px-3 py-3 sm:px-6 sm:py-4">
              <p className="text-sm font-semibold text-[#102E24] sm:text-lg">{f.big}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-slate-500 sm:text-xs">{f.small}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main card: controls on the left, results on the right */}
      <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl lg:mt-10 lg:grid-cols-12 lg:rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-emerald-950/10">
        {/* ---- Controls ---- */}
        <div className="p-5 sm:p-8 lg:col-span-5 xl:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Tell us about your home
              </h3>
              <p className="text-sm text-slate-500">Numbers on the right change as you type.</p>
            </div>
          </div>

          <div role="tablist" className="mt-7 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 text-sm font-semibold">
            {(
              [
                { id: 'capacity', label: 'By solar size', Icon: PanelsTopLeft },
                { id: 'bill', label: 'By my bill', Icon: BadgeIndianRupee },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={inputMode === id}
                onClick={() => setInputMode(id)}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-3 transition ${
                  inputMode === id
                    ? 'bg-white font-bold text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4 text-emerald-700" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {inputMode === 'capacity' ? (
              <div>
                <label htmlFor="calc-kw-d" className={labelClass}>
                  Solar plant size (kW)
                </label>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label="Decrease size by 1 kW" onClick={() => stepCapacity(-1)} className={stepBtn}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="relative min-w-0 flex-1">
                    <input
                      id="calc-kw-d"
                      type="text"
                      inputMode="decimal"
                      value={capacityText}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9.]/g, '');
                        setCapacityText(raw);
                        const n = parseFloat(raw);
                        if (!isNaN(n) && n > 0) applyCapacity(n, tariffPerUnit, true);
                      }}
                      onBlur={() => setCapacityText(String(capacityKw))}
                      className="box-border w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-14 text-2xl sm:py-3 sm:text-3xl font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">kW</span>
                  </div>
                  <button type="button" aria-label="Increase size by 1 kW" onClick={() => stepCapacity(1)} className={stepBtn}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.5}
                  value={Math.min(capacityKw, 20)}
                  onChange={(e) => applyCapacity(parseFloat(e.target.value))}
                  aria-label="Solar size slider"
                  className="mt-5 h-2 w-full cursor-pointer accent-emerald-800"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>0.5 kW</span>
                  <span>20 kW</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-slate-500">Popular:</span>
                  {POPULAR_CAPACITIES.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      aria-pressed={capacityKw === kw}
                      onClick={() => applyCapacity(kw)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                        capacityKw === kw
                          ? 'border-emerald-800 bg-emerald-800 text-white'
                          : 'border-slate-200 text-slate-700 hover:border-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {kw} kW
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="calc-bill-d" className={labelClass}>
                  Your monthly light bill
                </label>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label="Decrease bill by ₹500" onClick={() => stepBill(-500)} className={stepBtn}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="relative min-w-0 flex-1">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-400">₹</span>
                    <input
                      id="calc-bill-d"
                      type="text"
                      inputMode="numeric"
                      value={billText}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 7);
                        setBillText(raw);
                        const n = parseInt(raw, 10);
                        if (!isNaN(n) && n > 0) applyBill(n, tariffPerUnit, true);
                      }}
                      onBlur={() => setBillText(String(monthlyBill))}
                      className="box-border w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-2xl sm:py-3 sm:text-3xl font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                    />
                  </div>
                  <button type="button" aria-label="Increase bill by ₹500" onClick={() => stepBill(500)} className={stepBtn}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="range"
                  min={500}
                  max={30000}
                  step={100}
                  value={Math.min(Math.max(monthlyBill, 500), 30000)}
                  onChange={(e) => applyBill(parseInt(e.target.value, 10))}
                  aria-label="Monthly bill slider"
                  className="mt-5 h-2 w-full cursor-pointer accent-emerald-800"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>₹500</span>
                  <span>₹30,000</span>
                </div>

                <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                  You use about{' '}
                  <strong>{Math.round(monthlyBill / tariffPerUnit).toLocaleString('en-IN')} units</strong>{' '}
                  every month. We suggest a <strong>{capacityKw} kW</strong> solar plant.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Price per unit</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <button type="button" aria-label="Decrease tariff by ₹0.5" onClick={() => changeTariff(tariffPerUnit - 0.5)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-emerald-50 active:scale-95">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-semibold text-slate-900">₹{tariffPerUnit}</span>
                <button type="button" aria-label="Increase tariff by ₹0.5" onClick={() => changeTariff(tariffPerUnit + 0.5)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-emerald-50 active:scale-95">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Roof space needed</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {roofAreaSqFt.toLocaleString('en-IN')} sq. ft.
              </p>
              <p className="text-xs text-slate-500">shade-free roof</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-emerald-50 px-4 py-3 lg:hidden">
            <div className="min-w-0">
              <p className="text-xs text-emerald-900/70">You can save</p>
              <p className="text-lg font-semibold text-emerald-900">
                {formatINR(monthlySavings)}
                <span className="ml-1 text-xs font-normal text-emerald-900/70">/ month</span>
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-emerald-900/70">You pay</p>
              <p className="text-lg font-semibold text-emerald-900">{formatINR(netEstimatedCost)}</p>
            </div>
          </div>
        </div>

        {/* ---- Results ---- */}
        <div className="relative isolate flex flex-col justify-between overflow-hidden bg-[#102E24] p-5 text-white sm:p-8 lg:col-span-7 xl:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85')",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(135deg, rgba(10,40,29,0.97) 0%, rgba(10,40,29,0.9) 60%, rgba(10,40,29,0.8) 100%)',
            }}
          />

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <TrendingDown className="h-4 w-4" />
              You can save every month
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
              <span className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl xl:text-8xl">
                {formatINR(monthlySavings)}
              </span>
              <span className="text-lg text-white/60">/ month</span>
            </div>
            <p className="mt-3 text-base text-white/75">
              That is about <span className="font-semibold text-white">{formatINR(annualSavings)}</span> saved every year on your light bill.
            </p>
          </div>

          {/* Three key numbers */}
          <div className="mt-6 grid grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:mt-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="py-4 sm:py-5 sm:pr-4">
              <p className="text-xs text-white/60">Power made daily</p>
              <p className="mt-1 text-xl font-semibold">{dailyUnitsMin}–{dailyUnitsMax} units</p>
              <p className="mt-0.5 text-xs text-white/50">~{monthlyGenerationUnits.toLocaleString('en-IN')} / month</p>
            </div>
            <div className="py-4 sm:px-6 sm:py-5">
              <p className="text-xs text-white/60">Cost recovered in</p>
              <p className="mt-1 text-xl font-semibold text-amber-400">~{paybackYears} years</p>
              <p className="mt-0.5 text-xs text-white/50">Counting subsidy</p>
            </div>
            <div className="py-4 sm:py-5 sm:pl-6">
              <p className="text-xs text-white/60">Savings in 25 years</p>
              <p className="mt-1 text-xl font-semibold text-emerald-300">₹{(lifetimeSavings / 100000).toFixed(2)} Lakh</p>
              <p className="mt-0.5 text-xs text-white/50">Panels last 25+ years</p>
            </div>
          </div>

          {/* Cost split bar */}
          <div className="mt-6 sm:mt-8">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-white/70">Total cost of your solar plant</p>
              <p className="text-xl font-semibold">{formatINR(grossCost)}</p>
            </div>
            <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-white/10">
              <div className="bg-emerald-400 transition-all duration-500" style={{ width: `${subsidyPct}%` }} />
              <div className="bg-amber-500 transition-all duration-500" style={{ width: `${100 - subsidyPct}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Government gives you
                </div>
                <p className="mt-1 text-xl font-semibold text-emerald-300 sm:text-2xl">{formatINR(subsidy.total)}</p>
                <p className="text-xs text-white/50">
                  Central {formatINR(subsidy.central)} + State {formatINR(subsidy.state)}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  You pay*
                </div>
                <p className="mt-1 text-xl font-semibold text-amber-400 sm:text-2xl">{formatINR(netEstimatedCost)}</p>
                <p className="text-xs text-white/50">After subsidy</p>
              </div>
            </div>
          </div>

          {/* Footer: nature note + CTA */}
          <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Leaf className="h-4 w-4 text-emerald-300" />
              </span>
              <p className="text-xs leading-5 text-white/70">
                Saves <span className="font-semibold text-white">{annualCO2Tons} tonnes of CO₂</span> every year,
                <br />
                same as planting ~{(Number(annualCO2Tons) * 45).toFixed(0)} trees.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#153D2D] transition hover:bg-emerald-50 active:scale-[0.99] sm:w-auto"
            >
              Get free quote for {capacityKw} kW
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 px-1 text-xs text-slate-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p>*These are approximate numbers. Our engineer will visit your home and confirm the final size, cost and savings.</p>
      </div>
    </div>
  );

  // ---------- plain text details for the mobile sheet ----------
  const detailSections: { title: string; rows: [string, string][] }[] = [
    {
      title: 'Your solar plant',
      rows: [
        ['Plant size', `${capacityKw} kW`],
        ['Power made daily', `${dailyUnitsMin} to ${dailyUnitsMax} units`],
        ['Power made monthly', `about ${monthlyGenerationUnits.toLocaleString('en-IN')} units`],
        ['Roof space needed', `${roofAreaSqFt.toLocaleString('en-IN')} sq. ft. (shade-free)`],
        ['Price per unit used', `₹${tariffPerUnit}`],
      ],
    },
    {
      title: 'Your savings',
      rows: [
        ['Every month', formatINR(monthlySavings)],
        ['Every year', formatINR(annualSavings)],
        ['In 25 years', `₹${(lifetimeSavings / 100000).toFixed(2)} Lakh`],
      ],
    },
    {
      title: 'Cost and subsidy',
      rows: [
        ['Total cost', formatINR(grossCost)],
        ['Central subsidy (PM Surya Ghar)', formatINR(subsidy.central)],
        ['State subsidy', formatINR(subsidy.state)],
        ['Total subsidy', formatINR(subsidy.total)],
        ['You pay after subsidy', formatINR(netEstimatedCost)],
        ['Money back in', `about ${paybackYears} years`],
      ],
    },
    {
      title: 'Good for nature',
      rows: [
        ['CO₂ saved every year', `${annualCO2Tons} tonnes`],
        ['Same as planting', `about ${(Number(annualCO2Tons) * 45).toFixed(0)} trees`],
      ],
    },
  ];

  // ---------- mobile layout (short and simple) ----------
  const mobileView = (
    <div className="lg:hidden">
      <h2 className="text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-[#102E24] sm:text-5xl">
        How much
        <br />
        <span className="font-semibold text-emerald-700">can you save?</span>
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Check your savings and the government subsidy in seconds.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-emerald-950/10">
        {/* Tabs */}
        <div role="tablist" className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 text-sm font-semibold">
          {(
            [
              { id: 'capacity', label: 'By solar size' },
              { id: 'bill', label: 'By my bill' },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={inputMode === id}
              onClick={() => setInputMode(id)}
              className={`min-h-11 rounded-md px-2 transition ${
                inputMode === id
                  ? 'bg-white font-bold text-emerald-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-5">
          {inputMode === 'capacity' ? (
            <>
              <label htmlFor="calc-kw-m" className={labelClass}>
                Solar plant size (kW)
              </label>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Decrease size by 1 kW" onClick={() => stepCapacity(-1)} className={stepBtn}>
                  <Minus className="h-4 w-4" />
                </button>
                <div className="relative min-w-0 flex-1">
                  <input
                    id="calc-kw-m"
                    type="text"
                    inputMode="decimal"
                    value={capacityText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setCapacityText(raw);
                      const n = parseFloat(raw);
                      if (!isNaN(n) && n > 0) applyCapacity(n, tariffPerUnit, true);
                    }}
                    onBlur={() => setCapacityText(String(capacityKw))}
                    className="box-border w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-12 text-2xl font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">kW</span>
                </div>
                <button type="button" aria-label="Increase size by 1 kW" onClick={() => stepCapacity(1)} className={stepBtn}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {POPULAR_CAPACITIES.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    aria-pressed={capacityKw === kw}
                    onClick={() => applyCapacity(kw)}
                    className={`min-h-11 rounded-lg border text-sm font-semibold transition active:scale-[0.98] ${
                      capacityKw === kw
                        ? 'border-emerald-800 bg-emerald-800 text-white'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <label htmlFor="calc-bill-m" className={labelClass}>
                Your monthly light bill
              </label>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Decrease bill by ₹500" onClick={() => stepBill(-500)} className={stepBtn}>
                  <Minus className="h-4 w-4" />
                </button>
                <div className="relative min-w-0 flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-400">₹</span>
                  <input
                    id="calc-bill-m"
                    type="text"
                    inputMode="numeric"
                    value={billText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 7);
                      setBillText(raw);
                      const n = parseInt(raw, 10);
                      if (!isNaN(n) && n > 0) applyBill(n, tariffPerUnit, true);
                    }}
                    onBlur={() => setBillText(String(monthlyBill))}
                    className="box-border w-full min-w-0 rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-2xl font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                  />
                </div>
                <button type="button" aria-label="Increase bill by ₹500" onClick={() => stepBill(500)} className={stepBtn}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          <p className="mt-3 text-xs leading-5 text-slate-500">
            {inputMode === 'bill' && (
              <>
                We suggest a <strong className="text-slate-800">{capacityKw} kW</strong> solar plant.{' '}
              </>
            )}
            Needs about {roofAreaSqFt.toLocaleString('en-IN')} sq. ft. of shade-free roof.
          </p>

          <button
            type="button"
            onClick={() => setShowTariff((v) => !v)}
            aria-expanded={showTariff}
            className="mt-1 min-h-9 text-xs font-semibold text-emerald-800 underline-offset-2 hover:underline"
          >
            Price per unit: ₹{tariffPerUnit} · {showTariff ? 'Done' : 'Change'}
          </button>

          {showTariff && (
            <div className="mt-1 flex items-center gap-2">
              <button type="button" aria-label="Decrease tariff by ₹0.5" onClick={() => changeTariff(tariffPerUnit - 0.5)} className={stepBtn}>
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex min-h-11 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-base font-semibold text-slate-900">
                ₹{tariffPerUnit} per unit
              </div>
              <button type="button" aria-label="Increase tariff by ₹0.5" onClick={() => changeTariff(tariffPerUnit + 0.5)} className={stepBtn}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Result */}
        <div className="mt-5 rounded-xl bg-[#102E24] p-5 text-white">
          <p className="text-xs text-white/70">You can save every month</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-emerald-300">
            {formatINR(monthlySavings)}
            <span className="ml-1.5 text-sm font-normal text-white/60">/ month</span>
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/15 pt-4">
            <div>
              <p className="text-xs text-white/60">You pay*</p>
              <p className="mt-0.5 text-lg font-semibold text-amber-400">{formatINR(netEstimatedCost)}</p>
              <p className="text-[11px] leading-4 text-white/50">after {formatINR(subsidy.total)} subsidy</p>
            </div>
            <div>
              <p className="text-xs text-white/60">Money back in</p>
              <p className="mt-0.5 text-lg font-semibold">~{paybackYears} years</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99]"
        >
          <FileText className="h-4 w-4 shrink-0" />
          See full details
        </button>

        <button
          type="button"
          onClick={handleApply}
          className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-[0.99]"
        >
          <span className="truncate">Get free quote for {capacityKw} kW</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </button>
      </div>

      <p className="mt-3 px-1 text-[11px] leading-4 text-slate-500">
        *Approximate numbers. Our engineer will confirm the final size, cost and savings.
      </p>

      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          role="dialog"
          aria-modal="true"
          aria-label="Full details of your solar estimate"
        >
          <button
            type="button"
            aria-label="Close details"
            onClick={() => setShowDetails(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative max-h-[88vh] w-full overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-t-2xl bg-white pb-[max(1.5rem,env(safe-area-inset-bottom))] text-slate-900 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
              <h3 className="text-lg font-semibold">Your solar estimate</h3>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setShowDetails(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 pt-4">
              {detailSections.map((section) => (
                <section key={section.title} className="mb-5">
                  <h4 className="text-sm font-bold text-slate-900">{section.title}</h4>
                  <dl className="mt-1 divide-y divide-slate-200 border-y border-slate-200">
                    {section.rows.map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-4 py-2.5 text-sm">
                        <dt className="text-slate-600">{label}</dt>
                        <dd className="shrink-0 text-right font-medium text-slate-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}

              <p className="text-xs leading-5 text-slate-500">
                These are approximate numbers. Our engineer will visit your home and confirm the final size,
                cost and savings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="calculator"
      className="overflow-hidden bg-white py-8 sm:py-12 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-3.5 sm:px-7 lg:px-12">
        {mobileView}
        {desktopView}
      </div>
    </section>
  );
};

export default SolarCalculator;