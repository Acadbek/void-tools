"use client";

import {
  Copy, Check, AlertCircle, Zap, ClipboardPaste, AlertTriangle
} from "lucide-react";
import { useCssConverter } from "@/hooks/code/css-to-tailwind/use-css-converter";
import { useClipboard } from "@/hooks/code/css-to-tailwind/use-clipboard";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism-tomorrow.css";

export default function CssToTailwindPro() {
  const { input, setInput, output, status, error, reset, unsupportedProps = [] } = useCssConverter();
  const { copied, copy } = useClipboard();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
      }
    } catch (err) {
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[600px]">
      <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">

        {/* CHAP TOMON - CSS INPUT */}
        <div className="flex flex-col gap-2 h-full">
          <label className="text-xs font-bold text-muted-foreground uppercase flex justify-between px-1">
            <span>CSS Input</span>
            {status === 'converting' && <Zap className="w-3 h-3 text-amber-500 animate-pulse" />}
          </label>

          <div className={`relative w-full h-full rounded-xl border overflow-hidden bg-[#2d2d2d] transition-all group ${status === 'error' ? 'border-destructive/50 ring-2 ring-destructive/20' : 'border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary'}`}>

            <button
              onClick={handlePaste}
              className={`
                  absolute top-3 right-3 z-10 
                  flex items-center gap-2 px-4 py-4 
                  bg-secondary text-secondary-foreground font-bold text-xs rounded-lg border border-border
                  shadow-sm hover:shadow-md hover:bg-secondary/80 hover:scale-105 active:scale-95
                  transition-all duration-200
              `}
            >
              <ClipboardPaste className="w-4 h-4" />
              Paste Code
            </button>

            <div className="w-full h-full overflow-auto">
              <Editor
                value={input}
                onValueChange={(code) => setInput(code)}
                highlight={(code) => highlight(code, languages.css)}
                padding={20}
                className="font-mono text-sm leading-relaxed min-h-full"
                textareaClassName="focus:outline-none"
                placeholder={`Paste CSS here...\nExample:\n\nwidth: 100%;\nbackground: #000;`}
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 14,
                  color: '#f8f8f2',
                  backgroundColor: 'transparent',
                  minHeight: '100%'
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full min-h-0">
          <div className="flex justify-between items-center h-5 px-1">
            <label className="text-xs font-bold text-muted-foreground uppercase">Tailwind Result</label>
            {output && (
              <button
                onClick={() => copy(output)}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${copied ? "text-green-600" : "text-primary hover:text-primary/80"}`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy Class"}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="relative w-full flex-1 rounded-xl border border-border overflow-hidden bg-[#2d2d2d] group">
              {status === 'error' ? (
                <div className="w-full h-full p-4 text-destructive text-sm flex flex-col items-center justify-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-6 h-6" />
                  <p className="font-semibold">Conversion Failed</p>
                  <p className="text-xs text-destructive/80 opacity-80">Check your syntax</p>
                </div>
              ) : (
                <>
                  <div
                    className={`
                        w-full h-full
                        transition-all duration-200
                        ${status === 'converting' || status === 'typing' ? 'opacity-50' : 'opacity-100'}
                        ${output ? 'cursor-pointer hover:border-primary/30' : ''}
                      `}
                    onClick={() => output && copy(output)}
                    title="Click to copy"
                  >
                    <Editor
                      value={output}
                      onValueChange={() => { }}
                      highlight={(code) => highlight(code, languages.css)}
                      padding={20}
                      className="font-mono text-sm leading-relaxed"
                      style={{
                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                        fontSize: 14,
                        minHeight: '100%',
                        color: '#a5d6ff',
                        backgroundColor: 'transparent'
                      }}
                      textareaClassName="focus:outline-none cursor-pointer"
                      placeholder="Result appears here..."
                    />
                  </div>

                  {output && !copied && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                        Click to copy
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {unsupportedProps.length > 0 && output && (
              <div className="shrink-0 w-full p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-2 text-amber-500">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Quyidagilar convert qilinmadi</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {unsupportedProps.map((prop, index) => (
                    <li key={index} className="text-xs font-mono text-amber-200/80">
                      {prop}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
