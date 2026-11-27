import { useEffect, useRef } from 'react';
import { ACCENTS, CORNERS, FONTS, MODES, TEXT_SIZES, isDefaultSettings, loadFonts } from '../themeOptions.js';

const MODE_ICONS = {
  light: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  dark: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>,
  system: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>,
};

const TEXT_SIZE_SAMPLE = { sm: '0.75rem', md: '0.95rem', lg: '1.15rem' };
const CORNER_SAMPLE = { sharp: '2px', rounded: '7px', pill: '14px' };

function Segmented({ label, options, value, onChange, renderOption }) {
  return (
    <div className="theme-segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          className={`theme-segment${value === o.id ? ' active' : ''}`}
          onClick={() => onChange(o.id)}
        >
          {renderOption ? renderOption(o) : o.label}
        </button>
      ))}
    </div>
  );
}

function Switch({ label, hint, checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className="theme-switch-row" onClick={() => onChange(!checked)}>
      <span className="theme-switch-text">
        <span className="theme-switch-label">{label}</span>
        <span className="theme-switch-hint">{hint}</span>
      </span>
      <span className={`theme-switch${checked ? ' on' : ''}`} aria-hidden="true"><span className="theme-switch-knob" /></span>
    </button>
  );
}

export default function ThemePanel({ open, onClose, settings, updateSettings, resetSettings }) {
  const closeRef = useRef(null);
  const { mode, accent, font, textSize, corners, motion, cursor } = settings;

  // Load every font once the panel opens so the previews render in their own typeface.
  useEffect(() => {
    if (open) loadFonts(FONTS);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const isDefault = isDefaultSettings(settings);

  return (
    <div className={`theme-panel-overlay${open ? ' open' : ''}`} onMouseDown={onClose} aria-hidden={!open}>
      <div
        className="theme-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="themePanelTitle"
        onMouseDown={(e) => e.stopPropagation()}
        inert={open ? undefined : ''}
      >
        <div className="theme-panel-head">
          <div>
            <h2 id="themePanelTitle" className="theme-panel-title">Theme</h2>
            <p className="theme-panel-sub">Choose how the page looks and behaves.</p>
          </div>
          <button ref={closeRef} type="button" className="theme-panel-close" aria-label="Close theme panel" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <section className="theme-panel-section">
          <h3 className="theme-panel-label">Appearance</h3>
          <Segmented
            label="Appearance"
            options={MODES}
            value={mode}
            onChange={(id) => updateSettings({ mode: id })}
            renderOption={(o) => <>{MODE_ICONS[o.id]}<span>{o.label}</span></>}
          />
        </section>

        <section className="theme-panel-section">
          <h3 className="theme-panel-label">Colour theme</h3>
          <div className="theme-accent-grid">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                className={`theme-accent-option${accent === a.id ? ' active' : ''}`}
                aria-pressed={accent === a.id}
                onClick={() => updateSettings({ accent: a.id })}
              >
                <span
                  className="theme-accent-swatch"
                  style={{ background: `linear-gradient(135deg, ${a.colors[0]} 0%, ${a.colors[1]} 60%, ${a.colors[2]} 100%)` }}
                >
                  {accent === a.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                  )}
                </span>
                <span className="theme-accent-name">{a.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="theme-panel-section">
          <h3 className="theme-panel-label">Font theme</h3>
          <div className="theme-font-grid">
            {FONTS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`theme-font-option${font === f.id ? ' active' : ''}`}
                aria-pressed={font === f.id}
                onClick={() => updateSettings({ font: f.id })}
                style={{ fontFamily: f.family }}
              >
                <span className="theme-font-sample">Aa</span>
                <span className="theme-font-name">{f.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="theme-panel-section">
          <h3 className="theme-panel-label">Text size</h3>
          <Segmented
            label="Text size"
            options={TEXT_SIZES}
            value={textSize}
            onChange={(id) => updateSettings({ textSize: id })}
            renderOption={(o) => <><span className="theme-size-sample" style={{ fontSize: TEXT_SIZE_SAMPLE[o.id] }}>A</span><span>{o.label}</span></>}
          />
        </section>

        <section className="theme-panel-section">
          <h3 className="theme-panel-label">Corner style</h3>
          <Segmented
            label="Corner style"
            options={CORNERS}
            value={corners}
            onChange={(id) => updateSettings({ corners: id })}
            renderOption={(o) => <><span className="theme-corner-sample" style={{ borderTopLeftRadius: CORNER_SAMPLE[o.id] }} /><span>{o.label}</span></>}
          />
        </section>

        <section className="theme-panel-section">
          <h3 className="theme-panel-label">Motion &amp; cursor</h3>
          <div className="theme-switch-list">
            <Switch label="Animations" hint="Page transitions and moving effects" checked={motion} onChange={(v) => updateSettings({ motion: v })} />
            <Switch label="Custom cursor" hint="Coloured dot that follows the mouse" checked={cursor} onChange={(v) => updateSettings({ cursor: v })} />
          </div>
        </section>

        <div className="theme-panel-foot">
          <button type="button" className="theme-reset" disabled={isDefault} onClick={resetSettings}>
            {isDefault ? 'Showing default theme' : 'Reset to default theme'}
          </button>
        </div>
      </div>
    </div>
  );
}
