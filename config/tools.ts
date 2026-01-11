import { ToolConfig } from "@/types";

export const toolsRegistry: Record<string, ToolConfig> = {
  "image-converter": {
    slug: "image-converter",
    title: "Image Converter",
    description: "Convert images between JPG, PNG, WEBP formats online. Bulk processing with high-quality compression.",
    category: "image",
    componentKey: "ImageConverter",
    icon: "Image",
    content: {
      overview: "Effortlessly convert your images between popular formats like JPG, PNG, and WEBP. Our tool ensures that your images retain their original quality while changing formats. Perfect for web developers needing WEBP for speed or designers needing transparent PNGs.",
      howTo: [
        "Click the upload area to select your images.",
        "Choose the target format (JPG, PNG, or WEBP).",
        "Click 'Convert' to process your files.",
        "Download the converted images instantly."
      ],
      features: [
        "Batch Conversion: Convert multiple files at once.",
        "Privacy Focused: Images are processed in your browser.",
        "No Quality Loss: High-fidelity conversion algorithms.",
        "Supports JPG, PNG, and WEBP formats."
      ],
      faq: [
        { question: "Is it free?", answer: "Yes, completely free with no limits." },
        { question: "Do you store my photos?", answer: "No, all processing happens locally in your browser." }
      ]
    }
  },
  "image-compressor": {
    slug: "image-compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG, and WEBP images. Reduce file size by up to 80% while maintaining visual quality.",
    category: "image",
    componentKey: "ImageCompressor",
    icon: "Shrink",
    content: {
      overview: "Optimize your website performance by compressing images without losing quality. Our smart compression algorithm reduces file size drastically, making your web pages load faster and saving storage space.",
      howTo: [
        "Upload your JPG, PNG, or WEBP images.",
        "Adjust the compression level if needed.",
        "Wait for the compression to finish.",
        "Download the optimized images."
      ],
      features: [
        "Up to 80% size reduction.",
        "Preserves visual quality.",
        "Bulk compression support.",
        "Instant preview of the result."
      ],
      faq: [
        { question: "Will my image look blurry?", answer: "No, we use smart lossy compression that maintains visual clarity." },
        { question: "What formats are supported?", answer: "We support JPG, PNG, and WEBP." }
      ]
    }
  },
  "image-resizer": {
    slug: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to specific pixel dimensions or percentage. Maintain aspect ratio for social media.",
    category: "image",
    componentKey: "ImageResizer",
    icon: "Image",
    content: {
      overview: "Quickly resize your images for social media, websites, or email attachments. Specify exact pixel dimensions or scale by percentage while maintaining the aspect ratio.",
      howTo: [
        "Upload the image you want to resize.",
        "Enter new width and height or select a percentage.",
        "Toggle 'Lock Aspect Ratio' to prevent distortion.",
        "Click resize and download."
      ],
      features: [
        "Pixel-perfect resizing.",
        "Maintain aspect ratio lock.",
        "Fast client-side processing.",
        "Supports all major image formats."
      ],
      faq: [
        { question: "Can I make images larger?", answer: "Yes, but scaling up significantly may reduce sharpness." },
        { question: "Is it secure?", answer: "Yes, your images never leave your device." }
      ]
    }
  },
  "youtube-thumbnail": {
    slug: "youtube-thumbnail",
    title: "YouTube Thumbnail Downloader",
    description: "Download YouTube video thumbnails in 4K, HD, and SD quality. Extract cover images from any video URL.",
    category: "image",
    componentKey: "YoutubeThumbnail",
    icon: "Image",
    content: {
      overview: "Need to grab a thumbnail from a YouTube video? Simply paste the URL and download the thumbnail in maximum resolution (4K), High Definition (HD), or Standard Definition.",
      howTo: [
        "Copy the YouTube video URL.",
        "Paste it into the input box.",
        "View the available thumbnail qualities.",
        "Click the download button on your preferred size."
      ],
      features: [
        "Supports 4K (Max Res), HD (720p), and SD.",
        "Works with any public YouTube video.",
        "One-click download.",
        "No registration required."
      ],
      faq: [
        { question: "Is it legal to download thumbnails?", answer: "Yes, for fair use or personal reference." },
        { question: "Why is 4K not available?", answer: "Not all videos have a 4K thumbnail uploaded by the creator." }
      ]
    },
  },

  // --- PDF TOOLS ---
  "merge-pdf": {
    slug: "merge-pdf",
    title: "Merge PDF Files",
    description: "Combine multiple PDF files into one single document instantly. Secure, client-side merging without uploads.",
    category: "pdf",
    componentKey: "PdfMerger",
    icon: "FileStack",
    content: {
      overview: "Combine PDFs in the order you want with the easiest PDF Merger available. Whether it's for work, school, or personal documents, merge them instantly without uploading to a server.",
      howTo: [
        "Select multiple PDF files.",
        "Drag and drop to reorder pages.",
        "Click 'Merge' to combine them.",
        "Save the new document."
      ],
      features: [
        "Secure client-side processing.",
        "Drag & Drop reordering.",
        "Super fast merging.",
        "No file size limits."
      ],
      faq: [
        { question: "Is my data safe?", answer: "Yes, files are processed in your browser." },
        { question: "How many files can I merge?", answer: "As many as your device memory can handle." }
      ]
    }
  },
  "pdf-to-word": {
    slug: "pdf-to-word",
    title: "PDF to Word Converter",
    description: "Convert PDF documents to editable Word (.docx) files. Maintain formatting and layout accurately.",
    category: "pdf",
    componentKey: "PdfToWord",
    icon: "FileText",
    content: {
      overview: "Turn your PDF documents into editable Word files. Our converter preserves the original layout, fonts, and images, making it easy to edit scanned documents or reports.",
      howTo: [
        "Upload your PDF file.",
        "Wait for the conversion process.",
        "Download the editable .docx file.",
        "Open in Microsoft Word or Google Docs."
      ],
      features: [
        "High-accuracy OCR technology.",
        "Preserves tables and layout.",
        "Fast conversion speed.",
        "Works on Mobile and Desktop."
      ],
      faq: [
        { question: "Can I edit the text?", answer: "Yes, the output is a standard Word document." },
        { question: "Does it support scanned PDFs?", answer: "Yes, it extracts text from scanned images." }
      ]
    }
  },
  "word-to-pdf": {
    slug: "word-to-pdf",
    title: "Word to PDF Converter",
    description: "Convert Word documents (.docx) to PDF format instantly. Professional quality document conversion.",
    category: "pdf",
    componentKey: "WordToPdf",
    icon: "FileOutput",
    content: {
      overview: "Convert your DOCX files to PDF to ensure your formatting stays consistent on any device. Ideal for CVs, legal documents, and homework.",
      howTo: [
        "Upload your Word (.docx) file.",
        "The tool automatically converts it to PDF.",
        "Download the PDF file instantly."
      ],
      features: [
        "Ensures layout consistency.",
        "Professional quality output.",
        "Secure conversion.",
        "Universal compatibility."
      ],
      faq: [
        { question: "Will formatting change?", answer: "No, the PDF will look exactly like your Word doc." },
        { question: "Is it free?", answer: "Yes, unlimited free conversions." }
      ]
    }
  },
  "image-to-pdf": {
    slug: "image-to-pdf",
    title: "JPG to PDF Converter",
    description: "Convert JPG, PNG, and WEBP images into a single PDF document. Create photo albums or scan documents.",
    category: "pdf",
    componentKey: "ImageToPdf",
    icon: "FileStack",
    content: {
      overview: "Combine your photos or scanned documents into a single, shareable PDF file. Perfect for creating portfolios, digital albums, or sending documents via email.",
      howTo: [
        "Select your images (JPG, PNG).",
        "Reorder them if necessary.",
        "Choose page orientation (Portrait/Landscape).",
        "Click 'Convert' and download."
      ],
      features: [
        "Combine multiple images.",
        "Adjustable orientation.",
        "Small file size output.",
        "No watermark."
      ],
      faq: [
        { question: "Can I reorder images?", answer: "Yes, drag and drop to change the order." },
        { question: "Is there a limit?", answer: "No, add as many photos as you need." }
      ]
    }
  },
  "pdf-compressor": {
    slug: "pdf-compressor",
    title: "PDF Compressor",
    description: "Reduce PDF file size for easier sharing and uploading. Optimize documents without quality loss.",
    category: "pdf",
    componentKey: "PdfCompressor",
    icon: "FileStack",
    content: {
      overview: "Shrink large PDF files to make them easier to email or upload to portals with size limits. Our tool optimizes internal assets without sacrificing readability.",
      howTo: [
        "Upload your large PDF.",
        "Select compression level (Low, Medium, High).",
        "Download the optimized PDF."
      ],
      features: [
        "Significant size reduction.",
        "Keeps text sharp.",
        "Works offline (PWA).",
        "Secure processing."
      ],
      faq: [
        { question: "Will text become blurry?", answer: "No, text remains vector-based and sharp." },
        { question: "How much space can I save?", answer: "Usually between 30% to 70%." }
      ]
    }
  },
  "pdf-splitter": {
    slug: "pdf-splitter",
    title: "Split PDF Pages",
    description: "Extract specific pages from a PDF file. Split large documents into smaller, separate files.",
    category: "pdf",
    componentKey: "PdfSplitter",
    icon: "FileStack",
    content: {
      overview: "Extract only the pages you need from a large PDF document. Split a book into chapters or separate a single invoice from a bulk file.",
      howTo: [
        "Upload the PDF document.",
        "Select the pages you want to extract.",
        "Click 'Split PDF'.",
        "Download the selected pages as a new file."
      ],
      features: [
        "Visual page selector.",
        "Extract ranges (e.g., 1-5).",
        "Instant processing.",
        "No upload required."
      ],
      faq: [
        { question: "Can I split multiple ranges?", answer: "Yes, you can select any combination of pages." },
        { question: "Is the original file affected?", answer: "No, your original file remains untouched." }
      ]
    },
  },
  "organize-pdf": {
    slug: "organize-pdf",
    title: "Organize PDF",
    description: "Sort, rotate, delete, and reorder PDF pages. Manage your document structure easily.",
    category: "pdf",
    componentKey: "PdfOrganizer",
    icon: "LayoutGrid",
    content: {
      overview: "Take full control of your PDF pages. Rotate upside-down pages, delete unnecessary ones, and reorder the flow of your document.",
      howTo: [
        "Upload your PDF.",
        "Hover over pages to rotate or delete.",
        "Drag pages to new positions.",
        "Save the organized PDF."
      ],
      features: [
        "Rotate individual pages.",
        "Delete specific pages.",
        "Visual drag-and-drop.",
        "Real-time preview."
      ],
      faq: [
        { question: "Can I rotate just one page?", answer: "Yes, rotation applies per page." },
        { question: "Is it permanent?", answer: "It creates a new file; the original is safe." }
      ]
    },
  },
  "pdf-to-image": {
    slug: "pdf-to-image",
    title: "PDF to Image Converter",
    description: "Convert PDF pages into high-quality JPG or PNG images. Extract visual content from documents.",
    category: "pdf",
    componentKey: "PdfToImage",
    icon: "FileStack",
    content: {
      overview: "Convert every page of your PDF into a separate high-quality image file. Useful for sharing document pages on social media or inserting into presentations.",
      howTo: [
        "Upload the PDF file.",
        "Choose output format (JPG or PNG).",
        "Download all pages as a ZIP or individually."
      ],
      features: [
        "High DPI output.",
        "Supports JPG and PNG.",
        "Batch extraction.",
        "Transparent background support."
      ],
      faq: [
        { question: "Does it convert all pages?", answer: "Yes, every page becomes an image." },
        { question: "Is the quality good?", answer: "Yes, we use high-resolution rendering." }
      ]
    },
  },

  // --- GENERATOR TOOLS ---
  "qr-code-generator": {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR Codes with colors and logos. High-resolution download for print and digital use.",
    category: "generator",
    componentKey: "QrGenerator",
    icon: "QrCode",
    content: {
      overview: "Generate scannable QR codes for URLs, WiFi, Text, or vCards. Customize the foreground and background colors to match your brand identity.",
      howTo: [
        "Select the type (URL, WiFi, Text, etc.).",
        "Enter the required data.",
        "Customize colors and size.",
        "Download as PNG or SVG."
      ],
      features: [
        "Customizable colors.",
        "High-res download.",
        "Supports WiFi & Contact data.",
        "No expiration date."
      ],
      faq: [
        { question: "Do these codes expire?", answer: "No, our static QR codes work forever." },
        { question: "Can I use for print?", answer: "Yes, download in high quality for printing." }
      ]
    }
  },
  "password-generator": {
    slug: "password-generator",
    title: "Strong Password Generator",
    description: "Create secure, random passwords instantly. Customizable length and character sets for maximum security.",
    category: "generator",
    componentKey: "PasswordGenerator",
    icon: "Lock",
    content: {
      overview: "Protect your accounts with uncrackable passwords. Generate random strings containing numbers, symbols, and uppercase letters.",
      howTo: [
        "Select password length.",
        "Check options (Numbers, Symbols).",
        "Click 'Generate'.",
        "Copy to clipboard."
      ],
      features: [
        "Cryptographically strong.",
        "Customizable complexity.",
        "One-click copy.",
        "No data storage."
      ],
      faq: [
        { question: "How secure is this?", answer: "We use browser crypto API for maximum randomness." },
        { question: "Do you save passwords?", answer: "Never. They are generated locally." }
      ]
    }
  },
  "fake-data-generator": {
    slug: "fake-data-generator",
    title: "Fake Data Generator",
    description: "Generate mock data for testing. Create random users, emails, and addresses in JSON, CSV, or SQL.",
    category: "generator",
    componentKey: "FakeDataGenerator",
    icon: "Database",
    content: {
      overview: "Developers love this tool for populating databases or testing UI. Generate thousands of rows of realistic fake data including names, emails, addresses, and dates.",
      howTo: [
        "Select fields (Name, Email, Phone, etc.).",
        "Choose output format (JSON, CSV, SQL).",
        "Select number of rows.",
        "Generate and Download."
      ],
      features: [
        "Multiple data types.",
        "Export to JSON, CSV, SQL.",
        "Realistic data patterns.",
        "Instant generation."
      ],
      faq: [
        { question: "Is the data real?", answer: "No, it is randomly generated mock data." },
        { question: "Can I generate 1000 rows?", answer: "Yes, large datasets are supported." }
      ]
    },
  },
  "youtube-title-generator": {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Generate viral, high-CTR video titles and descriptions using AI-proven templates.",
    category: "generator",
    componentKey: "YoutubeTitleGenerator",
    icon: "Youtube",
    content: {
      overview: "Stuck on a video idea? Use our Title Generator to create catchy, click-worthy titles that boost your Click-Through Rate (CTR) and views.",
      howTo: [
        "Enter your video topic or keyword.",
        "Click 'Generate Titles'.",
        "Browse the list of viral hooks.",
        "Copy your favorite one."
      ],
      features: [
        "Based on viral patterns.",
        "SEO friendly.",
        "Multiple variations.",
        "Increases CTR."
      ],
      faq: [
        { question: "How does it work?", answer: "It uses templates from successful top-performing videos." },
        { question: "Is it free?", answer: "Yes, generate unlimited titles." }
      ]
    },
  },
  "word-counter": {
    slug: "word-counter",
    title: "Word & Character Counter",
    description: "Real-time word, character, sentence, and paragraph counter. Perfect for writing and SEO content.",
    category: "text",
    componentKey: "WordCounter",
    icon: "Type",
    content: {
      overview: "Writers, students, and SEO pros rely on this tool. Paste your text to get an instant analysis of word count, character count (with/without spaces), paragraphs, and reading time.",
      howTo: [
        "Type or paste your text into the box.",
        "See statistics update in real-time.",
        "Check reading and speaking time estimates."
      ],
      features: [
        "Real-time counting.",
        "Reading time estimation.",
        "Keyword density (coming soon).",
        "Privacy focused."
      ],
      faq: [
        { question: "Does it count spaces?", answer: "We provide counts for both with and without spaces." },
        { question: "Is there a limit?", answer: "No, paste as much text as you like." }
      ]
    }
  },
  "json-formatter": {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    description: "Beautify, validate, and minify JSON data. Fix syntax errors and make JSON readable for developers.",
    category: "code",
    componentKey: "JsonFormatter",
    icon: "FileText",
    content: {
      overview: "Debug your JSON data easily. This tool formats messy JSON into a readable tree structure, validates syntax errors, and can also minify JSON for production.",
      howTo: [
        "Paste your JSON string.",
        "Click 'Format' to beautify.",
        "Click 'Minify' to compress.",
        "Copy the result."
      ],
      features: [
        "Syntax error highlighting.",
        "Collapsible tree view.",
        "Minify and Beautify modes.",
        "One-click copy."
      ],
      faq: [
        { question: "Does it fix errors?", answer: "It highlights errors so you can fix them easily." },
        { question: "Is code sent to a server?", answer: "No, validation happens in your browser." }
      ]
    }
  },
  "css-to-tailwind": {
    slug: "css-to-tailwind",
    title: "CSS to Tailwind Converter",
    description: "Transform standard CSS code into Tailwind CSS classes. Modernize your styling workflow instantly.",
    category: "code",
    componentKey: "CssToTailwind",
    icon: "Wind",
    content: {
      overview: "Migrating to Tailwind CSS? Save hours of work by converting your legacy CSS code into modern Tailwind utility classes automatically.",
      howTo: [
        "Paste your standard CSS.",
        "View the generated Tailwind HTML/Classes.",
        "Copy and paste into your project."
      ],
      features: [
        "Smart class mapping.",
        "Handles media queries.",
        "Supports modern CSS properties.",
        "Instant conversion."
      ],
      faq: [
        { question: "Is it 100% accurate?", answer: "It covers most standard CSS, complex animations might need manual tweaks." },
        { question: "Does it support arbitrary values?", answer: "Yes, for values not in the default config." }
      ]
    }
  },
  "css-minifier": {
    slug: "css-minifier",
    title: "CSS Minifier",
    description: "Minify CSS code to reduce file size and improve website load speed. Remove unnecessary whitespace.",
    category: "code",
    componentKey: "CssMinifier",
    icon: "Code2",
    content: {
      overview: "Speed up your website by minifying your CSS. This tool removes whitespace, comments, and newlines to create the smallest possible file size for production.",
      howTo: [
        "Paste your CSS code.",
        "Click 'Minify'.",
        "Copy the optimized code."
      ],
      features: [
        "Removes comments and spaces.",
        "Optimizes file size.",
        "Instant processing.",
        "Essential for SEO speed."
      ],
      faq: [
        { question: "Can I revert it?", answer: "It's hard to read, but you can use a beautifier to restore structure." },
        { question: "How much space does it save?", answer: "Typically 15-20% of the file size." }
      ]
    },
  },
  "json-to-typescript": {
    slug: "json-to-typescript",
    title: "JSON to TypeScript",
    description: "Convert JSON objects into TypeScript interfaces instantly. Speed up your development process.",
    category: "code",
    componentKey: "JsonToTypescript",
    icon: "FileCode",
    content: {
      overview: "Stop writing interfaces manually. Paste a JSON response from an API, and get the corresponding TypeScript Interface or Type definition instantly.",
      howTo: [
        "Paste your JSON object.",
        "The TypeScript interface appears instantly.",
        "Copy to your project."
      ],
      features: [
        "Detects nested objects.",
        "Infers types (string, number, boolean).",
        "Handles arrays correctly.",
        "Real-time conversion."
      ],
      faq: [
        { question: "Does it handle optional fields?", answer: "It creates a strict interface based on the provided data." },
        { question: "Is it secure?", answer: "Yes, code never leaves your browser." }
      ]
    },
  },
  "unit-converter": {
    slug: "unit-converter",
    title: "Universal Unit Converter",
    description: "Convert between common units: Length, Weight, Temperature, Area, and Time. Simple and accurate.",
    category: "converter",
    componentKey: "UnitConverter",
    icon: "RefreshCcw",
    content: {
      overview: "A simple, all-in-one converter for daily needs. Whether you are cooking, traveling, or doing science homework, convert between Metric and Imperial units easily.",
      howTo: [
        "Select the category (e.g., Length, Weight).",
        "Enter the value.",
        "Select 'From' and 'To' units.",
        "See the result instantly."
      ],
      features: [
        "Supports Length, Weight, Temp, and more.",
        "Instant calculation.",
        "Clean interface.",
        "Accurate formulas."
      ],
      faq: [
        { question: "Is it accurate?", answer: "Yes, we use standard scientific conversion factors." },
        { question: "Can I convert temperature?", answer: "Yes, Celsius, Fahrenheit, and Kelvin." }
      ]
    }
  },
  "base64-converter": {
    slug: "base64-converter",
    title: "Base64 Converter",
    description: "Encode text/files to Base64 or decode Base64 strings back to original format.",
    category: "converter",
    componentKey: "Base64Converter",
    icon: "FileCode",
    content: {
      overview: "A handy tool for developers to encode text or files into Base64 strings, or decode Base64 back into readable text. Essential for data transmission and debugging.",
      howTo: [
        "Choose Encode or Decode mode.",
        "Paste text or upload a file.",
        "Get the result instantly."
      ],
      features: [
        "Supports text and files.",
        "Fast processing.",
        "Handles large strings.",
        "UTF-8 support."
      ],
      faq: [
        { question: "What is Base64?", answer: "It's a way to represent binary data as ASCII text." },
        { question: "Is it encryption?", answer: "No, it is encoding. It is not secure for passwords." }
      ]
    },
  },
  "open-graph-preview": {
    slug: "open-graph-preview",
    title: "Social Media Preview",
    description: "Preview how your website links appear on Facebook, X (Twitter), LinkedIn, and Telegram.",
    category: "social",
    componentKey: "OpenGraphPreview",
    icon: "LayoutTemplate",
    content: {
      overview: "Don't share broken links. Check how your website's meta tags (Open Graph) look on major social platforms before you publish.",
      howTo: [
        "Paste your website URL.",
        "Click 'Check Preview'.",
        "See visualizations for Facebook, Twitter, etc.",
        "Fix issues in your meta tags."
      ],
      features: [
        "Simulates Facebook, Twitter, LinkedIn.",
        "Checks Title, Description, Image.",
        "Debugs SEO issues.",
        "Instant preview."
      ],
      faq: [
        { question: "Why is no image showing?", answer: "Check if your og:image meta tag is set correctly." },
        { question: "Does it cache results?", answer: "No, it fetches live data." }
      ]
    },
  },
  "responsive-tester": {
    slug: "responsive-tester",
    title: "Responsive Layout Tester",
    description: "Test your website on different screen sizes (Mobile, Tablet, Desktop) simultaneously. Ideal for developers.",
    category: "code", // "dev" o'rniga "code" ishlatganingiz ma'qul (mavjud kategoriyalarga moslash uchun)
    componentKey: "ResponsiveTester",
    icon: "Smartphone",
    content: {
      overview: "Ensure your website looks perfect on every device. This tool simulates various screen resolutions including iPhone, iPad, Laptops, and Desktops. It's an essential tool for developers and designers to test responsive layouts quickly without needing multiple physical devices.",
      howTo: [
        "Enter your website URL (e.g., localhost:3000).",
        "Select a device type (Mobile, Tablet, Desktop).",
        "Toggle orientation (Portrait/Landscape) if needed.",
        "Use zoom controls to fit large screens on your display."
      ],
      features: [
        "Multiple device presets (iOS, Android, Web).",
        "Landscape and Portrait modes.",
        "Zoom scaling for better visibility.",
        "Works with localhost servers."
      ],
      faq: [
        { question: "Why does my site show a blank page?", answer: "Some major sites (like Google) block being shown in iframes for security. It works best with your own projects." },
        { question: "Can I test localhost?", answer: "Yes, as long as your local server is running, you can test it here." }
      ]
    }
  },
  "seo-meta-generator": {
    slug: "seo-meta-generator",
    title: "SEO Suite & OG Builder",
    description: "Generate SEO Meta tags, Open Graph images, JSON-LD Schema (FAQ, Product, Article), and Web Manifests with real-time social previews.",
    category: "code",
    componentKey: "UltimateSeoGenerator",
    icon: "Globe",
    content: {
      overview: "Stop guessing how your link looks on Social Media. This SEO Suite allows you to generate every essential SEO file for your website—from Meta tags and Robots.txt to complex JSON-LD Schemas and PWA Manifests. It features a powerful Visual OG Image Designer and real-time previews for Google, Twitter, Facebook, and Slack.",
      howTo: [
        "Select a module from the sidebar (Metadata, Sitemap, OG Studio, Schema, etc.).",
        "Fill in the details. Your progress is Auto-Saved locally, so you won't lose data.",
        "Use the 'OG Image Studio' to visually design your social share card with gradients and custom typography.",
        "Check the 'Real-time Preview' tabs to see how your link appears on Google, Twitter, and Slack.",
        "Toggle between 'Next.js' and 'HTML' output formats and copy the code."
      ],
      features: [
        "Multi-Platform Live Previews (Google, Twitter, Facebook, Slack).",
        "Visual Open Graph Image Designer (Gradients, Alignment, Fonts).",
        "Advanced JSON-LD Schema Generator (FAQ, Product, Article).",
        "PWA Web Manifest & Dynamic Sitemap Generator.",
        "LocalStorage Auto-Save & HTML/Next.js Code Export."
      ],
      faq: [
        {
          question: "Does it save my data if I refresh?",
          answer: "Yes! We use LocalStorage to auto-save your inputs instantly. You can pick up right where you left off."
        },
        {
          question: "I don't use Next.js. Can I use this?",
          answer: "Absolutely. Use the output switcher to select 'HTML' mode. It generates standard <meta> tags and scripts compatible with WordPress, PHP, or any HTML site."
        },
        {
          question: "What is the OG Image Studio?",
          answer: "It's a built-in visual editor that generates the code for @vercel/og (ImageResponse), allowing you to create dynamic social cards without needing Photoshop."
        }
      ]
    }
  },
};

export const toolsList = Object.values(toolsRegistry);