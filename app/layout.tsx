import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Cursor from "@/components/Cursor";

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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground antialiased">
        <LanguageProvider>
          <Cursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
