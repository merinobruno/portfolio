import Image from "next/image";
import { useTranslations } from "next-intl";
import { AudioLines, Check, FolderGit2 } from "lucide-react";
import type { Project } from "@/lib/content";

function WhatsAppExample() {
  const t = useTranslations("projects.items.wpp.example");

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center bg-[#14251e] bg-[radial-gradient(ellipse_at_top_left,#244834_0%,transparent_68%)] p-5 sm:px-9 sm:py-7">
      <figure className="mx-auto w-full max-w-md">
        <figcaption className="mb-3 font-mono text-xs text-[#b0c7b8]">{t("caption")}</figcaption>
        <div className="max-w-[94%] rounded-xl rounded-bl-sm border border-[#3f7053] bg-[#204230] p-4 sm:p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-[#b1f4c6]">
            <AudioLines className="size-5 shrink-0" aria-hidden />
            {t("voice")}
          </p>
          <blockquote className="mt-2 text-base font-medium leading-snug text-foreground sm:text-lg">
            “{t("transcript")}”
          </blockquote>
        </div>
        <div className="ml-6 h-4 border-l border-dashed border-[#729882]" aria-hidden />
        <div className="ml-4 rounded-md border border-[#496255] bg-[#101c16] p-4">
          <p className="flex items-center gap-2 font-mono text-xs text-[#b0c7b8]">
            <Check className="size-4 text-accent" aria-hidden />
            {t("record")}
          </p>
          <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-[#354b3d] pt-2">
            <span className="font-bold leading-tight text-foreground">{t("task")}</span>
            <strong className="shrink-0 font-mono text-lg text-accent">{t("duration")}</strong>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default function ProjectArtwork({ project, detail = false }: { project: Project; detail?: boolean }) {
  const t = useTranslations(`projects.items.${project.id}`);
  if (project.id === "wpp") return <WhatsAppExample />;

  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden border-line bg-bg-2 ${detail ? "border-b" : "border"}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={t("name")}
          fill
          sizes={detail ? "(max-width: 680px) 100vw, 672px" : "(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 528px"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <FolderGit2 className="size-10 text-muted-2" aria-hidden />
        </div>
      )}
    </div>
  );
}
