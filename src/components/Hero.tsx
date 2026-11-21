import Image from "next/image";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { education } from "@/lib/content";

export default function Hero() {
  const t = useTranslations("hero");
  const tWpp = useTranslations("whatsapp");
  const tEducation = useTranslations("experience.education");

  return (
    <section id="top" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="grid items-center gap-7 py-9 sm:py-12 md:grid-cols-[minmax(0,1fr)_minmax(12rem,26%)] md:gap-12 lg:gap-20 lg:py-16">
        {/* Columna principal: identidad + propuesta */}
        <div className="hero-enter flex flex-col items-start justify-center">
          <h1 className="text-[clamp(2.9rem,8vw,5.5rem)] font-black leading-[0.98] tracking-[-0.03em]">
            Bruno Merino
          </h1>

          <p className="mt-4 text-xl font-bold text-accent sm:text-2xl">
            {t("role")}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t("tagline")}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href="#proyectos"
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-sm font-bold text-accent-contrast transition-colors hover:bg-foreground"
            >
              {t("ctaProjects")}
            </a>
            <a
              href={whatsappLink(tWpp("general"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-bold text-foreground underline-offset-4 hover:underline"
            >
              <MessageCircle className="size-4 text-accent" aria-hidden />
              {t("whatsapp")}
            </a>
          </div>
        </div>

        {/* Ficha técnica: foto + datos */}
        <aside className="hero-enter-late">
          <figure className="flex items-center gap-4 md:block md:border md:border-line md:bg-bg-2">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full md:aspect-[1/1] md:h-auto md:w-full md:rounded-none md:border-b md:border-line">
              <Image
                src="/fotoportfolio.jpg"
                alt="Bruno Merino"
                fill
                priority
                sizes="(min-width: 1152px) 283px, (min-width: 768px) 26vw, 64px"
                className="object-cover [object-position:center_25%]"
              />
            </div>
            <figcaption className="md:divide-y md:divide-line">
              <div className="md:px-4 md:py-3">
                <p className="font-mono text-xs text-muted-2">{t("cardBase")}</p>
                <p className="mt-1 font-mono text-sm text-foreground">
                  {siteConfig.location}
                </p>
              </div>
              <div className="hidden px-4 py-3 md:block">
                <p className="font-mono text-xs text-muted-2">{t("cardTraining")}</p>
                {education.map((degree) => (
                  <p key={degree} className="mt-1 text-sm text-muted">
                    {tEducation(`${degree}.title`)}
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
