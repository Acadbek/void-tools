"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument, degrees } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import { saveAs } from "file-saver";
import {
  Loader2,
  RotateCw,
  Trash2,
  LayoutGrid,
  RefreshCw,
  Download,
  GripHorizontal
} from "lucide-react";

// Worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PageItem {
  id: string;
  originalIndex: number;
  rotation: number;
  src: string;
}

export default function PdfOrganizer() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected?.type !== "application/pdf") return;

    setFile(selected);
    setIsProcessing(true);
    setPages([]);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(buffer).promise;
      const newPages: PageItem[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          newPages.push({
            id: `page-${i}-${Date.now()}`,
            originalIndex: i - 1,
            rotation: 0,
            src: canvas.toDataURL()
          });
        }
      }
      setPages(newPages);
    } catch (err) {
      console.error(err);
      alert("Error reading PDF.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const rotatePage = (index: number) => {
    setPages(prev => prev.map((p, i) => {
      if (i === index) return { ...p, rotation: (p.rotation + 90) % 360 };
      return p;
    }));
  };

  const deletePage = (index: number) => {
    setPages(prev => prev.filter((_, i) => i !== index));
  };

  const resetAll = () => {
    if (confirm("Reset all changes?")) {
      setPages(prev => prev.map(p => ({ ...p, rotation: 0 })).sort((a, b) => a.originalIndex - b.originalIndex));
    }
  };

  const handleDragStart = (index: number) => setDraggedItemIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    const newPages = [...pages];
    const draggedItem = newPages[draggedItemIndex];
    newPages.splice(draggedItemIndex, 1);
    newPages.splice(index, 0, draggedItem);
    setPages(newPages);
    setDraggedItemIndex(index);
  };

  const handleDragEnd = () => setDraggedItemIndex(null);

  const handleSave = async () => {
    if (!file || pages.length === 0) return;
    setIsProcessing(true);

    try {
      const fileBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(fileBuffer);
      const newDoc = await PDFDocument.create();

      for (const pageItem of pages) {
        const [copiedPage] = await newDoc.copyPages(srcDoc, [pageItem.originalIndex]);
        const existingRotation = copiedPage.getRotation().angle;
        copiedPage.setRotation(degrees(existingRotation + pageItem.rotation));
        newDoc.addPage(copiedPage);
      }

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `organized_${file.name}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Organize PDF</h3>
            <p className="text-xs text-muted-foreground">Drag pages to reorder, rotate or delete.</p>
          </div>
        </div>

        {file && (
          <div className="flex items-center gap-3">
            <button
              onClick={resetAll}
              className="text-sm font-medium text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-lg hover:bg-destructive/10 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>

            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Save PDF
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-[400px]">
        {!file ? (
          <div
            {...getRootProps()}
            className={`
               h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 transition-all cursor-pointer bg-card hover:bg-muted/50
               ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'}
             `}
          >
            <input {...getInputProps()} />
            <div className="w-20 h-20 bg-muted/50 rounded-full shadow-sm flex items-center justify-center mb-6 text-primary">
              <LayoutGrid className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Organize PDF Pages</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Upload a PDF to reorder pages, rotate them, or remove unwanted ones.
            </p>
          </div>
        ) : (
          <div className="h-full bg-muted/30 border border-border rounded-xl p-6 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pages.map((page, idx) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`
                        relative group bg-card rounded-xl shadow-sm border-2 transition-all cursor-move
                        ${draggedItemIndex === idx ? 'opacity-50 border-dashed border-primary scale-95' : 'border-transparent hover:border-primary/50 hover:shadow-md'}
                     `}
                >
                  <div className="p-2 aspect-[3/4] overflow-hidden flex items-center justify-center bg-muted rounded-t-xl relative">
                    <img
                      src={page.src}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-contain transition-transform duration-300"
                      style={{ transform: `rotate(${page.rotation}deg)` }}
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
                      {idx + 1}
                    </div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={() => rotatePage(idx)}
                        className="p-2 bg-card rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors shadow-sm"
                        title="Rotate Right"
                      >
                        <RotateCw className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deletePage(idx)}
                        className="p-2 bg-card rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors shadow-sm"
                        title="Delete Page"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-primary/70 opacity-0 group-hover:opacity-100">
                      <GripHorizontal className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {pages.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <Trash2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>All pages deleted.</p>
                <button onClick={() => window.location.reload()} className="text-primary underline mt-2">Start Over</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}