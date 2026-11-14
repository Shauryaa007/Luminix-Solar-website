'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Leaf,
  Sun,
  Zap,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';
import ConsultationForm, {
  ConsultationPrefillData,
} from '@/components/ConsultationForm';

interface HeroSectionProps {
  onOpenConsultation: (prefill?: string | ConsultationPrefillData) => void;
  onFormInteraction?: () => void;
  prefill?: string | ConsultationPrefillData;
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
  onFormInteraction,
  prefill,
}: HeroSectionProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Automatically transition to the next image one by one every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

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
                Leading rooftop solar solutions across Lucknow & Barabanki. Save up to 90% on electricity bills with PM Surya Ghar subsidy.
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

                <div className="flex items-start justify-between gap-3 mb-5">
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

                <ConsultationForm
                  variant="compact"
                  source="hero_section_quick_form"
                  prefillNote={prefill}
                  onInteraction={onFormInteraction}
                />
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

      </div>
    </section>
  );
}
