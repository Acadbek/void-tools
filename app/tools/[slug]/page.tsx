import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { toolsRegistry } from "@/config/tools";
import ToolRenderer from "@/components/tools/ToolRenderer";
import { DOMEIN } from "@/constants";
import { ToolJsonLd } from "@/components/seo/ToolJsonLd";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(toolsRegistry).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = toolsRegistry[resolvedParams.slug];

  if (!tool) return { title: "Tool Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;
  const metaDescription = `${tool.description} Free, secure, no sign-up online ${tool.category} tool with instant, in-browser results.`;

  return {
    title: `${tool.title} - Free, Secure Online Tool`,
    description: metaDescription,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/en/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.title} | Free & Secure Online Tool`,
      description: metaDescription,
      url: `${baseUrl}/en/tools/${tool.slug}`,
      type: "website",
      siteName: "Void Tools",
    },
    keywords: [
      tool.title,
      `${tool.slug} online`,
      `${tool.category} tool`,
      "free",
      "secure",
      "no sign-up",
      "fast",
      "privacy-first",
      "browser based",
    ],
  };
}

export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = toolsRegistry[resolvedParams.slug];

  if (!tool) notFound();

  const content = tool.content;

  if (!content) {
    return notFound();
  }

  const relatedTools = Object.values(toolsRegistry)
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <>
      <ToolJsonLd tool={tool} lang="en" />

      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/en/tools" className="hover:text-blue-600">
              Tools
            </Link>
            <span className="mx-2">/</span>
            <span className="capitalize">{tool.category}</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{tool.title}</span>
          </nav>

          <header className="text-center mb-10 mt-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              {tool.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {tool.description}
            </p>
          </header>

          <section className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8 min-h-[400px] mb-16">
            <ToolRenderer componentKey={tool.componentKey} />
          </section>

          <article className="prose text-muted-foreground prose-lg dark:prose-invert max-w-none bg-card p-8 rounded-2xl border border-border shadow-sm mb-12">
            <h2 className="text-foreground">About {tool.title}</h2>
            <p>{content.overview}</p>

            <h2 className="text-foreground">How to use {tool.title}?</h2>
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
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </article>

          {relatedTools.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Related Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/en/tools/${t.slug}`}
                    className="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition duration-200"
                  >
                    <div className="font-bold text-lg mb-2">{t.title}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}