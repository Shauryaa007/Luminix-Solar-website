
'use client';

import React, { useEffect, useState } from 'react';
import {
  MessageCircle,
  Phone,
  ArrowUp,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      if (window.scrollY > 120) {
        setShowLabel(false);
      } else {
        setShowLabel(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappMessage =
    'Hello LuminixSolar, I am interested in rooftop solar solutions. Please share more details.';

  const whatsappUrl = `https://wa.me/${String(
    COMPANY_INFO.whatsapp
  ).replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
      aria-label="Quick contact actions"
    >
      {/* Back to top */}
      <div
        className={`transition-all duration-300 ${
          showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          tabIndex={showBackToTop ? 0 : -1}
          aria-label="Back to top"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-900 shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:scale-95"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      {/* Mobile call button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        aria-label="Call LuminixSolar"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-800 shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:scale-95 sm:hidden"
      >
        <Phone className="h-5 w-5" strokeWidth={2} />
      </a>

      {/* WhatsApp contact */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact LuminixSolar on WhatsApp"
        className="pointer-events-auto group flex min-h-14 items-center gap-3 rounded-full border border-white/15 bg-[#128C5B] py-2.5 pl-3 pr-4 text-white shadow-xl shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0E754B] hover:shadow-2xl hover:shadow-emerald-950/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 group-hover:bg-white/20">
          <MessageCircle
            className="h-5 w-5"
            strokeWidth={2}
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#128C5B] bg-[#B9F6CA]" />
        </span>

        <span
          className={`grid overflow-hidden transition-all duration-300 ${
            showLabel
              ? 'grid-cols-[1fr] opacity-100'
              : 'grid-cols-[0fr] opacity-0 sm:grid-cols-[1fr] sm:opacity-100'
          }`}
        >
          <span className="min-w-0 whitespace-nowrap">
            <span className="flex items-center gap-1 text-sm font-semibold leading-5">
              Chat with us
              <ArrowUpRight
                className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
            <span className="block text-[11px] font-medium leading-4 text-emerald-50/85">
              Let’s discuss solar for your home
            </span>
          </span>
        </span>
      </a>
    </div>
  );
}
