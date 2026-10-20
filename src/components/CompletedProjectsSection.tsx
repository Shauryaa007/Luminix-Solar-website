'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Sun,
  Zap,
  MapPin,
  ArrowUpRight,
  X,
  ArrowRight,
} from 'lucide-react';
import {
  COMPLETED_PROJECTS,
  CompletedProject,
} from '@/data/solarData';

export default function CompletedProjectsSection() {
  const [selectedGalleryProject, setSelectedGalleryProject] =
    useState<CompletedProject | null>(null);

  const totalSlides = COMPLETED_PROJECTS.length;

  // Extended projects with clone of last at start and clone of first at end for seamless infinite loop
  const extendedProjects = [
    COMPLETED_PROJECTS[totalSlides - 1],
    ...COMPLETED_PROJECTS,
    COMPLETED_PROJECTS[0],
  ];

  // Start at index 1 (the first real slide)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeDot = (currentIndex - 1 + totalSlides) % totalSlides;

  // Pause auto-slide temporarily on user interaction
  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 4000);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setIsTransitioning(true);
      setCurrentIndex(index + 1);
      pauseAutoSlide();
    },
    [pauseAutoSlide]
  );

  // Auto-slide every 1 second on mobile in an infinite forward loop
  useEffect(() => {
    if (isPaused || selectedGalleryProject) return;

    autoSlideTimer.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 1000);

    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [isPaused, selectedGalleryProject]);

  // Seamless jump when reaching clones at either end
  const handleTransitionEnd = () => {
    if (currentIndex >= extendedProjects.length - 1) {
      // Reached the clone of the first slide at the end: instantly snap to the real first slide (index 1)
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached the clone of the last slide at the start: instantly snap to the real last slide
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    }
  };

  // Re-enable CSS transition after instantaneous jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Touch handlers for swipe
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
      pauseAutoSlide();
    },
    [pauseAutoSlide]
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const threshold = 40;
    if (touchDeltaX.current < -threshold) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (touchDeltaX.current > threshold) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
    touchDeltaX.current = 0;
  }, []);

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedGalleryProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedGalleryProject(null);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedGalleryProject]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[45%] h-96 w-96 rounded-full bg-teal-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">
              <Sun className="h-4 w-4" />
              Our work in focus
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Powering spaces with solar.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore completed solar installations by Luminix Solar.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600">
            <Zap className="h-4 w-4 text-emerald-700" />
            Residential & commercial
          </div>
        </div>

        {/* Desktop grid — hidden on mobile */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPLETED_PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedGalleryProject(project)}
              aria-label={`View details for ${project.title}`}
              className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <div className="relative h-72 overflow-hidden sm:h-80 lg:h-[350px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#082c20] via-[#082c20]/30 to-black/20 transition duration-300 group-hover:from-[#082c20]/95" />

                {/* Capacity badge */}
                <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#103c2c]/90 px-2.5 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                  <Zap className="h-3.5 w-3.5 text-emerald-200" />
                  {project.capacity}
                </div>

                {/* Category badge */}
                <div className="absolute right-3.5 top-3.5 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  {project.category}
                </div>

                {/* Bottom details */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                    Installed for
                  </p>
                  <h3 className="mt-0.5 text-base font-bold leading-snug text-white sm:text-lg">
                    {project.customerName}
                  </h3>

                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/75">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                    <span className="truncate">{project.location}</span>
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                    <span className="text-xs font-semibold text-white/90">
                      Explore project
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-900 transition duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile carousel — visible only on small screens */}
        <div className="sm:hidden">
          <div
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedProjects.map((project, index) => (
                <button
                  key={`${project.id}-${index}`}
                  type="button"
                  onClick={() => setSelectedGalleryProject(project)}
                  aria-label={`View details for ${project.title}`}
                  className="group relative block w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-200"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082c20] via-[#082c20]/30 to-black/20" />

                    {/* Capacity badge */}
                    <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#103c2c]/90 px-2.5 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                      <Zap className="h-3.5 w-3.5 text-emerald-200" />
                      {project.capacity}
                    </div>

                    {/* Category badge */}
                    <div className="absolute right-3.5 top-3.5 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {project.category}
                    </div>

                    {/* Bottom details */}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                        Installed for
                      </p>
                      <h3 className="mt-0.5 text-base font-bold leading-snug text-white">
                        {project.customerName}
                      </h3>

                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/75">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                        <span className="truncate">{project.location}</span>
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                        <span className="text-xs font-semibold text-white/90">
                          Explore project
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-900">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {COMPLETED_PROJECTS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeDot
                    ? 'w-7 bg-emerald-700'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#103c2c] p-7 text-white sm:p-10 lg:mt-20 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-16 h-48 w-48 rounded-full border border-white/10" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-200">
                <Sun className="h-4 w-4" />
                Make the switch
              </p>
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                Your roof has potential.
                <span className="block text-emerald-200">
                  Let’s explore it.
                </span>
              </h3>
              <p className="mt-3 text-sm leading-6 text-emerald-100/80">
                Find a solar solution tailored to your property and
                electricity requirements.
              </p>
            </div>

            <a
              href="#calculator"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Estimate my savings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Project details modal */}
      {selectedGalleryProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedGalleryProject(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
          >
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100">
              <Image
                src={selectedGalleryProject.image}
                alt={selectedGalleryProject.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />

              <button
                type="button"
                onClick={() => setSelectedGalleryProject(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-black/75 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              {/* Category & Installation Date bar — directly below the image */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    selectedGalleryProject.category === 'Residential'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      : 'bg-teal-50 text-teal-800 border border-teal-200/80'
                  }`}
                >
                  {selectedGalleryProject.category}
                </span>

                <span className="text-xs font-medium text-slate-500">
                  Completed · {selectedGalleryProject.installationDate}
                </span>
              </div>

              {/* Title & Customer Name & Location */}
              <div className="mt-4">
                <h3
                  id="project-modal-title"
                  className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl"
                >
                  {selectedGalleryProject.title}
                </h3>

                <p className="mt-1.5 text-sm text-slate-600 font-medium">
                  <span className="text-emerald-800 font-bold">Installed for: </span>
                  {selectedGalleryProject.customerName}
                </p>

                <p className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
                  <span>{selectedGalleryProject.location}</span>
                </p>
              </div>

              {/* Metric Cards (Plant Capacity highlighted, Annual Generation optional) */}
              <div
                className={`mt-4 sm:mt-5 grid gap-2.5 sm:gap-3 ${
                  selectedGalleryProject.annualGeneration
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {/* Plant Capacity Metric Card */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-emerald-100/40 p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 truncate">
                      Plant Capacity
                    </p>
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-bold leading-snug tracking-tight text-emerald-950 sm:text-2xl">
                    {selectedGalleryProject.capacity}
                  </p>
                </div>

                {/* Annual Generation Metric Card (Optional, if verified) */}
                {selectedGalleryProject.annualGeneration && (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 truncate">
                        <span className="sm:hidden">Annual Gen.</span>
                        <span className="hidden sm:inline">Annual Generation</span>
                      </p>
                      <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
                        <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                    </div>
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                      {selectedGalleryProject.annualGeneration}
                    </p>
                  </div>
                )}
              </div>

              {/* Project Description (one short sentence) */}
              <p className="mt-5 text-sm leading-6 text-slate-600 border-t border-slate-100 pt-4">
                {selectedGalleryProject.description}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedGalleryProject(null)}
                  className="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                >
                  Close project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
