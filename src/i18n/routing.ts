import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Idiomas soportados
  locales: ["es", "en"],
  // Español por defecto (clientes locales); inglés para el exterior
  defaultLocale: "es",
});

export type Locale = (typeof routing.locales)[number];
