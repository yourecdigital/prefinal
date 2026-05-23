import { ContactsContent } from "@/components/contacts-content";
import { pageSeoMetadata } from "@/lib/page-seo";

export const metadata = pageSeoMetadata({
  title: "Контакты — заказать шашлык и мангал с доставкой",
  description:
    "Заказать доставку шашлыка и грузинской кухни в Петергоф, Ломоносов, Стрельну: +7 (909) 577-75-80, ВКонтакте @vkusno_georgia. Ежедневно 12:00–23:59.",
  pathname: "/contacts/",
});

export default function ContactsPage() {
  return (
    <main className="page-top">
      <ContactsContent />
    </main>
  );
}
