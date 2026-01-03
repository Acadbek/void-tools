import { Globe, Search, Facebook, Twitter, Hash, ShoppingBag, FileText, AlertCircle, HelpCircle, Trash2 } from "lucide-react";
import { STYLES, SeoData, ManifestData, FaqItem, OgConfig } from "./shared";
import { useState } from "react";

const CharCounter = ({ current, max }: { current: number, max: number }) => {
	const isOver = current > max;
	return (
		<span className={`text-[10px] font-mono ml-auto ${isOver ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
			{current}/{max} {isOver && <AlertCircle className="inline w-3 h-3 ml-1" />}
		</span>
	);
};

const MiniOgPreview = ({ config }: { config: OgConfig }) => {
	return (
		<div
			className="w-full h-full overflow-hidden flex flex-col justify-center p-4 transition-all duration-300 relative"
			style={{
				background: config.bgType === 'image'
					? `url(${config.bgImage}) center/cover no-repeat`
					: config.bgType === 'solid'
						? config.bgColorStart
						: `linear-gradient(to bottom right, ${config.bgColorStart}, ${config.bgColorEnd})`,
				alignItems: config.alignment,
				textAlign: config.textAlign,
			}}
		>
			{/* Overlay */}
			{config.bgType === 'image' && (
				<div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: config.bgOverlayOpacity / 100 }}></div>
			)}

			{/* Content */}
			<div className="relative z-10 w-full flex flex-col h-full justify-center">
				<div
					className="font-bold leading-tight mb-2"
					style={{
						color: config.textColor,
						fontSize: '16px',
						fontWeight: config.titleFontWeight
					}}
				>
					{config.ogTitle || "Page Title"}
				</div>

				<div
					className="opacity-90 leading-tight mb-4"
					style={{
						color: config.textColor,
						fontSize: '10px'
					}}
				>
					{config.ogDescription || "Page description..."}
				</div>

				<div className="mt-auto w-full flex items-center gap-2" style={{ justifyContent: config.alignment }}>
					<span className="text-[9px] font-bold" style={{ color: config.accentColor }}>
						{config.siteName}
					</span>
				</div>
			</div>
		</div>
	);
};

function SocialPreviews({ data, ogConfig }: { data: SeoData, ogConfig: OgConfig }) {
	const [platform, setPlatform] = useState<'google' | 'twitter' | 'facebook' | 'slack'>('google');

	const domain = data.url ? data.url.replace(/^https?:\/\//, '').split('/')[0] : 'example.com';

	return (
		<div>
			<div className="flex items-center justify-between mb-3">
				<div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
					Real-time Preview
				</div>
				<div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
					<button onClick={() => setPlatform('google')} className={`p-1.5 rounded-md transition ${platform === 'google' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' : 'text-gray-400 hover:text-gray-600'}`} title="Google Search"><Search className="w-3.5 h-3.5" /></button>
					<button onClick={() => setPlatform('twitter')} className={`p-1.5 rounded-md transition ${platform === 'twitter' ? 'bg-white dark:bg-gray-700 shadow-sm text-sky-500' : 'text-gray-400 hover:text-gray-600'}`} title="Twitter Card"><Twitter className="w-3.5 h-3.5" /></button>
					<button onClick={() => setPlatform('facebook')} className={`p-1.5 rounded-md transition ${platform === 'facebook' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-700' : 'text-gray-400 hover:text-gray-600'}`} title="Facebook Post"><Facebook className="w-3.5 h-3.5" /></button>
					{/* <button onClick={() => setPlatform('slack')} className={`p-1.5 rounded-md transition ${platform === 'slack' ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-500' : 'text-gray-400 hover:text-gray-600'}`} title="Slack Link"><Hash className="w-3.5 h-3.5" /></button> */}
				</div>
			</div>

			<div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm font-sans select-none min-h-[220px] flex items-center justify-center">

				{platform === 'google' && (
					<div className="font-arial w-full">
						<div className="flex items-center gap-2 mb-1">
							<div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 border">
								<Globe className="w-4 h-4" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm text-[#202124] leading-tight truncate max-w-[240px]">{data.title.substring(0, 40)}...</span>
								<span className="text-xs text-[#5f6368] leading-tight truncate max-w-[240px]">{data.url || 'https://example.com'}</span>
							</div>
						</div>
						<h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-normal truncate leading-snug">
							{data.title || 'Page Title'}
						</h3>
						<p className="text-sm text-[#4d5156] mt-1 leading-snug break-words line-clamp-2">
							{data.description || 'Page description goes here...'}
						</p>
					</div>
				)}

				{platform === 'twitter' && (
					<div className="w-full max-w-[350px] border border-gray-200 rounded-2xl overflow-hidden font-sans">
						<div className="h-[175px] w-full bg-gray-100 relative overflow-hidden">
							<MiniOgPreview config={ogConfig} />
						</div>
						<div className="p-3 bg-white">
							<div className="text-sm font-bold text-gray-900 truncate">{data.title || "Title"}</div>
							<div className="text-sm text-gray-500 line-clamp-2 mt-0.5">{data.description || "Description..."}</div>
							<div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
								<Globe className="w-3 h-3" /> {domain}
							</div>
						</div>
					</div>
				)}

				{platform === 'facebook' && (
					<div className="w-full max-w-[350px] font-sans">
						<div className="h-[185px] w-full bg-gray-100 border border-gray-200 relative overflow-hidden">
							<MiniOgPreview config={ogConfig} />
						</div>
						<div className="bg-[#f0f2f5] p-3 border-x border-b border-gray-200">
							<div className="text-[10px] text-gray-500 uppercase font-semibold">{domain}</div>
							<div className="text-sm font-bold text-gray-900 leading-tight mt-0.5">{data.title || "Title"}</div>
							<div className="text-xs text-gray-600 mt-1 line-clamp-1">{data.description || "Description..."}</div>
						</div>
					</div>
				)}

				{/* 4. SLACK PREVIEW */}
				{platform === 'slack' && (
					<div className="flex gap-3 font-sans w-full max-w-[350px]">
						<div className="w-1 rounded-full bg-gray-300 shrink-0"></div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<span className="font-bold text-sm text-gray-900">Your App</span>
								<span className="text-xs text-gray-400">APP 12:42 PM</span>
							</div>
							<div className="flex gap-3">
								<div className="flex-1">
									<div className="text-blue-600 font-semibold text-sm mb-1">{data.title || "Page Title"}</div>
									<div className="text-gray-700 text-sm leading-snug line-clamp-3">{data.description || "Description..."}</div>
								</div>
								<div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden border border-gray-200">
									<MiniOgPreview config={ogConfig} />
								</div>
							</div>
						</div>
					</div>
				)}

			</div>
			<p className="text-[10px] text-gray-400 mt-2 text-center">
				*Previews are simulations. Actual appearance may vary by device.
			</p>
		</div>
	)
}

export function MetadataForm({ data, setData, ogConfig }: { data: SeoData, setData: (d: SeoData) => void, ogConfig: OgConfig }) {
	return (
		<div className="space-y-6 animate-in fade-in">
			<h3 className="font-bold flex gap-2 text-gray-900 dark:text-white items-center pb-2 border-b border-gray-100 dark:border-gray-800">
				<Globe className="w-5 h-5 text-blue-500" /> Metadata & Previews
			</h3>

			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-4">
					<div>
						<div className="flex justify-between mb-1">
							<label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Title</label>
							<CharCounter current={data.title.length} max={60} />
						</div>
						<input
							placeholder="Page Title"
							value={data.title}
							onChange={(e) => setData({ ...data, title: e.target.value })}
							className={`${STYLES.inputField} ${data.title.length > 60 ? 'border-red-300 ring-red-200' : ''}`}
						/>
					</div>

					<div>
						<div className="flex justify-between mb-1">
							<label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Description</label>
							<CharCounter current={data.description.length} max={160} />
						</div>
						<textarea
							placeholder="Description"
							rows={3}
							value={data.description}
							onChange={(e) => setData({ ...data, description: e.target.value })}
							className={`${STYLES.inputField} ${data.description.length > 160 ? 'border-red-300 ring-red-200' : ''}`}
						/>
					</div>

					<div>
						<label className={STYLES.controlGroupLabel}>Canonical URL</label>
						<input placeholder="https://example.com/page" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value })} className={STYLES.inputField} />
					</div>

					<div>
						<label className={STYLES.controlGroupLabel}>Author / Twitter</label>
						<div className="grid grid-cols-2 gap-3">
							<input placeholder="Author Name" value={data.author} onChange={(e) => setData({ ...data, author: e.target.value })} className={STYLES.inputField} />
							<input placeholder="@twitter_handle" value={data.twitterHandle} onChange={(e) => setData({ ...data, twitterHandle: e.target.value })} className={STYLES.inputField} />
						</div>
					</div>
				</div>

				{/* SOCIAL PREVIEWS */}
				<SocialPreviews data={data} ogConfig={ogConfig} />
			</div>
		</div>
	);
}

export function SitemapForm({ data, setData }: { data: SeoData, setData: (d: SeoData) => void }) {
	return (
		<div className="animate-in fade-in">
			<h3 className="font-bold mb-4 text-gray-900 dark:text-white">Sitemap Config</h3>
			<input placeholder="Base URL" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value })} className={STYLES.inputField} />
		</div>
	);
}

export function ManifestForm({ manifest, setManifest }: { manifest: ManifestData, setManifest: (d: ManifestData) => void }) {
	return (
		<div className="animate-in fade-in">
			<h3 className="font-bold mb-4 text-gray-900 dark:text-white">Manifest Config</h3>
			<div className="grid md:grid-cols-2 gap-4">
				<input placeholder="Name" value={manifest.name} onChange={(e) => setManifest({ ...manifest, name: e.target.value })} className={STYLES.inputField} />
				<div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 p-1.5 rounded-lg bg-white dark:bg-gray-800">
					<span className="text-xs font-bold text-gray-500 px-2">Color</span>
					<input type="color" value={manifest.themeColor} onChange={(e) => setManifest({ ...manifest, themeColor: e.target.value })} className="h-8 w-full bg-transparent cursor-pointer" />
				</div>
			</div>
		</div>
	);
}

export function SchemaBuilder({ items, setItems, schemaType, setSchemaType }: any) {

	const addFaq = () => setItems([...items, { question: "", answer: "" }]);
	const removeFaq = (index: number) => setItems(items.filter((_: any, i: number) => i !== index));
	const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
		const newItems = [...items];
		newItems[index][field] = value;
		setItems(newItems);
	};

	return (
		<div className="space-y-6 animate-in fade-in">
			<div className="flex gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
				<button onClick={() => setSchemaType('faq')} className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${schemaType === 'faq' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}><HelpCircle className="w-4 h-4" /> FAQ</button>
				<button onClick={() => setSchemaType('product')} className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${schemaType === 'product' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}><ShoppingBag className="w-4 h-4" /> Product</button>
				<button onClick={() => setSchemaType('article')} className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${schemaType === 'article' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}><FileText className="w-4 h-4" /> Article</button>
			</div>

			{schemaType === 'faq' && (
				<>
					<div className="flex justify-between items-center">
						<h3 className="font-bold text-gray-900 dark:text-white">Questions & Answers</h3>
						<button onClick={addFaq} className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-teal-100 border border-teal-100 dark:border-teal-800">+ Add</button>
					</div>
					<div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
						{items.map((item: any, index: number) => (
							<div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 relative group">
								<input placeholder="Question" value={item.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} className={`${STYLES.inputField} mb-2`} />
								<textarea placeholder="Answer" rows={2} value={item.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)} className={STYLES.inputField} />
								{items.length > 1 && <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>}
							</div>
						))}
					</div>
				</>
			)}

			{schemaType === 'product' && <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"><ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" /><p className="text-gray-500 text-sm">Product Schema generator for E-commerce.</p></div>}
			{schemaType === 'article' && <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"><FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" /><p className="text-gray-500 text-sm">Article/Blog Posting Schema generator.</p></div>}
		</div>
	);
}