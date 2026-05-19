"use client";

import { CONTACT } from "@/lib/georgian-menu";
import { PhoneIcon } from "@/components/ui/icons";

export function CallFloatingButton() {
  return (
    <a
      href={`tel:${CONTACT.phoneRaw}`}
      className="call-fab"
      aria-label={`Позвонить ${CONTACT.phone}`}
    >
      <span className="call-fab__pulse call-fab__pulse--1" aria-hidden />
      <span className="call-fab__pulse call-fab__pulse--2" aria-hidden />
      <span className="call-fab__btn">
        <PhoneIcon size={22} className="call-fab__icon" />
      </span>
      <span className="call-fab__label">Позвонить</span>
    </a>
  );
}
