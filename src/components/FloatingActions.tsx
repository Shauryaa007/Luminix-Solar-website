
'use client';

import React, { useEffect, useState } from 'react';
import {
  Phone,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/solarData';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
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
        className={`transition-all duration-300 ${showBackToTop
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

      {/* WhatsApp contact: standalone logo that smoothly expands a strip on hover */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with LuminixSolar on WhatsApp"
        className="pointer-events-auto group flex h-12 items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-950/20 transition-all duration-500 ease-in-out hover:bg-[#20bd5a] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
      >
        <span className="flex max-w-0 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[180px] group-hover:opacity-100 group-hover:pl-4 group-hover:pr-1">
          <span className="flex items-center gap-1.5 text-sm font-semibold tracking-wide">
            Chat with us
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>

        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-current"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-[#128C5E] bg-[#B9F6CA]" />
        </span>
      </a>
    </div>
  );
}
