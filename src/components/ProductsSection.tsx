'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Battery,
  Unplug,
  Zap,
} from 'lucide-react';

interface ProductsSectionProps {
  onOpenConsultation?: (prefill?: string) => void;
}

// costValue / subsidyValue are numbers used only to draw the subsidy bar.
// For 1 kW the upper end of the cost range (₹70,000) is used, which matches
// the ₹25,000 contribution shown.
const PRICING = [
  {
    size: '1 kW',
    price: '₹25,000',
    cost: '₹65,000–70,000',
    subsidy: '₹45,000',
    costValue: 70000,
    subsidyValue: 45000,
  },
  {
    size: '2 kW',
    price: '₹35,000',
    cost: '₹1,25,000',
    subsidy: '₹90,000',
    costValue: 125000,
    subsidyValue: 90000,
    popular: true,
  },
  {
    size: '3 kW',
    price: '₹72,000',
    cost: '₹1,80,000',
    subsidy: '₹1,08,000',
    costValue: 180000,
    subsidyValue: 108000,
  },
];

const PRODUCTS = [
  {
    id: 'on-grid',
    name: 'On-Grid',
    line: 'Reduce electricity bills with grid-connected solar.',
    image: '/images/residential-solar-roof.jpg',
    icon: Zap,
  },
  {
    id: 'off-grid',
    name: 'Off-Grid',
    line: 'Independent solar power with battery storage.',
    image: '/images/commercial-solar.jpg',
    icon: Unplug,
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    line: 'Grid connectivity with battery backup.',
    image: '/images/hero-solar.jpg',
    icon: Battery,
  },
];

const POPULAR_INDEX = Math.max(
  0,
  PRICING.findIndex((p) => p.popular)
);

/**
 * Mobile carousel behaviour shared by both card rows:
 * one card at a time, auto-slides right to left, loops seamlessly
 * (the row must end with a duplicate of its first card), pauses on touch.
 * Below `breakpoint` px it runs; above it the row is a normal grid.
 */
function useAutoSlide(
  count: number,
  breakpoint: number,
  intervalMs: number,
  startIndex = 0
) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(startIndex);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const settleTimerRef = useRef<number | undefined>(undefined);

  // Open on the starting card (mobile only)
  useEffect(() => {
    const el = ref.current;
    if (!el || startIndex === 0 || window.innerWidth >= breakpoint) return;
    el.scrollTo({ left: startIndex * el.clientWidth });
  }, [startIndex, breakpoint]);

  // Auto-slide
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      const el = ref.current;
      if (!el || pausedRef.current || window.innerWidth >= breakpoint) return;
      const width = el.clientWidth;
      if (width === 0) return;
      const index = Math.round(el.scrollLeft / width);
      el.scrollTo({ left: (index + 1) * width, behavior: 'smooth' });
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(resumeTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
    };
  }, [breakpoint, intervalMs]);

  const onScroll = () => {
    const el = ref.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index % count);

    // Once settled on the duplicate first card, jump back to the real one.
    // They look identical, so the loop is seamless.
    window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(() => {
      const node = ref.current;
      if (!node || node.clientWidth === 0) return;
      if (Math.round(node.scrollLeft / node.clientWidth) >= count) {
        node.scrollTo({ left: 0, behavior: 'auto' });
      }
    }, 150);
  };

  const pause = () => {
    window.clearTimeout(resumeTimerRef.current);
    pausedRef.current = true;
  };

  const resume = () => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 2500);
  };

  return {
    ref,
    active,
    bind: {
      onScroll,
      onTouchStart: pause,
      onTouchEnd: resume,
      onTouchCancel: resume,
    },
  };
}

export default function ProductsSection({
  onOpenConsultation,
}: ProductsSectionProps) {
  // Pricing row: grid from 768px up
  const pricing = useAutoSlide(PRICING.length, 768, 3500, POPULAR_INDEX);
  // Product row: grid from 640px up
  const products = useAutoSlide(PRODUCTS.length, 640, 4000);

  const handleConsultation = (prefill?: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(prefill);
    } else {
      document.getElementById('home')?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const renderPricingCard = (
    item: (typeof PRICING)[number],
    isClone = false
  ) => {
    const featured = !!item.popular;
    const percent = Math.round((item.subsidyValue / item.costValue) * 100);

    return (
      <div
        key={isClone ? `${item.size}-clone` : item.size}
        aria-hidden={isClone || undefined}
        className={`w-full shrink-0 snap-center snap-always px-1 py-2 md:w-auto md:p-0 ${
          isClone ? 'md:hidden' : ''
        }`}
      >
        <div
          className={`flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
            featured
              ? 'bg-[#174b35] text-white shadow-[0_24px_60px_rgba(23,75,53,0.30)] md:-my-5 md:py-10'
              : 'border border-slate-200 bg-white text-[#102E24] shadow-[0_4px_24px_rgba(16,46,36,0.05)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={`text-xs ${
                  featured ? 'text-emerald-100/70' : 'text-slate-500'
                }`}
              >
                Rooftop solar system
              </p>
              <h3 className="mt-1 text-3xl font-semibold tracking-tight">
                {item.size}
              </h3>
            </div>

            {featured && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-50">
                Most popular
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-6">
            <p
              className={`text-xs ${
                featured ? 'text-emerald-100/70' : 'text-slate-500'
              }`}
            >
              Your estimated contribution after subsidy
            </p>
            <p
              className={`mt-1 text-5xl font-bold tracking-tight ${
                featured ? 'text-white' : 'text-[#174b35]'
              }`}
            >
              {item.price}
              <span
                className={`ml-1.5 text-xs font-normal ${
                  featured ? 'text-emerald-100/60' : 'text-slate-400'
                }`}
              >
                onwards*
              </span>
            </p>
          </div>

          {/* Subsidy bar: shows how much of the cost is covered */}
          <div className="mt-6">
            <div
              className={`h-2 w-full overflow-hidden rounded-full ${
                featured ? 'bg-white/20' : 'bg-slate-100'
              }`}
              role="img"
              aria-label={`Subsidy covers about ${percent}% of the system cost`}
            >
              <div
                className={`h-full rounded-full ${
                  featured ? 'bg-emerald-300' : 'bg-emerald-600'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <p
              className={`mt-2 text-xs font-medium ${
                featured ? 'text-emerald-100' : 'text-emerald-700'
              }`}
            >
              Subsidy covers about {percent}% of the cost
            </p>
          </div>

          {/* Details */}
          <dl
            className={`mt-6 space-y-3 border-t pt-5 text-sm ${
              featured ? 'border-white/15' : 'border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <dt
                className={featured ? 'text-emerald-100/70' : 'text-slate-500'}
              >
                Estimated system cost
              </dt>
              <dd className="font-semibold">{item.cost}</dd>
            </div>

            <div className="flex items-center justify-between gap-3 pb-2 md:pb-4">
              <dt
                className={featured ? 'text-emerald-100/70' : 'text-slate-500'}
              >
                Subsidy shown
              </dt>
              <dd
                className={`font-semibold ${
                  featured ? 'text-emerald-200' : 'text-emerald-700'
                }`}
              >
                {item.subsidy}
              </dd>
            </div>
          </dl>

          {/* Button */}
          <button
            type="button"
            tabIndex={isClone ? -1 : undefined}
            onClick={() =>
              handleConsultation(
                `I am interested in a ${item.size} solar system. Please share pricing and subsidy details.`
              )
            }
            className={`mt-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99] ${
              featured
                ? 'mt-7 bg-white text-[#174b35] hover:bg-emerald-50'
                : 'mt-7 border border-[#174b35] text-[#174b35] hover:bg-emerald-50'
            }`}
          >
            Get a free quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderProductCard = (
    product: (typeof PRODUCTS)[number],
    isClone = false
  ) => {
    const Icon = product.icon;

    return (
      <div
        key={isClone ? `${product.id}-clone` : product.id}
        aria-hidden={isClone || undefined}
        className={`w-full shrink-0 snap-center snap-always px-1 py-1 sm:w-auto sm:p-0 ${
          isClone ? 'sm:hidden' : ''
        }`}
      >
        <article className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-emerald-200 hover:shadow-lg">
          <div className="relative h-44 overflow-hidden sm:h-48">
            <Image
              src={product.image}
              alt={`${product.name} solar system`}
              fill
              sizes="(max-width: 639px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-800">
              <Icon className="h-4 w-4" />
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <h4 className="text-base font-bold text-[#102E24] sm:text-lg">
              {product.name}
            </h4>

            <p className="mt-1 min-h-[40px] text-xs leading-5 text-slate-500 sm:text-sm">
              {product.line}
            </p>

            <button
              type="button"
              tabIndex={isClone ? -1 : undefined}
              onClick={() =>
                handleConsultation(
                  `I am interested in a ${product.name} solar system. Please share pricing details.`
                )
              }
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 transition hover:text-emerald-600 sm:text-sm"
            >
              Enquire now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </div>
    );
  };

  return (
    <section id="products" className="bg-white py-9 sm:py-14 lg:py-0 lg:pb-12">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-7 lg:px-12">
        <div className="mx-auto max-w-6xl">

          {/* PRICING */}
          <div>

            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                Solar made affordable
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#102E24] sm:text-5xl">
                Bring solar home.
                <span className="block text-emerald-700">
                  Starting at ₹25,000*
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-slate-500 sm:text-sm">
                Affordable rooftop solar solutions with applicable
                government subsidy support.
              </p>
            </div>

            {/* Cards: auto-sliding one at a time on mobile, three columns on desktop */}
            <div className="mt-6 md:mt-14">
              <div
                ref={pricing.ref}
                {...pricing.bind}
                className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:items-stretch md:gap-6 md:overflow-visible lg:gap-8"
              >
                {PRICING.map((item) => renderPricingCard(item))}
                {/* Duplicate of the first card so the loop always slides right to left (mobile only) */}
                {renderPricingCard(PRICING[0], true)}
              </div>

              {/* Position dots (mobile only, not clickable) */}
              <div
                className="mt-3 flex items-center justify-center gap-2 md:hidden"
                aria-hidden="true"
              >
                {PRICING.map((item, index) => (
                  <span
                    key={item.size}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      pricing.active === index
                        ? 'w-6 bg-emerald-700'
                        : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            
          </div>

          {/* SOLAR PRODUCTS */}
          <div className="mt-10 sm:mt-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 sm:text-xs">
                Our solutions
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#102E24] sm:text-3xl">
                Choose your solar system
              </h3>
            </div>

            {/* Cards: auto-sliding one at a time on mobile, three columns from 640px up */}
            <div className="mt-4">
              <div
                ref={products.ref}
                {...products.bind}
                className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible"
              >
                {PRODUCTS.map((product) => renderProductCard(product))}
                {/* Duplicate of the first card for the seamless loop (mobile only) */}
                {renderProductCard(PRODUCTS[0], true)}
              </div>

              {/* Position dots (mobile only, not clickable) */}
              <div
                className="mt-3 flex items-center justify-center gap-2 sm:hidden"
                aria-hidden="true"
              >
                {PRODUCTS.map((product, index) => (
                  <span
                    key={product.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      products.active === index
                        ? 'w-6 bg-emerald-700'
                        : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}