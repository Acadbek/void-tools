"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import {
  Upload,
  X,
  ArrowUp,
  ArrowDown,
  Check,
  Settings2,
  Loader2
} from "lucide-react";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

const PAGE_SIZES = {
  'a4': { width: 595.28, height: 841.89, label: 'A4 (Standard)' },
  'letter': { width: 612, height: 792, label: 'US Letter' },
  'auto': { width: 0, height: 0, label: 'Fit to Image Size' },
};

export default function ImageToPdf() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [pageSize, setPageSize] = useState<keyof typeof PAGE_SIZES>('a4');
  const [margin, setMargin] = useState(20); // 20px hoshiya

  // 1. Fayl qabul qilish
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file: file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
  });

  // 2. Tartiblash (Sorting)
  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    }
    setFiles(newFiles);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  // 3. ASOSIY LOGIKA: Convert to PDF
  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsConverting(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgFile of files) {
        // Faylni o'qish
        const imageBytes = await imgFile.file.arrayBuffer();
        let pdfImage;

        // Formatga qarab embed qilish
        if (imgFile.file.type === 'image/jpeg') {
          pdfImage = await pdfDoc.embedJpg(imageBytes);
        } else if (imgFile.file.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(imageBytes);
        } else {
          continue; // Boshqa formatlar tashlab ketiladi
        }

        const imgDims = pdfImage.scale(1);

        // Page o'lchamini aniqlash
        let pageWidth, pageHeight;

        if (pageSize === 'auto') {
          pageWidth = imgDims.width + (margin * 2);
          pageHeight = imgDims.height + (margin * 2);
        } else {
          pageWidth = PAGE_SIZES[pageSize].width;
          pageHeight = PAGE_SIZES[pageSize].height;
        }

        // Sahifa qo'shish
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Rasmni markazga joylashtirish (Scale logic)
        let drawWidth = imgDims.width;
        let drawHeight = imgDims.height;

        if (pageSize !== 'auto') {
          // Rasmni sahifaga sig'dirish (Aspect Ratio saqlagan holda)
          const maxWidth = pageWidth - (margin * 2);
          const maxHeight = pageHeight - (margin * 2);

          const scale = Math.min(maxWidth / imgDims.width, maxHeight / imgDims.height, 1);
          drawWidth = imgDims.width * scale;
          drawHeight = imgDims.height * scale;
        }

        page.drawImage(pdfImage, {
          x: (pageWidth - drawWidth) / 2,
          y: (pageHeight - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      saveAs(blob, `images-to-pdf-${Date.now()}.pdf`);

    } catch (error) {
      console.error("PDF Conversion failed:", error);
      alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* SETTINGS BAR */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Settings2 className="w-5 h-5" /> PDF Settings
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Page Size:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as any)}
            className="border border-border rounded-lg px-3 py-1.5 bg-muted outline-none text-sm focus:ring-2 focus:ring-primary text-foreground"
          >
            {Object.entries(PAGE_SIZES).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Margin:</label>
          <select
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="border border-border rounded-lg px-3 py-1.5 bg-muted outline-none text-sm text-foreground"
          >
            <option value={0}>No Margin</option>
            <option value={20}>Small (20px)</option>
            <option value={50}>Large (50px)</option>
          </select>
        </div>
      </div>

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-muted'}
        `}
      >
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-primary/10 text-primary rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-xl font-medium text-foreground">
            {isDragActive ? "Drop images here..." : "Drag & Drop Images (JPG, PNG)"}
          </p>
        </div>
      </div>

      {/* IMAGE LIST */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={file.id} className="relative group bg-card p-3 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">

              {/* Preview Image */}
              <div className="h-32 w-full bg-muted rounded-lg overflow-hidden mb-3 relative flex items-center justify-center">
                <img src={file.preview} alt="preview" className="max-h-full max-w-full object-contain" />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  #{index + 1}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveFile(index, 'up')}
                    className="p-1.5 text-muted-foreground hover:bg-muted rounded-md disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === files.length - 1}
                    onClick={() => moveFile(index, 'down')}
                    className="p-1.5 text-muted-foreground hover:bg-muted rounded-md disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => removeFile(file.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add more button style */}
          <div {...getRootProps()} className="flex flex-col items-center justify-center h-full min-h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-muted transition-colors">
            <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
            <div className="text-muted-foreground flex flex-col items-center">
              <Upload className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Add More</span>
            </div>
          </div>
        </div>
      )}

      {/* CONVERT BUTTON */}
      {files.length > 0 && (
        <div className="flex justify-center pt-6">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className={`
               flex items-center gap-2 px-10 py-4 text-primary-foreground font-bold text-lg rounded-xl shadow-lg transition-all
               ${isConverting ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl'}
            `}
          >
            {isConverting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...</>
            ) : (
              <><Check className="w-5 h-5" /> Convert to PDF</>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
