import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

// Botón flotante de WhatsApp, siempre visible (mobile-first).
export default function WhatsAppFab() {
  const t = useTranslations("a11y");

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappFloat")}
      className="btn-grad fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
