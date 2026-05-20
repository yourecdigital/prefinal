import type { Metadata, Viewport } from "next";
import { Unbounded, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { MenuHashScroll } from "@/components/menu-hash-scroll";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SEO_DEFAULT, SEO_KEYWORDS, SITE_URL } from "@/lib/seo";

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
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "«Вкусно как в Грузии» — доставка мангала и грузинской кухни в Петергофе, Ломоносове, Стрельне",
    description: SEO_DEFAULT.ogDescription,
    locale: "ru_RU",
    type: "website",
    siteName: "Вкусно как в Грузии",
    url: `${SITE_URL}/`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Вкусно как в Грузии — доставка шашлыка в Петергофе" }],
  },
  robots: { index: true, follow: true },
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
      <body className="antialiased">
        <SeoJsonLd />
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
