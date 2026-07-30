// Reglas de validación del formulario de contacto.
// Vive acá porque la usan los dos lados: el cliente para avisar al instante y
// el servidor para no confiar en el cliente. Sin dependencias ni I/O.
// Devuelve códigos, no textos: los textos viven en /messages, uno por idioma.

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 200,
  messageMin: 10,
  messageMax: 3000,
} as const;

export type ContactField = "name" | "email" | "message";
export type ErrorCode = "required" | "tooShort" | "tooLong" | "invalidEmail";
export type ContactErrors = Partial<Record<ContactField, ErrorCode>>;

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

// Deliberadamente permisiva: valida la forma, no la existencia de la casilla.
// Una regex estricta rechaza direcciones válidas y no aporta nada real.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Normaliza lo que llega del formulario o del request. */
export function parseContactInput(raw: unknown): ContactInput {
  const obj = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  return {
    name: str(obj.name),
    email: str(obj.email),
    message: str(obj.message),
  };
}

/** Devuelve un código por campo inválido. Objeto vacío = todo bien. */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "required";
  else if (input.name.length < LIMITS.nameMin) errors.name = "tooShort";
  else if (input.name.length > LIMITS.nameMax) errors.name = "tooLong";

  if (!input.email) errors.email = "required";
  else if (input.email.length > LIMITS.emailMax) errors.email = "tooLong";
  else if (!EMAIL_RE.test(input.email)) errors.email = "invalidEmail";

  if (!input.message) errors.message = "required";
  else if (input.message.length < LIMITS.messageMin) errors.message = "tooShort";
  else if (input.message.length > LIMITS.messageMax) errors.message = "tooLong";

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
