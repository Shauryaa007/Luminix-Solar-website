
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
    <section className="relative z-20 mx-auto -mt-4 sm:-mt-6 lg:-mt-8 max-w-7xl px-3.5 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-emerald-100/90 bg-slate-100/80 shadow-[0_12px_35px_-18px_rgba(16,60,42,0.18)]">

        {/* Responsive stats grid: 2 cols on mobile, 3 cols on tablet, 6 cols on desktop */}
        <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {COMPANY_STATS.map((stat, idx) => {
            const Icon = icons[idx] || SunMedium;

            return (
              <div
                key={stat.label}
                className="group flex flex-col justify-between bg-white p-3 sm:p-3.5 lg:p-3 xl:p-4 transition-colors duration-200 hover:bg-emerald-50/50"
              >
                <div>
                  <div className="flex items-center justify-center">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 transition-colors duration-200 group-hover:bg-emerald-800 group-hover:text-white">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-center xs:text-base sm:text-lg lg:text-base xl:text-lg font-bold tracking-tight text-slate-900 leading-none whitespace-nowrap">
                    {stat.value}
                  </p>

                  <p className="mt-1.5 text-[11px] text-center sm:text-xs font-semibold leading-tight text-slate-700">
                    {stat.label}
                  </p>
                </div>

                <p className="mt-2 text-[10px] text-center leading-tight text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
