# Mike Kennedy — Applied AI Innovation Studio

Site for **Mike Kennedy, PhD** — an applied AI innovation studio combining science, data, AI and entrepreneurship.

Built with **Vite + React + Tailwind CSS + Framer Motion**. Four pages (Home, Projects, About, Contact). Design language: scientific credibility meets frontier innovation — off-white paper, deep charcoal, forest-green primary accent with copper and river-blue used sparingly; Inter + IBM Plex Mono; topographic / network visual motifs (People · Planet · Profit). Strict type scale, subtle ≤300ms motion, an ecosystem map of Mike's ventures, sector case-study cards, per-page titles, social/OG share image, a 404 page, and reduced-motion + keyboard-focus accessibility support.

### Type scale
Hero 72/48/36 · H2 48 · H3 32 · Body 18 (lh 1.6) · Small 14 — hero line-height 1.05.

### Colour
Charcoal `#111315` · Off-white `#F7F6F2` · Forest `#2E5E4E` · Copper `#B26E3A` · River `#355C7D`.

---

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Push to GitHub

From inside this folder:

```bash
git init
git add .
git commit -m "Mike Kennedy website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/redstone-studios.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username (and create the empty `redstone-studios` repo on GitHub first, without a README so the push isn't rejected).

---

## Deploy to Vercel

**Option A — Dashboard (easiest):**
1. Go to https://vercel.com/new
2. Import your `redstone-studios` GitHub repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`.
4. Click **Deploy**.

`vercel.json` is already included so client-side routes (`/services`, `/about`, `/contact`) resolve correctly on refresh/direct link.

**Option B — CLI:**
```bash
npm i -g vercel
vercel          # follow prompts; first run links the project
vercel --prod   # deploy to production
```

---

## Things to finish before launch

1. **Contact form** — open `src/pages/Contact.jsx` and paste your Formspree endpoint into the `FORM_ENDPOINT` constant near the top. Until then, the form prompts visitors to use the booking link. (Free option: create a form at https://formspree.io and copy the `https://formspree.io/f/xxxx` URL.)
2. **Calendly** — all "Book a Call" buttons already point to `https://calendly.com/milkennedy/15min`. Change it globally by searching the project for that string if needed.
3. **Headshot** — Mike's photo lives at `src/assets/mike.jpg`. Replace that file (same name) to swap it.

---

## Project structure

```
src/
  main.jsx            app entry + router
  App.jsx             layout shell, routes, page transitions
  index.css           Tailwind layers, grain, shimmer, base styles
  components/
    Navbar.jsx        scroll-aware nav + mobile menu
    Footer.jsx
    ui.jsx            Logo, buttons, Eyebrow, Reveal wrapper
    Effects.jsx       scroll-progress bar + custom cursor
  pages/
    Home.jsx          hero, problem, approach, metrics, CTA
    Services.jsx      tiers, enterprise/fractional, workflows, funding
    About.jsx         founder, industries, example outcomes
    Contact.jsx       booking card + form
  assets/
    mike.jpg
```
