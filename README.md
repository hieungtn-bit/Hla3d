# HLA3D — học mỗi ngày, làm thật

Ba lớp học miễn phí — **tiếng Việt, toán và tiếng Anh** — của ba anh em Hưng (8), Long (6)
và Anh (5), học theo lối nhà học Do Thái. Kèm một cửa hàng in 3D nhỏ cho lúc rảnh: ba anh em
tìm mẫu 3D trên MakerWorld và in ra. Các bé chưa tự thiết kế mẫu.

> **Luật của trang:** không có chuyện bịa. Trang chỉ nói điều nhà mình đã xác nhận.
> Việc còn phải làm (ghi công nhà thiết kế, kiểm tra giấy phép từng mẫu, xác nhận lời hứa
> với khách) nằm trong [`NOI-DUNG-CAN-XAC-NHAN.md`](NOI-DUNG-CAN-XAC-NHAN.md).
> `npm run test:content` sẽ báo lỗi nếu những câu bịa cũ quay lại.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

Requires Node 20+. There is no database: lesson progress lives in each visitor's browser,
and orders are emailed.

### Environment variables (set on Vercel, never in this public repo)

| Variable | What it does | If unset |
|---|---|---|
| `RESEND_API_KEY` | Sends each order to mẹ Hiếu's inbox | Orders are logged and the customer is offered a pre-filled email instead |
| `DASHBOARD_PASSWORD` | Opens `/dashboard` (any username, this password) | `/dashboard` stays locked for everyone |
| `NEXT_PUBLIC_POSTHOG_KEY` | Overrides the built-in PostHog project key | The built-in public project key is used |
| `NEXT_PUBLIC_SITE_URL` | Overrides the canonical origin | `https://hla3d.fun` in production |

---

## Routes

| Route | What it is |
|---|---|
| `/` | Homepage — the three classes first, then the brothers, then why there is a shop |
| `/hom-nay` | **Hôm nay học gì** — what is due today across all three classes, what to start next, progress backup |
| `/hoc-tieng-viet`, `/hoc-tieng-viet/[skill]` | Tiếng Việt, 20 lessons, mẫu giáo → lớp 3 |
| `/hoc-toan`, `/hoc-toan/[skill]` | Maths, 24 lessons, with an optional typed-answer mode |
| `/hoc-tieng-anh`, `/hoc-tieng-anh/[set]` | English, 1000 words in 40 sets |
| `/shop`, `/shop/[slug]` | The shop: 15 products |
| `/chon-qua` | Three-tap gift finder |
| `/custom` | Custom 3D studio |
| `/dat-hang` | Order form (name + phone only) → `/api/dat-hang` |
| `/about` | What is true about the family, and safety rules for kids and 3D printers. `/lab` and `/journal` redirect here |
| `/dashboard` | Private dashboard — **password-protected** by `src/proxy.ts`; its numbers are sample data until replaced |
| `/feed.json`, `/llms.txt` | Machine-readable catalogue and brief for AI assistants |

### Tests

```bash
npm run test:content
```

Checks the lesson content without a browser: every generated maths and Tiếng Việt item is
re-solved by an independent solver (72,000 and 60,000 items), tones are read from Unicode
rather than labelled by hand, and every word-bank entry is checked against the spelling rule
it is used to teach. Exits non-zero on any failure — run it after editing `src/data/viet/` or
`src/data/math/`.

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
      about/
      order/confirmed/
    dashboard/              private route with its own dark chrome
    sitemap.ts  robots.ts  not-found.tsx  globals.css
  components/
    brand/                  logo, maker-desk hero scene
    home/                   hero, marquee, learn-cta, how-it-works, startup-school, why-shop, gift-cta
    products/               product-card, product-detail, product-visual, shop-grid, color-dots
    custom/                 custom-studio, nameplate-preview
    dashboard/              stat-card, revenue-chart, maker-xp
    layout/                 site-header, site-footer, cart-drawer
    motion/                 reveal
    ui/                     button, badge, card, field (shadcn-style primitives)
    section.tsx  page-intro.tsx  money-breakdown.tsx
  data/                     products · makers · safety · dashboard · site · vocab · math · viet
  lib/                      cart (external store) · utils (cn, VND formatting)
```

### Data layer

All content lives in `src/data/*.ts` as typed constants — prices, products,
lessons, dashboard sample metrics, safety rules. Each product has an optional
`source` (designer, MakerWorld link, licence) that is shown on its page once filled in. Nothing is
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
4. **Marketplace sync** — Shopee / TikTok Shop feeds can be generated from
   `src/data/products.ts`.

---

Printed & packed at home in Vietnam.
