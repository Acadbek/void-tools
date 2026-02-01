import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Void Tools",
  description: "Updates and guides from Void Tools.",
};

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-4">Blog</h1>
      <p className="text-muted-foreground">Coming soon. ({lang})</p>
    </div>
  );
}
