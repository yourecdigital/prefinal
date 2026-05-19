"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { MENU_HREF, MENU_SECTION_ID } from "@/lib/georgian-menu";
import { isMenuPath, scrollToMenuSectionWhenReady } from "@/lib/menu-scroll";

type MenuLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export function MenuLink({ onClick, ...props }: MenuLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();

    if (isMenuPath(pathname)) {
      const base = `${window.location.pathname}${window.location.search}`;
      if (window.location.hash !== `#${MENU_SECTION_ID}`) {
        window.history.pushState(null, "", `${base}#${MENU_SECTION_ID}`);
      }
      scrollToMenuSectionWhenReady();
      return;
    }

    router.push(MENU_HREF);
  };

  return <Link href={MENU_HREF} scroll={false} onClick={handleClick} {...props} />;
}
