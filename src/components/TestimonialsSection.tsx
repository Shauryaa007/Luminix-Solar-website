
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Star,
  Quote,
  MapPin,
  CalendarDays,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  ArrowUpRight,
  X,
  Sun,
  ArrowRight,
  Zap,
} from 'lucide-react';
import {
  TESTIMONIALS_DATA,
  COMPLETED_PROJECTS,
  CompletedProject,
} from '@/data/solarData';

export default function TestimonialsSection() {
  const [selectedGalleryProject, setSelectedGalleryProject] =
    useState<CompletedProject | null>(null);

  // --- Mobile carousel state ---
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = COMPLETED_PROJECTS.length;
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  // Auto-slide every 2 seconds on mobile
  useEffect(() => {
    if (isPaused) return;

    autoSlideTimer.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);

    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [isPaused, totalSlides]);

  // Pause auto-slide temporarily on user interaction
  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 5000);
  }, []);

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
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      goToSlide(activeSlide + 1);
    } else if (touchDeltaX.current > threshold) {
      goToSlide(activeSlide - 1);
    }
    touchDeltaX.current = 0;
  }, [activeSlide, goToSlide]);

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
      id="testimonials"
      className="relative overflow-hidden bg-[#f8faf8] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[45%] h-96 w-96 rounded-full bg-teal-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section introduction */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 shadow-sm">
            <Star className="h-4 w-4 fill-emerald-700 text-emerald-700" />
            Customer stories & projects
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Real experiences.
            <span className="block text-emerald-700">
              A brighter energy future.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover customer feedback and explore solar installations
            designed around different properties, energy needs and goals.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {TESTIMONIALS_DATA.map((testimonial, index) => {
            const initials = testimonial.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <article
                key={testimonial.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_24px_55px_-30px_rgba(6,78,59,0.25)] sm:p-8"
              >
                {/* Decorative quote mark */}
                <div className="pointer-events-none absolute right-6 top-5 text-emerald-50 transition group-hover:text-emerald-100 sm:right-8 sm:top-6">
                  <Quote className="h-16 w-16 fill-current" />
                </div>

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${testimonial.rating} out of 5 stars`}
                    >
                      {Array.from(
                        { length: testimonial.rating },
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-emerald-600 text-emerald-600"
                          />
                        )
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800 sm:text-xs">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Installation feedback
                    </span>
                  </div>

                  <blockquote className="mt-7">
                    <p className="text-base font-medium leading-7 text-slate-800 sm:text-lg sm:leading-8">
                      “{testimonial.feedback}”
                    </p>
                  </blockquote>

                  {/* Bill comparison */}
                  <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">
                        Before solar
                      </p>
                      <p className="mt-1 truncate text-lg font-bold text-slate-500 line-through decoration-slate-400 sm:text-xl">
                        {testimonial.billBefore}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-700 shadow-sm">
                      <TrendingDown className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-800 sm:text-xs">
                        After solar
                      </p>
                      <p className="mt-1 truncate text-xl font-bold tracking-tight text-emerald-800 sm:text-2xl">
                        {testimonial.billAfter}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer footer */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-800">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-950">
                        {testimonial.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {testimonial.role}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3 shrink-0 text-emerald-700" />
                        <span className="truncate">
                          {testimonial.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="flex items-center justify-end gap-1 text-xs text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {testimonial.date}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-800">
                      {testimonial.systemInstalled.split('with')[0].trim()}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Completed installations */}
        <div id="projects" className="mt-20 sm:mt-24">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">
                <Sun className="h-4 w-4" />
                Our work in focus
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Solar projects, built for real life.
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore completed installations and see how solar can
                work across residential and commercial properties.
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082c20] via-[#082c20]/20 to-black/10 transition duration-300 group-hover:from-[#082c20]/95" />

                  {/* Capacity badge */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#103c2c]/90 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                    <Zap className="h-3.5 w-3.5 text-emerald-200" />
                    {project.capacity}
                  </div>

                  <div className="absolute right-4 top-4 rounded-lg border border-white/20 bg-black/30 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {project.completionYear}
                  </div>

                  {/* Bottom details */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-200">
                      {project.clientType}
                    </p>

                    <h4 className="text-lg font-bold leading-snug sm:text-xl">
                      {project.title}
                    </h4>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-white/75">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                      <span className="text-xs font-semibold text-white/90">
                        Explore project
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-900 transition duration-300 group-hover:rotate-45">
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
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {COMPLETED_PROJECTS.map((project) => (
                  <button
                    key={project.id}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082c20] via-[#082c20]/20 to-black/10" />

                      {/* Capacity badge */}
                      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#103c2c]/90 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                        <Zap className="h-3.5 w-3.5 text-emerald-200" />
                        {project.capacity}
                      </div>

                      <div className="absolute right-4 top-4 rounded-lg border border-white/20 bg-black/30 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        {project.completionYear}
                      </div>

                      {/* Bottom details */}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-200">
                          {project.clientType}
                        </p>

                        <h4 className="text-lg font-bold leading-snug">
                          {project.title}
                        </h4>

                        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/75">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                          <span className="text-xs font-semibold text-white/90">
                            Explore project
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-900">
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
                  onClick={() => {
                    goToSlide(index);
                    pauseAutoSlide();
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? 'w-7 bg-emerald-700'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
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
            <div className="relative h-64 sm:h-80">
              <Image
                src={selectedGalleryProject.image}
                alt={selectedGalleryProject.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#082c20]/90 via-black/10 to-black/20" />

              <button
                type="button"
                onClick={() => setSelectedGalleryProject(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
                  <Zap className="h-3.5 w-3.5" />
                  {selectedGalleryProject.capacity}
                </span>

                <h3
                  id="project-modal-title"
                  className="mt-3 text-2xl font-bold sm:text-3xl"
                >
                  {selectedGalleryProject.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
                  <MapPin className="h-4 w-4" />
                  {selectedGalleryProject.location}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Project type</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {selectedGalleryProject.clientType}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <p className="text-xs text-emerald-800">
                    Annual generation
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-900">
                    {selectedGalleryProject.annualGeneration}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {selectedGalleryProject.summary}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedGalleryProject(null)}
                  className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
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
