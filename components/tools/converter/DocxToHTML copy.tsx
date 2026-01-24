"use client";

import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css";

import {
  Upload, FileText, Code, Copy, Check,
  X, RefreshCw, Eye, Download, AlertCircle, Zap
} from "lucide-react";

export default function DocxToHTML() {
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [renderMethod, setRenderMethod] = useState<'preview' | 'export'>('export');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (html) {
      Prism.highlightAll();
    }
  }, [html]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx")) {
      setError("Iltimos, faqat .docx formatidagi faylni yuklang.");
      return;
    }

    const maxSizeInBytes = 10 * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      setError("Fayl hajmi 10MB dan kichik bo'lishi kerak!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      // Dynamic import docx-preview
      const { renderAsync } = await import('docx-preview');

      if (previewRef.current) {
        // Clear previous content
        previewRef.current.innerHTML = '';

        // Render DOCX with full formatting
        await renderAsync(file, previewRef.current, undefined, {
          className: 'docx-wrapper',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: false,
          experimental: true,
          trimXmlDeclaration: true,
          useBase64URL: true,
          renderChanges: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
        });

        // Extract HTML from rendered preview
        const renderedHtml = previewRef.current.innerHTML;
        const formattedHtml = formatHTML(renderedHtml);
        setHtml(formattedHtml);
      }

    } catch (err) {
      console.error("Conversion error:", err);
      setError("Faylni o'qishda xatolik yuz berdi. Kutubxona yuklanmadi: npm install docx-preview");
    } finally {
      setIsLoading(false);
    }
  };

  const formatHTML = (htmlStr: string) => {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;

    const xml = htmlStr.replace(reg, '$1\n$2$3');

    xml.split('\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1;
      } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      let padding = '';
      for (let i = 0; i < pad; i++) {
        padding += '  ';
      }

      formatted += padding + node + '\n';
      pad += indent;
    });

    return formatted.trim();
  };

  const copyToClipboard = () => {
    if (html) {
      navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadHtml = () => {
    if (!html) return;

    const fullHtml = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName?.replace('.docx', '') || 'Document'}</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      line-height: 1.6;
      max-width: 210mm;
      margin: 40px auto;
      padding: 20px;
      color: #000;
      background: #fff;
    }
    
    /* Preserve DOCX styles */
    .docx-wrapper {
      background: white;
    }
    
    /* Tables */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    table td, table th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    /* Images */
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Lists */
    ul, ol {
      margin: 1em 0;
      padding-left: 2em;
    }
    
    /* Preserve inline styles from DOCX */
    span[style], p[style], div[style] {
      /* Keep all inline styles */
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName?.replace('.docx', '') || 'document'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setHtml(null);
    setFileName(null);
    setError(null);
    if (previewRef.current) {
      previewRef.current.innerHTML = '';
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">DOCX to HTML Pro</h1>
          </div>
          <p className="text-zinc-400">Full formatting support: colors, highlights, fonts & more</p>
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg px-4 py-2 inline-block">
            <AlertCircle size={16} />
            <span>Install: <code className="bg-black/30 px-2 py-0.5 rounded">npm install docx-preview</code></span>
          </div>
        </div>

        {/* Upload Area */}
        {!html && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-3xl p-20 text-center cursor-pointer transition-all group
              ${error ? "border-red-500/50 bg-red-500/5" : "border-zinc-800 hover:border-blue-500 bg-zinc-900/30 hover:bg-zinc-900/50"}
            `}
          >
            <input
              type="file"
              accept=".docx"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 rounded-2xl bg-zinc-800 text-blue-400 group-hover:scale-110 transition-transform">
                {isLoading ? (
                  <RefreshCw className="w-12 h-12 animate-spin" />
                ) : (
                  <Upload className="w-12 h-12" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {isLoading ? "Converting with full format support..." : "Upload DOCX File"}
                </h2>
                <p className="text-zinc-500 mt-2">
                  Drag and drop or click to select • Max 10MB
                </p>
                <p className="text-green-400 text-sm mt-1 font-medium">
                  ✓ Colors  ✓ Highlights  ✓ Fonts  ✓ Tables  ✓ Images
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hidden preview container */}
        <div ref={previewRef} style={{ display: 'none' }} />

        {/* Results */}
        {html && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">

            {/* File Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <Check size={20} />
                </div>
                <div>
                  <span className="font-medium text-zinc-200 block">{fileName}</span>
                  <span className="text-xs text-green-400">✓ Converted with full formatting</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadHtml}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium"
                  title="Download HTML"
                >
                  <Download size={16} /> Download
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors text-sm"
                >
                  <X size={16} /> New File
                </button>
              </div>
            </div>

            {/* Preview and Code */}
            <div className="grid lg:grid-cols-2 gap-6" style={{ height: 'calc(100vh - 320px)', minHeight: '600px' }}>

              {/* Preview Panel */}
              <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
                <div className="p-3 border-b border-zinc-800 flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900/50">
                  <Eye size={14} /> Preview (Full Formatting)
                </div>
                <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-zinc-900/30 to-zinc-900/50">
                  <div
                    className="bg-white shadow-2xl min-h-full mx-auto p-8"
                    style={{ maxWidth: '210mm' }}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </div>

              {/* Code Panel */}
              <div className="flex flex-col rounded-2xl border border-zinc-800 bg-[#2d2d2d] overflow-hidden">
                <div className="p-3 border-b border-zinc-700 bg-[#2d2d2d] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    <Code size={14} /> HTML Source
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-xs text-white transition-all font-medium"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="flex-1 overflow-auto bg-[#2d2d2d]">
                  <pre className="m-0 p-6 bg-transparent text-sm leading-relaxed">
                    <code className="language-html">
                      {html}
                    </code>
                  </pre>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
            <X size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{error}</p>
              <p className="text-sm text-red-300 mt-1">
                Kutubxona o'rnatilganligini tekshiring: <code className="bg-black/30 px-2 py-0.5 rounded">npm install docx-preview</code>
              </p>
            </div>
          </div>
        )}

        {/* Installation Instructions */}
        {!html && !error && (
          <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Zap size={18} />
              Installation Required
            </h3>
            <div className="space-y-2 text-sm text-zinc-300">
              <p>Bu yechim to'liq formatlashni qo'llab-quvvatlaydi (ranglar, highlight, shriftlar).</p>
              <p>O'rnatish uchun:</p>
              <div className="bg-black/30 p-3 rounded-lg font-mono text-blue-300 mt-2">
                npm install docx-preview
              </div>
              <p className="text-zinc-400 text-xs mt-2">
                Yoki package.json ga qo'shing: <code>"docx-preview": "^2.5.0"</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}