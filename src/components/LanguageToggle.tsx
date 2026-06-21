"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Toggle ES/EN que conserva la posición/ruta actual al cambiar de idioma.
export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("a11y");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-surface p-0.5 text-xs font-medium"
      role="group"
      aria-label={t("langToggle")}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
              active
                ? "bg-accent text-accent-contrast"
                : "text-muted hover:text-foreground"
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
