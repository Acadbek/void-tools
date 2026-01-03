import { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";

interface Props {
	code: string;
	label: string;
}

export default function CodeViewer({ code, label }: Props) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg flex flex-col mb-10">
			<div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-[#333]">
				<span className="text-xs text-gray-400 font-mono flex items-center gap-2">
					<FileText className="w-3 h-3" /> {label}
				</span>
				<button onClick={copyToClipboard} className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase font-bold rounded transition">
					{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
					{copied ? "Copied!" : "Copy Code"}
				</button>
			</div>
			<div className="p-4 overflow-x-auto relative group">
				<pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">{code}</pre>
			</div>
		</div>
	);
}