import { ToolConfig } from "@/types";

// Registry of all available tools with metadata, content, and i18n support
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
        { question: "Does this tool save my data?", answer: "No, all data is saved locally in your browser's LocalStorage. We do not track or store your SEO data on our servers." },
        { question: "Can I use the generated code in WordPress?", answer: "Yes! While we offer specific Next.js snippets, you can switch to 'HTML' mode to get standard meta tags that work on WordPress, Wix, or any other website." },
        { question: "What is the best image size for Open Graph?", answer: "The recommended size for Open Graph images (Facebook, LinkedIn) is 1200x630 pixels. Our OG Image Studio creates images in this exact ratio." }
      ]
    },
    locales: {
      en: {
        title: "SEO Suite & OG Builder",
        description: "Generate SEO Meta tags, Open Graph images, JSON-LD Schema, and Web Manifests.",
        content: {
          overview: "Stop guessing how your link looks on Social Media. This SEO Suite allows you to generate every essential SEO file for your website.",
          howTo: ["Select a module.", "Fill in details.", "Design OG Image.", "Copy code."],
          features: ["Live Previews.", "Visual Designer.", "Schema Generator.", "PWA Support."],
          faq: [
            { question: "Is this SEO tool free?", answer: "Yes, it is 100% free to use for unlimited projects." },
            { question: "How do I add the code to Next.js?", answer: "Copy the 'Next.js' output and paste it into your `layout.tsx` or `page.tsx` metadata object." },
            { question: "Does it support Twitter Cards?", answer: "Yes, it generates specific meta tags for Twitter Summary and Large Image cards." }
          ]
        }
      },
      es: {
        title: "Generador SEO y Open Graph",
        description: "Genera metaetiquetas SEO, imágenes Open Graph, esquema JSON-LD y manifiestos web.",
        content: {
          overview: "Deje de adivinar cómo se ve su enlace en las redes sociales. Genere todos los archivos SEO esenciales.",
          howTo: ["Selecciona un módulo.", "Rellena los detalles.", "Diseña tu imagen.", "Copia el código."],
          features: ["Vistas previas en vivo.", "Diseñador visual.", "Generador de esquemas.", "Soporte PWA."],
          faq: [
            { question: "¿Es gratuita esta herramienta SEO?", answer: "Sí, es completamente gratis para uso ilimitado." },
            { question: "¿Funciona para WordPress?", answer: "Sí, selecciona el modo 'HTML' para obtener etiquetas compatibles con cualquier sitio web." },
            { question: "¿Cuál es el tamaño ideal para imágenes OG?", answer: "Recomendamos 1200x630 píxeles, que es el estándar para Facebook y LinkedIn." }
          ]
        }
      },
      ru: {
        title: "SEO Генератор и OG Builder",
        description: "Генерация SEO мета-тегов, изображений Open Graph, JSON-LD схем и веб-манифестов.",
        content: {
          overview: "Перестаньте гадать, как ваша ссылка выглядит в соцсетях. Создавайте все необходимые SEO-файлы.",
          howTo: ["Выберите модуль.", "Заполните детали.", "Создайте дизайн.", "Скопируйте код."],
          features: ["Предпросмотр в реальном времени.", "Визуальный редактор.", "Генератор схем.", "PWA манифест."],
          faq: [
            { question: "Это бесплатно?", answer: "Да, все функции доступны бесплатно и без ограничений." },
            { question: "Куда вставлять код в Next.js?", answer: "Скопируйте объект metadata и вставьте его в `layout.tsx` или `page.tsx`." },
            { question: "Поддерживаются ли Twitter Cards?", answer: "Да, инструмент создает специальные теги для Twitter Large Image." }
          ]
        }
      }
    },
    nextSteps: [
      { slug: "open-graph-preview", label: "Test your live links" },
      { slug: "json-formatter", label: "Validate your JSON-LD" }
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
        { question: "Does it convert Media Queries?", answer: "Yes, standard media queries are converted to Tailwind prefixes like `md:`, `lg:`, etc." },
        { question: "Can I convert SCSS or SASS?", answer: "Currently, it works best with standard CSS. For SASS nesting, compile it to CSS first." },
        { question: "Is the conversion 100% accurate?", answer: "It covers about 95% of CSS properties. Complex animations or very specific selectors might need manual adjustment." }
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
          faq: [
            { question: "How do I use arbitrary values?", answer: "If a CSS value doesn't match the Tailwind config, the tool generates arbitrary values like `w-[350px]`." },
            { question: "Is it free to use?", answer: "Yes, this converter is completely free for developers." },
            { question: "Does it work with Grid and Flexbox?", answer: "Absolutely. It accurately converts `display: flex`, `grid-template-columns`, and other layout properties." }
          ]
        }
      },
      es: {
        title: "CSS a Tailwind",
        description: "Transforma código CSS estándar a clases de Tailwind.",
        content: {
          overview: "Migra a Tailwind CSS. Convierte CSS antiguo automáticamente.",
          howTo: ["Pega CSS.", "Ver.", "Copiar."],
          features: ["Mapeo.", "Queries.", "Props.", "Instantáneo."],
          faq: [
            { question: "¿Convierte Media Queries?", answer: "Sí, las convierte en prefijos como `md:`, `lg:`." },
            { question: "¿Soporta valores arbitrarios?", answer: "Sí, genera clases como `top-[13px]` si no hay una clase estándar." },
            { question: "¿Funciona con Flexbox?", answer: "Sí, convierte perfectamente propiedades de Flex y Grid." }
          ]
        }
      },
      ru: {
        title: "Конвертер CSS в Tailwind",
        description: "Преобразуйте обычный CSS в классы Tailwind.",
        content: {
          overview: "Переходите на Tailwind. Автоматическая конвертация старого CSS.",
          howTo: ["Вставьте CSS.", "Смотрите.", "Копируйте."],
          features: ["Маппинг.", "Запросы.", "Свойства.", "Мгновенно."],
          faq: [
            { question: "Поддерживаются ли медиа-запросы?", answer: "Да, они преобразуются в префиксы `sm:`, `md:` и т.д." },
            { question: "Как насчет нестандартных размеров?", answer: "Инструмент создаст произвольные значения, например `h-[50px]`." },
            { question: "Это точно работает?", answer: "Да, инструмент покрывает большинство CSS свойств, включая Flexbox и Grid." }
          ]
        }
      }
    },
    nextSteps: [
      { slug: "css-minifier", label: "Minify CSS" }
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
        { question: "Why is my OG Image not showing?", answer: "Check if the `og:image` URL is absolute (starts with https://) and accessible publicly. Also, ensure the image size is around 1200x630." },
        { question: "Does this tool cache my data?", answer: "No, we fetch the live data from your URL every time you click 'Check'." },
        { question: "Which platforms are supported?", answer: "We currently simulate previews for Facebook, Twitter (X), LinkedIn, and Telegram." }
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
          faq: [
            { question: "How to fix missing description?", answer: "Ensure you have `<meta name='description' ...>` and `<meta property='og:description' ...>` tags." },
            { question: "Is this tool free?", answer: "Yes, completely free link debugger." },
            { question: "Does it work with localhost?", answer: "No, your URL must be publicly accessible on the internet for our crawler to reach it." }
          ]
        }
      },
      es: {
        title: "Vista Previa de Redes Sociales",
        description: "Obtenga una vista previa de cómo aparecen sus enlaces en Facebook, Twitter y LinkedIn.",
        content: {
          overview: "No compartas enlaces rotos. Comprueba cómo se ven tus metaetiquetas antes de publicar.",
          howTo: ["Pega la URL.", "Haz clic en Verificar.", "Ver resultados.", "Corregir etiquetas."],
          features: ["Multi-plataforma.", "Depurar SEO.", "Verificación instantánea.", "Datos en vivo."],
          faq: [
            { question: "¿Por qué no se ve la imagen?", answer: "Asegúrate de que la URL de `og:image` sea absoluta y pública." },
            { question: "¿Funciona con localhost?", answer: "No, la URL debe ser pública en internet." },
            { question: "¿Qué plataformas soporta?", answer: "Facebook, Twitter, LinkedIn y Telegram." }
          ]
        }
      },
      ru: {
        title: "Предпросмотр соцсетей",
        description: "Посмотрите, как ваши ссылки выглядят в Facebook, Twitter, LinkedIn и Telegram.",
        content: {
          overview: "Не делитесь битыми ссылками. Проверьте мета-теги вашего сайта перед публикацией.",
          howTo: ["Вставьте URL.", "Нажмите Проверить.", "Смотрите результат.", "Исправьте теги."],
          features: ["Мультиплатформенность.", "Отладка SEO.", "Мгновенно.", "Живые данные."],
          faq: [
            { question: "Почему картинка не грузится?", answer: "Проверьте, что ссылка в `og:image` полная (https://) и доступна публично." },
            { question: "Работает ли с локальным сервером?", answer: "Нет, сайт должен быть доступен в интернете." },
            { question: "Какие сети поддерживаются?", answer: "Мы показываем превью для Facebook, Twitter, LinkedIn и Telegram." }
          ]
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
        { question: "Is it safe to upload my photos?", answer: "Absolutely. We do not upload your photos to any server. All conversion happens locally in your browser." },
        { question: "Can I convert WEBP to JPG?", answer: "Yes, this tool fully supports converting WEBP files to standard JPG or PNG formats." },
        { question: "Is there a file size limit?", answer: "There is no hard limit, but performance depends on your device's memory since it runs in the browser." }
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
          faq: [
            { question: "Is this tool free?", answer: "Yes, unlimited conversions for free." },
            { question: "Does it convert transparent PNGs?", answer: "Yes, but if you convert PNG to JPG, the transparency will become white." },
            { question: "Do you store my images?", answer: "No, images never leave your device." }
          ]
        }
      },
      es: {
        title: "Convertidor de Imágenes",
        description: "Convierte imágenes entre formatos JPG, PNG y WEBP en línea. Procesamiento por lotes.",
        content: {
          overview: "Convierte tus imágenes sin esfuerzo entre formatos populares como JPG, PNG y WEBP.",
          howTo: ["Sube imágenes.", "Elige formato.", "Convierte.", "Descarga."],
          features: ["Conversión por lotes.", "Privacidad.", "Sin pérdida de calidad.", "Rápido."],
          faq: [
            { question: "¿Es seguro subir mis fotos?", answer: "Sí, el procesamiento es local en tu navegador. Nada se sube a la nube." },
            { question: "¿Puedo convertir WEBP a JPG?", answer: "Sí, soportamos conversión total de WEBP." },
            { question: "¿Tiene costo?", answer: "No, es 100% gratis." }
          ]
        }
      },
      ru: {
        title: "Конвертер изображений",
        description: "Конвертируйте изображения между форматами JPG, PNG, WEBP онлайн.",
        content: {
          overview: "Легко конвертируйте изображения в популярные форматы JPG, PNG и WEBP.",
          howTo: ["Загрузите фото.", "Выберите формат.", "Конвертируйте.", "Скачайте."],
          features: ["Пакетная конвертация.", "Приватность.", "Без потери качества.", "Быстро."],
          faq: [
            { question: "Безопасно ли это?", answer: "Абсолютно. Ваши фото не покидают ваш браузер." },
            { question: "Можно ли конвертировать WEBP?", answer: "Да, мы поддерживаем конвертацию из WEBP в JPG и PNG." },
            { question: "Есть ли лимиты?", answer: "Нет, конвертируйте сколько угодно файлов." }
          ]
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
        { question: "Will my image look pixelated?", answer: "No, we use smart lossy compression algorithms that reduce file size while keeping the image looking great to the human eye." },
        { question: "Which formats can I compress?", answer: "You can compress JPG, PNG, and WEBP files." },
        { question: "Why compress images?", answer: "Compressed images load faster on websites, improving SEO and user experience." }
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
          faq: [
            { question: "Is it secure?", answer: "Yes, compression happens in your browser." },
            { question: "How much space can I save?", answer: "Typically between 50% to 80% depending on the image." },
            { question: "Can I compress multiple files?", answer: "Yes, batch compression is supported." }
          ]
        }
      },
      es: {
        title: "Compresor de Imágenes",
        description: "Comprime imágenes JPG, PNG y WEBP. Reduce el tamaño del archivo hasta un 80%.",
        content: {
          overview: "Optimiza el rendimiento de tu web comprimiendo imágenes sin perder calidad.",
          howTo: ["Sube imágenes.", "Ajusta nivel.", "Comprime.", "Descarga."],
          features: ["Reducción del 80%.", "Alta calidad.", "Soporte por lotes.", "Vista previa."],
          faq: [
            { question: "¿Se verán borrosas las fotos?", answer: "No, mantenemos la calidad visual alta." },
            { question: "¿Qué formatos soporta?", answer: "JPG, PNG y WEBP." },
            { question: "¿Es gratis?", answer: "Sí, totalmente gratis." }
          ]
        }
      },
      ru: {
        title: "Сжатие изображений",
        description: "Сжимайте изображения JPG, PNG и WEBP. Уменьшите размер файла до 80%.",
        content: {
          overview: "Оптимизируйте сайт, сжимая изображения без потери качества.",
          howTo: ["Загрузите фото.", "Настройте уровень.", "Сжимиайте.", "Скачайте."],
          features: ["Сжатие до 80%.", "Высокое качество.", "Пакетная обработка.", "Предпросмотр."],
          faq: [
            { question: "Ухудшится ли качество?", answer: "Визуально разницы практически нет, но размер файла станет меньше." },
            { question: "Где обрабатываются файлы?", answer: "Прямо в вашем браузере, без загрузки на сервер." },
            { question: "Можно ли сжать сразу много фото?", answer: "Да, поддерживается пакетная загрузка." }
          ]
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
        { question: "Does resizing reduce quality?", answer: "Scaling down (making smaller) usually keeps quality high. Scaling up (making larger) may cause pixelation." },
        { question: "Can I resize multiple images at once?", answer: "Currently, we focus on single image precision resizing, but batch features are coming." },
        { question: "Is it safe?", answer: "Yes, your photos never leave your device." }
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
          faq: [
            { question: "Can I enlarge images?", answer: "Yes, but quality might decrease." },
            { question: "How to keep aspect ratio?", answer: "Ensure the 'Lock Aspect Ratio' toggle is on." },
            { question: "Is it free?", answer: "Yes, 100% free." }
          ]
        }
      },
      es: {
        title: "Redimensionar Imágenes",
        description: "Cambia el tamaño de las imágenes a píxeles o porcentajes específicos.",
        content: {
          overview: "Cambia rápidamente el tamaño de tus imágenes para redes sociales o webs.",
          howTo: ["Sube.", "Pon dimensiones.", "Redimensiona.", "Descarga."],
          features: ["Píxel perfecto.", "Bloqueo de proporción.", "Rápido.", "Seguro."],
          faq: [
            { question: "¿Puedo agrandar imágenes?", answer: "Sí, pero pueden pixelarse un poco." },
            { question: "¿Mantiene la proporción?", answer: "Sí, si activas la opción de bloqueo." },
            { question: "¿Es seguro?", answer: "Sí, todo se procesa localmente." }
          ]
        }
      },
      ru: {
        title: "Изменение размера фото",
        description: "Изменяйте размер изображений до точных пикселей или процентов.",
        content: {
          overview: "Быстро изменяйте размер изображений для соцсетей или веб-сайтов.",
          howTo: ["Загрузите.", "Укажите размер.", "Измените.", "Скачайте."],
          features: ["Точность пикселей.", "Сохранение пропорций.", "Быстро.", "Безопасно."],
          faq: [
            { question: "Можно ли увеличить фото?", answer: "Да, но качество может немного снизиться." },
            { question: "Сохраняются ли пропорции?", answer: "Да, используйте функцию блокировки пропорций." },
            { question: "Это бесплатно?", answer: "Да, полностью бесплатно." }
          ]
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
        { question: "Is it legal to download thumbnails?", answer: "Yes, downloading thumbnails for personal use, reference, or fair use is generally legal." },
        { question: "Why is 4K option disabled?", answer: "Not all videos have a 4K thumbnail. If the creator didn't upload a high-res image, we can only provide the HD version." },
        { question: "Does it work with Shorts?", answer: "Yes, it supports YouTube Shorts URLs as well." }
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
          faq: [
            { question: "Is this free?", answer: "Yes, unlimited downloads." },
            { question: "Why no 4K?", answer: "The video owner may not have uploaded a 4K image." },
            { question: "Do I need to sign up?", answer: "No account required." }
          ]
        }
      },
      es: {
        title: "Descargar Miniaturas YouTube",
        description: "Descarga miniaturas de videos de YouTube en calidad 4K, HD y SD.",
        content: {
          overview: "Obtén la miniatura de cualquier video de YouTube en máxima resolución.",
          howTo: ["Copia URL.", "Pega.", "Elige calidad.", "Descarga."],
          features: ["Soporte 4K.", "Cualquier video.", "Rápido.", "Gratis."],
          faq: [
            { question: "¿Es legal?", answer: "Sí, para uso personal o de referencia." },
            { question: "¿Por qué no hay 4K?", answer: "Quizás el video no tiene una imagen de alta resolución." },
            { question: "¿Funciona con Shorts?", answer: "Sí, también funciona con YouTube Shorts." }
          ]
        }
      },
      ru: {
        title: "Скачать превью YouTube",
        description: "Скачивайте превью видео YouTube в качестве 4K, HD и SD.",
        content: {
          overview: "Получите превью (обложку) любого видео YouTube в максимальном разрешении.",
          howTo: ["Копируйте URL.", "Вставьте.", "Выберите качество.", "Скачайте."],
          features: ["Поддержка 4K.", "Любое видео.", "Быстро.", "Бесплатно."],
          faq: [
            { question: "Это легально?", answer: "Да, для личного использования." },
            { question: "Почему нет 4K?", answer: "Возможно, автор не загрузил картинку в высоком качестве." },
            { question: "Нужна регистрация?", answer: "Нет, скачивайте без регистрации." }
          ]
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
        { question: "Is my data safe?", answer: "Yes! Unlike other tools, we do NOT upload your files to a server. Merging happens entirely in your browser." },
        { question: "Is there a file size limit?", answer: "No hard limits. Since it works offline in your browser, it depends on your computer's RAM." },
        { question: "Can I reorder files?", answer: "Yes, simply drag and drop the files to change their order before merging." }
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
          faq: [
            { question: "Are my files uploaded?", answer: "No, everything is processed locally." },
            { question: "Is it free?", answer: "Yes, 100% free with no limits." },
            { question: "Can I merge large files?", answer: "Yes, providing your device has enough memory." }
          ]
        }
      },
      es: {
        title: "Unir Archivos PDF",
        description: "Combina múltiples archivos PDF en un solo documento al instante.",
        content: {
          overview: "Combina PDFs en el orden que desees con el fusionador de PDF más fácil disponible.",
          howTo: ["Selecciona archivos.", "Reordena.", "Une.", "Guarda."],
          features: ["Seguro.", "Arrastrar y soltar.", "Rápido.", "Sin límites."],
          faq: [
            { question: "¿Mis archivos se suben?", answer: "No, el proceso es local y seguro." },
            { question: "¿Puedo reordenar?", answer: "Sí, arrastra y suelta los archivos." },
            { question: "¿Es gratis?", answer: "Sí, totalmente gratuito." }
          ]
        }
      },
      ru: {
        title: "Объединить PDF",
        description: "Объединяйте несколько PDF-файлов в один документ мгновенно.",
        content: {
          overview: "Объединяйте PDF-файлы в нужном порядке с помощью самого простого инструмента.",
          howTo: ["Выберите файлы.", "Сортируйте.", "Объедините.", "Сохраните."],
          features: ["Безопасно.", "Перетаскивание.", "Быстро.", "Без лимитов."],
          faq: [
            { question: "Мои файлы загружаются на сервер?", answer: "Нет, объединение происходит в вашем браузере." },
            { question: "Есть ли лимиты?", answer: "Нет, зависит только от памяти вашего устройства." },
            { question: "Можно менять порядок?", answer: "Да, просто перетащите файлы." }
          ]
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
        { question: "Can I edit the text afterwards?", answer: "Yes, the output is a standard Word document (.docx) that is fully editable." },
        { question: "Does it support scanned PDFs?", answer: "Yes, we use advanced technology to extract text and images from scans." },
        { question: "Is my document secure?", answer: "Yes, processing is secure and we do not store your files." }
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
          faq: [
            { question: "Is formatting preserved?", answer: "Yes, we aim to keep the original layout." },
            { question: "Is it free?", answer: "Yes." },
            { question: "Do I need Microsoft Word?", answer: "No, you can also use Google Docs." }
          ]
        }
      },
      es: {
        title: "Convertir PDF a Word",
        description: "Convierte documentos PDF a archivos Word (.docx) editables.",
        content: {
          overview: "Transforma tus PDFs en archivos Word editables conservando el diseño.",
          howTo: ["Sube PDF.", "Convierte.", "Descarga DOCX.", "Edita."],
          features: ["Tecnología OCR.", "Conserva diseño.", "Rápido.", "Móvil."],
          faq: [
            { question: "¿Puedo editar el texto?", answer: "Sí, el archivo final es totalmente editable." },
            { question: "¿Funciona con escaneos?", answer: "Sí, extrae texto e imágenes." },
            { question: "¿Es seguro?", answer: "Sí, tus archivos están seguros." }
          ]
        }
      },
      ru: {
        title: "Конвертер PDF в Word",
        description: "Конвертируйте PDF документы в редактируемые файлы Word (.docx).",
        content: {
          overview: "Превратите ваши PDF в редактируемые файлы Word с сохранением верстки.",
          howTo: ["Загрузите PDF.", "Конвертируйте.", "Скачайте DOCX.", "Редактируйте."],
          features: ["OCR Технология.", "Сохранение верстки.", "Быстро.", "Для мобильных."],
          faq: [
            { question: "Можно ли редактировать?", answer: "Да, вы получите стандартный файл Word." },
            { question: "Сохраняется ли форматирование?", answer: "Да, мы стараемся сохранить оригинальный вид." },
            { question: "Это безопасно?", answer: "Да, мы не храним ваши файлы." }
          ]
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
        { question: "Will my formatting change?", answer: "No, converting to PDF locks your formatting so it looks the same on any device." },
        { question: "Is it free?", answer: "Yes, you can convert unlimited files for free." },
        { question: "Can I convert .doc files?", answer: "Currently we support .docx files, which is the modern standard." }
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
          faq: [
            { question: "Why convert to PDF?", answer: "To ensure layout stays consistent everywhere." },
            { question: "Is it fast?", answer: "Yes, conversion takes seconds." },
            { question: "Secure?", answer: "Yes, secure processing." }
          ]
        }
      },
      es: {
        title: "Convertir Word a PDF",
        description: "Convierte documentos Word (.docx) a formato PDF al instante.",
        content: {
          overview: "Convierte tus archivos DOCX a PDF para asegurar que el formato se mantenga.",
          howTo: ["Sube Word.", "Convierte.", "Descarga PDF."],
          features: ["Diseño consistente.", "Calidad Pro.", "Seguro.", "Universal."],
          faq: [
            { question: "¿Cambiará el formato?", answer: "No, el PDF mantiene el diseño original." },
            { question: "¿Es gratis?", answer: "Sí, conversiones ilimitadas." },
            { question: "¿Por qué PDF?", answer: "Para asegurar que se vea bien en todos los dispositivos." }
          ]
        }
      },
      ru: {
        title: "Конвертер Word в PDF",
        description: "Мгновенно конвертируйте документы Word (.docx) в формат PDF.",
        content: {
          overview: "Конвертируйте DOCX в PDF, чтобы сохранить форматирование на любом устройстве.",
          howTo: ["Загрузите Word.", "Конвертируйте.", "Скачайте PDF."],
          features: ["Сохранение верстки.", "Проф. качество.", "Безопасно.", "Универсально."],
          faq: [
            { question: "Изменится ли вид документа?", answer: "Нет, PDF фиксирует форматирование." },
            { question: "Это бесплатно?", answer: "Да." },
            { question: "Поддерживается ли .docx?", answer: "Да, это основной формат." }
          ]
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
        { question: "Can I reorder images?", answer: "Yes, simply drag and drop the images to change their sequence in the PDF." },
        { question: "How many images can I add?", answer: "There is no strict limit, you can add as many as your browser memory allows." },
        { question: "Does it work with PNG?", answer: "Yes, it supports JPG, PNG, and WEBP formats." }
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
          faq: [
            { question: "Can I make a photo album?", answer: "Yes, it is perfect for combining photos." },
            { question: "Is it free?", answer: "Yes." },
            { question: "Can I change orientation?", answer: "Yes, choose between Portrait and Landscape." }
          ]
        }
      },
      es: {
        title: "Convertir JPG a PDF",
        description: "Convierte imágenes JPG, PNG y WEBP en un solo documento PDF.",
        content: {
          overview: "Combina tus fotos o documentos escaneados en un solo archivo PDF para compartir.",
          howTo: ["Elige imágenes.", "Reordena.", "Orientación.", "Descarga."],
          features: ["Múltiples imágenes.", "Orientación.", "Tamaño pequeño.", "Sin marca."],
          faq: [
            { question: "¿Puedo reordenar las fotos?", answer: "Sí, arrástralas a la posición deseada." },
            { question: "¿Soporta PNG?", answer: "Sí, JPG, PNG y WEBP." },
            { question: "¿Es gratis?", answer: "Totalmente gratis." }
          ]
        }
      },
      ru: {
        title: "Конвертер JPG в PDF",
        description: "Конвертируйте изображения JPG, PNG и WEBP в один PDF документ.",
        content: {
          overview: "Объедините фото или сканы документов в один удобный PDF файл.",
          howTo: ["Выберите фото.", "Сортируйте.", "Ориентация.", "Скачайте."],
          features: ["Несколько фото.", "Ориентация.", "Малый размер.", "Без водяных знаков."],
          faq: [
            { question: "Можно менять порядок?", answer: "Да, перетаскиванием." },
            { question: "Сколько фото можно добавить?", answer: "Сколько угодно." },
            { question: "Есть ли водяные знаки?", answer: "Нет, документ чистый." }
          ]
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
        { question: "Will text become blurry?", answer: "No, text remains vector-based and sharp. Only images inside the PDF are optimized." },
        { question: "How much space can I save?", answer: "Usually between 30% to 70%, depending on how many images are in the PDF." },
        { question: "Is it secure?", answer: "Yes, compression happens in your browser, no upload involved." }
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
          faq: [
            { question: "Does it affect quality?", answer: "Text stays sharp, images are optimized." },
            { question: "Is it free?", answer: "Yes." },
            { question: "Can I send via email?", answer: "Yes, it makes files small enough for email." }
          ]
        }
      },
      es: {
        title: "Compresor de PDF",
        description: "Reduce el tamaño de archivos PDF para compartir y subir fácilmente.",
        content: {
          overview: "Achica archivos PDF grandes para enviarlos por email más fácil.",
          howTo: ["Sube PDF.", "Elige nivel.", "Descarga."],
          features: ["Reducción tamaño.", "Texto nítido.", "Offline.", "Seguro."],
          faq: [
            { question: "¿Se verá borroso?", answer: "No, el texto se mantiene nítido." },
            { question: "¿Cuánto reduce?", answer: "Entre 30% y 70%." },
            { question: "¿Es seguro?", answer: "Sí, sin subidas al servidor." }
          ]
        }
      },
      ru: {
        title: "Сжатие PDF",
        description: "Уменьшите размер PDF файла для легкой отправки и загрузки.",
        content: {
          overview: "Сожмите большие PDF файлы для отправки по почте.",
          howTo: ["Загрузите PDF.", "Выберите уровень.", "Скачайте."],
          features: ["Уменьшение размера.", "Четкий текст.", "Офлайн.", "Безопасно."],
          faq: [
            { question: "Текст останется четким?", answer: "Да, оптимизируются только картинки." },
            { question: "Насколько уменьшится файл?", answer: "Обычно на 30-70%." },
            { question: "Это безопасно?", answer: "Да, файлы не покидают браузер." }
          ]
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
        { question: "Can I split multiple ranges?", answer: "Yes, you can select any combination of pages to create a new PDF." },
        { question: "Is the original file affected?", answer: "No, your original file remains untouched. We create a new file with selected pages." },
        { question: "Does it work with large files?", answer: "Yes, it works efficiently even with large documents." }
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
          faq: [
            { question: "Can I select specific pages?", answer: "Yes, click to select pages." },
            { question: "Is it secure?", answer: "Yes, local processing." },
            { question: "Is it free?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Dividir PDF",
        description: "Extrae páginas específicas de un archivo PDF.",
        content: {
          overview: "Extrae solo las páginas que necesitas de un documento PDF grande.",
          howTo: ["Sube PDF.", "Elige páginas.", "Divide.", "Descarga."],
          features: ["Selector visual.", "Rangos.", "Instantáneo.", "Sin subida."],
          faq: [
            { question: "¿Puedo elegir páginas sueltas?", answer: "Sí, selecciona las que quieras." },
            { question: "¿Afecta al original?", answer: "No, crea un archivo nuevo." },
            { question: "¿Es seguro?", answer: "Sí, todo ocurre en tu PC." }
          ]
        }
      },
      ru: {
        title: "Разделить PDF",
        description: "Извлеките конкретные страницы из PDF файла.",
        content: {
          overview: "Извлеките только нужные страницы из большого PDF документа.",
          howTo: ["Загрузите PDF.", "Выберите страницы.", "Разделите.", "Скачайте."],
          features: ["Выбор страниц.", "Диапазоны.", "Мгновенно.", "Без загрузки."],
          faq: [
            { question: "Можно выбрать несколько страниц?", answer: "Да, любую комбинацию." },
            { question: "Файл испортится?", answer: "Нет, создается новый файл." },
            { question: "Это бесплатно?", answer: "Да." }
          ]
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
        { question: "Can I rotate just one page?", answer: "Yes, you can rotate specific pages individually." },
        { question: "Is the change permanent?", answer: "It creates a new file with your changes; the original stays safe." },
        { question: "How to reorder pages?", answer: "Simply drag and drop the pages to the desired position." }
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
          faq: [
            { question: "Can I delete pages?", answer: "Yes, easily remove unwanted pages." },
            { question: "Is it easy?", answer: "Yes, simple drag and drop." },
            { question: "Secure?", answer: "Yes, local processing." }
          ]
        }
      },
      es: {
        title: "Organizar PDF",
        description: "Ordena, rota, elimina y reordena páginas PDF.",
        content: {
          overview: "Toma el control total de tus páginas PDF. Rota, elimina y reordena.",
          howTo: ["Sube.", "Rota/Elimina.", "Reordena.", "Guarda."],
          features: ["Rotar.", "Eliminar.", "Arrastrar.", "Vista previa."],
          faq: [
            { question: "¿Puedo rotar una sola página?", answer: "Sí." },
            { question: "¿Cómo reordeno?", answer: "Arrastra y suelta." },
            { question: "¿Es seguro?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "Организовать PDF",
        description: "Сортируйте, вращайте, удаляйте и меняйте порядок страниц PDF.",
        content: {
          overview: "Полный контроль над страницами PDF. Вращайте, удаляйте, меняйте местами.",
          howTo: ["Загрузите.", "Вращайте/Удаляйте.", "Сортируйте.", "Сохраните."],
          features: ["Вращение.", "Удаление.", "Перетаскивание.", "Предпросмотр."],
          faq: [
            { question: "Можно повернуть одну страницу?", answer: "Да." },
            { question: "Как менять порядок?", answer: "Просто перетащите." },
            { question: "Безопасно?", answer: "Да." }
          ]
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
        { question: "Does it convert all pages?", answer: "Yes, every page in the PDF is converted into an image." },
        { question: "Is the quality good?", answer: "Yes, we use high-resolution rendering for crisp images." },
        { question: "JPG or PNG?", answer: "Use JPG for photos/smaller size, PNG for text/transparency." }
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
          faq: [
            { question: "All pages converted?", answer: "Yes." },
            { question: "Best format?", answer: "PNG for text, JPG for photos." },
            { question: "Free?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Convertir PDF a Imagen",
        description: "Convierte páginas PDF en imágenes JPG o PNG de alta calidad.",
        content: {
          overview: "Convierte cada página de tu PDF en un archivo de imagen separado.",
          howTo: ["Sube PDF.", "Elige formato.", "Descarga."],
          features: ["Alta DPI.", "JPG/PNG.", "Lotes.", "Transparencia."],
          faq: [
            { question: "¿Todas las páginas?", answer: "Sí." },
            { question: "¿Calidad?", answer: "Alta resolución." },
            { question: "¿JPG o PNG?", answer: "PNG para texto, JPG para fotos." }
          ]
        }
      },
      ru: {
        title: "Конвертер PDF в Изображение",
        description: "Конвертируйте страницы PDF в качественные JPG или PNG изображения.",
        content: {
          overview: "Превратите каждую страницу PDF в отдельный файл изображения.",
          howTo: ["Загрузите PDF.", "Выберите формат.", "Скачайте."],
          features: ["Высокое DPI.", "JPG/PNG.", "Пакетно.", "Прозрачность."],
          faq: [
            { question: "Все страницы?", answer: "Да, каждая страница." },
            { question: "Какое качество?", answer: "Высокое разрешение." },
            { question: "JPG или PNG?", answer: "PNG для текста, JPG для фото." }
          ]
        }
      }
    },
    nextSteps: [
      { slug: "image-resizer", label: "Resize pages" },
      { slug: "image-compressor", label: "Compress images" }
    ]
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
        { question: "Do these codes expire?", answer: "No, our QR codes are static and work forever." },
        { question: "Can I use them for print?", answer: "Yes, you can download high-quality PNG or SVG for printing." },
        { question: "Is it free?", answer: "Yes, completely free with no limits." }
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
          faq: [
            { question: "Do they expire?", answer: "No, never." },
            { question: "Can I customize colors?", answer: "Yes, full color control." },
            { question: "Is it high quality?", answer: "Yes, print-ready." }
          ]
        }
      },
      es: {
        title: "Generador de Códigos QR",
        description: "Crea códigos QR personalizados con colores y logos.",
        content: {
          overview: "Genera códigos QR escaneables para URLs, WiFi, texto o vCards.",
          howTo: ["Elige tipo.", "Ingresa datos.", "Personaliza.", "Descarga."],
          features: ["Colores.", "Alta res.", "WiFi.", "Gratis siempre."],
          faq: [
            { question: "¿Caducan?", answer: "No, son estáticos." },
            { question: "¿Puedo cambiar colores?", answer: "Sí." },
            { question: "¿Sirve para imprimir?", answer: "Sí, alta calidad." }
          ]
        }
      },
      ru: {
        title: "Генератор QR-кодов",
        description: "Создавайте кастомные QR-коды с цветами и логотипами.",
        content: {
          overview: "Создавайте сканируемые QR-коды для ссылок, WiFi, текста или контактов.",
          howTo: ["Выберите тип.", "Введите данные.", "Настройте.", "Скачайте."],
          features: ["Цвета.", "Высокое разр.", "WiFi.", "Навсегда."],
          faq: [
            { question: "Есть срок действия?", answer: "Нет, коды вечные." },
            { question: "Можно менять цвета?", answer: "Да." },
            { question: "Подходит для печати?", answer: "Да, высокое качество." }
          ]
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
        { question: "How secure is this?", answer: "We use the browser's cryptographic API for maximum randomness." },
        { question: "Do you save passwords?", answer: "Never. Passwords are generated locally and discarded." },
        { question: "Why use a random password?", answer: "Random passwords are much harder for hackers to guess or crack." }
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
          faq: [
            { question: "Is it secure?", answer: "Yes, cryptographically strong." },
            { question: "Saved on server?", answer: "No, never." },
            { question: "Customizable?", answer: "Yes, length and chars." }
          ]
        }
      },
      es: {
        title: "Generador de Contraseñas",
        description: "Crea contraseñas seguras y aleatorias al instante.",
        content: {
          overview: "Protege tus cuentas con contraseñas indescifrables.",
          howTo: ["Longitud.", "Opciones.", "Generar.", "Copiar."],
          features: ["Cifrado fuerte.", "Personalizable.", "Rápido.", "Local."],
          faq: [
            { question: "¿Es seguro?", answer: "Sí, usamos criptografía del navegador." },
            { question: "¿Se guardan?", answer: "Nunca." },
            { question: "¿Personalizable?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "Генератор паролей",
        description: "Создавайте надежные случайные пароли мгновенно.",
        content: {
          overview: "Защитите свои аккаунты с помощью невзламываемых паролей.",
          howTo: ["Длина.", "Опции.", "Создать.", "Копировать."],
          features: ["Криптостойкость.", "Настройки.", "Быстро.", "Локально."],
          faq: [
            { question: "Это безопасно?", answer: "Да, полная случайность." },
            { question: "Пароли сохраняются?", answer: "Нет, никогда." },
            { question: "Можно настроить длину?", answer: "Да." }
          ]
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
        { question: "Is the data real?", answer: "No, it is randomly generated mock data safe for testing." },
        { question: "Can I generate 1000 rows?", answer: "Yes, large datasets are supported for performance testing." },
        { question: "What formats are supported?", answer: "You can export data in JSON, CSV, and SQL formats." }
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
          faq: [
            { question: "Real people?", answer: "No, fake data." },
            { question: "Large amounts?", answer: "Yes, thousands of rows." },
            { question: "Formats?", answer: "JSON, CSV, SQL." }
          ]
        }
      },
      es: {
        title: "Generador de Datos Falsos",
        description: "Genera datos de prueba. Usuarios, correos, direcciones.",
        content: {
          overview: "Genera miles de filas de datos falsos realistas para pruebas.",
          howTo: ["Campos.", "Formato.", "Filas.", "Descarga."],
          features: ["Tipos de datos.", "Exportar.", "Realista.", "Rápido."],
          faq: [
            { question: "¿Datos reales?", answer: "No, son ficticios." },
            { question: "¿Muchos datos?", answer: "Sí, miles de filas." },
            { question: "¿Formatos?", answer: "JSON, CSV, SQL." }
          ]
        }
      },
      ru: {
        title: "Генератор фейковых данных",
        description: "Создавайте мок-данные для тестов. Пользователи, email, адреса.",
        content: {
          overview: "Генерируйте тысячи строк реалистичных фейковых данных для тестирования.",
          howTo: ["Поля.", "Формат.", "Строки.", "Скачать."],
          features: ["Типы данных.", "Экспорт.", "Реалистично.", "Быстро."],
          faq: [
            { question: "Люди настоящие?", answer: "Нет, данные вымышлены." },
            { question: "Можно много данных?", answer: "Да, тысячи строк." },
            { question: "Форматы?", answer: "JSON, CSV, SQL." }
          ]
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
        { question: "How does it work?", answer: "It uses templates derived from top-performing viral videos to ensure high engagement." },
        { question: "Is it free?", answer: "Yes, generate unlimited titles for free." },
        { question: "Does it help SEO?", answer: "Yes, catchy titles improve CTR, which is a key ranking factor." }
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
          faq: [
            { question: "Free?", answer: "Yes." },
            { question: "How it helps?", answer: "Boosts CTR and views." },
            { question: "Unlimited?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Generador de Títulos YouTube",
        description: "Genera títulos virales y de alto CTR con plantillas IA.",
        content: {
          overview: "Crea títulos llamativos que aumenten tus visitas.",
          howTo: ["Tema.", "Generar.", "Explorar.", "Copiar."],
          features: ["Viral.", "SEO.", "Variaciones.", "CTR."],
          faq: [
            { question: "¿Gratis?", answer: "Sí." },
            { question: "¿Ayuda?", answer: "Aumenta clics y vistas." },
            { question: "¿Ilimitado?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "Генератор заголовков YouTube",
        description: "Создавайте вирусные заголовки с высоким CTR.",
        content: {
          overview: "Создавайте цепляющие заголовки, которые увеличивают просмотры.",
          howTo: ["Тема.", "Создать.", "Выбрать.", "Копировать."],
          features: ["Вирусно.", "SEO.", "Варианты.", "CTR."],
          faq: [
            { question: "Бесплатно?", answer: "Да." },
            { question: "Помогает?", answer: "Увеличивает CTR и просмотры." },
            { question: "Безлимитно?", answer: "Да." }
          ]
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
        { question: "Does it count spaces?", answer: "We provide counts for both: with spaces and without spaces." },
        { question: "Is there a text limit?", answer: "No, you can paste entire essays or articles." },
        { question: "Do you save my text?", answer: "No, text processing is instant and local. Nothing is stored." }
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
          faq: [
            { question: "Count spaces?", answer: "Yes." },
            { question: "Limit?", answer: "No limit." },
            { question: "Privacy?", answer: "Text not saved." }
          ]
        }
      },
      es: {
        title: "Contador de Palabras",
        description: "Contador de palabras, caracteres y oraciones en tiempo real.",
        content: {
          overview: "Análisis instantáneo de conteo de palabras, caracteres y tiempo de lectura.",
          howTo: ["Pega.", "Estadísticas.", "Tiempo."],
          features: ["Tiempo real.", "Lectura.", "Espacios.", "Privacidad."],
          faq: [
            { question: "¿Cuenta espacios?", answer: "Sí." },
            { question: "¿Límite?", answer: "Sin límite." },
            { question: "¿Privacidad?", answer: "No guardamos nada." }
          ]
        }
      },
      ru: {
        title: "Счетчик слов и символов",
        description: "Подсчет слов, символов и предложений в реальном времени.",
        content: {
          overview: "Мгновенный анализ количества слов, знаков и времени чтения.",
          howTo: ["Вставьте.", "Статистика.", "Время."],
          features: ["Реал-тайм.", "Чтение.", "Пробелы.", "Приватность."],
          faq: [
            { question: "Считает пробелы?", answer: "Да." },
            { question: "Есть лимит?", answer: "Нет." },
            { question: "Приватность?", answer: "Текст не сохраняется." }
          ]
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
        { question: "Does it fix errors?", answer: "It highlights syntax errors so you can easily identify and fix them." },
        { question: "Is my JSON sent to a server?", answer: "No, all validation and formatting happen locally in your browser." },
        { question: "Can I minify JSON?", answer: "Yes, use the Minify button to compress JSON for production use." }
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
          faq: [
            { question: "Secure?", answer: "Yes, local." },
            { question: "Fix errors?", answer: "Highlights them." },
            { question: "Minify?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Formateador JSON",
        description: "Embellece, valida y minifica datos JSON.",
        content: {
          overview: "Depura tus datos JSON fácilmente. Formatea y valida errores.",
          howTo: ["Pega.", "Formatea.", "Copia."],
          features: ["Errores.", "Árbol.", "Minificar.", "Rápido."],
          faq: [
            { question: "¿Seguro?", answer: "Sí, local." },
            { question: "¿Arregla errores?", answer: "Los resalta." },
            { question: "¿Minifica?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "JSON Форматер",
        description: "Форматирование, валидация и минификация JSON.",
        content: {
          overview: "Легко отлаживайте JSON. Форматируйте и находите ошибки.",
          howTo: ["Вставьте.", "Формат.", "Копия."],
          features: ["Ошибки.", "Дерево.", "Сжатие.", "Быстро."],
          faq: [
            { question: "Безопасно?", answer: "Да, локально." },
            { question: "Исправляет ошибки?", answer: "Подсвечивает их." },
            { question: "Сжимает?", answer: "Да." }
          ]
        }
      }
    },
    nextSteps: [
      { slug: "json-to-typescript", label: "Convert to TS Types" }
    ]
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
        { question: "Can I revert it?", answer: "It is hard to read minified code. You should keep a copy of your original CSS." },
        { question: "How much space does it save?", answer: "Typically 15-20% of the file size, which improves load speed." },
        { question: "Is it safe for production?", answer: "Yes, minification only removes unnecessary characters, it doesn't change functionality." }
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
          faq: [
            { question: "Revert?", answer: "Hard, keep backup." },
            { question: "Savings?", answer: "15-20%." },
            { question: "Safe?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Minificador CSS",
        description: "Minifica código CSS para reducir tamaño.",
        content: {
          overview: "Acelera tu web minificando CSS. Elimina espacios.",
          howTo: ["Pega.", "Minifica.", "Copia."],
          features: ["Sin espacios.", "Tamaño.", "Rápido.", "SEO."],
          faq: [
            { question: "¿Revertir?", answer: "Difícil, guarda copia." },
            { question: "¿Ahorro?", answer: "15-20%." },
            { question: "¿Seguro?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "CSS Минификатор",
        description: "Сжимайте CSS код для уменьшения размера.",
        content: {
          overview: "Ускорьте сайт, сжимая CSS. Удаляет пробелы.",
          howTo: ["Вставьте.", "Сжать.", "Копия."],
          features: ["Без пробелов.", "Размер.", "Быстро.", "SEO."],
          faq: [
            { question: "Можно вернуть назад?", answer: "Сложно, храните копию." },
            { question: "Экономия?", answer: "15-20%." },
            { question: "Безопасно?", answer: "Да." }
          ]
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
        { question: "Does it handle optional fields?", answer: "By default, it creates strict interfaces based on the provided data." },
        { question: "Is it secure?", answer: "Yes, code never leaves your browser." },
        { question: "Can it handle complex nested JSON?", answer: "Yes, it recursively generates interfaces for nested objects." }
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
          faq: [
            { question: "Secure?", answer: "Yes." },
            { question: "Nested JSON?", answer: "Supported." },
            { question: "Arrays?", answer: "Supported." }
          ]
        }
      },
      es: {
        title: "JSON a TypeScript",
        description: "Convierte objetos JSON a interfaces TypeScript.",
        content: {
          overview: "Deja de escribir interfaces manualmente. Pega JSON y obtén TS.",
          howTo: ["Pega JSON.", "Ver TS.", "Copia."],
          features: ["Anidado.", "Tipos.", "Arrays.", "Tiempo real."],
          faq: [
            { question: "¿Seguro?", answer: "Sí." },
            { question: "¿JSON anidado?", answer: "Soportado." },
            { question: "¿Arrays?", answer: "Soportado." }
          ]
        }
      },
      ru: {
        title: "JSON в TypeScript",
        description: "Конвертируйте JSON объекты в TypeScript интерфейсы.",
        content: {
          overview: "Перестаньте писать интерфейсы вручную. Вставьте JSON и получите TS.",
          howTo: ["Вставьте JSON.", "Смотрите TS.", "Копия."],
          features: ["Вложенность.", "Типы.", "Массивы.", "Реал-тайм."],
          faq: [
            { question: "Безопасно?", answer: "Да." },
            { question: "Вложенный JSON?", answer: "Поддерживается." },
            { question: "Массивы?", answer: "Поддерживается." }
          ]
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
        { question: "Can I convert temperature?", answer: "Yes, we support Celsius, Fahrenheit, and Kelvin." },
        { question: "Is it free?", answer: "Yes, use it as much as you like." }
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
          faq: [
            { question: "Accurate?", answer: "Yes." },
            { question: "Temp?", answer: "Yes, C/F/K." },
            { question: "Free?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Conversor de Unidades",
        description: "Convierte entre unidades comunes: Longitud, Peso, Temp.",
        content: {
          overview: "Un conversor simple todo en uno para necesidades diarias.",
          howTo: ["Categoría.", "Valor.", "Unidades.", "Resultado."],
          features: ["Muchas unidades.", "Instantáneo.", "Limpio.", "Preciso."],
          faq: [
            { question: "¿Preciso?", answer: "Sí." },
            { question: "¿Temperatura?", answer: "Sí, C/F/K." },
            { question: "¿Gratis?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "Конвертер величин",
        description: "Конвертация единиц: Длина, Вес, Температура и др.",
        content: {
          overview: "Простой конвертер все-в-одном для ежедневных нужд.",
          howTo: ["Категория.", "Значение.", "Единицы.", "Результат."],
          features: ["Много единиц.", "Мгновенно.", "Чисто.", "Точно."],
          faq: [
            { question: "Точно?", answer: "Да." },
            { question: "Температура?", answer: "Да, C/F/K." },
            { question: "Бесплатно?", answer: "Да." }
          ]
        }
      }
    },
    nextSteps: []
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
        { question: "What is Base64?", answer: "It is a way to represent binary data as ASCII text, useful for email and data storage." },
        { question: "Is it encryption?", answer: "No, it is encoding. It is not secure for passwords." },
        { question: "Can I decode images?", answer: "Yes, you can convert Base64 strings back to image files." }
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
          faq: [
            { question: "Encryption?", answer: "No." },
            { question: "Images?", answer: "Yes." },
            { question: "Secure?", answer: "Yes." }
          ]
        }
      },
      es: {
        title: "Conversor Base64",
        description: "Codifica texto/archivos a Base64 o decodifica Base64.",
        content: {
          overview: "Codifica texto o archivos en Base64, o decodifica.",
          howTo: ["Modo.", "Entrada.", "Resultado."],
          features: ["Texto/Archivos.", "Rápido.", "Grandes cadenas.", "UTF-8."],
          faq: [
            { question: "¿Encriptación?", answer: "No." },
            { question: "¿Imágenes?", answer: "Sí." },
            { question: "¿Seguro?", answer: "Sí." }
          ]
        }
      },
      ru: {
        title: "Base64 Конвертер",
        description: "Кодируйте текст/файлы в Base64 или декодируйте обратно.",
        content: {
          overview: "Кодируйте текст или файлы в Base64, или декодируйте.",
          howTo: ["Режим.", "Ввод.", "Результат."],
          features: ["Текст/Файлы.", "Быстро.", "Большие строки.", "UTF-8."],
          faq: [
            { question: "Шифрование?", answer: "Нет." },
            { question: "Картинки?", answer: "Да." },
            { question: "Безопасно?", answer: "Да." }
          ]
        }
      }
    },
    nextSteps: []
  },
  "responsive-tester": {
    slug: "responsive-tester",
    title: "Responsive Layout Tester",
    description: "Test your website on different screen sizes (Mobile, Tablet, Desktop) simultaneously. Ideal for developers.",
    category: "code",
    componentKey: "ResponsiveTester",
    icon: "Smartphone",
    content: {
      overview: "Ensure your website looks perfect on every device. This tool simulates various screen resolutions including iPhone, iPad, Laptops, and Desktops.",
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
        { question: "Why does my site show a blank page?", answer: "Some major sites (like Google) block being shown in iframes for security (X-Frame-Options). It works best with your own projects." },
        { question: "Can I test localhost?", answer: "Yes! As long as your local server is running, you can test it here." },
        { question: "Is it accurate?", answer: "It simulates the viewport size perfectly, but does not emulate the actual device hardware." }
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
          faq: [
            { question: "Blank page?", answer: "Iframe blocked by site." },
            { question: "Localhost?", answer: "Yes." },
            { question: "Accurate?", answer: "Viewport only." }
          ]
        }
      },
      es: {
        title: "Tester de Diseño Responsivo",
        description: "Prueba tu sitio web en diferentes tamaños de pantalla.",
        content: {
          overview: "Asegúrate de que tu sitio se vea perfecto en todos los dispositivos.",
          howTo: ["URL.", "Dispositivo.", "Orientación.", "Zoom."],
          features: ["Preajustes.", "Paisaje.", "Zoom.", "Localhost."],
          faq: [
            { question: "¿Página en blanco?", answer: "Bloqueo por iframe." },
            { question: "¿Localhost?", answer: "Sí." },
            { question: "¿Preciso?", answer: "Solo viewport." }
          ]
        }
      },
      ru: {
        title: "Тест адаптивности",
        description: "Проверьте ваш сайт на разных экранах (телефон, планшет).",
        content: {
          overview: "Убедитесь, что сайт выглядит идеально на любом устройстве.",
          howTo: ["URL.", "Устройство.", "Поворот.", "Зум."],
          features: ["Предустановки.", "Альбомная.", "Зум.", "Localhost."],
          faq: [
            { question: "Белый экран?", answer: "Сайт блокирует iframe." },
            { question: "Localhost?", answer: "Да." },
            { question: "Точно?", answer: "Только размер экрана." }
          ]
        }
      }
    },
    nextSteps: [
      { slug: "open-graph-preview", label: "Check Social Preview" }
    ]
  },
  "docx-to-html": {
    slug: "docx-to-html",
    title: "DOCX to HTML Converter",
    description: "Convert Word documents (.docx) to clean HTML code. Perfect for web developers and content creators.",
    category: "converter",
    componentKey: "DocxToHtml",
    icon: "FileText",
    content: {
      overview: "Transform your Microsoft Word documents into editable HTML code. This tool preserves text formatting, tables, and lists while removing complex Word-specific XML, making the HTML clean and web-ready.",
      howTo: [
        "Upload a .docx file (Max 10MB).",
        "Click 'Convert to HTML'.",
        "Copy the generated HTML code or download the .html file."
      ],
      features: [
        "Preserves formatting (Bold, Italic, Lists).",
        "Clean HTML output (no Word junk).",
        "Supports tables and nested structures.",
        "Fast conversion for documents up to 10MB."
      ],
      faq: [
        { question: "Does it keep my Word formatting?", answer: "Yes, it preserves basic formatting like headings, bold, italics, and lists." },
        { question: "Can I edit the HTML after conversion?", answer: "Yes, the output is clean HTML, making it easy to edit in any code editor." },
        { question: "What is the file size limit?", answer: "The maximum file size is 10MB." }
      ]
    },
    locales: {
      en: {
        title: "DOCX to HTML Converter",
        description: "Convert Word documents to clean HTML code.",
        content: {
          overview: "Transform Word documents into editable HTML code.",
          howTo: ["Upload .docx", "Convert", "Download HTML"],
          features: ["Preserves formatting", "Clean HTML", "Supports tables", "5MB limit"],
          faq: [
            { question: "Keeps formatting?", answer: "Yes." },
            { question: "Edit HTML?", answer: "Yes." },
            { question: "Size limit?", answer: "5MB." }
          ]
        }
      },
      es: {
        title: "Convertidor DOCX a HTML",
        description: "Convierte documentos de Word a HTML limpio.",
        content: {
          overview: "Transforma documentos de Word en código HTML editable.",
          howTo: ["Subir .docx", "Convertir", "Descargar HTML"],
          features: ["Preserva formato", "HTML limpio", "Soporta tablas", "Límite 5MB"],
          faq: [
            { question: "¿Mantiene formato?", answer: "Sí." },
            { question: "¿Editar HTML?", answer: "Sí." },
            { question: "¿Límite tamaño?", answer: "5MB." }
          ]
        }
      },
      ru: {
        title: "Конвертер DOCX в HTML",
        description: "Преобразуйте документы Word в чистый HTML.",
        content: {
          overview: "Преобразуйте документы Word в редактируемый HTML код.",
          howTo: ["Загрузить .docx", "Конвертировать", "Скачать HTML"],
          features: ["Сохраняет форматирование", "Чистый HTML", "Поддержка таблиц", "Лимит 5MB"],
          faq: [
            { question: "Сохраняет форматирование?", answer: "Да." },
            { question: "Редактировать HTML?", answer: "Да." },
            { question: "Лимит размера?", answer: "5MB." }
          ]
        }
      }
    },
    nextSteps: [
      { slug: "html-to-docx", label: "Convert HTML to DOCX" }
    ]
  }
};

export const toolsList = Object.values(toolsRegistry);