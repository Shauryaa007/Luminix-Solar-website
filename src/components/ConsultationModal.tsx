
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Phone,
  Zap,
  MapPin,
  UserRound,
  ChevronDown,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillNote?: string;
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10';

const labelClass = 'mb-2 block text-xs font-bold text-slate-700';

const initialFormData = {
  name: '',
  mobile: '',
  email: '',
  city: '',
  monthlyBill: '₹3,000 - ₹6,000 / month',
  propertyType: 'Residential Villa / House',
  requirement: '',
};

export default function ConsultationModal({
  isOpen,
  onClose,
  prefillNote,
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    requirement: prefillNote || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((previous) => ({
        ...previous,
        requirement: prefillNote || previous.requirement,
      }));
    }
  }, [isOpen, prefillNote]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    // Replace this simulation with your enquiry API or CRM integration.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleReset = () => {
    setFormData({
      ...initialFormData,
      requirement: prefillNote || '',
    });
    setIsSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
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
        className="relative my-auto flex max-h-[calc(100dvh-24px)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-slate-950/25 sm:max-h-[calc(100dvh-48px)] sm:flex-row"
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
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6 lg:px-9">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 sm:text-xs">
                <CalendarCheck className="h-3.5 w-3.5" />
                Free consultation
              </div>

              <h3
                id="consultation-title"
                className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl"
              >
                {isSubmitted ? 'Request received' : 'Let’s talk solar.'}
              </h3>

              <p className="mt-1.5 max-w-md text-xs leading-5 text-slate-500 sm:text-sm">
                {isSubmitted
                  ? 'Here is a summary of the details you provided.'
                  : 'Share your details and tell us what you have in mind.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              aria-label="Close consultation"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {isSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="px-5 py-10 text-center sm:px-8 sm:py-14"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <h4 className="mt-5 text-2xl font-bold text-slate-950">
                  Thank you, {formData.name}!
                </h4>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                  Your enquiry details have been captured in this session.
                  Once the form is connected to your backend, your team can
                  receive and follow up on the request.
                </p>

                <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
                    Enquiry summary
                  </p>

                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    {formData.mobile}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {formData.city}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {formData.propertyType}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Electricity bill: {formData.monthlyBill}
                  </p>
                </div>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    New enquiry
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174b35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#103b29]"
                  >
                    Done
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 px-5 py-6 sm:px-7 lg:px-9"
              >
                {/* Contact details */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Contact details
                      </h4>
                      <p className="text-xs text-slate-500">
                        Fields marked * are required
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="consult-name" className={labelClass}>
                        Full name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="consult-name"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={100}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="consult-mobile"
                          className={labelClass}
                        >
                          Mobile number <span className="text-rose-500">*</span>
                        </label>

                        <div className="flex overflow-hidden rounded-xl border border-slate-200 transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
                          <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-500">
                            +91
                          </span>
                          <input
                            id="consult-mobile"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            required
                            pattern="[6-9][0-9]{9}"
                            maxLength={10}
                            title="Enter a valid 10-digit Indian mobile number"
                            placeholder="9876543210"
                            value={formData.mobile}
                            onChange={(e) =>
                              updateField(
                                'mobile',
                                e.target.value.replace(/\D/g, '').slice(0, 10)
                              )
                            }
                            className="min-w-0 flex-1 px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="consult-city" className={labelClass}>
                          City / Pincode <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="consult-city"
                          type="text"
                          autoComplete="postal-code"
                          required
                          maxLength={100}
                          placeholder="City, 6-digit pincode"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="consult-email" className={labelClass}>
                        Email address
                        <span className="ml-1 font-normal text-slate-400">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="consult-email"
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Project details */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Project details
                      </h4>
                      <p className="text-xs text-slate-500">
                        Help us understand your energy requirements.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="consult-bill" className={labelClass}>
                        Monthly electricity bill
                      </label>
                      <div className="relative">
                        <select
                          id="consult-bill"
                          value={formData.monthlyBill}
                          onChange={(e) =>
                            updateField('monthlyBill', e.target.value)
                          }
                          className={`${inputClass} appearance-none pr-9`}
                        >
                          <option value="Under ₹2,000 / month">
                            Under ₹2,000
                          </option>
                          <option value="₹3,000 - ₹6,000 / month">
                            ₹3,000 – ₹6,000
                          </option>
                          <option value="₹2,000 - ₹5,000 / month">
                            ₹2,000 – ₹5,000
                          </option>
                          <option value="₹5,000 - ₹10,000 / month">
                            ₹5,000 – ₹10,000
                          </option>
                          <option value="₹10,000 - ₹25,000 / month">
                            ₹10,000 – ₹25,000
                          </option>
                          <option value="Above ₹25,000 / month">
                            Above ₹25,000
                          </option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="consult-property" className={labelClass}>
                        Property type
                      </label>
                      <div className="relative">
                        <select
                          id="consult-property"
                          value={formData.propertyType}
                          onChange={(e) =>
                            updateField('propertyType', e.target.value)
                          }
                          className={`${inputClass} appearance-none pr-9`}
                        >
                          <option value="Residential Villa / House">
                            Independent house
                          </option>
                          <option value="Apartment / Housing Society">
                            Apartment / Housing society
                          </option>
                          <option value="Commercial Complex / Hospital">
                            Commercial property
                          </option>
                          <option value="Industrial Factory / Warehouse">
                            Factory / Warehouse
                          </option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {formData.requirement && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <CheckCircle2 className="h-4 w-4" />
                      Selected product / requirement
                    </p>
                    <p className="mt-2 break-words text-sm leading-6 text-slate-700">
                      {formData.requirement}
                    </p>
                  </div>
                )}

                {/* Submit area */}
                <div className="border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#174b35] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-[#103b29] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-700/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-4 w-4" />
                        Request a Consultation
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
                    Your details are used to respond to your enquiry.
                  </p>

                  <p className="mt-3 text-center text-xs text-slate-500">
                    Prefer to call?{' '}
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="font-bold text-emerald-800 underline-offset-4 hover:underline"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
