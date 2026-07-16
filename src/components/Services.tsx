import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Section from "./Section";
import { servicesBlockA, servicesBlockB } from "@/lib/content";

type Item = { id: string; icon: LucideIcon; hasNote?: boolean };
type BlockId = "blockA" | "blockB";

/* ------------------------------------------------------------------ */
/* Ilustraciones de línea (una por mesa). Solo gráficas, sin texto.    */
/* ------------------------------------------------------------------ */

// Mesa 1: ventana de navegador + celular, con el flujo entre ambos.
function CodeArt() {
  return (
    <svg
      viewBox="0 0 440 240"
      fill="none"
      strokeWidth="1.5"
      className="w-full"
      aria-hidden="true"
    >
      {/* ventana navegador */}
      <rect className="stroke-line-2" x="14" y="18" width="270" height="190" rx="6" />
      <line className="stroke-line-2" x1="14" y1="46" x2="284" y2="46" />
      <rect className="stroke-white/35" x="30" y="25" width="130" height="14" rx="7" />
      <circle className="stroke-white/35" cx="236" cy="32" r="4" />
      <circle className="stroke-white/35" cx="252" cy="32" r="4" />
      <circle className="fill-accent" cx="268" cy="32" r="4" />
      {/* contenido: hero de una web */}
      <rect className="fill-accent" x="34" y="66" width="90" height="12" rx="2" />
      <rect className="fill-white/25" x="34" y="86" width="150" height="8" rx="2" />
      <rect className="fill-white/25" x="34" y="100" width="120" height="8" rx="2" />
      <rect className="stroke-accent" x="34" y="120" width="64" height="20" rx="3" />
      <rect className="stroke-white/35" x="196" y="66" width="70" height="74" rx="4" />
      <rect className="fill-white/25" x="34" y="158" width="60" height="34" rx="3" />
      <rect className="fill-white/25" x="104" y="158" width="60" height="34" rx="3" />
      <rect className="fill-white/25" x="174" y="158" width="60" height="34" rx="3" />
      {/* celular */}
      <rect className="stroke-line-2" x="310" y="52" width="92" height="166" rx="10" />
      <line className="stroke-line-2" x1="342" y1="64" x2="370" y2="64" />
      <rect className="fill-accent" x="326" y="82" width="42" height="9" rx="2" />
      <rect className="fill-white/25" x="326" y="99" width="60" height="7" rx="2" />
      <rect className="fill-white/25" x="326" y="112" width="52" height="7" rx="2" />
      <rect className="stroke-white/35" x="326" y="130" width="60" height="26" rx="3" />
      <rect className="stroke-accent" x="326" y="166" width="60" height="18" rx="3" />
      {/* flujo entre ambos */}
      <path
        className="stroke-accent"
        d="M284 120 C 300 120, 296 90, 310 90"
        strokeDasharray="4 5"
      />
    </svg>
  );
}

// Mesa 2: placa madre con CPU, RAM, GPU, conector ATX y pines del panel.
function MachineArt() {
  return (
    <svg
      viewBox="0 0 440 250"
      fill="none"
      strokeWidth="1.5"
      className="w-full"
      aria-hidden="true"
    >
      {/* PCB */}
      <rect className="stroke-white/35" x="100" y="18" width="240" height="214" rx="6" />
      <circle className="stroke-white/35" cx="112" cy="30" r="2" />
      <circle className="stroke-white/35" cx="328" cy="30" r="2" />
      <circle className="stroke-white/35" cx="112" cy="220" r="2" />
      <circle className="stroke-white/35" cx="328" cy="220" r="2" />
      {/* CPU: socket + cooler */}
      <rect className="stroke-line-2" x="130" y="46" width="58" height="58" rx="3" />
      <circle className="stroke-white/35" cx="159" cy="75" r="22" />
      <path
        className="stroke-white/35"
        d="M159 55 a20 20 0 0 1 17 11 M159 95 a20 20 0 0 1 -17 -11 M141 66 a20 20 0 0 1 6 -8"
      />
      <circle className="fill-accent" cx="159" cy="75" r="3.5" />
      {/* RAM x4, intercaladas */}
      <rect className="stroke-white/35" x="232" y="42" width="7" height="90" rx="1.5" />
      <rect className="stroke-accent" x="245" y="42" width="7" height="90" rx="1.5" />
      <rect className="stroke-white/35" x="258" y="42" width="7" height="90" rx="1.5" />
      <rect className="stroke-accent" x="271" y="42" width="7" height="90" rx="1.5" />
      <path className="stroke-white/35" d="M232 87h7M258 87h7" />
      <path className="stroke-accent" d="M245 87h7M271 87h7" />
      {/* conector ATX 20 pines */}
      <rect className="stroke-white/35" x="306" y="48" width="16" height="80" rx="2" />
      <path className="stroke-white/35" d="M311 54v68" strokeDasharray="2.4 4.9" />
      <path className="stroke-white/35" d="M317 54v68" strokeDasharray="2.4 4.9" />
      {/* pines del panel frontal */}
      <path className="stroke-white/35" d="M298 205h32" strokeDasharray="3 3.6" />
      <path className="stroke-white/35" d="M298 212h25" strokeDasharray="3 3.6" />
      <rect className="fill-accent" x="327" y="210.5" width="3" height="3" />
      {/* GPU */}
      <line className="stroke-white/35" x1="124" y1="146" x2="304" y2="146" />
      <rect className="stroke-line-2" x="124" y="154" width="180" height="42" rx="4" />
      <circle className="stroke-white/35" cx="164" cy="175" r="15" />
      <path
        className="stroke-white/35"
        d="M164 162 a13 13 0 0 1 11 7 M164 188 a13 13 0 0 1 -11 -7"
      />
      <circle className="fill-accent" cx="164" cy="175" r="2.6" />
      <circle className="stroke-white/35" cx="222" cy="175" r="15" />
      <path
        className="stroke-white/35"
        d="M222 162 a13 13 0 0 1 11 7 M222 188 a13 13 0 0 1 -11 -7"
      />
      <circle className="fill-accent" cx="222" cy="175" r="2.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function ServiceRow({ item, block }: { item: Item; block: BlockId }) {
  const t = useTranslations(`services.${block}.items.${item.id}`);
  const Icon = item.icon;

  return (
    <div className="relative border-t border-line py-4 pl-8">
      <Icon className="absolute left-0 top-[21px] size-[18px] text-accent" aria-hidden />
      <p className="text-[15px] leading-relaxed text-muted">
        <span className="font-bold text-foreground">{t("title")}</span>
        {" · "}
        {t("desc")}
      </p>
      {item.hasNote && (
        <p className="mt-2 font-mono text-xs leading-relaxed text-muted-2">
          › {t("note")}
        </p>
      )}
    </div>
  );
}

// Una "mesa" del taller: etiqueta, nombre, ilustración y sus servicios.
function World({
  block,
  items,
  art,
}: {
  block: BlockId;
  items: Item[];
  art: ReactNode;
}) {
  const t = useTranslations(`services.${block}`);

  return (
    <div className="p-6 sm:p-9">
      <p className="data-label text-accent">
        {t("label")} · {t("title")}
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
        {t("world")}
      </h3>
      <div className="mx-auto my-6 max-w-md sm:my-8">{art}</div>
      <div>
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
      <div className="border border-line">
        <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <World block="blockA" items={servicesBlockA} art={<CodeArt />} />
          <World block="blockB" items={servicesBlockB} art={<MachineArt />} />
        </div>
        {/* Pie compartido de las dos mesas */}
        <div className="flex flex-col gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="font-mono text-xs leading-relaxed text-muted">
            <span className="text-accent">› </span>
            {t("footNote")}
          </p>
          <a
            href="#contacto"
            className="inline-flex self-start rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-contrast transition-transform hover:-translate-y-0.5 sm:self-auto"
          >
            {t("footCta")}
          </a>
        </div>
      </div>
    </Section>
  );
}
