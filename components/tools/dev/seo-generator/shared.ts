export const STYLES = {
	sidebarBtn: "w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium text-muted-foreground hover:bg-muted border border-transparent",
	sidebarBtnActive: "bg-primary/10 text-primary border-primary/20",
	inputField: "w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow bg-background text-foreground placeholder:text-muted-foreground",
	controlGroupLabel: "text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1.5",
	colorInput: "w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent",
	iconBtn: "p-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition",
	iconBtnActive: "bg-primary/10 text-primary border-primary/20"
};

export type TabType = "meta" | "og-image" | "sitemap" | "robots" | "manifest" | "faq";

export type SeoData = {
	title: string;
	description: string;
	url: string;
	author: string;
	twitterHandle: string;
};

export type OgConfig = {
	ogTitle: string;
	ogDescription: string;
	siteName: string;
	showDate: boolean;
	bgType: 'solid' | 'gradient' | 'image';
	bgImage: string;
	bgOverlayOpacity: number;
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

export type FaqItem = { question: string; answer: string; };
export type ManifestData = { name: string; shortName: string; themeColor: string; bgColor: string; display: string; };