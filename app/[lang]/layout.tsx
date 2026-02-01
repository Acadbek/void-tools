import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme/provider";
import { ThemeToggle } from "@/components/theme/toggle";
import { DOMEIN } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const canonical = `${siteUrl}/${lang || 'en'}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Void Tools - Free, Secure Online Tools",
      template: "%s | Void Tools",
    },
    description: "Free, secure, no sign-up online tools. Merge PDF, compress images, and generate assets in your browser with instant results.",
    keywords: [
      "void tools", "free online tools", "secure pdf merge", "image compressor", "no sign-up tools",
      "fast online utilities", "browser based", "privacy first", "webp converter"
    ],
    authors: [{ name: "Void Tools Team" }],
    creator: "Void Tools",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: "Void Tools",
      title: "Void Tools - Secure & Free Online Utilities",
      description: "Secure, browser-based tools for developers and creators. No server uploads.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Void Tools - Privacy-First",
      description: "100+ Free online tools. Zero server uploads.",
      creator: "@acadb3k",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: {
        "en": `${siteUrl}/en`,
        "es": `${siteUrl}/es`,
        "ru": `${siteUrl}/ru`,
      },
    },
    verification: {
      google: 'google-site-verification=oRaQSCavKaGz06iuMH1NTnN4_H8SWZX2Omud68s7xEs',
    },
  };
}

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <path fill="currentColor" fillOpacity="0" strokeDasharray="28" strokeDashoffset="28" d="M12 10l4 7h-8Z">
          <animate fill="freeze" attributeName="fill-opacity" begin="0.7s" dur="0.5s" values="0;1" />
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0" />
        </path>
        <path d="M12 10l4 7h-8Z" opacity="0">
          <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 10l4 7h-8Z;M12 4l9.25 16h-18.5Z" />
          <set fill="freeze" attributeName="opacity" begin="0.4s" to="1" />
        </path>
      </g>
    </svg>
  );
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'ru' }];
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const { lang } = await params;

  return (
    <html lang={lang || 'en'} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saira.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          attribute="class"
        >
          <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
            <nav className="flex items-center justify-between container mx-auto px-4 h-14">
              <Link href={`/${lang}`} className="inline-flex items-center hover:opacity-80 transition-opacity">
                <Logo className="w-8 h-8 text-primary" />
                <span className="text-xl font-saira tracking-tight mt-[10px]">void tools</span>
              </Link>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Acadbek/void-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10" />
                  </svg>
                </a>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="flex-1 mt-16 pb-10">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}