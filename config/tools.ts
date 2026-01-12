import { ToolConfig } from "@/types";

export const toolsRegistry: Record<string, ToolConfig> = {
  // --- SEO & SOCIAL TOOLS ---
  "seo-meta-generator": {
    slug: "seo-meta-generator",
    title: "SEO Suite & OG Builder",
    description: "Generate SEO Meta tags, Open Graph images, JSON-LD Schema, and Web Manifests with real-time social previews.",
    category: "code",
    componentKey: "UltimateSeoGenerator",
    icon: "Globe",
    content: {
      overview: "Stop guessing how your link looks on Social Media. This SEO Suite allows you to generate every essential SEO file for your website—from Meta tags to JSON-LD Schemas. It features a powerful Visual OG Image Designer.",
      howTo: [
        "Select a module (Metadata, OG Studio, Schema).",
        "Fill in the details (Auto-saved locally).",
        "Design your social share card visually.",
        "Check real-time previews for Google/Twitter.",
        "Copy the generated Next.js or HTML code."
      ],
      features: [
        "Multi-Platform Live Previews.",
        "Visual Open Graph Image Designer.",
        "JSON-LD Schema Generator.",
        "PWA Web Manifest Generator.",
        "Auto-Save & Code Export."
      ],
      faq: [
        { question: "Does it save my data?", answer: "Yes, we use LocalStorage to auto-save instantly." },
        { question: "Can I use for WordPress?", answer: "Yes, use the HTML output mode." }
      ]
    },
    locales: {
      en: {
        title: "SEO Suite & OG Builder",
        description: "Generate SEO Meta tags, Open Graph images, JSON-LD Schema, and Web Manifests.",
        content: {
          overview: "Stop guessing how your link looks on Social Media. This SEO Suite allows you to generate every essential SEO file for your website—from Meta tags to JSON-LD Schemas.",
          howTo: ["Select a module.", "Fill in details.", "Design OG Image.", "Copy code."],
          features: ["Live Previews.", "Visual Designer.", "Schema Generator.", "PWA Support."],
          faq: [{ question: "Does it save data?", answer: "Yes, locally." }]
        }
      },
      es: {
        title: "Generador SEO y Open Graph",
        description: "Genera metaetiquetas SEO, imágenes Open Graph, esquema JSON-LD y manifiestos web.",
        content: {
          overview: "Deje de adivinar cómo se ve su enlace en las redes sociales. Genere todos los archivos SEO esenciales para su sitio web.",
          howTo: ["Selecciona un módulo.", "Rellena los detalles.", "Diseña tu imagen.", "Copia el código."],
          features: ["Vistas previas en vivo.", "Diseñador visual.", "Generador de esquemas.", "Soporte PWA."],
          faq: [{ question: "¿Guarda mis datos?", answer: "Sí, localmente." }]
        }
      },
      ru: {
        title: "SEO Генератор и OG Builder",
        description: "Генерация SEO мета-тегов, изображений Open Graph, JSON-LD схем и веб-манифестов.",
        content: {
          overview: "Перестаньте гадать, как ваша ссылка выглядит в соцсетях. Создавайте все необходимые SEO-файлы в одном месте.",
          howTo: ["Выберите модуль.", "Заполните детали.", "Создайте дизайн.", "Скопируйте код."],
          features: ["Предпросмотр в реальном времени.", "Визуальный редактор.", "Генератор схем.", "PWA манифест."],
          faq: [{ question: "Данные сохраняются?", answer: "Да, локально." }]
        }
      }
    },
    nextSteps: [
      { slug: "open-graph-preview", label: "Test your live links" },
      { slug: "json-formatter", label: "Validate your JSON-LD" }
    ]
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
    locales: {
      en: {
        title: "Social Media Preview",
        description: "Preview how your website links appear on Facebook, X (Twitter), LinkedIn, and Telegram.",
        content: {
          overview: "Don't share broken links. Check how your website's meta tags (Open Graph) look on major social platforms.",
          howTo: ["Paste URL.", "Click Check.", "View results.", "Fix tags."],
          features: ["Multi-platform.", "Debug SEO.", "Instant check.", "Live data."],
          faq: [{ question: "No image?", answer: "Check og:image tag." }]
        }
      },
      es: {
        title: "Vista Previa de Redes Sociales",
        description: "Obtenga una vista previa de cómo aparecen sus enlaces en Facebook, Twitter y LinkedIn.",
        content: {
          overview: "No compartas enlaces rotos. Comprueba cómo se ven tus metaetiquetas antes de publicar.",
          howTo: ["Pega la URL.", "Haz clic en Verificar.", "Ver resultados.", "Corregir etiquetas."],
          features: ["Multi-plataforma.", "Depurar SEO.", "Verificación instantánea.", "Datos en vivo."],
          faq: [{ question: "¿Sin imagen?", answer: "Revisa la etiqueta og:image." }]
        }
      },
      ru: {
        title: "Предпросмотр соцсетей",
        description: "Посмотрите, как ваши ссылки выглядят в Facebook, Twitter, LinkedIn и Telegram.",
        content: {
          overview: "Не делитесь битыми ссылками. Проверьте мета-теги вашего сайта перед публикацией.",
          howTo: ["Вставьте URL.", "Нажмите Проверить.", "Смотрите результат.", "Исправьте теги."],
          features: ["Мультиплатформенность.", "Отладка SEO.", "Мгновенно.", "Живые данные."],
          faq: [{ question: "Нет картинки?", answer: "Проверьте тег og:image." }]
        }
      }
    },
    nextSteps: [
      { slug: "seo-meta-generator", label: "Fix your Meta Tags" }
    ]
  },

  // --- IMAGE TOOLS ---
  "image-converter": {
    slug: "image-converter",
    title: "Image Converter",
    description: "Convert images between JPG, PNG, WEBP formats online. Bulk processing with high-quality compression.",
    category: "image",
    componentKey: "ImageConverter",
    icon: "Image",
    content: {
      overview: "Effortlessly convert your images between popular formats like JPG, PNG, and WEBP. Our tool ensures that your images retain their original quality.",
      howTo: [
        "Click the upload area to select your images.",
        "Choose the target format (JPG, PNG, or WEBP).",
        "Click 'Convert' to process your files.",
        "Download the converted images instantly."
      ],
      features: [
        "Batch Conversion.",
        "Privacy Focused (Local processing).",
        "No Quality Loss.",
        "Supports JPG, PNG, WEBP."
      ],
      faq: [
        { question: "Is it free?", answer: "Yes, completely free with no limits." },
        { question: "Do you store my photos?", answer: "No, all processing happens locally." }
      ]
    },
    locales: {
      en: {
        title: "Image Converter",
        description: "Convert images between JPG, PNG, WEBP formats online. Bulk processing available.",
        content: {
          overview: "Effortlessly convert your images between popular formats like JPG, PNG, and WEBP.",
          howTo: ["Upload images.", "Select format.", "Convert.", "Download."],
          features: ["Batch Conversion.", "Privacy Focused.", "No Quality Loss.", "Fast."],
          faq: [{ question: "Is it free?", answer: "Yes." }]
        }
      },
      es: {
        title: "Convertidor de Imágenes",
        description: "Convierte imágenes entre formatos JPG, PNG y WEBP en línea. Procesamiento por lotes.",
        content: {
          overview: "Convierte tus imágenes sin esfuerzo entre formatos populares como JPG, PNG y WEBP.",
          howTo: ["Sube imágenes.", "Elige formato.", "Convierte.", "Descarga."],
          features: ["Conversión por lotes.", "Privacidad.", "Sin pérdida de calidad.", "Rápido."],
          faq: [{ question: "¿Es gratis?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Конвертер изображений",
        description: "Конвертируйте изображения между форматами JPG, PNG, WEBP онлайн.",
        content: {
          overview: "Легко конвертируйте изображения в популярные форматы JPG, PNG и WEBP.",
          howTo: ["Загрузите фото.", "Выберите формат.", "Конвертируйте.", "Скачайте."],
          features: ["Пакетная конвертация.", "Приватность.", "Без потери качества.", "Быстро."],
          faq: [{ question: "Это бесплатно?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "image-compressor", label: "Compress new images" },
      { slug: "image-resizer", label: "Resize images" }
    ]
  },
  "image-compressor": {
    slug: "image-compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG, and WEBP images. Reduce file size by up to 80% while maintaining visual quality.",
    category: "image",
    componentKey: "ImageCompressor",
    icon: "Shrink",
    content: {
      overview: "Optimize your website performance by compressing images without losing quality. Reduces file size drastically.",
      howTo: [
        "Upload your JPG, PNG, or WEBP images.",
        "Adjust the compression level.",
        "Wait for the compression to finish.",
        "Download the optimized images."
      ],
      features: [
        "Up to 80% size reduction.",
        "Preserves visual quality.",
        "Bulk compression support.",
        "Instant preview."
      ],
      faq: [
        { question: "Will my image look blurry?", answer: "No, we use smart lossy compression." },
        { question: "What formats supported?", answer: "JPG, PNG, and WEBP." }
      ]
    },
    locales: {
      en: {
        title: "Image Compressor",
        description: "Compress JPG, PNG, and WEBP images. Reduce file size by up to 80%.",
        content: {
          overview: "Optimize your website performance by compressing images without losing quality.",
          howTo: ["Upload images.", "Adjust level.", "Compress.", "Download."],
          features: ["80% reduction.", "High quality.", "Bulk support.", "Instant preview."],
          faq: [{ question: "Blurry?", answer: "No." }]
        }
      },
      es: {
        title: "Compresor de Imágenes",
        description: "Comprime imágenes JPG, PNG y WEBP. Reduce el tamaño del archivo hasta un 80%.",
        content: {
          overview: "Optimiza el rendimiento de tu web comprimiendo imágenes sin perder calidad.",
          howTo: ["Sube imágenes.", "Ajusta nivel.", "Comprime.", "Descarga."],
          features: ["Reducción del 80%.", "Alta calidad.", "Soporte por lotes.", "Vista previa."],
          faq: [{ question: "¿Borroso?", answer: "No." }]
        }
      },
      ru: {
        title: "Сжатие изображений",
        description: "Сжимайте изображения JPG, PNG и WEBP. Уменьшите размер файла до 80%.",
        content: {
          overview: "Оптимизируйте сайт, сжимая изображения без потери качества.",
          howTo: ["Загрузите фото.", "Настройте уровень.", "Сжимиайте.", "Скачайте."],
          features: ["Сжатие до 80%.", "Высокое качество.", "Пакетная обработка.", "Предпросмотр."],
          faq: [{ question: "Размыто?", answer: "Нет." }]
        }
      }
    },
    nextSteps: [
      { slug: "image-converter", label: "Convert format" },
      { slug: "image-resizer", label: "Resize dimensions" }
    ]
  },
  "image-resizer": {
    slug: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to specific pixel dimensions or percentage. Maintain aspect ratio for social media.",
    category: "image",
    componentKey: "ImageResizer",
    icon: "Image",
    content: {
      overview: "Quickly resize your images for social media, websites, or email attachments. Specify exact pixels or scale by percentage.",
      howTo: [
        "Upload the image.",
        "Enter new width/height or percentage.",
        "Toggle 'Lock Aspect Ratio'.",
        "Click resize and download."
      ],
      features: [
        "Pixel-perfect resizing.",
        "Maintain aspect ratio lock.",
        "Fast client-side processing.",
        "Supports all major formats."
      ],
      faq: [
        { question: "Can I make images larger?", answer: "Yes, but quality might decrease." },
        { question: "Is it secure?", answer: "Yes, local processing only." }
      ]
    },
    locales: {
      en: {
        title: "Image Resizer",
        description: "Resize images to specific pixel dimensions or percentage.",
        content: {
          overview: "Quickly resize your images for social media, websites, or email attachments.",
          howTo: ["Upload.", "Set dimensions.", "Resize.", "Download."],
          features: ["Pixel perfect.", "Aspect ratio lock.", "Fast.", "Secure."],
          faq: [{ question: "Enlarge?", answer: "Yes." }]
        }
      },
      es: {
        title: "Redimensionar Imágenes",
        description: "Cambia el tamaño de las imágenes a píxeles o porcentajes específicos.",
        content: {
          overview: "Cambia rápidamente el tamaño de tus imágenes para redes sociales o webs.",
          howTo: ["Sube.", "Pon dimensiones.", "Redimensiona.", "Descarga."],
          features: ["Píxel perfecto.", "Bloqueo de proporción.", "Rápido.", "Seguro."],
          faq: [{ question: "¿Agrandar?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Изменение размера фото",
        description: "Изменяйте размер изображений до точных пикселей или процентов.",
        content: {
          overview: "Быстро изменяйте размер изображений для соцсетей или веб-сайтов.",
          howTo: ["Загрузите.", "Укажите размер.", "Измените.", "Скачайте."],
          features: ["Точность пикселей.", "Сохранение пропорций.", "Быстро.", "Безопасно."],
          faq: [{ question: "Увеличить?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "image-compressor", label: "Optimize file size" },
      { slug: "image-converter", label: "Change format" }
    ]
  },
  "youtube-thumbnail": {
    slug: "youtube-thumbnail",
    title: "YouTube Thumbnail Downloader",
    description: "Download YouTube video thumbnails in 4K, HD, and SD quality. Extract cover images from any video URL.",
    category: "image",
    componentKey: "YoutubeThumbnail",
    icon: "Image",
    content: {
      overview: "Grab a thumbnail from a YouTube video. Simply paste the URL and download the thumbnail in maximum resolution (4K) or HD.",
      howTo: [
        "Copy the YouTube video URL.",
        "Paste it into the input box.",
        "View available qualities.",
        "Download your preferred size."
      ],
      features: [
        "Supports 4K, HD, and SD.",
        "Works with any public video.",
        "One-click download.",
        "No registration."
      ],
      faq: [
        { question: "Is it legal?", answer: "Yes, for fair use." },
        { question: "Why no 4K?", answer: "Video might not have a 4K thumbnail." }
      ]
    },
    locales: {
      en: {
        title: "YouTube Thumbnail Downloader",
        description: "Download YouTube video thumbnails in 4K, HD, and SD quality.",
        content: {
          overview: "Grab a thumbnail from a YouTube video in maximum resolution.",
          howTo: ["Copy URL.", "Paste.", "Select quality.", "Download."],
          features: ["4K Support.", "Any video.", "Fast.", "Free."],
          faq: [{ question: "Legal?", answer: "Yes." }]
        }
      },
      es: {
        title: "Descargar Miniaturas YouTube",
        description: "Descarga miniaturas de videos de YouTube en calidad 4K, HD y SD.",
        content: {
          overview: "Obtén la miniatura de cualquier video de YouTube en máxima resolución.",
          howTo: ["Copia URL.", "Pega.", "Elige calidad.", "Descarga."],
          features: ["Soporte 4K.", "Cualquier video.", "Rápido.", "Gratis."],
          faq: [{ question: "¿Legal?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Скачать превью YouTube",
        description: "Скачивайте превью видео YouTube в качестве 4K, HD и SD.",
        content: {
          overview: "Получите превью (обложку) любого видео YouTube в максимальном разрешении.",
          howTo: ["Копируйте URL.", "Вставьте.", "Выберите качество.", "Скачайте."],
          features: ["Поддержка 4K.", "Любое видео.", "Быстро.", "Бесплатно."],
          faq: [{ question: "Законно?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "image-resizer", label: "Resize for Instagram" },
      { slug: "image-compressor", label: "Compress thumbnail" }
    ]
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
    },
    locales: {
      en: {
        title: "Merge PDF Files",
        description: "Combine multiple PDF files into one single document instantly.",
        content: {
          overview: "Combine PDFs in the order you want with the easiest PDF Merger available.",
          howTo: ["Select files.", "Reorder.", "Merge.", "Save."],
          features: ["Secure.", "Drag & Drop.", "Fast.", "No limits."],
          faq: [{ question: "Safe?", answer: "Yes." }]
        }
      },
      es: {
        title: "Unir Archivos PDF",
        description: "Combina múltiples archivos PDF en un solo documento al instante.",
        content: {
          overview: "Combina PDFs en el orden que desees con el fusionador de PDF más fácil disponible.",
          howTo: ["Selecciona archivos.", "Reordena.", "Une.", "Guarda."],
          features: ["Seguro.", "Arrastrar y soltar.", "Rápido.", "Sin límites."],
          faq: [{ question: "¿Seguro?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Объединить PDF",
        description: "Объединяйте несколько PDF-файлов в один документ мгновенно.",
        content: {
          overview: "Объединяйте PDF-файлы в нужном порядке с помощью самого простого инструмента.",
          howTo: ["Выберите файлы.", "Сортируйте.", "Объедините.", "Сохраните."],
          features: ["Безопасно.", "Перетаскивание.", "Быстро.", "Без лимитов."],
          faq: [{ question: "Безопасно?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "compress-pdf", label: "File too big? Compress it now" },
      { slug: "pdf-to-word", label: "Need to edit the content?" }
    ]
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
        { question: "Does it support scans?", answer: "Yes, it extracts text from images." }
      ]
    },
    locales: {
      en: {
        title: "PDF to Word Converter",
        description: "Convert PDF documents to editable Word (.docx) files.",
        content: {
          overview: "Turn your PDF documents into editable Word files while preserving layout.",
          howTo: ["Upload PDF.", "Convert.", "Download DOCX.", "Edit."],
          features: ["OCR Tech.", "Preserves Layout.", "Fast.", "Mobile ready."],
          faq: [{ question: "Editable?", answer: "Yes." }]
        }
      },
      es: {
        title: "Convertir PDF a Word",
        description: "Convierte documentos PDF a archivos Word (.docx) editables.",
        content: {
          overview: "Transforma tus PDFs en archivos Word editables conservando el diseño.",
          howTo: ["Sube PDF.", "Convierte.", "Descarga DOCX.", "Edita."],
          features: ["Tecnología OCR.", "Conserva diseño.", "Rápido.", "Móvil."],
          faq: [{ question: "¿Editable?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Конвертер PDF в Word",
        description: "Конвертируйте PDF документы в редактируемые файлы Word (.docx).",
        content: {
          overview: "Превратите ваши PDF в редактируемые файлы Word с сохранением верстки.",
          howTo: ["Загрузите PDF.", "Конвертируйте.", "Скачайте DOCX.", "Редактируйте."],
          features: ["OCR Технология.", "Сохранение верстки.", "Быстро.", "Для мобильных."],
          faq: [{ question: "Редактируемый?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "word-to-pdf", label: "Convert back to PDF" }
    ]
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
    },
    locales: {
      en: {
        title: "Word to PDF Converter",
        description: "Convert Word documents (.docx) to PDF format instantly.",
        content: {
          overview: "Convert your DOCX files to PDF to ensure your formatting stays consistent.",
          howTo: ["Upload Word.", "Convert.", "Download PDF."],
          features: ["Consistent Layout.", "Pro Quality.", "Secure.", "Universal."],
          faq: [{ question: "Formatting?", answer: "Stays same." }]
        }
      },
      es: {
        title: "Convertir Word a PDF",
        description: "Convierte documentos Word (.docx) a formato PDF al instante.",
        content: {
          overview: "Convierte tus archivos DOCX a PDF para asegurar que el formato se mantenga.",
          howTo: ["Sube Word.", "Convierte.", "Descarga PDF."],
          features: ["Diseño consistente.", "Calidad Pro.", "Seguro.", "Universal."],
          faq: [{ question: "¿Formato?", answer: "Se mantiene." }]
        }
      },
      ru: {
        title: "Конвертер Word в PDF",
        description: "Мгновенно конвертируйте документы Word (.docx) в формат PDF.",
        content: {
          overview: "Конвертируйте DOCX в PDF, чтобы сохранить форматирование на любом устройстве.",
          howTo: ["Загрузите Word.", "Конвертируйте.", "Скачайте PDF."],
          features: ["Сохранение верстки.", "Проф. качество.", "Безопасно.", "Универсально."],
          faq: [{ question: "Форматирование?", answer: "Сохраняется." }]
        }
      }
    },
    nextSteps: [
      { slug: "merge-pdf", label: "Combine with other PDFs" },
      { slug: "pdf-compressor", label: "Compress output" }
    ]
  },
  "image-to-pdf": {
    slug: "image-to-pdf",
    title: "JPG to PDF Converter",
    description: "Convert JPG, PNG, and WEBP images into a single PDF document. Create photo albums or scan documents.",
    category: "pdf",
    componentKey: "ImageToPdf",
    icon: "FileStack",
    content: {
      overview: "Combine your photos or scanned documents into a single, shareable PDF file. Perfect for creating portfolios or sending documents.",
      howTo: [
        "Select your images (JPG, PNG).",
        "Reorder them if necessary.",
        "Choose page orientation.",
        "Click 'Convert' and download."
      ],
      features: [
        "Combine multiple images.",
        "Adjustable orientation.",
        "Small file size output.",
        "No watermark."
      ],
      faq: [
        { question: "Can I reorder?", answer: "Yes, drag and drop." },
        { question: "Is there a limit?", answer: "No, add many photos." }
      ]
    },
    locales: {
      en: {
        title: "JPG to PDF Converter",
        description: "Convert JPG, PNG, and WEBP images into a single PDF.",
        content: {
          overview: "Combine your photos or scanned documents into a single, shareable PDF file.",
          howTo: ["Select images.", "Reorder.", "Set orientation.", "Download."],
          features: ["Multiple images.", "Orientation.", "Small size.", "No watermark."],
          faq: [{ question: "Reorder?", answer: "Yes." }]
        }
      },
      es: {
        title: "Convertir JPG a PDF",
        description: "Convierte imágenes JPG, PNG y WEBP en un solo documento PDF.",
        content: {
          overview: "Combina tus fotos o documentos escaneados en un solo archivo PDF para compartir.",
          howTo: ["Elige imágenes.", "Reordena.", "Orientación.", "Descarga."],
          features: ["Múltiples imágenes.", "Orientación.", "Tamaño pequeño.", "Sin marca."],
          faq: [{ question: "¿Reordenar?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Конвертер JPG в PDF",
        description: "Конвертируйте изображения JPG, PNG и WEBP в один PDF документ.",
        content: {
          overview: "Объедините фото или сканы документов в один удобный PDF файл.",
          howTo: ["Выберите фото.", "Сортируйте.", "Ориентация.", "Скачайте."],
          features: ["Несколько фото.", "Ориентация.", "Малый размер.", "Без водяных знаков."],
          faq: [{ question: "Сортировка?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "pdf-compressor", label: "Compress the PDF" },
      { slug: "merge-pdf", label: "Merge with other docs" }
    ]
  },
  "pdf-compressor": {
    slug: "pdf-compressor",
    title: "PDF Compressor",
    description: "Reduce PDF file size for easier sharing and uploading. Optimize documents without quality loss.",
    category: "pdf",
    componentKey: "PdfCompressor",
    icon: "FileStack",
    content: {
      overview: "Shrink large PDF files to make them easier to email or upload. Our tool optimizes internal assets without sacrificing readability.",
      howTo: [
        "Upload your large PDF.",
        "Select compression level.",
        "Download the optimized PDF."
      ],
      features: [
        "Significant size reduction.",
        "Keeps text sharp.",
        "Works offline (PWA).",
        "Secure processing."
      ],
      faq: [
        { question: "Blurry text?", answer: "No, text remains vector-based." },
        { question: "Space saved?", answer: "Usually 30% to 70%." }
      ]
    },
    locales: {
      en: {
        title: "PDF Compressor",
        description: "Reduce PDF file size for easier sharing and uploading.",
        content: {
          overview: "Shrink large PDF files to make them easier to email or upload.",
          howTo: ["Upload PDF.", "Select level.", "Download."],
          features: ["Size reduction.", "Sharp text.", "Offline ready.", "Secure."],
          faq: [{ question: "Blurry?", answer: "No." }]
        }
      },
      es: {
        title: "Compresor de PDF",
        description: "Reduce el tamaño de archivos PDF para compartir y subir fácilmente.",
        content: {
          overview: "Achica archivos PDF grandes para enviarlos por email más fácil.",
          howTo: ["Sube PDF.", "Elige nivel.", "Descarga."],
          features: ["Reducción tamaño.", "Texto nítido.", "Offline.", "Seguro."],
          faq: [{ question: "¿Borroso?", answer: "No." }]
        }
      },
      ru: {
        title: "Сжатие PDF",
        description: "Уменьшите размер PDF файла для легкой отправки и загрузки.",
        content: {
          overview: "Сожмите большие PDF файлы для отправки по почте.",
          howTo: ["Загрузите PDF.", "Выберите уровень.", "Скачайте."],
          features: ["Уменьшение размера.", "Четкий текст.", "Офлайн.", "Безопасно."],
          faq: [{ question: "Размыто?", answer: "Нет." }]
        }
      }
    },
    nextSteps: [
      { slug: "merge-pdf", label: "Merge more files" },
      { slug: "pdf-to-word", label: "Convert to Word" }
    ]
  },
  "pdf-splitter": {
    slug: "pdf-splitter",
    title: "Split PDF Pages",
    description: "Extract specific pages from a PDF file. Split large documents into smaller, separate files.",
    category: "pdf",
    componentKey: "PdfSplitter",
    icon: "FileStack",
    content: {
      overview: "Extract only the pages you need from a large PDF document. Split a book into chapters or separate a single invoice.",
      howTo: [
        "Upload the PDF document.",
        "Select the pages to extract.",
        "Click 'Split PDF'.",
        "Download pages as new file."
      ],
      features: [
        "Visual page selector.",
        "Extract ranges.",
        "Instant processing.",
        "No upload required."
      ],
      faq: [
        { question: "Multiple ranges?", answer: "Yes, select any pages." },
        { question: "Original file affected?", answer: "No." }
      ]
    },
    locales: {
      en: {
        title: "Split PDF Pages",
        description: "Extract specific pages from a PDF file.",
        content: {
          overview: "Extract only the pages you need from a large PDF document.",
          howTo: ["Upload PDF.", "Select pages.", "Split.", "Download."],
          features: ["Page selector.", "Ranges.", "Instant.", "No upload."],
          faq: [{ question: "Multiple ranges?", answer: "Yes." }]
        }
      },
      es: {
        title: "Dividir PDF",
        description: "Extrae páginas específicas de un archivo PDF.",
        content: {
          overview: "Extrae solo las páginas que necesitas de un documento PDF grande.",
          howTo: ["Sube PDF.", "Elige páginas.", "Divide.", "Descarga."],
          features: ["Selector visual.", "Rangos.", "Instantáneo.", "Sin subida."],
          faq: [{ question: "¿Varios rangos?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Разделить PDF",
        description: "Извлеките конкретные страницы из PDF файла.",
        content: {
          overview: "Извлеките только нужные страницы из большого PDF документа.",
          howTo: ["Загрузите PDF.", "Выберите страницы.", "Разделите.", "Скачайте."],
          features: ["Выбор страниц.", "Диапазоны.", "Мгновенно.", "Без загрузки."],
          faq: [{ question: "Несколько диапазонов?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "merge-pdf", label: "Merge extracted pages" },
      { slug: "pdf-compressor", label: "Compress new PDF" }
    ]
  },
  "organize-pdf": {
    slug: "organize-pdf",
    title: "Organize PDF",
    description: "Sort, rotate, delete, and reorder PDF pages. Manage your document structure easily.",
    category: "pdf",
    componentKey: "PdfOrganizer",
    icon: "LayoutGrid",
    content: {
      overview: "Take full control of your PDF pages. Rotate upside-down pages, delete unnecessary ones, and reorder the flow.",
      howTo: [
        "Upload your PDF.",
        "Hover to rotate/delete.",
        "Drag pages to reorder.",
        "Save the organized PDF."
      ],
      features: [
        "Rotate pages.",
        "Delete pages.",
        "Drag-and-drop.",
        "Real-time preview."
      ],
      faq: [
        { question: "Rotate one page?", answer: "Yes." },
        { question: "Permanent?", answer: "Creates new file." }
      ]
    },
    locales: {
      en: {
        title: "Organize PDF",
        description: "Sort, rotate, delete, and reorder PDF pages.",
        content: {
          overview: "Take full control of your PDF pages. Rotate, delete, and reorder.",
          howTo: ["Upload.", "Rotate/Delete.", "Reorder.", "Save."],
          features: ["Rotate.", "Delete.", "Drag & Drop.", "Preview."],
          faq: [{ question: "Rotate one?", answer: "Yes." }]
        }
      },
      es: {
        title: "Organizar PDF",
        description: "Ordena, rota, elimina y reordena páginas PDF.",
        content: {
          overview: "Toma el control total de tus páginas PDF. Rota, elimina y reordena.",
          howTo: ["Sube.", "Rota/Elimina.", "Reordena.", "Guarda."],
          features: ["Rotar.", "Eliminar.", "Arrastrar.", "Vista previa."],
          faq: [{ question: "¿Rotar una?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Организовать PDF",
        description: "Сортируйте, вращайте, удаляйте и меняйте порядок страниц PDF.",
        content: {
          overview: "Полный контроль над страницами PDF. Вращайте, удаляйте, меняйте местами.",
          howTo: ["Загрузите.", "Вращайте/Удаляйте.", "Сортируйте.", "Сохраните."],
          features: ["Вращение.", "Удаление.", "Перетаскивание.", "Предпросмотр."],
          faq: [{ question: "Повернуть одну?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "merge-pdf", label: "Merge with others" },
      { slug: "pdf-compressor", label: "Compress final doc" }
    ]
  },
  "pdf-to-image": {
    slug: "pdf-to-image",
    title: "PDF to Image Converter",
    description: "Convert PDF pages into high-quality JPG or PNG images. Extract visual content from documents.",
    category: "pdf",
    componentKey: "PdfToImage",
    icon: "FileStack",
    content: {
      overview: "Convert every page of your PDF into a separate high-quality image file. Useful for sharing document pages on social media.",
      howTo: [
        "Upload the PDF file.",
        "Choose format (JPG/PNG).",
        "Download pages."
      ],
      features: [
        "High DPI output.",
        "JPG and PNG.",
        "Batch extraction.",
        "Transparent backgrounds."
      ],
      faq: [
        { question: "All pages?", answer: "Yes, every page." },
        { question: "Quality?", answer: "High resolution." }
      ]
    },
    locales: {
      en: {
        title: "PDF to Image Converter",
        description: "Convert PDF pages into high-quality JPG or PNG images.",
        content: {
          overview: "Convert every page of your PDF into a separate high-quality image file.",
          howTo: ["Upload PDF.", "Select format.", "Download."],
          features: ["High DPI.", "JPG/PNG.", "Batch.", "Transparency."],
          faq: [{ question: "All pages?", answer: "Yes." }]
        }
      },
      es: {
        title: "Convertir PDF a Imagen",
        description: "Convierte páginas PDF en imágenes JPG o PNG de alta calidad.",
        content: {
          overview: "Convierte cada página de tu PDF en un archivo de imagen separado.",
          howTo: ["Sube PDF.", "Elige formato.", "Descarga."],
          features: ["Alta DPI.", "JPG/PNG.", "Lotes.", "Transparencia."],
          faq: [{ question: "¿Todas las páginas?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Конвертер PDF в Изображение",
        description: "Конвертируйте страницы PDF в качественные JPG или PNG изображения.",
        content: {
          overview: "Превратите каждую страницу PDF в отдельный файл изображения.",
          howTo: ["Загрузите PDF.", "Выберите формат.", "Скачайте."],
          features: ["Высокое DPI.", "JPG/PNG.", "Пакетно.", "Прозрачность."],
          faq: [{ question: "Все страницы?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "image-resizer", label: "Resize pages" },
      { slug: "image-compressor", label: "Compress images" }
    ]
  },

  // --- GENERATOR & DEV TOOLS ---
  "qr-code-generator": {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR Codes with colors and logos. High-resolution download for print and digital use.",
    category: "generator",
    componentKey: "QrGenerator",
    icon: "QrCode",
    content: {
      overview: "Generate scannable QR codes for URLs, WiFi, Text, or vCards. Customize the foreground and background colors.",
      howTo: [
        "Select type (URL, WiFi, etc.).",
        "Enter data.",
        "Customize colors.",
        "Download PNG/SVG."
      ],
      features: [
        "Custom colors.",
        "High-res download.",
        "WiFi & Contact support.",
        "No expiration."
      ],
      faq: [
        { question: "Do they expire?", answer: "No, static codes." },
        { question: "Print ready?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "QR Code Generator",
        description: "Create custom QR Codes with colors and logos.",
        content: {
          overview: "Generate scannable QR codes for URLs, WiFi, Text, or vCards.",
          howTo: ["Select type.", "Enter data.", "Customize.", "Download."],
          features: ["Colors.", "High-res.", "WiFi.", "Forever free."],
          faq: [{ question: "Expire?", answer: "No." }]
        }
      },
      es: {
        title: "Generador de Códigos QR",
        description: "Crea códigos QR personalizados con colores y logos.",
        content: {
          overview: "Genera códigos QR escaneables para URLs, WiFi, texto o vCards.",
          howTo: ["Elige tipo.", "Ingresa datos.", "Personaliza.", "Descarga."],
          features: ["Colores.", "Alta res.", "WiFi.", "Gratis siempre."],
          faq: [{ question: "¿Caducan?", answer: "No." }]
        }
      },
      ru: {
        title: "Генератор QR-кодов",
        description: "Создавайте кастомные QR-коды с цветами и логотипами.",
        content: {
          overview: "Создавайте сканируемые QR-коды для ссылок, WiFi, текста или контактов.",
          howTo: ["Выберите тип.", "Введите данные.", "Настройте.", "Скачайте."],
          features: ["Цвета.", "Высокое разр.", "WiFi.", "Навсегда."],
          faq: [{ question: "Истекают?", answer: "Нет." }]
        }
      }
    },
    nextSteps: [
      { slug: "image-converter", label: "Convert QR to JPG" }
    ]
  },
  "password-generator": {
    slug: "password-generator",
    title: "Strong Password Generator",
    description: "Create secure, random passwords instantly. Customizable length and character sets.",
    category: "generator",
    componentKey: "PasswordGenerator",
    icon: "Lock",
    content: {
      overview: "Protect your accounts with uncrackable passwords. Generate random strings containing numbers and symbols.",
      howTo: [
        "Select length.",
        "Check options (Symbols, Numbers).",
        "Generate.",
        "Copy."
      ],
      features: [
        "Cryptographically strong.",
        "Customizable.",
        "One-click copy.",
        "Local generation."
      ],
      faq: [
        { question: "Secure?", answer: "Yes, browser crypto." },
        { question: "Saved?", answer: "Never." }
      ]
    },
    locales: {
      en: {
        title: "Strong Password Generator",
        description: "Create secure, random passwords instantly.",
        content: {
          overview: "Protect your accounts with uncrackable passwords.",
          howTo: ["Select length.", "Options.", "Generate.", "Copy."],
          features: ["Crypto strong.", "Custom.", "Fast.", "Local."],
          faq: [{ question: "Secure?", answer: "Yes." }]
        }
      },
      es: {
        title: "Generador de Contraseñas",
        description: "Crea contraseñas seguras y aleatorias al instante.",
        content: {
          overview: "Protege tus cuentas con contraseñas indescifrables.",
          howTo: ["Longitud.", "Opciones.", "Generar.", "Copiar."],
          features: ["Cifrado fuerte.", "Personalizable.", "Rápido.", "Local."],
          faq: [{ question: "¿Seguro?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Генератор паролей",
        description: "Создавайте надежные случайные пароли мгновенно.",
        content: {
          overview: "Защитите свои аккаунты с помощью невзламываемых паролей.",
          howTo: ["Длина.", "Опции.", "Создать.", "Копировать."],
          features: ["Криптостойкость.", "Настройки.", "Быстро.", "Локально."],
          faq: [{ question: "Безопасно?", answer: "Да." }]
        }
      }
    },
    nextSteps: []
  },
  "fake-data-generator": {
    slug: "fake-data-generator",
    title: "Fake Data Generator",
    description: "Generate mock data for testing. Create random users, emails, and addresses in JSON, CSV, or SQL.",
    category: "generator",
    componentKey: "FakeDataGenerator",
    icon: "Database",
    content: {
      overview: "Developers love this tool for populating databases. Generate thousands of rows of realistic fake data.",
      howTo: [
        "Select fields (Name, Email).",
        "Choose format (JSON/CSV).",
        "Select rows.",
        "Download."
      ],
      features: [
        "Multiple data types.",
        "Export JSON/CSV/SQL.",
        "Realistic patterns.",
        "Instant."
      ],
      faq: [
        { question: "Real data?", answer: "No, random mock." },
        { question: "Large datasets?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "Fake Data Generator",
        description: "Generate mock data for testing. Users, emails, addresses.",
        content: {
          overview: "Generate thousands of rows of realistic fake data for testing.",
          howTo: ["Select fields.", "Format.", "Rows.", "Download."],
          features: ["Data types.", "Export.", "Realistic.", "Fast."],
          faq: [{ question: "Real?", answer: "No." }]
        }
      },
      es: {
        title: "Generador de Datos Falsos",
        description: "Genera datos de prueba. Usuarios, correos, direcciones.",
        content: {
          overview: "Genera miles de filas de datos falsos realistas para pruebas.",
          howTo: ["Campos.", "Formato.", "Filas.", "Descarga."],
          features: ["Tipos de datos.", "Exportar.", "Realista.", "Rápido."],
          faq: [{ question: "¿Real?", answer: "No." }]
        }
      },
      ru: {
        title: "Генератор фейковых данных",
        description: "Создавайте мок-данные для тестов. Пользователи, email, адреса.",
        content: {
          overview: "Генерируйте тысячи строк реалистичных фейковых данных для тестирования.",
          howTo: ["Поля.", "Формат.", "Строки.", "Скачать."],
          features: ["Типы данных.", "Экспорт.", "Реалистично.", "Быстро."],
          faq: [{ question: "Настоящие?", answer: "Нет." }]
        }
      }
    },
    nextSteps: [
      { slug: "json-formatter", label: "Format generated JSON" }
    ]
  },
  "youtube-title-generator": {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Generate viral, high-CTR video titles using AI-proven templates.",
    category: "generator",
    componentKey: "YoutubeTitleGenerator",
    icon: "Youtube",
    content: {
      overview: "Stuck on a video idea? Use our Title Generator to create catchy, click-worthy titles that boost your CTR.",
      howTo: [
        "Enter topic.",
        "Generate.",
        "Browse hooks.",
        "Copy."
      ],
      features: [
        "Viral patterns.",
        "SEO friendly.",
        "Multiple variations.",
        "Boosts CTR."
      ],
      faq: [
        { question: "How it works?", answer: "Templates from top videos." },
        { question: "Free?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "YouTube Title Generator",
        description: "Generate viral, high-CTR video titles using AI templates.",
        content: {
          overview: "Create catchy, click-worthy titles that boost your CTR.",
          howTo: ["Topic.", "Generate.", "Browse.", "Copy."],
          features: ["Viral.", "SEO.", "Variations.", "CTR."],
          faq: [{ question: "Free?", answer: "Yes." }]
        }
      },
      es: {
        title: "Generador de Títulos YouTube",
        description: "Genera títulos virales y de alto CTR con plantillas IA.",
        content: {
          overview: "Crea títulos llamativos que aumenten tus visitas.",
          howTo: ["Tema.", "Generar.", "Explorar.", "Copiar."],
          features: ["Viral.", "SEO.", "Variaciones.", "CTR."],
          faq: [{ question: "¿Gratis?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Генератор заголовков YouTube",
        description: "Создавайте вирусные заголовки с высоким CTR.",
        content: {
          overview: "Создавайте цепляющие заголовки, которые увеличивают просмотры.",
          howTo: ["Тема.", "Создать.", "Выбрать.", "Копировать."],
          features: ["Вирусно.", "SEO.", "Варианты.", "CTR."],
          faq: [{ question: "Бесплатно?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "youtube-thumbnail", label: "Download thumbnail" }
    ]
  },
  "word-counter": {
    slug: "word-counter",
    title: "Word & Character Counter",
    description: "Real-time word, character, sentence, and paragraph counter. Perfect for writing and SEO.",
    category: "text",
    componentKey: "WordCounter",
    icon: "Type",
    content: {
      overview: "Instant analysis of word count, character count, paragraphs, and reading time.",
      howTo: [
        "Paste text.",
        "See stats.",
        "Check reading time."
      ],
      features: [
        "Real-time.",
        "Reading time.",
        "Space counting.",
        "Privacy."
      ],
      faq: [
        { question: "Count spaces?", answer: "Yes." },
        { question: "Limit?", answer: "No." }
      ]
    },
    locales: {
      en: {
        title: "Word & Character Counter",
        description: "Real-time word, character, and sentence counter.",
        content: {
          overview: "Instant analysis of word count, character count, paragraphs, and reading time.",
          howTo: ["Paste.", "Stats.", "Time."],
          features: ["Real-time.", "Reading time.", "Spaces.", "Privacy."],
          faq: [{ question: "Limit?", answer: "No." }]
        }
      },
      es: {
        title: "Contador de Palabras",
        description: "Contador de palabras, caracteres y oraciones en tiempo real.",
        content: {
          overview: "Análisis instantáneo de conteo de palabras, caracteres y tiempo de lectura.",
          howTo: ["Pega.", "Estadísticas.", "Tiempo."],
          features: ["Tiempo real.", "Lectura.", "Espacios.", "Privacidad."],
          faq: [{ question: "¿Límite?", answer: "No." }]
        }
      },
      ru: {
        title: "Счетчик слов и символов",
        description: "Подсчет слов, символов и предложений в реальном времени.",
        content: {
          overview: "Мгновенный анализ количества слов, знаков и времени чтения.",
          howTo: ["Вставьте.", "Статистика.", "Время."],
          features: ["Реал-тайм.", "Чтение.", "Пробелы.", "Приватность."],
          faq: [{ question: "Лимит?", answer: "Нет." }]
        }
      }
    },
    nextSteps: [
      { slug: "youtube-title-generator", label: "Write a title" }
    ]
  },
  "json-formatter": {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    description: "Beautify, validate, and minify JSON data. Fix syntax errors and make JSON readable.",
    category: "code",
    componentKey: "JsonFormatter",
    icon: "FileText",
    content: {
      overview: "Debug your JSON data easily. Format messy JSON, validate errors, and minify for production.",
      howTo: [
        "Paste JSON.",
        "Format/Minify.",
        "Copy."
      ],
      features: [
        "Error highlight.",
        "Tree view.",
        "Minify/Beautify.",
        "Fast copy."
      ],
      faq: [
        { question: "Fix errors?", answer: "Highlights them." },
        { question: "Secure?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "JSON Formatter & Validator",
        description: "Beautify, validate, and minify JSON data.",
        content: {
          overview: "Debug your JSON data easily. Format messy JSON, validate errors.",
          howTo: ["Paste.", "Format.", "Copy."],
          features: ["Errors.", "Tree view.", "Minify.", "Fast."],
          faq: [{ question: "Secure?", answer: "Yes." }]
        }
      },
      es: {
        title: "Formateador JSON",
        description: "Embellece, valida y minifica datos JSON.",
        content: {
          overview: "Depura tus datos JSON fácilmente. Formatea y valida errores.",
          howTo: ["Pega.", "Formatea.", "Copia."],
          features: ["Errores.", "Árbol.", "Minificar.", "Rápido."],
          faq: [{ question: "¿Seguro?", answer: "Sí." }]
        }
      },
      ru: {
        title: "JSON Форматер",
        description: "Форматирование, валидация и минификация JSON.",
        content: {
          overview: "Легко отлаживайте JSON. Форматируйте и находите ошибки.",
          howTo: ["Вставьте.", "Формат.", "Копия."],
          features: ["Ошибки.", "Дерево.", "Сжатие.", "Быстро."],
          faq: [{ question: "Безопасно?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "json-to-typescript", label: "Convert to TS Types" }
    ]
  },
  "css-to-tailwind": {
    slug: "css-to-tailwind",
    title: "CSS to Tailwind Converter",
    description: "Transform standard CSS code into Tailwind CSS classes. Modernize your styling workflow.",
    category: "code",
    componentKey: "CssToTailwind",
    icon: "Wind",
    content: {
      overview: "Migrate to Tailwind CSS. Convert legacy CSS code into modern utility classes automatically.",
      howTo: [
        "Paste CSS.",
        "View Tailwind classes.",
        "Copy."
      ],
      features: [
        "Smart mapping.",
        "Media queries.",
        "Modern props.",
        "Instant."
      ],
      faq: [
        { question: "Accurate?", answer: "Mostly yes." },
        { question: "Arbitrary values?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "CSS to Tailwind Converter",
        description: "Transform standard CSS code into Tailwind CSS classes.",
        content: {
          overview: "Migrate to Tailwind CSS. Convert legacy CSS code automatically.",
          howTo: ["Paste CSS.", "View.", "Copy."],
          features: ["Mapping.", "Queries.", "Props.", "Instant."],
          faq: [{ question: "Accurate?", answer: "Mostly." }]
        }
      },
      es: {
        title: "CSS a Tailwind",
        description: "Transforma código CSS estándar a clases de Tailwind.",
        content: {
          overview: "Migra a Tailwind CSS. Convierte CSS antiguo automáticamente.",
          howTo: ["Pega CSS.", "Ver.", "Copiar."],
          features: ["Mapeo.", "Queries.", "Props.", "Instantáneo."],
          faq: [{ question: "¿Preciso?", answer: "Mayormente." }]
        }
      },
      ru: {
        title: "Конвертер CSS в Tailwind",
        description: "Преобразуйте обычный CSS в классы Tailwind.",
        content: {
          overview: "Переходите на Tailwind. Автоматическая конвертация старого CSS.",
          howTo: ["Вставьте CSS.", "Смотрите.", "Копируйте."],
          features: ["Маппинг.", "Запросы.", "Свойства.", "Мгновенно."],
          faq: [{ question: "Точно?", answer: "Почти всегда." }]
        }
      }
    },
    nextSteps: [
      { slug: "css-minifier", label: "Minify CSS" }
    ]
  },
  "css-minifier": {
    slug: "css-minifier",
    title: "CSS Minifier",
    description: "Minify CSS code to reduce file size and improve website load speed.",
    category: "code",
    componentKey: "CssMinifier",
    icon: "Code2",
    content: {
      overview: "Speed up your website by minifying CSS. Remove whitespace and comments.",
      howTo: [
        "Paste CSS.",
        "Minify.",
        "Copy."
      ],
      features: [
        "Removes spaces.",
        "Optimizes size.",
        "Instant.",
        "SEO friendly."
      ],
      faq: [
        { question: "Revert?", answer: "Use beautifier." },
        { question: "Space saved?", answer: "15-20%." }
      ]
    },
    locales: {
      en: {
        title: "CSS Minifier",
        description: "Minify CSS code to reduce file size.",
        content: {
          overview: "Speed up your website by minifying CSS. Remove whitespace.",
          howTo: ["Paste.", "Minify.", "Copy."],
          features: ["No spaces.", "Small size.", "Instant.", "SEO."],
          faq: [{ question: "Revert?", answer: "Hard." }]
        }
      },
      es: {
        title: "Minificador CSS",
        description: "Minifica código CSS para reducir tamaño.",
        content: {
          overview: "Acelera tu web minificando CSS. Elimina espacios.",
          howTo: ["Pega.", "Minifica.", "Copia."],
          features: ["Sin espacios.", "Tamaño.", "Rápido.", "SEO."],
          faq: [{ question: "¿Revertir?", answer: "Difícil." }]
        }
      },
      ru: {
        title: "CSS Минификатор",
        description: "Сжимайте CSS код для уменьшения размера.",
        content: {
          overview: "Ускорьте сайт, сжимая CSS. Удаляет пробелы.",
          howTo: ["Вставьте.", "Сжать.", "Копия."],
          features: ["Без пробелов.", "Размер.", "Быстро.", "SEO."],
          faq: [{ question: "Вернуть?", answer: "Сложно." }]
        }
      }
    },
    nextSteps: [
      { slug: "css-to-tailwind", label: "Convert to Tailwind" }
    ]
  },
  "json-to-typescript": {
    slug: "json-to-typescript",
    title: "JSON to TypeScript",
    description: "Convert JSON objects into TypeScript interfaces instantly.",
    category: "code",
    componentKey: "JsonToTypescript",
    icon: "FileCode",
    content: {
      overview: "Stop writing interfaces manually. Paste JSON and get TypeScript definitions.",
      howTo: [
        "Paste JSON.",
        "View TS.",
        "Copy."
      ],
      features: [
        "Nested objects.",
        "Type inference.",
        "Arrays.",
        "Real-time."
      ],
      faq: [
        { question: "Optional fields?", answer: "Strict types." },
        { question: "Secure?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "JSON to TypeScript",
        description: "Convert JSON objects into TypeScript interfaces.",
        content: {
          overview: "Stop writing interfaces manually. Paste JSON and get TypeScript definitions.",
          howTo: ["Paste JSON.", "View TS.", "Copy."],
          features: ["Nested.", "Types.", "Arrays.", "Real-time."],
          faq: [{ question: "Secure?", answer: "Yes." }]
        }
      },
      es: {
        title: "JSON a TypeScript",
        description: "Convierte objetos JSON a interfaces TypeScript.",
        content: {
          overview: "Deja de escribir interfaces manualmente. Pega JSON y obtén TS.",
          howTo: ["Pega JSON.", "Ver TS.", "Copia."],
          features: ["Anidado.", "Tipos.", "Arrays.", "Tiempo real."],
          faq: [{ question: "¿Seguro?", answer: "Sí." }]
        }
      },
      ru: {
        title: "JSON в TypeScript",
        description: "Конвертируйте JSON объекты в TypeScript интерфейсы.",
        content: {
          overview: "Перестаньте писать интерфейсы вручную. Вставьте JSON и получите TS.",
          howTo: ["Вставьте JSON.", "Смотрите TS.", "Копия."],
          features: ["Вложенность.", "Типы.", "Массивы.", "Реал-тайм."],
          faq: [{ question: "Безопасно?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "json-formatter", label: "Format JSON" }
    ]
  },
  "unit-converter": {
    slug: "unit-converter",
    title: "Universal Unit Converter",
    description: "Convert between common units: Length, Weight, Temperature, Area, and Time.",
    category: "converter",
    componentKey: "UnitConverter",
    icon: "RefreshCcw",
    content: {
      overview: "A simple, all-in-one converter for daily needs. Metric and Imperial units.",
      howTo: [
        "Select category.",
        "Enter value.",
        "Select units.",
        "Result."
      ],
      features: [
        "Length/Weight/Temp.",
        "Instant.",
        "Clean.",
        "Accurate."
      ],
      faq: [
        { question: "Accurate?", answer: "Yes." },
        { question: "Temp?", answer: "C/F/K." }
      ]
    },
    locales: {
      en: {
        title: "Universal Unit Converter",
        description: "Convert between common units: Length, Weight, Temp.",
        content: {
          overview: "A simple, all-in-one converter for daily needs.",
          howTo: ["Category.", "Value.", "Units.", "Result."],
          features: ["Many units.", "Instant.", "Clean.", "Accurate."],
          faq: [{ question: "Accurate?", answer: "Yes." }]
        }
      },
      es: {
        title: "Conversor de Unidades",
        description: "Convierte entre unidades comunes: Longitud, Peso, Temp.",
        content: {
          overview: "Un conversor simple todo en uno para necesidades diarias.",
          howTo: ["Categoría.", "Valor.", "Unidades.", "Resultado."],
          features: ["Muchas unidades.", "Instantáneo.", "Limpio.", "Preciso."],
          faq: [{ question: "¿Preciso?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Конвертер величин",
        description: "Конвертация единиц: Длина, Вес, Температура и др.",
        content: {
          overview: "Простой конвертер все-в-одном для ежедневных нужд.",
          howTo: ["Категория.", "Значение.", "Единицы.", "Результат."],
          features: ["Много единиц.", "Мгновенно.", "Чисто.", "Точно."],
          faq: [{ question: "Точно?", answer: "Да." }]
        }
      }
    },
    nextSteps: []
  },
  "base64-converter": {
    slug: "base64-converter",
    title: "Base64 Converter",
    description: "Encode text/files to Base64 or decode Base64 strings.",
    category: "converter",
    componentKey: "Base64Converter",
    icon: "FileCode",
    content: {
      overview: "Encode text or files into Base64 strings, or decode Base64 back into text.",
      howTo: [
        "Mode (Encode/Decode).",
        "Paste/Upload.",
        "Result."
      ],
      features: [
        "Text and files.",
        "Fast.",
        "Large strings.",
        "UTF-8."
      ],
      faq: [
        { question: "What is Base64?", answer: "Encoding binary as text." },
        { question: "Encryption?", answer: "No." }
      ]
    },
    locales: {
      en: {
        title: "Base64 Converter",
        description: "Encode text/files to Base64 or decode Base64.",
        content: {
          overview: "Encode text or files into Base64 strings, or decode back.",
          howTo: ["Mode.", "Input.", "Result."],
          features: ["Text/Files.", "Fast.", "Large strings.", "UTF-8."],
          faq: [{ question: "Encryption?", answer: "No." }]
        }
      },
      es: {
        title: "Conversor Base64",
        description: "Codifica texto/archivos a Base64 o decodifica Base64.",
        content: {
          overview: "Codifica texto o archivos en Base64, o decodifica.",
          howTo: ["Modo.", "Entrada.", "Resultado."],
          features: ["Texto/Archivos.", "Rápido.", "Grandes cadenas.", "UTF-8."],
          faq: [{ question: "¿Encriptación?", answer: "No." }]
        }
      },
      ru: {
        title: "Base64 Конвертер",
        description: "Кодируйте текст/файлы в Base64 или декодируйте обратно.",
        content: {
          overview: "Кодируйте текст или файлы в Base64, или декодируйте.",
          howTo: ["Режим.", "Ввод.", "Результат."],
          features: ["Текст/Файлы.", "Быстро.", "Большие строки.", "UTF-8."],
          faq: [{ question: "Шифрование?", answer: "Нет." }]
        }
      }
    },
    nextSteps: []
  },
  "responsive-tester": {
    slug: "responsive-tester",
    title: "Responsive Layout Tester",
    description: "Test your website on different screen sizes (Mobile, Tablet, Desktop) simultaneously.",
    category: "code",
    componentKey: "ResponsiveTester",
    icon: "Smartphone",
    content: {
      overview: "Ensure your website looks perfect on every device. Simulates various screen resolutions.",
      howTo: [
        "Enter URL.",
        "Select device.",
        "Orientation.",
        "Zoom."
      ],
      features: [
        "Presets.",
        "Landscape/Portrait.",
        "Zoom.",
        "Localhost support."
      ],
      faq: [
        { question: "Blank page?", answer: "Some sites block iframes." },
        { question: "Localhost?", answer: "Yes." }
      ]
    },
    locales: {
      en: {
        title: "Responsive Layout Tester",
        description: "Test your website on different screen sizes.",
        content: {
          overview: "Ensure your website looks perfect on every device.",
          howTo: ["URL.", "Device.", "Orient.", "Zoom."],
          features: ["Presets.", "Landscape.", "Zoom.", "Localhost."],
          faq: [{ question: "Localhost?", answer: "Yes." }]
        }
      },
      es: {
        title: "Tester de Diseño Responsivo",
        description: "Prueba tu sitio web en diferentes tamaños de pantalla.",
        content: {
          overview: "Asegúrate de que tu sitio se vea perfecto en todos los dispositivos.",
          howTo: ["URL.", "Dispositivo.", "Orientación.", "Zoom."],
          features: ["Preajustes.", "Paisaje.", "Zoom.", "Localhost."],
          faq: [{ question: "¿Localhost?", answer: "Sí." }]
        }
      },
      ru: {
        title: "Тест адаптивности",
        description: "Проверьте ваш сайт на разных экранах (телефон, планшет).",
        content: {
          overview: "Убедитесь, что сайт выглядит идеально на любом устройстве.",
          howTo: ["URL.", "Устройство.", "Поворот.", "Зум."],
          features: ["Предустановки.", "Альбомная.", "Зум.", "Localhost."],
          faq: [{ question: "Localhost?", answer: "Да." }]
        }
      }
    },
    nextSteps: [
      { slug: "open-graph-preview", label: "Check Social Preview" }
    ]
  }
};

export const toolsList = Object.values(toolsRegistry);