import { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolsRegistry } from "@/config/tools";
import ToolRenderer from "@/components/tools/ToolRenderer";

// O'ZGARISH 1: Props interfeysini to'g'irlaymiz (Promise bo'lishi kerak)
interface Props {
  params: Promise<{ slug: string }>;
}

// O'ZGARISH 2: generateMetadata asinxron params ni kutib olishi kerak
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await qilamiz
  const { slug } = await params;
  const tool = toolsRegistry[slug];

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: `${tool.title} | t00l Tools`,
    description: tool.description,
    alternates: {
      canonical: `https://t00l.com.br/tools/${slug}`,
    },
  };
}

// O'ZGARISH 3: Asosiy funksiya ham 'async' bo'lishi va 'await' qilishi kerak
export default async function ToolPage({ params }: Props) {
  // Await qilamiz
  const { slug } = await params;
  const tool = toolsRegistry[slug];

  if (!tool) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {tool.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>

        {/* AdSense Slot (Placeholder) */}
        <div className="w-full h-24 bg-gray-200 rounded-lg mb-8 flex items-center justify-center text-gray-400">
          Ads Placeholder (Top)
        </div>

        {/* TOOL AREA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px]">
          <ToolRenderer componentKey={tool.componentKey} />
        </div>

        {/* FAQ Section */}
        <article className="mt-16 prose prose-blue max-w-none">
          <h2>How to use {tool.title}?</h2>
          <p>
            Simple and fast way to use {tool.title}. No registration required.
          </p>
        </article>

      </div>
    </div>
  );
}
