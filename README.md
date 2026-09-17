# LUNA

This is your existing LUNA application (`src/App.tsx` — unchanged UI, text, styling, and logic) packaged as a standalone Vite + React project for deployment to GitHub Pages, with Firebase configured through environment variables instead of the Gemini-sandbox-only globals it originally relied on.

## What changed, and why

Your original `App.tsx` read Firebase config from `__firebase_config`, `__app_id`, and `__initial_auth_token` — globals injected automatically inside Google Gemini's runtime. Those don't exist on GitHub Pages, so the app initialized Firebase with an empty `{}` config and crashed silently, producing a blank white page.

Files changed:

- **`src/firebase.ts` (new)** — Firebase is now initialized here, from `import.meta.env.VITE_FIREBASE_*` variables, instead of inside `App.tsx`. If required variables are missing, it does *not* initialize with an empty config (which crashes); instead it exposes `isFirebaseConfigured`/`firebaseInitError` so the UI can show a message.
- **`src/App.tsx`** — only the top-of-file Firebase init block and the auth-effect were touched:
  - Firebase imports/init now come from `./firebase` instead of being redeclared inline.
  - The `__initial_auth_token` / `signInWithCustomToken` branch was removed (that global never exists outside Gemini) — the app now always uses `signInAnonymously`, which your code already had as its fallback path, so behavior for a standalone deployment is unchanged.
  - Added a short-circuit screen shown only if Firebase config is missing/invalid, and a `console.error` handler if the QR-code script fails to load.
  - No UI, text, components, Tailwind classes, collections, or Firestore paths were changed anywhere else in this 1300+ line file.
- **`src/ErrorBoundary.tsx` (new)** — wraps the app so an unexpected runtime error shows a plain message instead of a blank page. Purely a safety net; doesn't touch your UI.
- **`src/main.tsx`** — wraps `<App />` in the new `ErrorBoundary` and throws a clear error if `#root` isn't found, instead of failing silently.
- **`vite.config.ts`** — `base` set to `/LUNA/` to match this repo name.
- **`.github/workflows/deploy.yml`** — Node bumped from 20 to 22 (current LTS), and the build step now passes `VITE_FIREBASE_*` values through from GitHub Actions secrets.
- **`.env.example` (new)** — lists the required variable names with empty values.
- **`package.json`** — renamed to `luna`; dependencies unchanged (still just `react`, `react-dom`, `firebase` + Vite tooling).

Nothing else was touched — no redesign, no rewritten components, no changed collections or data structure.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Firebase locally

Copy the example env file and fill in your Firebase project's **Web app** config (Firebase Console → Project Settings → General → Your apps → SDK setup and configuration):

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...   # optional
VITE_LUNA_APP_ID=...               # optional, defaults to 'default-app-id'
```

These are the standard **public** Firebase web config values — safe to ship in a frontend build. Real protection comes from Firebase Authentication + Firestore Security Rules, not from hiding these values. Never put Admin SDK credentials or a `serviceAccountKey.json` in this project.

### Firebase Authentication

Enable **Anonymous** sign-in: Firebase Console → Authentication → Sign-in method → Anonymous → Enable. The app signs users in anonymously on load (this was already the fallback behavior in your original code); your own LUNA login screen then layers on top of that, unchanged.

### Firestore structure expected by the app

The app reads/writes these collections under:

```
artifacts/{appId}/public/data/{collection}
```

- `luna_users`
- `luna_components`
- `luna_transactions`

`{appId}` comes from `VITE_LUNA_APP_ID` (defaults to `default-app-id` if unset) — this is unchanged from the original app's logic. Make sure your Firestore Security Rules allow the anonymous-auth user to read/write these paths as your app requires.

## 3. Run locally

```bash
npm run dev
```

## 4. Deploy to GitHub Pages

This repo is `LUNA`, so GitHub Pages will serve it at:

```
https://<your-github-username>.github.io/LUNA/
```

`vite.config.ts` is already set to `base: '/LUNA/'` to match.

### Add your Firebase config as GitHub secrets

The GitHub Actions build needs the same `VITE_FIREBASE_*` values to bake into the production build. In your repo: **Settings → Secrets and variables → Actions → New repository secret**, and add each of:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
- `VITE_LUNA_APP_ID` (optional)

(Repository *variables* work the same way if you'd rather use those since these aren't private secrets — either is fine; the workflow reads them as `secrets.*`, so if you use repo variables instead, change that prefix to `vars.*` in `.github/workflows/deploy.yml`.)

### Enable Pages + push

1. **Settings → Pages → Source → GitHub Actions**.
2. Push this project to the `main` branch.
3. The included workflow (`.github/workflows/deploy.yml`) runs automatically on every push to `main` (or manually via **Actions → Deploy to GitHub Pages → Run workflow**): it checks out the repo, installs dependencies, builds with your Firebase secrets injected, and deploys `dist/` to Pages.
4. Your site goes live at `https://<your-github-username>.github.io/LUNA/`.

If you ever see a blank page, open the browser console first — the app now shows an explicit "Configuration Error" screen if Firebase env vars are missing, and an "Something went wrong" screen for any other runtime error, instead of failing silently.
