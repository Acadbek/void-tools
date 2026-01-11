"use client";

import { useState } from "react";
import {
	Copy, Check, Code, Image, FileText,
	List, Smartphone, HelpCircle, Trash2, Globe,
	AlignLeft, AlignCenter, AlignRight, Type, Palette, Layout
} from "lucide-react";

// --- STYLES (CONSTANTS) ---
// style jsx o'rniga shu yerdan boshqariladi
const STYLES = {
	sidebarBtn: "w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium text-muted-foreground hover:bg-muted border border-transparent",
	sidebarBtnActive: "bg-primary/10 text-primary border-primary/20",

	inputField: "w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-card text-foreground placeholder-muted-foreground",

	controlGroupLabel: "text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1.5",

	colorInput: "w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent",

	iconBtn: "p-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition",
	iconBtnActive: "bg-primary/10 text-primary border-primary/20"
};

// --- TYPES ---
type SeoData = {
	title: string;
	description: string;
	url: string;
	author: string;
	twitterHandle: string;
};

type OgConfig = {
	ogTitle: string;
	ogDescription: string;
	siteName: string;
	showDate: boolean;
	bgType: 'solid' | 'gradient';
	bgColorStart: string;
	bgColorEnd: string;
	textColor: string;
	accentColor: string;
	alignment: 'flex-start' | 'center' | 'flex-end';
	textAlign: 'left' | 'center' | 'right';
	titleFontSize: number;
	titleFontWeight: string;
	descFontSize: number;
};

type FaqItem = { question: string; answer: string; };
type ManifestData = { name: string; shortName: string; themeColor: string; bgColor: string; display: string; };

export default function UltimateSeoGenerator() {
	const [activeTab, setActiveTab] = useState<"meta" | "og-image" | "sitemap" | "robots" | "manifest" | "faq">("meta");
	const [copied, setCopied] = useState(false);

	// --- STATE DATA ---
	const [data, setData] = useState<SeoData>({
		title: "My Amazing Next.js App",
		description: "Build faster websites with Next.js and our new tools.",
		url: "https://example.com",
		author: "Admin",
		twitterHandle: "@website",
	});

	const [ogConfig, setOgConfig] = useState<OgConfig>({
		ogTitle: "My Amazing Next.js App",
		ogDescription: "An incredible tool for modern web developers.",
		siteName: "example.com",
		showDate: true,
		bgType: 'solid',
		bgColorStart: "#171717",
		bgColorEnd: "#3b82f6",
		textColor: "#ffffff",
		accentColor: "#3b82f6",
		alignment: 'center',
		textAlign: 'center',
		titleFontSize: 64,
		titleFontWeight: '900',
		descFontSize: 32,
	});

	const [faqItems, setFaqItems] = useState<FaqItem[]>([{ question: "Is this tool free?", answer: "Yes." }]);
	const [manifest, setManifest] = useState<ManifestData>({ name: "My App", shortName: "App", themeColor: "#3b82f6", bgColor: "#ffffff", display: "standalone" });

	// --- ACTIONS ---
	const addFaq = () => setFaqItems([...faqItems, { question: "", answer: "" }]);
	const removeFaq = (index: number) => setFaqItems(faqItems.filter((_, i) => i !== index));

	const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
		const newFaq = [...faqItems];
		newFaq[index][field] = value;
		setFaqItems(newFaq);
	};

	const handleAlignChange = (align: 'start' | 'center' | 'end') => {
		setOgConfig({
			...ogConfig,
			alignment: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
			textAlign: align === 'start' ? 'left' : align === 'end' ? 'right' : 'center',
		});
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(getActiveCode());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// --- CODE GENERATORS ---
	const generateMetadataCode = () => `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "${data.title}",
  description: "${data.description}",
  metadataBase: new URL('${data.url}'),
  openGraph: {
    title: "${data.title}",
    description: "${data.description}",
    url: "${data.url}",
    siteName: "${data.title}",
    images: [{ url: '/api/og', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "${data.title}",
    description: "${data.description}",
    images: ["/api/og"],
  },
};`;

	const generateOgRouteCode = () => {
		const backgroundStyle = ogConfig.bgType === 'solid'
			? `backgroundColor: '${ogConfig.bgColorStart}'`
			: `background: 'linear-gradient(to bottom right, ${ogConfig.bgColorStart}, ${ogConfig.bgColorEnd})'`;

		return `import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: '${ogConfig.alignment}',
          justifyContent: 'center',
          ${backgroundStyle},
          padding: '40px 60px',
          textAlign: '${ogConfig.textAlign}',
        }}
      >
        <div style={{ 
          fontSize: ${ogConfig.titleFontSize}, 
          fontWeight: '${ogConfig.titleFontWeight}', 
          color: '${ogConfig.textColor}',
          lineHeight: 1.1,
          marginBottom: '20px',
        }}>
          ${ogConfig.ogTitle}
        </div>
        
        <div style={{ fontSize: ${ogConfig.descFontSize}, color: '${ogConfig.textColor}', opacity: 0.8, marginBottom: '30px' }}>
          ${ogConfig.ogDescription}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: 'auto', width: '100%', justifyContent: '${ogConfig.alignment}' }}>
            <div style={{ fontSize: 24, color: '${ogConfig.accentColor}', fontWeight: 'bold' }}>
              ${ogConfig.siteName}
            </div>
            ${ogConfig.showDate ? `<div style={{ fontSize: 20, color: '${ogConfig.textColor}', opacity: 0.6 }}>| ${new Date().toLocaleDateString()}</div>` : ''}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}`;
	};

	const generateSitemap = () => `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = '${data.url}'
  return [{ url: baseUrl, lastModified: new Date() }]
}`;

	const generateManifest = () => JSON.stringify({
		name: manifest.name,
		short_name: manifest.shortName,
		start_url: "/",
		display: manifest.display,
		background_color: manifest.bgColor,
		theme_color: manifest.themeColor,
		icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
	}, null, 2);

	const generateFaqSchema = () => `<script type="application/ld+json">
${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqItems.map(i => ({
			"@type": "Question",
			"name": i.question,
			"acceptedAnswer": { "@type": "Answer", "text": i.answer }
		}))
	}, null, 2)}
</script>`;

	const generateRobotsTxt = () => `User-Agent: *
Allow: /
Sitemap: ${data.url}/sitemap.xml`;

	const getActiveCode = () => {
		switch (activeTab) {
			case "og-image": return generateOgRouteCode();
			case "sitemap": return generateSitemap();
			case "manifest": return generateManifest();
			case "faq": return generateFaqSchema();
			case "robots": return generateRobotsTxt();
			default: return generateMetadataCode();
		}
	};

	const getFileLabel = () => {
		switch (activeTab) {
			case 'meta': return 'app/layout.tsx';
			case 'og-image': return 'app/api/og/route.tsx';
			case 'sitemap': return 'app/sitemap.ts';
			case 'manifest': return 'public/manifest.json';
			case 'faq': return '<head> script';
			case 'robots': return 'public/robots.txt';
		}
	};

	return (
		<div className="min-h-screen bg-background p-4 md:p-8 transition-colors duration-300">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">

					{/* SIDEBAR */}
					<div className="w-full lg:w-64 flex flex-col gap-1.5 shrink-0">
						<div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Core SEO</div>
						<button
							onClick={() => setActiveTab("meta")}
							className={`${STYLES.sidebarBtn} ${activeTab === 'meta' ? STYLES.sidebarBtnActive : ''}`}
						>
							<Code className="w-4 h-4" /> Metadata
						</button>
						<button
							onClick={() => setActiveTab("sitemap")}
							className={`${STYLES.sidebarBtn} ${activeTab === 'sitemap' ? STYLES.sidebarBtnActive : ''}`}
						>
							<List className="w-4 h-4" /> Sitemap.xml
						</button>
						<button
							onClick={() => setActiveTab("robots")}
							className={`${STYLES.sidebarBtn} ${activeTab === 'robots' ? STYLES.sidebarBtnActive : ''}`}
						>
							<FileText className="w-4 h-4" /> Robots.txt
						</button>

						<div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 mt-4">Visual & Rich</div>
						<button
							onClick={() => setActiveTab("og-image")}
							className={`${STYLES.sidebarBtn} ${activeTab === 'og-image' ? STYLES.sidebarBtnActive : ''} `}
						>
							<Image className="w-4 h-4" /> OG Image Studio
						</button>
						<button
							onClick={() => setActiveTab("manifest")}
							className={`${STYLES.sidebarBtn} ${activeTab === 'manifest' ? STYLES.sidebarBtnActive : ''}`}
						>
							<Smartphone className="w-4 h-4" /> Web Manifest
						</button>
						<button
							onClick={() => setActiveTab("faq")}
							className={`${STYLES.sidebarBtn} ${activeTab === 'faq' ? STYLES.sidebarBtnActive : ''}`}
						>
							<HelpCircle className="w-4 h-4" /> FAQ Schema
						</button>
					</div>

					{/* MAIN CONTENT */}
					<div className="flex-1 space-y-6 min-w-0">

						<div className="bg-card p-4 md:p-6 rounded-2xl border border-border shadow-sm transition-colors">

							{/* 1. Metadata Config */}
							{activeTab === 'meta' && (
								<div className="space-y-4 animate-in fade-in">
									<h3 className="font-bold flex gap-2 text-foreground"><Globe className="w-5 h-5 text-blue-500" /> Metadata</h3>
									<div className="grid gap-3">
										<input placeholder="Page Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className={STYLES.inputField} />
										<textarea placeholder="Description" rows={2} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className={STYLES.inputField} />
										<input placeholder="URL" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value })} className={STYLES.inputField} />
										<input placeholder="Twitter @handle" value={data.twitterHandle} onChange={(e) => setData({ ...data, twitterHandle: e.target.value })} className={STYLES.inputField} />
									</div>
								</div>
							)}

							{/* 2. Sitemap Config */}
							{activeTab === 'sitemap' && (
								<div className="animate-in fade-in">
									<h3 className="font-bold mb-4 text-foreground">Sitemap Config</h3>
									<input placeholder="Base URL" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value })} className={STYLES.inputField} />
								</div>
							)}

							{/* 3. Manifest Config */}
							{activeTab === 'manifest' && (
								<div className="animate-in fade-in">
									<h3 className="font-bold mb-4 text-foreground">Manifest Config</h3>
									<div className="grid md:grid-cols-2 gap-4">
										<input placeholder="Name" value={manifest.name} onChange={(e) => setManifest({ ...manifest, name: e.target.value })} className={STYLES.inputField} />
										<div className="flex items-center gap-2 border border-border p-1.5 rounded-lg bg-card">
											<span className="text-xs font-bold text-muted-foreground px-2">Color</span>
											<input type="color" value={manifest.themeColor} onChange={(e) => setManifest({ ...manifest, themeColor: e.target.value })} className="h-8 w-full bg-transparent cursor-pointer" />
										</div>
									</div>
								</div>
							)}

							{/* 4. FAQ Schema Config */}
							{activeTab === 'faq' && (
								<div className="space-y-4 animate-in fade-in">
									<div className="flex justify-between items-center">
										<h3 className="font-bold text-foreground flex items-center gap-2">
											<HelpCircle className="w-5 h-5 text-teal-500" /> FAQ Schema
										</h3>
										<button onClick={addFaq} className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-teal-100 dark:hover:bg-teal-900/50 border border-teal-100 dark:border-teal-800">
											+ Add
										</button>
									</div>
									<div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
										{faqItems.map((item, index) => (
											<div key={index} className="bg-muted/50 p-3 rounded-lg border border-border relative group">
												<input
													placeholder="Question"
													value={item.question}
													onChange={(e) => updateFaq(index, 'question', e.target.value)}
													className={`${STYLES.inputField} mb-2`}
												/>
												<textarea
													placeholder="Answer"
													rows={2}
													value={item.answer}
													onChange={(e) => updateFaq(index, 'answer', e.target.value)}
													className={STYLES.inputField}
												/>
												{faqItems.length > 1 && (
													<button onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition">
														<Trash2 className="w-4 h-4" />
													</button>
												)}
											</div>
										))}
									</div>
								</div>
							)}

							{/* 5. Robots.txt */}
							{activeTab === 'robots' && (
								<div className="animate-in fade-in">
									<h3 className="font-bold text-foreground">Robots.txt</h3>
									<p className="text-sm text-muted-foreground">Standard allow all configuration.</p>
								</div>
							)}

							{/* 6. OG IMAGE STUDIO */}
							{activeTab === 'og-image' && (
								<div className="space-y-6 animate-in fade-in">
									<h3 className="font-bold text-foreground flex items-center gap-2 pb-2 border-b border-border">
										<Image className="w-5 h-5 text-purple-600" /> OG Image Studio
										<span className="text-xs font-normal text-muted-foreground ml-auto">Uses @vercel/og</span>
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
										{/* Content Section */}
										<div className="space-y-3">
											<div className={STYLES.controlGroupLabel}><Type className="w-3.5 h-3.5" /> Text Content</div>
											<input placeholder="OG Title" value={ogConfig.ogTitle} onChange={(e) => setOgConfig({ ...ogConfig, ogTitle: e.target.value })} className={`${STYLES.inputField} font-bold`} />
											<input placeholder="OG Description" value={ogConfig.ogDescription} onChange={(e) => setOgConfig({ ...ogConfig, ogDescription: e.target.value })} className={STYLES.inputField} />
											<div className="flex gap-2">
												<input placeholder="Site Name" value={ogConfig.siteName} onChange={(e) => setOgConfig({ ...ogConfig, siteName: e.target.value })} className={`${STYLES.inputField} flex-1`} />
												<label className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer border border-border px-2 rounded bg-muted/50">
													<input type="checkbox" checked={ogConfig.showDate} onChange={(e) => setOgConfig({ ...ogConfig, showDate: e.target.checked })} /> Date
												</label>
											</div>
										</div>

										{/* Appearance Section */}
										<div className="space-y-3">
											<div className={STYLES.controlGroupLabel}><Palette className="w-3.5 h-3.5" /> Background & Colors</div>
											<div className="flex items-center gap-4 p-2 border border-border rounded-lg bg-muted/30">
												<select value={ogConfig.bgType} onChange={(e: any) => setOgConfig({ ...ogConfig, bgType: e.target.value })} className="text-sm border border-border rounded p-1 bg-card text-foreground">
													<option value="solid">Solid Color</option>
													<option value="gradient">Gradient</option>
												</select>
												<div className="flex items-center gap-1">
													<input type="color" title="Start Color" value={ogConfig.bgColorStart} onChange={(e) => setOgConfig({ ...ogConfig, bgColorStart: e.target.value })} className={STYLES.colorInput} />
													{ogConfig.bgType === 'gradient' && <span className="text-muted-foreground">→</span>}
													{ogConfig.bgType === 'gradient' && <input type="color" title="End Color" value={ogConfig.bgColorEnd} onChange={(e) => setOgConfig({ ...ogConfig, bgColorEnd: e.target.value })} className={STYLES.colorInput} />}
												</div>
											</div>
											<div className="flex gap-4 justify-between">
												<div><div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Text</div><input type="color" value={ogConfig.textColor} onChange={(e) => setOgConfig({ ...ogConfig, textColor: e.target.value })} className={STYLES.colorInput} /></div>
												<div><div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Accent</div><input type="color" value={ogConfig.accentColor} onChange={(e) => setOgConfig({ ...ogConfig, accentColor: e.target.value })} className={STYLES.colorInput} /></div>
											</div>
										</div>

										{/* Typography & Layout */}
										<div className="space-y-3 md:col-span-2">
											<div className={`${STYLES.controlGroupLabel} border-t border-border pt-3`}><Layout className="w-3.5 h-3.5" /> Typography & Layout</div>
											<div className="flex flex-wrap items-center gap-4">
												<div className="flex rounded-md bg-muted/50 p-1 border border-border">
													<button onClick={() => handleAlignChange('start')} className={`${STYLES.iconBtn} ${ogConfig.alignment === 'flex-start' ? STYLES.iconBtnActive : ''}`}><AlignLeft className="w-4 h-4" /></button>
													<button onClick={() => handleAlignChange('center')} className={`${STYLES.iconBtn} ${ogConfig.alignment === 'center' ? STYLES.iconBtnActive : ''}`}><AlignCenter className="w-4 h-4" /></button>
													<button onClick={() => handleAlignChange('end')} className={`${STYLES.iconBtn} ${ogConfig.alignment === 'flex-end' ? STYLES.iconBtnActive : ''}`}><AlignRight className="w-4 h-4" /></button>
												</div>
												<select value={ogConfig.titleFontWeight} onChange={(e) => setOgConfig({ ...ogConfig, titleFontWeight: e.target.value })} className="text-sm border border-border rounded p-1.5 bg-card text-foreground">
													<option value="400">Normal</option> <option value="700">Bold</option> <option value="900">Black</option>
												</select>
												<div className="flex-1 flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
													Title Size: <input type="range" min="40" max="120" value={ogConfig.titleFontSize} onChange={(e) => setOgConfig({ ...ogConfig, titleFontSize: Number(e.target.value) })} className="w-24" />
													Desc Size: <input type="range" min="20" max="60" value={ogConfig.descFontSize} onChange={(e) => setOgConfig({ ...ogConfig, descFontSize: Number(e.target.value) })} className="w-20" />
												</div>
											</div>
										</div>
									</div>

									{/* LIVE PREVIEW */}
									<div className="mt-6">
										<div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Live Preview (1200 x 630)</div>
										<div className="border border-border rounded-xl overflow-hidden shadow-lg aspect-[1200/630] w-full mx-auto relative transition-all duration-300"
											style={{
												background: ogConfig.bgType === 'solid' ? ogConfig.bgColorStart : `linear-gradient(to bottom right, ${ogConfig.bgColorStart}, ${ogConfig.bgColorEnd})`,
												color: ogConfig.textColor,
												display: 'flex',
												flexDirection: 'column',
												alignItems: ogConfig.alignment,
												textAlign: ogConfig.textAlign,
												justifyContent: 'center',
												padding: '40px 60px'
											}}>

											<h1 style={{ fontSize: `${ogConfig.titleFontSize * 0.6}px`, fontWeight: ogConfig.titleFontWeight, lineHeight: 1.1 }} className="mb-2">
												{ogConfig.ogTitle || "Your Title"}
											</h1>
											<p style={{ fontSize: `${ogConfig.descFontSize * 0.6}px`, opacity: 0.9, marginBottom: '20px' }}>
												{ogConfig.ogDescription}
											</p>

											<div style={{ marginTop: 'auto', display: 'flex', gap: '15px', alignItems: 'center', width: '100%', justifyContent: ogConfig.alignment }}>
												<span style={{ color: ogConfig.accentColor, fontWeight: 'bold' }}>{ogConfig.siteName}</span>
												{ogConfig.showDate && <span className="opacity-60 text-sm">| {new Date().toLocaleDateString()}</span>}
											</div>
										</div>
									</div>
								</div>
							)}

						</div>

						{/* CODE OUTPUT */}
						<div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg flex flex-col mb-10">
							<div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-[#333]">
								<span className="text-xs text-gray-400 font-mono flex items-center gap-2">
									<FileText className="w-3 h-3" /> {getFileLabel()}
								</span>
								<button onClick={copyToClipboard} className="flex items-center gap-1.5 px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] uppercase font-bold rounded transition">
									{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? "Copied!" : "Copy Code"}
								</button>
							</div>
							<div className="p-4 overflow-x-auto relative group">
								<pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">{getActiveCode()}</pre>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}