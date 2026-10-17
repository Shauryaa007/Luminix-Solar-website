'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProductsSection from '@/components/ProductsSection';
import SolarCalculator from '@/components/SolarCalculator';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
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
        <h2 className='text-center text-4xl font-bold'>Company Highlights & Key Numbers Counter</h2>
        {/* <StatsSection /> */}

        {/* Section 2: Products Showcase */}
        <h2 className='text-center text-4xl font-bold'>Products Showcase</h2>
        {/* <ProductsSection onSelectProductForConsultation={handleOpenConsultation} /> */}

        {/* Section 4: Benefits & Interactive Solar Savings ROI Calculator */}
        <h2 className='text-center text-4xl font-bold'>Benefits & Interactive Solar Savings ROI Calculator</h2>
        {/* <SolarCalculator onApplyForCapacity={handleOpenConsultation} /> */}

        {/* Section 4 Part 2: Benefits Breakdown & Comparison */}
        <h2 className='text-center text-4xl font-bold'>Benefits Breakdown & Comparison</h2>
        {/* <BenefitsSection /> */}

        {/* Section 3: Customer Testimonials & Completed Installations Gallery */}
        <h2 className='text-center text-4xl font-bold'>Customer Testimonials & Completed Installations Gallery</h2>
        {/* <TestimonialsSection /> */}

        {/* Section 5: About Company, GSTIN, Authorised Brands & 5-Step Process */}
        <h2 className='text-center text-4xl font-bold'>About Company, GSTIN, Authorised Brands & 5-Step Process</h2>
        {/* <AboutSection /> */}

        {/* Section 7: FAQs & Catalogue Downloads */}
        <h2 className='text-center text-4xl font-bold'>FAQs & Catalogue Downloads</h2>
        {/* <FaqSection /> */}

        {/* Section 1/5/7: Full Consultation & Contact Details */}
        <ContactSection initialRequirement={modalPrefill} />

      </main>

      {/* Footer */}
      <Footer />

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
