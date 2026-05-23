import type { MetadataRoute } from "next";
import { SITE } from "@/lib/georgian-menu";
import { SEO_LANDINGS, seoLandingPath } from "@/lib/seo-landings";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/menu/", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/delivery/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about/", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/contacts/", priority: 0.85, changeFrequency: "yearly" as const },
    { path: "/privacy/", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/offer/", priority: 0.5, changeFrequency: "yearly" as const },
    ...SEO_LANDINGS.map((l) => ({
      path: seoLandingPath(l.slug),
      priority: 0.88,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
