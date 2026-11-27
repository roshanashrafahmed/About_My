import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp,
} from 'firebase/firestore';

// Values come from .env.local (see .env.example). They are public web keys;
// access is controlled by firestore.rules, not by keeping these secret.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const OWNER_EMAIL = (import.meta.env.VITE_OWNER_EMAIL || '').toLowerCase();
export const firebaseReady = Boolean(config.apiKey && config.projectId && config.appId);

const app = firebaseReady ? initializeApp(config) : null;
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;
const EVENTS = 'events';

// The bell is shown only when the page is opened with ?admin; the plain URL is the visitor view.
// Reading notifications still requires signing in as the owner.
export function isOwnerMode() {
  try { localStorage.removeItem('ownerMode'); } catch { /* clear the old saved flag */ }
  return new URLSearchParams(window.location.search).has('admin');
}

export function isOwner(user) {
  return Boolean(user && user.emailVerified && user.email?.toLowerCase() === OWNER_EMAIL);
}

// Record one page view per browser session. Skipped on the owner's own browser.
export function logView() {
  if (!db || isOwnerMode()) return;
  try {
    if (sessionStorage.getItem('viewLogged')) return;
    sessionStorage.setItem('viewLogged', '1');
  } catch { /* storage blocked: log anyway */ }
  addDoc(collection(db, EVENTS), {
    type: 'view',
    createdAt: serverTimestamp(),
    referrer: document.referrer.slice(0, 200),
    lang: (navigator.language || '').slice(0, 20),
  }).catch(() => { /* a failed view log should never affect the visitor */ });
}

export function sendEnquiry({ name, email, message }) {
  if (!db) return Promise.reject(new Error('Firebase is not configured'));
  return addDoc(collection(db, EVENTS), {
    type: 'enquiry',
    createdAt: serverTimestamp(),
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 150),
    message: message.trim().slice(0, 2000),
  });
}

export function watchAuth(callback) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}

export const signInOwner = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOutOwner = () => signOut(auth);

// Live feed of the latest events for the owner.
export function watchEvents(callback, onError) {
  const q = query(collection(db, EVENTS), orderBy('createdAt', 'desc'), limit(50));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => {
      const data = d.data();
      return { id: d.id, ...data, createdAt: data.createdAt?.toDate() ?? new Date() };
    }));
  }, onError);
}
