import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import Cursor from "@/components/Cursor";
import LangSync from "@/components/LangSync";
import LenisProvider from "@/components/LenisProvider";
import SplineBg from "@/components/SplineBg";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import FontshareStyles from "@/components/FontshareStyles";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const cabinetGrotesk = localFont({
  src: [
    { path: "./fonts/CabinetGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/CabinetGrotesk-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bynexa.dev"),

  title: {
    default: "Nexa — Web Development Agency",
    template: "%s | Nexa",
  },

  description:
    "We build modern, fast, and lasting websites for businesses that want more than just a website. Based in Leiria, Portugal.",

  keywords: [
    "web development",
    "agency",
    "Leiria",
    "Portugal",
    "Next.js",
    "React",
    "landing pages",
    "web applications",
  ],

  authors: [{ name: "Nexa", url: "https://bynexa.dev" }],
  creator: "Nexa",

  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_PT"],
    url: "https://bynexa.dev",
    siteName: "Nexa",
    title: "Nexa — Web Development Agency",
    description:
      "We build modern, fast, and lasting websites for businesses that want more.",

    images: [
      {
        url: "https://bynexa.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "Nexa — Web Development Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexa — Web Development Agency",
    description:
      "We build modern, fast, and lasting websites for businesses that want more.",
    images: ["https://bynexa.dev/preview.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${cabinetGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://my.spline.design" crossOrigin="" />
        <link rel="dns-prefetch" href="//my.spline.design" />
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="" />
        <link rel="dns-prefetch" href="//prod.spline.design" />
      </head>

      <body className="font-sans bg-background text-foreground antialiased">
        <AnalyticsConsent />
        <ServiceWorkerRegistration />
        <FontshareStyles />

        <LanguageProvider>
          <CookieBanner />
          <LoadingScreen />
          <SplineBg />
          <Navbar />

          <LenisProvider>
            <LangSync />
            <Cursor />
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}