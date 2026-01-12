import { Metadata } from "next";
import { toolsList } from "@/config/tools";
import ToolGrid from "@/components/home/ToolGrid";
import { Zap } from "lucide-react";
import Lightning from "@/components/Lightning";

export const metadata: Metadata = {
  title: "Void Tools - Free Online PDF, Image & Text Tools",
  description: "100+ Free online tools. Merge PDF, Compress Images, QR Code Generator and more. No registration required.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="bg-card relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Lightning
            speed={0.7}
            size={1.2}
            hue={230}
          />
        </div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 animate-fade-in backdrop-blur-xs">
            <Zap className="w-4 h-4 fill-current" /> 100% Free
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Privacy-First. Browser-Based. Fast
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Zero server uploads. Secure tools with instant results
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 z-20">
        <ToolGrid tools={toolsList} />
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why use Void Tools?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Feature
              title="Privacy First"
              desc="Files are processed in your browser. No data is sent to our servers."
            />
            <Feature
              title="Lightning Fast"
              desc="Built with Next.js 14 for instant load times and smooth experience."
            />
            <Feature
              title="Completely Free"
              desc="No credit cards, no registration, no hidden limits. Just tools."
            />
          </div>
        </div>
      </section>

    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-muted/50 rounded-xl">
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}