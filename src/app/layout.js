import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';
import "./globals.css";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Maia Talks About AI",
  description: "A blog where I share data stories, analysis, and visuals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ELZ1DCZPNK"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ELZ1DCZPNK');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header with small logo and wordmark */}
        <header className="bg-[#ede4d0] border-b border-black/10">
          <div className="px-6 py-3">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/maia-talks-about-logo.png"
                alt="Maia Talks About AI"
                width={48}
                height={48}
                priority
                className="h-10 w-10"
              />
              <span className="font-mono text-black text-lg font-semibold tracking-tight">
                Maia Talks About AI
              </span>
            </Link>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-[#d6cdb9] text-black py-4 text-center font-mono">
          <div className="max-w-6xl mx-auto px-4">
            <div className="space-x-4">
              <Link href="/privacy-policy" className="text-black hover:text-black/60">
                Privacy Policy
              </Link>
              <span className="text-black/50">|</span>
              <a href="mailto:maia.salti@gmail.com" className="text-black hover:text-black/60">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}