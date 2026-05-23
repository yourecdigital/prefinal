import type { Metadata, Viewport } from "next";
import { Unbounded, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { MenuHashScroll } from "@/components/menu-hash-scroll";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { YandexMetrika } from "@/components/yandex-metrika";
import { OgHeadExtras } from "@/components/og-head-extras";
import { ogImageField, OG_SHARE } from "@/lib/og-share";
import { GOOGLE_SITE_VERIFICATION, SEO_DEFAULT, SEO_KEYWORDS, SITE_URL } from "@/lib/seo";

const headingFont = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080608",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_DEFAULT.title,
    template: "%s | Вкусно как в Грузии — Петергоф",
  },
  description: SEO_DEFAULT.description,
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    title: OG_SHARE.title,
    description: OG_SHARE.description,
    locale: "ru_RU",
    type: "website",
    siteName: "Вкусно как в Грузии",
    url: `${SITE_URL}/`,
    images: [ogImageField()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  twitter: {
    card: "summary_large_image",
    title: OG_SHARE.title,
    description: OG_SHARE.description,
    images: [ogImageField().url],
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    ...(process.env.YANDEX_VERIFICATION
      ? { yandex: process.env.YANDEX_VERIFICATION }
      : {}),
  },
  category: "food",
  applicationName: "Вкусно как в Грузии",
  authors: [{ name: "Вкусно как в Грузии" }],
  creator: "Вкусно как в Грузии",
  publisher: "Вкусно как в Грузии",
  formatDetection: { telephone: true, email: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "geo.region": "RU-SPE",
    "geo.placename": "Петергоф, Санкт-Петербург",
    "geo.position": "59.8816;29.9065",
    ICBM: "59.8816, 29.9065",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${headingFont.variable} ${monoFont.variable}`}>
      <head>
        <OgHeadExtras />
      </head>
      <body className="antialiased">
        <SeoJsonLd />
        <YandexMetrika />
        <SmoothScrollProvider>
          <MenuHashScroll />
          <Nav />
          <CartProvider>
            {children}
          </CartProvider>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
