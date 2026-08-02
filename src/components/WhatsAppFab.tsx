"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

// Botón flotante de WhatsApp, siempre visible (mobile-first) salvo dentro de la
// sección de contacto: ahí es redundante —ya hay un CTA de WhatsApp— y además
// se superponía al link de email en pantallas chicas.
export default function WhatsAppFab() {
  const t = useTranslations("a11y");
  const [enContacto, setEnContacto] = useState(false);

  useEffect(() => {
    const contacto = document.getElementById("contacto");
    if (!contacto) return;
    const io = new IntersectionObserver(
      ([entrada]) => setEnContacto(entrada.isIntersecting),
      { threshold: 0.12 },
    );
    io.observe(contacto);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappFloat")}
      // Oculto también para teclado y lectores: un control invisible no debe
      // recibir foco ni anunciarse.
      aria-hidden={enContacto}
      tabIndex={enContacto ? -1 : undefined}
      className={`fixed right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-[0_10px_30px_-6px_rgba(0,0,0,0.55)] ring-1 ring-background/30 transition-[opacity,transform] duration-300 ease-out hover:scale-105 active:scale-95 ${
        enContacto ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
      }`}
      // Respeta el notch y la barra de gestos de los teléfonos modernos.
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
