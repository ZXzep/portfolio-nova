import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { projectBySlug, projectRedirects, projects } from '../projects';
import CaseStudy from './CaseStudy';

type Props = { params: Promise<{ slug: string }> };

// All case studies are known at build time — prerender them, don't SSR per request.
export const dynamic = 'force-static';
export const dynamicParams = true;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return { title: 'Project not found' };
  // `images` is intentionally omitted so Next picks up the co-located
  // opengraph-image / twitter-image route handlers.
  return {
    title: p.title,
    description: p.summary.en,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: 'article',
      title: `${p.title} — Punnathat Samoprong`,
      description: p.summary.en,
      url: `/work/${p.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.title} — Punnathat Samoprong`,
      description: p.summary.en,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) {
    if (projectRedirects[slug]) redirect(`/work/${projectRedirects[slug]}`);
    notFound();
  }
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return <CaseStudy project={project} next={next} index={index} />;
}
