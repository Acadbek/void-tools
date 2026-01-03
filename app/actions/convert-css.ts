"use server";

import { TailwindConverter } from "css-to-tailwindcss";

export async function convertCssToTailwind(cssInput: string) {
  if (!cssInput.trim()) return { success: false, data: "" };

  try {
    const converter = new TailwindConverter({
      remInPx: 16,
      postCSSPlugins: [],
      tailwindConfig: {
        content: [],
        theme: {
          extend: {},
        },
      },
    });

    const result = await converter.convertCSS(cssInput);

    const tailwindCss = result.convertedRoot.toString();

    return { success: true, data: tailwindCss };
  } catch (error: any) {
    console.error("CSS Conversion Error:", error);
    return { success: false, error: error.message };
  }
}