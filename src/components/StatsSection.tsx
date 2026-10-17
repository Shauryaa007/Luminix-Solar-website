
'use client';

import React from 'react';
import {
  Users,
  SunMedium,
  ClipboardCheck,
  Calendar,
  TrendingUp,
  Leaf,
} from 'lucide-react';
import { COMPANY_STATS } from '@/data/solarData';

const icons = [
  Users,
  SunMedium,
  ClipboardCheck,
  Calendar,
  TrendingUp,
  Leaf,
];

export default function StatsSection() {
  return (
    <section className="relative z-20 mx-auto -mt-6 max-w-7xl px-4 sm:-mt-8 sm:px-6 lg:px-8 bg-white">
      <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_12px_35px_-18px_rgba(16,60,42,0.22)]">

        {/* Compact stats grid */}
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6">
          {COMPANY_STATS.map((stat, idx) => {
            const Icon = icons[idx] || SunMedium;

            return (
              <div
                key={stat.label}
                className="group flex min-w-0 items-center gap-3 px-3 py-4 transition-colors duration-200 hover:bg-emerald-50/60 sm:px-4 sm:py-5 lg:justify-center lg:px-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition-colors duration-200 group-hover:bg-emerald-800 group-hover:text-white">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-4 text-slate-600">
                    {stat.label}
                  </p>

                  <p className="mt-0.5 line-clamp-1 text-[10px] leading-4 text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
