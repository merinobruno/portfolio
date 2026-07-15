"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ExternalLink, Lock, Check, FolderGit2 } from "lucide-react";
import type { Project } from "@/lib/content";

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

  // Cerrar con ESC, bloquear scroll del fondo y enfocar el botón cerrar.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const highlights = tItem.raw("highlights") as string[];

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="modal-panel relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-line-2 bg-bg-2 sm:max-h-[88vh] sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-md border border-line-2 bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-surface-2"
        >
          <X className="size-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Imagen */}
          <div className="relative aspect-[16/10] w-full border-b border-line bg-background">
            {project.image ? (
              <Image
                src={project.image}
                alt={tItem("name")}
                fill
                sizes="(max-width: 640px) 100vw, 672px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <FolderGit2 className="size-10 text-muted-2" />
              </div>
            )}
          </div>

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
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
