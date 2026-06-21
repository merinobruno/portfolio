import { useTranslations } from "next-intl";
import { MessageCircle, Mail, Download } from "lucide-react";
import Section from "./Section";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contacto" className="!pb-28">
      <div className="glow-surface overflow-hidden rounded-3xl border border-line p-8 text-center sm:p-14">
        <p className="text-sm font-semibold text-accent">{t("ctaBanner")}</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-grad inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            <MessageCircle className="size-4" />
            {t("whatsappCta")}
          </a>
          <a
            href={mailtoLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            <Mail className="size-4" />
            {t("emailCta")}
          </a>
          <a
            href={siteConfig.cvPath}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
          >
            <Download className="size-4" />
            {t("cvCta")}
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1 text-sm text-muted-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            WhatsApp · {siteConfig.whatsappDisplay}
          </a>
          <a href={mailtoLink} className="transition-colors hover:text-foreground">
            {t("emailLabel")} · {siteConfig.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
