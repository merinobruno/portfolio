import { useTranslations } from "next-intl";
import { MessageCircle, Download } from "lucide-react";
import ContactForm from "./ContactForm";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site";

// Cierre "drenched": la sección entera es del color de acento.
// Todo el sitio apunta acá; acá el color deja de ser detalle y es la superficie.
export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contacto" className="bg-accent text-accent-contrast">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="data-label">{t("ctaBanner")}</p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2.6rem,7vw,5rem)] font-black leading-[0.98] tracking-[-0.02em]">
          {t("heading")}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-accent-contrast/80">
          {t("subtitle")}
        </p>

        {/* Atajos para quien prefiere no escribir un formulario */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line-on-accent-2 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-accent-contrast/10"
          >
            <MessageCircle className="size-4" />
            {t("whatsappCta")}
          </a>
          <a
            href={siteConfig.cvPath}
            download
            className="inline-flex items-center gap-2 px-2 py-3.5 font-mono text-sm font-medium underline-offset-4 hover:underline"
          >
            <Download className="size-4" />
            {t("cvCta")}
          </a>
        </div>

        {/* El camino principal: escribir sin salir del sitio */}
        <ContactForm />

        <div className="mt-14 flex flex-col gap-2 border-t border-line-on-accent pt-6 font-mono text-sm sm:flex-row sm:items-center sm:justify-between">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            WhatsApp · {siteConfig.whatsappDisplay}
          </a>
          <a href={mailtoLink} className="underline-offset-4 hover:underline">
            {t("emailLabel")} · {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
