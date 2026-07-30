import { NextResponse } from "next/server";
import {
  hasErrors,
  parseContactInput,
  validateContact,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

// Endpoint del formulario de contacto. Despacha por Resend vía HTTP: su API es
// un POST simple, así que no hace falta sumar el SDK como dependencia.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Sin dominio verificado, Resend sólo entrega a la casilla de la cuenta —que es
// la de Bruno—. Verificar brunomerino.com después es cambiar esta constante.
const FROM = "Portfolio <onboarding@resend.dev>";

// Límite por IP. Vive en memoria del proceso: en serverless cada instancia tiene
// la suya, así que frena al bot torpe pero no es una muralla. Alcanza para un
// portfolio; si aparece spam real, migrar a un store persistente.
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );

  // Poda de IPs vencidas para que el Map no crezca sin techo.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "desconocida";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "badRequest" }, { status: 400 });
  }

  // Honeypot: campo oculto que un humano no ve ni tabula. Si viene con algo,
  // se responde 200 y se descarta. Al bot no se le avisa que lo detectaron.
  const honeypot = (body as { empresa?: unknown } | null)?.empresa;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const input = parseContactInput(body);
  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "validation", errors }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rateLimit" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Falta la variable de entorno: se registra y se devuelve un error
    // controlado. Un deploy sin la key no debe romper el sitio.
    console.error("[contacto] Falta RESEND_API_KEY");
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [siteConfig.email],
        // Clave: responder desde Gmail le contesta al visitante, no a Resend.
        reply_to: input.email,
        subject: `Nuevo mensaje de ${input.name} — brunomerino.com`,
        text: [
          `Nombre: ${input.name}`,
          `Email:  ${input.email}`,
          "",
          input.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[contacto] Resend respondió ${res.status}: ${detail}`);
      return NextResponse.json({ error: "server" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contacto] Falló el envío:", err);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
