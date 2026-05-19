import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  updated: string;
  children: ReactNode;
};

export function LegalDocument({ title, subtitle, updated, children }: Props) {
  return (
    <main className="page-top bg-menu min-h-screen">
      <section className="py-16 sm:py-24 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="legal-doc-back">
            ← На главную
          </Link>

          <header className="legal-doc-header">
            <p className="label-caps text-wine/60 mb-3">Юридическая информация</p>
            <h1 className="display-section text-ink leading-tight mb-4">{title}</h1>
            <p className="text-ink/45 text-desc leading-relaxed max-w-2xl">{subtitle}</p>
            <p className="legal-doc-meta">Редакция от {updated}</p>
          </header>

          <article className="legal-doc-body">{children}</article>
        </div>
      </section>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="legal-doc-section">
      <h2 className="legal-doc-section__title">{title}</h2>
      <div className="legal-doc-section__content">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="legal-doc-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
