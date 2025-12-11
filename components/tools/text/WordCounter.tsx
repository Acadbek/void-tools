"use client";

import { useState, useMemo } from "react";
import {
  Copy,
  Trash2,
  AlignLeft,
  Type,
  Clock,
  Mic,
  FileText
} from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // 1. STATISTIKA MANTIG'I (Performance uchun useMemo)
  // Har safar render bo'lganda qayta hisoblamaslik uchun keshlash
  const stats = useMemo(() => {
    if (!text) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpace: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      };
    }

    // So'zlarni aniqlash (bo'sh joylarni olib tashlash)
    const wordsArr = text.trim().split(/\s+/).filter((w) => w !== "");
    const wordCount = wordsArr.length;

    // Gaplar soni (. ! ? bilan tugagan)
    const sentencesCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

    // Paragraflar (yangi qator)
    const paragraphsCount = text.split(/\n\n/).filter((p) => p.trim().length > 0).length;

    return {
      words: wordCount,
      characters: text.length,
      charactersNoSpace: text.replace(/\s/g, "").length,
      sentences: Math.max(0, sentencesCount),
      paragraphs: Math.max(0, paragraphsCount),
      // O'rtacha o'qish tezligi: 200 so'z/daqiqa
      readingTime: Math.ceil(wordCount / 200),
      // O'rtacha gapirish tezligi: 130 so'z/daqiqa
      speakingTime: Math.ceil(wordCount / 130),
    };
  }, [text]);

  // 2. ACTION HANDLERS
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the text?")) {
      setText("");
    }
  };

  return (
    <div className="space-y-6">

      {/* 3. DASHBOARD STATS (Mobile-First Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Words"
          value={stats.words}
          icon={<AlignLeft className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="Characters"
          value={stats.characters}
          icon={<Type className="w-5 h-5 text-purple-500" />}
        />
        <StatCard
          label="Sentences"
          value={stats.sentences}
          icon={<FileText className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          label="Paragraphs"
          value={stats.paragraphs}
          icon={<AlignLeft className="w-5 h-5 text-orange-500" />}
        />
      </div>

      {/* 4. MAIN EDITOR AREA */}
      <div className="relative group">
        <div className="absolute right-2 top-2 flex gap-2 z-10">
          <button
            onClick={handleCopy}
            className="p-2 bg-white/90 backdrop-blur border rounded-lg hover:bg-gray-50 text-gray-600 transition-all flex items-center gap-1 text-sm font-medium shadow-sm"
            title="Copy Text"
          >
            <Copy className="w-4 h-4" />
            {isCopied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleClear}
            className="p-2 bg-white/90 backdrop-blur border rounded-lg hover:bg-red-50 text-red-500 transition-all shadow-sm"
            title="Clear Text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to analyze..."
          className="w-full h-80 p-6 bg-white border border-gray-200 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y text-lg leading-relaxed text-gray-700 transition-all"
          spellCheck="false"
        />

        {/* Footer Info of Textarea */}
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 justify-end">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> Read time: ~{stats.readingTime} min
          </span>
          <span className="flex items-center gap-1">
            <Mic className="w-4 h-4" /> Speak time: ~{stats.speakingTime} min
          </span>
        </div>
      </div>

      {/* 5. DETAILS TABLE (SEO boyitish uchun) */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Detailed Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600">
          <div className="flex justify-between border-b pb-2 border-gray-200 mr-4">
            <span>Characters (no spaces):</span>
            <span className="font-medium text-gray-900">{stats.charactersNoSpace}</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span>Average Word Length:</span>
            <span className="font-medium text-gray-900">
              {stats.words > 0 ? (stats.charactersNoSpace / stats.words).toFixed(1) : 0} chars
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Kichik UI Komponenti (Statistika kartochkasi)
function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
    </div>
  );
}
