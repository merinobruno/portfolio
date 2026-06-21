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
    <header className="sticky top-0 z-50">
      <div className="mx-3 mt-3.5 flex max-w-5xl items-center justify-between rounded-full border border-line bg-bg-2/60 py-2.5 pl-5 pr-2.5 backdrop-blur-md sm:mx-auto">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          bruno<span className="text-accent">.</span>merino
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="px-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(item.id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <a
            href="#contacto"
            className="btn-grad hidden rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            {t("contact")}
          </a>

          {/* Botón menú móvil */}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-foreground md:hidden"
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
        <div className="mx-3 mt-2 rounded-2xl border border-line bg-bg-2/95 p-3 backdrop-blur-md md:hidden">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {t(item.id)}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {t("contact")}
            </a>
            <a
              href={siteConfig.cvPath}
              download
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-accent"
            >
              <Download className="size-4" />
              {t("cv")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
