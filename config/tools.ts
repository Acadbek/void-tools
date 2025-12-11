import { ToolConfig } from "@/types";

export const toolsRegistry: Record<string, ToolConfig> = {
  "word-counter": {
    slug: "word-counter",
    title: "Word Counter & Character Count",
    description: "Free online word counter tool. Count words, characters, and sentences instantly.",
    category: "text",
    componentKey: "WordCounter",
    icon: "Type"
  },
  "jpg-to-png": {
    slug: "jpg-to-png",
    title: "JPG to PNG Converter",
    description: "Convert JPG images to PNG format instantly using your browser. No server upload, 100% private.",
    category: "image",
    componentKey: "ImageConverter",
    icon: "Image"
  },
  "merge-pdf": {
    slug: "merge-pdf",
    title: "Merge PDF Files Free",
    description: "Combine multiple PDF files into one document instantly. Secure client-side merging.",
    category: "pdf",
    componentKey: "PdfMerger",
    icon: "FileStack"
  },
  "qr-code-generator": {
    slug: "qr-code-generator",
    title: "Free QR Code Generator",
    description: "Create custom QR Codes with Logo, Color and High Resolution. Free & Forever.",
    category: "converter", // Yoki yangi 'generator' toifasi
    componentKey: "QrGenerator",
    icon: "QrCode" // Lucide icon
  },
  "image-compressor": {
    slug: "image-compressor",
    title: "Free Image Compressor",
    description: "Compress JPG, PNG, WEBP images online. Reduce file size up to 80% without losing quality.",
    category: "image",
    componentKey: "ImageCompressor",
    icon: "Shrink" // Lucide icon
  },
  "image-resizer": {
    slug: "image-resizer",
    title: "Free Image Resizer",
    description: "Resize images to exact pixel dimensions. Lock aspect ratio for perfect scaling.",
    category: "image",
    componentKey: "ImageResizer",
    icon: "Image" // Yoki 'Maximize'
  },
  "image-to-pdf": {
    slug: "image-to-pdf",
    title: "JPG to PDF Converter",
    description: "Convert JPG, PNG images to PDF documents. Combine multiple photos into one PDF file.",
    category: "pdf",
    componentKey: "ImageToPdf",
    icon: "FileStack" // Yoki 'Images'
  },
  "password-generator": {
    slug: "password-generator",
    title: "Strong Password Generator",
    description: "Generate secure, random passwords instantly. Client-side encryption, 100% safe to use.",
    category: "generator", // Yoki 'security'
    componentKey: "PasswordGenerator",
    icon: "Lock" // Lucide icon
  },
  "json-formatter": {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data online. Fix JSON errors and make it readable.",
    category: "text", // Yoki yangi 'dev' kategoriyasi
    componentKey: "JsonFormatter",
    icon: "FileText" // Yoki 'Code'
  },
  "unit-converter": {
    slug: "unit-converter",
    title: "Universal Unit Converter",
    description: "Convert between common units: Length, Weight, Temperature, Data, and Time. Simple and instant.",
    category: "converter",
    componentKey: "UnitConverter",
    icon: "RefreshCcw" // Yoki 'Scale'
  },
  "youtube-thumbnail": {
    slug: "youtube-thumbnail",
    title: "YouTube Thumbnail Downloader",
    description: "Download high-quality YouTube thumbnails (4K, HD) instantly. Free online tool for creators.",
    category: "image", // Yoki 'social' deb yangi kategoriya ochish mumkin
    componentKey: "YoutubeThumbnail",
    icon: "Image" // Yoki 'Video'
  },
};

export const toolsList = Object.values(toolsRegistry);
