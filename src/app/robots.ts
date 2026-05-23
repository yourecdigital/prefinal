import type { MetadataRoute } from "next";
import { SITE } from "@/lib/georgian-menu";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/lomonosov/", "/petergof/", "/strelna/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
