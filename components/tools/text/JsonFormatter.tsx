"use client";

import { useState } from "react";
import {
  Copy,
  Trash2,
  Check,
  Minimize2,
  Maximize2,
  FileJson,
  Download,
  AlertCircle
} from "lucide-react";
import { saveAs } from "file-saver";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [stats, setStats] = useState({ size: "0 B", items: 0 });

  // 1. FORMAT (PRETTIFY) - Chiroyli qilish
  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2); // 2 space indent
      setInput(formatted);
      setError(null);
      calculateStats(formatted);
    } catch (err: any) {
      setError("Invalid JSON: " + err.message);
    }
  };

  // 2. MINIFY - Bir qator qilish
  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setError(null);
      calculateStats(minified);
    } catch (err: any) {
      setError("Invalid JSON: " + err.message);
    }
  };

  // 3. VALIDATE - Tekshirish
  const calculateStats = (jsonStr: string) => {
    const bytes = new Blob([jsonStr]).size;
    const size = bytes > 1024 ? (bytes / 1024).toFixed(2) + " KB" : bytes + " B";
    setStats({ size, items: jsonStr.length });
  };

  // Utility
  const handleCopy = async () => {
    await navigator.clipboard.writeText(input);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setError(null);
    setStats({ size: "0 B", items: 0 });
  };

  const handleDownload = () => {
    if (!input) return;
    const blob = new Blob([input], { type: "application/json" });
    saveAs(blob, "data.json");
  };

  // Paste Sample Data
  const loadSample = () => {
    const sample = {
      "t00l": "tools",
      "version": 1.0,
      "features": ["fast", "free", "secure"],
      "developer": {
        "name": "User",
        "skills": ["Next.js", "React"]
      }
    };
    setInput(JSON.stringify(sample, null, 2));
    setError(null);
  };

  return (
    <div className="space-y-4">

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={handleFormat}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
          >
            <Maximize2 className="w-4 h-4" /> Format
          </button>
          <button
            onClick={handleMinify}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
          >
            <Minimize2 className="w-4 h-4" /> Minify
          </button>
          <button
            onClick={loadSample}
            className="hidden sm:flex text-xs text-blue-600 underline px-2 py-2"
          >
            Load Sample
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={handleDownload} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors" title="Download JSON">
            <Download className="w-5 h-5" />
          </button>
          <button onClick={handleCopy} className="p-2 text-gray-600 hover:bg-white hover:text-green-600 rounded-lg transition-colors" title="Copy">
            {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button onClick={handleClear} className="p-2 text-gray-600 hover:bg-white hover:text-red-600 rounded-lg transition-colors" title="Clear">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* EDITOR AREA */}
      <div className="relative group">
        <div className="absolute top-0 left-0 bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-br-lg border-b border-r border-gray-200 z-10 font-mono">
          JSON
        </div>

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null); // Type qilayotganda xatoni o'chiramiz
            calculateStats(e.target.value);
          }}
          placeholder="Paste your JSON here..."
          className={`
            w-full h-[500px] p-6 pt-8 font-mono text-sm bg-white border rounded-xl outline-none resize-y shadow-inner
            ${error ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'}
          `}
          spellCheck="false"
        />

        {/* Footer Stats */}
        <div className="absolute bottom-2 right-4 text-xs text-gray-400 font-mono bg-white/80 px-2 py-1 rounded">
          Size: {stats.size} • Chars: {stats.items}
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="bg-blue-50 p-4 rounded-xl">
          <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-2">
            <FileJson className="w-4 h-4" /> What is JSON Formatting?
          </h3>
          <p className="text-sm text-blue-700">
            It transforms ugly, minified JSON code into a readable format with proper indentation.
            Essential for debugging API responses.
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <h3 className="flex items-center gap-2 font-bold text-green-800 mb-2">
            <Check className="w-4 h-4" /> Validator Included
          </h3>
          <p className="text-sm text-green-700">
            This tool automatically checks for syntax errors (like missing commas or quotes)
            before formatting, ensuring your code is valid.
          </p>
        </div>
      </div>
    </div>
  );
}
