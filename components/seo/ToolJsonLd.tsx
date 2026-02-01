import { ToolConfig } from "@/types";
import { DOMEIN } from "@/constants";

interface Props {
  tool: ToolConfig;
  lang: string;
}

export function ToolJsonLd({ tool, lang }: Props) {
  const localeContent = tool.locales?.[lang] || tool.locales?.['en'] || {
    title: tool.title,
    description: tool.description,
    content: tool.content
  };

  const title = localeContent.title;
  const description = localeContent.description;
  const faq = localeContent.content?.faq || [];
  const howTo = localeContent.content?.howTo || [];
  const features = localeContent.content?.features || [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;
  const pageUrl = `${baseUrl}/${lang}/tools/${tool.slug}`;

  const applicationCategory = tool.category === "code"
    ? "DeveloperApplication"
    : tool.category === "pdf"
      ? "DocumentApplication"
      : "UtilitiesApplication";

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const howToSchema = {
    "@type": "HowTo",
    "name": `How to use ${title}`,
    "description": description,
    "totalTime": "PT1M",
    "step": howTo.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step,
      "text": step
    }))
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": title,
        "url": pageUrl,
        "applicationCategory": applicationCategory,
        "description": `${description} Free, secure, no sign-up online tool with instant results.`,
        "operatingSystem": "Web, Android, iOS",
        "featureList": features.length ? features : ["Free", "Online", "Secure", "Fast"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      ...(howTo.length > 0 ? [howToSchema] : []),
      ...(faq.length > 0 ? [faqSchema] : [])
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
