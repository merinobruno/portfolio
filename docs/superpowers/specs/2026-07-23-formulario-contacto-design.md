# Formulario de contacto — Diseño

**Fecha:** 2026-07-23
**Estado:** aprobado, pendiente de implementación

## Problema

La sección de contacto ofrece un botón "Enviar email" que abre un `mailto:`. Eso
saca a la persona del sitio y la deja en Outlook o en el gestor que tenga
configurado — o en ninguno, si usa webmail. Se pierden consultas en ese salto.

**Objetivo:** que la persona escriba y envíe el mensaje sin salir de la página.

## Alcance

Entra:

- Formulario de tres campos (nombre, email, mensaje) en la sección de contacto.
- Endpoint propio que despacha el mail vía Resend.
- Validación, estados de envío, anti-spam y textos en español e inglés.
- Corrección del dominio hardcodeado (ver "Deuda que se salda de paso").

No entra (YAGNI):

- Selector de tipo de consulta, teléfono, adjuntos.
- Captcha.
- Auto-respuesta al visitante.
- Persistencia de los mensajes: el mail es el registro.

## Decisiones tomadas

| Decisión | Elegido | Por qué |
|---|---|---|
| Campos | Nombre, email, mensaje | Mínima fricción; el resto se charla después por mail o WhatsApp. |
| Layout | Formulario a lo ancho, campos con regla inferior | Coherente con la identidad "ficha de taller": reglas finas, sin cards. Mockup 3 de `design-mockups/contacto/`. |
| Envío | Resend vía `fetch` | Estándar con Next.js en Vercel, gratis para este volumen, sin marca de terceros. Se llama por HTTP para no sumar el SDK: el proyecto conserva sus cinco dependencias. |
| Remitente | `onboarding@resend.dev` | Sin verificación de DNS. Funciona porque Bruno es el único destinatario. Migrar a `contacto@brunomerino.com` es cambiar una constante. |
| Anti-spam | Honeypot + límite por IP | Sin fricción para el visitante y sin terceros. |

## Arquitectura

### Piezas nuevas

| Archivo | Responsabilidad |
|---|---|
| `src/lib/contact-schema.ts` | Las reglas de validación y sus códigos de error. Sin dependencias, sin I/O, testeable sola. La usan cliente y servidor. |
| `src/components/ContactForm.tsx` | Client component: campos, estado del envío, render de éxito y error. |
| `src/app/api/contacto/route.ts` | Route Handler `POST`: revalida, filtra bots, llama a Resend, traduce fallas a códigos HTTP. |

`Contact.tsx` sigue siendo server component y monta `<ContactForm />`. Así solo
viaja al navegador el JavaScript del formulario, no el de la sección entera.

El middleware (`src/proxy.ts`) ya excluye `/api` de su matcher, así que el
endpoint no pasa por el enrutado de i18n. No hay que tocarlo.

### Flujo

1. La persona completa los campos y envía.
2. El cliente valida con `contact-schema`. Si falla, marca los campos y no postea.
3. `POST /api/contacto` con `{ nombre, email, mensaje, empresa }` en JSON
   (`empresa` es el honeypot).
4. El servidor revalida con el mismo módulo. Nunca confía en el cliente.
5. Si `empresa` viene con contenido: responde `200 {ok:true}` y descarta el
   mensaje. Al bot no se le avisa que lo detectaron.
6. Llama a `https://api.resend.com/emails` con la API key del entorno.
7. Responde `200` o un error tipado. La UI muestra confirmación o fallback.

### El mail que llega

- **to:** `siteConfig.email`
- **from:** `onboarding@resend.dev`
- **reply_to:** el email del visitante — responder desde Gmail le contesta a él.
- **subject:** `Nuevo mensaje de <nombre> — brunomerino.com`
- **body:** texto plano con los tres campos. Sin HTML: es correo interno.

### Configuración

`RESEND_API_KEY` como variable de entorno: en `.env.local` para desarrollo y en
Vercel para producción.

Se documenta en `.env.example`, con la variable vacía. **Ojo:** `.gitignore`
tiene la regla `.env*`, que también atraparía al ejemplo, así que hay que
agregarle la excepción `!.env.example`. El `.env.local` con la key real sigue
fuera de git.

El destinatario sale de `siteConfig.email`, que ya existe.

## Validación

| Campo | Reglas |
|---|---|
| nombre | Requerido. 2 a 100 caracteres. |
| email | Requerido. Formato válido. Máximo 200 caracteres. |
| mensaje | Requerido. 10 a 3000 caracteres. |

El módulo devuelve códigos (`required`, `tooShort`, `invalidEmail`, ...), no
textos. Los textos viven en los archivos de traducción, uno por idioma.

## Estados de la UI

- **Quieto:** los tres campos vacíos y el botón activo.
- **Enviando:** botón deshabilitado con texto de progreso. Evita el doble envío.
- **Enviado:** el formulario se reemplaza por la confirmación, con un link para
  escribir otro mensaje.
- **Error:** mensaje explicativo con WhatsApp como salida alternativa. El
  visitante nunca queda sin camino.

**Accesibilidad:** cada input con su label asociado; los campos con error llevan
`aria-invalid` y `aria-describedby`; el resultado se anuncia con `aria-live` y
recibe el foco.

## Manejo de errores

| Situación | HTTP | Qué ve el visitante |
|---|---|---|
| Datos inválidos | 400 | Los campos marcados con su mensaje. |
| Demasiados envíos | 429 | Pedido de esperar unos minutos. |
| Resend falla o falta la key | 500 | Mensaje genérico y WhatsApp como salida. |

El detalle técnico va a los logs de Vercel, nunca a la pantalla. Si la API key no
está configurada el endpoint responde 500 controlado: el build no se rompe y un
deploy sin la variable no tira el sitio abajo.

## Anti-spam

1. **Honeypot:** campo `empresa`, oculto visualmente y con `tabIndex={-1}` y
   `autoComplete="off"`. Un humano no lo ve ni lo tabula.
2. **Límite por IP:** 3 envíos cada 10 minutos, contados en memoria del proceso.
   **Limitación conocida:** en serverless cada instancia tiene su propia memoria,
   así que frena al bot torpe pero no es una muralla. Suficiente para un
   portfolio; si aparece spam real se migra a un store persistente.
3. **Topes de longitud**, que cortan payloads grandes antes de llamar a Resend.

Sin captcha: agrega fricción al visitante legítimo y suma un tercero más.

## Cambios en lo que ya existe

- **`Contact.tsx`:** se va el botón "Enviar email"; lo reemplaza el formulario.
  Quedan WhatsApp y CV arriba, junto al título. En la línea del pie se mantiene
  la dirección como link: es la salida si el formulario falla, y no contradice el
  requisito porque el camino principal ya no abre ningún gestor de correo.
- **`messages/es.json` y `messages/en.json`:** claves nuevas bajo `contact.form.*`
  (labels, placeholders, botón, estados, cada error, confirmación).

## Deuda que se salda de paso

El sitio hardcodea `https://brunomerino.dev` en dos lugares, pero el dominio real
es **`brunomerino.com`**. Hoy en producción eso hace que el `sitemap.xml` declare
URLs de un dominio ajeno, que los canonical apunten afuera y que la preview de
OpenGraph busque la imagen donde no está — justo al compartir por WhatsApp.

Se corrige y, como la URL estaba duplicada, queda definida una sola vez en
`siteConfig`; `layout.tsx` la importa en lugar de repetirla.

- `src/lib/site.ts:5`
- `src/app/[locale]/layout.tsx:21`

## Verificación

No se da por terminado sin correr esto:

1. **Envío real** con la key en `.env.local`: el mail llega al Gmail con el
   reply-to del visitante.
2. **Validación:** campos vacíos, email mal formado, mensaje demasiado corto.
3. **Honeypot:** `curl` con `empresa` llena responde 200 y no envía nada.
4. **Error de servidor:** con una key inválida, la UI muestra el fallback.
5. **Ambos idiomas** (`/es` y `/en`) y **mobile**.
6. `tsc --noEmit`, `eslint` y `next build` limpios.

## Riesgos

- **El plan gratuito de Resend limita a 100 mails por día.** Sobra para un
  portfolio; si se supera, el endpoint devuelve 500 y el visitante cae al
  fallback de WhatsApp.
- **El límite por IP no es infalible** en serverless, como se explicó arriba.
- **Mientras el remitente sea `onboarding@resend.dev`**, solo se puede enviar a
  la casilla de la cuenta de Resend. Si algún día se quiere copiar a otra
  dirección, hay que verificar el dominio primero.
