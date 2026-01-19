"use client";

import React, { useState, useRef, useEffect } from "react";
import mammoth from "mammoth";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css";

import {
  Upload, FileText,
  X, RefreshCw, Download, AlertCircle
} from "lucide-react";

export default function DocxToHTML() {
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (html) {
      Prism.highlightAll();
    }
  }, [html]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx")) {
      setError("Please upload a .docx file.");
      return;
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSizeInBytes) {
      setError("File size must be less than 10MB!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setWarnings([]);
    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const options = {
        styleMap: [
          // Headings
          "p[style-name='Title'] => h1.title:fresh",
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Heading 4'] => h4:fresh",
          "p[style-name='Heading 5'] => h5:fresh",
          "p[style-name='Heading 6'] => h6:fresh",

          // Special styles
          "p[style-name='Subtitle'] => h2.subtitle:fresh",
          "p[style-name='Quote'] => blockquote:fresh",
          "p[style-name='Intense Quote'] => blockquote.intense:fresh",
          "p[style-name='List Paragraph'] => p.list-paragraph:fresh",

          // Inline styles
          "r[style-name='Strong'] => strong:fresh",
          "r[style-name='Emphasis'] => em:fresh",
          "r[style-name='Intense Emphasis'] => strong > em:fresh",
          "r[style-name='Subtle Emphasis'] => span.subtle:fresh",

          // Character styles
          "comment-reference => sup.comment",
          "endnote-reference => sup.endnote",

          // Table styles
          "table[style-name='Table Grid'] => table.table-grid:fresh",
          "table[style-name='Light Shading'] => table.light-shading:fresh",
        ],

        ignoreEmptyParagraphs: false,

        convertImage: mammoth.images.imgElement(function (image) {
          return image.read("base64").then(function (imageBuffer) {
            return {
              src: "data:" + image.contentType + ";base64," + imageBuffer,
              alt: image.altText || ""
            };
          });
        }),

        transformDocument: function (document: any) {
          return document;
        }
      };

      const result = await mammoth.convertToHtml({ arrayBuffer }, options);

      if (result.messages && result.messages.length > 0) {
        const warningMessages = result.messages
          .filter((m: any) => m.type === 'warning')
          .map((m: any) => m.message);
        setWarnings(warningMessages);
        console.log("Conversion warnings:", result.messages);
      }

      let cleanedHtml = result.value;

      cleanedHtml = cleanedHtml.replace(/<p><\/p>/g, '<p>&nbsp;</p>');

      const formattedHtml = formatHTML(cleanedHtml);
      setHtml(formattedHtml);

    } catch (err) {
      console.error("Conversion error:", err);
      setError("An error occurred while reading the file. Please try again with a different file.");
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
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${fileName?.replace('.docx', '') || 'Document'}</title>
        <style>
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            color: #000;
            background: #fff;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          table td, table th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .subtle { font-style: italic; opacity: 0.8; }
          blockquote {
            border-left: 4px solid #ccc;
            margin-left: 0;
            padding-left: 1em;
            color: #666;
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
    setWarnings([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-white">DOCX to HTML Converter</h1>
          <p className="text-zinc-400">Professional document conversion with full formatting support</p>
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
                  {isLoading ? "Converting..." : "Upload DOCX File"}
                </h2>
                <p className="text-zinc-500 mt-2">
                  Drag and drop or click to select • Max 10MB
                </p>
                <p className="text-zinc-600 text-sm mt-1">
                  Supports text formatting, colors, tables, images, and more
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {html && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">

            {/* File Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="font-medium text-zinc-200 block">{fileName}</span>
                  <span className="text-xs text-zinc-500">Successfully converted</span>
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

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-yellow-400 font-medium mb-1">Conversion Warnings:</p>
                    <ul className="text-yellow-300/80 text-sm space-y-1 list-disc list-inside">
                      {warnings.slice(0, 3).map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                      {warnings.length > 3 && (
                        <li className="text-yellow-400">+ {warnings.length - 3} more warnings (check console)</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
            <X size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}