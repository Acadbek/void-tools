import { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolsRegistry } from "@/config/tools";
import ToolRenderer from "@/components/tools/ToolRenderer";

// Props type
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = toolsRegistry[resolvedParams.slug];

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: `${tool.title} | t00l Tools`,
    description: tool.description,
  };
}

// Main component
export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = toolsRegistry[resolvedParams.slug];

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {tool.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px]">
          <ToolRenderer componentKey={tool.componentKey} />
        </div>
      </div>
    </div>
  );
}

// generateStaticParams qo'shish (muhim!)
export async function generateStaticParams() {
  return Object.keys(toolsRegistry).map((slug) => ({
    slug: slug,
  }));
}
