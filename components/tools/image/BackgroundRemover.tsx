"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  Download,
  Eraser,
  Wand2,
  RotateCcw,
  MousePointer2,
  Image as ImageIcon,
  Check
} from "lucide-react";

type ToolType = 'wand' | 'eraser';

export default function BackgroundRemover() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<ToolType>('wand');
  const [tolerance, setTolerance] = useState(20); // 0-100 (Rang farqi)
  const [brushSize, setBrushSize] = useState(20);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // 1. Rasmni yuklash
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected) {
      const img = new Image();
      img.src = URL.createObjectURL(selected);
      img.onload = () => {
        setImage(img);
        setFile(selected);
        // Canvasni tozalash va rasmni chizish
        setTimeout(() => initCanvas(img), 100);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false
  });

  // 2. Canvasni ishga tushirish
  const initCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // O'lchamlarni to'g'irlash (juda katta rasmlarni kichraytirish mumkin, lekin hozircha original qoldiramiz)
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      saveState(); // Boshlang'ich holatni saqlash
    }
  };

  // 3. Tarixni saqlash (Undo uchun)
  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Maksimum 10 ta qadam saqlaymiz xotira to'lmasligi uchun
      setHistory(prev => [...prev.slice(-9), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    }
  };

  const handleUndo = () => {
    if (history.length <= 1) return; // Asl rasm qolishi kerak
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const newHistory = [...history];
    newHistory.pop(); // Hozirgi holatni olib tashlash
    const previousState = newHistory[newHistory.length - 1];

    if (ctx && previousState) {
      ctx.putImageData(previousState, 0, 0);
      setHistory(newHistory);
    }
  };

  // 4. Magic Wand (Rang bo'yicha o'chirish)
  const removeColor = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Bosilgan joyning rangi
    const pixelIndex = (Math.floor(startY) * width + Math.floor(startX)) * 4;
    const targetR = data[pixelIndex];
    const targetG = data[pixelIndex + 1];
    const targetB = data[pixelIndex + 2];
    const targetA = data[pixelIndex + 3];

    // Agar shundoq ham transparent bo'lsa, to'xtash
    if (targetA === 0) return;

    const tol = tolerance; // 0-100

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a === 0) continue; // Allaqachon o'chirilgan

      // Rang farqini hisoblash (Oddiy Euclidean masofa o'rniga oddiy farqlar yig'indisi tezroq)
      const diff = Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB);

      // 3 rang kanali uchun tolerance (3 * 255 * (tol/100))
      // Oddiyroq qilib: o'rtacha farq tolerance dan kichik bo'lsa
      if (diff < (tol * 3)) {
        data[i + 3] = 0; // Alpha ni 0 qilish (o'chirish)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    saveState();
  };

  // 5. Manual Eraser
  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Sichqoncha koordinatalarini canvas ichki o'lchamiga moslash
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (tool === 'wand') {
      // Wand faqat clickda ishlaydi (onMouseDown da chaqiriladi)
      return;
    }

    if (tool === 'eraser' && isDrawing) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out'; // O'chirish rejimi
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Normal rejimga qaytish
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (tool === 'wand') {
      removeColor(x, y);
      setIsDrawing(false); // Wand click bo'lib tugaydi
    } else if (tool === 'eraser') {
      // Birinchi nuqtani o'chirish
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && tool === 'eraser') {
      saveState(); // Eraser tugagach tarixga yozamiz
    }
    setIsDrawing(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas && file) {
      const link = document.createElement('a');
      link.download = `nobg_${file.name.replace(/\.[^/.]+$/, "")}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none">

      {/* HEADER */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Eraser className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Magic Background Remover</h3>
            <p className="text-xs text-gray-500">Manual tools: Magic Wand & Eraser (No AI)</p>
          </div>
        </div>

        {image && (
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
              title="Undo"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setImage(null); setFile(null); setHistory([]); }}
              className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        )}
      </div>

      {!image ? (
        // UPLOAD ZONE
        <div
          {...getRootProps()}
          className={`
             border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 transition-all cursor-pointer min-h-[400px] bg-white
             ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
           `}
        >
          <input {...getInputProps()} />
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ImageIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Upload Image</h3>
          <p className="text-gray-500 mt-2">To remove background manually</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">

          {/* TOOLBAR */}
          <div className="w-full lg:w-64 flex flex-col gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-fit">

            {/* TOOLS */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Tools</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTool('wand')}
                  className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg border ${tool === 'wand' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <Wand2 className="w-6 h-6" />
                  <span className="text-xs font-medium">Magic Wand</span>
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg border ${tool === 'eraser' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <Eraser className="w-6 h-6" />
                  <span className="text-xs font-medium">Eraser</span>
                </button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* SETTINGS */}
            {tool === 'wand' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Tolerance</label>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{tolerance}</span>
                </div>
                <input
                  type="range" min="1" max="100" value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500">
                  Higher tolerance removes more colors similar to the one you click.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Brush Size</label>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{brushSize}px</span>
                </div>
                <input
                  type="range" min="5" max="100" value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg mt-2">
              <p className="text-xs text-blue-700 flex items-start gap-2">
                <MousePointer2 className="w-4 h-4 shrink-0 mt-0.5" />
                {tool === 'wand'
                  ? "Click on the background color you want to remove."
                  : "Click and drag to erase parts of the image manually."}
              </p>
            </div>
          </div>

          {/* CANVAS WORKSPACE */}
          <div className="flex-1 bg-gray-100 rounded-xl overflow-auto border border-gray-200 relative flex items-center justify-center p-4">
            {/* Shaxmat taxtasi foni (Transparency grid) */}
            <div className="absolute inset-0 bg-[url('https://border-image.com/img/transparent-background.png')] bg-repeat opacity-50 pointer-events-none" />

            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleDraw}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative z-10 max-w-full max-h-full shadow-lg cursor-${tool === 'eraser' ? 'crosshair' : 'default'}`}
              style={{
                cursor: tool === 'eraser' ? 'crosshair' : 'url(https://img.icons8.com/material-outlined/24/000000/magic-wand.png) 2 2, auto'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}