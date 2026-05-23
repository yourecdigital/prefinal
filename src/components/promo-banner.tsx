"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROMO, CONTACT } from "@/lib/georgian-menu";
import { TelegramEmoji } from "@/components/ui/telegram-emoji";
import { PhoneIcon, CalendarIcon } from "@/components/ui/icons";

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

const MANGAL_SALAT_IMG = `${basePath}/menu/mangal/mangal-salat.webp`;

export function PromoBanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="promo" ref={ref} className="home-promo bg-menu relative overflow-hidden pb-20 sm:pb-28 px-6 sm:px-10">
      <div className="home-promo__static-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-menu" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(164, 86, 50, 0.2), transparent 70%)" }} />
      </div>

      <div className="home-promo__content relative z-20 max-w-7xl mx-auto home-split home-split--centered">
        <div className="home-split__main flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-wine/80 text-cream label-caps px-5 py-2 rounded-full mb-7">
            <TelegramEmoji name="party" size={24} />
            <span>{PROMO.title}</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="text-ink/50 mb-3 text-desc">
            {PROMO.condition} —
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="text-gold-shimmer display-section leading-[1.0] mb-6">
              {PROMO.gift.split(" — ")[0]}<br />
              <span className="text-ink">— ПОДАРОК!</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-ink/35 mb-8 label-caps">
            <CalendarIcon />
            <span>Акция: {PROMO.dateFrom} — {PROMO.dateTo}</span>
          </motion.div>

          <motion.a href={`tel:${CONTACT.phoneRaw}`}
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.52, duration: 0.55 }}
            whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
            className="btn-wine px-10 py-4">
            <PhoneIcon /> Успеть заказать!
          </motion.a>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="home-split__aside">
          <div className="home-promo__gift-card menu-card-light rounded-2xl overflow-hidden">
            <div className="home-promo__gift-card-media" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MANGAL_SALAT_IMG}
                alt=""
                className="home-promo__gift-card-bg"
                width={400}
                height={400}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
              <div className="home-promo__gift-card-vignette" />
            </div>
            <div className="home-promo__gift-card-panel">
              <span className="home-promo__gift-card-badge label-caps">
                <TelegramEmoji name="gift" size={18} />
                Абсолютно бесплатно
              </span>
              <p className="home-promo__gift-card-title">
                {PROMO.gift.replace(" — ПОДАРОК!", "")}
              </p>
              <p className="home-promo__gift-card-sub text-desc">Успей порадовать себя!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
