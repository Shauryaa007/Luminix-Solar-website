'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight, Sun } from 'lucide-react';

type Card = {
  id: string;
  tag: string;
  title: string;
  text: string;
  chips: string[];
  img: string;
  featured?: boolean;
};

const AUTOPLAY_MS = 4500; // same speed as the hero slider

const CARDS: Card[] = [
  {
    id: 'bill',
    tag: 'Save money',
    title: 'Pay less for electricity',
    text: 'Your rooftop makes power from sunlight, so you buy less from the electricity company. Every 1 kW gives about 5 to 6 units a day.',
    chips: ['Lower monthly bill', '5–6 units a day per kW', 'Works every sunny day'],
    img: '/images/residential-solar-roof.jpg',
  },
  {
    id: 'subsidy',
    tag: 'Government help',
    title: 'Get subsidy on your plant',
    text: 'We guide you through the PM Surya Ghar subsidy and handle the paperwork for you.',
    chips: ['Up to ₹1,08,000 subsidy', 'We do the paperwork', 'Central + State support'],
    img: '/images/hero-solar.jpg',
    featured: true,
  },
  {
    id: 'backup',
    tag: 'Backup',
    title: 'Light during power cuts',
    text: 'Add a hybrid inverter and battery to keep lights, fans and other important things running.',
    chips: ['Hybrid inverter', 'Battery backup', 'Keeps key appliances on'],
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'property',
    tag: 'Homes & business',
    title: 'Solar for every property',
    text: 'Houses, apartments, shops, offices, factories and farms. Choose a plant that fits your roof and your bill.',
    chips: ['Homes & apartments', 'Shops & factories', 'Farms & water pumps'],
    img: '/images/commercial-solar.jpg',
  },
  {
    id: 'support',
    tag: 'We handle it',
    title: 'Easy from start to finish',
    text: 'We handle the site visit, approvals and installation. Quality panels come with company warranty.',
    chips: ['Free site visit', 'Approvals done by us', 'Warranty-backed panels'],
    img: '/images/installation-team.jpg',
  },
];

const STEPS = [
  { title: 'Free site visit', text: 'Our engineer checks your roof and your light bill.' },
  { title: 'We install it', text: 'Panels, approvals and subsidy paperwork are done by us.' },
  { title: 'Start saving', text: 'You make your own power and pay less every month.' },
];

function Dots({
  count,
  index,
  onSelect,
  tone,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  tone: 'light' | 'dark';
}) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={index === i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            index === i
              ? tone === 'light'
                ? 'w-7 bg-white'
                : 'w-7 bg-emerald-800'
              : tone === 'light'
              ? 'w-1.5 bg-white/50 hover:bg-white/70'
              : 'w-1.5 bg-emerald-800/25 hover:bg-emerald-800/45'
          }`}
        />
      ))}
    </div>
  );
}

function Tag({ card }: { card: Card }) {
  return (
    <span
      className={`w-fit rounded-full px-3.5 py-1.5 text-xs font-bold sm:text-sm ${
        card.featured ? 'bg-amber-500 text-slate-950' : 'bg-white/90 text-emerald-900'
      }`}
    >
      {card.tag}
    </span>
  );
}

export default function BenefitsSection() {
  const total = CARDS.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total]
  );

  // Respect "reduce motion" setting
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Auto change slide, restarts after every change (swipe, tab or dot)
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduceMotion, total]);

  // Swipe (touch) and drag (mouse) — used by the mobile carousel
  const startDrag = (x: number) => {
    dragStartX.current = x;
    setPaused(true);
  };
  const endDrag = (x: number) => {
    const start = dragStartX.current;
    dragStartX.current = null;
    setPaused(false);
    if (start === null) return;
    const dx = x - start;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
  };
  const cancelDrag = () => {
    dragStartX.current = null;
    setPaused(false);
  };

  const trackHandlers = {
    onTouchStart: (e: React.TouchEvent) => startDrag(e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => endDrag(e.changedTouches[0].clientX),
    onTouchCancel: cancelDrag,
    onMouseDown: (e: React.MouseEvent) => startDrag(e.clientX),
    onMouseUp: (e: React.MouseEvent) => endDrag(e.clientX),
    onMouseLeave: () => {
      if (dragStartX.current !== null) cancelDrag();
    },
  };

  return (
    <section
      id="benefits"
      className="overflow-hidden bg-[#F5F8F3] py-10 sm:py-14 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-3.5 sm:px-7 lg:px-12">
        {/* ================= Mobile & tablet (unchanged) ================= */}
        <div className="lg:hidden">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-900 sm:text-sm">
            <Sun className="h-4 w-4 shrink-0 text-emerald-700" />
            Benefits of solar
          </div>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-[#102E24] sm:text-5xl">
            Why choose
            <br />
            <span className="font-semibold text-emerald-700">solar panels?</span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
            Save money, get subsidy and stay powered. Swipe to see what solar
            gives you.
          </p>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Benefits of solar"
            className="mt-5"
          >
            <div
              className="touch-pan-y select-none overflow-hidden rounded-2xl shadow-xl shadow-emerald-950/15"
              {...trackHandlers}
            >
              <div
                className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {CARDS.map((card, i) => (
                  <div
                    key={card.id}
                    aria-hidden={i !== index}
                    className="relative isolate h-[30rem] w-full shrink-0 bg-[#102E24] text-white sm:h-[34rem]"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-20 bg-cover bg-center"
                      style={{ backgroundImage: `url('${card.img}')` }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,40,29,0.97) 0%, rgba(10,40,29,0.75) 40%, rgba(10,40,29,0.05) 75%)',
                      }}
                    />
                    <div className="flex h-full flex-col justify-between p-5 sm:p-8">
                      <Tag card={card} />
                      <div>
                        <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-white/80 sm:max-w-lg sm:text-base">
                          {card.text}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {card.chips.map((chip, ci) => (
                            <span
                              key={chip}
                              className={`rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
                                card.featured && ci === 0
                                  ? 'border-amber-400 bg-amber-500 font-bold text-slate-950'
                                  : 'border-white/25 bg-white/15 text-white'
                              }`}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Dots count={total} index={index} onSelect={goTo} tone="dark" />
            </div>
          </div>

          {/* How it works */}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/5">
            <h3 className="text-lg font-semibold text-slate-900">How it works</h3>
            <ol className="mt-4 space-y-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-5 text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href="#calculator"
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-[0.99]"
            >
              Calculate my savings
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
            <a
              href="#home"
              className="mt-1 flex min-h-11 w-full items-center justify-center text-sm font-semibold text-emerald-800"
            >
              Get free consultation
            </a>
          </div>

          <p className="mt-3 px-1 text-[11px] leading-4 text-slate-500">
            Savings and subsidy depend on your location, electricity connection
            and government rules.
          </p>
        </div>

        {/* ================= Desktop (redesigned) ================= */}
        <div
          className="mx-auto hidden max-w-6xl lg:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-12 items-center gap-10 xl:gap-14">
            {/* ---- Left: heading + benefit list ---- */}
            <div className="col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900">
                <Sun className="h-4 w-4 shrink-0 text-emerald-700" />
                Benefits of solar
              </div>

              <h2 className="mt-5 text-5xl font-medium leading-[1.08] tracking-[-0.04em] text-[#102E24] xl:text-6xl">
                Why choose
                <br />
                <span className="font-semibold text-emerald-700">solar panels?</span>
              </h2>

              <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">
                Save money, get subsidy and stay powered.
              </p>

              <div role="tablist" aria-label="Benefits of solar" className="mt-7 space-y-2">
                {CARDS.map((card, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => goTo(i)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 ${
                        active
                          ? 'border-emerald-800 bg-white shadow-lg shadow-emerald-950/10'
                          : 'border-transparent hover:bg-white/70'
                      }`}
                    >
                      <span className="min-w-0">
                        <span
                          className={`block text-xs font-medium ${
                            active ? 'text-emerald-700' : 'text-slate-500'
                          }`}
                        >
                          {card.tag}
                        </span>
                        <span
                          className={`mt-0.5 block text-base font-semibold ${
                            active ? 'text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          {card.title}
                        </span>
                      </span>
                      <ChevronRight
                        className={`h-5 w-5 shrink-0 transition ${
                          active ? 'text-emerald-800' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---- Right: big image card, fades between benefits ---- */}
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Benefits of solar"
              className="col-span-7"
            >
              <div className="relative isolate h-[34rem] overflow-hidden rounded-[28px] bg-[#102E24] shadow-2xl shadow-emerald-950/20 xl:h-[38rem]">
                {CARDS.map((card, i) => (
                  <div
                    key={card.id}
                    aria-hidden={i !== index}
                    className={`absolute inset-0 text-white transition-opacity duration-700 motion-reduce:transition-none ${
                      i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${card.img}')` }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,40,29,0.97) 0%, rgba(10,40,29,0.7) 40%, rgba(10,40,29,0.05) 75%)',
                      }}
                    />

                    <div className="absolute left-8 top-8">
                      <Tag card={card} />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10">
                      <h3 className="text-4xl font-semibold leading-[1.1] tracking-[-0.03em] xl:text-5xl">
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-lg leading-8 text-white/80">
                        {card.text}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {card.chips.map((chip, ci) => (
                          <li
                            key={chip}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium backdrop-blur-sm ${
                              card.featured && ci === 0
                                ? 'border-amber-400 bg-amber-500 font-bold text-slate-950'
                                : 'border-white/25 bg-white/15 text-white'
                            }`}
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---- How it works + CTA ---- */}
          <div className="mt-8 flex items-center gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-emerald-950/5 xl:p-8">
            <div className="grid flex-1 grid-cols-3 divide-x divide-slate-200">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className={`flex items-start gap-4 ${i === 0 ? 'pr-6' : 'px-6'}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 border-l border-slate-200 pl-8">
              <a
                href="#calculator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-[0.99]"
              >
                Calculate my savings
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
              <a
                href="#home"
                className="mt-1 block text-center text-sm font-semibold text-emerald-800 hover:underline"
              >
                Get free consultation
              </a>
            </div>
          </div>

          <p className="mt-4 px-1 text-xs text-slate-500">
            Savings and subsidy depend on your location, electricity connection
            and government rules.
          </p>
        </div>
      </div>
    </section>
  );
}