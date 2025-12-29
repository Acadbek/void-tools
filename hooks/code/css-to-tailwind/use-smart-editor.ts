import { useRef } from "react";

export function useSmartEditor(setValue: (val: string) => void) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;

    if (e.key === "Tab") {
      e.preventDefault();
      target.setRangeText("  ", target.selectionStart, target.selectionEnd, "end");
      setValue(target.value);
    }

    // Agar user baribir selector yozmoqchi bo'lsa, {} yordami qolaveradi
    if (e.key === "{") {
      e.preventDefault();
      const start = target.selectionStart;
      const end = target.selectionEnd;
      target.setRangeText("{}", start, end, "preserve");
      target.selectionStart = start + 1;
      target.selectionEnd = start + 1;
      setValue(target.value);
    }

    if (e.key === "Enter") {
      const start = target.selectionStart;
      const charBefore = target.value[start - 1];
      const charAfter = target.value[start];
      if (charBefore === "{" && charAfter === "}") {
        e.preventDefault();
        target.setRangeText("\n  \n", start, start, "end");
        target.selectionStart = start + 3;
        target.selectionEnd = start + 3;
        setValue(target.value);
      }
    }
  };

  return { textAreaRef, handleKeyDown };
}