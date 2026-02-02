"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import mammoth from "mammoth";
// @ts-ignore - html2pdf.js lacks TypeScript definitions
import html2pdf from "html2pdf.js";
import {
	FileText,
	UploadCloud,
	ArrowRight,
	Loader2,
	FileType,
	RefreshCw,
	Eye,
	AlertTriangle
} from "lucide-react";

// Converts Word documents to PDF with client-side processing
export default function WordToPdf() {
	const [file, setFile] = useState<File | null>(null);
	const [htmlContent, setHtmlContent] = useState<string>("");
	const [isConverting, setIsConverting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const previewRef = useRef<HTMLDivElement>(null);

	// Handle file drop from react-dropzone
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const selected = acceptedFiles[0];
		if (!selected?.name.endsWith(".docx")) {
			setError("Please upload a valid Word (.docx) file.");
			return;
		}

		setFile(selected);
		setError(null);
		setHtmlContent("");

		try {
			const arrayBuffer = await selected.arrayBuffer();

			// Configure mammoth to convert images to base64 data URLs
			const options = {
				convertImage: mammoth.images.imgElement((image) => {
					return image.read("base64").then((imageBuffer) => {
						return {
							src: "data:" + image.contentType + ";base64," + imageBuffer
						};
					});
				})
			};

			// Convert DOCX to HTML for preview
			const result = await mammoth.convertToHtml({ arrayBuffer }, options);

			if (!result.value.trim()) {
				setError("No text found!");
			}

			setHtmlContent(result.value);
		} catch (err) {
			console.error(err);
			setError("Failed to read Word document.");
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
		multiple: false
	});

	const handleDownloadPdf = async () => {
		if (!htmlContent || !previewRef.current) return;
		setIsConverting(true);

		const element = previewRef.current;

		const normalizeColorToRgb = (value: string, fallback: string) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return fallback;
			try {
				ctx.fillStyle = '#000';
				ctx.fillStyle = value;
				return ctx.fillStyle;
			} catch {
				return fallback;
			}
		};

		const inlineNormalizedColors = (root: HTMLElement) => {
			const propsToNormalize = [
				'color',
				'backgroundColor',
				'borderTopColor',
				'borderRightColor',
				'borderBottomColor',
				'borderLeftColor',
				'outlineColor',
				'fill',
				'stroke',
			] as const;

			const all: HTMLElement[] = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];
			for (const el of all) {
				const computed = window.getComputedStyle(el);
				for (const prop of propsToNormalize) {
					const val = computed[prop] as unknown as string;
					if (!val || val === 'transparent' || val === 'rgba(0, 0, 0, 0)') continue;
					if (val.includes('lab(') || val.includes('oklab(') || val.includes('oklch(') || val.includes('color-mix(')) {
						const fallback = prop.toLowerCase().includes('background') ? '#ffffff' : '#000000';
						(el.style as any)[prop] = normalizeColorToRgb(val, fallback);
					}
				}
			}
		};

		const opt = {
			margin: [15, 15, 15, 15] as [number, number, number, number],
			filename: file?.name.replace(".docx", ".pdf") || "document.pdf",
			image: { type: 'jpeg' as const, quality: 0.98 },

			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
				backgroundColor: "#ffffff",
				windowHeight: element.scrollHeight
			},
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
			pagebreak: { mode: ['css', 'legacy'] }
		};

		try {
			const exportNode = element.cloneNode(true) as HTMLDivElement;
			const container = document.createElement('div');
			container.style.position = 'fixed';
			container.style.left = '-100000px';
			container.style.top = '0';
			container.style.width = `${element.offsetWidth}px`;
			container.style.background = '#ffffff';
			container.appendChild(exportNode);
			document.body.appendChild(container);

			inlineNormalizedColors(exportNode);

			await html2pdf().set(opt).from(exportNode).save();
			document.body.removeChild(container);
		} catch (err) {
			console.error(err);
			setError("Error generating PDF. Try a smaller file.");
		} finally {
			setIsConverting(false);
		}
	};

	return (
		<div className="flex flex-col h-full gap-6">

			<div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-start gap-3">
				<div className="p-2 bg-primary/20 rounded-lg text-primary">
					<FileType className="w-5 h-5" />
				</div>
				<div>
					<h3 className="font-semibold text-foreground text-sm">Convert Word to PDF (Multi-page Support)</h3>
					<p className="text-xs text-muted-foreground mt-1">
						Optimized for long lists and multi-page documents.
					</p>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-6 h-full">

				<div className="flex flex-col gap-4">
					<div
						{...getRootProps()}
						className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer min-h-[300px]
              ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-muted'}
              ${file ? 'bg-primary/5 border-primary/30' : 'bg-card'}
            `}
					>
						<input {...getInputProps()} />

						{file ? (
							<div className="text-center animate-in zoom-in duration-300">
								<div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center mb-4">
									<FileText className="w-8 h-8" />
								</div>
								<p className="font-semibold text-foreground truncate max-w-[250px] mx-auto">{file.name}</p>

								<button
									onClick={(e) => { e.stopPropagation(); setFile(null); setHtmlContent(""); }}
									className="mt-4 text-xs text-destructive hover:text-destructive font-medium underline flex items-center justify-center gap-1 mx-auto"
								>
									<RefreshCw className="w-3 h-3" /> Change file
								</button>
							</div>
						) : (
							<div className="text-center">
								<div className="w-16 h-16 bg-muted text-muted-foreground rounded-full mx-auto flex items-center justify-center mb-4">
									<UploadCloud className="w-8 h-8" />
								</div>
								<p className="font-medium text-foreground">Drop Word (.docx) file</p>
							</div>
						)}
					</div>

					<button
						onClick={handleDownloadPdf}
						disabled={!htmlContent || isConverting}
						className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md
                  ${!htmlContent || isConverting
								? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
								: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg'}
              `}
					>
						{isConverting ? (
							<>
								<Loader2 className="w-6 h-6 animate-spin" /> Generating PDF...
							</>
						) : (
							<>
								Download PDF <ArrowRight className="w-5 h-5" />
							</>
						)}
					</button>

					{error && (
						<div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 animate-in slide-in-from-top-1">
							<AlertTriangle className="w-4 h-4 shrink-0" /> {error}
						</div>
					)}
				</div>

				<div className="bg-muted border border-border rounded-xl p-4 overflow-y-auto max-h-[600px] flex flex-col items-center relative">
					<div className="sticky top-0 bg-muted/90 backdrop-blur w-full py-2 z-10 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 border-b border-border">
						<Eye className="w-4 h-4" /> Preview
					</div>

					{htmlContent ? (
						<div
							id="pdf-content"
							className="bg-white shadow-xl p-[15mm] min-h-[297mm] w-full max-w-[210mm] origin-top"
						>
							<style>{`
                        .pdf-preview p, .pdf-preview h1, .pdf-preview h2, .pdf-preview h3, .pdf-preview span, .pdf-preview li {
                            color: #000000 !important;
                            line-height: 1.6;
                        }
                        
                        .pdf-preview ul, .pdf-preview ol {
                            page-break-inside: auto !important;
                            margin-bottom: 1em;
                        }
                        
                        .pdf-preview li {
                            page-break-inside: avoid;
                            page-break-after: auto;
                            margin-bottom: 0.5em;
                        }

                        .pdf-preview table {
                          page-break-inside: auto;
                        }
                        .pdf-preview tr {
                          page-break-inside: avoid;
                          page-break-after: auto;
                        }
                    `}</style>
							<div
								ref={previewRef}
								className="pdf-preview prose prose-sm max-w-none font-serif text-black"
								dangerouslySetInnerHTML={{ __html: htmlContent }}
							/>
						</div>
					) : (
						<div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[400px]">
							<FileText className="w-16 h-16 mb-4 opacity-20" />
							<p className="text-sm">Upload to verify content</p>
						</div>
					)}
				</div>

			</div>
		</div>
	);
}