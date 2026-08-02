---
target: la home del portfolio
total_score: 26
p0_count: 2
p1_count: 3
timestamp: 2026-08-02T06-00-33Z
slug: src-app-locale-page-tsx
---
Method: dual-agent (A: revisión de diseño · B: detector + evidencia de navegador, aislados y en paralelo)

## Design Health Score

| # | Heurística | Score | Problema clave |
|---|-----------|-------|----------------|
| 1 | Visibilidad del estado | 2 | Al fallar el envío, la única región `aria-live` sigue diciendo "Te respondo dentro de las 24 hs hábiles" mientras aparecen 3 errores. Las 4 cards de grilla no comunican que son clickeables. |
| 2 | Correspondencia con el mundo real | 4 | "Qué te llevás / Qué necesito de vos", voseo consistente, inglés reescrito y no traducido. Único roce: "Perfil técnico" es jerga de reclutador en un nav que también lee un cliente. |
| 3 | Control y libertad | 3 | El menú móvil no cierra con Escape. Al cerrar el modal el foco vuelve a `<body>` con scrollY 2908. |
| 4 | Consistencia y estándares | 2 | El proyecto destacado rompe tres convenciones propias (sin etiqueta cliente/interno, único con `<h3>`, único con "Ver detalle" en texto). En inglés su título sigue en español. 4 de 5 títulos de proyecto no son headings. |
| 5 | Prevención de errores | 2 | Cero `autoComplete` en nombre/email. `noValidate` saca la red del navegador sin reemplazarla. Ningún campo indica que es obligatorio. |
| 6 | Reconocimiento vs. recuerdo | 3 | El CV no existe en el header desktop: está a ~6.000px, dentro de la sección de ventas. |
| 7 | Flexibilidad y eficiencia | 2 | Los 4 links de WhatsApp son la URL pelada. `whatsappLink(message?)` acepta un mensaje y nunca se usa con argumento. |
| 8 | Estético y minimalista | 3 | Sistema fuerte y disciplinado; lo rompen las 5 imágenes de proyecto, que son 5 registros visuales distintos. El textarea mide 1088px de ancho en desktop. |
| 9 | Recuperación de errores | 2 | Los textos son de los mejores posibles y distinguir 429 de 500 es fino, pero al fallar no se mueve el foco, no hay resumen, no hay anuncio ni scroll al primer error. |
| 10 | Ayuda y documentación | 3 | La sección Proceso *es* la documentación y es excelente. Falta rango de precios; la cobertura geográfica está enterrada en una nota mono. |
| **Total** | | **26/40** | **Acceptable (20–27)** |

## Anti-Patterns Verdict

**Evaluación LLM (A).** Aprueba con una excepción concreta.

- **Primer orden:** falla parcialmente. "Portfolio de dev" predice casi-negro + acento verde, y el sitio es casi-negro + acento verde. Lo salva la ejecución: el fondo es grafito verdoso, no azul-negro, y no hay una sola card con `rounded-2xl bg-white/5`; la estructura es reglas de 1px y listas de definición, la gramática opuesta.
- **Segundo orden:** aprueba. Las salidas predecibles de "no otro dark dev portfolio" son terminal/brutalista, editorial serif, bento o Swiss. Esto aterriza en "documento técnico / ficha de taller", y la ejecución no es derivable de la categoría: la metáfora de dos mesas con ilustraciones dibujadas y el ledger "Qué te llevás / Qué necesito de vos" no salen de un prompt. Chivo en vez de Inter/Geist es decisión, no default.
- **La excepción:** la imagen de FSTrack es el tropo exacto que dispara "esto lo hizo una IA" — dos logos neón unidos por un chorro de luz magenta sobre negro. Es el visual genérico de "integración" y no muestra producto.

**Escaneo determinístico (B).** `detect.mjs` sobre el HTML renderizado (no sobre `src/`: el detector lee HTML/CSS y no escanea `.tsx`, correrlo sobre el código devuelve `[]` y eso no significa limpio). ES: 2 hallazgos. EN: 3.

| Regla | Severidad | ES | EN | Veredicto tras inspeccionar el DOM |
|---|---|---|---|---|
| `border-accent-on-rounded` | warning | sí | sí | **Falso positivo probado.** Los 3 elementos con `border-b-2` tienen `border-radius: 0px` y fondo transparente. Barrido de todo el DOM buscando borde ≥2px *y* radio >0: 0 coincidencias. La regla mira la clase, no la co-ocurrencia. |
| `numbered-section-markers` | advisory | sí | sí | **Falso positivo parcial.** Los 01–04 viven dentro de `<ol><li>`: son ordinales de una secuencia, no eyebrows de sección. Ninguna sección real lleva número. |
| `em-dash-overuse` | warning | no | sí | **Real.** 7 rayas em en cuerpo de texto inglés contra 0 en español. |

El em-dash es asimetría de traducción sistemática: la puntuación elegida en el original se convierte en raya al pasar a inglés. `"...recientes, entre clientes"` → `"...recent work — client projects"`; `"Muy corto: al menos 2"` → `"A bit short — 2 characters"`.

**Overlays visuales:** no se inyectaron. El panel de navegador de este entorno no compositea (`IntersectionObserver` no dispara, `:focus` no matchea), así que un overlay no sería visible. B lo resolvió manejando Edge headless por CDP, que sí compositea: eso permitió recorrer con **Tab real** (no `.focus()` programático) y medir estilos computados dentro del motor. Señal de fallback: evidencia por CDP y CLI, sin overlay en pantalla.

## Overall Impression

La segunda corrida baja de 33 a 26, y hay que decir por qué: **el sitio no empeoró, la primera medición fue floja.** Aquella corrió en un solo contexto y con el panel de navegador roto; ésta corrió con dos evaluaciones aisladas y con un motor que ejecuta Tab de verdad e inspecciona el contenido de las imágenes. Encontró dos P0 que la anterior no vio.

Las cuatro pasadas anteriores hicieron lo que prometieron —el foco unificado mide 11,4:1 mínimo en 30 de 30 paradas, no hay desbordes, no hay fallas de contraste de texto— pero el sitio tiene problemas más profundos que los que aquella corrida miró: publica datos internos del empleador, atrapa a quien navega por teclado detrás de un overlay, y le falla en silencio a quien usa lector de pantalla justo en el punto de conversión.

## What's Working

1. **El sistema de color es accesible medido, no declamado.** 39 combinaciones únicas, todas pasan. Mínimo absoluto 5,32:1 (los `data-label` sobre el verde). Los placeholders al 70% dan 5,32:1: el comentario del código que dice "por debajo de /70 no llega a 4,5:1" quedó verificado por medición independiente.
2. **El foco unificado funciona exactamente como fue diseñado.** Recorrido con Tab real: 31 paradas, las 31 con `:focus-visible`, outline de 2px con offset 3. Mínimo de contraste 11,4:1, y la inversión sobre el verde de contacto opera como dice el comentario.
3. **Las ilustraciones SVG son el activo diferencial.** No son iconos estirados: la placa tiene socket, cooler con aspas, 4 slots de RAM intercalados, ATX de 20 pines y pines de panel frontal. Son la tesis "código y máquina" hecha dibujo.

## Priority Issues

### [P0] La imagen del proyecto destacado publica datos internos del empleador
El difuminado de `whatsapp_asistente_blur.png` es parcial: 4 líneas están borroneadas y **5 quedan legibles**. Se leen `Cliente: FISTERRA SRL` repetido, IDs de ticket internos (2026-540, 447, 383, 175, 129, 128, 21), títulos de ticket ("Implementar Aplicacion Fisterra", "Extractor de CUIT", "03 Configuración de Mail con Usuarios") y el código `*FIS_04* (implementación IT)`. Verificado ampliando la imagen.

**Por qué importa:** Fisterra SRL es su empleador actual. La imagen más grande del sitio publica el backlog interno de la empresa donde trabaja. Un reclutador que lo note lee "no maneja información confidencial", que es lo contrario de lo que el portfolio quiere transmitir. Y el borroneado a medias se ve peor que no haber borroneado nada.

**Fix:** rehacer la captura con datos ficticios (tickets inventados, cliente "Empresa Demo"), en 16:10 nativo para que el `object-cover` no recorte, y con 3 o 4 burbujas legibles en vez de 11 ilegibles.

### [P0] El modal atrapa al usuario de teclado afuera, y lo suelta lejos
Medido con Tab real: con el modal abierto hay **1 elemento focusable adentro y 27 afuera todavía tabulables**. El segundo Tab ya sale al contenido tapado por el backdrop negro al 70%. `main` no tiene `inert`, `body` no tiene `aria-hidden`, y `aria-modal="true"` sólo afecta a la tecnología asistiva, no al foco del teclado. Al cerrar con Escape, `document.activeElement` es `<body>` con scrollY 2908 (4686 en móvil).

**Por qué importa:** quien navega por teclado abre un proyecto, aprieta Tab y queda navegando 27 controles que no puede ver. Al cerrar, aparece al principio del documento y tiene que rehacer todo el camino.

**Fix:** en `ProjectModal.tsx`, guardar `document.activeElement` al montar y restaurarlo en el cleanup; poner `inert` en `<main>` y `<footer>` mientras está abierto; ciclar Tab/Shift+Tab entre el primer y último focusable del panel.

### [P1] El formulario falla en silencio para quien no ve la pantalla
Al enviar vacío aparecen los 3 mensajes, pero el foco no se mueve, no hay resumen, no hay scroll al primer error, y la única región `aria-live` sigue mostrando "Te respondo dentro de las 24 hs hábiles". Sumado: cero `autoComplete` en nombre y email (en mobile obliga a tipear todo) y ningún campo indica que es obligatorio.

**Por qué importa:** es el punto de conversión y el momento de más ansiedad del visitante. Alguien en el celular que escribe mal el email aprieta enviar, no ve cambiar nada arriba del botón y asume que se rompió.

**Fix:** `autoComplete="name"` y `"email"`; tras `setErrors`, foco + `scrollIntoView` al primer campo inválido; anunciar "Revisá 3 campos" en la región `aria-live` en vez del texto de respuesta; marcar los campos obligatorios.

### [P1] El subrayado de los campos no llega al mínimo de contraste no textual
Medición: el borde en reposo compone `rgb(22,142,76)` sobre el verde `rgb(39,236,127)` = **2,66:1**, por debajo del 3:1 que exige WCAG 1.4.11. Como los campos no tienen caja ni relleno (fondo `rgba(0,0,0,0)`), ese subrayado es el **único** elemento que los identifica, así que el criterio aplica de lleno. Al enfocar sube a 11,4:1; el problema es el estado en reposo.

**Fix, con el umbral calculado sobre el verde real:** `--line-on-accent-2` de 45% a **50%** de alpha da 3,03:1. Es un dígito en `globals.css`.

### [P1] El reclutador no encuentra el CV ni una sola línea de código
`Header.tsx` sólo renderiza el link al CV dentro del bloque del menú móvil: en desktop el header es logo · 4 links · ES/EN · Contacto. El único CV está a ~6.000px, como link mono hairline dentro de la sección verde de ventas. Y no hay GitHub ni repositorio en ninguna parte: los dos proyectos "internos" no son verificables de ningún modo.

**Por qué importa:** el público (b) declarado en el propio `CLAUDE.md` es el reclutador, y su primera acción es bajar el CV. Hoy tiene que atravesar el pitch de mantenimiento de PC para encontrarlo.

**Fix:** "CV" en el header desktop como link secundario, y un segundo botón de descarga al pie de "Experiencia y skills", que es donde el reclutador está parado cuando lo quiere.

## Persona Red Flags

**Jordan (primerizo, entra por WhatsApp en el celular).** Ve el nombre gigante, después el cargo, y recién tercero —en gris chico— qué hace. Baja a Proyectos y lo primero que encuentra es un muro de chat borroso ilegible. Toca la card de FSTrack: nada le dice que es tocable, sólo una flecha y un candado que dice "PROYECTO INTERNO". Concluye que no hay nada para ver.

**Riley (rompe cosas).** Abre un modal y aprieta Tab: cae en los 27 controles invisibles de atrás del overlay. Abre el menú móvil y aprieta Escape: no pasa nada, y el scroll del body sigue bloqueado. Manda el formulario vacío: tres errores en pantalla y el lector de pantalla sigue diciendo "Te respondo dentro de las 24 hs hábiles". Sobre el rate limit: el `Map` en memoria significa que en Vercel el límite de 3 es en la práctica 3 × N instancias — el propio comentario del código ya lo admite.

**Casey (mobile).** Ningún target baja de 24px, así que pasa WCAG 2.2 AA. Pero 13 de 27 quedan entre 24 y 44px, y el toggle ES/EN mide exactamente 24,0px de alto: es justo el control que existe para el público internacional. En la sección verde los tres campos son sólo un subrayado a 2,66:1: en un celular al sol, desaparecen.

**Marina, reclutadora técnica, 90 segundos en desktop** (persona derivada del doble público declarado). Busca dos cosas: CV y código. El CV no está en el header. Código: no hay GitHub, no hay repo, no hay demo de los dos proyectos internos; lo único verificable son dos sitios institucionales. En Educación ve dos tecnicaturas — la Licenciatura en Ciencias de la Computación (UNCO) que figura en `CLAUDE.md` §7 no está en `messages/es.json`. Si la omisión no es deliberada, es la credencial más pesada del CV y no aparece.

## Minor Observations

- `messages/en.json`: el título del proyecto destacado sigue en español en la página inglesa.
- **4 de 5 títulos de proyecto no son headings**: sólo el destacado usa `<h3>`, los de la grilla son `<span>`. Leen como títulos pero no están en el outline del documento. (Lo introduje yo al reestructurar las cards.)
- **7 rayas em en el cuerpo del inglés contra 0 en español**, por sustitución sistemática de comas y dos puntos al traducir.
- **1,68 MB muertos** en `public/projects/`: `whatsapp_logo.png` y `fstrack.png` ya no se referencian. Además hay copias duplicadas de 7 PNG en la raíz del repo.
- El peso de las imágenes **no llega al usuario**: `next/image` entrega 96,3 KB por las 6 (jhabogado pasa de 2,28 MB a 10 KB). Conviene limpiar el repo igual, pero no es un problema de performance.
- El textarea mide 1088px de ancho en desktop: medida de línea muy por encima de lo cómodo para escribir. Toparlo en ~720px.
- El botón secundario del hero usa `border-line-2`, que da 1,67:1 contra el fondo: casi invisible como control.
- Las reglas de las dos mesas de Servicios no se alinean entre columnas (desfase de 10-13px a 1440), porque las descripciones tienen distinto largo. En un diseño hecho de reglas, se nota.
- `aria-current="true"` en el nav; para navegación por secciones lo correcto es `aria-current="location"`.
- Las 6 `<section>` no tienen `aria-label`, así que no se exponen como landmarks.
- El remitente del formulario es `onboarding@resend.dev`, dominio no verificado: cae en spam seguido.
- Prosa real máxima: 71 caracteres por línea. La única fila sobre 75 (79 CPL) es la de tags de skills, que es una lista de chips separada por `·`, no prosa.
- 0 errores de consola en ambos locales.

## Questions to Consider

- Si borraras la foto y el nombre gigante del hero, ¿el sitio pierde algo? El h1 más grande dice quién sos; el argumento de venta está tercero y en gris.
- ¿Por qué hay 4 links de WhatsApp que abren la misma conversación vacía, si el helper ya acepta un mensaje? Si el del hero dijera "vi tu sitio, quiero consultarte por un proyecto web" y el de la mesa 2 "…por servicio técnico", sabrías de qué se trata antes de contestar. Es el cambio más barato con más efecto.
- ¿El doble público realmente convive, o el reclutador está pagando el costo? Atraviesa dos secciones de venta de servicio técnico antes de llegar a lo suyo, y nunca encuentra código.
- Las capturas de proyecto son el eslabón más débil de una página por lo demás disciplinada. Ya está demostrado que las ilustraciones de línea propias funcionan. ¿Qué pasaría si no hubiera capturas?
- La sección verde es el momento de más riesgo del visitante y es la más vacía de la página. ¿No debería ser la superficie más estructurada del sitio, no la menos?
