import { MetadataRoute } from 'next';
import { toolsRegistry } from '@/config/tools';
import { DOMEIN } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;

	const routes = [
		'',
		'/tools',
		'/blog'
		// Agar 'about', 'contact' sahifalari bo'lsa shu yerga qo'shasiz
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: 'daily' as const,
		priority: 1,
	}));

	const toolRoutes = Object.values(toolsRegistry).map((tool) => ({
		url: `${baseUrl}/tools/${tool.slug}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}));

	return [...routes, ...toolRoutes];
}