"use client";

import { useState, useEffect } from "react";
import {
  ArrowRightLeft,
  Copy,
  Trash2,
  AlertCircle,
  CheckCircle2,
  FileCode
} from "lucide-react";

type Mode = "encode" | "decode";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Conversion Logic
  useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      try {
        if (mode === "encode") {
          // UTF-8 Safe Encoding
          const encoded = btoa(
            encodeURIComponent(input).replace(/%([0-9A-F]{2})/g,
              function toSolidBytes(match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
              })
          );
          setOutput(encoded);
          setError(null);
        } else {
          // Decoding logic
          try {
            // Basic validation for Base64 strings
            if (!/^[A-Za-z0-9+/]*={0,2}$/.test(input.replace(/\s/g, ''))) {
              throw new Error("Invalid Base64 characters");
            }

            // UTF-8 Safe Decoding
            const decoded = decodeURIComponent(
              Array.prototype.map.call(atob(input.trim()), function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join('')
            );
            setOutput(decoded);
            setError(null);
          } catch (e) {
            setError("Invalid Base64 string. Please check your input.");
            setOutput("");
          }
        }
      } catch (err) {
        setError("Conversion failed. Verify input format.");
      }
    }, 300); // 300ms debounce for performance

    return () => clearTimeout(timer);
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSwap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output); // Outputni inputga o'tkazish (UX uchun qulay)
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex items-center gap-1">
          <button
            onClick={() => setMode("encode")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "encode"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
              }`}
          >
            Encoder
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "decode"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
              }`}
          >
            Decoder
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* INPUT SECTION */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-gray-400" />
              {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
            </label>
            <button
              onClick={() => setInput("")}
              className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Type text here..." : "Paste Base64 string here..."}
            className={`w-full h-64 p-4 rounded-xl border ${error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-blue-500"
              } shadow-sm focus:ring-2 focus:border-transparent outline-none resize-none font-mono text-sm bg-white transition-all`}
            spellCheck="false"
          />
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-1 animate-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* OUTPUT SECTION */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-gray-400" />
              Result
            </label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              {isCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {isCopied ? "Copied" : "Copy Result"}
            </button>
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Result will appear here..."
              className="w-full h-64 p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-600 shadow-inner outline-none resize-none font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Swap Button (Mobile friendly) */}
      <div className="flex justify-center md:hidden">
        <button
          onClick={handleSwap}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" /> Swap Input/Output
        </button>
      </div>
    </div>
  );
}