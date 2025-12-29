import { Metadata } from "next";
import { toolsList } from "@/config/tools";
import ToolGrid from "@/components/home/ToolGrid";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "t00l Tools - Free Online PDF, Image & Text Tools",
  description: "100+ Free online tools. Merge PDF, Compress Images, QR Code Generator and more. No registration required.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Zap className="w-4 h-4 fill-current" /> 100% Free & Browser-based
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Smart Tools for <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Productive People</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every tool you need <br /> to work in one place.
            Fast, secure, and completely free.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT (GRID) */}
      <section className="container mx-auto px-4 py-12 -mt-8">
        <ToolGrid tools={toolsList} />
      </section>

      {/* 3. SEO CONTENT (Pastki qism - Google uchun) */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why use t00l Tools?</h2>
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

// Kichik yordamchi component
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
