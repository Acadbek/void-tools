"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone"; // Yangi importlar
import { Download, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";

interface ProcessedFile {
  id: string;
  originalName: string;
  preview: string;
  convertedBlob: Blob | null;
  status: 'pending' | 'converting' | 'done';
  fileObject: File;
}

export default function ImageConverter() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);

  // 1. OnDrop funksiyasini aniq tiplashtiramiz
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      originalName: file.name,
      preview: URL.createObjectURL(file),
      convertedBlob: null,
      status: 'pending' as const,
      fileObject: file
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 10
  });

  const convertToPng = async (id: string, file: File) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'converting' } : f));

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error("Canvas context failed");

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;

        setFiles(prev => prev.map(f => f.id === id ? {
          ...f,
          status: 'done',
          convertedBlob: blob
        } : f));

      }, 'image/png', 1.0);

    } catch (error) {
      console.error("Conversion failed", error);
    }
  };

  const handleConvertAll = () => {
    files.forEach(f => {
      if (f.status === 'pending') {
        convertToPng(f.id, f.fileObject);
      }
    });
  };

  const handleDownload = (file: ProcessedFile) => {
    if (file.convertedBlob) {
      const newName = file.originalName.replace(/\.(jpg|jpeg)$/i, "") + ".png";
      saveAs(file.convertedBlob, newName);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* DROP ZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
        `}
      >
        {/* FIX: getInputProps natijasini React tushunadigan tilga o'giramiz */}
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />

        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-700">
              {isDragActive ? "Drop JPGs here..." : "Drag & Drop JPG files here"}
            </p>
            <p className="text-sm text-gray-500 mt-1">or click to select files</p>
          </div>
        </div>
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {files.map((file) => (
            <div key={file.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 overflow-hidden">
                <img src={file.preview} alt="preview" className="w-12 h-12 object-cover rounded-lg border" />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{file.originalName}</p>
                  <p className="text-xs text-gray-500">
                    {file.status === 'done' ? 'Converted to PNG' : 'Ready to convert'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {file.status === 'pending' && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Waiting</span>
                )}
                {file.status === 'converting' && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    <Loader2 className="w-3 h-3 animate-spin" /> Processing
                  </span>
                )}
                {file.status === 'done' && (
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                )}

                <button onClick={() => removeFile(file.id)} className="p-2 text-gray-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACTION BAR */}
      {files.length > 0 && files.some(f => f.status === 'pending') && (
        <div className="flex justify-center">
          <button
            onClick={handleConvertAll}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Convert All to PNG <ImageIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
