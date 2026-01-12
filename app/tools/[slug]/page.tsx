import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { toolsRegistry } from "@/config/tools";
import ToolRenderer from "@/components/tools/ToolRenderer";
import { DOMEIN } from "@/constants";

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

  return {
    title: `${tool.title} - Free Online Tool`,
    description: tool.description,
    alternates: {
      canonical: `${baseUrl}/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${baseUrl}/tools/${tool.slug}`,
      type: "website",
      siteName: "Void Tools",
      // images: [{ url: `/og/${tool.slug}.png` }] // Kelajakda rasm qo'shish uchun
    },
    keywords: [tool.title, "free online tools", "converter", "generator", tool.category],
  };
}

export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = toolsRegistry[resolvedParams.slug];

  if (!tool) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.description,
    "applicationCategory": tool.category === "code" ? "DeveloperApplication" : "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "Free, Online, Secure, Fast"
  };

  const relatedTools = Object.values(toolsRegistry)
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-5xl">

          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
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

            <h3 className="text-foreground">About {tool.title}</h3>
            <p>{tool.content.overview}</p>

            <h3 className="text-foreground">How to use {tool.title}?</h3>
            <ol>
              {tool.content.howTo.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <h3 className="text-foreground">Key Features</h3>
            <ul>
              {tool.content.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h3 className="text-foreground">Frequently Asked Questions</h3>
            <div className="not-prose space-y-4 mt-4">
              {tool.content.faq.map((item, index) => (
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

          {relatedTools.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-foreground mb-6">Related Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
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