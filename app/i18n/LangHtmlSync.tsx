'use client';
import { useEffect } from 'react';
import { useLang } from './lang';

// Keeps <html lang> in sync with the stored language so [lang="th"] CSS applies
// even on a fresh load where no toggle was clicked.
export default function LangHtmlSync() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
