import { useEffect, useRef, useState } from 'react';
import { translations } from '../translations.js';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_HISTORY = 12;

const GREETING = "Hi! I'm Roshan's portfolio assistant. Ask me about skills, experience, projects or how to get in touch.";
const SUGGESTIONS = ['What are your skills?', 'Tell me about your experience', 'How can I contact you?'];

const SYSTEM_PROMPT = `You are the friendly assistant on Roshan Ashraf Ahmed's portfolio website.
Answer visitors' questions about Roshan using ONLY the portfolio data below.
If something is not in the data, say you don't know and suggest using the Contact section.
Keep answers short (2-4 sentences), in plain text without markdown, and reply in the visitor's language.
Politely decline requests unrelated to Roshan or this portfolio.

Portfolio data (JSON):
${JSON.stringify(translations.en)}`;

async function askGemini(history) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: history.slice(-MAX_HISTORY).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
      generationConfig: { maxOutputTokens: 400, temperature: 0.6, thinkingConfig: { thinkingBudget: 0 } },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `Request failed (${res.status})`);
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
  if (!text) throw new Error('Empty response');
  return text;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (raw) => {
    const text = raw.trim();
    if (!text || busy) return;
    const next = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    if (!API_KEY) {
      setMessages([...next, { role: 'bot', text: 'The chatbot is not configured yet (missing Gemini API key).', error: true }]);
      return;
    }
    setBusy(true);
    try {
      const reply = await askGemini(next.filter((m) => !m.error));
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I could not answer right now. Please try again in a moment.', error: true }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={`chatbot-panel${open ? ' open' : ''}`} role="dialog" aria-label="Chat with Roshan's assistant" inert={open ? undefined : ''}>
        <div className="chatbot-head">
          <span className="chatbot-avatar" aria-hidden="true">R</span>
          <div className="chatbot-head-text">
            <span className="chatbot-title">Ask about Roshan</span>
            <span className="chatbot-sub">AI assistant · powered by Gemini</span>
          </div>
          <button type="button" className="chatbot-close" aria-label="Close chat" onClick={() => setOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="chatbot-messages" ref={listRef} aria-live="polite">
          <div className="chatbot-msg bot">{GREETING}</div>
          {messages.length === 0 && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="chatbot-chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chatbot-msg ${m.role}${m.error ? ' error' : ''}`}>{m.text}</div>
          ))}
          {busy && <div className="chatbot-msg bot chatbot-typing" aria-label="Typing"><span /><span /><span /></div>}
        </div>

        <form className="chatbot-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input
            ref={inputRef}
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            maxLength={500}
            aria-label="Your message"
          />
          <button type="submit" className="chatbot-send" disabled={busy || !input.trim()} aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>

      <button
        type="button"
        className={`chatbot-launcher${open ? ' open' : ''}`}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>
        )}
      </button>
    </>
  );
}
