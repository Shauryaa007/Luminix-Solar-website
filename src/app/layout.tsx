import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luminixsolar.com";

export const viewport: Viewport = {
  themeColor: "#102E24",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luminix Solar | Rooftop Solar Installation & PM Surya Ghar Subsidy in Lucknow & UP",
    template: "%s | Luminix Solar",
  },
  description:
    "Luminix Solar is Uttar Pradesh's leading rooftop solar installation company in Lucknow & Barabanki. Save up to 90% on electricity bills with PM Surya Ghar DBT subsidy up to ₹78,000, 25-year warranty, and tier-1 solar technology.",
  keywords: [
    "rooftop solar Lucknow",
    "solar panel installation Barabanki",
    "PM Surya Ghar Muft Bijli Yojana Uttar Pradesh",
    "solar subsidy UP",
    "best solar company in Lucknow",
    "residential solar panels Lucknow",
    "commercial rooftop solar UP",
    "solar panel price Lucknow",
    "MNRE approved solar vendor Lucknow",
    "Luminix Solar",
    "solar hybrid inverter Lucknow",
  ],
  authors: [{ name: "Luminix Solar Pvt. Ltd." }],
  creator: "Luminix Solar Pvt. Ltd.",
  publisher: "Luminix Solar Pvt. Ltd.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Luminix Solar | Rooftop Solar Installation & PM Surya Ghar Subsidy",
    description:
      "Cut your electricity bills by up to 90%. Get free expert solar consultation, ₹78,000 government subsidy assistance, and 25-year warranty in Lucknow & Barabanki.",
    url: siteUrl,
    siteName: "Luminix Solar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-solar.jpg",
        width: 1200,
        height: 630,
        alt: "Luminix Solar Rooftop Installation in Lucknow and Barabanki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminix Solar | Rooftop Solar Installation & PM Surya Ghar Subsidy",
    description:
      "Save up to 90% on electricity bills with PM Surya Ghar subsidy up to ₹78,000. Trusted rooftop solar installation in Lucknow & Barabanki.",
    images: ["/images/hero-solar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Luminix Solar Pvt. Ltd.",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      image: `${siteUrl}/images/hero-solar.jpg`,
      description:
        "Leading rooftop solar installation partner in Lucknow and Barabanki, Uttar Pradesh, in association with A & V Agrivoltaics. Empanelled under MNRE PM Surya Ghar Muft Bijli Yojana providing turnkey solar systems with up to 90% bill savings.",
      telephone: "+91-9793078997",
      email: "luminixsolar2025@gmail.com",
      priceRange: "₹₹",
      areaServed: [
        { "@type": "City", name: "Lucknow" },
        { "@type": "City", name: "Barabanki" },
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "MP-2824, Dashrabagh, Makhdumpur Road",
          addressLocality: "Barabanki",
          postalCode: "225001",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Subhash Hotel, Mati, Bijnaur Road",
          addressLocality: "Lucknow",
          postalCode: "226002",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "128",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much subsidy can I get under the PM Surya Ghar Muft Bijli Yojana?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under the PM Surya Ghar Muft Bijli Yojana, residential consumers receive direct DBT subsidies up to ₹78,000 (₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and higher). Luminix Solar handles all online portal filings and DISCOM approvals.",
          },
        },
        {
          "@type": "Question",
          name: "How much can I save on my electricity bills with solar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A properly engineered rooftop solar system can reduce your monthly electricity bills by up to 90%, with an average capital payback period of 3 to 4 years.",
          },
        },
        {
          "@type": "Question",
          name: "What warranties does Luminix Solar offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Luminix Solar provides a 25-to-30 year linear performance warranty on solar panels, a 10-year warranty on hybrid inverters, and a 10-year warranty on lithium battery systems with free periodic maintenance.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
