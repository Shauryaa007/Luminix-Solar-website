'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Sun,
  Zap,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

interface HeroSectionProps {
  onOpenConsultation: (prefill?: string) => void;
}

const HERO_BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85',
  '/images/residential-solar-roof.jpg',
  '/images/commercial-solar.jpg',
  '/images/hero-solar.jpg',
  '/images/installation-team.jpg',
];

export default function HeroSection({
  onOpenConsultation,
}: HeroSectionProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    monthlyBill: '₹2,000 - ₹5,000',
    propertyType: 'Residential Independent House / Villa',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically transition to the next image one by one every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const inputClass =
    'w-full max-w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 box-border';

  const labelClass =
    'mb-1.5 block text-xs font-semibold text-slate-600';

  return (
    <section
      id="home"
      className="overflow-hidden bg-white pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-3.5 sm:px-7 lg:px-12">

        {/* Main hero visual */}
        <div className="relative isolate overflow-hidden rounded-2xl bg-[#102E24] sm:rounded-[28px]">
          {/* Multiple Background Images transitioning automatically one by one */}
          {HERO_BACKGROUND_IMAGES.map((imgSrc, idx) => {
            const isActive = currentBgIndex === idx;
            return (
              <div
                key={imgSrc}
                aria-hidden={!isActive}
                className={`absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                style={{
                  backgroundImage: `url('${imgSrc}')`,
                }}
              />
            );
          })}

          {/* Previous original overlay gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,40,29,0.97) 0%, rgba(10,40,29,0.88) 43%, rgba(10,40,29,0.28) 100%)',
            }}
          />

          <div className="grid w-full min-w-0 grid-cols-1 items-center gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-20 xl:px-16">

            {/* Hero copy */}
            <div className="w-full min-w-0 lg:col-span-7">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                <Sun className="h-4 w-4 shrink-0 text-emerald-300" />
                <span className="leading-snug break-words">
                  {COMPANY_INFO.tagline}
                </span>
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-white sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                The Future of
                <br />
                <span className="font-semibold text-emerald-300">
                  Green Energy
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">
                Power your home with solar. Save more with every sunny day.
              </p>

              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href="#calculator"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#153D2D] transition hover:bg-emerald-50 active:scale-[0.99] sm:w-auto"
                >
                  <span>Calculate Your Savings</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={() => onOpenConsultation()}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.99] sm:w-auto"
                >
                  Talk to an Expert
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3.5 border-t border-white/20 pt-5 sm:mt-10 sm:gap-x-7 sm:gap-y-4 sm:pt-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Leaf className="h-4 w-4 text-emerald-300" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Clean energy
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">
                      A sustainable choice
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Zap className="h-4 w-4 text-emerald-300" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Lower grid reliance
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">
                      Generate your own power
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation card */}
            <div className="w-full min-w-0 lg:col-span-5">
              <div className="relative w-full max-w-full rounded-2xl border border-white/60 bg-white p-4 shadow-2xl shadow-black/20 sm:p-6 lg:p-8">
                {/* Free consultation pill label */}
                <div className="absolute top-0 right-4 sm:right-8 -translate-y-1/2 z-10 whitespace-nowrap rounded-full bg-amber-500 px-3.5 py-1 text-xs font-bold text-slate-950 shadow-md sm:px-4 sm:text-sm">
                  Free consultation
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-800">
                      Let&apos;s get started
                    </p>
                    <h2 className="mt-1.5 text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:mt-2 sm:text-2xl lg:text-3xl">
                      Your solar plan starts here.
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Sun className="h-5 w-5" />
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />

                    <h3 className="mt-4 text-xl font-semibold text-slate-900">
                      Thank you, {formData.name}!
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      This demo has simulated your submission.
                      Backend yet to be connected to receive real inquiries.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-5 text-sm font-semibold text-emerald-800 hover:underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-4"
                  >
                    <div>
                      <label htmlFor="hero-name" className={labelClass}>
                        Full name *
                      </label>
                      <input
                        id="hero-name"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          updateField('name', e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-phone" className={labelClass}>
                        Mobile number *
                      </label>
                      <div className="flex w-full min-w-0 overflow-hidden rounded-lg border border-slate-200 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10">
                        <span className="flex shrink-0 items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                          +91
                        </span>
                        <input
                          id="hero-phone"
                          type="tel"
                          required
                          autoComplete="tel-national"
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) =>
                            updateField(
                              'mobile',
                              e.target.value.replace(/\D/g, '').slice(0, 10)
                            )
                          }
                          className="min-w-0 flex-1 bg-white px-3 py-2.5 sm:py-3 text-base sm:text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hero-city" className={labelClass}>
                        City / Pincode
                      </label>
                      <input
                        id="hero-city"
                        placeholder="Where is your property?"
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={(e) =>
                          updateField('city', e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-bill" className={labelClass}>
                        Monthly electricity bill
                      </label>
                      <select
                        id="hero-bill"
                        value={formData.monthlyBill}
                        onChange={(e) =>
                          updateField('monthlyBill', e.target.value)
                        }
                        className={`${inputClass} truncate`}
                      >
                        <option value="Under ₹2,000">Under ₹2,000</option>
                        <option value="₹2,000 - ₹5,000">
                          ₹2,000 – ₹5,000
                        </option>
                        <option value="₹5,000 - ₹10,000">
                          ₹5,000 – ₹10,000
                        </option>
                        <option value="₹10,000 - ₹25,000">
                          ₹10,000 – ₹25,000
                        </option>
                        <option value="Above ₹25,000">Above ₹25,000</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="hero-property" className={labelClass}>
                        Property type
                      </label>
                      <select
                        id="hero-property"
                        value={formData.propertyType}
                        onChange={(e) =>
                          updateField('propertyType', e.target.value)
                        }
                        className={`${inputClass} truncate`}
                      >
                        <option value="Residential Independent House / Villa">
                          Independent house / Villa
                        </option>
                        <option value="Gated Society / Apartment Association">
                          Apartment / Housing society
                        </option>
                        <option value="Commercial Office / Retail / Hospital">
                          Commercial property
                        </option>
                        <option value="Industrial Factory / Warehouse">
                          Factory / Warehouse
                        </option>
                        <option value="Agricultural Farmland / Solar Water Pump">
                          Agricultural property
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex min-h-12 w-full max-w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-[0.99] disabled:opacity-60"
                    >
                      <span className="truncate">
                        {isSubmitting
                          ? 'Submitting...'
                          : 'Get My Solar Consultation'}
                      </span>
                      {!isSubmitting && (
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      )}
                    </button>

                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Minimal slide indicator dots */}
          <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 sm:bottom-4 sm:left-10">
            {HERO_BACKGROUND_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentBgIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${currentBgIndex === i
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Minimal brand strip */}
        <div className="flex flex-col gap-4 border-b border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
        </div>
      </div>
    </section>
  );
}
