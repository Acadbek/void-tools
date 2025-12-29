"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Scissors,
  Loader2,
  CheckCircle2,
  Download,
  Trash2,
} from "lucide-react";

// Worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]); // 0-based index
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitMode, setSplitMode] = useState<"merge" | "zip">("merge"); // Bitta PDF yoki ZIP

  // 1. Fayl yuklash va Thumbnaillarni generatsiya qilish
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected?.type !== "application/pdf") return;

    setFile(selected);
    setSelectedPages([]);
    setThumbnails([]);
    setIsProcessing(true);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(buffer).promise;
      const pages: string[] = [];

      // Har bir sahifani kichik rasm (thumbnail) qilib olamiz
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 }); // Optimallashtirilgan o'lcham
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          pages.push(canvas.toDataURL());
        }
      }
      setThumbnails(pages);
    } catch (err) {
      console.error(err);
      alert("Error loading PDF preview.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  // 2. Sahifani tanlash/bekor qilish
  const togglePage = (index: number) => {
    setSelectedPages(prev =>
      prev.includes(index)
        ? prev.filter(p => p !== index)
        : [...prev, index].sort((a, b) => a - b)
    );
  };

  const selectAll = () => {
    if (selectedPages.length === thumbnails.length) {
      setSelectedPages([]); // Deselect all
    } else {
      setSelectedPages(thumbnails.map((_, i) => i)); // Select all
    }
  };

  // 3. Split va Download logikasi
  const handleSplit = async () => {
    if (!file || selectedPages.length === 0) return;
    setIsProcessing(true);

    try {
      const fileBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(fileBuffer);

      if (splitMode === "merge") {
        // A. Tanlangan sahifalardan yangi BITTA PDF yasash
        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(srcDoc, selectedPages);
        copiedPages.forEach(page => newDoc.addPage(page));

        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        saveAs(blob, `split_${file.name}`);
      } else {
        // B. Har bir tanlangan sahifani ALOHIDA fayl qilib ZIPlash
        const zip = new JSZip();

        for (const pageIndex of selectedPages) {
          const singleDoc = await PDFDocument.create();
          const [copiedPage] = await singleDoc.copyPages(srcDoc, [pageIndex]);
          singleDoc.addPage(copiedPage);
          const pdfBytes = await singleDoc.save();
          zip.file(`page_${pageIndex + 1}.pdf`, pdfBytes);
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        saveAs(zipContent, `split_pages.zip`);
      }

    } catch (err) {
      console.error(err);
      alert("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">

      {/* TOOLBAR */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Split PDF</h3>
            <p className="text-xs text-gray-500">Select pages to extract.</p>
          </div>
        </div>

        {file && (
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <button
              onClick={selectAll}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {selectedPages.length === thumbnails.length ? "Deselect All" : "Select All"}
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSplitMode("merge")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${splitMode === "merge" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
              >
                Merge Selected
              </button>
              <button
                onClick={() => setSplitMode("zip")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${splitMode === "zip" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
              >
                Separate (ZIP)
              </button>
            </div>

            <button
              onClick={handleSplit}
              disabled={selectedPages.length === 0 || isProcessing}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Download
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-[400px]">
        {!file ? (
          // UPLOAD AREA
          <div
            {...getRootProps()}
            className={`
               h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 transition-all cursor-pointer bg-gray-50 hover:bg-white
               ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
             `}
          >
            <input {...getInputProps()} />
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
              <Scissors className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Split PDF Document</h3>
            <p className="text-gray-500 text-center max-w-md">
              Drag and drop a PDF file here to view pages and extract them.
            </p>
          </div>
        ) : (
          // VISUAL GRID AREA
          <div className="h-full bg-gray-100/50 border border-gray-200 rounded-xl p-6 overflow-y-auto">
            {thumbnails.length === 0 ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {thumbnails.map((src, idx) => {
                  const isSelected = selectedPages.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => togglePage(idx)}
                      className={`
                            relative group cursor-pointer transition-all duration-200
                            ${isSelected ? 'transform scale-95' : 'hover:-translate-y-1'}
                          `}
                    >
                      {/* Page Preview */}
                      <div className={`
                             rounded-lg overflow-hidden border-2 shadow-sm relative aspect-[3/4] bg-white
                             ${isSelected ? 'border-blue-500 ring-2 ring-blue-200 ring-offset-2' : 'border-transparent group-hover:border-gray-300'}
                           `}>
                        <img src={src} alt={`Page ${idx + 1}`} className="w-full h-full object-contain" />

                        {/* Overlay on Hover */}
                        <div className={`absolute inset-0 bg-blue-900/10 transition-opacity ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />

                        {/* Checkbox Indicator */}
                        <div className={`
                                absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-sm
                                ${isSelected ? 'bg-blue-500 text-white scale-100' : 'bg-white/90 text-gray-300 scale-90 group-hover:scale-100'}
                              `}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>

                        {/* Page Number */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-900/70 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Page {idx + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-8 text-center pb-4">
              <button
                onClick={() => { setFile(null); setThumbnails([]); setSelectedPages([]); }}
                className="text-sm text-red-500 hover:text-red-700 font-medium inline-flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Cancel & Remove File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}