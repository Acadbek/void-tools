import { Code, Image, FileText, List, Smartphone, HelpCircle, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { STYLES, TabType, SeoData } from "./shared";

interface Props {
	activeTab: TabType;
	setActiveTab: (tab: TabType) => void;
	data: SeoData;
}

export default function SeoSidebar({ activeTab, setActiveTab, data }: Props) {
	const tabs = [
		{ id: "meta", label: "Metadata", icon: Code, group: "Core SEO" },
		{ id: "og-image", label: "OG Image Studio", icon: Image, group: "Visual & Rich" },
		{ id: "sitemap", label: "Sitemap.xml", icon: List, group: "Core SEO" },
		{ id: "robots", label: "Robots.txt", icon: FileText, group: "Core SEO" },
		{ id: "manifest", label: "Web Manifest", icon: Smartphone, group: "Visual & Rich" },
		{ id: "faq", label: "FAQ Schema", icon: HelpCircle, group: "Visual & Rich" },
	];

	const getAuditResult = () => {
		const issues = [];
		let score = 0;

		if (!data.title) {
			issues.push({ type: 'error', msg: "Title is missing" });
		} else if (data.title.length < 30) {
			issues.push({ type: 'warning', msg: "Title is too short (<30 chars)" });
			score += 15;
		} else if (data.title.length > 60) {
			issues.push({ type: 'warning', msg: "Title is too long (>60 chars)" });
			score += 20;
		} else {
			score += 30;
		}

		if (!data.description) {
			issues.push({ type: 'error', msg: "Description is missing" });
		} else if (data.description.length < 100) {
			issues.push({ type: 'warning', msg: "Description too short (<100 chars)" });
			score += 20;
		} else if (data.description.length > 160) {
			issues.push({ type: 'warning', msg: "Description too long (>160 chars)" });
			score += 30;
		} else {
			score += 40;
		}

		if (data.url && data.url.startsWith('http')) score += 15;
		else issues.push({ type: 'error', msg: "Invalid or missing URL" });

		if (data.author) score += 15;
		else issues.push({ type: 'warning', msg: "Author is missing" });

		return { score, issues };
	};

	const { score, issues } = getAuditResult();

	const scoreColor = score >= 90 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-red-500";
	const progressColor = score >= 90 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";

	return (
		<div className="w-full lg:w-64 flex flex-col gap-6 shrink-0">

			{/* 1. MENU */}
			<div className="flex flex-col gap-1.5">
				<div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Menu</div>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id as TabType)}
						className={`${STYLES.sidebarBtn} ${activeTab === tab.id ? STYLES.sidebarBtnActive : ''}`}
					>
						<tab.icon className="w-4 h-4" />
						{tab.label}
					</button>
				))}
			</div>

			<div className="bg-card border border-border rounded-xl p-4 shadow-sm">
				<div className="flex justify-between items-end mb-2">
					<span className="text-xs font-bold text-muted-foreground uppercase">SEO Health</span>
					<span className={`text-2xl font-black ${scoreColor}`}>{score}%</span>
				</div>

				<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-4">
					<div className={`h-full ${progressColor} transition-all duration-500`} style={{ width: `${score}%` }}></div>
				</div>

				<div className="space-y-2">
					{issues.length === 0 ? (
						<div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 p-2 rounded">
							<CheckCircle2 className="w-3.5 h-3.5" /> Perfect! No issues found.
						</div>
					) : (
						issues.slice(0, 3).map((issue, idx) => (
							<div key={idx} className="flex items-center gap-2 text-[11px] leading-tight">
								{issue.type === 'error' ? <XCircle className="w-3 h-3 text-red-500 shrink-0" /> : <AlertTriangle className="w-3 h-3 text-yellow-500 shrink-0" />}
								<span className="text-muted-foreground">{issue.msg}</span>
							</div>
						))
					)}
					{issues.length > 3 && <div className="text-[10px] text-gray-400 pl-5">...and {issues.length - 3} more</div>}
				</div>
			</div>

		</div>
	);
}