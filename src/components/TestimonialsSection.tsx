'use client';

import React from 'react';
import {
  Star,
  Quote,
  MapPin,
  CalendarDays,
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/solarData';

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#f8faf8] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[45%] h-96 w-96 rounded-full bg-teal-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section introduction */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 shadow-sm">
            <Star className="h-4 w-4 fill-emerald-700 text-emerald-700" />
            Customer stories & reviews
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Real experiences.
            <span className="block text-emerald-700">
              A brighter energy future.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover customer feedback and real experiences from homeowners and
            businesses who made the switch to clean solar energy.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {TESTIMONIALS_DATA.map((testimonial) => {
            const initials = testimonial.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <article
                key={testimonial.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_24px_55px_-30px_rgba(6,78,59,0.25)] sm:p-8"
              >
                {/* Decorative quote mark */}
                <div className="pointer-events-none absolute right-6 top-5 text-emerald-50 transition group-hover:text-emerald-100 sm:right-8 sm:top-6">
                  <Quote className="h-16 w-16 fill-current" />
                </div>

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${testimonial.rating} out of 5 stars`}
                    >
                      {Array.from(
                        { length: testimonial.rating },
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-emerald-600 text-emerald-600"
                          />
                        )
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800 sm:text-xs">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Installation feedback
                    </span>
                  </div>

                  <blockquote className="mt-7">
                    <p className="text-base font-medium leading-7 text-slate-800 sm:text-lg sm:leading-8">
                      “{testimonial.feedback}”
                    </p>
                  </blockquote>

                  {/* Bill comparison */}
                  <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">
                        Before solar
                      </p>
                      <p className="mt-1 truncate text-lg font-bold text-slate-500 line-through decoration-slate-400 sm:text-xl">
                        {testimonial.billBefore}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-700 shadow-sm">
                      <TrendingDown className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-800 sm:text-xs">
                        After solar
                      </p>
                      <p className="mt-1 truncate text-xl font-bold tracking-tight text-emerald-800 sm:text-2xl">
                        {testimonial.billAfter}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer footer */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-800">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-950">
                        {testimonial.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {testimonial.role}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3 shrink-0 text-emerald-700" />
                        <span className="truncate">
                          {testimonial.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="flex items-center justify-end gap-1 text-xs text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {testimonial.date}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-800">
                      {testimonial.systemInstalled.split('with')[0].trim()}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
