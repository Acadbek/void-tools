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
      <div className="bg-card border border-border p-4 rounded-xl flex items-start gap-3 shadow-sm">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <FileType className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">Text Extraction Mode</h3>
          <p className="text-xs text-muted-foreground mt-1">
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
              ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-muted'}
              ${file ? 'bg-muted/30 border-solid border-border' : 'bg-card'}
            `}
          >
            <input {...getInputProps()} />

            {file ? (
              <div className="text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <p className="font-semibold text-foreground truncate max-w-[200px] mx-auto">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Ready to convert</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setIsDone(false); }}
                  className="mt-4 text-xs text-destructive hover:text-destructive/80 font-medium underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="font-medium text-foreground">Drag & drop PDF here</p>
                <p className="text-xs text-muted-foreground mt-2">Text-based PDFs work best</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
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
                ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
                : isConverting
                  ? 'bg-primary/70 text-primary-foreground cursor-wait'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5'}
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
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-in slide-in-from-bottom-2">
              <div className="w-12 h-12 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-green-700 dark:text-green-400">Conversion Successful!</h3>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                Your .docx file has been downloaded automatically.
              </p>
              <button
                onClick={() => { setFile(null); setIsDone(false); }}
                className="mt-4 text-sm font-medium text-green-700 dark:text-green-400 hover:underline"
              >
                Convert another file
              </button>
            </div>
          )}

          {!file && !isDone && (
            <div className="hidden md:flex flex-col items-center justify-center h-full text-muted-foreground/30">
              <FileType className="w-16 h-16 mb-4" />
              <p className="text-sm">Editable Word document output</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}