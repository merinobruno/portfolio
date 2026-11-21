"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

function readingPositionKey(url: URL) {
  return `portfolio:reading:${url.pathname}${url.hash}`;
}

function readingInset() {
  return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
}

export default function LanguageToggle({ onSwitch, anchor }: { onSwitch?: () => void; anchor?: string }) {
  const locale = useLocale();
  const t = useTranslations("a11y");

  useEffect(() => {
    const url = new URL(window.location.href);
    const target = document.getElementById(url.hash.slice(1));
    if (!target) return;
    const key = readingPositionKey(url);
    const frame = requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem(key);
        if (saved === null) return;
        sessionStorage.removeItem(key);
        const rect = target.getBoundingClientRect();
        const top = window.scrollY + rect.top + rect.height * Number(saved) - readingInset();
        if (Number.isFinite(top)) window.scrollTo({ top, behavior: "instant" });
      } catch {
        // The native fragment still takes the reader to the translated section.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  function switchTo(next: Locale) {
    if (next === locale) return;
    const destination = new URL(window.location.href);
    destination.pathname = getPathname({ locale: next, href: "/" });
    if (anchor) {
      destination.hash = anchor;
    } else {
      const inset = readingInset();
      const readingLine = Math.max(inset + 6, window.innerHeight / 4);
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
      const current = sections.reverse().find((section) => section.getBoundingClientRect().top <= readingLine);
      destination.hash = current?.id ?? "top";
      const bounds = current?.getBoundingClientRect();
      const fraction = bounds ? Math.min(1, Math.max(0, (inset - bounds.top) / bounds.height)) : 0;
      try {
        sessionStorage.setItem(readingPositionKey(destination), String(fraction));
      } catch {
        // Storage is optional; the fragment is part of the destination URL.
      }
    }
    onSwitch?.();
    window.location.replace(destination.href);
  }

  return (
    <div
      className="inline-flex items-center rounded-md border border-line p-0.5 font-mono text-xs"
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
            aria-pressed={active}
            className={`rounded px-2.5 py-1 uppercase transition-colors ${
              active
                ? "bg-surface-2 font-bold text-foreground"
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
