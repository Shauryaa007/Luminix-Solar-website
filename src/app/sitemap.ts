import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://luminixsolar.com';

  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-03-01T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}

