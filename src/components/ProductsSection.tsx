
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  Sun,
  BatteryCharging,
  Building2,
  Droplet,
  Check,
  ArrowRight,
  ArrowLeft,
  Info,
  ShieldCheck,
  X,
  ChevronRight,
  ChevronLeft,
  MoveRight,
} from 'lucide-react';
import { PRODUCTS_DATA, Product } from '@/data/solarData';

interface ProductsSectionProps {
  onSelectProductForConsultation: (productName: string) => void;
}

const categories = [
  { id: 'all', label: 'All products' },
  { id: 'residential', label: 'Rooftop solar' },
  { id: 'inverter-battery', label: 'Inverters & storage' },
  { id: 'commercial', label: 'Commercial solar' },
  { id: 'water-pump', label: 'Solar water pumps' },
];

const categoryIcons: Record<string, typeof Sun> = {
  residential: Sun,
  'inverter-battery': BatteryCharging,
  commercial: Building2,
  'water-pump': Droplet,
};

export default function ProductsSection({
  onSelectProductForConsultation,
}: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const didDrag = useRef(false);

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter(
          (product) => product.category === activeCategory
        );

  const scrollCarousel = (direction: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: direction === 'right' ? 320 : -320,
      behavior: 'smooth',
    });
  };

  const startDragging = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    isDragging.current = true;
    didDrag.current = false;
    startX.current = event.clientX;
    startScrollLeft.current = event.currentTarget.scrollLeft;
  };

  const dragCarousel = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;

    const distance = event.clientX - startX.current;

    if (Math.abs(distance) > 5) {
      didDrag.current = true;
    }

    if (didDrag.current) {
      event.preventDefault();
      carouselRef.current.scrollLeft = startScrollLeft.current - distance;
    }
  };

  const stopDragging = () => {
    isDragging.current = false;

    // Keep didDrag true briefly so a drag doesn't activate a card.
    if (didDrag.current) {
      window.setTimeout(() => {
        didDrag.current = false;
      }, 0);
    }
  };

  const openProductDetails = (product: Product) => {
    if (didDrag.current) return;
    setSelectedProduct(product);
  };

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowAllProducts(false);

    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const showCatalogue = () => {
    setActiveCategory('all');
    setShowAllProducts(true);
  };

  return (
    <section
      id="products"
      className="bg-[#FAFCFA] py-12 sm:py-16 lg:py-20 lg:mt-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              <span className="h-px w-6 bg-emerald-700" />
              Our solar solutions
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find your perfect
              <span className="text-emerald-800"> solar solution.</span>
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Explore solar products for homes, businesses and industry.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-900">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            Expert product guidance
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                aria-pressed={active}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  active
                    ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-900'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Catalogue heading and controls */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-900">
              {showAllProducts ? 'All products' : 'Explore our range'}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {filteredProducts.length} products
              {!showAllProducts && ' · Swipe or drag to explore'}
            </p>
          </div>

          {!showAllProducts && (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll products left"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll products right"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {showAllProducts && (
            <button
              type="button"
              onClick={() => setShowAllProducts(false)}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to carousel
            </button>
          )}
        </div>

        {/* Products carousel */}
        {!showAllProducts && filteredProducts.length > 0 && (
          <div className="relative mt-4">
            {/* Subtle edge fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-10 bg-gradient-to-l from-[#FAFCFA] to-transparent sm:block"
            />

            <div
              ref={carouselRef}
              onMouseDown={startDragging}
              onMouseMove={dragCarousel}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onClickCapture={(event) => {
                if (didDrag.current) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              className={`flex gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-1 [scrollbar-color:#A7CDB8_transparent] [scrollbar-width:thin] ${
                isDragging.current ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
              style={{ scrollSnapType: 'x mandatory' }}
              aria-label="Solar products carousel"
            >
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group w-[255px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_16px_35px_-22px_rgba(6,78,59,0.32)] sm:w-[275px]"
                >
                  {/* Product image */}
                  <button
                    type="button"
                    onClick={() => openProductDetails(product)}
                    aria-label={`View details for ${product.name}`}
                    className="relative block h-40 w-full overflow-hidden bg-[#F0F5F0] text-left sm:h-44"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      draggable={false}
                      sizes="275px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

                    <span className="absolute left-3 top-3 max-w-[65%] truncate rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-slate-700 backdrop-blur">
                      {product.categoryLabel}
                    </span>

                    {product.subsidyEligible && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-800 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm">
                        <Check className="h-3 w-3" />
                        Subsidy eligible
                      </span>
                    )}

                    <span className="absolute bottom-3 left-3 rounded-lg border border-white/60 bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-900 backdrop-blur">
                      {product.efficiency}
                    </span>

                    <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-900 shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Compact information */}
                  <div className="p-4">
                    <h3 className="truncate text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 truncate text-xs leading-5 text-slate-500">
                      {product.tagline}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Indicative price
                        </p>
                        <p className="mt-1 truncate text-sm font-bold text-slate-900">
                          {product.indicativePrice}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Warranty
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {product.warranty.split('+')[0]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => openProductDetails(product)}
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
                      >
                        <Info className="h-3.5 w-3.5" />
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onSelectProductForConsultation(product.name)
                        }
                        className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-emerald-800 px-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-900"
                      >
                        Enquire
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* View all products card — always last */}
              <button
                type="button"
                onClick={showCatalogue}
                className="group flex min-h-[330px] w-[180px] shrink-0 snap-start flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 px-5 text-center transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 sm:w-[200px]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-800 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                  <MoveRight className="h-5 w-5" />
                </span>

                <span className="mt-4 text-sm font-bold text-slate-900">
                  View all products
                </span>

                <span className="mt-1 text-xs leading-5 text-slate-500">
                  Explore our complete solar range
                </span>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                  Browse catalogue
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>

            <p className="mt-1 text-[11px] text-slate-400 sm:hidden">
              Swipe left or right to explore more products →
            </p>
          </div>
        )}

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white py-12 text-center">
            <p className="text-sm font-medium text-slate-700">
              No products in this category yet.
            </p>
            <button
              type="button"
              onClick={() => selectCategory('all')}
              className="mt-3 text-sm font-semibold text-emerald-800 hover:underline"
            >
              View all products
            </button>
          </div>
        )}

        {/* Full catalogue grid */}
        {showAllProducts && (
          <div
            id="all-products"
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PRODUCTS_DATA.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  aria-label={`View details for ${product.name}`}
                  className="relative block h-44 w-full overflow-hidden bg-emerald-50 text-left"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-slate-700">
                    {product.categoryLabel}
                  </span>

                  {product.subsidyEligible && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-800 px-2.5 py-1.5 text-[10px] font-semibold text-white">
                      <Check className="h-3 w-3" />
                      Subsidy eligible
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-900">
                    {product.efficiency}
                  </span>
                </button>

                <div className="p-4 sm:p-5">
                  <h3 className="truncate text-lg font-bold text-slate-900 group-hover:text-emerald-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {product.tagline}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Indicative price
                      </p>
                      <p className="mt-1 truncate text-sm font-bold text-slate-900">
                        {product.indicativePrice}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Warranty
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-700">
                        {product.warranty.split('+')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <Info className="h-3.5 w-3.5" />
                      Details
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onSelectProductForConsultation(product.name)
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-emerald-800 px-2 text-xs font-semibold text-white hover:bg-emerald-900"
                    >
                      Enquire
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Consultation banner */}
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-[#123A2C] px-5 py-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full border border-white/10"
          />

          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
              Need help choosing?
            </p>

            <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Let&apos;s find the right solar system.
            </h3>

            <p className="mt-1 text-sm text-white/65">
              Discuss your project and product requirements with our team.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onSelectProductForConsultation(
                'Custom Solar System Sizing and Product Consultation'
              )
            }
            className="relative mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50 sm:mt-0 sm:w-auto sm:shrink-0"
          >
            Talk to an expert
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product details modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProduct(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/50 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">
                  Product details
                </p>

                <h3
                  id="product-modal-title"
                  className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
                >
                  {selectedProduct.name}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close product details"
                onClick={() => setSelectedProduct(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <p className="text-sm leading-7 text-slate-600">
                {selectedProduct.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-slate-500">Efficiency</p>
                  <p className="mt-1 text-sm font-bold text-emerald-900">
                    {selectedProduct.efficiency}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Warranty</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {selectedProduct.warranty}
                  </p>
                </div>
              </div>

              <h4 className="mb-3 mt-6 text-sm font-bold text-slate-900">
                Technical specifications
              </h4>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                {Object.entries(selectedProduct.specifications).map(
                  ([key, value], index) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 gap-4 px-4 py-3 text-sm ${
                        index % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                      }`}
                    >
                      <span className="text-slate-500">{key}</span>
                      <span className="break-words font-medium text-slate-800">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>

              <h4 className="mb-3 mt-6 text-sm font-bold text-slate-900">
                Features and benefits
              </h4>

              <div className="space-y-3">
                {selectedProduct.features.map((feature, index) => (
                  <div
                    key={`${selectedProduct.id}-detail-${index}`}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-xs font-semibold text-emerald-900">
                  Subsidy information
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {selectedProduct.subsidyNote}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-white p-4 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  const productName = selectedProduct.name;
                  setSelectedProduct(null);
                  onSelectProductForConsultation(productName);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
              >
                Enquire about this product
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
