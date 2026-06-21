import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { heroCredentials } from "@/lib/content";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="top" className="relative">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-28 pb-20 text-center sm:px-6 sm:pt-32 sm:pb-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {t("badge")}
        </span>

        {/* Foto con anillo de degradé */}
        <div className="ring-gradient relative mt-7 size-44 rounded-full p-[3px] sm:size-52">
          <div className="relative size-full overflow-hidden rounded-full bg-bg-2">
            <Image
              src="/fotoportfolio.jpg"
              alt="Bruno Merino"
              fill
              priority
              sizes="208px"
              className="object-cover [object-position:center_30%]"
            />
          </div>
        </div>

        <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Bruno Merino
        </h1>
        <p className="text-gradient mt-3 text-lg font-semibold sm:text-xl">
          {t("role")}
        </p>

        {/* Credenciales / títulos */}
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {heroCredentials.map((cred) => (
            <li
              key={cred}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
            >
              {cred}
            </li>
          ))}
        </ul>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {t("tagline")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#servicios"
            className="btn-grad inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            {t("ctaServices")}
            <ArrowRight className="size-4" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            <MessageCircle className="size-4" />
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
