'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  ShieldCheck,
  Sun,
  Zap,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';
import ConsultationForm, {
  ConsultationPrefillData,
} from '@/components/ConsultationForm';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillNote?: string | ConsultationPrefillData;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  prefillNote,
}: ConsultationModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 270);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center overflow-y-auto bg-slate-950/60 p-0 sm:p-6 backdrop-blur-sm ${
        isClosing ? 'opacity-0 transition-opacity duration-[280ms] ease-in' : 'modal-backdrop-animate'
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        className={`relative mt-auto sm:my-auto flex max-h-[92dvh] sm:max-h-[calc(100dvh-48px)] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] sm:rounded-3xl border border-white/60 bg-white shadow-2xl shadow-slate-950/25 sm:flex-row ${
          isClosing ? 'modal-sheet-closing' : 'modal-sheet-animate'
        }`}
      >
        {/* Left brand panel */}
        <aside className="relative hidden w-[36%] shrink-0 flex-col overflow-hidden bg-[#123d2b] p-7 text-white sm:flex lg:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-6 h-44 w-44 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-2xl"
          />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg">
              <Image
                src={COMPANY_INFO.logo}
                alt="LuminixSolar logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              Let&apos;s go solar
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight lg:text-3xl">
              A brighter roof.
              <span className="mt-1 block text-emerald-300">
                A smarter future.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-emerald-50/70">
              Tell us about your property. We&apos;ll help you explore a solar
              solution suited to your energy requirements.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon: Zap,
                  title: 'Personalised guidance',
                  text: 'Explore suitable system options.',
                },
                {
                  icon: MapPin,
                  title: 'Site-specific planning',
                  text: 'Discuss your rooftop and location.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Clear next steps',
                  text: 'Understand your options before deciding.',
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/10">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-emerald-50/60">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-auto border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-100/70">
              <Sun className="h-4 w-4 text-emerald-300" />
              LuminixSolar
            </div>
            <p className="mt-2 text-[11px] leading-5 text-emerald-100/45">
              Clean energy. Brighter future.
            </p>
          </div>
        </aside>

        {/* Right form panel */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-7 sm:py-5 lg:px-9">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 sm:text-xs">
                <CalendarCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Free consultation
              </div>

              <h3
                id="consultation-title"
                className="mt-1 text-lg font-bold tracking-tight text-slate-950 sm:text-2xl"
              >
                Let’s talk solar.
              </h3>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close consultation"
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3.5 pb-16 sm:px-7 sm:py-5 sm:pb-8">
            <ConsultationForm
              variant="full"
              source="mobile_consultation_popup"
              prefillNote={prefillNote}
              onClose={handleClose}
              submitButtonText="Request a Consultation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
