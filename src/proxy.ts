import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 usa la convención "proxy" (antes "middleware").
export default createMiddleware(routing);

export const config = {
  // Aplicar a todas las rutas excepto API, internos de Next y archivos estáticos
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
