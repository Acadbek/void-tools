"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64 text-blue-600">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

const ToolComponents = {
  WordCounter: dynamic(() => import("./text/WordCounter"), {
    loading: () => <LoadingSpinner />,
    ssr: false 
  }),
  ImageConverter: dynamic(() => import("./image/ImageConverter"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PdfMerger: dynamic(() => import("./pdf/PdfMerger"), {
    loading: () => <LoadingSpinner />,
    ssr: false 
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
  Base64Converter: dynamic(() => import("./converter/Base64Converter"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  JsonToTypescript: dynamic(() => import("./converter/JsonToTypescript"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PdfCompressor: dynamic(() => import("./pdf/PdfCompressor"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PdfToImage: dynamic(() => import("./pdf/PdfToImage"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PdfToWord: dynamic(() => import("./pdf/PdfToWord"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  WordToPdf: dynamic(() => import("./pdf/WordToPdf"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  PdfSplitter: dynamic(() => import("./pdf/PdfSplitter"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  // PdfUnlocker: dynamic(() => import("./pdf/PdfUnlocker"), {
  //   loading: () => <LoadingSpinner />,
  //   ssr: false
  // }),
  PdfOrganizer: dynamic(() => import("./pdf/PdfOrganizer"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  // BackgroundRemover: dynamic(() => import("./image/BackgroundRemover"), {
  //   loading: () => <LoadingSpinner />,
  //   ssr: false
  // }),
  CssMinifier: dynamic(() => import("./code/CssMinifier"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  CssToTailwind: dynamic(() => import("./code/CssToTailwind"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  FakeDataGenerator: dynamic(() => import("./generator/FakeDataGenerator"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  YoutubeTitleGenerator: dynamic(() => import("./generator/YoutubeTitleGenerator"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  OpenGraphPreview: dynamic(() => import("./social/OpenGraphPreview"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  ResponsiveTester: dynamic(() => import("./dev/ResponsiveTester"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  UltimateSeoGenerator: dynamic(() => import("./dev/seo-generator"), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  DocxToHtml: dynamic(() => import("./converter/DocxToHTML"), {
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
