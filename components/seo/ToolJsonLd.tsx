import { ToolConfig } from "@/types";

interface Props {
  tool: ToolConfig;
  lang: string;
}

export function ToolJsonLd({ tool, lang }: Props) {
  // Fallback to default content if locale specific content is missing
  const localeContent = tool.locales?.[lang] || tool.locales?.['en'] || {
    title: tool.title,
    description: tool.description,
    content: tool.content // Legacy fallback
  };

  const title = localeContent.title;
  const description = localeContent.description;
  const faq = localeContent.content?.faq || [];

  // Construct FAQ Schema
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": title,
        "description": description,
        "operatingSystem": "Web, Android, iOS",
        "applicationCategory": tool.category === "code" ? "DeveloperApplication" : "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
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
