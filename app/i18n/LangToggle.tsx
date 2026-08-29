'use client';
import { Languages } from 'lucide-react';
import { useLang } from './lang';

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  const label = lang === 'en' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English';
  return (
    <button
      type="button"
      className={`lang-toggle ${className}`}
      onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
      aria-label={label}
      title={label}
    >
      <Languages size={16} strokeWidth={1.7} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
