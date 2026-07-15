"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Download } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { siteConfig } from "@/lib/site";

const NAV_ITEMS = [
  { id: "services", href: "#servicios" },
  { id: "process", href: "#proceso" },
  { id: "projects", href: "#proyectos" },
  { id: "experience", href: "#perfil" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="text-base font-black tracking-tight"
          onClick={() => setOpen(false)}
        >
          bruno merino<span className="text-accent">_</span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="px-3.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {t(item.id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#contacto"
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-contrast transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {t("contact")}
          </a>

          {/* Botón menú móvil */}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-foreground md:hidden"
            aria-label={open ? tA11y("closeMenu") : tA11y("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <nav className="border-t border-line bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col divide-y divide-line px-5 sm:px-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 text-base font-medium text-foreground"
              >
                {t(item.id)}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="py-4 text-base font-medium text-foreground"
            >
              {t("contact")}
            </a>
            <a
              href={siteConfig.cvPath}
              download
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 py-4 text-base font-bold text-accent"
            >
              <Download className="size-4" />
              {t("cv")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
