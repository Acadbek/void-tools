"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import {
	FileImage,
	UploadCloud,
	Download,
	Loader2,
	Settings2,
	Image as ImageIcon,
	CheckCircle2,
	FileArchive,
	AlertCircle
} from "lucide-react";

// PDF.js workerini sozlash (CDN orqali)
// Bu Next.js da "Module parse failed" xatosini oldini oladi
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

type ImageFormat = "jpeg" | "png" | "webp";

export default function PdfToImage() {
	const [file, setFile] = useState<File | null>(null);
	const [isConverting, setIsConverting] = useState(false);
	const [progress, setProgress] = useState(0);
	const [convertedImages, setConvertedImages] = useState<string[]>([]); // Blob URLlar
	const [error, setError] = useState<string | null>(null);

	// Settings
	const [format, setFormat] = useState<ImageFormat>("jpeg");
	const [quality, setQuality] = useState(0.8); // 0 dan 1 gacha
	const [scale, setScale] = useState(2); // 2x sifat (Retina displaylar uchun yaxshi)

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const selected = acceptedFiles[0];
		if (selected?.type !== "application/pdf") {
			setError("Please upload a valid PDF file.");
			return;
		}
		setFile(selected);
		setConvertedImages([]);
		setProgress(0);
		setError(null);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'application/pdf': ['.pdf'] },
		multiple: false
	});

	const convertPdfToImages = async () => {
		if (!file) return;
		setIsConverting(true);
		setProgress(0);
		setConvertedImages([]);
		const urls: string[] = [];

		try {
			const fileBuffer = await file.arrayBuffer();
			const pdf = await pdfjsLib.getDocument(fileBuffer).promise;
			const totalPages = pdf.numPages;

			for (let i = 1; i <= totalPages; i++) {
				const page = await pdf.getPage(i);

				// Canvas yaratish
				const viewport = page.getViewport({ scale: scale });
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");

				canvas.height = viewport.height;
				canvas.width = viewport.width;

				if (context) {
					// Oq fon qo'shish (PNG bo'lmasa shaffof bo'lib qolmasligi uchun)
					if (format === "jpeg") {
						context.fillStyle = "#FFFFFF";
						context.fillRect(0, 0, canvas.width, canvas.height);
					}

					await page.render({
						canvasContext: context,
						viewport: viewport,
					}).promise;

					// Rasmni Blob ga o'girish
					const blob = await new Promise<Blob | null>((resolve) => {
						canvas.toBlob(resolve, `image/${format}`, quality);
					});

					if (blob) {
						const url = URL.createObjectURL(blob);
						urls.push(url);
					}
				}

				// Progress yangilash
				setProgress(Math.round((i / totalPages) * 100));
			}

			setConvertedImages(urls);
		} catch (err) {
			console.error(err);
			setError("Failed to convert PDF. Please try another file.");
		} finally {
			setIsConverting(false);
		}
	};

	const downloadAllAsZip = async () => {
		if (convertedImages.length === 0) return;

		const zip = new JSZip();
		const folderName = file?.name.replace(".pdf", "") || "images";

		// Har bir rasmni zipga qo'shish
		const promises = convertedImages.map(async (url, index) => {
			const response = await fetch(url);
			const blob = await response.blob();
			const fileName = `${folderName}_page_${index + 1}.${format}`;
			zip.file(fileName, blob);
		});

		await Promise.all(promises);

		const content = await zip.generateAsync({ type: "blob" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(content);
		link.download = `${folderName}_converted.zip`;
		link.click();
	};

	const downloadSingle = (url: string, index: number) => {
		const link = document.createElement("a");
		link.href = url;
		link.download = `page_${index + 1}.${format}`;
		link.click();
	};

	return (
		<div className="flex flex-col h-full gap-6">

			{/* SETTINGS BAR */}
			<div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
				<div className="flex items-center gap-2 text-gray-700 font-medium">
					<Settings2 className="w-5 h-5 text-blue-600" />
					<span>Settings:</span>
				</div>

				<div className="flex items-center gap-4 flex-wrap">
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-500">Format:</span>
						<select
							value={format}
							onChange={(e) => setFormat(e.target.value as ImageFormat)}
							className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
						>
							<option value="jpeg">JPG (Best for Photos)</option>
							<option value="png">PNG (Lossless)</option>
							<option value="webp">WebP (Modern)</option>
						</select>
					</div>

					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-500">Quality:</span>
						<select
							value={scale}
							onChange={(e) => setScale(Number(e.target.value))}
							className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
						>
							<option value="1">Standard (72 DPI)</option>
							<option value="1.5">Medium (108 DPI)</option>
							<option value="2">High (144 DPI)</option>
							<option value="3">Ultra (216 DPI)</option>
						</select>
					</div>
				</div>
			</div>

			<div className="grid lg:grid-cols-3 gap-6 h-full">

				{/* LEFT: UPLOAD & STATUS */}
				<div className="lg:col-span-1 flex flex-col gap-4">
					<div
						{...getRootProps()}
						className={`
              border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer min-h-[250px]
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
              ${file ? 'bg-blue-50/30 border-blue-200' : 'bg-white'}
            `}
					>
						<input {...getInputProps()} />

						{file ? (
							<div className="text-center">
								<div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl mx-auto flex items-center justify-center mb-3">
									<FileImage className="w-6 h-6" />
								</div>
								<p className="font-semibold text-gray-800 truncate max-w-[200px]">{file.name}</p>
								<button
									onClick={(e) => { e.stopPropagation(); setFile(null); setConvertedImages([]); }}
									className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium underline"
								>
									Change file
								</button>
							</div>
						) : (
							<div className="text-center">
								<div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full mx-auto flex items-center justify-center mb-3">
									<UploadCloud className="w-6 h-6" />
								</div>
								<p className="font-medium text-gray-700 text-sm">Drop PDF here</p>
							</div>
						)}
					</div>

					<button
						onClick={convertPdfToImages}
						disabled={!file || isConverting}
						className={`
                  w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                  ${!file || isConverting
								? 'bg-gray-100 text-gray-400 cursor-not-allowed'
								: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}
              `}
					>
						{isConverting ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" /> {progress}% Converted
							</>
						) : (
							<>
								Convert to {format.toUpperCase()}
							</>
						)}
					</button>

					{/* Status Message */}
					{error && (
						<div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
							<AlertCircle className="w-4 h-4" /> {error}
						</div>
					)}
					{convertedImages.length > 0 && !isConverting && (
						<div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4" /> Success! {convertedImages.length} pages ready.
						</div>
					)}
				</div>

				{/* RIGHT: PREVIEW & DOWNLOAD */}
				<div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-6 overflow-y-auto max-h-[600px]">

					{convertedImages.length > 0 ? (
						<div>
							<div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-50 z-10 py-2 border-b border-gray-200">
								<h3 className="font-bold text-gray-800 flex items-center gap-2">
									<ImageIcon className="w-5 h-5 text-blue-500" /> Preview
								</h3>
								<button
									onClick={downloadAllAsZip}
									className="bg-gray-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-black transition-colors flex items-center gap-2 font-medium"
								>
									<FileArchive className="w-4 h-4" /> Download All (ZIP)
								</button>
							</div>

							<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
								{convertedImages.map((url, idx) => (
									<div key={idx} className="group relative bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
										<div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 relative">
											{/* Image Preview */}
											<img
												src={url}
												alt={`Page ${idx + 1}`}
												className="w-full h-full object-contain"
											/>
											{/* Overlay Button */}
											<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
												<button
													onClick={() => downloadSingle(url, idx)}
													className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition-transform"
													title="Download this page"
												>
													<Download className="w-4 h-4" />
												</button>
											</div>
										</div>
										<p className="text-center text-xs text-gray-500 mt-2 font-medium">Page {idx + 1}</p>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="h-full flex flex-col items-center justify-center text-gray-400 min-h-[300px]">
							<FileImage className="w-16 h-16 mb-4 opacity-20" />
							<p>Converted images will appear here</p>
						</div>
					)}
				</div>

			</div>
		</div>
	);
}