"use client";

import { useState } from "react";
import {
	Smartphone, Tablet, Monitor, Laptop,
	RotateCcw, Globe, AlertTriangle,
	Maximize2, ZoomIn, ZoomOut
} from "lucide-react";

// Qurilmalar ro'yxati o'zgarmadi
const DEVICES = [
	{ name: "Mobile S", width: 320, height: 568, icon: Smartphone },
	{ name: "Mobile M", width: 375, height: 667, icon: Smartphone },
	{ name: "Mobile L", width: 414, height: 896, icon: Smartphone },
	{ name: "Tablet", width: 768, height: 1024, icon: Tablet },
	{ name: "Laptop", width: 1024, height: 768, icon: Laptop },
	{ name: "Desktop", width: 1440, height: 900, icon: Monitor },
	{ name: "Full Width", width: '100%', height: '100%', icon: Maximize2 },
];

export default function ResponsiveTester() {
	const [url, setUrl] = useState("");
	const [activeUrl, setActiveUrl] = useState("");
	const [selectedDevice, setSelectedDevice] = useState(DEVICES[2]); // Default Mobile L
	const [isLandscape, setIsLandscape] = useState(false);
	const [zoom, setZoom] = useState(0.35); // Kichikroq joy uchun default zoomni 75% qildik

	const handleSubmit = (e?: React.FormEvent) => {
		e?.preventDefault();
		if (!url.trim()) return;

		let validUrl = url;
		if (!validUrl.startsWith("http")) {
			validUrl = "https://" + validUrl;
		}
		setActiveUrl(validUrl);
	};

	const toggleRotate = () => {
		if (typeof selectedDevice.width === 'string') return;
		setIsLandscape(!isLandscape);
	};

	const getDimensions = () => {
		if (typeof selectedDevice.width === 'string') {
			return { width: '100%', height: '100%' };
		}
		return {
			width: isLandscape ? selectedDevice.height : selectedDevice.width,
			height: isLandscape ? selectedDevice.width : selectedDevice.height,
		};
	};

	const dims = getDimensions();

	return (
		<div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] gap-4">

			{/* --- TOOLBAR (O'zgartirildi: 2 qatorga bo'lindi) --- */}
			<div className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col gap-4 shrink-0">

				{/* 1-Qator: URL Input (To'liq kenglikda) */}
				<form onSubmit={handleSubmit} className="flex gap-2 w-full">
					<div className="relative flex-1">
						<Globe className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							type="text"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Enter website URL (e.g. localhost:3000)"
							className="w-full pl-9 pr-3 py-2 border text-foreground border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/50 focus:bg-card transition-colors placeholder:text-muted-foreground/50"
						/>
					</div>
					<button
						type="submit"
						className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
					>
						Test
					</button>
				</form>

				{/* 2-Qator: Controls (Devicelar va Zoom) */}
				<div className="flex flex-wrap items-center justify-between gap-3">

					{/* Devices List */}
					<div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-border w-full md:w-auto">
						{DEVICES.map((device) => (
							<button
								key={device.name}
								onClick={() => { setSelectedDevice(device); setIsLandscape(false); }}
								className={`
                   flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all border
                   ${selectedDevice.name === device.name
										? 'bg-primary/10 border-primary/20 text-primary shadow-sm'
										: 'bg-card border-border text-muted-foreground hover:bg-muted hover:border-gray-300'
									}
                 `}
							>
								<device.icon className="w-3.5 h-3.5" />
								{device.name}
							</button>
						))}
					</div>

					{/* Right Side Controls: Rotate & Zoom */}
					<div className="flex items-center gap-3 ml-auto">
						{/* Rotate Button */}
						<button
							onClick={toggleRotate}
							disabled={typeof selectedDevice.width === 'string'}
							className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors border border-transparent hover:border-primary/20"
							title="Rotate Screen"
						>
							<RotateCcw className="w-4 h-4" />
						</button>

						{/* Divider */}
						<div className="w-px h-5 bg-border"></div>

						{/* Zoom Controls */}
						<div className="flex items-center border border-border rounded-lg overflow-hidden bg-card">
							<button
								onClick={() => setZoom(z => Math.max(0.25, z - 0.1))}
								className="p-1.5 hover:bg-muted text-muted-foreground active:bg-muted/80"
								title="Zoom Out"
							>
								<ZoomOut className="w-3.5 h-3.5" />
							</button>
							<span className="text-[10px] font-mono w-9 text-center text-muted-foreground font-medium select-none">
								{Math.round(zoom * 100)}%
							</span>
							<button
								onClick={() => setZoom(z => Math.min(2, z + 0.1))}
								className="p-1.5 hover:bg-muted text-muted-foreground active:bg-muted/80"
								title="Zoom In"
							>
								<ZoomIn className="w-3.5 h-3.5" />
							</button>
						</div>
					</div>

				</div>
			</div>

			{/* --- PREVIEW AREA --- */}
			<div className="flex-1 bg-muted/30 border border-border rounded-xl overflow-hidden relative flex flex-col shadow-inner">

				{/* Info Bar */}
				<div className="bg-card border-b border-border px-4 py-2 flex justify-between items-center text-xs text-muted-foreground shrink-0 z-10">
					<span className="flex items-center gap-2">
						<span className={`w-2 h-2 rounded-full ${activeUrl ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></span>
						Device: <strong className="text-foreground">{selectedDevice.name}</strong>
						{typeof dims.width === 'number' && ` (${dims.width} x ${dims.height})`}
					</span>
					{activeUrl && (
						<span className="truncate max-w-[200px] bg-muted px-2 py-0.5 rounded border border-border">
							{activeUrl}
						</span>
					)}
				</div>

				{/* Iframe Container */}
				{/* 'bg-pattern' bu yerda shartli, agar css da yo'q bo'lsa shunchaki oq yoki kulrang qoladi */}
				<div className="flex-1 overflow-hidden relative bg-muted/10 flex items-center justify-center">
					{activeUrl ? (
						<div className="overflow-auto w-full h-full flex items-center justify-center p-8">
							<div
								style={{
									width: dims.width,
									height: dims.height,
									transform: `scale(${zoom})`,
									// transformOrigin o'rtadan bo'lishi vizual chiroyli ko'rinadi kichik joyda
									transformOrigin: 'center center',
									transition: 'width 0.3s, height 0.3s, transform 0.2s'
								}}
								className="bg-background shadow-2xl transition-all duration-300 relative shrink-0 border border-border"
							>
								<iframe
									src={activeUrl}
									className="w-full h-full border-0 bg-white"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
									title="Responsive Preview"
								/>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center text-muted-foreground max-w-md text-center p-6">
							<Monitor className="w-16 h-16 mb-4 opacity-20" />
							<h3 className="font-bold text-foreground text-lg">Enter a URL to start testing</h3>
							<p className="text-sm mt-2 text-muted-foreground/80">
								Type a website address above and click Test.
								<br />
								Try inputs like <code className="bg-muted px-1 rounded text-foreground">localhost:3000</code>
							</p>
						</div>
					)}
				</div>

				{/* Warning Footer */}
				<div className="bg-amber-500/10 border-t border-amber-500/20 p-2 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-500 shrink-0">
					<AlertTriangle className="w-3.5 h-3.5 shrink-0" />
					<span className="truncate">If the site doesn’t open (“Refused to connect”), the site owner may have blocked it from being loaded in an iframe.</span>
				</div>
			</div>

		</div>
	);
}