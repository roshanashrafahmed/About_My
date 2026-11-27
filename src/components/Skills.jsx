import { useLanguage } from '../LanguageContext.jsx';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section className="section alt py-[50px]" id="skills">
      <div className="container w-full max-w-[1180px] mx-auto px-6">
        <h2 className="section-title relative flex w-fit items-center gap-3.5 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-0.02em] mb-11 pb-2.5" data-animate><span className="tag text-[0.8rem] font-bold rounded-lg px-3 py-1.5">{t.skills.tag}</span>{t.skills.title}</h2>

        <div className="skills-wrap flex flex-wrap gap-3.5 mb-[60px]" data-animate>
          {t.skills.list.map((s) => <div className="skill-pill px-[22px] py-3 rounded-2xl font-semibold text-[0.95rem]" key={s}>{s}</div>)}
        </div>

        <div className="edu-lang-grid grid grid-cols-1 min-[961px]:grid-cols-[1.4fr_1fr] gap-10">
          <div className="edu-block" data-animate>
            <h3 className="sub-title text-[1.3rem] font-bold mb-[22px]">{t.skills.educationTitle}</h3>
            {t.skills.education.map((e) => (
              <div className="edu-item py-[18px]" key={e.title}>
                <h4 className="text-base font-semibold mb-1">{e.title}</h4>
                <p className="text-[0.88rem]">{e.desc}</p>
              </div>
            ))}
          </div>

          <div className="lang-block" data-animate>
            <h3 className="sub-title text-[1.3rem] font-bold mb-[22px]">{t.skills.languagesTitle}</h3>
            <div className="lang-pills flex flex-wrap gap-2.5">
              {t.skills.languages.map((l) => <span className="px-[18px] py-2.5 rounded-full font-semibold text-[0.88rem]" key={l}>{l}</span>)}
            </div>
            <div className="lang-deco mt-20 w-full max-w-[420px]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
