# CLAUDE.md — Portfolio Bruno Merino

Documento de contexto para construir el sitio portfolio personal de Bruno Merino.
Este archivo define estructura, contenido y decisiones de diseño. Usalo como
fuente de verdad para el desarrollo.

---

## 1. Objetivo del sitio

Sitio personal que cumple **doble función**:

1. **Landing de servicios freelance** — captar clientes (web, apps, servicio técnico).
2. **CV técnico ampliado** — mostrar perfil completo a reclutadores / empleadores.

Es una **única página** (one-page, scroll) con secciones ordenadas para que cada
perfil (cliente o reclutador) encuentre lo suyo rápido. NO se parte en dos páginas
separadas; se usan botones-ancla en el hero para guiar.

La intención es ampliar alcance a **clientes del exterior**, no solo Argentina.

---

## 2. Stack técnico

- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS
- **Íconos:** Lucide (lucide-react)
- **Hosting:** Vercel
- **i18n:** preparar el sitio bilingüe **español/inglés desde el arranque** (ver sección 9).

---

## 3. Estructura de la página (orden)

1. Hero
2. Servicios
3. Proyectos
4. Experiencia + Skills técnicas
5. Contacto

---

## 4. Hero

- **Nombre:** Bruno Merino
- **Rol:** Analista IT & Desarrollador
- **Bajada:** "Desarrollo web a medida, integraciones con ERP, automatización de procesos y bases de datos."
- **Botones-ancla:**
  - `Ver mis servicios` → ancla a sección Servicios
  - `Conocé mi perfil técnico` → ancla a sección Experiencia/Skills
- **CTA WhatsApp:** botón directo a WhatsApp (flotante o secundario), número +54 299 673-1008.

---

## 5. Servicios

Dividida en **dos bloques visuales**. Cada servicio con su ícono (Lucide).

### Bloque A — Desarrollo y Software

- **Sitios web a medida** — Páginas rápidas y modernas (Next.js): catálogos, landings, sitios institucionales. Del dominio al deploy, todo listo para funcionar.
- **Desarrollo de aplicaciones** — Apps web y móviles a medida según lo que necesite tu negocio o proyecto.
- **Automatización e integraciones** — Conexión de sistemas, ERP y servicios externos (n8n, APIs) para eliminar tareas manuales y que los datos fluyan solos.

### Bloque B — Servicio Técnico y Hardware

- **Mantenimiento de PC** — Limpieza, optimización y puesta a punto de equipos.
- **Diagnóstico y reparación** — Detección y solución de fallas de hardware y software.
- **Armado y asesoramiento de equipos** — Cotización y análisis personalizado de componentes según presupuesto y uso (gaming, trabajo, edición). *Asesoramiento online a todo el país; armado a domicilio en Cipolletti y Neuquén.*

---

## 6. Proyectos

Cuatro cards. Cada una: imagen/captura, nombre, descripción corta, tags de stack,
y link (si aplica). Para proyectos internos sin link, usar etiqueta "Proyecto interno"
en vez de botón muerto.

### 1. El Ranquel
- **Desc:** Catálogo B2B online para un distribuidor mayorista. Permite a clientes y viveros explorar el catálogo de productos de forma rápida y ordenada.
- **Stack:** Next.js · React · TypeScript · Vercel
- **Link:** https://elranqueldistri.com (catálogo visible sin login)
- **Imagen:** PENDIENTE (captura de la home)

### 2. Julian Hermosilla Abogado
- **Desc:** Sitio institucional para un estudio jurídico de Neuquén / Río Negro. Presentación profesional de servicios legales con diseño limpio enfocado en generar contacto.
- **Stack:** Next.js · React · Vercel
- **Link:** https://www.jhabogado.com
- **Imagen:** PENDIENTE (captura de la home)

### 3. FSTrack
- **Desc:** Aplicación móvil de gestión agrícola para el manejo de actividad ganadera y órdenes de compra/venta, integrada con el ERP Finnegans GO. Funciona offline y sincroniza con la nube.
- **Stack:** React Native · Expo · TypeScript · Azure SQL
- **Link:** ninguno — Proyecto interno
- **Imagen:** PENDIENTE (capturas de la app)

### 4. Asistente de WhatsApp con IA
- **Desc:** Asistente conversacional que permite a empleados registrar horas y gestionar tickets directamente desde WhatsApp, usando lenguaje natural y voz. Integra IA con el ERP de la empresa.
- **Stack:** n8n · Meta Cloud API · GPT-4o · Finnegans API
- **Link:** ninguno — Proyecto interno
- **Imagen:** LISTA — captura del flujo real con datos de clientes difuminados (whatsapp_asistente_blur.png)

---

## 7. Experiencia + Skills técnicas

Sección orientada al reclutador. Funciona como CV visual.

### Experiencia laboral

**Analista IT — Fisterra SRL**
Mayo 2025 – Actualidad · Cipolletti, Río Negro
Desarrollo e implementación sobre el ERP Finnegans GO: integraciones vía REST API,
automatización de procesos con n8n, scripting y stored procedures en SQL Server.
Desarrollo de aplicaciones internas (web y móvil) y soporte técnico a usuarios.

**Servicio Informático — Emprendimiento propio**
2021 – Actualidad
Mantenimiento e instalación de software y hardware en equipos. Diagnóstico,
optimización y armado de PC a medida.

**Mantenimiento de Computadoras — Emprendimiento propio**
2019 – Actualidad
Mantenimiento de software y puesta a punto de equipos para agilizar procesos.

> Nota: para el CV en PDF, evaluar fusionar los dos emprendimientos en uno solo
> ("Servicio Técnico Informático · 2019–Actualidad"). En la web van separados.

### Educación

- **Tecnicatura en Programación** — Centro de Educación Técnica N°30 (2016–2020)
- **Licenciatura en Ciencias de la Computación** — Universidad del Comahue (UNCO) (2021–Actualidad)

### Idiomas

- Español (nativo)
- Inglés (buen manejo, incluido hablado)

### Skills técnicas (mostrar como tags, sin niveles)

- **Frontend:** React · Next.js · React Native · TypeScript · JavaScript · HTML · CSS · Angular
- **Backend:** Node.js · C# · Python · Java
- **Bases de datos:** SQL Server · Azure SQL · SQLite · Supabase
- **Automatización e integraciones:** n8n · REST APIs · Finnegans GO
- **Herramientas/DevOps:** Git · Vercel · Railway · EAS Build · Expo
- **Otros:** Arduino/Robótica · Linux

---

## 8. Contacto

- **WhatsApp (principal):** +54 299 673-1008
- **Email:** brunoezequiel.merino@gmail.com
- **CV PDF:** botón de descarga (PENDIENTE — actualizar CV antes de publicar)
- **LinkedIn / GitHub:** afuera por ahora; agregar a futuro cuando estén presentables.

Repetir CTA de contacto en varios puntos de la página (hero, después de proyectos, cierre).

---

## 9. Internacionalización (i18n) — IMPORTANTE

- El sitio debe ser **bilingüe español / inglés**, con un **toggle ES/EN** visible.
- Aunque el contenido en inglés se complete después, la **estructura debe prepararse desde el inicio**: textos en archivos de traducción, no hardcodeados.
- Idioma por defecto: español. Inglés como alternativa para clientes del exterior.

---

## 10. Diseño visual

- **Estilo:** oscuro / techy.
- **Paleta:** fondo oscuro (casi negro / gris muy oscuro), texto claro, **un color de acento** (sugerido: verde o cyan tech) para botones, links y detalles.
- **Tipografía:** sans-serif moderna, legible (ej. Inter, Geist o similar).
- **Íconos:** Lucide, set coherente en toda la página.
- **Cards:** bordes sutiles, fondo ligeramente elevado respecto al fondo, efecto hover.
- **Tono general:** limpio y profesional, sin exceso de animaciones (priorizar performance).
- **Responsive:** mobile-first, debe verse bien en celular (clientes locales suelen entrar por WhatsApp/mobile).

---

## 11. Pendientes / TODO

- [ ] Cargar imágenes de proyectos: El Ranquel, Hermosilla, FSTrack.
- [x] Actualizar y subir CV en PDF (`public/cv-bruno-merino.pdf`).
- [ ] Completar traducciones al inglés.
- [ ] Definir color de acento final (verde vs cyan u otro).
- [ ] A futuro: agregar LinkedIn y GitHub cuando estén listos.
- [ ] Configurar SEO básico + OG image (preview al compartir por WhatsApp/redes).
- [ ] Favicon.
