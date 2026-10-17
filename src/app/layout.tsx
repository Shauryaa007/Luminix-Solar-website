import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Luminix Solar | Leading Rooftop Solar Installation & PM Surya Ghar Subsidy Partner",
  description: "Luminix Solar provides premium residential and commercial solar solutions with up to 90% electricity bill savings, MNRE PM Surya Ghar subsidy up to ₹78,000, 25-year warranty, and tier-1 solar technology.",
  keywords: ["solar panels", "rooftop solar", "PM Surya Ghar subsidy", "solar inverters", "commercial solar energy", "Luminix Solar", "solar company Bengaluru India"],
  authors: [{ name: "Luminix Solar Energy Solutions Pvt. Ltd." }],
  openGraph: {
    title: "Luminix Solar | Clean, Reliable & Affordable Solar Energy",
    description: "Switch to solar and cut your electricity bills by up to 90%. Get free expert consultation, government subsidy assistance, and 25-year warranty.",
    siteName: "Luminix Solar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
