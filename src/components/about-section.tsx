"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import { MENU_CATEGORY_COUNT, MENU_ITEM_COUNT } from "@/lib/georgian-menu";
import { AmbientGrillVideo } from "@/components/ui/ambient-grill-video";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const decorY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={ref} className="bg-hero relative overflow-hidden py-20 sm:py-32 px-6 sm:px-10">
      <motion.div style={{ y: decorY }} className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.05]" aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(18rem,30vw,36rem)", fontWeight: 700, color: "#A45632", lineHeight: 1 }}>✦</div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
          <div className="ornament-line ornament-line-light mb-5 max-w-[200px]">
            <span className="label-caps text-wine/50">О нас</span>
          </div>
          <h2 className="display-section text-ink mb-8 leading-[0.98]">
            Вкус,<br />который<br /><span className="text-gold-shimmer">объединяет</span>
          </h2>
          <div className="space-y-5 text-ink/50 text-desc leading-relaxed">
            <p>Мы — команда, влюблённая в грузинскую кухню. Каждое блюдо — это история, рецепт, передаваемый из поколения в поколение.</p>
            <p>Шашлыки на мангале, люля-кебаб, каре ягнёнка, грузинские салаты и сеты — доставляем горячим по Петергофу, Ломоносову, Стрельне и Петродворцовому району.</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap">
            {[{ val: String(MENU_ITEM_COUNT), label: "блюд" }, { val: String(MENU_CATEGORY_COUNT), label: "категорий" }, { val: "7", label: "дней в неделю" }].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }} className="flex flex-col">
                <span className="font-bold text-gold" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,4vw,3rem)" }}>{s.val}</span>
                <span className="label-caps text-ink/25 mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative rounded-2xl overflow-hidden p-px ambient-video-frame ambient-video-frame--about"
            style={{ background: "linear-gradient(135deg, rgba(212,169,58,0.35) 0%, rgba(114,47,55,0.2) 50%, rgba(212,169,58,0.1) 100%)" }}>
            <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] lg:aspect-square min-h-[280px]">
              <AmbientGrillVideo src="/videos/grill-chef.mp4" className="ambient-video--cover" />
              <div className="ambient-video-quote pointer-events-none">
                <blockquote className="text-cream italic font-bold drop-shadow-lg"
                  style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem,2.8vw,1.75rem)", lineHeight: 1.25 }}>
                  «Попробуй Грузию на вкус!»
                </blockquote>
                <p className="text-cream/70 text-sm text-desc mt-3 drop-shadow">Шашлык на углях — как на природе</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
