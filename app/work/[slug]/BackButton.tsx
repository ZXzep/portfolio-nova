'use client';
import { ArrowDownLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Returns to wherever the visitor came from (restoring their scroll position on
// the homepage) when they navigated here from within the site; otherwise follows
// the normal in-site fallback link.
export default function BackButton({ fallback = '/#archive', label = 'BACK' }: { fallback?: string; label?: string }) {
  const router = useRouter();

  return (
    <a
      href={fallback}
      className="case-back"
      onClick={(e) => {
        let sameOrigin = false;
        try {
          sameOrigin = !document.referrer || new URL(document.referrer).origin === location.origin;
        } catch {
          sameOrigin = false;
        }
        // Signal the homepage to restore the scroll position we left from.
        try {
          sessionStorage.setItem('home:restore', String(Date.now()));
        } catch {
          /* private mode */
        }
        if (window.history.length > 1 && sameOrigin) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      <b><ArrowDownLeft className="ico" aria-hidden="true" /></b>
      {label}
    </a>
  );
}
