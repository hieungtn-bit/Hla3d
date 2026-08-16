# HLA3D — Young Maker 3D Printing Lab

Brand site and storefront for **HLA3D**, a family 3D-printing startup run by three
brothers with Dad as investor, mentor and safety supervisor.

> **DREAM IT. DESIGN IT. PRINT IT.**
> Ý tưởng nhỏ. Tạo nên điều thật.

---

## Running it

```bash
cd hla3d
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

Requires Node 20+. No environment variables and no backend are needed — the MVP
runs entirely on local mock data.

---

## Routes

| Route | Rendering | What it is |
|---|---|---|
| `/` | Static | Homepage — hero, makers, how it works, shop preview, first-100 goal, lab, money lesson, Dad, journal |
| `/shop` | Static | Product grid with category filters (DESK · TOYS · CUSTOM · GIFTS · STEM) |
| `/shop/[slug]` | SSG × 15 | Product detail, colour picker, add-to-cart, `Product` JSON-LD |
| `/custom` | Dynamic | **Make It Yours** — custom 3D studio with a live extruded preview |
| `/lab` | Static | The mini factory — printer status, queue, filament shelf, safety rules |
| `/journal` | Static | Editorial index |
| `/journal/[slug]` | SSG × 5 | Long-form entry, `BlogPosting` JSON-LD |
| `/about` | Static | Brand story, team, timeline, Dad, safety, money lesson |
| `/order/confirmed` | Static | Order-number experience (`ORDER #HLA0028`), `noindex` |
| `/dashboard` | Static | Private startup dashboard — metrics, chart, maker skills, XP, money split |
| `/sitemap.xml`, `/robots.txt` | Static | SEO |

`/dashboard` is unlisted in the main nav and excluded from `robots.txt`. **It has no
authentication** — it is a demo surface only. Do not put real data in it until
phase 2 adds auth.

---

## Project structure

```
src/
  app/
    layout.tsx              root: fonts, metadata, CartProvider, cart drawer
    (site)/                 public site — shares header + footer
      page.tsx              homepage
      shop/ shop/[slug]/
      custom/
      lab/
      journal/ journal/[slug]/
      about/
      order/confirmed/
    dashboard/              private route with its own dark chrome
    sitemap.ts  robots.ts  not-found.tsx  globals.css
  components/
    brand/                  logo, maker-desk hero scene
    home/                   hero, marquee, maker-card, how-it-works, dad-section, journal-preview
    products/               product-card, product-detail, product-visual, shop-grid, color-dots, maker-rating
    custom/                 custom-studio, nameplate-preview
    lab/                    printer-status
    dashboard/              stat-card, revenue-chart, maker-xp
    layout/                 site-header, site-footer, cart-drawer
    motion/                 reveal
    ui/                     button, badge, card, field (shadcn-style primitives)
    section.tsx  page-intro.tsx  goal-progress.tsx  money-breakdown.tsx
  data/                     products · makers · journal · lab · dashboard · site
  lib/                      cart (external store) · utils (cn, VND formatting)
```

### Data layer

All content lives in `src/data/*.ts` as typed constants — prices, products,
journal entries, printer state, dashboard metrics, safety rules. Nothing is
hardcoded in a component. Swapping in Supabase means replacing those modules;
components stay untouched.

---

## Design decisions worth knowing

**Product photography is drawn, not shot.** `ProductVisual` turns one filament hex
into a three-tone isometric SVG render, per shape family. That keeps the shop
visually coherent while the makers change colours freely, and it means no photo
of a child ever ships. A per-shape fit transform normalises how much of the frame
each product occupies.

**The 3D preview is CSS, not WebGL.** `NameplatePreview` stacks DOM layers inside a
`preserve-3d` scene with drag-to-rotate. It reads as a real extruded print, works
on any phone, and costs a fraction of the bundle React Three Fiber would. If the
studio later needs true geometry (STL preview, curved surfaces), that is the point
to introduce R3F — behind a dynamic import, for that route only.

**Cart state is an external store.** `src/lib/cart.tsx` keeps lines outside React
and reads them through `useSyncExternalStore`, with an empty server snapshot. That
restores a persisted cart without a hydration mismatch and without a setState in an
effect.

**Chart colours were validated, not guessed.** The dashboard's revenue/profit chart
uses `#ff4a17` / `#2f8fd8`, checked against the `#0f0f13` dashboard surface for
lightness band, chroma floor, colourblind separation and contrast. Bar height is
revenue; the split is cost + profit, so there is one axis and one unit — never a
dual-axis chart.

**Motion is restrained.** One `Reveal` primitive drives every scroll animation, and
everything respects `prefers-reduced-motion`.

---

## Design system

Tokens live in `src/app/globals.css` under Tailwind v4's `@theme`.

| Role | Token | Value |
|---|---|---|
| Background | `paper` / `paper-2` | `#f5f2ed` / `#efeae2` |
| Ink | `ink` / `ink-2` / `ink-3` | `#17171c` / `#57575f` / `#8b8b95` |
| Primary | `flame` | `#ff4a17` |
| Dark surfaces | `carbon` / `carbon-2` | `#0f0f13` / `#191920` |
| Accents (controlled) | `lime` / `sky` / `sun` | `#c6f24e` / `#3fa9f5` / `#ffc93c` |

Type: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (data and
eyebrows) — all loaded with the `vietnamese` subset. Utilities `display`, `eyebrow`,
`container-hla`, `grid-paper`, `grid-carbon`, `layer-lines` and `tactile` keep the
rhythm consistent across pages.

---

## Phase 2 (not built)

The architecture is arranged so each of these is an isolated change:

1. **Supabase** — replace `src/data/*` with queries; types already match.
2. **Payments** — the cart's `placeOrder` in `cart-drawer.tsx` is the single seam
   for a Vietnamese gateway (VNPay / MoMo) or Stripe.
3. **Real order numbers** — `orderNumber()` in `src/lib/utils.ts` plus a counter.
4. **Live printer telemetry** — `PrinterState` in `src/data/lab.ts` mirrors a
   Moonraker/OctoPrint payload shape.
5. **Dashboard auth** — the `/dashboard` route group is already isolated.
6. **Marketplace sync** — Shopee / TikTok Shop feeds can be generated from
   `src/data/products.ts`.

---

Designed, printed & packed in Vietnam.
