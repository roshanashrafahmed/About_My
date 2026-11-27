// Colour accents: swatch colours shown in the theme panel. The actual CSS
// variables for each accent live in style.css under [data-accent="..."].
export const ACCENTS = [
  { id: 'default', label: 'Default', colors: ['#286f6c', '#4a9c98', '#ffb648'] },
  { id: 'ocean', label: 'Ocean', colors: ['#1f5fbf', '#4a86e0', '#ffb648'] },
  { id: 'violet', label: 'Violet', colors: ['#6b3fc4', '#8f6be0', '#ff9ecb'] },
  { id: 'rose', label: 'Rose', colors: ['#c23a6b', '#e0678f', '#ffc15e'] },
  { id: 'sunset', label: 'Sunset', colors: ['#d0621f', '#ee8a4a', '#ffd166'] },
  { id: 'forest', label: 'Forest', colors: ['#2f7a34', '#57a05c', '#f2c14e'] },
  { id: 'crimson', label: 'Crimson', colors: ['#b3261e', '#d9534a', '#ffb648'] },
  { id: 'graphite', label: 'Graphite', colors: ['#334155', '#64748b', '#f59e0b'] },
];

// Fonts: `query` is the Google Fonts css2 family spec (only weights each font ships).
export const FONTS = [
  { id: 'default', label: 'Default', family: "'Poppins', system-ui, sans-serif", query: null },
  { id: 'inter', label: 'Inter', family: "'Inter', system-ui, sans-serif", query: 'Inter:wght@300;400;500;600;700;800' },
  { id: 'montserrat', label: 'Montserrat', family: "'Montserrat', system-ui, sans-serif", query: 'Montserrat:wght@300;400;500;600;700;800' },
  { id: 'nunito', label: 'Nunito', family: "'Nunito', system-ui, sans-serif", query: 'Nunito:wght@300;400;500;600;700;800' },
  { id: 'space-grotesk', label: 'Space Grotesk', family: "'Space Grotesk', system-ui, sans-serif", query: 'Space+Grotesk:wght@300;400;500;600;700' },
  { id: 'playfair', label: 'Playfair', family: "'Playfair Display', Georgia, serif", query: 'Playfair+Display:wght@400;500;600;700;800' },
  { id: 'jetbrains', label: 'JetBrains Mono', family: "'JetBrains Mono', ui-monospace, monospace", query: 'JetBrains+Mono:wght@300;400;500;600;700;800' },
];

export const MODES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];

export const TEXT_SIZES = [
  { id: 'sm', label: 'Small', px: 14 },
  { id: 'md', label: 'Medium', px: 16 },
  { id: 'lg', label: 'Large', px: 18 },
];

export const CORNERS = [
  { id: 'sharp', label: 'Sharp', radius: '6px' },
  { id: 'rounded', label: 'Rounded', radius: '20px' },
  { id: 'pill', label: 'Pill', radius: '34px' },
];

export const DEFAULT_SETTINGS = {
  mode: 'light',
  accent: 'default',
  font: 'default',
  textSize: 'md',
  corners: 'rounded',
  motion: true,
  cursor: true,
  chatbot: true,
};

const SETTINGS_KEY = 'themeSettings';
const CHOICES = { mode: MODES, accent: ACCENTS, font: FONTS, textSize: TEXT_SIZES, corners: CORNERS };

// Read saved settings, dropping any value that is no longer a valid choice.
export function readSettings() {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
  } catch { /* ignore malformed data */ }
  // Carry over values saved before settings were grouped under one key.
  const legacy = { accent: localStorage.getItem('accent'), font: localStorage.getItem('font') };
  const settings = { ...DEFAULT_SETTINGS };
  Object.keys(settings).forEach((key) => {
    const value = stored[key] ?? legacy[key];
    if (value == null) return;
    if (CHOICES[key] ? CHOICES[key].some((c) => c.id === value) : typeof value === 'boolean') settings[key] = value;
  });
  return settings;
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function isDefaultSettings(settings) {
  return Object.keys(DEFAULT_SETTINGS).every((key) => settings[key] === DEFAULT_SETTINGS[key]);
}

const FONT_LINK_ID = 'theme-font-link';

// Load one or more Google Fonts into a single shared <link>.
export function loadFonts(fonts) {
  const queries = fonts.map((f) => f.query).filter(Boolean);
  if (!queries.length) return;
  const href = `https://fonts.googleapis.com/css2?${queries.map((q) => `family=${q}`).join('&')}&display=swap`;
  const id = `${FONT_LINK_ID}-${queries.length > 1 ? 'all' : queries[0]}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}
