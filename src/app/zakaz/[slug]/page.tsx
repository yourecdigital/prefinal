import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoLandingPage } from "@/components/seo-landing-page";
import {
  SEO_LANDINGS,
  getSeoLanding,
  seoLandingPath,
} from "@/lib/seo-landings";
import { pageSeoMetadata } from "@/lib/page-seo";

export const dynamic = "force-static";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SEO_LANDINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getSeoLanding(slug);
  if (!landing) return {};

  return pageSeoMetadata({
    title: landing.title,
    description: landing.description,
    pathname: seoLandingPath(slug),
    ogType: "article",
  });
}

export default async function ZakazLandingPage({ params }: PageProps) {
  const { slug } = await params;
  if (!getSeoLanding(slug)) notFound();
  return <SeoLandingPage slug={slug} />;
}
