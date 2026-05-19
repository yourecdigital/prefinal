"use client";

import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const onScrollToElement = (event: Event) => {
      const { element, offset, behavior } = (event as CustomEvent<{
        element: HTMLElement;
        offset: number;
        behavior: ScrollBehavior;
      }>).detail;

      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(element, {
          offset,
          duration: behavior === "smooth" ? 1.1 : 0,
        });
        return;
      }

      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior });
    };

    window.addEventListener("app:scroll-to-element", onScrollToElement);
    return () => window.removeEventListener("app:scroll-to-element", onScrollToElement);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;

    const start = () => {
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
      if (!mq.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.026,
        wheelMultiplier: 0.4,
        touchMultiplier: 1,
      });
      lenisRef.current = lenis;
    };

    start();
    mq.addEventListener("change", start);
    return () => {
      mq.removeEventListener("change", start);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
