"use client";

import Link from "next/link";
import { LEGAL } from "@/lib/legal";

type Props = {
  acceptOffer: boolean;
  acceptPrivacy: boolean;
  onAcceptOfferChange: (value: boolean) => void;
  onAcceptPrivacyChange: (value: boolean) => void;
  idPrefix?: string;
  variant?: "dark" | "light";
};

export function LegalConsentFields({
  acceptOffer,
  acceptPrivacy,
  onAcceptOfferChange,
  onAcceptPrivacyChange,
  idPrefix = "consent",
  variant = "dark",
}: Props) {
  const cls = variant === "dark" ? "legal-consent legal-consent--dark" : "legal-consent legal-consent--light";

  return (
    <div className="legal-consent-group">
      <label className={cls} htmlFor={`${idPrefix}-offer`}>
        <input
          id={`${idPrefix}-offer`}
          type="checkbox"
          checked={acceptOffer}
          onChange={(e) => onAcceptOfferChange(e.target.checked)}
          className="legal-consent__input"
          required
        />
        <span className="legal-consent__box" aria-hidden />
        <span className="legal-consent__text">
          Я принимаю условия{" "}
          <Link href={LEGAL.paths.offer} target="_blank" rel="noopener noreferrer" className="legal-consent__link">
            публичной оферты
          </Link>
        </span>
      </label>

      <label className={cls} htmlFor={`${idPrefix}-privacy`}>
        <input
          id={`${idPrefix}-privacy`}
          type="checkbox"
          checked={acceptPrivacy}
          onChange={(e) => onAcceptPrivacyChange(e.target.checked)}
          className="legal-consent__input"
          required
        />
        <span className="legal-consent__box" aria-hidden />
        <span className="legal-consent__text">
          Даю согласие на обработку персональных данных в соответствии с{" "}
          <Link href={LEGAL.paths.privacy} target="_blank" rel="noopener noreferrer" className="legal-consent__link">
            политикой конфиденциальности
          </Link>
        </span>
      </label>
    </div>
  );
}
