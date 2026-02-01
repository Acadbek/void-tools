"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ToolConfig } from "@/types";
import { getIconByName } from "@/lib/icons";
import { Search } from "lucide-react";

interface Props {
  tools: ToolConfig[];
  lang?: string;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'pdf', label: 'PDF' },
  { id: 'image', label: 'Image' },
  { id: 'text', label: 'Text' },
  { id: 'converter', label: 'Converters' },
  { id: 'code', label: 'Code' },
  { id: 'generator', label: 'Generator' },
  { id: 'security', label: 'Security' },
  { id: 'media', label: 'Media' },
  { id: 'social', label: 'Social' },
];

export default function ToolGrid({ tools, lang = 'en' }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter Logic (Juda tez ishlashi uchun useMemo)
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, tools]);

  return (
    <div className="space-y-8">

      {/* 1. SEARCH & FILTER SECTION */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

        {/* Categories (Tabs) */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-90">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools (e.g. PDF, Resize)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-xl focus:ring-2 focus:ring-ring outline-none text-sm placeholder:text-muted-foreground text-foreground"
          />
        </div>
      </div>

      {/* 2. TOOLS GRID */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const Icon = getIconByName(tool.icon);
            return (
              <Link
                href={`/${lang}/tools/${tool.slug}`}
                key={tool.slug}
                className="group bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-muted text-muted-foreground rounded-md uppercase">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground font-medium">No tools found matching "{search}"</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("all") }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
