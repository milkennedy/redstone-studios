# Redstone Studios

Marketing site for Redstone Studios — a boutique AI transformation studio.

Built with **Vite + React + Tailwind CSS + Framer Motion**. Four pages (Home, Services, About, Contact) with parallax hero, animated blueprint, scroll-triggered reveals, animated counters, page transitions, a scroll-progress bar, and a custom cursor.

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
git commit -m "Redstone Studios website"
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
