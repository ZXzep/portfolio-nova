import { ImageResponse } from 'next/og';

export const alt = 'Punnathat Samoprong — Creative Technologist & Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Homepage share card. Latin only — Satori's bundled font has no Thai coverage,
// and the on-page copy already carries the bilingual version.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 50% 34%, #1b1147 0%, #0a0613 55%, #050508 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: '1px solid rgba(142,108,255,0.35)',
            borderRadius: 22,
          }}
        />
        <div
          style={{
            width: 58,
            height: 58,
            background: '#a78fff',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 60px #8e6cff',
            marginBottom: 46,
          }}
        />
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            color: '#f5f3ee',
            letterSpacing: -1.5,
            textAlign: 'center',
          }}
        >
          PUNNATHAT SAMOPRONG
        </div>
        <div style={{ fontSize: 29, color: '#c4c3ce', marginTop: 22, letterSpacing: 0.5 }}>
          Creative Technologist &nbsp;·&nbsp; Full-Stack Developer
        </div>
        <div
          style={{
            display: 'flex',
            gap: 18,
            marginTop: 40,
            fontSize: 19,
            color: '#9d81ff',
            letterSpacing: 5,
          }}
        >
          <span>DESIGN</span>
          <span>·</span>
          <span>CODE</span>
          <span>·</span>
          <span>3D</span>
          <span>·</span>
          <span>ENTERPRISE</span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 74,
            fontSize: 17,
            color: '#73737c',
            letterSpacing: 4,
          }}
        >
          BANGKOK, THAILAND
        </div>
      </div>
    ),
    { ...size },
  );
}
