"use client";

import { useState, useEffect } from "react";
import { FileCode, Code as CodeIcon, RotateCcw } from "lucide-react";
import { SeoData, OgConfig, FaqItem, ManifestData, TabType } from "./shared";
import SeoSidebar from "./SeoSidebar";
import CodeViewer from "./CodeViewer";
import OgImageStudio from "./OgImageStudio";
import { MetadataForm, SitemapForm, ManifestForm, SchemaBuilder } from "./ConfigPanels";

const DEFAULT_DATA: SeoData = {
	title: "My Amazing App",
	description: "Build faster websites with our new tools.",
	url: "https://example.com",
	author: "Admin",
	twitterHandle: "@website",
};

const DEFAULT_OG: OgConfig = {
	ogTitle: "My Amazing App",
	ogDescription: "An incredible tool for modern web developers.",
	siteName: "example.com",
	showDate: true,
	bgType: 'solid',
	bgImage: "https://images.unsplash.com/photo-1767304590980-9c075c875c38?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	bgOverlayOpacity: 60,
	bgColorStart: "#171717",
	bgColorEnd: "#3b82f6",
	textColor: "#ffffff",
	accentColor: "#3b82f6",
	alignment: 'center',
	textAlign: 'center',
	titleFontSize: 64,
	titleFontWeight: '900',
	descFontSize: 32,
};

const DEFAULT_MANIFEST: ManifestData = {
	name: "My App",
	shortName: "App",
	themeColor: "#3b82f6",
	bgColor: "#ffffff",
	display: "standalone"
};

export default function UltimateSeoGenerator() {
	const [activeTab, setActiveTab] = useState<TabType>("meta");
	const [outputFormat, setOutputFormat] = useState<'nextjs' | 'html'>('nextjs');
	const [isLoaded, setIsLoaded] = useState(false);
	const [data, setData] = useState<SeoData>(DEFAULT_DATA);
	const [ogConfig, setOgConfig] = useState<OgConfig>(DEFAULT_OG);
	const [manifest, setManifest] = useState<ManifestData>(DEFAULT_MANIFEST);
	const [schemaType, setSchemaType] = useState<'faq' | 'product' | 'article'>('faq');
	const [faqItems, setFaqItems] = useState<FaqItem[]>([{ question: "Is this free?", answer: "Yes." }]);

	useEffect(() => {
		const saved = localStorage.getItem("seo-gen-data");
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				if (parsed.data) setData(parsed.data);
				if (parsed.ogConfig) setOgConfig(parsed.ogConfig);
				if (parsed.manifest) setManifest(parsed.manifest);
				if (parsed.faqItems) setFaqItems(parsed.faqItems);
			} catch (e) { console.error("Failed to load saved data"); }
		}
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("seo-gen-data", JSON.stringify({ data, ogConfig, manifest, faqItems }));
		}
	}, [data, ogConfig, manifest, faqItems, isLoaded]);

	const handleReset = () => {
		if (confirm("Are you sure you want to clear all data?")) {
			setData(DEFAULT_DATA);
			setOgConfig(DEFAULT_OG);
			setManifest(DEFAULT_MANIFEST);
			setFaqItems([{ question: "Is this free?", answer: "Yes." }]);
			localStorage.removeItem("seo-gen-data");
		}
	};

	const generateHtmlMeta = () => {
		return `<title>${data.title}</title>
		<meta name="title" content="${data.title}" />
		<meta name="description" content="${data.description}" />
		<link rel="canonical" href="${data.url}" />
		<meta name="author" content="${data.author}" />

		<meta property="og:type" content="website" />
		<meta property="og:url" content="${data.url}" />
		<meta property="og:title" content="${data.title}" />
		<meta property="og:description" content="${data.description}" />
		<meta property="og:image" content="${data.url}/api/og" />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="${data.url}" />
		<meta property="twitter:title" content="${data.title}" />
		<meta property="twitter:description" content="${data.description}" />
		<meta property="twitter:image" content="${data.url}/api/og" />
		<meta property="twitter:creator" content="${data.twitterHandle}" />`;
	};

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
    locale: 'en_US', type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "${data.title}",
    description: "${data.description}",
    images: ["/api/og"],
    creator: "${data.twitterHandle}",
  },
  manifest: '/manifest.json',
};`;

	const generateOgRouteCode = () => {
		let bgStyleCode = "";
		if (ogConfig.bgType === 'image') {
			bgStyleCode = `backgroundImage: 'url(${ogConfig.bgImage})', backgroundSize: 'cover', backgroundPosition: 'center'`;
		} else if (ogConfig.bgType === 'solid') {
			bgStyleCode = `backgroundColor: '${ogConfig.bgColorStart}'`;
		} else {
			bgStyleCode = `background: 'linear-gradient(to bottom right, ${ogConfig.bgColorStart}, ${ogConfig.bgColorEnd})'`;
		}

		const overlayCode = ogConfig.bgType === 'image' ? `
        <div style={{
          position: 'absolute', inset: 0, backgroundColor: 'black', opacity: ${ogConfig.bgOverlayOpacity / 100}
        }} />` : '';

		return `import { ImageResponse } from 'next/og';\n\nexport const runtime = 'edge';\n\nexport async function GET() {\n  return new ImageResponse(\n    (\n      <div\n        style={{\n          height: '100%', width: '100%', display: 'flex', flexDirection: 'column',\n          alignItems: '${ogConfig.alignment}', justifyContent: 'center',\n          ${bgStyleCode},\n          padding: '40px 60px', textAlign: '${ogConfig.textAlign}',\n          position: 'relative',\n        }}\n      >\n        ${overlayCode}\n        
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: '${ogConfig.alignment}', width: '100%' }}>
          <div style={{ fontSize: ${ogConfig.titleFontSize}, fontWeight: '${ogConfig.titleFontWeight}', color: '${ogConfig.textColor}', lineHeight: 1.1, marginBottom: '20px' }}>\n            ${ogConfig.ogTitle}\n          </div>\n          <div style={{ fontSize: ${ogConfig.descFontSize}, color: '${ogConfig.textColor}', opacity: 0.9, marginBottom: '30px' }}>\n            ${ogConfig.ogDescription}\n          </div>\n          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: 'auto', width: '100%', justifyContent: '${ogConfig.alignment}' }}>\n              <div style={{ fontSize: 24, color: '${ogConfig.accentColor}', fontWeight: 'bold' }}>${ogConfig.siteName}</div>\n              ${ogConfig.showDate ? `<div style={{ fontSize: 20, color: '${ogConfig.textColor}', opacity: 0.8 }}>| ${new Date().toLocaleDateString()}</div>` : ''}\n          </div>\n        </div>\n      </div>\n    ),\n    { width: 1200, height: 630 }\n  );\n}`;
	};

	const generateSchemaCode = () => {
		const json = schemaType === 'faq'
			? { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }
			: schemaType === 'article'
				? { "@context": "https://schema.org", "@type": "Article", "headline": data.title, "author": { "@type": "Person", "name": data.author } }
				: { "@context": "https://schema.org/", "@type": "Product", "name": data.title, "description": data.description };

		return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
	};

	const getActiveCode = () => {
		if (activeTab === "og-image") return generateOgRouteCode();

		if (outputFormat === 'html') {
			switch (activeTab) {
				case 'meta': return generateHtmlMeta();
				case 'sitemap': return `\n<a href="${data.url}/sitemap.xml">Sitemap</a>`;
				case 'manifest': return `<link rel="manifest" href="/manifest.json" />`;
				case 'robots': return `User-Agent: *\nAllow: /\nSitemap: ${data.url}/sitemap.xml`;
				case 'faq': return generateSchemaCode();
				default: return '';
			}
		}

		switch (activeTab) {
			case "sitemap": return `import { MetadataRoute } from 'next'\n\nexport default function sitemap(): MetadataRoute.Sitemap {\n  const baseUrl = '${data.url}'\n  return [{ url: baseUrl, lastModified: new Date() }]\n}`;
			case "manifest": return JSON.stringify(manifest, null, 2);
			case "faq": return generateSchemaCode();
			case "robots": return `User-Agent: *\nAllow: /\nSitemap: ${data.url}/sitemap.xml`;
			default: return generateMetadataCode();
		}
	};

	const getFileLabel = () => {
		if (outputFormat === 'html' && activeTab === 'meta') return 'index.html (<head>)';
		if (activeTab === 'og-image') return 'app/api/og/route.tsx';
		return activeTab === 'meta' ? 'app/layout.tsx' : 'Output';
	};

	if (!isLoaded) return null;

	return (
		<div className="min-h-screen bg-background p-4 md:p-8 transition-colors duration-300">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">

					<div className="flex flex-col gap-4 w-full lg:w-64 shrink-0">
						<SeoSidebar activeTab={activeTab} setActiveTab={setActiveTab} data={data} />

						<div className="mt-auto pt-4 border-t border-border">
							<button onClick={handleReset} className="w-full flex items-center justify-center gap-2 text-xs font-bold text-destructive hover:bg-destructive/10 py-2 rounded-lg transition-colors">
								<RotateCcw className="w-3.5 h-3.5" /> Reset All Data
							</button>
						</div>
					</div>

					<div className="flex-1 space-y-6 min-w-0">
						<div className="bg-card p-4 md:p-6 rounded-2xl border border-border shadow-sm transition-colors">

							{activeTab === 'meta' && <MetadataForm data={data} setData={setData} ogConfig={ogConfig} />}

							{activeTab === 'sitemap' && <SitemapForm data={data} setData={setData} />}
							{activeTab === 'manifest' && <ManifestForm manifest={manifest} setManifest={setManifest} />}
							{activeTab === 'faq' && <SchemaBuilder items={faqItems} setItems={setFaqItems} schemaType={schemaType} setSchemaType={setSchemaType} />}
							{activeTab === 'robots' && <div className="animate-in fade-in"><h3 className="font-bold text-foreground mb-2">Robots.txt</h3><p className="text-sm text-muted-foreground">Standard allow all.</p></div>}
							{activeTab === 'og-image' && <OgImageStudio config={ogConfig} setConfig={setOgConfig} />}

						</div>

						<div className="space-y-3">
							{activeTab !== 'og-image' && (
								<div className="flex items-center justify-end gap-2">
									<span className="text-xs font-bold text-muted-foreground uppercase">Output Format:</span>
									<div className="bg-muted p-1 rounded-lg flex gap-1">
										<button onClick={() => setOutputFormat('nextjs')} className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${outputFormat === 'nextjs' ? 'bg-background shadow-sm text-foreground ring-1 ring-border' : 'text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs'}`}>
											<FileCode className="w-3.5 h-3.5" /> Next.js
										</button>
										<button onClick={() => setOutputFormat('html')} className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${outputFormat === 'html' ? 'bg-background shadow-sm text-foreground ring-1 ring-border' : 'text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs'}`}>
											<CodeIcon className="w-3.5 h-3.5" /> HTML
										</button>
									</div>
								</div>
							)}

							<CodeViewer code={getActiveCode()} label={getFileLabel()} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}