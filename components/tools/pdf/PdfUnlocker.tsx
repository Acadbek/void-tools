"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import {
	Lock,
	Unlock,
	KeyRound,
	UploadCloud,
	Loader2,
	CheckCircle2,
	AlertCircle,
	Eye,
	EyeOff,
	ShieldAlert,
	FileKey
} from "lucide-react";

export default function PdfUnlocker() {
	const [file, setFile] = useState<File | null>(null);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isEncrypted, setIsEncrypted] = useState(false);
	const [isUnlocked, setIsUnlocked] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 1. Fayl yuklanganda tekshirish
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const selected = acceptedFiles[0];
		if (selected?.type !== "application/pdf") return;

		setFile(selected);
		setError(null);
		setIsUnlocked(false);
		setIsEncrypted(false);
		setPassword("");

		// Fayl shifrlangan yoki yo'qligini tekshirish uchun o'qib ko'ramiz
		try {
			const buffer = await selected.arrayBuffer();
			// Parolsiz yuklashga urinib ko'ramiz
			await PDFDocument.load(buffer);
			// Agar xato bermasa, demak parol yo'q
			setError("This file is not password protected.");
		} catch (err: any) {
			// Agar shifrlangan bo'lsa, pdf-lib xato otadi
			if (err.message.includes("encrypted")) {
				setIsEncrypted(true);
			} else {
				console.error(err);
				setError("Error reading PDF file.");
			}
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'application/pdf': ['.pdf'] },
		multiple: false
	});

	// 2. Parolni olib tashlash jarayoni
	const handleUnlock = async () => {
		if (!file || !password) return;
		setIsProcessing(true);
		setError(null);

		try {
			const buffer = await file.arrayBuffer();

			// PDFni foydalanuvchi bergan parol bilan ochamiz
			// Bu yerda sehr ro'y beradi: Load qilganda parolni beramiz...
			const pdfDoc = await PDFDocument.load(buffer, { password: password } as any);

			// ...Save qilganda esa hech qanday parol bermaymiz!
			// Natijada PDF himoyasiz saqlanadi.
			const pdfBytes = await pdfDoc.save();

			const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
			saveAs(blob, `unlocked_${file.name}`);

			setIsUnlocked(true);
		} catch (err) {
			console.error(err);
			setError("Incorrect password. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="flex flex-col h-full gap-6">

			{/* HEADER INFO */}
			<div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start gap-3">
				<div className="p-2 bg-primary/10 rounded-lg text-primary">
					<FileKey className="w-5 h-5" />
				</div>
				<div>
					<h3 className="font-semibold text-foreground text-sm">Remove PDF Password</h3>
					<p className="text-xs text-muted-foreground mt-1">
						Permanently remove security from your PDF.
						<span className="font-semibold text-primary"> You must know the current password</span> to unlock it.
					</p>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6 h-full">

				{/* LEFT: UPLOAD AREA */}
				<div className="flex flex-col gap-4">
					{!isUnlocked ? (
						<div
							{...getRootProps()}
							className={`
               flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer min-h-[300px]
               ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}
               ${file ? 'bg-primary/5 border-primary/30' : 'bg-card'}
             `}
						>
							<input {...getInputProps()} />

							{file ? (
								<div className="text-center animate-in zoom-in duration-300">
									<div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center mb-4">
										{isEncrypted ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
									</div>
									<p className="font-semibold text-foreground truncate max-w-[200px] mx-auto">{file.name}</p>
									<p className="text-sm text-muted-foreground mt-1">
										{isEncrypted ? "Password Protected" : "File loaded"}
									</p>

									<button
										onClick={(e) => {
											e.stopPropagation();
											setFile(null);
											setIsEncrypted(false);
											setError(null);
										}}
										className="mt-4 text-xs text-red-500 hover:text-red-700 font-medium underline"
									>
										Change file
									</button>
								</div>
							) : (
								<div className="text-center">
									<div className="w-16 h-16 bg-muted text-muted-foreground rounded-full mx-auto flex items-center justify-center mb-4">
										<UploadCloud className="w-8 h-8" />
									</div>
									<p className="font-medium text-foreground">Drop PDF here</p>
									<p className="text-xs text-muted-foreground mt-2">Only encrypted files supported</p>
								</div>
							)}
						</div>
					) : (
						// SUCCESS STATE (File Unlocked)
						<div className="h-full bg-green-50 border border-green-200 rounded-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
							<div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
								<Unlock className="w-10 h-10" />
							</div>
							<h3 className="text-xl font-bold text-green-800 mb-2">Password Removed!</h3>
							<p className="text-green-700 mb-6">
								Your file has been downloaded automatically. It is now open for everyone.
							</p>
							<button
								onClick={() => {
									setFile(null);
									setIsUnlocked(false);
									setIsEncrypted(false);
									setPassword("");
								}}
								className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
							>
								Unlock Another File
							</button>
						</div>
					)}
				</div>

				{/* RIGHT: ACTION AREA */}
				<div className="flex flex-col justify-center gap-6 bg-muted/50 p-6 rounded-xl border border-border">

					{!file && (
						<div className="flex flex-col items-center text-muted-foreground text-center">
							<ShieldAlert className="w-16 h-16 mb-4 opacity-20" />
							<p className="text-sm">Upload a secure PDF to start</p>
						</div>
					)}

					{file && !isEncrypted && !error && (
						<div className="flex flex-col items-center text-muted-foreground text-center">
							<CheckCircle2 className="w-16 h-16 mb-4 text-green-500" />
							<h4 className="font-medium text-foreground">No Password Needed</h4>
							<p className="text-xs mt-2">This file is already unlocked.</p>
						</div>
					)}

					{file && isEncrypted && !isUnlocked && (
						<div className="space-y-4 animate-in slide-in-from-bottom-2">
							<div className="text-center mb-2">
								<h4 className="font-bold text-foreground text-lg">Enter Password</h4>
								<p className="text-sm text-muted-foreground">Enter the document password to decrypt it.</p>
							</div>

							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
									<KeyRound className="w-5 h-5" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={`w-full pl-10 pr-10 py-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition-all ${error ? 'border-destructive focus:ring-destructive/30' : 'border-border bg-background'}`}
									placeholder="Type password..."
									onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
								>
									{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
								</button>
							</div>

							{error && (
								<div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
									<AlertCircle className="w-4 h-4 shrink-0" /> {error}
								</div>
							)}

							<button
								onClick={handleUnlock}
								disabled={!password || isProcessing}
								className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isProcessing ? (
									<> <Loader2 className="w-5 h-5 animate-spin" /> Unlocking... </>
								) : (
									<> <Unlock className="w-5 h-5" /> Unlock PDF </>
								)}
							</button>

							<p className="text-center text-xs text-muted-foreground mt-2">
								Processing happens in your browser. <br /> Your password is safe.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}