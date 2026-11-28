import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext.jsx';
import Loader from './components/Loader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ToTopButton from './components/ToTopButton.jsx';
import Chatbot from './components/Chatbot.jsx';
import ThemePanel from './components/ThemePanel.jsx';
import { isOwnerMode, logView } from './firebase.js';
import { CORNERS, DEFAULT_SETTINGS, FONTS, TEXT_SIZES, loadFonts, readSettings, saveSettings } from './themeOptions.js';

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
const LOADER_DURATION_MS = 1200;

export default function App() {
  const { lang } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(readSettings);
  const updateSettings = useCallback((patch) => setSettings((prev) => ({ ...prev, ...patch })), []);
  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), []);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const theme = settings.mode === 'system' ? (systemDark ? 'dark' : 'light') : settings.mode;
  const setTheme = useCallback((mode) => updateSettings({ mode }), [updateSettings]);
  const [brightness, setBrightness] = useState(() => {
    const stored = localStorage.getItem('brightness');
    return stored ? Number(stored) : 100;
  });
  const [autoBrightness, setAutoBrightness] = useState(() => localStorage.getItem('autoBrightness') === 'true');
  const [ownerMode] = useState(isOwnerMode);
  const [themePanelOpen, setThemePanelOpen] = useState(false);

  useEffect(() => { logView(); }, []);
  const closeThemePanel = useCallback(() => setThemePanelOpen(false), []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setSystemDark(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const { accent, font, textSize, corners, motion } = settings;
    if (accent === 'default') root.removeAttribute('data-accent');
    else root.setAttribute('data-accent', accent);

    const selectedFont = FONTS.find((f) => f.id === font);
    loadFonts([selectedFont]);
    if (font === 'default') root.style.removeProperty('--font');
    else root.style.setProperty('--font', selectedFont.family);

    root.style.fontSize = `${TEXT_SIZES.find((s) => s.id === textSize).px}px`;
    root.style.setProperty('--radius', CORNERS.find((c) => c.id === corners).radius);
    root.toggleAttribute('data-reduce-motion', !motion);
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.filter = `brightness(${autoBrightness ? 100 : brightness}%)`;
    localStorage.setItem('brightness', brightness);
    localStorage.setItem('autoBrightness', autoBrightness);
  }, [brightness, autoBrightness]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const setActive = () => {
      let current = sections[0]?.id;
      const scrollPos = window.scrollY + 120;
      sections.forEach((sec) => {
        if (scrollPos >= sec.offsetTop) current = sec.id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', setActive);
    setActive();
    return () => window.removeEventListener('scroll', setActive);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) {
        el.classList.add('in-view');
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [lang]);

  return (
    <>
      <Loader hidden={!loading} />
      <CustomCursor enabled={settings.cursor} />

      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <Navbar
        activeSection={activeSection}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        theme={theme}
        setTheme={setTheme}
        brightness={brightness}
        setBrightness={setBrightness}
        autoBrightness={autoBrightness}
        setAutoBrightness={setAutoBrightness}
        themePanelOpen={themePanelOpen}
        onOpenThemePanel={() => setThemePanelOpen(true)}
        ownerMode={ownerMode}
      />
      <ThemePanel
        open={themePanelOpen}
        onClose={closeThemePanel}
        settings={settings}
        updateSettings={updateSettings}
        resetSettings={resetSettings}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ToTopButton left={settings.chatbot} />
      {settings.chatbot && <Chatbot onDisable={() => updateSettings({ chatbot: false })} />}
    </>
  );
}
