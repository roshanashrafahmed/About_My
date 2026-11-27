import { useEffect, useRef, useState } from 'react';
import {
  OWNER_EMAIL, firebaseReady, isOwner, signInOwner, signOutOwner, watchAuth, watchEvents,
} from '../firebase.js';

const LAST_SEEN_KEY = 'notificationsLastSeen';

function readLastSeen() {
  try { return Number(localStorage.getItem(LAST_SEEN_KEY)) || 0; } catch { return 0; }
}

function timeAgo(date) {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function describe(event) {
  if (event.type === 'enquiry') {
    return { title: `New enquiry from ${event.name}`, detail: event.message, meta: event.email };
  }
  let source = 'direct visit';
  try { if (event.referrer) source = `from ${new URL(event.referrer).hostname}`; } catch { /* keep default */ }
  return { title: 'Someone viewed your portfolio', detail: source, meta: null };
}

const BELL = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(!firebaseReady);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [lastSeen, setLastSeen] = useState(readLastSeen);
  const [ringing, setRinging] = useState(false);
  const wrapRef = useRef(null);
  const newestRef = useRef(null);

  const owner = isOwner(user);

  useEffect(() => watchAuth((u) => { setUser(u); setAuthChecked(true); }), []);

  useEffect(() => {
    if (!owner) { setEvents([]); return undefined; }
    setError('');
    return watchEvents(setEvents, (err) => setError(err.code === 'permission-denied'
      ? 'Firebase refused access. Check firestore.rules has your email.'
      : 'Could not load notifications.'));
  }, [owner]);

  // Shake the bell whenever a notification newer than the last one we had arrives.
  useEffect(() => {
    const newest = events[0]?.createdAt.getTime();
    if (newest && newestRef.current !== null && newest > newestRef.current) {
      setRinging(true);
      const timer = setTimeout(() => setRinging(false), 1200);
      newestRef.current = newest;
      return () => clearTimeout(timer);
    }
    if (newest) newestRef.current = newest;
    return undefined;
  }, [events]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const unread = events.filter((e) => e.createdAt.getTime() > lastSeen).length;

  const markAllRead = () => {
    const now = Date.now();
    setLastSeen(now);
    try { localStorage.setItem(LAST_SEEN_KEY, String(now)); } catch { /* ignore */ }
  };

  const signIn = () => {
    setError('');
    signInOwner().catch((err) => {
      if (err.code !== 'auth/popup-closed-by-user') setError('Sign-in failed. Try again.');
    });
  };

  let body;
  if (!firebaseReady) {
    body = <p className="notif-empty">No messages</p>;
  } else if (!authChecked) {
    body = <p className="notif-empty">Loading…</p>;
  } else if (!user) {
    body = (
      <div className="notif-empty">
        <p>Sign in to see who viewed your portfolio and new enquiries.</p>
        <button type="button" className="notif-action-primary" onClick={signIn}>Sign in with Google</button>
      </div>
    );
  } else if (!owner) {
    body = (
      <div className="notif-empty">
        <p>{user.email} isn't the owner account{OWNER_EMAIL ? ` (${OWNER_EMAIL})` : ''}.</p>
        <button type="button" className="notif-action" onClick={signOutOwner}>Sign out</button>
      </div>
    );
  } else if (!events.length) {
    body = <p className="notif-empty">No messages</p>;
  } else {
    body = (
      <ul className="notif-list">
        {events.map((e) => {
          const { title, detail, meta } = describe(e);
          const isNew = e.createdAt.getTime() > lastSeen;
          return (
            <li key={e.id} className={`notif-item${isNew ? ' unread' : ''}`}>
              <span className={`notif-type notif-type-${e.type}`} aria-hidden="true">
                {e.type === 'enquiry' ? '✉' : '👁'}
              </span>
              <span className="notif-content">
                <span className="notif-title">{title}</span>
                {detail && <span className="notif-detail">{detail}</span>}
                <span className="notif-meta">
                  {meta && <a href={`mailto:${meta}`}>{meta}</a>}
                  <span>{timeAgo(e.createdAt)}</span>
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="notif-wrap relative" ref={wrapRef}>
      <button
        type="button"
        className={`notif-toggle relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300${ringing ? ' ringing' : ''}`}
        aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        title="Notifications"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="notif-bell flex">{BELL}</span>
        {unread > 0 && <span className="notif-badge">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {open && (
        <div className="notif-dropdown" role="dialog" aria-label="Notifications">
          <div className="notif-head">
            <span className="notif-heading">Notifications</span>
            {owner && (
              <span className="notif-head-actions">
                {unread > 0 && <button type="button" className="notif-action" onClick={markAllRead}>Mark all read</button>}
                <button type="button" className="notif-action" onClick={signOutOwner}>Sign out</button>
              </span>
            )}
          </div>
          {error && <p className="notif-error">{error}</p>}
          {body}
        </div>
      )}
    </div>
  );
}
