'use client';
import Image from 'next/image';
import Link from 'next/link';

// Shared site brand mark — identical treatment on the homepage top bar and the
// case-study nav so navigation feels like one site.
export default function BrandMark({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const inner = (
    <>
      <div className="brand-logo-container">
        <div className="logo-glow-aura" aria-hidden="true" />
        <div className="logo-orbit-ring ring-a" aria-hidden="true" />
        <div className="logo-orbit-ring ring-b" aria-hidden="true" />
        <div className="logo-sparkle s1" aria-hidden="true">✦</div>
        <div className="logo-sparkle s2" aria-hidden="true">✦</div>
        <div className="logo-img-wrapper">
          <Image src="/brand-icon.png" alt="" width={42} height={42} priority className="brand-logo-img" />
        </div>
      </div>
      <span className="topbar-brand-name">PORTFOLIO</span>
    </>
  );
  return href.startsWith('#') ? (
    <a href={href} className="mark brand-logo-link" aria-label={label} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <Link href={href} className="mark brand-logo-link" aria-label={label} onClick={onClick}>
      {inner}
    </Link>
  );
}
