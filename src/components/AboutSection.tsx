'use client';

import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  Handshake,
  Landmark,
  Sun,
} from 'lucide-react';

import { ConsultationPrefillData } from '@/components/ConsultationForm';

interface AboutSectionProps {
  onOpenConsultation?: (prefill?: string | ConsultationPrefillData) => void;
}

export default function AboutSection({ onOpenConsultation }: AboutSectionProps = {}) {
  const primaryBtn =
    'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-[0.99] sm:w-auto';

  const secondaryBtn =
    'hidden min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:inline-flex';

  const rowIcon =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800';

  const actions = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {onOpenConsultation ? (
        <button
          type="button"
          onClick={() =>
            onOpenConsultation({
              scheme: 'PMSG',
              note: 'I would like to book a free site visit.',
            })
          }
          className={primaryBtn}
        >
          Book a free site visit
          <ArrowRight className="h-4 w-4 shrink-0" />
        </button>
      ) : (
        <a href="#home" className={primaryBtn}>
          Book a free site visit
          <ArrowRight className="h-4 w-4 shrink-0" />
        </a>
      )}

      <a href="#calculator" className={secondaryBtn}>
        Calculate my savings
      </a>
    </div>
  );

  return (
    <section id="about" className="overflow-hidden py-10 sm:py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-3.5 sm:px-7 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ---------- Text ---------- */}
          <div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-900 sm:px-4 sm:py-2 sm:text-sm">
              <Sun className="h-4 w-4 shrink-0 text-emerald-700" />
              About us
            </div>

            <h2 className="mt-4 text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-[#102E24] sm:text-5xl xl:text-6xl">
              A solar company
              <br />
              <span className="font-semibold text-emerald-700">you can verify</span>
            </h2>

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8">
              Luminix Solar, in association with A &amp; V Agrivoltaics, is a registered solar company based in Barabanki, UP, working since 2024. We install rooftop solar for homes, businesses, and commercial setups across Uttar Pradesh, offering complete subsidy assistance under both government schemes — <strong className="font-semibold text-slate-800">PM Surya Ghar: Muft Bijli Yojana (PMSG)</strong> for residential rooftops and the <strong className="font-semibold text-slate-800">PMFME Scheme</strong> (35% capital subsidy) for micro food processing enterprises.
            </p>

            {/* Desktop: buttons under the text */}
            <div className="mt-6 hidden lg:block">{actions}</div>
          </div>

          {/* ---------- Credentials ---------- */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-emerald-950/5 sm:p-6">
              <p className="text-sm font-semibold text-slate-900">Registered & Verified</p>

              <dl className="mt-3 divide-y divide-slate-200">
                <div className="flex items-center gap-3.5 py-3">
                  <span className={rowIcon}>
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">Registered entity &amp; base</dt>
                    <dd className="text-sm font-semibold text-slate-900 sm:text-base">
                      Luminix Solar Pvt. Ltd. (Barabanki, UP)
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 py-3">
                  <span className={rowIcon}>
                    <Handshake className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">In association with</dt>
                    <dd className="text-sm font-semibold text-emerald-950 sm:text-base">
                      A &amp; V Agrivoltaics
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 py-3">
                  <span className={rowIcon}>
                    <Landmark className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">Supported government schemes</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-900">
                        PM Surya Ghar (PMSG)
                      </span>
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-900">
                        PMFME Scheme (35% Subsidy)
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 py-3">
                  <span className={rowIcon}>
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">GSTIN</dt>
                    <dd className="break-all text-sm font-semibold tracking-wide text-slate-900 sm:text-base">
                      09CCVPV0642N1ZM
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pt-3">
                  <span className={rowIcon}>
                    <BadgeCheck className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">MNRE vendor ID</dt>
                    <dd className="break-all text-sm font-semibold tracking-wide text-slate-900 sm:text-base">
                      MNRE/RTS/2023/8842
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Mobile & tablet: buttons under the card */}
            <div className="mt-5 lg:hidden">{actions}</div>
          </div>
        </div>
      </div>
    </section>
  );
}