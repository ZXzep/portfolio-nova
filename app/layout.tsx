import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const sans=Geist({variable:'--font-sans',subsets:['latin']});
const mono=Geist_Mono({variable:'--font-mono',subsets:['latin']});
export const metadata:Metadata={title:'Punnathat Samoprong — Designer × Developer',description:'Creative technologist in Bangkok shaping visual identities, digital products, 3D experiences, and production-ready software.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}
