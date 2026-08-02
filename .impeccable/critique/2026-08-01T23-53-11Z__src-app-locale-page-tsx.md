---
target: la home del portfolio
total_score: 33
p0_count: 0
p1_count: 2
timestamp: 2026-08-01T23-53-11Z
slug: src-app-locale-page-tsx
---
⚠️ DEGRADED: single-context (la configuración de sesión prohíbe lanzar sub-agentes salvo pedido explícito del usuario)

## Design Health Score

| # | Heurística | Score | Problema clave |
|---|-----------|-------|----------------|
| 1 | Visibilidad del estado del sistema | 3 | El formulario informa bien (4 estados + aria-live), pero la nav no marca la sección activa en un scroll de 8.213px |
| 2 | Correspondencia con el mundo real | 4 | Copy natural en ambos idiomas; la jerga técnica sólo aparece donde corresponde (tabla de skills) |
| 3 | Control y libertad del usuario | 3 | Modal con ESC y foco gestionado; el texto del mensaje se pierde tras enviar, sin copia |
| 4 | Consistencia y estándares | 3 | Tres tratamientos de foco distintos; el ícono ↗ significa "abre modal" en las cards y "sale del sitio" por convención |
| 5 | Prevención de errores | 4 | Validación en cliente antes de postear, maxLength, type=email, honeypot |
| 6 | Reconocimiento antes que recuerdo | 3 | El botón flotante verde no tiene etiqueta visible para quien ve; todo lo demás está rotulado |
| 7 | Flexibilidad y eficiencia | 3 | Dos caminos de contacto + CV + toggle de idioma; sin atajos (aceptable en esta superficie) |
| 8 | Diseño estético y minimalista | 4 | Sistema comprometido, sin relleno decorativo; cada elemento se gana el lugar |
| 9 | Recuperación de errores | 4 | Mensajes específicos en lenguaje llano, inline, con aria-invalid y salida a WhatsApp |
| 10 | Ayuda y documentación | 2 | "Cómo trabajamos" no responde plazos ni rangos de precio, que es lo que un cliente pregunta |
| **Total** | | **33/40** | **Good (28–35)** |

## Anti-Patterns Verdict

**Evaluación propia:** no parece hecho por IA. Las ilustraciones SVG son propias y específicas del oficio (una placa madre con CPU, RAM intercalada, ATX de 20 pines y pines de panel frontal no sale de un generador). La tipografía —Chivo, de una fundición argentina— está fuera de la lista de reflejos. Sin gradient text, sin glassmorphism, sin grilla de cards idénticas, sin eyebrow sobre cada sección. La estructura por reglas hairline y el cierre "drenched" en verde son decisiones comprometidas.

Chequeo de reflejo de categoría en dos alturas:
- **Primer orden** (portfolio de dev → oscuro con gradiente cyan): evitado.
- **Segundo orden** (portfolio de dev que no es SaaS-oscuro → editorial-tipográfico con serif): también evitado. Aterriza en un tercer lugar, grotesca industrial con verde señal.

**Escaneo determinístico:** `detect.mjs` sobre `src` devuelve `[]`, pero es engañoso: el detector lee HTML/CSS y no `.tsx`. Verificado con un control (un mockup que sí arroja hallazgos). Corriéndolo sobre el **HTML renderizado** aparecen 2:

1. `border-accent-on-rounded` (warning) — **falso positivo confirmado**. Verificado en el navegador: cero elementos tienen simultáneamente borde ≥2px y border-radius > 0. El detector matcheó la clase `border-b-2` sin comprobar si ese elemento está redondeado.
2. `numbered-section-markers` (advisory) — real, en "Cómo trabajamos" (01/02/03/04). Por la regla del propio skill es defendible: es una secuencia genuina donde el orden informa, y es la única numeración de la página. Pero converge con el hallazgo de que ésa es la sección más floja.

**Overlays visuales:** no se inyectaron. La mutación del DOM está disponible, pero el panel del navegador no está compositando en este entorno (`screenshot` falla con "the Browser pane is not displayed"), así que un overlay no sería visible. Señal de fallback: evidencia por CLI sobre el HTML renderizado + sondas programáticas en el DOM vivo.

## Overall Impression

Es un sitio con voz propia, y eso es lo difícil. El sistema visual está resuelto y sostenido: un solo acento que siempre apunta a la conversión, estructura por reglas en vez de cards, y un cierre en verde que funciona como remate. Cero fallos de contraste reales en toda la página, jerarquía de headings sin saltos y todos los interactivos con nombre accesible.

Lo que lo frena no es el diseño sino la **evidencia**: es un portfolio donde el trabajo en vivo está escondido detrás de un modal, y la sección que debería convencer a un cliente ("Cómo trabajamos") es la más delgada de la página. La mayor oportunidad es hacer que el trabajo hable antes.

## What's Working

1. **El sistema de color como argumento, no como decoración.** Un solo verde señal que aparece exclusivamente donde hay acción, y una sección de contacto donde ese color deja de ser detalle y pasa a ser la superficie. Es coherente y se sostiene en toda la página.
2. **La sección de servicios.** Dos "mesas" con ilustraciones propias resuelven el problema real del sitio —que ofrece software y hardware sin parecer dos negocios pegados— y lo hacen sin una sola card.
3. **El manejo de errores del formulario.** Mensajes específicos ("Revisá el email: no parece válido"), inline, con `aria-invalid` y `aria-describedby`, contenido preservado, y salida a WhatsApp cuando el servidor falla. Está por encima del estándar de la mayoría de los sitios de producción.

## Priority Issues

### [P1] Los links a los sitios en vivo están enterrados detrás de un modal
**Por qué importa:** El Ranquel y jhabogado.com son trabajo real y visitable — la prueba más fuerte que tenés. Pero la card no ofrece ningún camino directo: hay que abrir un modal y encontrar "Ver sitio". Peor: el ícono ↗ de la card significa "abre en pestaña nueva" por convención, así que promete salir del sitio y entrega un modal. Un cliente que quiere ver si sabés hacer webs tiene que adivinar dos pasos.
**Fix:** poner un "Ver sitio ↗" directo en las cards que tienen URL, separado de "Ver detalle". Y cambiar el ícono de "Ver detalle" por uno que signifique "expandir", no "salir".
**Comando sugerido:** `/impeccable clarify`

### [P1] "Cómo trabajamos" es la sección más floja y carga el único patrón genérico
**Por qué importa:** mide 513px contra ~1.800 de sus vecinas. Cuatro pasos de ocho palabras bajo 01/02/03/04. Es exactamente donde un cliente decide si contratarte, y no responde nada de lo que pregunta: cuánto tarda, qué rango de precio, qué necesitás de él para arrancar. Además es el lugar donde el detector marca la única numeración de la página.
**Fix:** darle sustancia (plazos típicos, qué entregás en cada paso, qué necesitás del cliente) o fusionarla con Servicios. Media tinta no sirve: hoy ocupa lugar sin pagar el alquiler.
**Comando sugerido:** `/impeccable bolder`

### [P2] En 8.213px de scroll no hay ninguna señal de dónde estás
**Por qué importa:** cuatro anclas en la nav y ningún estado activo; nada indica cuánto falta ni cómo volver arriba. Evidencia de que estaba previsto: la clave `a11y.backToTop` existe traducida en los dos idiomas y **no se usa en ningún componente**.
**Fix:** estado activo en la nav por scroll-spy, y usar el string huérfano para un botón de volver arriba (o borrarlo).
**Comando sugerido:** `/impeccable polish`

### [P2] Tres tratamientos de foco distintos; el del formulario es el más débil
**Por qué importa:** las cards de proyecto usan anillo verde (`focus-visible:ring-2`), el resto del sitio usa el anillo por defecto del navegador, y los campos del formulario matan el outline (`outline-none`) y lo reemplazan sólo por el borde inferior pasando de 45% a 100% de opacidad. Es justo la superficie donde alguien está tipeando con teclado. Ningún elemento queda sin indicador, pero el sistema no es uno.
**Fix:** un estilo de foco único definido a nivel token, y devolver un indicador fuerte a los campos.
**Comando sugerido:** `/impeccable polish`

### [P2] El botón flotante de WhatsApp tapa el link de email en mobile
**Por qué importa:** verificado a 375px: el FAB (56×56 en x=299, y=736) se superpone al link `Email · brunoezequiel.merino@gmail.com` del pie de la sección de contacto. Es un camino secundario, pero es el que usa quien no quiere llenar un formulario.
**Fix:** ocultar el FAB cuando la sección de contacto está en viewport (ahí ya hay CTA de sobra), o darle padding-bottom al bloque.
**Comando sugerido:** `/impeccable adapt`

## Persona Red Flags

**Jordan (cliente primerizo)**: entra buscando "¿me arregla la PC / me hace la web, y cuánto sale?". Encuentra los servicios, pero **cero señal de precio** en toda la página; "Cómo trabajamos" promete "presupuesto claro" sin ningún ancla. El círculo verde flotante no tiene etiqueta visible: no sabe qué hace hasta tocarlo. Toca "Ver detalle ↗" esperando salir del sitio y le aparece un modal.

**Casey (mobile, una mano)**: 8.213px de scroll sin indicador de progreso ni botón de volver arriba. El FAB le tapa el link de email en la sección de contacto. En el pie, los dos links de contacto miden 20px de alto (pasan WCAG 2.2 por la excepción de espaciado, pero con el pulgar son incómodos). A favor: el formulario apila bien y no hay desbordes horizontales.

**Riley (rompedor metódico)**: doble submit rápido → el botón se deshabilita durante el envío ✓. Cuarto envío en 10 minutos → 429 con mensaje claro y salida a WhatsApp ✓. Mensaje de 3.000+ caracteres → cortado por `maxLength` ✓. **Refresh a mitad del formulario → pierde todo lo escrito**, sin borrador ni advertencia. Tras enviar, el texto enviado desaparece sin copia.

**Reclutador (persona del proyecto, derivada del doble público que declara CLAUDE.md)**: encuentra stack, experiencia y educación en formato tabular escaneable, y el CV en PDF ✓. Pero **ningún link a código**: no hay GitHub ni LinkedIn, y los dos proyectos internos no muestran ni código ni demo. Un portfolio de desarrollador sin un solo repo visible le genera una pregunta que no debería tener que hacer.

## Minor Observations

- **Sin skip link.** Con nav sticky, quien navega por teclado tabula la barra entera en cada visita. P3.
- **`prefers-reduced-motion` no resetea `animation-delay`.** El bloque de globals.css fuerza `animation-duration: 0.01ms` pero deja los delays de 0.08s a 0.32s; con `animation-fill-mode: both`, quien pidió menos movimiento igual ve el hero invisible hasta 320ms antes de que aparezca de golpe. Agregar `animation-delay: 0s !important`.
- **Un párrafo a 81ch** (la descripción del proyecto destacado), apenas sobre el techo recomendado de 75ch. Medido con métrica real de la fuente, no estimado.
- **`a11y.backToTop` es un string huérfano** en `es.json` y `en.json`: traducido en los dos idiomas y sin uso.
- **La imagen de FSTrack sigue siendo un logo**, no producto, por decisión tomada durante la sesión (la captura disponible se recorta mal y expone datos internos). Sigue pendiente una captura utilizable.

## Questions to Consider

- El sitio declara dos públicos —cliente y reclutador— pero el hero le habla a uno solo. ¿Qué pasaría si la primera pantalla ofreciera dos puertas explícitas en vez de una sola bajada?
- ¿Por qué el trabajo en vivo, que es tu argumento más fuerte, está a dos clics y detrás de un ícono que promete otra cosa?
- Si un cliente sólo pudiera leer una sección antes de decidir, ¿cuál querrías que fuera? ¿Es la que hoy tiene más peso visual?
- "Cómo trabajamos" ocupa el lugar de una sección sin hacer el trabajo de una. ¿Merece crecer o desaparecer?
