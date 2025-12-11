"use client";

import { useState, useCallback } from "react";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import {
  Upload,
  FileText,
  X,
  ArrowUp,
  ArrowDown,
  Merge,
  Loader2
} from "lucide-react";

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function PdfMerger() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  // 1. Fayllarni qabul qilish
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file: file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB"
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
  });

  // 2. Fayl joylashuvini o'zgartirish (Move Up/Down)
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

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();
      let mergedCount = 0;

      for (const pdfFile of files) {
        try {
          // 1. Fayl bo'sh emasligini tekshiramiz
          if (pdfFile.file.size === 0) {
            console.warn(`Skipping empty file: ${pdfFile.name}`);
            continue;
          }

          // 2. ArrayBuffer o'qiymiz
          const fileBuffer = await pdfFile.file.arrayBuffer();

          // 3. PDF ekanligini tekshiramiz (Magic bytes check)
          const arr = new Uint8Array(fileBuffer).subarray(0, 5);
          const header = String.fromCharCode(...Array.from(arr));
          const isPdf = header.includes("%PDF");

          if (!isPdf) {
            alert(`"${pdfFile.name}" haqiqiy PDF fayl emas (Header not found).`);
            continue;
          }

          // 4. PDF ni yuklaymiz
          const pdf = await PDFDocument.load(fileBuffer, {
            ignoreEncryption: true
          });

          // 5. Sahifalarni nusxalash
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
          mergedCount++;

        } catch (innerError) {
          console.error(`Error loading file ${pdfFile.name}:`, innerError);
          alert(`"${pdfFile.name}" faylini qo'shib bo'lmadi. Fayl buzilgan bo'lishi mumkin.`);
        }
      }

      if (mergedCount === 0) {
        alert("Birlashtirish uchun yaroqli PDF fayllar topilmadi.");
        return;
      }

      // Natijani saqlaymiz
      const pdfBytes = await mergedPdf.save();

      // FIX: Added 'as any' to bypass strict type checking for BlobPart
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });

      saveAs(blob, `merged-t00l-tools-${Date.now()}.pdf`);

    } catch (error) {
      console.error("Global merge error:", error);
      alert("Kutilmagan xatolik yuz berdi.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'}
        `}
      >
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-red-100 text-red-600 rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-xl font-medium text-gray-700">
            {isDragActive ? "Drop PDFs here..." : "Drag & Drop PDF files here"}
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm">
          {files.map((file, index) => (
            <div key={file.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 line-clamp-1">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1 mr-2">
                  <button
                    disabled={index === 0}
                    onClick={() => moveFile(index, 'up')}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === files.length - 1}
                    onClick={() => moveFile(index, 'down')}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                <button onClick={() => removeFile(file.id)} className="p-2 text-gray-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      {files.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleMerge}
            disabled={files.length < 2 || isMerging}
            className={`
              flex items-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all
              ${files.length < 2
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 hover:shadow-xl transform hover:-translate-y-1'}
            `}
          >
            {isMerging ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Merging...
              </>
            ) : (
              <>
                Merge PDF Files <Merge className="w-5 h-5" />
              </>
            )}
          </button>
          {files.length < 2 && (
            <p className="text-center text-sm text-gray-500 mt-2 absolute -bottom-6">
              Add at least 2 files to merge
            </p>
          )}
        </div>
      )}
    </div>
  );
}
