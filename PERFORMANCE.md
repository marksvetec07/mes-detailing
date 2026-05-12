# Performance optimizations

## Fonts
- Both fonts (DM Sans + Bebas Neue) loaded via `next/font/google`
- Automatically self-hosted by Next.js at build time — zero external requests
- `font-display: swap` prevents FOIT (flash of invisible text)

## Images
- All images use Next.js `<Image>` with `sizes` prop → correct srcset generated
- Hero image has `priority` → preloaded, no LCP delay
- Formats: AVIF + WebP (configured in next.config.ts)
- Cache: 30 days for static assets

## CSS / JS
- `prefers-reduced-motion` respected — animations disabled for users who prefer it
- No unused CSS (Tailwind v4 purges automatically)
- `compress: true` in next.config.ts → Gzip/Brotli on all responses

## Security headers
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` set

## SEO
- Proper `<title>`, `<meta description>`, OpenGraph tags
- `lang="sl"` on HTML element
- `robots: "index, follow"`
- `themeColor` for mobile browsers
