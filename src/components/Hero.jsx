import { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext.jsx';

const SOCIALS = [
  {
    href: 'https://github.com/roshanashrafahmed',
    label: 'GitHub',
    className: 'social-github',
    svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>,
  },
  {
    href: 'https://linkedin.com/in/roshanfullstack',
    label: 'LinkedIn',
    className: 'social-linkedin',
    svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>,
  },
  {
    href: 'mailto:roshankurshankmb@gmail.com',
    label: 'Email via Google',
    className: 'social-google',
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="#4285F4" d="M23.04 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.19a5.29 5.29 0 0 1-2.3 3.47v2.88h3.72c2.18-2 3.43-4.96 3.43-8.38Z"/>
        <path fill="#34A853" d="M12 23.5c3.11 0 5.71-1.03 7.61-2.79l-3.72-2.88c-1.03.7-2.35 1.1-3.89 1.1-2.99 0-5.52-2.02-6.43-4.74H1.74v2.97A11.5 11.5 0 0 0 12 23.5Z"/>
        <path fill="#FBBC05" d="M5.57 14.19a6.9 6.9 0 0 1 0-4.38V6.84H1.74a11.5 11.5 0 0 0 0 10.32l3.83-2.97Z"/>
        <path fill="#EA4335" d="M12 5.07c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.7 1.64 15.11.5 12 .5A11.5 11.5 0 0 0 1.74 6.84l3.83 2.97C6.48 7.09 9.01 5.07 12 5.07Z"/>
      </svg>
    ),
  },
  {
    href: 'https://wa.me/918270781635',
    label: 'WhatsApp',
    className: 'social-whatsapp',
    svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.06-1.33A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm5.83 14.24c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.13.11-1.83-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.4.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.61-.14.24.09 1.56.74 1.83.87.27.14.45.2.51.32.07.12.07.68-.17 1.36Z"/></svg>,
  },
  {
    href: 'https://instagram.com/roshanashrafahmed',
    label: 'Instagram',
    className: 'social-instagram',
    svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38C1.34 2.66.93 3.33.62 4.12c-.3.76-.5 1.63-.56 2.91C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.66.66 1.33 1.07 2.12 1.38.76.3 1.63.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.66 1.07-1.33 1.38-2.12.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z"/></svg>,
  },
  {
    href: 'https://facebook.com/roshanashrafahmed',
    label: 'Facebook',
    className: 'social-facebook',
    svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>,
  },
  {
    href: 'https://twitter.com/roshanashrafahmed',
    label: 'Twitter / X',
    className: 'social-twitter',
    svg: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.9 2H22l-7.2 8.24L23.3 22h-6.62l-5.18-6.77L5.5 22H2.4l7.7-8.8L1.4 2h6.78l4.68 6.19L18.9 2Zm-1.16 18.17h1.73L7.36 3.75H5.5l12.24 16.42Z"/></svg>,
  },
];

const TECH = [
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#E76F00' },
  { name: 'JavaScript', color: '#D4B400' },
  { name: 'React', color: '#149ECA' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'SQL', color: '#00758F' },
  { name: 'HTML', color: '#E34F26' },
  { name: 'CSS', color: '#663399' },
];

export default function Hero() {
  const { t } = useLanguage();
  const quoteLines = t.hero.quote.split('\n');
  const photoWrapRef = useRef(null);

  useEffect(() => {
    const el = photoWrapRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      const progress = Math.max(-1, Math.min(1, distanceFromCenter / window.innerHeight));

      const translateY = progress * 70;
      const scale = 1 - Math.abs(progress) * 0.12;
      const opacity = 1 - Math.abs(progress) * 0.25;

      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      el.style.opacity = opacity;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero relative pb-[60px]" id="home">
      <div className="container hero-inner w-full max-w-[1180px] mx-auto px-6">
        <div className="hero-main relative min-h-[460px] flex">
          <div className="hero-quote-block">
            <p className="hero-quote-text text-[0.95rem] italic leading-[1.55]">
              {quoteLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < quoteLines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="quote-sign-wrap" role="img" aria-label="S. Roshan signature" />
          </div>

          <div className="hero-caption flex flex-col justify-between min-h-[400px] py-2.5 max-w-[420px] relative z-[3] self-center">
            <div>
              <p className="hero-eyebrow text-[1.15rem] font-normal">{t.hero.eyebrow}</p>
              <h1 className="hero-title font-extrabold tracking-[-0.03em] leading-[1.05] my-1 mb-5">{t.hero.titlePrefix} <span className="highlight">{t.hero.name}</span></h1>
              <p className="hero-role mt-[18px] text-[1.05rem] font-medium"><span className="hero-role-tag font-extrabold italic mr-1">{t.hero.roleTag}</span> {t.hero.role}</p>
            </div>

            <div className="hero-globe relative flex items-center justify-center w-full h-40 my-6 mx-auto" tabIndex={0} aria-label="Tech stack">
              <span className="hero-globe-star absolute w-[3px] h-[3px] rounded-full" aria-hidden="true" />
              <span className="hero-globe-star absolute w-[3px] h-[3px] rounded-full" aria-hidden="true" />
              <span className="hero-globe-star absolute w-[3px] h-[3px] rounded-full" aria-hidden="true" />
              <span className="hero-globe-star absolute w-[3px] h-[3px] rounded-full" aria-hidden="true" />
              <div className="hero-globe-split relative w-[130px] h-[130px]" aria-hidden="true">
                <div className="hero-globe-sphere hero-globe-half hero-globe-half-left absolute inset-0 rounded-full" />
                <div className="hero-globe-sphere hero-globe-half hero-globe-half-right absolute inset-0 rounded-full" />
                <span className="hero-globe-code absolute font-mono font-bold">&lt;/&gt;</span>
              </div>
              <ul className="hero-globe-langs">
                {TECH.map((tech, i) => {
                  const angle = (i / TECH.length) * 2 * Math.PI - Math.PI / 2;
                  return (
                    <li
                      key={tech.name}
                      className="hero-globe-lang absolute font-mono font-semibold whitespace-nowrap"
                      style={{
                        '--cos': Math.cos(angle).toFixed(3),
                        '--y': `${Math.round(Math.sin(angle) * 82)}px`,
                        '--i': i,
                        '--c': tech.color,
                      }}
                    >
                      {tech.name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <a href={`${import.meta.env.BASE_URL}assets/Roshan-Ashraf-Ahmed-Resume.pdf`} download className="btn btn-primary relative inline-flex self-start items-center gap-2 px-[26px] py-[13px] rounded-full font-semibold text-[0.95rem] text-white">{t.hero.resume} <span aria-hidden="true">→</span></a>
          </div>

          <div className="hero-stage">
            <div className="hero-photo-wrap" ref={photoWrapRef}>
              <img
                src={`${import.meta.env.BASE_URL}assets/roshan.png`}
                alt="Roshan Ashraf Ahmed"
                className="hero-photo hero-photo-light"
                onError={(e) => e.currentTarget.parentElement.classList.add('img-missing')}
              />
              <img
                src={`${import.meta.env.BASE_URL}assets/roshan-dark.png`}
                alt=""
                aria-hidden="true"
                className="hero-photo hero-photo-dark"
              />
              <div className="photo-fallback">
                <span>R</span>
                <p>Drop your photo at <code>assets/roshan.png</code></p>
              </div>
            </div>
          </div>

          <div className="hero-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                {...(s.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener' })}
                aria-label={s.label}
                className={`social-btn w-14 h-14 flex items-center justify-center rounded-full cursor-pointer ${s.className}`}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
