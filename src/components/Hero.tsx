import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { heroCredentials } from "@/lib/content";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="top" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="grid gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1fr_340px] lg:gap-20 lg:pb-24">
        {/* Columna principal: identidad + propuesta */}
        <div className="hero-enter flex flex-col items-start justify-center">
          <h1 className="text-[clamp(2.9rem,8vw,5.5rem)] font-black leading-[0.98] tracking-[-0.03em]">
            Bruno Merino
          </h1>

          <p className="mt-4 text-xl font-bold text-accent sm:text-2xl">
            {t("role")}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {t("tagline")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-contrast transition-transform hover:-translate-y-0.5"
            >
              {t("ctaServices")}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#perfil"
              className="inline-flex items-center gap-2 rounded-md border border-line-2 px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-surface-2"
            >
              {t("ctaProfile")}
            </a>
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            <MessageCircle className="size-4" />
            {t("whatsapp")}
          </a>
        </div>

        {/* Ficha técnica: foto + datos */}
        <aside className="hero-enter-late">
          <figure className="max-w-sm border border-line bg-bg-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-line">
              <Image
                src="/fotoportfolio.jpg"
                alt="Bruno Merino"
                fill
                priority
                sizes="(max-width: 1024px) 384px, 340px"
                className="object-cover [object-position:center_25%]"
              />
            </div>
            <figcaption className="divide-y divide-line">
              <div className="px-4 py-3">
                <p className="data-label text-muted-2">{t("cardBase")}</p>
                <p className="mt-1 font-mono text-[13px] text-muted">
                  {siteConfig.location}
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="data-label text-muted-2">{t("cardTraining")}</p>
                {heroCredentials.map((cred) => (
                  <p key={cred} className="mt-1 font-mono text-[13px] text-muted">
                    {cred}
                  </p>
                ))}
              </div>
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
