'use client';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import BrandMark from '../../components/BrandMark';
import { useLocalize, useT } from '../../i18n/lang';
import LangToggle from '../../i18n/LangToggle';
import { imgDims } from '../image-dims';
import type { Project } from '../projects';
import BackButton from './BackButton';
import Gallery from './Gallery';

export default function CaseStudy({ project, next, index }: { project: Project; next: Project; index: number }) {
  const t = useT();
  const loc = useLocalize();
  const heroDim = imgDims(project.hero);
  const extLinks = project.links ?? (project.external ? [project.external] : []);

  return (
    <main className="case" style={{ '--case-accent': project.accent } as React.CSSProperties}>
      <div className="case-stars" aria-hidden="true" />
      <header className="case-nav">
        <BrandMark href="/" label={t('cs_home_aria')} />
        <span>
          {t('cs_file')} / {String(index + 1).padStart(2, '0')}
        </span>
        <div className="case-nav-actions">
          <LangToggle />
          <BackButton fallback="/#archive" label={t('cs_back')} />
        </div>
      </header>

      <section className="case-hero">
        <div className="case-kicker">
          <span>{project.category}</span>
          <span>{project.period}</span>
          <span>{t('cs_study')}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="case-deck">{loc(project.summary)}</p>
        <div className="case-facts">
          <dl>
            <div>
              <dt>{t('cs_fld_role')}</dt>
              <dd>{loc(project.role)}</dd>
            </div>
            <div>
              <dt>{t('cs_fld_discipline')}</dt>
              <dd>{loc(project.label)}</dd>
            </div>
            <div>
              <dt>{t('cs_fld_tools')}</dt>
              <dd>{project.tools.join(' · ')}</dd>
            </div>
          </dl>
          {extLinks.length > 0 && (
            <div className="case-links">
              {extLinks.map((l) => (
                <a key={l.href} className="case-external" href={l.href} target="_blank" rel="noreferrer">
                  {loc(l.label)}
                  <span><ArrowUpRight className="ico" aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {project.hero ? (
        <section className="case-hero-image">
          <div className="case-image-frame">
            {heroDim ? (
              <Image
                className="case-img"
                style={{ maxWidth: heroDim.width }}
                src={project.hero}
                alt={`${project.title} overview`}
                width={heroDim.width}
                height={heroDim.height}
                priority
                sizes="(max-width:800px) 100vw, 90vw"
              />
            ) : (
              <Image src={project.hero} alt={`${project.title} overview`} fill priority sizes="100vw" />
            )}
          </div>
          <span>01 / {t('cs_overview_label')}</span>
        </section>
      ) : (
        <section className="case-hero-panel">
          <div className="case-hero-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="case-hero-star">✦</span>
            <b>{project.title}</b>
          </div>
          <span>01 / {project.external ? t('cs_live_note') : t('cs_overview_label')}</span>
        </section>
      )}

      <section className="case-story">
        <aside>
          <span>{t('cs_context')}</span>
          <b>
            {t('cs_context_h_a')}
            <br />
            {t('cs_context_h_b')}
          </b>
        </aside>
        <div>
          <article>
            <p className="case-label">{t('cs_overview')}</p>
            <p className="case-large">{loc(project.overview)}</p>
          </article>
          <article className="case-split">
            <div>
              <p className="case-label">{t('cs_challenge')}</p>
              <p>{loc(project.challenge)}</p>
            </div>
            <div>
              <p className="case-label">{t('cs_my_role')}</p>
              <p>{loc(project.role)}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="case-process">
        <div className="case-section-head">
          <span>{project.tracks ? t('cs_two_roles') : t('cs_approach')}</span>
          {project.tracks ? (
            <h2>
              {t('cs_two_roles_h_a')}
              <br />
              <em>{t('cs_two_roles_h_em')}</em>
            </h2>
          ) : (
            <h2>
              {t('cs_approach_h_a')}
              <br />
              <em>{t('cs_approach_h_em')}</em>
            </h2>
          )}
        </div>
        <div className="case-columns">
          {project.tracks ? (
            project.tracks.map((tr) => (
              <article key={tr.name.en}>
                <span>{loc(tr.name)}</span>
                <ol>
                  {loc(tr.points).map((item, i) => (
                    <li key={item}>
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))
          ) : (
            <>
              <article>
                <span>{t('cs_contribution')}</span>
                <ol>
                  {loc(project.contribution).map((item, i) => (
                    <li key={item}>
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              </article>
              <article>
                <span>{t('cs_decisions')}</span>
                <ol>
                  {loc(project.decisions).map((item, i) => (
                    <li key={item}>
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              </article>
            </>
          )}
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="case-gallery">
          <div className="case-section-head">
            <span>{t('cs_frames')}</span>
            <h2>
              {t('cs_frames_h_a')}
              <br />
              <em>{t('cs_frames_h_em')}</em>
            </h2>
          </div>
          <Gallery images={project.gallery} title={project.title} accent={project.accent} />
        </section>
      )}

      <section className="case-result">
        <span>{t('cs_result')}</span>
        <p>{loc(project.result)}</p>
        {extLinks.length > 0 && (
          <div className="case-links">
            {extLinks.map((l) => (
              <a key={l.href} className="case-external" href={l.href} target="_blank" rel="noreferrer">
                {loc(l.label)}
                <span><ArrowUpRight className="ico" aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        )}
      </section>

      <Link href={`/work/${next.slug}`} className="case-next">
        <span>
          {t('cs_next')} / {next.category}
        </span>
        <strong>{next.title}</strong>
        <b><ArrowUpRight className="ico" aria-hidden="true" /></b>
      </Link>
      <footer className="case-footer">
        <span>© 2026 PUNNATHAT SAMOPRONG</span>
        <Link href="/">{t('cs_footer_home')}</Link>
        <span>{t('ft_worldwide')}</span>
      </footer>
    </main>
  );
}
