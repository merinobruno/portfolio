import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Section from "./Section";
import { servicesBlockA, servicesBlockB } from "@/lib/content";

type Item = { id: string; icon: LucideIcon; hasNote?: boolean };

function ServiceCard({
  item,
  block,
}: {
  item: Item;
  block: "blockA" | "blockB";
}) {
  const t = useTranslations(`services.${block}.items.${item.id}`);
  const Icon = item.icon;

  return (
    <div className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-line-2 hover:bg-surface-2">
      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-line bg-accent-soft text-accent">
        <Icon className="size-5" />
      </div>
      <h4 className="text-lg font-semibold">{t("title")}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("desc")}</p>
      {item.hasNote && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-background/60 p-3 text-xs leading-relaxed text-muted-2">
          <Info className="mt-0.5 size-3.5 shrink-0 text-accent" />
          {t("note")}
        </p>
      )}
    </div>
  );
}

function BlockHeading({ block }: { block: "blockA" | "blockB" }) {
  const t = useTranslations(`services.${block}`);
  return (
    <div className="mb-6 flex items-center gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">
        {t("title")}
      </h3>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export default function Services() {
  const t = useTranslations("services");

  return (
    <Section
      id="servicios"
      eyebrow={t("eyebrow")}
      title={t("heading")}
      subtitle={t("subtitle")}
    >
      <div className="space-y-12">
        <div>
          <BlockHeading block="blockA" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesBlockA.map((item) => (
              <ServiceCard key={item.id} item={item} block="blockA" />
            ))}
          </div>
        </div>

        <div>
          <BlockHeading block="blockB" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesBlockB.map((item) => (
              <ServiceCard key={item.id} item={item} block="blockB" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
