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

  const handleOpenConsultation = (prefill?: string) => {
    setModalPrefill(prefill || '');
    setIsModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsModalOpen(false);
    setModalPrefill('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 relative selection:bg-amber-400 selection:text-slate-950 font-sans">

      {/* Sticky Top Navbar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main One-Page Content */}
      <main className="flex-1">

        {/* Section 1: Hero Banner & Quick Form */}
        <HeroSection onOpenConsultation={handleOpenConsultation} />

        {/* Section 6: Company Highlights & Key Numbers Counter */}
        <StatsSection />

        {/* Section: Completed Installations Gallery */}
        <CompletedProjectsSection />

        {/* Section Coming Soon - temporary */}
        <h2 className="mx-4 my-8 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-center text-2xl font-bold text-slate-800 shadow-sm md:mx-auto md:text-3xl">
          Coming Soon....
        </h2>

        {/* Section 3: Customer Testimonials */}
        {/* <TestimonialsSection /> */}

        {/* Section 4: Benefits & Interactive Solar Savings ROI Calculator */}
        {/* <SolarCalculator onApplyForCapacity={handleOpenConsultation} /> */}

        {/* Section 4 Part 2: Benefits Breakdown & Comparison */}
        {/* <BenefitsSection /> */}

        {/* Section 5: About Company, GSTIN, Authorised Brands & 5-Step Process */}
        {/* <AboutSection /> */}

        {/* Section 7: FAQs & Catalogue Downloads */}
        {/* <FaqSection /> */}

        {/* Section 1/5/7: Full Consultation & Contact Details */}
        {/* <ContactSection initialRequirement={modalPrefill} /> */}

      </main>

      {/* Footer */}
      {/* <Footer /> */}

      {/* Global Consultation Booking Modal */}
      {/* <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseConsultation}
        prefillNote={modalPrefill}
      /> */}

      {/* Floating Action Buttons (WhatsApp, Phone, Scroll To Top) */}
      <FloatingActions />

    </div>
  );
}
