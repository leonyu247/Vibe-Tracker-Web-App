# 🎯 Vibe Tracker

Track 10 weekends of vibe coding projects. Features: completion checkboxes, notes, manual time tracking, progress bar, "suggest next weekend" logic, multi-user auth, and PWA mobile support.

Weekend Projects instructions can be found at: https://aidbnewyear.com/join

Vibe Tracker Vercel Link: https://vibe-tracker-brown.vercel.app/

## Tech Stack

- **Next.js 16** (React, TypeScript, App Router)
- **Firebase** (Auth + Firestore)
- **Tailwind CSS**
- **PWA** (Service Worker, Manifest)
- **Vercel** (Deployment)

## Setup

### 1. Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use an existing one)
3. **Enable Authentication:**
   - Go to Authentication → Sign-in method
   - Enable **Email/Password** provider
4. **Create Firestore Database:**
   - Go to Firestore Database → Create database
   - Start in **production mode**
   - Add this security rule:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
     ```
5. **Get your config:**
   - Go to Project Settings → General → Your apps → Add web app
   - Copy the `firebaseConfig` values

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase values:

```bash
cp .env.local.example .env.local
```

### 3. Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the GitHub repo to [Vercel](https://vercel.com) and set the environment variables in the Vercel dashboard.

## Features

- ✅ 10 fixed weekends with completion checkboxes
- 📝 Notes field per weekend
- ⏱️ Manual time tracking (hours)
- 📊 Progress bar with stats
- ✨ "Suggest next weekend" logic
- 🔐 Multi-user authentication (email/password)
- 📱 PWA — installable on mobile
- ☁️ Cloud sync via Firestore
