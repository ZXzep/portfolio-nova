import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import LangHtmlSync from './i18n/LangHtmlSync';
const sans=Geist({variable:'--font-sans',subsets:['latin']});
const mono=Geist_Mono({variable:'--font-mono',subsets:['latin']});
// Noto Sans Thai — a clean, well-hinted Thai grotesque that holds up at display
// sizes and sits evenly next to Geist's Latin.
const thai=Noto_Sans_Thai({variable:'--font-thai',subsets:['thai'],weight:['400','500','600','700'],display:'swap'});

// Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zx-portfolio-nova.vercel.app';
const DESCRIPTION =
  'Creative technologist in Bangkok shaping visual identities, digital products, 3D experiences, and production-ready software.';

export const metadata:Metadata={
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Punnathat Samoprong — Designer × Developer',
    template: '%s — Punnathat Samoprong',
  },
  description: DESCRIPTION,
  keywords: [
    'Punnathat Samoprong', 'creative technologist', 'full-stack developer',
    'UX/UI designer', 'graphic designer', 'ERP implementation consultant',
    'Bangkok', 'Thailand', 'Next.js', 'React', 'Three.js', 'portfolio',
  ],
  authors: [{ name: 'Punnathat Samoprong' }],
  creator: 'Punnathat Samoprong',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Punnathat Samoprong',
    url: SITE_URL,
    title: 'Punnathat Samoprong — Designer × Developer',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punnathat Samoprong — Designer × Developer',
    description: DESCRIPTION,
  },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body className={`${sans.variable} ${mono.variable} ${thai.variable}`}><LangHtmlSync/>{children}</body></html>}
