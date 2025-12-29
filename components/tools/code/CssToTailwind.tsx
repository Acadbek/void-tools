"use client";

import {
    Copy, Check, Trash2, Wind, Loader2,
    AlertCircle, Zap, ClipboardPaste
} from "lucide-react";
import { useCssConverter } from "@/hooks/code/css-to-tailwind/use-css-converter";
import { useSmartEditor } from "@/hooks/code/css-to-tailwind/use-smart-editor";
import { useClipboard } from "@/hooks/code/css-to-tailwind/use-clipboard";

export default function CssToTailwindPro() {
    const { input, setInput, output, status, error, reset } = useCssConverter();
    const { textAreaRef, handleKeyDown } = useSmartEditor(setInput);
    const { copied, copy } = useClipboard();

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setInput(text);
                textAreaRef.current?.focus();
            }
        } catch (err) {
            setInput("");
            textAreaRef.current?.focus();
        }
    };

    return (
        <div className="flex flex-col gap-6 h-[600px]">
            <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">

                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-gray-500 uppercase flex justify-between px-1">
                        <span>CSS Input</span>
                        {status === 'converting' && <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />}
                    </label>

                    <div className={`relative w-full h-full rounded-xl border overflow-hidden bg-white transition-all group ${status === 'error' ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'}`}>

                        <button
                            onClick={handlePaste}
                            className={`
                                absolute top-3 right-3 z-10 
                                flex items-center gap-2 px-4 py-4 
                                bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-100
                                shadow-sm hover:shadow-md hover:bg-blue-100 hover:scale-105 active:scale-95
                                transition-all duration-200
                            `}
                        >
                            <ClipboardPaste className="w-4 h-4" />
                            Paste Code
                        </button>

                        <textarea
                            ref={textAreaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Paste CSS here...\nExample:\n\nwidth: 100%;\nbackground: #000;`}
                            className="w-full h-full p-4 font-mono text-sm resize-none outline-none leading-relaxed text-gray-800"
                            spellCheck={false}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 h-full">
                    <div className="flex justify-between items-center h-5 px-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Tailwind Result</label>
                        {output && (
                            <button
                                onClick={() => copy(output)}
                                className={`text-xs font-bold flex items-center gap-1 transition-colors ${copied ? "text-green-600" : "text-blue-600 hover:text-blue-700"}`}
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? "Copied" : "Copy Class"}
                            </button>
                        )}
                    </div>

                    <div className="relative w-full h-full group">
                        {status === 'error' ? (
                            <div className="w-full h-full p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm flex flex-col items-center justify-center gap-2 animate-in fade-in">
                                <AlertCircle className="w-6 h-6" />
                                <p className="font-semibold">Conversion Failed</p>
                                <p className="text-xs text-red-500 opacity-80">Check your syntax</p>
                            </div>
                        ) : (
                            <>
                                <textarea
                                    value={output}
                                    readOnly
                                    onClick={() => copy(output)}
                                    title="Click to copy"
                                    placeholder="Result appears here..."
                                    className={`
                                        w-full h-full p-4 rounded-xl border border-gray-200 font-mono text-sm resize-none outline-none
                                        bg-gray-50 text-blue-700 leading-relaxed transition-all duration-200
                                        ${status === 'converting' || status === 'typing' ? 'opacity-50' : 'opacity-100'}
                                        ${output ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''}
                                    `}
                                />
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
                </div>

            </div>
        </div>
    );
}