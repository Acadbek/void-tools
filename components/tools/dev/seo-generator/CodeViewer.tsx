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
		<div className="bg-muted rounded-2xl overflow-hidden shadow-lg flex flex-col mb-10 border border-border">
			<div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
				<span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
					<FileText className="w-3 h-3" /> {label}
				</span>
				<button onClick={copyToClipboard} className="flex items-center gap-1.5 px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] uppercase font-bold rounded transition">
					{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
					{copied ? "Copied!" : "Copy Code"}
				</button>
			</div>
			<div className="p-4 overflow-x-auto relative group">
				<pre className="text-sm font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">{code}</pre>
			</div>
		</div>
	);
}