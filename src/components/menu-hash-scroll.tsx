"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isMenuPath, scrollToMenuSectionWhenReady } from "@/lib/menu-scroll";

export function MenuHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuPath(pathname)) return;

    scrollToMenuSectionWhenReady();
    const t1 = window.setTimeout(scrollToMenuSectionWhenReady, 120);
    const t2 = window.setTimeout(scrollToMenuSectionWhenReady, 350);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToMenuSectionWhenReady();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
