import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext.jsx';
import NotificationBell from './NotificationBell.jsx';

const NAV_ICONS = {
  home: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H9.5v-6h5v6H17.5a1 1 0 0 0 1-1v-9"/></svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/></svg>
  ),
  project: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 4v5"/></svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  ),
};

const NAV_HREFS = {
  home: '#home',
  experience: '#experience',
  project: '#projects',
  contact: '#contact',
};

export default function Navbar({ activeSection, navOpen, setNavOpen, theme, setTheme, brightness, setBrightness, autoBrightness, setAutoBrightness, themePanelOpen, onOpenThemePanel, ownerMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { lang, setLang, t, languages } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className={`navbar fixed top-0 left-0 right-0 h-[var(--nav-h)] flex items-center z-[1000] transition-shadow duration-300${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container nav-inner w-full max-w-[1180px] mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="logo font-extrabold text-[1.15rem] tracking-[-0.01em] flex items-center gap-1">
          <img src="/assets/mylogo.png" alt="R" className="logo-mark-img h-[26px] w-auto" />
          <span className="logo-text">OSHAN <span className="logo-text-rest font-medium text-[0.68em] tracking-[0.01em] ml-0.5">ASHRAF AHMED .S</span></span>
        </a>
        <nav className={`nav-links flex gap-2 items-center${navOpen ? ' open' : ''}`} id="navLinks">
          {Object.keys(NAV_HREFS).map((key) => (
            <a
              key={key}
              href={NAV_HREFS[key]}
              className={`nav-link flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[0.82rem] font-medium transition-all duration-300${activeSection === NAV_HREFS[key].slice(1) ? ' active' : ''}`}
              onClick={() => setNavOpen(false)}
            >
              <span className="nav-icon flex items-center">{NAV_ICONS[key]}</span>
              {t.nav[key]}
            </a>
          ))}
        </nav>
        <div className="nav-actions flex items-center gap-2">
          <div className="lang-switcher relative" ref={langRef}>
            <button
              className="lang-toggle flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[0.68rem] font-bold tracking-[0.02em] cursor-pointer transition-all duration-300"
              aria-label="Change language"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((open) => !open)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></svg>
              <span className="lang-toggle-label">{currentLanguage.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <ul className="lang-dropdown absolute top-[calc(100%+10px)] right-0 min-w-[150px] rounded-[14px] p-1.5 z-[1100]" role="listbox">
                {languages.map((l) => (
                  <li key={l.code}>
                    <button
                      className={`lang-option w-full text-left px-3 py-2.5 rounded-[9px] border-none bg-transparent text-[0.9rem] font-medium cursor-pointer transition-colors duration-200${l.code === lang ? ' active' : ''}`}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="theme-toggle flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
            )}
          </button>
          <div className="brightness-control flex items-center gap-1.5 h-8 px-2.5 rounded-full">
            <button
              type="button"
              className={`brightness-auto-toggle flex items-center justify-center bg-transparent border-none p-0 cursor-pointer${autoBrightness ? ' is-auto' : ''}`}
              aria-label={autoBrightness ? 'Turn off auto brightness' : 'Turn on auto brightness'}
              aria-pressed={autoBrightness}
              title={autoBrightness ? 'Auto brightness: on' : 'Auto brightness: off'}
              onClick={() => setAutoBrightness(!autoBrightness)}
            >
              {autoBrightness ? (
                <svg className="brightness-icon block w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><path d="M9.5 15.5 12 8.5l2.5 7"/><path d="M10.4 13h3.2"/></svg>
              ) : (
                <svg className="brightness-icon block w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              )}
            </button>
            <input
              type="range"
              className={`brightness-slider w-[50px] h-[3px] rounded-full cursor-pointer${autoBrightness ? ' is-auto' : ''}`}
              min="60"
              max="130"
              value={autoBrightness ? 100 : brightness}
              onChange={(e) => {
                setAutoBrightness(false);
                setBrightness(Number(e.target.value));
              }}
              aria-label="Adjust page brightness"
            />
          </div>
          {ownerMode && <NotificationBell />}
          <button
            type="button"
            className="theme-menu-toggle flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300"
            aria-label="Open theme settings"
            aria-haspopup="dialog"
            aria-expanded={themePanelOpen}
            title="Theme"
            onClick={onOpenThemePanel}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
          </button>
          <button
            className="nav-toggle hidden flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span className="w-6 h-0.5 rounded-sm"></span><span className="w-6 h-0.5 rounded-sm"></span><span className="w-6 h-0.5 rounded-sm"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
