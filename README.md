# Talus (native)

React Native boilerplate for the Talus Android app, built on **Expo** — chosen
over bare React Native to avoid owning Android Studio/Gradle setup directly
and to keep builds cheap via EAS's free tier, in line with launching Android
first and adding iOS later.

Shares the same design tokens (`src/theme/index.js`) and Supabase backend as
the web app — same colors, same Fraunces + Inter type system, same auth
project.

## What's here

- **Auth** — Supabase magic-link sign-in
- **Feed** — placeholder trade listings (bottom tab)
- **Search** — placeholder for artist/set/language filters (bottom tab)
- **Collection** — binder-grid placeholder, same 9-pocket concept as the web
  Landing page (bottom tab)
- **Profile** — placeholder + sign out (bottom tab)
- **Listing** — trade detail screen (pushed from Feed)

All list data is hardcoded placeholder — same as the web scaffold — wiring to
real Supabase tables is the next step.

## Setup

You'll need [Node.js](https://nodejs.org) (v18+) and the Expo Go app on your
Android phone for local testing (no Android Studio required for that).

```bash
npm install
cp .env.example .env
```

Fill in `.env` with the same Supabase Project URL and anon key as the web
app (Project Settings → API in your Supabase dashboard).

### Run it

```bash
npm run android
```

This opens Expo Dev Tools — scan the QR code with Expo Go on your Android
phone, or press `a` to launch in an Android emulator if you have one set up.

## Building an installable Android app

When you're ready for a real APK/AAB (not just Expo Go):

1. Install the EAS CLI: `npm install -g eas-cli`
2. `eas login`, then `eas build:configure`
3. `npm run build:android`

EAS builds in the cloud, so you don't need a local Android SDK for this
either. Free tier covers early-stage usage; check current EAS pricing before
you're building frequently.

## Next steps, in order

1. Wire `FeedScreen`, `CollectionScreen`, and `ListingScreen` to real
   Supabase queries (same tables as the web app: `profiles`, `cards`,
   `listings`).
2. Add pull-to-refresh and loading states once data is live.
3. Card scanning — same plan as web: vision API once manual entry works.
4. App icons/splash — replace the placeholders referenced in `app.json`
   under `assets/`.
5. When you're ready for iOS, most of this (screens, theme, Supabase logic)
   carries over — you'd mainly need iOS-specific config in `app.json` and an
   Apple developer account for EAS builds.
