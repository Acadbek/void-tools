"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Image as ImageIcon,
  UploadCloud,
  Download,
  X,
  Settings2,
  Loader2,
  CheckCircle2,
  Trash2,
  FileImage
} from "lucide-react";

type OutputFormat = "png" | "jpeg" | "webp";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "converting" | "done" | "error";
  convertedUrl?: string;
  convertedBlob?: Blob;
  outputSize?: number;
}

export default function UniversalImageConverter() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState(0.9); // 0.1 to 1.0
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Fayl yuklash
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: "idle" as const
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.bmp', '.gif']
    }
  });

  // Xotirani tozalash (Memory leak prevention)
  useEffect(() => {
    return () => files.forEach(f => URL.revokeObjectURL(f.preview));
  }, [files]);

  // 2. Bitta faylni konvertatsiya qilish (Core Logic)
  const convertSingleFile = async (imgFile: ImageFile): Promise<ImageFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imgFile.preview;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Agar JPG bo'lsa, orqa fonni oq qilish kerak (PNG transparent bo'lsa qorayib qolmasligi uchun)
          if (targetFormat === "jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve({
                ...imgFile,
                status: "done",
                convertedBlob: blob,
                convertedUrl: URL.createObjectURL(blob),
                outputSize: blob.size
              });
            } else {
              resolve({ ...imgFile, status: "error" });
            }
          }, `image/${targetFormat}`, quality);
        } else {
          resolve({ ...imgFile, status: "error" });
        }
      };

      img.onerror = () => resolve({ ...imgFile, status: "error" });
    });
  };

  // 3. Hamma fayllarni konvertatsiya qilish
  const handleConvertAll = async () => {
    setIsProcessing(true);

    // Asinxron map ishlatamiz
    const promises = files.map(file => {
      if (file.status === "done") return Promise.resolve(file); // Qayta qilmaslik
      return convertSingleFile({ ...file, status: "converting" });
    });

    const results = await Promise.all(promises);
    setFiles(results);
    setIsProcessing(false);
  };

  // 4. Yuklab olish (Bitta yoki ZIP)
  const downloadFile = (file: ImageFile) => {
    if (file.convertedBlob) {
      const newName = file.file.name.replace(/\.[^/.]+$/, "") + `.${targetFormat}`;
      saveAs(file.convertedBlob, newName);
    }
  };

  const downloadAllZip = async () => {
    const zip = new JSZip();
    let count = 0;

    files.forEach(file => {
      if (file.convertedBlob) {
        const newName = file.file.name.replace(/\.[^/.]+$/, "") + `.${targetFormat}`;
        zip.file(newName, file.convertedBlob);
        count++;
      }
    });

    if (count > 0) {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "converted_images.zip");
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col gap-6">

      {/* 1. CONTROLS BAR */}
      <div className="bg-card border border-border p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-bold text-muted-foreground uppercase">Convert to:</label>
            <div className="flex bg-muted p-1 rounded-lg w-full md:w-auto">
              {["png", "jpeg", "webp"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setTargetFormat(fmt as OutputFormat)}
                  className={`flex-1 px-4 py-1.5 text-sm font-semibold rounded-md transition-all capitalize ${targetFormat === fmt ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Slider (Only for JPG/WEBP) */}
        {targetFormat !== "png" && (
          <div className="flex flex-col gap-1 w-full md:w-48">
            <div className="flex justify-between text-xs font-bold text-muted-foreground">
              <span>Quality</span>
              <span>{Math.round(quality * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {files.length > 0 && (
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleConvertAll}
              disabled={isProcessing}
              className="flex-1 md:flex-none bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCwIcon className="w-5 h-5" />}
              Convert All
            </button>

            {files.some(f => f.status === "done") && (
              <button
                onClick={downloadAllZip}
                className="flex-1 md:flex-none bg-foreground text-background px-4 py-2.5 rounded-lg font-bold hover:bg-foreground/90 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> ZIP
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. DROPZONE AREA */}
      {files.length === 0 ? (
        <div
          {...getRootProps()}
          className={`
             border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 transition-all cursor-pointer min-h-[300px] bg-card
             ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-muted/50'}
           `}
        >
          <input {...getInputProps()} />
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Universal Image Converter</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Drag & drop images here (JPG, PNG, WEBP, SVG). <br />
            We convert them securely in your browser.
          </p>
        </div>
      ) : (
        // 3. FILES GRID
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {/* Add more card */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors min-h-[200px]"
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-muted-foreground">Add more files</span>
          </div>

          {files.map(file => (
            <div key={file.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden group relative flex flex-col">
              {/* Remove Button */}
              <button
                onClick={() => removeFile(file.id)}
                className="absolute top-2 right-2 p-1.5 bg-card/90 text-muted-foreground hover:text-destructive rounded-full shadow-sm z-10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Preview Image */}
              <div className="h-40 bg-muted relative overflow-hidden flex items-center justify-center p-2">
                <img src={file.preview} alt="preview" className="max-w-full max-h-full object-contain" />
                {file.status === "converting" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
                {file.status === "done" && (
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Info & Actions */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold text-foreground truncate w-32" title={file.file.name}>{file.file.name}</p>
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase">
                    {file.file.name.split('.').pop()}
                  </span>
                </div>

                <div className="mt-auto pt-2 border-t border-border flex items-center justify-between">
                  {file.status === "done" ? (
                    <>
                      <span className="text-xs font-medium text-green-600">
                        {formatSize(file.outputSize || 0)}
                      </span>
                      <button
                        onClick={() => downloadFile(file)}
                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-md font-bold hover:bg-primary/20 transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Save
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      {file.status === "error" ? "Error!" : "Ready"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Icon helper
function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}