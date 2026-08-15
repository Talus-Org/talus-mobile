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

## Android Studio & SDK Setup
 
Setting up an Android emulator so `npm run android` works locally for the
Talus mobile app.
 
### 1. Download Android Studio
Go to [developer.android.com/studio](https://developer.android.com/studio)
and download the Mac version. Open the `.dmg` and drag Android Studio into
Applications, then launch it.
 
### 2. Run the setup wizard
On first launch, choose the **Standard** install type. This downloads the
Android SDK, an emulator system image, and other required tools
automatically — it can take 10–20 minutes depending on your connection.
 
### 3. Confirm the SDK location
In Android Studio, go to **Settings → Languages & Frameworks → Android SDK**
(or **Preferences** on some versions). Note the "Android SDK Location" path
at the top — it should match:
 
```
/Users/shadgabriellereyes/Library/Android/sdk
```
 
If it's different, use that actual path in step 4 instead.
 
### 4. Set `ANDROID_HOME` in your shell profile
Open `~/.zshrc` (or `~/.bash_profile` if you use bash) and add:
 
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
```
 
### 5. Reload your shell
Close and reopen your terminal (or run `source ~/.zshrc`), then confirm it
worked:
 
```bash
adb --version
```
 
You should see version info instead of a "command not found" error.
 
### 6. Create a virtual device (emulator)
In Android Studio, go to **More Actions → Virtual Device Manager → Create
Device**. Pick a phone profile (e.g. Pixel 7) and a system image (a recent
Android version with Play Store support). Finish and let it download the
image.
 
### 7. Launch the emulator, then run the app
Start the virtual device from the Device Manager, wait for it to fully
boot, then from the project root run:
 
```bash
npm run android
```
 
Expo should detect the running emulator and install the app on it
automatically.

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
