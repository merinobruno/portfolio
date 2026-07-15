// Datos de contacto y constantes globales del sitio (no traducibles).

export const siteConfig = {
  name: "Bruno Merino",
  url: "https://brunomerino.dev",
  email: "brunoezequiel.merino@gmail.com",
  // Número en formato internacional sin signos para links wa.me
  whatsappNumber: "542996731008",
  whatsappDisplay: "+54 299 673-1008",
  // CV: subir el PDF a /public y mantener este path
  cvPath: "/cv-bruno-merino.pdf",
  // Ubicación (nombres propios, no se traducen)
  location: "Cipolletti · Neuquén, AR",
} as const;

/** Construye un link de WhatsApp con mensaje pre-cargado. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mailtoLink = `mailto:${siteConfig.email}`;
