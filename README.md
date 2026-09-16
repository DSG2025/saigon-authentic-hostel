# Saigon Authentic Hostel & Tours — Website V1

Production website source for **saigonauthentichostel.com**.

## Stack
- HTML
- CSS
- Vanilla JavaScript
- WhatsApp direct booking flow
- Vercel-ready

## Booking flow
All booking and room enquiries go to WhatsApp **+84 971 978 439**. The site asks only for check-in, check-out, guests and interest, then opens WhatsApp with a pre-written message.

## Branch workflow
- `main` = production
- `development` = future development work
- use feature/release branches for changes before merging to `main`

## Main files
- `index.html` — homepage, SEO and content
- `assets/css/styles.css` — responsive design system
- `assets/js/main.js` — WhatsApp booking + mobile navigation
- `data/site.json` — business details and ratings
- `robots.txt` and `sitemap.xml` — SEO basics
- `vercel.json` — Vercel deployment/security headers

## Current V1 image hosting
V1 references the verified project image assets already deployed on Vercel so the website can ship immediately. A later V1.1 can move all image files into this repository without changing the page structure.

## Deployment
Import this repository into Vercel, set `main` as Production Branch, then add:
- `saigonauthentichostel.com`
- `www.saigonauthentichostel.com`

The domain is registered at GoDaddy, so DNS records should be updated there only after Vercel confirms the required records.
