import type { Metadata } from "next";
import { ContactsContent } from "@/components/contacts-content";

export const metadata: Metadata = {
  title: "Контакты — заказать доставку грузинской кухни в Петергофе",
  description: "Закажите доставку грузинской кухни в Петергофе, Ломоносове и Стрельне: +7 (909) 577-75-80, ВКонтакте @vkusno_georgia. Работаем ежедневно 12:00–23:59.",
};

export default function ContactsPage() {
  return (
    <main className="page-top">
      <ContactsContent />
    </main>
  );
}
