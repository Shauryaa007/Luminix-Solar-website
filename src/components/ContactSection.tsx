
'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  CalendarDays,
  ArrowUpRight,
  Sun,
  Zap,
  Building2,
  Home,
  Factory,
  Sprout,
  ChevronDown,
  UserRound,
  IndianRupee,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

interface ContactSectionProps {
  initialRequirement?: string;
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10';

const labelClass =
  'mb-2 block text-sm font-semibold text-slate-700';

const propertyOptions = [
  {
    value: 'Residential Villa / Independent House',
    label: 'Independent house',
    icon: Home,
  },
  {
    value: 'Apartment Society / Gated Community',
    label: 'Apartment / Society',
    icon: Building2,
  },
  {
    value: 'Commercial Complex / Hospital / Hotel',
    label: 'Commercial property',
    icon: Building2,
  },
  {
    value: 'Industrial Factory / Warehouse',
    label: 'Industrial / Warehouse',
    icon: Factory,
  },
  {
    value: 'Agricultural Farmland / Solar Water Pump',
    label: 'Agricultural / Farm',
    icon: Sprout,
  },
];

export default function ContactSection({
  initialRequirement,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    pincode: '',
    monthlyBill: '₹3,000 - ₹6,000 / month',
    propertyType: 'Residential Villa / Independent House',
    requirement: initialRequirement || '',
    preferredDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [minDate, setMinDate] = useState<string>('');

  useEffect(() => {
    setMinDate(new Date().toLocaleDateString('en-CA'));
  }, []);

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    // Connect your enquiry API here before treating the request as submitted.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      email: '',
      city: '',
      pincode: '',
      monthlyBill: '₹3,000 - ₹6,000 / month',
      propertyType: 'Residential Villa / Independent House',
      requirement: initialRequirement || '',
      preferredDate: '',
    });
    setIsSuccess(false);
  };

  const contactItems = [
    {
      icon: Phone,
      label: 'Call our team',
      value: COMPANY_INFO.phoneDisplay,
      note: 'Speak with our solar team',
      href: `tel:${COMPANY_INFO.phone}`,
      external: false,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp support',
      value: 'Chat with us',
      note: 'Ask questions and request a quote',
      href: `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
        'Hello Luminix Solar, I would like to know more about rooftop solar.'
      )}`,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email enquiries',
      value: COMPANY_INFO.email,
      note: COMPANY_INFO.supportEmail,
      href: `mailto:${COMPANY_INFO.email}`,
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f5f8f5] py-16 text-slate-900 sm:py-20 lg:py-24"
    >
      {/* Subtle brand accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-green-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
            <Sun className="h-4 w-4" />
            Let&apos;s talk solar
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Your solar journey
            <span className="mt-1 block text-emerald-700">
              starts right here.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Tell us about your property and electricity usage. Our team can
            help you explore suitable solar solutions and arrange a site
            assessment.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Personalised guidance
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Tailored quotation
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              No-obligation enquiry
            </span>
          </div>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Contact information */}
          <aside className="space-y-5 lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-[#123d2b] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 rounded-full border border-white/10"
              />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Sun className="h-6 w-6 text-emerald-300" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                  LuminixSolar
                </p>

                <h3 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">
                  Good energy begins with a conversation.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50/75">
                  Reach out to discuss your rooftop, energy requirements,
                  solar products or project plans.
                </p>

                <div className="mt-7 space-y-5">
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="text-xs font-medium text-emerald-100/65">
                            {item.label}
                          </p>

                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={
                              item.external
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            className="mt-1 inline-flex max-w-full items-center gap-1.5 break-words text-sm font-semibold text-white transition hover:text-emerald-200 sm:text-base"
                          >
                            <span>{item.value}</span>
                            {item.external && (
                              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            )}
                          </a>

                          <p className="mt-1 break-words text-xs leading-5 text-emerald-100/60">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 border-t border-white/15 pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        Visit our office
                      </p>
                      <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                        {COMPANY_INFO.address}
                      </p>
                      <a
                        href={COMPANY_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-white"
                      >
                        Get directions
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Clock className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900">
                    Business hours
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {COMPANY_INFO.operatingHours.weekdays}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {COMPANY_INFO.operatingHours.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Company details */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                <h4 className="font-bold text-slate-900">
                  Company details
                </h4>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-slate-500">Registered name</dt>
                  <dd className="break-words font-semibold text-slate-800 sm:max-w-[60%] sm:text-right">
                    {COMPANY_INFO.name}
                  </dd>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-slate-500">GSTIN</dt>
                  <dd className="break-all font-mono text-xs font-semibold text-slate-800 sm:text-right">
                    {COMPANY_INFO.gstin}
                  </dd>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-slate-500">MNRE vendor ID</dt>
                  <dd className="break-words font-mono text-xs font-semibold text-emerald-800 sm:text-right">
                    {COMPANY_INFO.mnreVendorId}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* Consultation form */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.04]">
              <div className="border-b border-slate-100 px-6 py-6 sm:px-9 sm:py-8">
                <div className="flex items-start gap-4">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 sm:flex">
                    <CalendarDays className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      Solar consultation
                    </div>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      Let&apos;s plan your solar project.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Share a few details so we can understand your
                      requirements.
                    </p>
                  </div>
                </div>
              </div>

              {isSuccess ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="px-6 py-16 text-center sm:px-10"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>

                  <h4 className="mt-6 text-2xl font-bold text-slate-950">
                    Thank you, {formData.name}!
                  </h4>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                    Your details have been captured in this session. Once
                    the enquiry form is connected to your backend, your team
                    can receive and follow up on this request.
                  </p>

                  <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-emerald-50 p-4 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Your enquiry
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {formData.propertyType}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Monthly bill: {formData.monthlyBill}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Location: {formData.city}, {formData.pincode}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#123d2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-700/20"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-7 px-6 py-7 sm:px-9 sm:py-9"
                >
                  {/* Personal information */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <UserRound className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          Your details
                        </h4>
                        <p className="text-xs text-slate-500">
                          How can we get in touch?
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Full name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-name"
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

                      <div>
                        <label htmlFor="contact-mobile" className={labelClass}>
                          Mobile number <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex overflow-hidden rounded-xl border border-slate-200 transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
                          <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                            +91
                          </span>
                          <input
                            id="contact-mobile"
                            type="tel"
                            autoComplete="tel-national"
                            inputMode="numeric"
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
                        <label htmlFor="contact-email" className={labelClass}>
                          Email address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          maxLength={254}
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-city" className={labelClass}>
                          City <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-city"
                          type="text"
                          autoComplete="address-level2"
                          required
                          maxLength={100}
                          placeholder="Your city"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="contact-pincode" className={labelClass}>
                          Pincode <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-pincode"
                          type="text"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          required
                          pattern="[0-9]{6}"
                          maxLength={6}
                          placeholder="6-digit pincode"
                          value={formData.pincode}
                          onChange={(e) =>
                            updateField(
                              'pincode',
                              e.target.value.replace(/\D/g, '').slice(0, 6)
                            )
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Property information */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          Your solar requirements
                        </h4>
                        <p className="text-xs text-slate-500">
                          Help us understand your energy needs.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-bill" className={labelClass}>
                          Monthly electricity bill
                        </label>
                        <div className="relative">
                          <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <select
                            id="contact-bill"
                            value={formData.monthlyBill}
                            onChange={(e) =>
                              updateField('monthlyBill', e.target.value)
                            }
                            className={`${inputClass} appearance-none pl-9 pr-9`}
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
                        <label htmlFor="contact-property" className={labelClass}>
                          Property type
                        </label>
                        <div className="relative">
                          <select
                            id="contact-property"
                            value={formData.propertyType}
                            onChange={(e) =>
                              updateField('propertyType', e.target.value)
                            }
                            className={`${inputClass} appearance-none pr-9`}
                          >
                            {propertyOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="contact-date" className={labelClass}>
                          Preferred site visit date
                          <span className="ml-2 font-normal text-slate-400">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="contact-date"
                          type="date"
                          min={minDate || undefined}
                          value={formData.preferredDate}
                          onChange={(e) =>
                            updateField('preferredDate', e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="contact-requirement"
                          className={labelClass}
                        >
                          Tell us about your project
                          <span className="ml-2 font-normal text-slate-400">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          id="contact-requirement"
                          rows={4}
                          maxLength={1500}
                          placeholder="For example: a 5 kW rooftop system, battery backup, solar panels for a factory, or help choosing suitable products..."
                          value={formData.requirement}
                          onChange={(e) =>
                            updateField('requirement', e.target.value)
                          }
                          className={`${inputClass} resize-y leading-6`}
                        />
                        <p className="mt-1.5 text-right text-xs text-slate-400">
                          {formData.requirement.length}/1500
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="border-t border-slate-100 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#123d2b] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition duration-200 hover:bg-emerald-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-700/20 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Processing your details...
                        </>
                      ) : (
                        <>
                          <CalendarDays className="h-5 w-5" />
                          Request a Solar Consultation
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      Your information is provided to LuminixSolar so the team
                      can respond to your enquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
