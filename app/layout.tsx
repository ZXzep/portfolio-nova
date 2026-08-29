import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import LangHtmlSync from './i18n/LangHtmlSync';
const sans=Geist({variable:'--font-sans',subsets:['latin']});
const mono=Geist_Mono({variable:'--font-mono',subsets:['latin']});
// Noto Sans Thai — a clean, well-hinted Thai grotesque that holds up at display
// sizes and sits evenly next to Geist's Latin.
const thai=Noto_Sans_Thai({variable:'--font-thai',subsets:['thai'],weight:['400','500','600','700'],display:'swap'});
export const metadata:Metadata={title:'Punnathat Samoprong — Designer × Developer',description:'Creative technologist in Bangkok shaping visual identities, digital products, 3D experiences, and production-ready software.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body className={`${sans.variable} ${mono.variable} ${thai.variable}`}><LangHtmlSync/>{children}</body></html>}
