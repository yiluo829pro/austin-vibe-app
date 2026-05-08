# 🔥 Austin Vibe

Community-ranked vibe spots for Austin locals. Find where to go for any moment — not by category, but by *vibe*.

> "Where should we go for girls night?" → open a link, see a ranked list, vote, share into the group chat.

---

## What It Is

Austin Vibe is a share-first place discovery app for Austin locals. Instead of searching by category (restaurants, bars), users browse by **moment** — bachelorette, boys night, speakeasy hunt, first date, late night eats — and get a community-ranked list they can vote on and share instantly into a group chat.

**Core principles:**
- **Sub-3-second to value** — open a link, see a ranked list, vote, share. No signup required.
- **Share-first design** — every list is a shareable URL built for group chat drops.
- **Community-ranked** — spots are ranked by real Austin locals, not algorithms or paid placement.
- **Moment-specific** — 12 hyper-specific vibe categories that match how people actually talk about going out.

---

## The 12 Vibe Categories

| Slug | Name | Description |
|---|---|---|
| `/tequila` | 🥃 Tequila Night | Margaritas, mezcal & agave fire |
| `/speakeasy` | 🕵️ Speakeasy Hunt | Hidden bars, secret doors, password vibes |
| `/rooftop` | 🌆 Rooftop Season | Best views, golden hour, city skyline |
| `/bachelorette` | 👰 Bachelorette ATX | Drag brunch, bougie bars, the send-off |
| `/boysnite` | 🍺 Boys Night Out | Sports, pool tables, no-frills fun |
| `/girlsnite` | 💃 Girls Night Out | Cocktails, dancing, dress-up energy |
| `/bigw` | 🏆 Big W Energy | Promotion, new job, raise, graduation |
| `/firstdate` | 🌹 First Date | Impressive but not too try-hard |
| `/whiskey` | 🥃 Whiskey & Bourbon | Serious pours, old fashioned culture |
| `/latenight` | 🌮 Late Night Eats | Where to go at 1am after the bars |
| `/focusmode` | 💻 Focus Mode | Deep work, wifi, power outlets, quiet |
| `/sundayreset` | ☀️ Sunday Reset | Slow brunch, no rush, Bloody Marys |

---

## Features (v1.0)

- **88 seeded Austin venues** across all 12 categories with locally-written vibe descriptions
- **Upvote / downvote** per place per category — one vote per device
- **Live re-ranking** after every vote (optimistic UI, instant re-sort)
- **Top 10 display** with expand/collapse for the full list
- **Community nominations** — submit a missing spot; reaches 5 upvotes → graduates from *pending* to *community*
- **Native share sheet** on iOS/Android; clipboard copy on desktop
- **Deep links** — `austinvibe.co/speakeasy` loads directly into that vibe list
- **Vote persistence** via `localStorage` (MVP); rate-limited to 10 votes/hour per device
- **Dark mobile-first UI** with a CSS custom property design system
- **PWA-ready** — installable on iOS/Android home screen via `manifest.json`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS + CSS custom properties |
| Routing | History API (client-side, no React Router dependency) |
| State | React hooks + `localStorage` |
| Build | Vite 5 |
| PWA | `manifest.json` + SVG favicon |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (with HMR)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The dev server runs on `http://localhost:5173`. Deep links like `/speakeasy` work out of the box via Vite's dev server.

> **Note:** For static hosting (Netlify, Vercel, Cloudflare Pages), add a catch-all redirect rule so all paths serve `index.html`. On Vercel this is automatic; on Netlify add a `public/_redirects` file with `/* /index.html 200`.

---

## Project Structure

```
austin-vibe-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── manifest.json        ← PWA manifest
│   ├── favicon.svg
│   ├── icon-192.png
│   └── icon-512.png
└── src/
    ├── main.jsx
    ├── App.jsx              ← History API routing
    ├── data/
    │   ├── categories.js    ← 12 vibe category definitions
    │   └── places.js        ← 88 seeded Austin venues
    ├── components/
    │   ├── HomeGrid.jsx     ← Category card grid
    │   ├── VibeList.jsx     ← Ranked list + share + expand/collapse
    │   ├── PlaceCard.jsx    ← Individual place with rank badge + tags
    │   ├── VoteButtons.jsx  ← ▲ score ▼ with active toggle state
    │   ├── NominateForm.jsx ← Submit a missing spot
    │   └── Toast.jsx        ← Slide-up auto-dismiss notifications
    ├── hooks/
    │   ├── useVotes.js      ← localStorage votes + rate limiting
    │   └── useNominations.js← localStorage nominations
    └── styles/
        └── globals.css      ← Design system (CSS custom properties)
```

---

## Design System

```css
--bg:          #0f0f0f   /* page background */
--bg2:         #1a1a1a   /* card background */
--bg3:         #242424   /* input / tag background */
--border:      rgba(255,255,255,0.08)
--border2:     rgba(255,255,255,0.14)
--text:        #f0f0f0
--text2:       #999
--text3:       #666
--orange:      #e8571a   /* primary accent */
--green:       #2ecc71   /* upvote active */
--red:         #e74c3c   /* downvote active */
```

Typography uses the native system font stack (`-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif`) at 375px mobile base, responsive up to 1280px.

---

## Ranking Algorithm

```
net_score     = upvotes − downvotes
display_score = base_score + net_score
sort          = descending by display_score
```

`base_score` is a curated seed value that reflects historical community standing for each venue. Each anonymous vote counts as ±1; in Phase 2, verified account votes will count as 1.5×.

---

## Roadmap

### Phase 2 — Backend
- [ ] Node.js/Express API + PostgreSQL (replace localStorage)
- [ ] Real-time vote sync via Supabase Realtime
- [ ] Phone (SMS OTP) and email (magic link) account creation
- [ ] Private custom list creation and share links
- [ ] Account vote weight (1.5× vs anonymous)

### Phase 3 — Growth
- [ ] Photo upload per place
- [ ] "Open now" filter (Google Places hours)
- [ ] Map view with pins per vibe category
- [ ] AI vibe-match: describe your night → get a ranked list
- [ ] City expansion (Houston, Dallas, San Antonio)
- [ ] Weekly Vibe Report email newsletter

---

## URL Structure

```
austinvibe.co/               → home (category grid)
austinvibe.co/[slug]         → vibe list  e.g. /speakeasy
austinvibe.co/list/[token]   → private custom list (Phase 2)
austinvibe.co/account        → user account (Phase 2)
```

---

## Contributing

Spot a missing Austin venue? Nominate it directly in the app — 5 community upvotes and it joins the ranked list.

For code contributions: fork, branch off `main`, open a PR.

---

*Built for Austin locals, by people who have strong opinions about where to go on a Tuesday.*
