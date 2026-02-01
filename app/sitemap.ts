import { MetadataRoute } from 'next';
import { toolsRegistry } from '@/config/tools';
import { DOMEIN } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;
	const locales = ['en', 'es', 'ru'];

	const routes = locales.flatMap(lang => ([
		{
			url: `${baseUrl}/${lang}`,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/${lang}/tools`,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/${lang}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.6,
		},
	]));

	const toolRoutes = Object.values(toolsRegistry).flatMap((tool) =>
		locales.map(lang => ({
			url: `${baseUrl}/${lang}/tools/${tool.slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		}))
	);

	return [...routes, ...toolRoutes];
}