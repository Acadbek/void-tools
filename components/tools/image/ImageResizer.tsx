"use client";

import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Download, Upload, X, Lock, Unlock, RefreshCw } from "lucide-react";
import { saveAs } from "file-saver";

interface ResizableImage {
  file: File;
  preview: string;
  originalWidth: number;
  originalHeight: number;
}

export default function ImageResizer() {
  const [image, setImage] = useState<ResizableImage | null>(null);

  // Controls
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(0.9); // 90%
  const [isProcessing, setIsProcessing] = useState(false);

  // Aspect Ratio (En / Bo'y)
  const ratioRef = useRef<number>(1);

  // 1. Rasm yuklanganda
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      setImage({
        file,
        preview: objectUrl,
        originalWidth: img.width,
        originalHeight: img.height,
      });
      // Boshlang'ich qiymatlar
      setWidth(img.width);
      setHeight(img.height);
      ratioRef.current = img.width / img.height;
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    multiple: false
  });

  // 2. O'lcham o'zgarganda hisoblash
  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspectRatio) {
      setHeight(Math.round(val / ratioRef.current));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspectRatio) {
      setWidth(Math.round(val * ratioRef.current));
    }
  };

  // 3. Resizing Logic (Canvas)
  const handleResizeAndDownload = async () => {
    if (!image) return;
    setIsProcessing(true);

    try {
      // Vaqtinchalik Canvas yaratamiz
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Canvas error");

      // Rasmni yangi o'lchamda chizamiz
      const img = new Image();
      img.src = image.preview;

      await new Promise((resolve) => { img.onload = resolve; });

      // Sifatli resizing (Smoothing)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Blobga o'girish va yuklash
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `resized-${width}x${height}-${image.file.name}`);
        }
        setIsProcessing(false);
      }, image.file.type, quality);

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setWidth(0);
    setHeight(0);
  };

  return (
    <div className="space-y-8">

      {!image ? (
        // UPLOAD STATE
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-muted'}
          `}
        >
          <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
          <div className="flex flex-col items-center gap-4">
            <div className="p-5 bg-primary/10 text-primary rounded-full">
              <Upload className="w-10 h-10" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">Upload Image to Resize</p>
              <p className="text-sm text-muted-foreground mt-2">JPG, PNG, WEBP supported</p>
            </div>
          </div>
        </div>
      ) : (
        // EDITOR STATE
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT: PREVIEW */}
          <div className="bg-muted rounded-xl p-4 flex items-center justify-center border border-border min-h-[400px]">
            <div className="relative shadow-lg rounded-lg overflow-hidden max-w-full">
              <img src={image.preview} alt="Original" className="max-h-[400px] object-contain" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center backdrop-blur-sm">
                Original: {image.originalWidth} x {image.originalHeight}
              </div>
            </div>
          </div>

          {/* RIGHT: CONTROLS */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h3 className="font-bold text-foreground">Resize Options</h3>
              <button onClick={reset} className="text-sm text-destructive hover:text-destructive/80 flex items-center gap-1">
                <X className="w-4 h-4" /> Change Image
              </button>
            </div>

            {/* Dimension Inputs */}
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full mt-1 p-3 border border-border bg-input text-foreground rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Lock Toggle */}
                <button
                  onClick={() => {
                    setMaintainAspectRatio(!maintainAspectRatio);
                    if (!maintainAspectRatio) ratioRef.current = width / height; // Qayta yoqilganda yangi ratio
                  }}
                  className={`mb-1 p-2 rounded-lg border transition-colors ${maintainAspectRatio ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'}`}
                  title="Toggle Aspect Ratio Lock"
                >
                  {maintainAspectRatio ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </button>

                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full mt-1 p-3 border border-border bg-input text-foreground rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[0.25, 0.5, 0.75].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => {
                      const newW = Math.round(image.originalWidth * scale);
                      handleWidthChange(newW);
                    }}
                    className="text-xs bg-muted hover:bg-muted/80 border border-border px-3 py-1 rounded-md text-muted-foreground"
                  >
                    {scale * 100}%
                  </button>
                ))}
                <button
                  onClick={() => { handleWidthChange(1080); handleHeightChange(1080); }}
                  className="text-xs bg-muted hover:bg-muted/80 border border-border px-3 py-1 rounded-md text-muted-foreground"
                >
                  IG Post
                </button>
              </div>
            </div>

            {/* Quality Slider */}
            <div className="pt-4 border-t border-border">
              <label className="flex justify-between text-sm font-medium text-foreground mb-2">
                <span>Output Quality</span>
                <span>{Math.round(quality * 100)}%</span>
              </label>
              <input
                type="range"
                min="0.1" max="1" step="0.1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handleResizeAndDownload}
              disabled={isProcessing || width <= 0 || height <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg text-primary-foreground flex items-center justify-center gap-2 transition-all shadow-md
                ${isProcessing ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90 hover:-translate-y-1 hover:shadow-lg'}
              `}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>Resize & Download <Download className="w-5 h-5" /></>
              )}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
