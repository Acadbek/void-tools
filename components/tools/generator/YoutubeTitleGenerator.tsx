"use client";

import { useState } from "react";
import {
    Wand2, Copy, Check, RefreshCw,
    Youtube, TrendingUp, Type, FileText
} from "lucide-react";
import { TITLE_TEMPLATES, TitleCategory, getRandomNumber } from "@/constants/youtube-templates";

interface GeneratedResult {
    id: string;
    title: string;
    description: string;
    score: number;
    category: string;
}

export default function YoutubeTitleGenerator() {
    const [topic, setTopic] = useState("");
    const [category, setCategory] = useState<TitleCategory | "all">("all");
    const [results, setResults] = useState<GeneratedResult[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // --- GENERATION LOGIC (NO AI) ---
    const handleGenerate = () => {
        if (!topic.trim()) return;

        setIsGenerating(true);
        setResults([]);

        setTimeout(() => {
            let templates: { titlePattern: string; descPattern: string; score: number; category: string }[] = [];

            if (category === "all") {
                Object.entries(TITLE_TEMPLATES).forEach(([cat, list]) => {
                    // Har bir kategoriyadan random tanlash
                    const shuffled = [...list].sort(() => 0.5 - Math.random());
                    templates.push(...shuffled.slice(0, 2).map(item => ({ ...item, category: cat })));
                });
            } else {
                templates = TITLE_TEMPLATES[category].map(item => ({ ...item, category }));
            }

            const generated = templates.map((template, idx) => {
                const randomNum = getRandomNumber(3, 15).toString();
                const cleanTopic = topic.trim();

                // Title va Description ni to'ldirish
                let title = template.titlePattern
                    .replace("{topic}", cleanTopic)
                    .replace("[Number]", randomNum);

                let desc = template.descPattern
                    .replace("{topic}", cleanTopic)
                    .replace("[Number]", randomNum);

                return {
                    id: idx.toString(),
                    title: title,
                    description: desc,
                    score: Math.min(100, Math.max(50, template.score + getRandomNumber(-5, 3))),
                    category: template.category
                };
            });

            // Eng zo'rlarini tepaga chiqarish
            setResults(generated.sort((a, b) => b.score - a.score));
            setIsGenerating(false);
        }, 600);
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleGenerate();
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">

            {/* --- LEFT PANEL: CONFIG --- */}
            <div className="w-full lg:w-[400px] flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden flex-shrink-0">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-2 text-foreground">
                        <Youtube className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-sm">Video Details</h3>
                    </div>
                </div>

                <div className="p-5 space-y-6 flex-1">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Video Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g. iPhone 15, React JS, Fitness"
                            className="w-full px-4 py-3 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                            autoFocus
                        />
                        <p className="text-xs text-muted-foreground mt-2">Enter your keyword to generate content.</p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Content Style</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['all', 'tutorial', 'listicle', 'story', 'clickbait', 'negative', 'comparison', 'question'] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`
                        py-2 px-3 rounded-lg text-xs font-bold capitalize border transition-all
                        ${category === cat
                                            ? 'bg-primary/10 border-primary/20 text-primary shadow-sm'
                                            : 'bg-card border-border text-muted-foreground hover:bg-muted'
                                        }
                      `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-border bg-card">
                    <button
                        onClick={handleGenerate}
                        disabled={!topic.trim() || isGenerating}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        Generate Ideas
                    </button>
                </div>
            </div>

            {/* --- RIGHT PANEL: RESULTS --- */}
            <div className="flex-1 flex flex-col min-w-0 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-3 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3 px-2">
                        <Type className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">
                            {results.length > 0 ? `${results.length} Results Found` : "Waiting for topic..."}
                        </span>
                    </div>
                </div>

                <div className="flex-1 bg-muted/10 p-4 overflow-y-auto custom-scrollbar">
                    {results.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
                            <Youtube className="w-16 h-16 mb-4" />
                            <p className="font-medium text-sm">Enter a topic to get titles & descriptions</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-blue-300 transition-all animate-in slide-in-from-bottom-2 duration-300"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Content */}
                                        <div className="flex-1 space-y-2">
                                            {/* Title */}
                                            <h4 className="font-bold text-foreground text-lg leading-snug group-hover:text-blue-700 transition-colors">
                                                {item.title}
                                            </h4>

                                            {/* Description */}
                                            <div className="flex gap-2">
                                                <div className="shrink-0 mt-0.5">
                                                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex items-center gap-3 pt-2">
                                                <span className={`
                                      text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                                      ${item.score >= 95 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                                    `}>
                                                    Score: {item.score}/100
                                                </span>
                                                <span className="text-[10px] font-medium text-muted-foreground capitalize flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" /> {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Copy Button (Copies Title) */}
                                        <button
                                            onClick={() => handleCopy(item.title, item.id)}
                                            className={`
                                 p-2.5 rounded-lg border transition-all shrink-0
                                 ${copiedId === item.id
                                                    ? 'bg-green-50 border-green-200 text-green-600'
                                                    : 'bg-muted border-border text-muted-foreground hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200'
                                                }
                               `}
                                            title="Copy Title"
                                        >
                                            {copiedId === item.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}