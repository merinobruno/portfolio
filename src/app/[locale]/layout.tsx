import type { Metadata } from "next";
import { Chivo, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// La URL vive una sola vez, en siteConfig (la usan también sitemap y robots).
const SITE_URL = siteConfig.url;

// Genera las versiones estáticas /es y /en en build
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  // Preview al compartir (WhatsApp, LinkedIn): una imagen por idioma.
  const ogImage = locale === "en" ? "/og-en.png" : "/og.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "Bruno Merino" }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      url: `${SITE_URL}/${locale}`,
      title: t("title"),
      description: t("description"),
      siteName: "Bruno Merino",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Bruno Merino — ${t("title")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Habilita render estático para este locale
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${chivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
