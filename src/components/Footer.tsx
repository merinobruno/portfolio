import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center font-mono text-xs text-muted-2 sm:px-8 sm:text-left">
        <p>
          © {year} Bruno Merino. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
