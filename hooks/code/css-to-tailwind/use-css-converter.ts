import { useState, useEffect, useCallback } from "react";
import { convertCssToTailwind } from "@/app/actions/convert-css";

const UNITLESS_PROPS = new Set([
  "opacity", "z-index", "flex", "flex-grow", "flex-shrink", "order",
  "font-weight", "line-height", "grid-row", "grid-column", "aspect-ratio", "stroke-width"
]);

export function useCssConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "converting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // --- FIGMA FIXER ---
  const fixFigmaCss = (css: string) => {
    return css
      .split("\n")
      .map(line => {
        let trimmed = line.trim();
        if (!trimmed) return line;

        // Garbage removal
        if (
          trimmed.match(/^font-style:\s*normal/i) ||
          trimmed.match(/^font-weight:\s*400/i) ||
          trimmed.match(/^position:\s*static/i) ||
          trimmed.match(/^border:\s*none/i) ||
          trimmed.match(/^box-sizing:\s*border-box/i) ||
          trimmed.match(/^letter-spacing:\s*0(%|px)?/i) ||
          trimmed.match(/^text-decoration:\s*none/i) ||
          trimmed.match(/^background:\s*transparent/i) ||
          trimmed.match(/^align-self:\s*auto/i) ||
          trimmed.match(/^flex-grow:\s*0/i)
        ) {
          return "";
        }

        if (trimmed.startsWith("angle:")) {
          const val = parseFloat(trimmed.split(":")[1]);
          if (val === 0) return "";
          return `transform: rotate(${val}deg);`;
        }

        const match = trimmed.match(/^([a-z-]+):\s*([0-9.]+)(\s*;)?$/i);
        if (match) {
          const prop = match[1].toLowerCase();
          const val = parseFloat(match[2]);

          if (!UNITLESS_PROPS.has(prop) && val !== 0) {
            if (prop === "line-height" && val < 5) return line;
            return `  ${prop}: ${val}px;`;
          }
        }
        return line;
      })
      .filter(line => line.trim() !== "")
      .join("\n");
  };

  const cleanUpOutput = (rawCss: string) => {
    let clean = rawCss;
    if (clean.includes("@apply")) {
      const match = clean.match(/@apply\s+(.*?);/);
      if (match && match[1]) clean = match[1].trim();
    }
    else if (clean.includes("{")) {
      clean = clean.replace(/^[^{]+\{\s*/, "").replace(/\s*\}$/, "");
    }

    return clean
      .replace(/\\/g, "")
      .replace(/\bfont-normal\b/g, "")
      .replace(/\bnot-italic\b/g, "")
      .replace(/\btracking-normal\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const performConversion = useCallback(async (rawCode: string) => {
    setStatus("converting");
    setError(null);

    let codeToProcess = rawCode;
    const isRawDeclarations = !rawCode.trim().includes("{");

    if (isRawDeclarations) {
      codeToProcess = `.temp-wrapper {\n${rawCode}\n}`;
    }

    try {
      const fixedCss = fixFigmaCss(codeToProcess);

      if (!fixedCss.replace(`.temp-wrapper {`, "").replace("}", "").trim()) {
        setOutput("");
        setStatus("done");
        return;
      }

      const result = await convertCssToTailwind(fixedCss);

      if (result.success) {
        setOutput(cleanUpOutput(result.data));
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
  };

  return { input, setInput, output, status, error, reset };
}