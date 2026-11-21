"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Download } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { siteConfig } from "@/lib/site";

const NAV_ITEMS = [
  { id: "projects", href: "#proyectos" },
  { id: "services", href: "#servicios" },
  { id: "process", href: "#proceso" },
  { id: "experience", href: "#perfil" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const [activa, setActiva] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Marca en qué sección estás. La banda de detección va cerca del borde
  // superior: la sección "activa" es la que estás por leer, no la que ocupa
  // más pantalla.
  useEffect(() => {
    const secciones = document.querySelectorAll<HTMLElement>("main section[id]");
    if (secciones.length === 0) return;

    const io = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibles.length > 0) setActiva(visibles[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px" },
    );
    secciones.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 48rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", onKey);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <a href="#contenido" className="skip-link">
        {tA11y("skipToContent")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="whitespace-nowrap text-base font-black tracking-tight"
          onClick={() => setOpen(false)}
        >
          bruno merino<span className="text-accent">_</span>
        </a>

        {/* Nav desktop, con la sección actual marcada */}
        <nav className="hidden items-center md:flex">
          {NAV_ITEMS.map((item) => {
            const esActiva = activa === item.href.slice(1);
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={esActiva ? "location" : undefined}
                className={`relative px-2 py-2 text-sm font-medium transition-colors lg:px-3.5 ${
                  esActiva ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {t(item.id)}
                {esActiva && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-accent"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* El CV vivía sólo en el menú móvil: en desktop el reclutador tenía
              que scrollear ~6000px hasta la sección de ventas para encontrarlo. */}
          <a
            href={siteConfig.cvPath}
            download
            aria-label={t("cv")}
            title={t("cv")}
            className="hidden min-h-10 min-w-8 items-center justify-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground md:inline-flex"
          >
            <Download className="size-4" aria-hidden />
            <span className="hidden lg:inline">{t("cv")}</span>
          </a>
          <LanguageToggle onSwitch={() => setOpen(false)} />
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            aria-current={activa === "contacto" ? "location" : undefined}
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-contrast transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {t("contact")}
          </a>

          {/* Botón menú móvil */}
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-line text-foreground md:hidden"
            aria-label={open ? tA11y("closeMenu") : tA11y("openMenu")}
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <nav id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-y border-line bg-background md:hidden">
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
