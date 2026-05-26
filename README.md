# Abogados Ambientales MX

Official corporate website for **Abogados Ambientales MX** — boutique environmental law firm in Mexico.

- **Live:** https://abogadosambientalesmx.com
- **Languages:** English (default) · Spanish (Mexico)
- **Stack:** Static HTML / CSS / vanilla JS — no build step required
- **Hosting:** Vercel (static deployment)

## Structure

```
.
├── index.html              # English (canonical /)
├── es/
│   └── index.html          # Spanish (/es/)
├── styles.css              # Single stylesheet
├── app.js                  # Vanilla JS — modal, nav, WhatsApp builder, i18n
├── assets/
│   ├── hero_background.webp / .jpg / .png
│   ├── og-image.jpg        # 1200x630 OpenGraph
│   ├── logo.png
│   └── favicon/            # PWA icons
├── favicon.ico
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── llms.txt                # GEO — AI search engines
└── vercel.json             # Headers + caching + redirects
```

## Local development

No build step. Open `index.html` directly, or run a local server:

```bash
npm run dev
# or
npx serve -l 3000 .
```

## Deploy

The repo is configured for [Vercel](https://vercel.com). On import:

1. Framework preset: **Other** (static)
2. Build command: *empty*
3. Output directory: `.`
4. Install command: *empty*

Vercel will pick up `vercel.json` automatically (security headers, caching, redirects).

### Custom domain

Add both `abogadosambientalesmx.com` (apex) and `www.abogadosambientalesmx.com` in the Vercel domain settings. Vercel will redirect `www` to apex by default; if you want the inverse, mark `www` as primary.

## SEO / GEO checklist

- [x] `lang` and `hreflang` on both EN and ES variants (`x-default → /`)
- [x] Canonical URLs on every page
- [x] Open Graph + Twitter Card with 1200×630 image
- [x] JSON-LD: `LegalService`, `Organization`, `WebSite`, `FAQPage`, `BreadcrumbList`
- [x] `robots.txt` opens the door to GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended
- [x] `llms.txt` summary for AI search engines (GEO)
- [x] FAQ section with visible, factual answers (also indexed by `FAQPage` schema)
- [x] Optimized hero (WebP 167 KB, JPEG fallback 244 KB; original PNG was 981 KB)
- [x] PWA manifest + theme color
- [x] WCAG: skip link, `aria-*`, reduced-motion media query, decorative images marked `aria-hidden`
- [x] Print stylesheet

## Contact channels

- **WhatsApp Business:** [+52 55 4569 7053](https://wa.me/525545697053)
- **Phone:** +52 55 4569 7053

The contact modal is a **WhatsApp builder** — it collects sector + practice area + name + brief, then opens WhatsApp with that context pre-filled as the first message. The firm intentionally operates without a public email address; all client intake flows through WhatsApp Business under attorney–client privilege.

## License

All copy, design and brand assets are © Abogados Ambientales MX. Not for redistribution.
