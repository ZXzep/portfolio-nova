'use client';
import { ArrowDownLeft } from 'lucide-react';
import Link from 'next/link';
import { useT } from '../i18n/lang';

export default function NotFound() {
  const t = useT();
  return (
    <main className="case case-missing">
      <p>{t('cs_404_kicker')}</p>
      <h1>
        {t('cs_404_h').split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i === 0 ? <br /> : null}
          </span>
        ))}
      </h1>
      <Link href="/#archive">
        {t('cs_404_back')} <ArrowDownLeft className="ico" aria-hidden="true" />
      </Link>
    </main>
  );
}
