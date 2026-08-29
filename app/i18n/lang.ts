'use client';
import { useSyncExternalStore } from 'react';
import { dict, type DictKey } from './dict';

export type Lang = 'en' | 'th';

const KEY = 'ps:lang';
const EVT = 'ps:lang-change';

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener('storage', cb);
  };
}

function getSnapshot(): Lang {
  try {
    const s = localStorage.getItem(KEY);
    if (s === 'en' || s === 'th') return s;
    return navigator.language?.toLowerCase().startsWith('th') ? 'th' : 'en';
  } catch {
    return 'en';
  }
}

const getServerSnapshot = (): Lang => 'en';

export function setLang(l: Lang) {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    /* private mode */
  }
  document.documentElement.lang = l;
  window.dispatchEvent(new Event(EVT));
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { lang, setLang };
}

/** UI-chrome translator. */
export function useT() {
  const { lang } = useLang();
  return (k: DictKey) => dict[k][lang];
}

/** Pick the right side of a bilingual value from content data. */
export function useLocalize() {
  const { lang } = useLang();
  return <T,>(v: { en: T; th: T }) => v[lang];
}
