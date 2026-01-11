"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import {
  FileText,
  UploadCloud,
  Download,
  ArrowRight,
  Loader2,
  Settings2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedPdf, setCompressedPdf] = useState<Uint8Array | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Format Bytes (KB/MB)
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // 2. File Drop Handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected?.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    setFile(selected);
    setCompressedPdf(null);
    setStats(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  // 3. Compression Logic
  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);

    try {
      // Faylni ArrayBuffer ga o'girish
      const fileBuffer = await file.arrayBuffer();

      // PDF ni yuklash
      const pdfDoc = await PDFDocument.load(fileBuffer);

      // Kompressiya (Strukturali optimizatsiya)
      // pdf-lib da 'useObjectStreams: true' faylni qayta yozib hajmni qisqartiradi
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50, // UI qotib qolmasligi uchun
      });

      setCompressedPdf(compressedBytes);
      setStats({
        original: file.size,
        compressed: compressedBytes.byteLength
      });
    } catch (err) {
      console.error(err);
      setError("Failed to compress PDF. The file might be corrupted or password protected.");
    } finally {
      setIsCompressing(false);
    }
  };

  // 4. Download Handler
  const handleDownload = () => {
    if (!compressedPdf || !file) return;
    const blob = new Blob([compressedPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed-${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Foiz hisoblash
  const percentage = stats
    ? Math.round(((stats.original - stats.compressed) / stats.original) * 100)
    : 0;

  return (
    <div className="flex flex-col h-full gap-6">

      {/* HEADER / STATUS BAR */}
      <div className="bg-card border border-border p-4 rounded-xl flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Settings2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">Smart Compression</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Optimizes PDF structure and removes unused objects.
            Safe & Private (Processed in browser).
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 h-full">

        {/* LEFT: UPLOAD AREA */}
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
                <p className="text-sm text-muted-foreground mt-1">{formatBytes(file.size)}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setCompressedPdf(null); }}
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
                <p className="font-medium text-foreground">Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground mt-2">PDF files only (Max 50MB recommended)</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        {/* RIGHT: ACTION & RESULT AREA */}
        <div className="flex flex-col gap-4 justify-center">

          {/* Compress Button */}
          <button
            onClick={handleCompress}
            disabled={!file || isCompressing || !!compressedPdf}
            className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md
                    ${!file || !!compressedPdf
                ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5'}
                `}
          >
            {isCompressing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Processing...
              </>
            ) : compressedPdf ? (
              <>
                <CheckCircle2 className="w-6 h-6" /> Compressed!
              </>
            ) : (
              <>
                Compress PDF <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Results Card */}
          {stats && compressedPdf && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in slide-in-from-bottom-4">
              <h4 className="font-semibold text-foreground mb-4">Compression Result</h4>

              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Original Size:</span>
                <span className="font-mono text-foreground">{formatBytes(stats.original)}</span>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-muted-foreground">New Size:</span>
                <span className="font-bold text-green-600 dark:text-green-400 font-mono">{formatBytes(stats.compressed)}</span>
              </div>

              <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${100 - percentage}%` }}
                />
              </div>

              <div className="text-center mb-6">
                <span className="inline-block bg-green-500/10 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                  {percentage > 0 ? `-${percentage}% Reduction` : "Already Optimized"}
                </span>
              </div>

              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Download File
              </button>
            </div>
          )}

          {!file && !stats && (
            <div className="hidden md:flex flex-col items-center justify-center h-full text-muted-foreground/30">
              <ArrowRight className="w-12 h-12 mb-2" />
              <p className="text-sm">Upload a file to start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}