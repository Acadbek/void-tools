import { Metadata } from "next";
import { toolsList } from "@/config/tools";
import ToolGrid from "@/components/home/ToolGrid";

export const metadata: Metadata = {
  title: "Tools | Void Tools",
  description: "Browse all free, secure, no sign-up online tools.",
};

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function ToolsPage({ params }: Props) {
  const { lang } = await params;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-4">Tools</h1>
      <p className="text-muted-foreground mb-8">Browse all tools.</p>
      <ToolGrid tools={toolsList} lang={lang} />
    </div>
  );
}
