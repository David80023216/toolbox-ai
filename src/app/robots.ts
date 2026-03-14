import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search?*'],
      },
    ],
    sitemap: 'https://toolbox.ai/sitemap.xml',
    host: 'https://toolbox.ai',
  };
}
