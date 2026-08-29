import type { MetadataRoute } from 'next';
import { projects } from './work/projects';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zx-portfolio-nova.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
