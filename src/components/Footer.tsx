import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tA11y = useTranslations("a11y");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-center font-mono text-xs text-muted-2 sm:flex-row sm:px-8 sm:text-left">
        <p>
          © {year} Bruno Merino. {t("rights")}
        </p>
        {/* Al final de un scroll largo, la salida más útil es volver arriba. */}
        <a
          href="#top"
          className="-my-2 inline-flex items-center gap-1.5 py-2 transition-colors hover:text-foreground"
        >
          <ArrowUp className="size-3.5" aria-hidden />
          {tA11y("backToTop")}
        </a>
      </div>
    </footer>
  );
}
