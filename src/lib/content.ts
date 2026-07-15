// Estructura del contenido (no traducible): qué ítems existen, en qué orden,
// con qué ícono, links, tags y rutas de imagen. Los TEXTOS viven en /messages.
// Las claves (id) coinciden con las claves de los archivos de traducción.

import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Smartphone,
  Workflow,
  Wrench,
  Stethoscope,
  Cpu,
  Code2,
  Server,
  Database,
  Plug,
  GitBranch,
  Bot,
} from "lucide-react";

/* ---------------------------------- Hero ---------------------------------- */
// Títulos/credenciales: nombres propios, no se traducen.
export const heroCredentials = [
  "Tecnicatura en Programación",
  "Tecnicatura Superior en Analista de Sistemas",
];

/* -------------------------------- Servicios ------------------------------- */

export const servicesBlockA: { id: string; icon: LucideIcon }[] = [
  { id: "web", icon: Globe },
  { id: "apps", icon: Smartphone },
  { id: "automation", icon: Workflow },
];

export const servicesBlockB: { id: string; icon: LucideIcon; hasNote?: boolean }[] = [
  { id: "maintenance", icon: Wrench },
  { id: "repair", icon: Stethoscope },
  { id: "build", icon: Cpu, hasNote: true },
];

/* --------------------------------- Proceso -------------------------------- */

export const processSteps = ["talk", "proposal", "build", "deploy"] as const;

/* -------------------------------- Proyectos ------------------------------- */

export type Project = {
  id: string;
  tags: string[];
  /** URL externa; null => proyecto interno (se muestra etiqueta, no botón). */
  link: string | null;
  /** Ruta de imagen en /public; null => placeholder. */
  image: string | null;
};

// Proyecto que abre la sección con layout ancho (el más diferenciador).
export const featuredProjectId = "wpp";

export const projects: Project[] = [
  {
    id: "ranquel",
    tags: ["Next.js", "React", "TypeScript", "Vercel"],
    link: "https://elranqueldistri.com",
    image: "/projects/elranquel.png",
  },
  {
    id: "hermosilla",
    tags: ["Next.js", "React", "Vercel"],
    link: "https://jhabogado.com",
    image: "/projects/jhabogado.png",
  },
  {
    id: "fstrack",
    tags: ["React Native", "Expo", "TypeScript", "Azure SQL"],
    link: null,
    image: "/projects/fstrack-logo.png",
  },
  {
    id: "nucleogym",
    tags: ["React Native", "Expo", "Firebase"],
    link: null,
    image: "/projects/nucleogym.png",
  },
  {
    id: "wpp",
    tags: ["n8n", "Meta Cloud API", "GPT-4o", "Finnegans API"],
    link: null,
    image: "/projects/whatsapp_logo.png",
  },
];

/* ----------------------------- Experiencia -------------------------------- */

export const jobs = ["fisterra", "service", "maintenance"] as const;
export const education = ["tecnicatura", "analista"] as const;

/* -------------------------------- Skills ---------------------------------- */
// Los nombres de tecnologías no se traducen; las categorías sí (en /messages).

export const skillGroups: { id: string; icon: LucideIcon; items: string[] }[] = [
  {
    id: "frontend",
    icon: Code2,
    items: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Angular",
    ],
  },
  {
    id: "backend",
    icon: Server,
    items: ["Node.js", "C#", "Python", "Java"],
  },
  {
    id: "databases",
    icon: Database,
    items: ["SQL Server", "Azure SQL", "SQLite", "Supabase", "Firebase"],
  },
  {
    id: "automation",
    icon: Plug,
    items: ["n8n", "REST APIs", "Finnegans GO"],
  },
  {
    id: "devops",
    icon: GitBranch,
    items: ["Git", "Vercel", "Railway", "Render", "EAS Build", "Expo"],
  },
  {
    id: "other",
    icon: Bot,
    items: ["Arduino / Robótica", "Linux"],
  },
];
