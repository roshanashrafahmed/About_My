// Shared inline SVG icons (stroke = currentColor, so they follow the theme).
const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const ICONS = {
  code: (
    <svg {...svg}><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /><path d="m14 4-4 16" /></svg>
  ),
  server: (
    <svg {...svg}><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" /></svg>
  ),
  database: (
    <svg {...svg}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>
  ),
  shield: (
    <svg {...svg}><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
  ),
  atom: (
    <svg {...svg} strokeWidth={1.6}><circle cx="12" cy="12" r="1.6" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>
  ),
  snake: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.9 2C8.6 2 8.8 3.4 8.8 3.4v1.5h3.2v.5H7.5S5.4 5.2 5.4 8.5s1.8 3.2 1.8 3.2h1.1v-1.6s-.1-1.8 1.8-1.8h3.1s1.7 0 1.7-1.7V3.8S15.2 2 11.9 2Zm-1.7 1a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2Z" />
      <path d="M12.1 22c3.3 0 3.1-1.4 3.1-1.4v-1.5H12v-.5h4.5s2.1.2 2.1-3.1-1.8-3.2-1.8-3.2h-1.1v1.6s.1 1.8-1.8 1.8H10.8s-1.7 0-1.7 1.7v2.8S8.8 22 12.1 22Zm1.7-1a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2Z" />
    </svg>
  ),
  gear: (
    <svg {...svg}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
  ),
  mail: (
    <svg {...svg}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  phone: (
    <svg {...svg}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
  ),
  linkedin: (
    <svg {...svg}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>
  ),
  pin: (
    <svg {...svg}><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  ),
  arrow: (
    <svg {...svg}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
};
