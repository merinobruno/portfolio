import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import Section from "./Section";
import { servicesBlockA, servicesBlockB } from "@/lib/content";

type Item = { id: string; icon: LucideIcon; hasNote?: boolean };

// Fila de servicio: sin card, separada por reglas. Ícono chico y alineado
// al título; la nota (cobertura geográfica) va como dato en mono.
function ServiceRow({ item, block }: { item: Item; block: "blockA" | "blockB" }) {
  const t = useTranslations(`services.${block}.items.${item.id}`);
  const Icon = item.icon;

  return (
    <div className="py-6 first:pt-0">
      <h4 className="flex items-center gap-3 text-lg font-bold">
        <Icon className="size-[18px] shrink-0 text-accent" />
        {t("title")}
      </h4>
      <p className="mt-2 pl-[30px] text-[15px] leading-relaxed text-muted">
        {t("desc")}
      </p>
      {item.hasNote && (
        <p className="mt-3 ml-[30px] max-w-md border border-line bg-surface px-3 py-2 font-mono text-xs leading-relaxed text-muted">
          {t("note")}
        </p>
      )}
    </div>
  );
}

function ServiceBlock({
  block,
  items,
}: {
  block: "blockA" | "blockB";
  items: Item[];
}) {
  const t = useTranslations(`services.${block}`);

  return (
    <div>
      <h3 className="data-label border-b border-line-2 pb-3 text-muted-2">
        {t("title")}
      </h3>
      <div className="mt-6 divide-y divide-line">
        {items.map((item) => (
          <ServiceRow key={item.id} item={item} block={block} />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const t = useTranslations("services");

  return (
    <Section id="servicios" title={t("heading")} subtitle={t("subtitle")}>
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <ServiceBlock block="blockA" items={servicesBlockA} />
        <ServiceBlock block="blockB" items={servicesBlockB} />
      </div>
    </Section>
  );
}
