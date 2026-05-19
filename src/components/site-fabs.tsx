"use client";

import { CallFloatingButton } from "@/components/call-floating-button";
import { CartButton } from "@/components/cart-button";

export function SiteFabs({ onCartClick }: { onCartClick: () => void }) {
  return (
    <div className="site-fabs" aria-label="Быстрые действия">
      <CallFloatingButton />
      <CartButton onClick={onCartClick} />
    </div>
  );
}
