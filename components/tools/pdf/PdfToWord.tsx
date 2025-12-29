"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun, PageBreak } from "docx";
import { saveAs } from "file-saver";
import {
    FileText,
    UploadCloud,
    ArrowRight,
    Loader2,
    FileType,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PdfToWord() {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isDone, setIsDone] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selected = acceptedFiles[0];
        if (selected?.type !== "application/pdf") {
            setError("Please upload a valid PDF file.");
            return;
        }
        setFile(selected);
        setIsDone(false);
        setProgress(0);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const convertToWord = async () => {
        if (!file) return;
        setIsConverting(true);
        setProgress(0);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            const totalPages = pdf.numPages;

            // Word hujjati uchun bo'limlar (sections)
            const docChildren: (Paragraph | PageBreak)[] = [];

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                // 1. Text itemlarni tartiblash (Y bo'yicha tushish, X bo'yicha o'ngga)
                // PDF.js ba'zan matnni aralashtirib beradi, shuning uchun sort qilish shart.
                const items = textContent.items.map((item: any) => ({
                    str: item.str,
                    x: item.transform[4], // X coordinate
                    y: item.transform[5], // Y coordinate (PDFda pastdan tepaga o'sadi)
                    hasEOL: item.hasEOL
                }));

                // Y coordinate bo'yicha teskari (tepadan pastga) va X bo'yicha (chapdan o'ngga) sortlash
                items.sort((a, b) => {
                    if (Math.abs(a.y - b.y) > 5) { // Agar qator farqi 5px dan katta bo'lsa
                        return b.y - a.y; // Tepada turgani birinchi
                    }
                    return a.x - b.x; // Aks holda chapdagi birinchi
                });

                // 2. Qatorlarni yig'ish (Line Grouping)
                let currentY = -1;
                let currentLineText: string[] = [];

                items.forEach((item) => {
                    // Agar yangi qator bo'lsa (Y farqi katta bo'lsa)
                    if (currentY !== -1 && Math.abs(item.y - currentY) > 8) {
                        // Eski qatorni Word Paragraph ga aylantiramiz
                        if (currentLineText.length > 0) {
                            docChildren.push(
                                new Paragraph({
                                    children: [new TextRun(currentLineText.join(" "))],
                                    spacing: { after: 120 } // Kichik otstup
                                })
                            );
                        }
                        currentLineText = [];
                    }
                    currentY = item.y;
                    currentLineText.push(item.str);
                });

                // Oxirgi qatorni qo'shish
                if (currentLineText.length > 0) {
                    docChildren.push(
                        new Paragraph({
                            children: [new TextRun(currentLineText.join(" "))],
                        })
                    );
                }

                // Agar oxirgi sahifa bo'lmasa, PageBreak qo'shish
                if (i < totalPages) {
                    docChildren.push(new PageBreak());
                }

                setProgress(Math.round((i / totalPages) * 100));
            }

            // 3. DOCX yaratish va yuklash
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: docChildren as any // Typescript trick
                }],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, file.name.replace(".pdf", ".docx"));

            setIsDone(true);

        } catch (err) {
            console.error(err);
            setError("Failed to convert file. Complex layouts may not be supported.");
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* INFO CARD */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <FileType className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Text Extraction Mode</h3>
                    <p className="text-xs text-gray-600 mt-1">
                        This tool extracts text and paragraphs from PDF to create an editable Word document.
                        Perfect for contracts, essays, and text-heavy documents. Images are skipped for speed.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 h-full">

                {/* LEFT: UPLOAD */}
                <div className="flex flex-col gap-4">
                    <div
                        {...getRootProps()}
                        className={`
              flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer min-h-[300px]
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
              ${file ? 'bg-gray-50 border-solid border-gray-300' : 'bg-white'}
            `}
                    >
                        <input {...getInputProps()} />

                        {file ? (
                            <div className="text-center animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <p className="font-semibold text-gray-800 truncate max-w-[200px] mx-auto">{file.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Ready to convert</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFile(null); setIsDone(false); }}
                                    className="mt-4 text-xs text-red-500 hover:text-red-700 font-medium underline"
                                >
                                    Remove file
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full mx-auto flex items-center justify-center mb-4">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <p className="font-medium text-gray-700">Drag & drop PDF here</p>
                                <p className="text-xs text-gray-400 mt-2">Text-based PDFs work best</p>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}
                </div>

                {/* RIGHT: ACTION */}
                <div className="flex flex-col gap-4 justify-center">

                    <button
                        onClick={convertToWord}
                        disabled={!file || isConverting}
                        className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md
                    ${!file
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                : isConverting
                                    ? 'bg-blue-400 text-white cursor-wait'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'}
                `}
                    >
                        {isConverting ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" /> Processing {progress}%
                            </>
                        ) : (
                            <>
                                Convert to Word <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {isDone && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in slide-in-from-bottom-2">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center mb-3">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-green-800">Conversion Successful!</h3>
                            <p className="text-sm text-green-700 mt-1">
                                Your .docx file has been downloaded automatically.
                            </p>
                            <button
                                onClick={() => { setFile(null); setIsDone(false); }}
                                className="mt-4 text-sm font-medium text-green-700 hover:underline"
                            >
                                Convert another file
                            </button>
                        </div>
                    )}

                    {!file && !isDone && (
                        <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-300">
                            <FileType className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-sm">Editable Word document output</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}