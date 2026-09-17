// Standalone Firebase configuration for the LUNA app.
//
// This replaces the Gemini-sandbox-only globals (__firebase_config,
// __app_id, __initial_auth_token) that App.tsx originally relied on.
// Those globals don't exist on GitHub Pages, so config now comes from
// standard Vite environment variables (see .env.example).
//
// If the required variables are missing, Firebase is NOT initialized
// with an empty object (which would throw deep inside the SDK on first
// use and produce a blank white screen). Instead `isFirebaseConfigured`
// is set to false so App.tsx can show a clear, readable error message.

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  ...(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    ? { measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID }
    : {}),
};

// The Firestore data path the app already uses is:
//   artifacts/{appId}/public/data/{collection}
// That "appId" is a logical namespace, not the Firebase app ID, so it
// gets its own variable (falls back to the original default so
// behavior is unchanged if you don't set it).
export const appId = import.meta.env.VITE_LUNA_APP_ID || 'default-app-id';

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let firebaseInitError: string | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    firebaseInitError = err instanceof Error ? err.message : String(err);
    console.error('Firebase initialization error:', err);
  }
} else {
  firebaseInitError =
    'Firebase configuration is missing. Set the VITE_FIREBASE_* environment variables (see .env.example / README.md).';
  console.error(firebaseInitError);
}

export { app, auth, db, firebaseInitError };
