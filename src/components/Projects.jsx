import { useLanguage } from '../LanguageContext.jsx';

const PROJECT_LINKS = [
  'https://github.com/roshanashrafahmed/airline-ticket-booking-using-python/blob/main/roshan1.py',
  'https://roshanashrafahmed.github.io/Ainext/index.html',
  'https://roshanashrafahmed.github.io/chatbot/',
  null,
  [
    { label: 'Ascent', href: 'https://ascent.hrms.azcentrix.com/Auth/Login' },
    { label: 'Stylcove', href: 'https://homworks.azcentrix.com/Auth/Login' },
  ],
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section className="section projects-section relative overflow-hidden py-[50px]" id="projects">
      <div className="rain-lines absolute inset-0 flex justify-evenly z-[1] pointer-events-none" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <div className="container relative z-[2] w-full max-w-[1180px] mx-auto px-6">
        <h2 className="section-title projects-title relative flex w-fit items-center gap-3.5 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-0.02em] mb-11 pb-2.5" data-animate><span className="tag text-[0.8rem] font-bold rounded-lg px-3 py-1.5">{t.projects.tag}</span>{t.projects.title}</h2>

        <div className="projects-grid grid gap-[26px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {t.projects.items.map((p, i) => (
            <article className="project-card relative rounded-[var(--radius)] p-[30px] overflow-hidden" data-animate key={p.title}>
              <div className="project-glow"></div>
              <h3 className="relative text-[1.12rem] font-bold mb-1.5">{p.title}</h3>
              <span className="project-date relative block text-[0.78rem] mb-3.5">{p.date}</span>
              <p className="relative mb-[18px] text-[0.92rem]">{p.desc}</p>
              <div className="project-tags relative flex flex-wrap gap-2 mb-[18px]">
                {p.tags.map((tag) => <span className="text-[0.75rem] font-semibold px-2.5 py-1 rounded-full" key={tag}>{tag}</span>)}
              </div>
              {Array.isArray(PROJECT_LINKS[i]) ? (
                <div className="relative flex flex-wrap gap-x-5 gap-y-1.5">
                  {PROJECT_LINKS[i].map((l) => (
                    <a href={l.href} target="_blank" rel="noopener" className="project-link font-semibold text-[0.9rem]" key={l.href}>{l.label} →</a>
                  ))}
                </div>
              ) : PROJECT_LINKS[i] ? (
                <a href={PROJECT_LINKS[i]} target="_blank" rel="noopener" className="project-link relative font-semibold text-[0.9rem]">{p.linkLabel}</a>
              ) : (
                <span className="project-link muted relative font-semibold text-[0.9rem]">{t.projects.internalProject}</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
