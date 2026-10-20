
'use client';

import Image from 'next/image';
import {
  Phone,
  Mail,
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Sun,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { COMPANY_INFO } from '@/data/solarData';

interface NavbarProps {
  onOpenConsultation: (prefill?: string) => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'Savings', href: '#calculator' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({
  onOpenConsultation,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${String(
    COMPANY_INFO.whatsapp
  ).replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hello LuminixSolar, I would like to enquire about rooftop solar solutions.'
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleConsultation = () => {
    closeMobileMenu();
    onOpenConsultation();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Slim information bar */}
      <div
        className={`hidden overflow-hidden bg-[#123d2b] text-emerald-50 transition-all duration-300 md:block ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
          }`}
        aria-hidden={isScrolled}
      >
        <div className="mx-auto flex h-10 max-w-[1600px] items-center justify-between gap-4 px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-wide text-emerald-100/90">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              Residential and commercial solar solutions
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2 text-[11px] font-semibold transition hover:text-emerald-300"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-300" />
              {COMPANY_INFO.phoneDisplay}
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden items-center gap-2 text-[11px] transition hover:text-white xl:inline-flex"
            >
              <Mail className="h-3.5 w-3.5 text-emerald-300" />
              {COMPANY_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        aria-label="Main navigation"
        className={`relative border-b transition-all duration-300 ${isScrolled
          ? 'border-emerald-100/80 bg-white/95 shadow-sm backdrop-blur-xl'
          : 'border-slate-200/70 bg-white/95 backdrop-blur-lg'
          }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-10 ${isScrolled ? 'h-[68px]' : 'h-[76px]'
            }`}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={closeMobileMenu}
            aria-label="LuminixSolar home"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-4 sm:gap-3"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition duration-300 group-hover:border-emerald-300 group-hover:shadow-md sm:h-11 sm:w-11">
              <Image
                src={COMPANY_INFO.logo}
                alt=""
                fill
                sizes="44px"
                priority
                className="object-contain p-1"
              />
            </span>

            <span className="block">
              <span className="block whitespace-nowrap text-[19px] font-extrabold leading-none tracking-tight text-[#173d2d] sm:text-[22px]">
                Luminix<span className="text-emerald-600">Solar</span>
              </span>

            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[12px] font-semibold text-slate-600 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-800 2xl:px-3 2xl:text-[13px]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2.5 xl:flex">

            {/* <button
              type="button"
              onClick={handleConsultation}
              className="group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#174b35] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#103b29] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-700/20 active:scale-[0.98]"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button> */}
          </div>

          {/* Tablet and mobile actions */}
          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            {/* <button
              type="button"
              onClick={handleConsultation}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#174b35] px-3 text-xs font-bold text-white transition hover:bg-[#103b29] focus:outline-none focus:ring-4 focus:ring-emerald-700/20 sm:px-4 sm:text-sm"
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button> */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-600/10"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / tablet menu */}
        {mobileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
              className="fixed inset-0 top-[108px] z-[-1] cursor-default bg-slate-950/10 xl:hidden"
            />

            <div
              id="mobile-navigation"
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-100 bg-white shadow-xl shadow-slate-900/10 xl:hidden"
            >
              <div className="mx-auto max-w-3xl px-4 pb-5 pt-4 sm:px-6">
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Explore LuminixSolar
                </p>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="group flex min-h-11 items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <span className="flex items-center gap-3">
                        {/* <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-[10px] font-bold text-slate-400 transition group-hover:bg-white group-hover:text-emerald-700">
                          {String(index + 1).padStart(2, '0')}
                        </span> */}
                        {link.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                    </a>
                  ))}
                </div>

                <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleConsultation}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#174b35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#103b29] focus:outline-none focus:ring-4 focus:ring-emerald-700/20"
                  >
                    Book a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-600/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-700 transition hover:text-emerald-800"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="break-words">
                      {COMPANY_INFO.phoneDisplay}
                    </span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="inline-flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-700 transition hover:text-emerald-800"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="break-all">{COMPANY_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
