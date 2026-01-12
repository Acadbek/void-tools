import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { toolsRegistry } from '@/config/tools';
import ToolRenderer from '@/components/tools/ToolRenderer';
import { DOMEIN } from '@/constants';
import { ToolJsonLd } from '@/components/seo/ToolJsonLd';

type PageProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export async function generateStaticParams() {
  const tools = Object.keys(toolsRegistry);
  const languages = ['en', 'es', 'ru'];

  const params: { slug: string; lang: string }[] = [];

  for (const slug of tools) {
    for (const lang of languages) {
      params.push({ slug, lang });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const tool = toolsRegistry[slug];

  if (!tool) return { title: 'Tool Not Found' };

  const localeConfig = tool.locales?.[lang] || tool.locales?.['en'] || { title: tool.title, description: tool.description };
  const title = localeConfig.title;
  const description = localeConfig.description;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;

  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title: `${title} | Void Tools`,
    description: description,
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/${slug}`,
      languages: {
        'en': `${baseUrl}/en/tools/${slug}`,
        'es': `${baseUrl}/es/tools/${slug}`,
        'ru': `${baseUrl}/ru/tools/${slug}`,
        'x-default': `${baseUrl}/en/tools/${slug}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/${lang}/tools/${slug}`,
      type: 'website',
      siteName: 'Void Tools',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Void Tools Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl],
    },
    appleWebApp: {
      capable: true,
      title: title,
      statusBarStyle: 'black-translucent',
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const tool = toolsRegistry[slug];

  if (!tool) notFound();

  const localeContent = tool.locales?.[lang] || tool.locales?.['en'] || {
    title: tool.title,
    description: tool.description,
    content: tool.content
  };

  const content = localeContent.content;

  if (!content) {
    // Fallback if structure is somehow broken
    return notFound();
  }

  return (
    <>
      <ToolJsonLd tool={tool} lang={lang} />

      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-5xl">

          <nav className="text-sm text-muted-foreground mb-6">
            <Link href={`/${lang}`} className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="capitalize">{tool.category}</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{localeContent.title}</span>
          </nav>

          {/* SECTION 1: THE TOOL (Above the Fold) */}
          <section className="flex flex-col items-center justify-center mb-16">
            <header className="text-center mb-10 mt-6">
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                {localeContent.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {localeContent.description}
              </p>
            </header>

            <div className="w-full max-w-4xl bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8 min-h-[400px]">
              <ToolRenderer componentKey={tool.componentKey} />
            </div>
          </section>

          {/* NEXT STEPS (Logical Interlinking) */}
          {tool.nextSteps && tool.nextSteps.length > 0 && (
            <section className="max-w-3xl mx-auto mb-16">
              <h3 className="text-xl font-bold mb-4 text-center">Next Steps</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {tool.nextSteps.map(step => (
                  <Link
                    key={step.slug}
                    href={`/${lang}/tools/${step.slug}`}
                    className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-medium transition-colors"
                  >
                    {step.label} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: SEO CONTENT (Below the Fold) */}
          <article className="prose text-muted-foreground prose-lg dark:prose-invert max-w-3xl mx-auto bg-card p-8 rounded-2xl border border-border shadow-sm mb-12">

            <h2 className="text-foreground">About {localeContent.title}</h2>
            <p>{content.overview}</p>

            <h2 className="text-foreground">How to use {localeContent.title}?</h2>
            <ol>
              {content.howTo.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <h2 className="text-foreground">Key Features</h2>
            <ul>
              {content.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h2 className="text-foreground">Frequently Asked Questions</h2>
            <div className="not-prose space-y-4 mt-4">
              {content.faq.map((item, index) => (
                <details key={index} className="group bg-muted/50 p-4 rounded-lg border border-transparent hover:border-border transition-colors">
                  <summary className="font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-muted-foreground transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
