import { useLanguage } from '../LanguageContext.jsx';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section className="section alt py-[50px]" id="experience">
      <div className="container w-full max-w-[1180px] mx-auto px-6">
        <h2 className="section-title relative flex w-fit items-center gap-3.5 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-0.02em] mb-11 pb-2.5" data-animate><span className="tag text-[0.8rem] font-bold rounded-lg px-3 py-1.5">{t.experience.tag}</span>{t.experience.title}</h2>

        <div className="timeline relative pl-[30px] flex flex-col gap-10">
          {t.experience.timeline.map((item) => (
            <div className="timeline-item relative" data-animate key={item.title}>
              <div className="timeline-dot w-3.5 h-3.5 rounded-full"></div>
              <div className="timeline-card rounded-[var(--radius)] px-[30px] py-7">
                <div className="timeline-head flex flex-wrap items-baseline justify-between gap-2.5 mb-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <span className="timeline-date text-[0.82rem] font-semibold rounded-full px-2.5 py-1">{item.date}</span>
                </div>
                <p className="timeline-org font-semibold mb-3 text-[0.92rem]">{item.org}</p>
                <p className="timeline-desc mb-3.5 text-[0.95rem]">{item.desc}</p>
                <ul className="timeline-list flex flex-col gap-2">
                  {item.items.map((li) => (
                    <li className="relative pl-5 text-[0.92rem]" key={li}>{li}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
