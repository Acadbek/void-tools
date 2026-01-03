"use client";

import { useState, useEffect } from "react";
import {
  FileJson,
  FileCode,
  Copy,
  Check,
  Trash2,
  Braces,
  ArrowRightLeft
} from "lucide-react";

export default function JsonToTypescript() {
  const [jsonInput, setJsonInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [rootName, setRootName] = useState("RootObject");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const generateTypes = (json: string, rootNameVal: string) => {
    if (!json.trim()) {
      setTsOutput("");
      setError(null);
      return;
    }

    try {
      const obj = JSON.parse(json);
      let interfaces: string[] = [];

      const parseObject = (obj: any, name: string) => {
        let result = `export interface ${name} {\n`;

        Object.keys(obj).forEach(key => {
          const value = obj[key];
          let tsType = "any";

          if (value === null) {
            tsType = "null";
          } else if (Array.isArray(value)) {
            if (value.length > 0) {
              const firstItem = value[0];
              if (typeof firstItem === "object" && firstItem !== null) {
                const childName = key.charAt(0).toUpperCase() + key.slice(1);
                parseObject(firstItem, childName);
                tsType = `${childName}[]`;
              } else {
                tsType = `${typeof firstItem}[]`;
              }
            } else {
              tsType = "any[]";
            }
          } else if (typeof value === "object") {
            const childName = key.charAt(0).toUpperCase() + key.slice(1);
            parseObject(value, childName);
            tsType = childName;
          } else {
            tsType = typeof value;
          }

          result += `  ${key}: ${tsType};\n`;
        });

        result += "}\n\n";
        interfaces.push(result);
      };

      if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object') {
        parseObject(obj[0], rootNameVal);
      } else {
        parseObject(obj, rootNameVal);
      }

      setTsOutput(interfaces.reverse().join(""));
      setError(null);
    } catch (err) {
      setError("Invalid JSON");
      setTsOutput("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateTypes(jsonInput, rootName);
    }, 300);
    return () => clearTimeout(timer);
  }, [jsonInput, rootName]);

  const handleCopy = async () => {
    if (!tsOutput) return;
    await navigator.clipboard.writeText(tsOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Braces className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Interface Name:</span>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="px-2 py-1 text-sm border rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setJsonInput("")}
            className="text-xs text-red-600 hover:bg-red-50 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 font-medium border border-transparent hover:border-red-100"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <FileJson className="w-4 h-4" /> JSON Input
            </span>
            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste JSON here... {"name": "User"}'
            className={`flex-1 w-full p-4 outline-none font-mono text-sm resize-none ${error ? "bg-red-50/30" : "bg-white"
              }`}
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-sm">
          <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#404040] flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" /> TypeScript
            </span>
            <button
              onClick={handleCopy}
              disabled={!tsOutput}
              className="text-xs text-gray-300 hover:text-white hover:bg-[#404040] px-2 py-1 rounded transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={tsOutput}
            placeholder="// Result will appear here"
            className="flex-1 w-full p-4 outline-none font-mono text-sm resize-none bg-[#1e1e1e] text-blue-100"
          />
        </div>
      </div>
      <div className="md:hidden text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <ArrowRightLeft className="w-3 h-3" /> Scroll down for result
      </div>
    </div>
  );
}