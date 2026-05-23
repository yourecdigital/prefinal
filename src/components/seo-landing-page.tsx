import Link from "next/link";
import { CONTACT } from "@/lib/georgian-menu";
import {
  getSeoLanding,
  seoLandingCanonical,
  seoLandingPath,
  type SeoLanding,
} from "@/lib/seo-landings";
import { SITE_URL } from "@/lib/site-url";
import { MenuLink } from "@/components/menu-link";

function LandingJsonLd({ landing }: { landing: SeoLanding }) {
  const url = seoLandingCanonical(landing.slug);
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: landing.title,
    description: landing.description,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: `${landing.h1} ${landing.h1Accent ?? ""}`.trim(),
          item: url,
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SeoLandingPage({ slug }: { slug: string }) {
  const landing = getSeoLanding(slug);
  if (!landing) return null;

  const related = landing.relatedSlugs
    .map((s) => getSeoLanding(s))
    .filter((l): l is SeoLanding => Boolean(l));

  return (
    <main className="page-top">
      <LandingJsonLd landing={landing} />
      <section className="bg-hero py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <nav className="text-ink/40 text-sm mb-8 flex flex-wrap gap-2" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-wine transition-colors">
              Главная
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink/60">{landing.h1}</span>
          </nav>

          <h1 className="display-section text-ink mb-4 leading-tight">
            {landing.h1}
            {landing.h1Accent ? (
              <>
                <br />
                <span className="text-wine">{landing.h1Accent}</span>
              </>
            ) : null}
          </h1>
          <p className="text-ink/55 text-desc leading-relaxed mb-10 max-w-2xl">{landing.lead}</p>

          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              href={landing.menuHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-wine text-cream font-bold rounded-full hover:bg-wine/90 transition-colors text-sm label-caps"
            >
              Смотреть меню
            </Link>
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-flex items-center justify-center px-8 py-4 border border-ink/20 text-ink font-bold rounded-full hover:border-wine hover:text-wine transition-colors text-sm"
            >
              {CONTACT.phone}
            </a>
          </div>

          {landing.sections.map((section) => (
            <article key={section.heading} className="menu-card-light p-8 sm:p-10 mb-6">
              <h2
                className="text-ink font-bold text-2xl mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {section.heading}
              </h2>
              <div className="space-y-4 text-ink/55 text-desc leading-relaxed">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </article>
          ))}

          {related.length > 0 ? (
            <aside className="menu-card p-8 sm:p-10 mt-10">
              <h2
                className="text-ink font-bold text-xl mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ещё по теме
              </h2>
              <ul className="flex flex-col gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={seoLandingPath(r.slug)}
                      className="text-wine hover:text-wine/80 transition-colors text-desc"
                    >
                      {r.h1} {r.h1Accent ?? ""}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-ink/45 text-sm">
                <Link href="/delivery/" className="text-wine hover:underline">
                  Зоны и минимальная сумма доставки
                </Link>
                {" · "}
                <MenuLink className="text-wine hover:underline">
                  Полное меню
                </MenuLink>
              </p>
            </aside>
          ) : null}
        </div>
      </section>
    </main>
  );
}
