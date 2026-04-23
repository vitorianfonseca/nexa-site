import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
import { LanguageProvider } from "@/context/LanguageContext";
import Cursor from "@/components/Cursor";
import LangSync from "@/components/LangSync";
import LenisProvider from "@/components/LenisProvider";
import SplineBg from "@/components/SplineBg";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_PT",
    url: "https://bynexa.dev",
    siteName: "Nexa",
    title: "Nexa — Web Development Agency",
    description:
      "We build modern, fast, and lasting websites for businesses that want more.",
    images: [
      {
        url: "https://www.bynexa.dev/preview.png",
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
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://my.spline.design" />
        <link rel="dns-prefetch" href="//my.spline.design" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="//prod.spline.design" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/name_light.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/name_dark.svg" as="image" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&display=swap" />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <ServiceWorkerRegistration />
        <LanguageProvider>
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
