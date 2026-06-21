import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${siteConfig.url}/es`,
        en: `${siteConfig.url}/en`,
      },
    },
  }));
}
