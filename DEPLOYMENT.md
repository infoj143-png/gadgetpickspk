# Production Deployment Guide & Launch Checklist

This document details the production readiness audit, deployment instructions, and post-launch verification checklist for the **GadgetPicksPK** premium affiliate discovery application.

---

## 1. Production Readiness Audit

### A. Routing & Link Integrity
- **App.jsx**: Uses React `lazy` and `Suspense` for modern bundle-splitting.
- **SPA Rewrite Handling**: Configured via `vercel.json` rewrite rules to route all path navigation back to `index.html` to prevent 404 errors during direct-link visits or hard-reloads on SPA routes.
- **SEO-Optimized Internal Linking**: Click events on local anchors (`<a>`) inside dynamic HTML descriptions (e.g., inside category detail, buying guide, and comparison views) are intercepted using a client-side click listener. This guarantees smooth, instantaneous client-side transitions via React Router without causing full-browser page refreshes.

### B. Layout & Responsive Design
- Fully audited on Desktop, Tablet, and Mobile views.
- **Header Navigation**: Contains responsive, fully accessible main menus, dark/light mode toggle, and unified instant autocomplete search suggesting matching items in real-time.
- **Mobile Catalog Filters**: Render as a premium sliding drawer with full background overlay, optimizing critical mobile above-the-fold content space.
- **Zero Cumulative Layout Shift (CLS)**: Every primary image container enforces explicit width/height dimension metrics and fallback skeleton views to satisfy Google Core Web Vitals targets.

### C. Technical SEO & Rich Schemas
- Managed dynamically using the custom `useSEO.js` custom hook:
  - Generates absolute URL canonical tags normalized to `https://gadgetpickspk.vercel.app` (ensures trailing-slashes are stripped to prevent search console indexing duplicate issues).
  - Handles page-specific dynamic Meta descriptions, keywords, titles, and high-fidelity Open Graph & Twitter Cards properties.
  - Dynamically injects `noindex, follow` tags during fallback routes or resources that are missing to avoid crawler indexing leakages.
- Injects fully validated dynamic JSON-LD structural schemas:
  - **BreadcrumbList**: Matches semantic category hierarchical pathways.
  - **Product**: Conservative mapping containing genuine editorial review summaries, preventing simulated review and FAQ spamming.

### D. Monetization & Analytics Integrity
- Handled via `src/utils/analytics.js` leveraging a custom `trackCTA` mechanism:
  - Track affiliate redirects, custom outbound links, and product share intents.
  - Safely fires custom conversion indicators to Google Analytics 4 (`gtag`), Meta Pixel (`fbq`), and Microsoft Clarity without blocking UI rendering or navigation paths.
- Codebase strictly enforces the use of authentic pricing, real-world product specifications, and valid affiliate URLs without using generic mock pricing or placeholder copy.

---

## 2. Going Live on Vercel (Step-by-Step Instructions)

Follow these exact steps to deploy the application live:

### Step 1: Clone & Configure Git
Ensure your branch is fully merged into the production branch (`main`):
```bash
git checkout main
git pull origin main
```

### Step 2: Vercel Project Setup
1. Log into your account at [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository (`gadgetpickspk`).
4. Keep the default Vite frameworks configuration:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or uses package-lock lockfile automatically)

### Step 3: Add Tracking Environment Variables (Optional)
If your production script setup requires injecting keys or container IDs (such as GA4 or Meta Pixel) dynamically at build time, configure them in the **Environment Variables** tab:
- `VITE_GA_MEASUREMENT_ID`
- `VITE_FB_PIXEL_ID`

### Step 4: Click Deploy
- Vercel will initiate the production build, run code compilation, optimize bundle splitting, and deploy the application.
- The Vercel rewrite configuration inside `vercel.json` will automatically map client routes to `index.html` seamlessly.

### Step 5: Configure Custom Domains (Optional)
1. Go to **Settings** -> **Domains** in your Vercel Dashboard.
2. Enter your custom domain (e.g., `gadgetpicks.pk` or keep the default `gadgetpickspk.vercel.app`).
3. Update your DNS configuration at your domain registrar with the provided CNAME or A records from Vercel.

---

## 3. Post-Launch Verification Checklist

Immediately after deployment goes live, execute the following manual tests:

- [ ] **Home Page Loading**: Visit `https://gadgetpickspk.vercel.app/` and verify dark/light mode toggle renders correctly.
- [ ] **Technical Sitemap**: Visit `/sitemap.xml` and `/robots.txt` to verify crawler files are readable.
- [ ] **Client Routing Validation**: Click on a product card, category shelf, and header search suggestion. Confirm navigation transitions are immediate and client-side (no browser refresh).
- [ ] **Direct URL Routing**: Hard-reload on a deep route like `/category/kitchen-dining` to verify Vercel SPA routing handles page direct load correctly.
- [ ] **Affiliate Outbound Clicks**: Click on a product's primary affiliate button and ensure the `trackCTA` conversion triggers seamlessly in the console/analytics network requests.
