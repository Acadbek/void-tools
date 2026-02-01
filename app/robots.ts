import { MetadataRoute } from 'next';
import { DOMEIN } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DOMEIN;

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/tools', '/tools/*'],
        disallow: '/private/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
