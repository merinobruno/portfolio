"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X, ExternalLink, Lock, Check, Link2 } from "lucide-react";
import { projectAnchor, type Project } from "@/lib/content";
import ProjectArtwork from "./ProjectArtwork";
import LanguageToggle from "./LanguageToggle";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const t = useTranslations("projects");
  const tItem = useTranslations(`projects.items.${project.id}`);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [manualLink, setManualLink] = useState("");

  async function copyLink() {
    const url = new URL(window.location.pathname, window.location.origin);
    url.hash = projectAnchor(project.id);
    try {
      await navigator.clipboard.writeText(url.href);
      setCopied(true);
    } catch {
      setManualLink(url.href);
    }
  }

  useEffect(() => {
    const trigger = document.getElementById(`${projectAnchor(project.id)}-link`);
    const previousOverflow = document.body.style.overflow;

    // aria-modal sólo afecta a la tecnología asistiva: el teclado sigue
    // saliendo del modal. inert es lo que realmente saca al fondo de juego.
    // Se marcan todos los hermanos del modal (que vive en un portal sobre
    // <body>), no una lista fija: así entra también el botón flotante.
    const propio = backdropRef.current;
    const fondo = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.inert && el !== propio && !el.contains(propio),
    );
    fondo.forEach((el) => el.setAttribute("inert", ""));

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null || el === closeRef.current);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.repeat) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Ciclo cerrado: del último vuelve al primero y viceversa.
      const items = focusables();
      if (items.length === 0) return;
      const primero = items[0];
      const ultimo = items[items.length - 1];
      const activo = document.activeElement;
      if (e.shiftKey && (activo === primero || !panelRef.current?.contains(activo))) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && activo === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      fondo.forEach((el) => el.removeAttribute("inert"));
      trigger?.focus({ preventScroll: true });
    };
  }, [onClose, project.id]);

  const highlights = tItem.raw("highlights") as string[];

  // Portal a <body>: si el modal se queda dentro de <main>, el inert que
  // desactiva el fondo lo desactiva también a él y deja de recibir foco.
  return createPortal(
    <div
      ref={backdropRef}
      className="modal-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={panelRef}
        className="modal-panel relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-line-2 bg-bg-2 sm:max-h-[88vh] sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-line px-4 py-1.5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-foreground underline-offset-4 hover:underline"
            >
              <Link2 className="size-4 text-accent" aria-hidden />
              <span aria-live="polite">{t(copied ? "copied" : "copyLink")}</span>
            </button>
            <div className="flex items-center gap-2">
              <LanguageToggle anchor={projectAnchor(project.id)} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("close")}
                className="inline-flex size-11 items-center justify-center rounded-md text-foreground hover:bg-surface-2"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </div>
          {manualLink && (
            <input
              aria-label={t("manualCopy")}
              readOnly
              value={manualLink}
              ref={(field) => field?.focus()}
              onFocus={(event) => event.currentTarget.select()}
              className="mb-2 w-full rounded border border-line-2 bg-background p-2 font-mono text-sm"
            />
          )}
        </div>

        <div className="overflow-y-auto overscroll-contain">
          <ProjectArtwork project={project} detail />

          <div className="p-6 sm:p-8">
            {/* Tipo de proyecto */}
            <span className="data-label inline-flex items-center gap-1.5 text-muted-2">
              {project.link ? (
                t("clientLabel")
              ) : (
                <>
                  <Lock className="size-3" />
                  {t("internalLabel")}
                </>
              )}
            </span>

            <h3
              id="project-modal-title"
              className="mt-3 text-2xl font-black tracking-tight sm:text-3xl"
            >
              {tItem("name")}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {tItem("longDesc")}
            </p>

            {/* Destacados */}
            {highlights?.length > 0 && (
              <div className="mt-7">
                <h4 className="data-label border-b border-line-2 pb-2.5 text-muted-2">
                  {t("highlightsLabel")}
                </h4>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stack */}
            <div className="mt-7">
              <h4 className="data-label border-b border-line-2 pb-2.5 text-muted-2">
                {t("stackLabel")}
              </h4>
              <p className="mt-3 font-mono text-[13px] text-muted">
                {project.tags.join(" · ")}
              </p>
            </div>

            {/* Link externo (solo proyectos con URL) */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-contrast transition-transform hover:-translate-y-0.5"
              >
                {t("visitLabel")}
                <ExternalLink className="size-4" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
