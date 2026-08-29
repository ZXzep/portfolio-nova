'use client';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '../../i18n/lang';
import { imgDims } from '../image-dims';

export default function Gallery({ images, title, accent }: { images: string[]; title: string; accent: string }) {
  const t = useT();
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  const lightbox = open !== null && (
    <div
      className="case-lightbox"
      style={{ '--case-accent': accent } as React.CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      onClick={close}
    >
      <button className="lb-close" onClick={close} aria-label={t('cs_lb_close')}>
        <X className="ico" aria-hidden="true" />
      </button>
      {images.length > 1 && (
        <>
          <button
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label={t('cs_lb_prev')}
          >
            <ChevronLeft className="ico" aria-hidden="true" />
          </button>
          <button
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label={t('cs_lb_next')}
          >
            <ChevronRight className="ico" aria-hidden="true" />
          </button>
        </>
      )}
      <figure className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lb-frame">
          <Image
            className="lb-img"
            style={{ objectFit: 'contain' }}
            src={images[open]}
            alt={`${title} frame ${open + 1}`}
            fill
            sizes="94vw"
            quality={90}
            priority
          />
        </div>
        <figcaption>
          {String(open + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} — {title}
        </figcaption>
      </figure>
    </div>
  );

  return (
    <>
      <div className={`case-gallery-grid ${images.length === 1 ? 'single' : ''}`}>
        {images.map((src, i) => {
          const d = imgDims(src);
          const r = d ? d.width / d.height : 1.4;
          return (
            <figure key={`${src}-${i}`} style={{ '--r': r } as React.CSSProperties}>
              <button
                type="button"
                className="case-shot"
                onClick={() => setOpen(i)}
                aria-label={`Open ${title} frame ${i + 1} of ${images.length}`}
              >
                {d ? (
                  <Image
                    className="case-img"
                    src={src}
                    alt={`${title} frame ${i + 1}`}
                    width={d.width}
                    height={d.height}
                    sizes="(max-width:800px) 44vw, 300px"
                  />
                ) : (
                  <Image className="case-img" src={src} alt={`${title} frame ${i + 1}`} fill sizes="300px" />
                )}
              </button>
            </figure>
          );
        })}
      </div>

      {lightbox && typeof document !== 'undefined' ? createPortal(lightbox, document.body) : null}
    </>
  );
}
