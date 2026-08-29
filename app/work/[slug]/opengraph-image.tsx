import { ImageResponse } from 'next/og';
import { projectBySlug, projects } from '../projects';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Prerender one card per case study alongside the pages themselves.
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max)).trimEnd() + '…';
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  const accent = p?.accent ?? '#8e6cff';
  const title = p?.title ?? 'Case Study';
  const blurb = p?.summary.en ?? '';
  const category = p?.category ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px 100px',
          background:
            'radial-gradient(circle at 26% 18%, #160e33 0%, #0a0613 58%, #050508 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: accent,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 21,
            color: accent,
            letterSpacing: 5,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 18, height: 18, background: accent, transform: 'rotate(45deg)' }} />
          <span>CASE STUDY{category ? `  ·  ${category}` : ''}</span>
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            color: '#f5f3ee',
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 25,
            color: '#b7b6c1',
            marginTop: 26,
            lineHeight: 1.42,
            maxWidth: 900,
          }}
        >
          {clamp(blurb, 128)}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 74,
            left: 100,
            fontSize: 18,
            color: '#73737c',
            letterSpacing: 4,
          }}
        >
          PUNNATHAT SAMOPRONG
        </div>
      </div>
    ),
    { ...size },
  );
}
