"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactField,
  LIMITS,
} from "@/lib/contact-schema";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

// Campos sin caja, sólo subrayado: el mismo lenguaje de reglas finas del resto
// del sitio. El foco engrosa la línea, que es lo que marca dónde estás.
const fieldClass =
  "w-full border-b-2 border-line-on-accent-2 bg-transparent py-2.5 text-[17px] " +
  "text-accent-contrast outline-none transition-colors " +
  // /70 y no menos: por debajo de eso el placeholder no llega a 4.5:1 sobre el verde.
  "placeholder:text-accent-contrast/70 focus:border-accent-contrast";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [rateLimited, setRateLimited] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // El foco se mueve a la confirmación recién cuando React la montó. Con
  // requestAnimationFrame el nodo todavía no existe y el foco se pierde.
  useEffect(() => {
    if (status === "sent") resultRef.current?.focus();
  }, [status]);

  function errorText(field: ContactField): string | null {
    const code = errors[field];
    return code ? t(`errors.${field}.${code}`) : null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const found = validateContact(input);
    setErrors(found);
    if (hasErrors(found)) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          empresa: String(data.get("empresa") ?? ""),
        }),
      });

      if (res.ok) {
        formRef.current?.reset();
        setStatus("sent");
        return;
      }

      const payload = (await res.json().catch(() => null)) as {
        error?: string;
        errors?: ContactErrors;
      } | null;

      if (res.status === 400 && payload?.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }

      // Se distingue el 429 para mostrar "esperá un poco" en vez del genérico.
      setErrors({});
      setRateLimited(res.status === 429);
      setStatus("error");
    } catch {
      setRateLimited(false);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mt-14 border-t-2 border-accent-contrast pt-8 outline-none"
      >
        <p className="flex items-center gap-2.5 text-2xl font-black tracking-tight sm:text-3xl">
          <Check className="size-7 shrink-0" aria-hidden />
          {t("sentTitle")}
        </p>
        <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-accent-contrast/80">
          {t("sentBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-sm underline underline-offset-4"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-14">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <Field
          id="name"
          label={t("name")}
          placeholder={t("namePlaceholder")}
          error={errorText("name")}
          maxLength={LIMITS.nameMax}
        />
        <Field
          id="email"
          type="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          error={errorText("email")}
          maxLength={LIMITS.emailMax}
        />
      </div>

      <div className="mt-8 sm:mt-10">
        <label htmlFor="message" className="data-label block text-accent-contrast/70">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={LIMITS.messageMax}
          placeholder={t("messagePlaceholder")}
          aria-invalid={errorText("message") ? true : undefined}
          aria-describedby={errorText("message") ? "message-error" : undefined}
          className={`${fieldClass} mt-2.5 resize-y leading-relaxed`}
        />
        {errorText("message") && (
          <p id="message-error" className="mt-2 font-mono text-xs font-bold">
            {errorText("message")}
          </p>
        )}
      </div>

      {/* Honeypot: invisible para una persona, tentador para un bot. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="empresa">{t("honeypot")}</label>
        <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-accent-contrast px-7 py-3.5 text-sm font-bold text-accent transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
        >
          {status === "sending" ? t("sending") : t("submit")}
          {status !== "sending" && <ArrowRight className="size-4" aria-hidden />}
        </button>

        <p className="font-mono text-xs text-accent-contrast/70" aria-live="polite">
          {status === "error" ? (
            <span className="font-bold">
              {rateLimited ? t("errorRate") : t("errorServer")}{" "}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-4"
              >
                <MessageCircle className="size-3.5" aria-hidden />
                {t("errorWhatsapp")}
              </a>
            </span>
          ) : (
            t("reply")
          )}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  placeholder,
  error,
  type = "text",
  maxLength,
}: {
  id: ContactField;
  label: string;
  placeholder: string;
  error: string | null;
  type?: string;
  maxLength: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="data-label block text-accent-contrast/70">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} mt-2.5`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 font-mono text-xs font-bold">
          {error}
        </p>
      )}
    </div>
  );
}
