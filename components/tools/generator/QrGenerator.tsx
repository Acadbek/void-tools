"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download, QrCode, RefreshCcw, Settings2 } from "lucide-react";
import { saveAs } from "file-saver";
import { DOMEIN } from "@/constants";

export default function QrGenerator() {
  // State Management
  const [text, setText] = useState(DOMEIN);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [width, setWidth] = useState(300);
  const [colorDark, setColorDark] = useState("#000000");
  const [colorLight, setColorLight] = useState("#ffffff");
  const [error, setError] = useState<string | null>(null);

  // Debounce uchun timer (har bir harf yozganda render bo'lmasligi uchun)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // 1. GENERATE LOGIC (Robust & Debounced)
  const generateQR = async (inputText: string) => {
    if (!inputText.trim()) {
      setQrUrl(""); // Bo'sh bo'lsa rasm yo'q
      return;
    }

    try {
      const url = await QRCode.toDataURL(inputText, {
        width: width,
        margin: 2,
        color: {
          dark: colorDark,
          light: colorLight,
        },
        errorCorrectionLevel: 'H' // High quality (logo qo'yishga mos)
      });
      setQrUrl(url);
      setError(null);
    } catch (err) {
      console.error("QR Generation Error:", err);
      setError("QR kod yaratishda xatolik. Matn juda uzun bo'lishi mumkin.");
    }
  };

  // 2. EFFECT: O'zgarishlarni kuzatish
  useEffect(() => {
    // Oldingi timerni tozalash
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // 300ms kutib keyin generatsiya qilish (Performance)
    debounceTimer.current = setTimeout(() => {
      generateQR(text);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [text, width, colorDark, colorLight]);

  // 3. DOWNLOAD
  const handleDownload = () => {
    if (!qrUrl) return;
    saveAs(qrUrl, `qrcode-${Date.now()}.png`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT: CONTROLS */}
      <div className="lg:col-span-2 space-y-6">

        {/* Input Text */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <label className="block text-sm font-semibold text-foreground mb-2">
            URL or Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter website URL or text..."
            className="w-full p-4 border border-input rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Customization Options */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-foreground">
            <Settings2 className="w-5 h-5" />
            <h3 className="font-semibold">Customization</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Colors */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">QR Color</label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="color"
                    value={colorDark}
                    onChange={(e) => setColorDark(e.target.value)}
                    className="h-10 w-14 p-1 rounded cursor-pointer border"
                  />
                  <span className="text-sm font-mono text-muted-foreground">{colorDark}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">Background</label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="color"
                    value={colorLight}
                    onChange={(e) => setColorLight(e.target.value)}
                    className="h-10 w-14 p-1 rounded cursor-pointer border"
                  />
                  <span className="text-sm font-mono text-muted-foreground">{colorLight}</span>
                </div>
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase flex justify-between">
                <span>Resolution (Size)</span>
                <span>{width}px</span>
              </label>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full mt-3 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Drag to change output quality
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="lg:col-span-1">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sticky top-8">
          <h3 className="text-center font-semibold text-foreground mb-4">Live Preview</h3>

          <div className="bg-muted border-2 border-dashed border-border rounded-xl p-4 flex items-center justify-center min-h-[300px]">
            {error ? (
              <div className="text-center text-destructive text-sm p-4">
                {error}
              </div>
            ) : qrUrl ? (
              <img
                src={qrUrl}
                alt="QR Code Preview"
                className="max-w-full h-auto shadow-sm rounded-lg border border-border"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <QrCode className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Start typing to generate</p>
              </div>
            )}
          </div>

          <button
            onClick={handleDownload}
            disabled={!qrUrl || !!error}
            className={`
              w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white transition-all
              ${!qrUrl || !!error
                ? 'bg-muted cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'}
            `}
          >
            <Download className="w-5 h-5" /> Download PNG
          </button>
        </div>
      </div>

    </div>
  );
}
