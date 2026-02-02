import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales for internationalization
const locales = ["en", "es", "ru"];
const defaultLocale = "en";

// Middleware handles locale-based routing and redirects
export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale if missing (308 = permanent redirect)
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    , 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, assets, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
