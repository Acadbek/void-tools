"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import {
  Upload,
  Download,
  X,
  ArrowRight,
  CheckCircle2,
  Settings
} from "lucide-react";

interface CompressedFile {
  id: string;
  originalFile: File;
  compressedBlob: Blob | null;
  status: 'pending' | 'compressing' | 'done';
  originalSize: string;
  compressedSize: string;
  savedPercentage: string;
}

export default function ImageCompressor() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  // Sozlamalar (Advanced Settings)
  const [quality, setQuality] = useState(0.8); // 80% sifat
  const [maxWidth, setMaxWidth] = useState(1920);

  // 1. Fayllarni qabul qilish
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      originalFile: file,
      compressedBlob: null,
      status: 'pending' as const,
      originalSize: (file.size / 1024).toFixed(1) + " KB",
      compressedSize: "-",
      savedPercentage: "-"
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 20
  });

  // 2. Siqish (Compression) Logikasi
  const compressSingleFile = async (item: CompressedFile) => {
    // Statusni yangilaymiz
    setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'compressing' } : f));

    try {
      const options = {
        maxSizeMB: 1, // Maksimal 1MB
        maxWidthOrHeight: maxWidth,
        useWebWorker: true, // Tezlik uchun alohida potokda ishlaydi
        initialQuality: quality,
      };

      const compressedBlob = await imageCompression(item.originalFile, options);

      // Hisob-kitoblar
      const originalSizeNum = item.originalFile.size;
      const compressedSizeNum = compressedBlob.size;
      const saved = ((originalSizeNum - compressedSizeNum) / originalSizeNum * 100).toFixed(0);

      setFiles(prev => prev.map(f => f.id === item.id ? {
        ...f,
        status: 'done',
        compressedBlob: compressedBlob,
        compressedSize: (compressedBlob.size / 1024).toFixed(1) + " KB",
        savedPercentage: `${saved}%`
      } : f));

    } catch (error) {
      console.error("Compression error:", error);
      alert(`Error compressing ${item.originalFile.name}`);
    }
  };

  const handleCompressAll = () => {
    files.forEach(f => {
      if (f.status === 'pending') {
        compressSingleFile(f);
      }
    });
  };

  const handleDownload = (item: CompressedFile) => {
    if (item.compressedBlob) {
      saveAs(item.compressedBlob, `min-${item.originalFile.name}`);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* SETTINGS BAR */}
      <div className="bg-card border border-border p-4 rounded-xl flex flex-wrap items-center gap-6 text-sm text-foreground">
        <div className="flex items-center gap-2 font-semibold">
          <Settings className="w-4 h-4 text-primary" /> Compression Settings:
        </div>

        <div className="flex items-center gap-2">
          <label className="text-muted-foreground">Quality:</label>
          <input
            type="range" min="0.1" max="1" step="0.1"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="font-mono text-foreground">{(quality * 100).toFixed(0)}%</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-muted-foreground">Max Width:</label>
          <select
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="bg-muted border border-border rounded px-2 py-1 outline-none text-foreground"
          >
            <option value={1920}>1920px (Full HD)</option>
            <option value={1280}>1280px (HD)</option>
            <option value={800}>800px (Web)</option>
            <option value={0}>Original</option>
          </select>
        </div>
      </div>

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-muted'}
        `}
      >
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-primary/10 text-primary rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-xl font-medium text-foreground">
            {isDragActive ? "Drop images here..." : "Drag & Drop Images (JPG, PNG, WEBP)"}
          </p>
        </div>
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="bg-card rounded-xl border border-border divide-y divide-border shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-4">File Name</div>
            <div className="col-span-3 text-center">Status</div>
            <div className="col-span-4 text-center">Compression</div>
            <div className="col-span-1"></div>
          </div>

          {files.map((file) => (
            <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">

              {/* Name */}
              <div className="col-span-4 truncate font-medium text-foreground" title={file.originalFile.name}>
                {file.originalFile.name}
              </div>

              {/* Status */}
              <div className="col-span-3 flex justify-center">
                {file.status === 'pending' && <span className="text-muted-foreground text-sm">Waiting</span>}
                {file.status === 'compressing' && <span className="text-primary text-sm animate-pulse">Compressing...</span>}
                {file.status === 'done' && (
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="col-span-4 flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">{file.originalSize}</span>
                {file.status === 'done' && (
                  <>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold text-foreground">{file.compressedSize}</span>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-1 rounded ml-1">
                      -{file.savedPercentage}
                    </span>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end gap-2">
                {file.status === 'done' ? (
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 text-green-600 dark:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                ) : (
                  <button onClick={() => removeFile(file.id)} className="p-2 text-muted-foreground hover:text-destructive">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MAIN BUTTON */}
      {files.length > 0 && files.some(f => f.status === 'pending') && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleCompressAll}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
          >
            Compress Images Now
          </button>
        </div>
      )}

    </div>
  );
}
