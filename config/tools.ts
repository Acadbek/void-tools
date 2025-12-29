import { ToolConfig } from "@/types";

export const toolsRegistry: Record<string, ToolConfig> = {
  // --- TOP TIER (ENG KO'P ISHLATILADIGANLAR) ---

  "image-converter": {
    slug: "image-converter",
    title: "Image Converter",
    description: "Convert images between JPG, PNG, WEBP formats online. Bulk processing with high-quality compression.",
    category: "image",
    componentKey: "ImageConverter",
    icon: "Image"
  },
  "merge-pdf": {
    slug: "merge-pdf",
    title: "Merge PDF Files",
    description: "Combine multiple PDF files into one single document instantly. Secure, client-side merging without uploads.",
    category: "pdf",
    componentKey: "PdfMerger",
    icon: "FileStack"
  },
  "pdf-to-word": {
    slug: "pdf-to-word",
    title: "PDF to Word Converter",
    description: "Convert PDF documents to editable Word (.docx) files. Maintain formatting and layout accurately.",
    category: "pdf",
    componentKey: "PdfToWord",
    icon: "FileText"
  },
  "word-to-pdf": {
    slug: "word-to-pdf",
    title: "Word to PDF Converter",
    description: "Convert Word documents (.docx) to PDF format instantly. Professional quality document conversion.",
    category: "pdf",
    componentKey: "WordToPdf",
    icon: "FileOutput"
  },
  "image-compressor": {
    slug: "image-compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG, and WEBP images. Reduce file size by up to 80% while maintaining visual quality.",
    category: "image",
    componentKey: "ImageCompressor",
    icon: "Shrink"
  },
  "qr-code-generator": {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR Codes with colors and logos. High-resolution download for print and digital use.",
    category: "generator",
    componentKey: "QrGenerator",
    icon: "QrCode"
  },
  "password-generator": {
    slug: "password-generator",
    title: "Strong Password Generator",
    description: "Create secure, random passwords instantly. customizable length and character sets for maximum security.",
    category: "generator",
    componentKey: "PasswordGenerator",
    icon: "Lock"
  },
  "youtube-thumbnail": {
    slug: "youtube-thumbnail",
    title: "YouTube Thumbnail Downloader",
    description: "Download YouTube video thumbnails in 4K, HD, and SD quality. Extract cover images from any video URL.",
    category: "image",
    componentKey: "YoutubeThumbnail",
    icon: "Image"
  },

  // --- SECOND TIER (TEZ-TEZ ISHLATILADIGANLAR) ---

  "word-counter": {
    slug: "word-counter",
    title: "Word & Character Counter",
    description: "Real-time word, character, sentence, and paragraph counter. Perfect for writing and SEO content.",
    category: "text",
    componentKey: "WordCounter",
    icon: "Type"
  },
  "image-to-pdf": {
    slug: "image-to-pdf",
    title: "JPG to PDF Converter",
    description: "Convert JPG, PNG, and WEBP images into a single PDF document. Create photo albums or scan documents.",
    category: "pdf",
    componentKey: "ImageToPdf",
    icon: "FileStack"
  },
  "pdf-compressor": {
    slug: "pdf-compressor",
    title: "PDF Compressor",
    description: "Reduce PDF file size for easier sharing and uploading. Optimize documents without quality loss.",
    category: "pdf",
    componentKey: "PdfCompressor",
    icon: "FileStack"
  },
  "json-formatter": {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    description: "Beautify, validate, and minify JSON data. Fix syntax errors and make JSON readable for developers.",
    category: "code",
    componentKey: "JsonFormatter",
    icon: "FileText"
  },
  "css-to-tailwind": {
    slug: "css-to-tailwind",
    title: "CSS to Tailwind Converter",
    description: "Transform standard CSS code into Tailwind CSS classes. Modernize your styling workflow instantly.",
    category: "code",
    componentKey: "CssToTailwind",
    icon: "Wind"
  },

  // --- THIRD TIER (MAXSUS VOSTALAR) ---

  "unit-converter": {
    slug: "unit-converter",
    title: "Universal Unit Converter",
    description: "Convert between common units: Length, Weight, Temperature, Area, and Time. Simple and accurate.",
    category: "converter",
    componentKey: "UnitConverter",
    icon: "RefreshCcw"
  },
  "image-resizer": {
    slug: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to specific pixel dimensions or percentage. Maintain aspect ratio for social media.",
    category: "image",
    componentKey: "ImageResizer",
    icon: "Image"
  },
  "pdf-splitter": {
    slug: "pdf-splitter",
    title: "Split PDF Pages",
    description: "Extract specific pages from a PDF file. Split large documents into smaller, separate files.",
    category: "pdf",
    componentKey: "PdfSplitter",
    icon: "FileStack"
  },
  "organize-pdf": {
    slug: "organize-pdf",
    title: "Organize PDF",
    description: "Sort, rotate, delete, and reorder PDF pages. Manage your document structure easily.",
    category: "pdf",
    componentKey: "PdfOrganizer",
    icon: "LayoutGrid"
  },
  "pdf-to-image": {
    slug: "pdf-to-image",
    title: "PDF to Image Converter",
    description: "Convert PDF pages into high-quality JPG or PNG images. Extract visual content from documents.",
    category: "pdf",
    componentKey: "PdfToImage",
    icon: "FileStack"
  },

  // --- DEV & NICHE TOOLS ---

  "fake-data-generator": {
    slug: "fake-data-generator",
    title: "Fake Data Generator",
    description: "Generate mock data for testing. Create random users, emails, and addresses in JSON, CSV, or SQL.",
    category: "generator",
    componentKey: "FakeDataGenerator",
    icon: "Database"
  },
  "open-graph-preview": {
    slug: "open-graph-preview",
    title: "Social Media Preview",
    description: "Preview how your website links appear on Facebook, X (Twitter), LinkedIn, and Telegram.",
    category: "social",
    componentKey: "OpenGraphPreview",
    icon: "LayoutTemplate"
  },
  "youtube-title-generator": {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Generate viral, high-CTR video titles and descriptions using AI-proven templates.",
    category: "generator",
    componentKey: "YoutubeTitleGenerator",
    icon: "Youtube"
  },
  "css-minifier": {
    slug: "css-minifier",
    title: "CSS Minifier",
    description: "Minify CSS code to reduce file size and improve website load speed. Remove unnecessary whitespace.",
    category: "code",
    componentKey: "CssMinifier",
    icon: "Code2"
  },
  "json-to-typescript": {
    slug: "json-to-typescript",
    title: "JSON to TypeScript",
    description: "Convert JSON objects into TypeScript interfaces instantly. Speed up your development process.",
    category: "code",
    componentKey: "JsonToTypescript",
    icon: "FileCode"
  },
  "base64-converter": {
    slug: "base64-converter",
    title: "Base64 Converter",
    description: "Encode text/files to Base64 or decode Base64 strings back to original format.",
    category: "converter",
    componentKey: "Base64Converter",
    icon: "FileCode"
  }
};

export const toolsList = Object.values(toolsRegistry);