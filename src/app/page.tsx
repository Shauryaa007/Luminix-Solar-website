'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProductsSection from '@/components/ProductsSection';
import SolarCalculator from '@/components/SolarCalculator';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CompletedProjectsSection from '@/components/CompletedProjectsSection';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState<string>('');
  const [hasInteractedWithHero, setHasInteractedWithHero] = useState(false);

  const hasInteractedWithHeroRef = React.useRef(false);
  const hasDismissedRef = React.useRef(false);
  const triggeredRef = React.useRef(false);

  // Sync ref with state
  React.useEffect(() => {
    hasInteractedWithHeroRef.current = hasInteractedWithHero;
  }, [hasInteractedWithHero]);

  // Smart Mobile Popup: Triggers on mobile after 3.5s or on scroll (>150px)
  // ONLY IF user hasn't started filling the hero form, and hasn't closed it in this view.
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Clear any previous session storage lock from prior testing
    try {
      sessionStorage.removeItem('luminix_consultation_dismissed');
    } catch {
      // ignore
    }

    const triggerPopup = () => {
      if (triggeredRef.current) return;
      if (hasDismissedRef.current) return;
      if (hasInteractedWithHeroRef.current) return;
      if (window.innerWidth >= 768) return;

      triggeredRef.current = true;
      setIsModalOpen(true);
    };

    // 1. Time-based trigger: ~3.5 seconds
    const timer = window.setTimeout(() => {
      triggerPopup();
    }, 3500);

    // 2. Scroll-based trigger: fires as soon as user scrolls down on mobile
    const handleScroll = () => {
      const currentScroll =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (currentScroll > 150) {
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenConsultation = (prefill?: string) => {
    setModalPrefill(prefill || '');
    setIsModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsModalOpen(false);
    setModalPrefill('');
    hasDismissedRef.current = true;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 relative selection:bg-amber-400 selection:text-slate-950 font-sans">

      {/* Sticky Top Navbar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main One-Page Content */}
      <main className="flex-1">

        {/* Section 1: Hero Banner & Quick Form */}
        <HeroSection
          onOpenConsultation={handleOpenConsultation}
          onFormInteraction={() => setHasInteractedWithHero(true)}
        />

        <StatsSection />
        
        <ProductsSection onOpenConsultation={handleOpenConsultation} />
        {/* Section 6: Company Highlights & Key Numbers Counter */}
        

        {/* Section: Completed Installations Gallery */}
        <CompletedProjectsSection />

        {/* Section 4: Benefits & Interactive Solar Savings ROI Calculator */}
        <SolarCalculator onApplyForCapacity={handleOpenConsultation} />

        {/* Section 3: Customer Testimonials */}
        {/* <TestimonialsSection /> */}

        {/* Section 4 Part 2: Benefits Breakdown & Comparison */}
        <BenefitsSection />

        {/* Section 5: About Company, GSTIN, Authorised Brands & 5-Step Process */}
        <AboutSection />



        {/* Section 7: FAQs & Catalogue Downloads */}
        {/* <FaqSection /> */}

        {/* Section 1/5/7: Full Consultation & Contact Details */}
        <ContactSection />

        <FaqSection/>

        <Footer />
        {/* Section Coming Soon - temporary */}
        {/* <h2 className="mx-4 my-8 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-center text-2xl font-bold text-slate-800 shadow-sm md:mx-auto md:text-3xl">
          Coming Soon....
        </h2> */}

      </main>

      {/* Footer */}

      {/* Global Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseConsultation}
        prefillNote={modalPrefill}
      />

      {/* Floating Action Buttons (WhatsApp, Phone, Scroll To Top) */}
      <FloatingActions />

    </div>
  );
}
