"use client";

import { useState } from "react";
import {
	FileCode,
	ArrowRight,
	Copy,
	Trash2,
	Download,
	Check,
	Zap,
	Code2
} from "lucide-react";
import { saveAs } from "file-saver";

export default function CssMinifier() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [copied, setCopied] = useState(false);
	const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

	// Minifikatsiya logikasi (Regex based - High Performance)
	const minifyCss = () => {
		if (!input.trim()) return;

		let minified = input
			// 1. Commentlarni olib tashlash
			.replace(/\/\*[\s\S]*?\*\//g, "")
			// 2. Yangi qatorlarni va bo'shliqlarni bitta probelga almashtirish
			.replace(/\s+/g, " ")
			// 3. { } : ; , oldidagi va ketidagi bo'shliqlarni olib tashlash
			.replace(/\s*([{}:;,])\s*/g, "$1")
			// 4. Eng oxirgi ; ni olib tashlash (block ichidagi)
			.replace(/;}/g, "}")
			// 5. 0px -> 0 qilish (ixtiyoriy, lekin foydali)
			.replace(/([\s:])0(?:px|em|rem|%|in|cm|mm|pc|pt)/g, "$10")
			// 6. Ranglarni qisqartirish (masalan #ffffff -> #fff) - Murakkabligi uchun hozircha qo'shmadim
			.trim();

		setOutput(minified);

		// Statistika hisoblash
		const originalSize = new Blob([input]).size;
		const minifiedSize = new Blob([minified]).size;
		const savedPercent = originalSize > 0
			? ((originalSize - minifiedSize) / originalSize) * 100
			: 0;

		setStats({
			original: originalSize,
			minified: minifiedSize,
			saved: Math.round(savedPercent)
		});
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(output);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([output], { type: "text/css;charset=utf-8" });
		saveAs(blob, "style.min.css");
	};

	const handleClear = () => {
		setInput("");
		setOutput("");
		setStats({ original: 0, minified: 0, saved: 0 });
	};

	// Format Size
	const formatBytes = (bytes: number) => {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	return (
		<div className="flex flex-col gap-6 h-[calc(100vh-200px)] min-h-[600px]">

			{/* HEADER */}
			<div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between shadow-sm shrink-0">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
						<Code2 className="w-5 h-5" />
					</div>
					<div>
						<h3 className="font-semibold text-gray-800 text-sm">CSS Minifier</h3>
						<p className="text-xs text-gray-500">Compress CSS code safely.</p>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={handleClear}
						className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
					>
						<Trash2 className="w-4 h-4" /> Clear
					</button>
					<button
						onClick={minifyCss}
						className="bg-blue-600 text-white px-5 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md flex items-center gap-2 transition-colors"
					>
						<Zap className="w-4 h-4" /> Minify
					</button>
				</div>
			</div>

			{/* EDITOR AREA */}
			<div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">

				{/* INPUT */}
				<div className="flex flex-col gap-2 h-full">
					<label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
						<span>Input CSS</span>
						<span className="text-blue-600">{formatBytes(stats.original)}</span>
					</label>
					<textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Paste your CSS code here..."
						className="w-full h-full p-4 rounded-xl border border-gray-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
						spellCheck={false}
					/>
				</div>

				{/* OUTPUT */}
				<div className="flex flex-col gap-2 h-full">
					<label className="text-xs font-bold text-gray-500 uppercase flex justify-between items-center h-5">
						<span>Minified Output</span>
						{stats.saved > 0 && (
							<span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px]">
								-{stats.saved}% Saved ({formatBytes(stats.minified)})
							</span>
						)}
					</label>
					<div className="relative w-full h-full">
						<textarea
							value={output}
							readOnly
							placeholder="Minified result will appear here..."
							className="w-full h-full p-4 rounded-xl border border-gray-200 font-mono text-sm resize-none bg-gray-50 text-gray-600 focus:outline-none focus:border-blue-300"
						/>

						{output && (
							<div className="absolute top-2 right-2 flex gap-2">
								<button
									onClick={handleCopy}
									className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm"
									title="Copy to Clipboard"
								>
									{copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
								</button>
								<button
									onClick={handleDownload}
									className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors shadow-sm"
									title="Download .min.css"
								>
									<Download className="w-4 h-4" />
								</button>
							</div>
						)}
					</div>
				</div>

			</div>
		</div>
	);
}