"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { PromoBanner } from "@/components/promo-banner";
import { FeaturesSection } from "@/components/features-section";
import { AmbientGrillVideo } from "@/components/ui/ambient-grill-video";
import { MENU_CATEGORY_COUNT, MENU_ITEM_COUNT } from "@/lib/menu-counts";
import { MenuLink } from "@/components/menu-link";

export function HomeSections() {
  return (
    <main className="home-flow">
      <HeroSection />

      <PromoBanner />

      <section className="bg-menu relative py-20 sm:py-28 px-6 sm:px-10 home-menu-teaser">
        <div className="max-w-7xl mx-auto home-split home-split--mirror relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="home-split__aside home-menu-teaser__media"
          >
            <div className="ambient-video-frame ambient-video-frame--home home-menu-teaser__square rounded-2xl aspect-square overflow-hidden border border-wine/25 shadow-[0_20px_56px_rgba(0,0,0,0.45)]">
              <AmbientGrillVideo
                src="/videos/grill-shashlik.mp4"
                poster="/videos/grill-shashlik-poster.jpg"
                className="ambient-video--square"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            viewport={{ once: true }}
            className="home-split__main home-menu-teaser__copy"
          >
            <div className="ornament-line ornament-line-light ornament-line--trail mb-4">
              <span className="label-caps text-wine/60">меню</span>
            </div>
            <h2 className="display-section text-ink mb-6 leading-tight">
              Откроем<br /><span className="text-wine">вам Грузию</span>
            </h2>
            <p className="text-ink/45 mb-8 text-desc leading-relaxed">
              {MENU_ITEM_COUNT} позиций в {MENU_CATEGORY_COUNT} категориях. Шашлык, хачапури, горячие закуски, напитки, сеты и салаты — доставим горячим с мангала.
            </p>
            <MenuLink className="btn-primary px-10 py-4">Перейти в меню</MenuLink>
          </motion.div>
        </div>
      </section>

      <FeaturesSection />
    </main>
  );
}
