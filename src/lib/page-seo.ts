import type { Metadata } from "next";

import { ogImageField, OG_SHARE } from "@/lib/og-share";
import { SEO_DEFAULT, SITE_URL } from "@/lib/seo";

const SITE_NAME = "Вкусно как в Грузии";

function canonicalUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
}

type PageSeoOptions = {
  title: string;
  description: string;
  pathname: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
};

/** Единый набор meta / Open Graph / Twitter для страниц сайта */
export function pageSeoMetadata(opts: PageSeoOptions): Metadata {
  const canonical = canonicalUrl(opts.pathname);
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  const image = ogImageField();

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    robots: opts.noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: opts.ogType ?? "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image.url],
    },
  };
}

export function homeSeoMetadata(): Metadata {
  return {
    ...pageSeoMetadata({
      title: SEO_DEFAULT.title,
      description: SEO_DEFAULT.description,
      pathname: "/",
      ogTitle: OG_SHARE.title,
      ogDescription: OG_SHARE.description,
    }),
    title: { absolute: SEO_DEFAULT.title },
  };
}

export function notFoundSeoMetadata(): Metadata {
  return {
    title: "404 — Страница не найдена",
    description: "Страница не найдена. Вернитесь в меню или на главную — доставка шашлыка и грузинской кухни в Петергофе.",
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}
