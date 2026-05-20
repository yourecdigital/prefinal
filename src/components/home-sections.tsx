"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { PromoBanner } from "@/components/promo-banner";
import { FeaturesSection } from "@/components/features-section";
import { TelegramEmoji } from "@/components/ui/telegram-emoji";
import { MENU_CATEGORY_COUNT, MENU_ITEM_COUNT } from "@/lib/georgian-menu";
import { MenuLink } from "@/components/menu-link";

export function HomeSections() {
  return (
    <main className="home-flow">
      <HeroSection />

      <PromoBanner />

      <section className="bg-menu relative py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto home-split home-split--centered relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }} className="home-split__main">
            <div className="ornament-line ornament-line-light mb-4 max-w-xs">
              <span className="label-caps text-wine/60">меню</span>
            </div>
            <h2 className="display-section text-ink mb-6 leading-tight">
              Откроем<br /><span className="text-wine">вам Грузию</span>
            </h2>
            <p className="text-ink/45 mb-8 text-desc max-w-sm leading-relaxed">
              {MENU_ITEM_COUNT} блюд в {MENU_CATEGORY_COUNT} категориях. Шашлык, хачапури, горячие закуски, сеты и салаты — доставим горячим с мангала.
            </p>
            <MenuLink className="btn-primary px-10 py-4">Перейти в меню</MenuLink>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }} className="home-split__aside">
            <div className="menu-card-light rounded-2xl aspect-square w-full flex items-center justify-center border border-wine/20">
              <TelegramEmoji name="fork_plate" size={96} className="opacity-90" />
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturesSection />
    </main>
  );
}
