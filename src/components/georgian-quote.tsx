"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function GeorgianQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.55, 0.25]);

  return (
    <section ref={ref} className="georgian-quote-section">
      <motion.div style={{ opacity: glowOpacity }} className="georgian-quote-glow" aria-hidden />

      <motion.div style={{ y }} className="georgian-quote-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="georgian-quote-ornament"
          aria-hidden
        >
          <span className="georgian-quote-line" />
          <span className="georgian-quote-diamond" />
          <span className="georgian-quote-line" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="georgian-quote-eyebrow"
        >
          из «Путешествия в&nbsp;Арзрум», 1829
        </motion.p>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="georgian-quote-rule"
          aria-hidden
        />

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="georgian-quote-text"
        >
          <span aria-hidden className="georgian-quote-mark georgian-quote-mark--left">«</span>
          Каждое грузинское блюдо&nbsp;есть&nbsp;поэма
          <span aria-hidden className="georgian-quote-mark georgian-quote-mark--right">»</span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="georgian-quote-attr"
        >
          Александр Пушкин
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="georgian-quote-tail"
        >
          Грузинская кухня&nbsp;— это многовековое ремесло, в&nbsp;котором каждый
          ингредиент имеет своё место, а&nbsp;каждая специя&nbsp;— свою историю.
          Мы&nbsp;готовим по&nbsp;традиционным рецептам, доводя каждое блюдо
          до&nbsp;того уровня, ради которого его и&nbsp;стоит пробовать.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="georgian-quote-ornament georgian-quote-ornament--bottom"
          aria-hidden
        >
          <span className="georgian-quote-line" />
          <span className="georgian-quote-diamond" />
          <span className="georgian-quote-line" />
        </motion.div>
      </motion.div>
    </section>
  );
}
