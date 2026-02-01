"use client";

import { useState } from "react";
import {
  FileCode,
  ArrowRight,
  Copy,
  Trash2,
  Download,
  Check,
  Zap,
  Code2
} from "lucide-react";
import { saveAs } from "file-saver";

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const minifyCss = () => {
    if (!input.trim()) return;

    let minified = input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/;}/g, "}")
      .replace(/([\s:])0(?:px|em|rem|%|in|cm|mm|pc|pt)/g, "$10")
      .trim();

    setOutput(minified);

    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const savedPercent = originalSize > 0
      ? ((originalSize - minifiedSize) / originalSize) * 100
      : 0;

    setStats({
      original: originalSize,
      minified: minifiedSize,
      saved: Math.round(savedPercent)
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/css;charset=utf-8" });
    saveAs(blob, "style.min.css");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats({ original: 0, minified: 0, saved: 0 });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-200px)] min-h-[600px]">

      {/* HEADER */}
      <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">CSS Minifier</h3>
            <p className="text-xs text-muted-foreground">Compress CSS code safely.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="text-sm font-medium text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
          <button
            onClick={minifyCss}
            className="bg-primary text-primary-foreground px-5 py-1.5 rounded-lg text-sm font-bold hover:bg-primary/90 shadow-md flex items-center gap-2 transition-colors"
          >
            <Zap className="w-4 h-4" /> Minify
          </button>
        </div>
      </div>

      {/* EDITOR AREA */}
      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">

        {/* INPUT */}
        <div className="flex flex-col gap-2 h-full">
          <label className="text-xs font-bold text-muted-foreground uppercase flex justify-between">
            <span>Input CSS</span>
            <span className="text-primary">{formatBytes(stats.original)}</span>
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSS code here..."
            className="w-full h-full p-4 rounded-xl border border-border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card text-foreground placeholder:text-muted-foreground/50"
            spellCheck={false}
          />
        </div>

        {/* OUTPUT */}
        <div className="flex flex-col gap-2 h-full">
          <label className="text-xs font-bold text-muted-foreground uppercase flex justify-between items-center h-5">
            <span>Minified Output</span>
            {stats.saved > 0 && (
              <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded text-[10px]">
                -{stats.saved}% Saved ({formatBytes(stats.minified)})
              </span>
            )}
          </label>
          <div className="relative w-full h-full">
            <textarea
              value={output}
              readOnly
              placeholder="Minified result will appear here..."
              className="w-full h-full p-4 rounded-xl border border-border font-mono text-sm resize-none bg-muted/30 text-muted-foreground focus:outline-none focus:border-primary/50"
            />

            {output && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 bg-card border border-border rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                  title="Copy to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-card border border-border rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                  title="Download .min.css"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
