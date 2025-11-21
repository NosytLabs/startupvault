import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/providers';
import { Toaster } from 'react-hot-toast';
import { branding } from '@/config'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://startupvault.com'),
  title: `${branding.subbrand} — ${branding.longName} | ${branding.name}`,
  description: branding.tagline,
  keywords: 'startup, mrr, verified, cloning, market, atlas, analytics',
  authors: [{ name: `${branding.name} Team` }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: `${branding.subbrand} — ${branding.longName}`,
    description: branding.tagline,
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://startupvault.com',
    siteName: `${branding.subbrand} • ${branding.name}`,
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: 'hsl(var(--primary))',
};

import Navbar from '../components/molecules/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased scroll-smooth">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'bg-card text-card-foreground border shadow-lg',
            }}
          />
        </Providers>
      </body>
    </html>
  );
}