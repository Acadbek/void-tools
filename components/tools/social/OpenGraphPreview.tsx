"use client";

import { useState } from "react";
import {
    Search, RefreshCw, Image as ImageIcon,
    Globe, LayoutTemplate, Smartphone,
    Facebook, Linkedin, Twitter, Send, Instagram, Cloud,
    CheckCheck,
    MessageCircle,
    Repeat2,
    Heart,
    BarChart2,
    Share,
    MoreHorizontal,
    MessageSquare,
    ThumbsUp,
    Repeat,
    AlertTriangle
} from "lucide-react";
import { fetchOpenGraphData, OGData } from "@/app/actions/get-og";

type Platform = "facebook" | "twitter" | "linkedin" | "telegram" | "bluesky" | "instagram";

const DEFAULT_DATA: OGData = {
    title: "Open Graph Preview Tool",
    description: "Preview how your content looks on social media before you share it. Supports FB, X, LinkedIn and more.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    url: "https://example.com",
    siteName: "example.com"
};

export default function OpenGraphPreview() {
    const [url, setUrl] = useState("");
    const [data, setData] = useState<OGData>(DEFAULT_DATA);
    const [loading, setLoading] = useState(false);
    const [platform, setPlatform] = useState<Platform>("facebook");
    const [error, setError] = useState<string | null>(null);

    const handleFetch = async () => {
        if (!url.trim()) return;
        setLoading(true);
        setError(null);

        const res = await fetchOpenGraphData(url);

        if (res.success && res.data) {
            setData(res.data);
        } else {
            setError(res.error || "Error fetching URL");
        }
        setLoading(false);
    };

    const handleManualChange = (key: keyof OGData, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    // --- PLATFORM PREVIEWS ---

    const FacebookPreview = () => (
        <div className="bg-[#f0f2f5] p-4 rounded-xl max-w-[500px] mx-auto font-sans">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="aspect-[1.91/1] w-full bg-gray-100 relative overflow-hidden">
                    {data.image ? (
                        <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-300"><ImageIcon className="w-12 h-12" /></div>
                    )}
                </div>
                <div className="p-3 bg-[#f0f2f5] border-t border-gray-200">
                    <p className="text-[12px] text-gray-600 uppercase truncate mb-0.5">{new URL(data.url).hostname}</p>
                    <h4 className="text-[16px] font-bold text-[#050505] leading-tight mb-1 line-clamp-2">{data.title}</h4>
                    <p className="text-[14px] text-gray-600 line-clamp-1">{data.description}</p>
                </div>
            </div>
        </div>
    );

    const TwitterPreview = () => (
        <div className="bg-black p-4 rounded-xl max-w-[400px] mx-auto font-sans border border-gray-800">
            {/* User Header */}
            <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0 overflow-hidden">
                    {/* Fake Avatar */}
                    <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 truncate">
                            <span className="font-bold text-[#e7e9ea] text-[15px] truncate">X User</span>
                            <span className="text-blue-400">
                                <svg viewBox="0 0 22 22" aria-label="Verified account" className="w-4 h-4 fill-current"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.687.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                            </span>
                            <span className="text-[#71767b] text-[15px] ml-1 truncate">@username · 2m</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
                    </div>

                    {/* Main Card */}
                    <div className="mt-1">
                        {/* Image Container with Rounded Corners */}
                        <div className="rounded-2xl border border-[#333639] overflow-hidden relative bg-[#16181c]">
                            <div className="aspect-[1.91/1] w-full relative">
                                {data.image ? (
                                    <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-[#71767b]"><ImageIcon className="w-12 h-12" /></div>
                                )}

                                {/* Title Overlay (Bottom of image) */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-2 px-3">
                                    <h4 className="text-white text-[15px] font-medium leading-snug truncate">
                                        {data.title}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        {/* Domain Source (Outside/Below the card) */}
                        <div className="mt-1 flex items-center gap-1 text-[#71767b] text-[13px]">
                            From {new URL(data.url).hostname}
                        </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex justify-between items-center mt-3 text-[#71767b] max-w-[300px]">
                        <MessageCircle className="w-[18px] h-[18px]" />
                        <Repeat2 className="w-[18px] h-[18px]" />
                        <Heart className="w-[18px] h-[18px]" />
                        <BarChart2 className="w-[18px] h-[18px]" />
                        <Share className="w-[18px] h-[18px]" />
                    </div>
                </div>
            </div>
        </div>
    );

    const LinkedInPreview = () => (
        <div className="bg-black p-5 rounded-xl max-w-[420px] mx-auto font-sans text-white border border-gray-800">
            {/* Post Description Context */}
            <div className="text-[14px] leading-snug mb-3 text-white">
                To wrap up 2025, Andrei Neagoie put together his top 10 favorite articles from the year.
                <span className="text-gray-400 ml-1 cursor-pointer">...more</span>
            </div>

            {/* The Card */}
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#333] flex pr-2 cursor-pointer hover:bg-[#252525] transition-colors">
                {/* Image (Left) */}
                <div className="w-[120px] h-[80px] shrink-0 bg-gray-800 relative">
                    {data.image ? (
                        <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500"><ImageIcon className="w-8 h-8" /></div>
                    )}
                </div>

                {/* Content (Right) */}
                <div className="flex-1 pl-3 py-2 flex flex-col justify-center min-w-0">
                    <h4 className="text-[14px] font-semibold text-white leading-tight line-clamp-2 mb-1">
                        {data.title}
                    </h4>
                    <p className="text-[12px] text-gray-400 truncate">
                        {new URL(data.url).hostname}
                    </p>
                </div>
            </div>

            {/* Social Proof (Likes) */}
            <div className="flex items-center justify-between mt-2 mb-3 text-[12px] text-gray-400 px-1">
                <div className="flex items-center gap-1">
                    <div className="bg-[#378fe9] rounded-full p-[2px]">
                        <ThumbsUp className="w-2 h-2 text-white fill-white" />
                    </div>
                    <span>2</span>
                </div>
                <span>1 repost</span>
            </div>

            <hr className="border-gray-800 mb-2" />

            {/* Action Buttons */}
            <div className="flex justify-between px-2 text-gray-400">
                <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-800/50 p-1 rounded transition-colors group">
                    <ThumbsUp className="w-5 h-5 group-hover:text-white" />
                    <span className="text-[10px] font-medium group-hover:text-white">Like</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-800/50 p-1 rounded transition-colors group">
                    <MessageSquare className="w-5 h-5 group-hover:text-white" />
                    <span className="text-[10px] font-medium group-hover:text-white">Comment</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-800/50 p-1 rounded transition-colors group">
                    <Repeat className="w-5 h-5 group-hover:text-white" />
                    <span className="text-[10px] font-medium group-hover:text-white">Repost</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-800/50 p-1 rounded transition-colors group">
                    <Send className="w-5 h-5 rotate-45 group-hover:text-white -ml-1 mt-0.5" />
                    <span className="text-[10px] font-medium group-hover:text-white">Send</span>
                </div>
            </div>
        </div>
    );

    const TelegramPreview = () => (
        <div className="bg-[#8caec5] p-6 rounded-xl max-w-[450px] mx-auto font-sans bg-pattern flex justify-end">
            {/* Message Bubble (Outgoing style: Light Green) */}
            <div className="bg-[#effdde] p-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-sm max-w-[380px] min-w-[280px] relative">

                {/* 1. Link Text (User typed this) */}
                <div className="text-[#3390ec] text-[15px] mb-1.5 break-all hover:underline cursor-pointer px-1">
                    {data.url}
                </div>

                {/* 2. The Preview Card (Left Border Style) */}
                <div className="border-l-[2px] border-[#64b5ef] pl-2.5 cursor-pointer hover:bg-[#e4f4d2] transition-colors rounded-r-md">

                    {/* Site Name */}
                    <div className="text-[#3390ec] font-bold text-[14px] mb-0.5">
                        {data.siteName || new URL(data.url).hostname}
                    </div>

                    {/* Title */}
                    <div className="text-black font-bold text-[14px] leading-snug mb-1">
                        {data.title}
                    </div>

                    {/* Description */}
                    <div className="text-black text-[14px] leading-snug line-clamp-3 mb-1.5 opacity-90">
                        {data.description}
                    </div>

                    {/* Large Image (Bottom) */}
                    {data.image && (
                        <div className="mt-1 mb-1 rounded overflow-hidden">
                            <img src={data.image} alt="Preview" className="w-full h-auto object-cover max-h-[250px]" />
                        </div>
                    )}
                </div>

                {/* Timestamp & Status */}
                <div className="flex items-center justify-end gap-1 mt-1 pr-1">
                    <span className="text-[#5db048] text-[11px]">12:49 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#5db048]" />
                </div>

            </div>
        </div>
    );

    const BlueskyPreview = () => (
        <div className="bg-[#161e27] p-5 rounded-xl max-w-[420px] mx-auto font-sans text-white border border-gray-800">
            {/* User Info Row */}
            <div className="flex gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-600 shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-linear-to-br from-indigo-500 to-pink-500"></div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-[15px] leading-tight">User</span>
                        <span className="text-[#7a8694] text-[14px]">@user · 7h</span>
                    </div>

                    {/* Post Link */}
                    <div className="text-[#3b82f6] text-[15px] mt-0.5 mb-2 truncate">
                        {data.url}
                    </div>

                    {/* Post Text */}
                    <div className="text-[15px] mb-3 leading-snug">
                        Check out this interesting article about {data.siteName || "the news"}.
                    </div>

                    {/* THE CARD */}
                    <div className="border border-[#2e4052] rounded-xl overflow-hidden hover:opacity-95 transition-opacity cursor-pointer">
                        {/* Image Area */}
                        <div className="aspect-[1.91/1] w-full bg-[#1e2936] relative border-b border-[#2e4052]">
                            {data.image ? (
                                <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[#7a8694]"><ImageIcon className="w-10 h-10" /></div>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="p-3 bg-[#1e2936]">
                            <h4 className="text-white font-bold text-[15px] leading-tight mb-1 line-clamp-2">
                                {data.title}
                            </h4>
                            <p className="text-[#aeb7c3] text-[14px] leading-snug line-clamp-2 mb-2">
                                {data.description}
                            </p>

                            {/* Domain Footer */}
                            <div className="flex items-center gap-1.5 text-[#aeb7c3] text-[13px]">
                                <Globe className="w-3.5 h-3.5" />
                                <span className="truncate">{new URL(data.url).hostname}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="flex justify-between items-center mt-3 pr-8">
                        <div className="flex items-center gap-1.5 text-[#7a8694] group cursor-pointer hover:text-blue-400">
                            <MessageSquare className="w-[18px] h-[18px]" />
                            <span className="text-xs">204</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#7a8694] group cursor-pointer hover:text-green-400">
                            <Repeat2 className="w-[18px] h-[18px]" />
                            <span className="text-xs">648</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#7a8694] group cursor-pointer hover:text-pink-400">
                            <Heart className="w-[18px] h-[18px]" />
                            <span className="text-xs">1.4K</span>
                        </div>
                        <div className="text-[#7a8694] cursor-pointer hover:text-blue-400">
                            <MoreHorizontal className="w-[18px] h-[18px]" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

    const InstagramPreview = () => (
        <div className="bg-white border border-gray-200 p-6 rounded-xl max-w-[400px] mx-auto font-sans">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="text-sm font-semibold">instagram_user</div>
            </div>
            {/* Instagram DM style link */}
            <div className="flex justify-end">
                <div className="bg-[#efefef] rounded-2xl p-4 max-w-[280px] overflow-hidden">
                    <div className="rounded-lg overflow-hidden mb-2">
                        {data.image ? (
                            <img src={data.image} alt="Preview" className="w-full h-32 object-cover" />
                        ) : (
                            <div className="w-full h-32 bg-gray-200"></div>
                        )}
                    </div>
                    <h4 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{data.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{data.description}</p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase">{new URL(data.url).hostname}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">

            {/* --- LEFT PANEL: CONFIG --- */}
            <div className="w-full lg:w-[400px] flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-shrink-0">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-sm">Source & Content</h3>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {/* URL Input */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Website URL</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                                    placeholder="https://example.com"
                                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <button
                                onClick={handleFetch}
                                disabled={loading}
                                className="px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                            >
                                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                        </div>
                        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Manual Overrides */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-800">Manual Override</h4>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleManualChange("title", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => handleManualChange("description", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.image}
                                    onChange={(e) => handleManualChange("image", e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
                        <div className="flex items-start gap-2 text-amber-600 mb-2">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <h4 className="font-bold text-sm">Why is the preview working here but not on the actual platform?</h4>
                        </div>
                        <p className="text-xs text-amber-700 leading-relaxed mt-2">
                            This tool fetches website data by simulating a standard visitor. However, platforms like X (Twitter), Bluesky, LinkedIn, and Telegram use their own specific "crawler bots" to generate previews.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL: PREVIEW --- */}
            <div className="flex-1 flex flex-col min-w-0 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                {/* Tabs */}
                <div className="border-b border-gray-200 bg-gray-50/50 p-2 overflow-x-auto">
                    <div className="flex gap-1 min-w-max">
                        {[
                            { id: 'facebook', icon: Facebook, label: 'Facebook' },
                            { id: 'twitter', icon: Twitter, label: 'X / Twitter' },
                            { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                            { id: 'telegram', icon: Send, label: 'Telegram' },
                            { id: 'bluesky', icon: Cloud, label: 'Bluesky' },
                            { id: 'instagram', icon: Instagram, label: 'Instagram DM' },
                        ].map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPlatform(p.id as Platform)}
                                className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all
                            ${platform === p.id
                                        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                    }
                        `}
                            >
                                <p.icon className="w-3.5 h-3.5" />
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-gray-100/50 p-8 overflow-y-auto flex items-center justify-center relative">
                    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
                        {platform === 'facebook' && <FacebookPreview />}
                        {platform === 'twitter' && <TwitterPreview />}
                        {platform === 'linkedin' && <LinkedInPreview />}
                        {platform === 'telegram' && <TelegramPreview />}
                        {platform === 'bluesky' && <BlueskyPreview />}
                        {platform === 'instagram' && <InstagramPreview />}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="bg-white p-3 border-t border-gray-200 text-xs text-gray-400 text-center">
                    Preview is an approximation. Actual display may vary by device.
                </div>

            </div>
        </div>
    );
}