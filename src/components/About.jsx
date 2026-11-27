import { useLanguage } from '../LanguageContext.jsx';
import { ICONS } from './icons.jsx';

const CARD_ICONS = ['code', 'server', 'database', 'shield'];

function Heading({ text, highlight }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="about-hl">
        {highlight}
        <svg className="about-hl-swoosh" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
          <path d="M3 9C30 3 80 2 117 6" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </span>
      {text.slice(i + highlight.length)}
    </>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="section about-section relative overflow-hidden py-[50px]" id="about">
      <div className="container w-full max-w-[1180px] mx-auto px-6">
        <h2 className="section-title relative flex w-fit items-center gap-3.5 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-0.02em] mb-9 pb-2.5" data-animate><span className="tag text-[0.8rem] font-bold rounded-lg px-3 py-1.5">{t.about.tag}</span>{t.about.title}</h2>

        <div className="about-intro grid grid-cols-1 min-[961px]:grid-cols-[1.55fr_1fr] gap-10 items-center mb-12">
          <div className="about-text relative z-[2]" data-animate>
            <h3 className="about-heading text-[clamp(1.35rem,2.4vw,1.8rem)] font-bold tracking-[-0.01em] leading-snug mb-5">
              <Heading text={t.about.heading} highlight={t.about.headingHighlight} />
            </h3>
            {t.about.text.map((para) => (
              <p className="text-[1.05rem] leading-relaxed mb-4 last:mb-0" key={para}>{para}</p>
            ))}
          </div>

          <div className="about-art relative mx-auto w-full max-w-[360px] aspect-[1.15]" aria-hidden="true" data-animate>
            <div className="about-art-glow" />
            <span className="about-art-spark" style={{ top: '6%', left: '42%' }}>✦</span>
            <span className="about-art-spark" style={{ top: '48%', left: '2%' }}>✦</span>
            <span className="about-art-spark" style={{ top: '24%', right: '0%' }}>✦</span>
            <div className="about-laptop">
              <div className="about-laptop-screen">{ICONS.code}</div>
              <div className="about-laptop-base" />
            </div>
            <div className="about-chip" style={{ top: '14%', left: '4%' }}>{ICONS.snake}</div>
            <div className="about-chip" style={{ top: '0%', right: '6%' }}>{ICONS.atom}</div>
            <div className="about-chip about-chip-sm" style={{ top: '40%', right: '-2%' }}>{ICONS.database}</div>
            <div className="about-chip about-chip-sm" style={{ bottom: '6%', right: '8%' }}>{ICONS.gear}</div>
          </div>
        </div>

        <div className="focus-grid grid grid-cols-1 min-[521px]:grid-cols-2 min-[961px]:grid-cols-4 gap-5" data-animate>
          {t.about.focus.map((f, i) => (
            <a href="#skills" className="focus-card group relative overflow-hidden flex flex-col rounded-[var(--radius)] p-6" key={f.title}>
              <div className="flex items-center gap-4 mb-4">
                <span className="focus-icon shrink-0 grid place-items-center w-14 h-14 rounded-2xl">{ICONS[CARD_ICONS[i]]}</span>
                <h4 className="text-[1.12rem] font-bold leading-tight">{f.title}</h4>
              </div>
              <span className="focus-rule block w-9 h-[3px] rounded-full mb-4 ml-[72px]" />
              <p className="focus-tags text-[0.86rem] mb-5">{f.tags.join(' · ')}</p>
              <span className="focus-arrow mt-auto self-end grid place-items-center w-9 h-9 rounded-full">{ICONS.arrow}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
