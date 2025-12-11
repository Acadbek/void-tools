"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64 text-blue-600">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

// Lazy imports - Har bir yangi tool shu yerga qo'shiladi
const ToolComponents = {
  WordCounter: dynamic(() => import("./text/WordCounter"), {
    loading: () => <LoadingSpinner />,
    ssr: false // Client side only tools uchun
  }),
  ImageConverter: dynamic(() => import("./image/ImageConverter"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PdfMerger: dynamic(() => import("./pdf/PdfMerger"), {
    loading: () => <LoadingSpinner />,
    ssr: false // Browser library!
  }),
  QrGenerator: dynamic(() => import("./generator/QrGenerator"), {
    loading: () => <LoadingSpinner />, ssr: false
  }),
  ImageCompressor: dynamic(() => import("./image/ImageCompressor"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  ImageResizer: dynamic(() => import("./image/ImageResizer"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  ImageToPdf: dynamic(() => import("./pdf/ImageToPdf"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PasswordGenerator: dynamic(() => import("./generator/PasswordGenerator"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  JsonFormatter: dynamic(() => import("./text/JsonFormatter"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  UnitConverter: dynamic(() => import("./converter/UnitConverter"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  YoutubeThumbnail: dynamic(() => import("./social/YoutubeThumbnail"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
};

export default function ToolRenderer({ componentKey }: { componentKey: string }) {
  // @ts-ignore
  const Component = ToolComponents[componentKey];

  if (!Component) {
    return <div className="text-center text-red-500">Component not found</div>;
  }

  return <Component />;
}
