import { Type, Palette, Layout, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { STYLES, OgConfig } from "./shared";

interface Props {
	config: OgConfig;
	setConfig: (config: OgConfig) => void;
}

export default function OgImageStudio({ config, setConfig }: Props) {

	const handleAlignChange = (align: 'start' | 'center' | 'end') => {
		setConfig({
			...config,
			alignment: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
			textAlign: align === 'start' ? 'left' : align === 'end' ? 'right' : 'center',
		});
	};

	return (
		<div className="space-y-6 animate-in fade-in">
			{/* HEADER */}
			<h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
				<ImageIcon className="w-5 h-5 text-purple-600" /> OG Image Studio
				<span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-auto">Uses @vercel/og</span>
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

				{/* 1. CONTENT SECTION */}
				<div className="space-y-3">
					<div className={STYLES.controlGroupLabel}><Type className="w-3.5 h-3.5" /> Text Content</div>
					<input
						placeholder="OG Title"
						value={config.ogTitle}
						onChange={(e) => setConfig({ ...config, ogTitle: e.target.value })}
						className={`${STYLES.inputField} font-bold`}
					/>
					<input
						placeholder="OG Description"
						value={config.ogDescription}
						onChange={(e) => setConfig({ ...config, ogDescription: e.target.value })}
						className={STYLES.inputField}
					/>
					<div className="flex gap-2">
						<input
							placeholder="Site Name"
							value={config.siteName}
							onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
							className={`${STYLES.inputField} flex-1`}
						/>
						<label className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 cursor-pointer border border-gray-200 dark:border-gray-700 px-2 rounded bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
							<input
								type="checkbox"
								checked={config.showDate}
								onChange={(e) => setConfig({ ...config, showDate: e.target.checked })}
							/>
							Date
						</label>
					</div>
				</div>

				{/* 2. APPEARANCE SECTION */}
				<div className="space-y-3">
					<div className={STYLES.controlGroupLabel}><Palette className="w-3.5 h-3.5" /> Background & Style</div>

					{/* Background Type Selector */}
					<div className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
						<select
							value={config.bgType}
							onChange={(e: any) => setConfig({ ...config, bgType: e.target.value })}
							className="text-sm border dark:border-gray-600 rounded p-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full focus:ring-2 focus:ring-blue-500 outline-none"
						>
							<option value="solid">Solid Color</option>
							<option value="gradient">Gradient</option>
							<option value="image">Custom Image</option>
						</select>
					</div>

					{/* Conditional Inputs based on bgType */}
					{config.bgType === 'image' ? (
						<div className="space-y-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
							<div className="relative">
								<LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
								<input
									placeholder="Image URL (https://...)"
									value={config.bgImage}
									onChange={(e) => setConfig({ ...config, bgImage: e.target.value })}
									className={`${STYLES.inputField} pl-9 text-xs`}
								/>
							</div>
							<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
								<span className="font-medium">Overlay:</span>
								<input
									type="range" min="0" max="90"
									value={config.bgOverlayOpacity}
									onChange={(e) => setConfig({ ...config, bgOverlayOpacity: Number(e.target.value) })}
									className="flex-1 cursor-pointer accent-blue-600"
								/>
								<span className="w-8 text-right font-mono">{config.bgOverlayOpacity}%</span>
							</div>
						</div>
					) : (
						<div className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
							<input type="color" title="Start Color" value={config.bgColorStart} onChange={(e) => setConfig({ ...config, bgColorStart: e.target.value })} className={STYLES.colorInput} />
							{config.bgType === 'gradient' && <span className="text-gray-400">→</span>}
							{config.bgType === 'gradient' && <input type="color" title="End Color" value={config.bgColorEnd} onChange={(e) => setConfig({ ...config, bgColorEnd: e.target.value })} className={STYLES.colorInput} />}
							<span className="text-xs text-gray-400 ml-auto">Pick Colors</span>
						</div>
					)}

					<div className="flex gap-4 justify-between mt-2">
						<div className="flex flex-col gap-1">
							<div className="text-[10px] uppercase font-bold text-gray-400">Text Color</div>
							<div className="flex items-center gap-2">
								<input type="color" value={config.textColor} onChange={(e) => setConfig({ ...config, textColor: e.target.value })} className={STYLES.colorInput} />
								<span className="text-xs font-mono text-gray-500">{config.textColor}</span>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-[10px] uppercase font-bold text-gray-400 text-right">Accent</div>
							<div className="flex items-center gap-2 justify-end">
								<span className="text-xs font-mono text-gray-500">{config.accentColor}</span>
								<input type="color" value={config.accentColor} onChange={(e) => setConfig({ ...config, accentColor: e.target.value })} className={STYLES.colorInput} />
							</div>
						</div>
					</div>
				</div>

				{/* 3. TYPOGRAPHY & LAYOUT SECTION */}
				<div className="space-y-3 md:col-span-2">
					<div className={`${STYLES.controlGroupLabel} border-t border-gray-100 dark:border-gray-800 pt-4 mt-2`}><Layout className="w-3.5 h-3.5" /> Typography & Layout</div>

					<div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
						{/* Alignment Buttons */}
						<div className="flex rounded-lg bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
							<button onClick={() => handleAlignChange('start')} className={`${STYLES.iconBtn} ${config.alignment === 'flex-start' ? STYLES.iconBtnActive : ''}`}><AlignLeft className="w-4 h-4" /></button>
							<button onClick={() => handleAlignChange('center')} className={`${STYLES.iconBtn} ${config.alignment === 'center' ? STYLES.iconBtnActive : ''}`}><AlignCenter className="w-4 h-4" /></button>
							<button onClick={() => handleAlignChange('end')} className={`${STYLES.iconBtn} ${config.alignment === 'flex-end' ? STYLES.iconBtnActive : ''}`}><AlignRight className="w-4 h-4" /></button>
						</div>

						{/* Font Weight */}
						<select
							value={config.titleFontWeight}
							onChange={(e) => setConfig({ ...config, titleFontWeight: e.target.value })}
							className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
						>
							<option value="400">Regular</option>
							<option value="700">Bold</option>
							<option value="900">Black (Heavy)</option>
						</select>

						{/* Font Size Sliders */}
						<div className="flex-1 flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap w-full">
							<div className="flex items-center gap-2 w-full">
								<span>Title:</span>
								<input type="range" min="40" max="120" value={config.titleFontSize} onChange={(e) => setConfig({ ...config, titleFontSize: Number(e.target.value) })} className="w-full accent-blue-600 cursor-pointer" />
							</div>
							<div className="flex items-center gap-2 w-full">
								<span>Desc:</span>
								<input type="range" min="20" max="60" value={config.descFontSize} onChange={(e) => setConfig({ ...config, descFontSize: Number(e.target.value) })} className="w-full accent-blue-600 cursor-pointer" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 4. LIVE PREVIEW */}
			<div className="mt-8">
				<div className="flex items-center justify-between mb-2">
					<div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Preview (1200 x 630)</div>
					<div className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Scale: 100%</div>
				</div>

				<div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-2xl aspect-[1200/630] w-full mx-auto relative transition-all duration-300 group"
					style={{
						background: config.bgType === 'image'
							? `url(${config.bgImage}) center/cover no-repeat`
							: config.bgType === 'solid'
								? config.bgColorStart
								: `linear-gradient(to bottom right, ${config.bgColorStart}, ${config.bgColorEnd})`,
						color: config.textColor,
						display: 'flex',
						flexDirection: 'column',
						alignItems: config.alignment,
						textAlign: config.textAlign,
						justifyContent: 'center',
						padding: '40px 60px',
						position: 'relative'
					}}>

					{config.bgType === 'image' && (
						<div className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300" style={{ opacity: config.bgOverlayOpacity / 100 }}></div>
					)}

					<div className="relative z-10 w-full flex flex-col h-full justify-center">
						<h1
							style={{
								fontSize: `${config.titleFontSize * 0.6}px`,
								fontWeight: config.titleFontWeight,
								lineHeight: 1.1,
								textShadow: config.bgType === 'image' ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
							}}
							className="mb-4 transition-all duration-200"
						>
							{config.ogTitle || "Your Title Here"}
						</h1>

						<p
							style={{
								fontSize: `${config.descFontSize * 0.6}px`,
								opacity: 0.9,
								marginBottom: '20px',
								textShadow: config.bgType === 'image' ? '0 1px 5px rgba(0,0,0,0.3)' : 'none'
							}}
							className="transition-all duration-200"
						>
							{config.ogDescription}
						</p>

						<div style={{ marginTop: 'auto', display: 'flex', gap: '15px', alignItems: 'center', width: '100%', justifyContent: config.alignment }}>
							<span style={{ color: config.accentColor, fontWeight: 'bold', fontSize: '14px' }}>{config.siteName}</span>
							{config.showDate && <span className="opacity-80 text-xs font-medium">| {new Date().toLocaleDateString()}</span>}
						</div>
					</div>

					<div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300">
						<div className="border-r border-b border-white/10"></div><div className="border-r border-b border-white/10"></div><div className="border-b border-white/10"></div>
						<div className="border-r border-b border-white/10"></div><div className="border-r border-b border-white/10"></div><div className="border-b border-white/10"></div>
						<div className="border-r border-white/10"></div><div className="border-r border-white/10"></div><div></div>
					</div>
				</div>
			</div>
		</div>
	);
}