import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme/provider";
import { ThemeToggle } from "@/components/theme/toggle";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://tool.nosirjonov.uz'),

  title: {
    default: "Void Tools - Privacy-First Online Tools",
    template: "%s | Void Tools",
  },
  description: "100% Free, Privacy-First online tools. Merge PDF, Convert Images, Generate QR Codes and more. No file uploads, everything runs in your browser.",

  keywords: [
    "online tools", "pdf merger", "image converter", "privacy first",
    "secure tools", "web utilities", "nextjs tools", "free tools"
  ],

  authors: [{ name: "Void Tools Team" }],
  creator: "Void Tools",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tool.nosirjonov.uz",
    siteName: "Void Tools",
    title: "Void Tools - Secure & Free Online Utilities",
    description: "Secure, browser-based tools for developers and creators. No server uploads.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Void Tools - Privacy-First",
    description: "100+ Free online tools. Zero server uploads.",
    creator: "@voidtools",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "./",
    languages: {
      "en": "/en",
      "es": "/es",
      "ru": "/ru",
    },
  },

  verification: {
    google: 'google-site-verification=oRaQSCavKaGz06iuMH1NTnN4_H8SWZX2Omud68s7xEs',
  },
};


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
          <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <nav className="flex items-center justify-between container mx-auto px-4 h-14">
              <Link href={`/${lang}`} className="inline-flex items-center hover:opacity-80 transition-opacity">
                <Logo className="w-8 h-8 text-primary" />
                <span className="text-xl font-saira tracking-tight mt-[10px]">void tools</span>
              </Link>

              <ThemeToggle />
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