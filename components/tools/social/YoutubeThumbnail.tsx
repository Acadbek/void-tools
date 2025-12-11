"use client";

import { useState } from "react";
import { Search, Download, ExternalLink, Image as ImageIcon, AlertCircle, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";

interface ThumbQuality {
  label: string;
  key: string;
  width: number;
  height: number;
  url: string;
  isAvailable?: boolean;
}

export default function YoutubeThumbnail() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<ThumbQuality[]>([]);
  const [loadingImg, setLoadingImg] = useState(false);

  // 1. VIDEO ID ni ajratib olish (Robust Regex)
  const extractVideoId = (inputUrl: string) => {
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = inputUrl.match(pattern);
    return match ? match[1] : null;
  };

  // 2. URL o'zgarganda ishlash
  const handleFetch = async () => {
    setError(null);
    setThumbnails([]);
    setVideoId(null);

    if (!url.trim()) return;

    const id = extractVideoId(url);
    if (!id) {
      setError("Invalid YouTube URL. Please enter a valid link (e.g., https://youtu.be/...)");
      return;
    }

    setLoadingImg(true);
    setVideoId(id);

    // YouTube Thumbnail URL Patternlari
    const qualities: ThumbQuality[] = [
      { label: "Max Resolution (HD/4K)", key: "maxres", width: 1280, height: 720, url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg` },
      { label: "High Quality (HQ)", key: "hq", width: 640, height: 480, url: `https://img.youtube.com/vi/${id}/hqdefault.jpg` },
      { label: "Medium Quality (MQ)", key: "mq", width: 320, height: 180, url: `https://img.youtube.com/vi/${id}/mqdefault.jpg` },
      { label: "Standard Quality (SD)", key: "sd", width: 640, height: 480, url: `https://img.youtube.com/vi/${id}/sddefault.jpg` },
    ];

    // Tekshiramiz: MaxRes hammasida ham bo'lmaydi
    // Client-side tekshirish uchun Image Load ishlatamiz
    const checkedQualities = await Promise.all(
      qualities.map(async (q) => {
        const isValid = await checkImageExists(q.url);
        return { ...q, isAvailable: isValid };
      })
    );

    setThumbnails(checkedQualities.filter(q => q.isAvailable));
    setLoadingImg(false);
  };

  // Yordamchi: Rasm borligini tekshirish (404 bermasligi uchun)
  const checkImageExists = (imgUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // YouTube 404 bo'lsa ham 120px kichkina rasm qaytaradi (Placeholder)
        // Shuning uchun width > 120 ekanligini tekshiramiz
        if (img.width > 120) resolve(true);
        else resolve(false);
      };
      img.onerror = () => resolve(false);
      img.src = imgUrl;
    });
  };

  // 3. DOWNLOAD LOGIC (CORS Bypass attempt using fetch)
  const handleDownload = async (thumb: ThumbQuality) => {
    try {
      const response = await fetch(thumb.url);
      const blob = await response.blob();
      saveAs(blob, `youtube-thumbnail-${videoId}-${thumb.key}.jpg`);
    } catch (e) {
      // Agar CORS xato bersa, oddiy link ochishni taklif qilamiz
      window.open(thumb.url, '_blank');
    }
  };

  return (
    <div className="space-y-8">

      {/* INPUT SECTION */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
          Paste YouTube Video Link
        </label>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            />
          </div>
          <button
            onClick={handleFetch}
            disabled={loadingImg || !url}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loadingImg ? <Loader2 className="animate-spin" /> : "Get Thumbnail"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}
      </div>

      {/* RESULTS GRID */}
      {videoId && thumbnails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">

          {/* Main Preview (Eng katta sifat) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-red-600" /> Preview
            </h3>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group">
              <img
                src={thumbnails[0].url}
                alt="Thumbnail Preview"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                  onClick={() => handleDownload(thumbnails[0])}
                  className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Download className="w-5 h-5" /> Download HD
                </button>
                <a
                  href={thumbnails[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-900/80 text-white rounded-full hover:bg-black transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Download Options List */}
          <div className="md:col-span-2 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h4 className="font-bold text-gray-700 mb-4">Available Resolutions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {thumbnails.map((thumb) => (
                <div key={thumb.key} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div className="mb-3">
                    <span className="text-xs font-bold uppercase text-gray-400">{thumb.width} x {thumb.height}</span>
                    <p className="font-semibold text-gray-800">{thumb.label}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(thumb)}
                    className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
