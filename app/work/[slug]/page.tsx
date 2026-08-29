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
  return {
    title: `${p.title} — Punnathat Samoprong`,
    description: p.summary.en,
    openGraph: { title: p.title, description: p.summary.en, images: [] },
    twitter: { title: p.title, description: p.summary.en, images: [] },
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
