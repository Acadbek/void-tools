"use server";

export interface OGData {
	title: string;
	description: string;
	image: string;
	url: string;
	siteName?: string;
}

export async function fetchOpenGraphData(url: string): Promise<{ success: boolean; data?: OGData; error?: string }> {
	try {
		if (!url.startsWith("http")) {
			return { success: false, error: "URL must start with http:// or https://" };
		}

		const response = await fetch(url, {
			headers: {
				"User-Agent": "bot-crawler-preview",
			},
			next: { revalidate: 3600 }
		});

		if (!response.ok) throw new Error("Failed to fetch URL");

		const html = await response.text();

		const getMetaContent = (prop: string) => {
			const regex = new RegExp(`<meta property="${prop}" content="([^"]*)"`, "i");
			const match = html.match(regex);
			if (match) return match[1];

			const regexName = new RegExp(`<meta name="${prop}" content="([^"]*)"`, "i");
			const matchName = html.match(regexName);
			return matchName ? matchName[1] : "";
		};

		let image = getMetaContent("og:image");
		if (!image) image = getMetaContent("twitter:image");

		let title = getMetaContent("og:title");
		if (!title) title = getMetaContent("twitter:title");
		if (!title) {
			const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
			title = titleMatch ? titleMatch[1] : "";
		}

		let description = getMetaContent("og:description");
		if (!description) description = getMetaContent("twitter:description");
		if (!description) description = getMetaContent("description");

		if (image && !image.startsWith("http")) {
			const urlObj = new URL(url);
			image = `${urlObj.protocol}//${urlObj.host}${image}`;
		}

		return {
			success: true,
			data: {
				title: title || "No Title Found",
				description: description || "No description provided.",
				image: image || "",
				url: url,
				siteName: getMetaContent("og:site_name") || new URL(url).hostname
			}
		};

	} catch (error) {
		console.error(error);
		return { success: false, error: "Could not fetch data. Check URL." };
	}
}
