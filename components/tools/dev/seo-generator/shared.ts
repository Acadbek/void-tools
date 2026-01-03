export const STYLES = {
	sidebarBtn: "w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent",
	sidebarBtnActive: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50",
	inputField: "w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500",
	controlGroupLabel: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-1.5",
	colorInput: "w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent",
	iconBtn: "p-1.5 rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition",
	iconBtnActive: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
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