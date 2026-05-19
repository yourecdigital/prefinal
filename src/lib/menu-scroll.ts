import { MENU_SECTION_ID } from "@/lib/georgian-menu";

export function isMenuPath(pathname: string) {
  return pathname.replace(/\/$/, "").endsWith("/menu");
}

export function getMenuScrollOffset(): number {
  const root = getComputedStyle(document.documentElement);
  const headerH = root.getPropertyValue("--site-header-h").trim();
  const rem = parseFloat(root.fontSize) || 16;
  const headerPx = headerH.endsWith("rem")
    ? parseFloat(headerH) * rem
    : parseFloat(headerH) || 66;
  return -(headerPx + rem);
}

export function scrollToMenuSection(behavior: ScrollBehavior = "smooth"): boolean {
  const el = document.getElementById(MENU_SECTION_ID);
  if (!el) return false;

  window.dispatchEvent(
    new CustomEvent("app:scroll-to-element", {
      detail: { element: el, offset: getMenuScrollOffset(), behavior },
    }),
  );
  return true;
}

export function scrollToMenuSectionWhenReady() {
  if (window.location.hash !== `#${MENU_SECTION_ID}`) return;

  let attempts = 0;
  const run = () => {
    if (scrollToMenuSection() || attempts >= 20) return;
    attempts += 1;
    requestAnimationFrame(() => setTimeout(run, 50));
  };

  run();
}
