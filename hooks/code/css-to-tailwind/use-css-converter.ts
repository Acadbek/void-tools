import { useState, useEffect, useCallback } from "react";
import { convertCssToTailwind } from "@/app/actions/convert-css";

export function useCssConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "converting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [unsupportedProps, setUnsupportedProps] = useState<string[]>([]);

  // --- 1. TAILWIND MAPPING ---
  // Qaysi tailwind klassi qaysi CSS propertyni "yopishini" aniqlaymiz
  const getCoveredProps = (tailwindClass: string): string[] => {
    const cls = tailwindClass.trim();

    // Typography
    if (cls.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/) || cls.match(/^font-\[\d+\]$/)) return ['font-weight'];
    if (cls.match(/^italic|not-italic$/)) return ['font-style'];
    if (cls.match(/^text-(left|center|right|justify|start|end)$/)) return ['text-align'];

    // Color (text-red-500, text-[#fff], text-[rgb(...)])
    if (cls.match(/^text-\[?(#|rgb|hsl|[a-z]+-\d+)/) && !cls.includes('text-[length:')) return ['color'];

    // Font Size
    if (cls.match(/^text-(xs|sm|base|lg|xl|\d+xl)$/) || cls.match(/^text-\[.+\]$/)) return ['font-size'];

    if (cls.match(/^font-(sans|serif|mono)$/) || cls.match(/^font-\['.*'\]$/)) return ['font-family'];
    if (cls.match(/^leading-/)) return ['line-height'];
    if (cls.match(/^tracking-/)) return ['letter-spacing'];
    if (cls.match(/^align-/)) return ['vertical-align'];
    if (cls.match(/^decoration-/)) return ['text-decoration-color', 'text-decoration-thickness'];
    if (cls.match(/^underline|overline|line-through|no-underline$/)) return ['text-decoration', 'text-decoration-line'];
    if (cls.match(/^uppercase|lowercase|capitalize|normal-case$/)) return ['text-transform'];

    // Spacing & Layout
    if (cls.match(/^p[xytrbl]?-\[?(\d+|auto|px)/)) return ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'];
    if (cls.match(/^m[xytrbl]?-\[?(\d+|auto|px|-)/)) return ['margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
    if (cls.match(/^(w|min-w|max-w)-/)) return ['width', 'min-width', 'max-width'];
    if (cls.match(/^(h|min-h|max-h)-/)) return ['height', 'min-height', 'max-height'];

    // Flex & Grid
    // O'ZGARISH: flex($|-) qildik, shunchaki "flex" klassi display:flex ni yopishi uchun
    if (cls.match(/^flex($|-)/)) return ['display', 'flex-direction', 'flex-wrap'];
    if (cls.match(/^grid($|-)/)) return ['display', 'grid-template-columns', 'gap'];
    if (cls.match(/^gap-/)) return ['gap'];
    if (cls.match(/^order-/)) return ['order'];
    if (cls.match(/^justify-/)) return ['justify-content', 'justify-items'];
    if (cls.match(/^items-/)) return ['align-items'];
    if (cls.match(/^self-/)) return ['align-self'];
    if (cls.match(/^content-/)) return ['align-content'];
    if (cls.match(/^(top|right|bottom|left|inset)-/)) return ['top', 'right', 'bottom', 'left'];
    if (cls.match(/^z-/)) return ['z-index'];
    if (cls.match(/^absolute|relative|fixed|sticky|static$/)) return ['position'];
    if (cls.match(/^block|inline|hidden|table/)) return ['display'];

    // Visuals
    if (cls.match(/^bg-/)) return ['background', 'background-color', 'background-image'];

    // O'ZGARISH: rounded- o'rniga rounded($|-) ishlatildi. 
    // Bu "rounded" (4px) va "rounded-md" ikkalasini ham qamrab oladi.
    if (cls.match(/^rounded($|-)/)) return ['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'];

    // Border
    if (cls.match(/^border($|-)/)) return ['border', 'border-width', 'border-color', 'border-style'];
    if (cls.match(/^shadow-/)) return ['box-shadow'];
    if (cls.match(/^opacity-/)) return ['opacity'];
    if (cls.match(/^mix-blend-/)) return ['mix-blend-mode'];
    if (cls.match(/^blur-/)) return ['filter'];
    if (cls.match(/^cursor-/)) return ['cursor'];

    return [];
  };

  // --- 2. SOLISHTIRISH LOGIKASI ---
  const checkUnsupported = (cssInput: string, tailwindOutput: string) => {
    const coveredProps = new Set<string>();
    const missingLines: string[] = [];

    // A. Outputdan nimalar convert qilinganini bilib olamiz
    const outputClasses = tailwindOutput.split(/\s+/).filter(c => c.length > 0);
    outputClasses.forEach(cls => {
      const props = getCoveredProps(cls);
      props.forEach(p => coveredProps.add(p));
    });

    // B. Inputni qator-ma-qator tekshiramiz
    const lines = cssInput.split('\n');
    lines.forEach(line => {
      const cleanLine = line.split('/*')[0].trim(); // Commentlarni olib tashlash
      if (!cleanLine) return;

      // "property: value;" ni ajratib olamiz
      const match = cleanLine.match(/^([a-z-]+)\s*:/i);

      if (match && match[1]) {
        const prop = match[1].toLowerCase();

        // Ignore list (src va filter ba'zan kerak emas)
        if (!['src', 'filter'].includes(prop)) {

          // Agar Outputda bu property topilmasa -> demak Unsupported
          if (!coveredProps.has(prop)) {
            missingLines.push(cleanLine);
          }
        }
      }
    });

    setUnsupportedProps(missingLines);
  };

  // --- 3. TOZALASH FUNKSIYASI ---
  const cleanUpOutput = (rawCss: string) => {
    let clean = rawCss;

    // @apply ni olib tashlash
    clean = clean.replace(/@apply\s+/g, "");

    // Wrapper {} larni olib tashlash
    clean = clean.replace(/^[^{]+\{\s*/, "").replace(/\s*\}$/, "");

    // Class bo'lmagan qatorlarni (masalan: "display: flex;") o'chirish
    const segments = clean.split(';');
    const validClasses: string[] = [];

    segments.forEach(segment => {
      const trimmed = segment.trim();
      if (!trimmed) return;

      let isCssProperty = false;
      let bracketDepth = 0;

      // Tekshiramiz: bu CSS rulemi yoki Tailwind class?
      for (let i = 0; i < trimmed.length; i++) {
        if (trimmed[i] === '[') bracketDepth++;
        else if (trimmed[i] === ']') bracketDepth--;
        else if (trimmed[i] === ':' && bracketDepth === 0) {
          isCssProperty = true;
          break;
        }
      }

      // Agar CSS property bo'lmasa, demak bu Class
      if (!isCssProperty) {
        // O'ZGARISH: Keraksiz (Garbage) klasslarni shu yerda filtrlaymiz
        // Agar ular shu yerda o'chib ketsa, checkUnsupported funksiyasi ularni topa olmaydi
        // va "Convert qilinmadi" deb xabar beradi. Bu siz istagan natija.

        // Opacity 100% (default)
        if (trimmed === 'opacity-100') return;

        // Letter spacing 0 (default)
        if (
          trimmed === 'tracking-normal' ||
          trimmed === 'tracking-[0]' ||
          trimmed === 'tracking-[0px]' ||
          trimmed === 'tracking-[0%]'
        ) return;

        validClasses.push(trimmed);
      }
    });

    return validClasses.join(" ").replace(/\s+/g, " ").trim();
  };

  const fixFigmaCss = (css: string) => {
    return css
      .split("\n")
      .map(line => {
        let trimmed = line.trim();
        if (!trimmed) return line;

        // Figma garbage cleaning...
        // O'ZGARISH: Bu yerdan opacity va letter-spacingni ataylab O'CHIRMAYMIZ.
        // Ular convert bo'lishga harakat qilsin, keyin cleanUpOutput ularni tozalaydi.
        if (
          trimmed.match(/^font-style:\s*normal/i) ||
          trimmed.match(/^font-weight:\s*400/i) ||
          trimmed.match(/^position:\s*static/i) ||
          trimmed.match(/^border:\s*none/i) ||
          trimmed.match(/^box-sizing:\s*border-box/i) ||
          trimmed.match(/^background:\s*transparent/i)
        ) {
          return "";
        }

        // Pixellarni to'g'irlash
        const match = trimmed.match(/^([a-z-]+):\s*([0-9.]+)(\s*;)?$/i);
        if (match) {
          const prop = match[1].toLowerCase();
          const val = parseFloat(match[2]);
          const UNITLESS = ["opacity", "z-index", "flex-grow", "flex-shrink", "order", "line-height", "font-weight"];

          if (!UNITLESS.includes(prop) && val !== 0) {
            return `  ${prop}: ${val}px;`;
          }
        }
        return line;
      })
      .filter(line => line.trim() !== "")
      .join("\n");
  };

  const performConversion = useCallback(async (rawCode: string) => {
    setStatus("converting");
    setError(null);
    setUnsupportedProps([]);

    let codeToProcess = rawCode;
    // Agar faqat deklaratsiyalar bo'lsa (selector yo'q bo'lsa), wrapper qo'shamiz
    if (!rawCode.trim().includes("{")) {
      codeToProcess = `.temp-wrapper {\n${rawCode}\n}`;
    }

    try {
      // 1. Inputni tozalash
      const fixedCss = fixFigmaCss(codeToProcess);

      // Solishtirish uchun toza CSS contentini olamiz
      const cssContent = fixedCss.replace(`.temp-wrapper {`, "").replace("}", "").trim();

      if (!cssContent) {
        setOutput("");
        setStatus("done");
        return;
      }

      // 2. Server Action orqali convert qilish
      const result = await convertCssToTailwind(fixedCss);

      if (result.success) {
        // 3. Outputni tozalash (@apply va css rule lardan, hamda garbage klasslardan)
        const cleanedOutput = cleanUpOutput(result.data);
        setOutput(cleanedOutput);

        // 4. Input va Toza Outputni solishtirish (Unsupportedlarni topish)
        checkUnsupported(cssContent, cleanedOutput);

        setStatus("done");
      } else {
        setError("Syntax Error");
        setStatus("error");
      }
    } catch (err) {
      setError("Server Error");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setStatus("idle");
      setUnsupportedProps([]);
      return;
    }

    setStatus("typing");
    const timeoutId = setTimeout(() => performConversion(input), 0);
    return () => clearTimeout(timeoutId);
  }, [input, performConversion]);

  const reset = () => {
    setInput("");
    setOutput("");
    setStatus("idle");
    setError(null);
    setUnsupportedProps([]);
  };

  return { input, setInput, output, status, error, reset, unsupportedProps };
}