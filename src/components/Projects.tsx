"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Lock } from "lucide-react";
import Section from "./Section";
import ProjectArtwork from "./ProjectArtwork";
import ProjectModal from "./ProjectModal";
import { projects, featuredProjectId, projectAnchor, type Project } from "@/lib/content";

function subscribeToHash(notify: () => void) {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
}

function ProjectTitleLink({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const t = useTranslations("projects");
  const name = t(`items.${project.id}.name`);
  const anchor = projectAnchor(project.id);

  return (
    <a
      id={`${anchor}-link`}
      href={`#${anchor}`}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${name} — ${t("detailsLabel")}`}
      className="after:absolute after:inset-0 after:z-10 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
    >
      {name}
    </a>
  );
}

function VisitLink({ href, name }: { href: string; name: string }) {
  const t = useTranslations("projects");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("visitLabel")}: ${name}`}
      className="relative z-20 -my-2 inline-flex items-center gap-1.5 py-2 text-sm font-bold text-accent underline-offset-4 hover:underline"
    >
      {t("visitLabel")}
      <ExternalLink className="size-4" aria-hidden />
    </a>
  );
}

type ProjectCardProps = { project: Project; onOpen: () => void };

function FeaturedProject({ project, onOpen }: ProjectCardProps) {
  const t = useTranslations("projects");
  return (
    <article
      id={projectAnchor(project.id)}
      className="group relative isolate grid rounded-lg border border-line-2 bg-bg-2 transition-colors hover:border-accent/70 lg:grid-cols-[1fr_1.12fr]"
    >
      <div className="flex min-w-0 flex-col items-start justify-center p-5 sm:p-8 lg:p-10">
        <p className="font-mono text-xs font-bold tracking-wide text-accent">{t("featuredLabel")}</p>
        <h3 className="mt-3 text-2xl leading-tight font-black tracking-tight sm:text-3xl">
          <ProjectTitleLink project={project} onOpen={onOpen} />
        </h3>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">{t(`items.${project.id}.desc`)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <span aria-hidden className="text-sm font-bold text-accent underline underline-offset-4">{t("detailsLabel")}</span>
          {project.link && <VisitLink href={project.link} name={t(`items.${project.id}.name`)} />}
        </div>
      </div>
      <div className="flex min-w-0 flex-col overflow-hidden rounded-b-lg border-t border-line-2 lg:rounded-l-none lg:rounded-r-lg lg:border-t-0 lg:border-l">
        <ProjectArtwork project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const t = useTranslations("projects");
  return (
    <article id={projectAnchor(project.id)} className="group relative isolate flex flex-col items-start">
      <ProjectArtwork project={project} />
      <h3 className="mt-4 w-full text-xl font-bold tracking-tight group-hover:underline">
        <ProjectTitleLink project={project} onOpen={onOpen} />
      </h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{t(`items.${project.id}.desc`)}</p>
      <p className="mt-3 font-mono text-xs text-muted-2">{project.tags.join(" · ")}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="data-label inline-flex items-center gap-1.5 text-muted-2">
          {!project.link && <Lock className="size-3" aria-hidden />}
          {t(project.link ? "clientLabel" : "internalLabel")}
        </span>
        {project.link && <VisitLink href={project.link} name={t(`items.${project.id}.name`)} />}
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  const selected = projects.find((project) => hash === `#${projectAnchor(project.id)}`);
  const openedFromPage = useRef<string | null>(null);

  const closeProject = useCallback(() => {
    if (openedFromPage.current === window.location.hash) {
      window.history.back();
    } else {
      window.location.replace("#proyectos");
    }
  }, []);

  const featured = projects.find((project) => project.id === featuredProjectId);
  const rest = projects.filter((project) => project.id !== featuredProjectId);

  function rememberOpener(project: Project) {
    openedFromPage.current = `#${projectAnchor(project.id)}`;
  }

  return (
    <Section id="proyectos" title={t("heading")} subtitle={t("subtitle")}>
      <div className="space-y-12">
        {featured && <FeaturedProject project={featured} onOpen={() => rememberOpener(featured)} />}
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => rememberOpener(project)} />
          ))}
        </div>
      </div>
      {selected && <ProjectModal key={selected.id} project={selected} onClose={closeProject} />}
    </Section>
  );
}
