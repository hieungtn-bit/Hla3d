# HLA3D — học mỗi ngày

Ba lớp học miễn phí — **tiếng Việt, toán và tiếng Anh** — của ba anh em Hưng (8), Long (6)
và Anh (5), học theo lối nhà học Do Thái. Không bán gì, không quảng cáo, không cần tài khoản.

Nhà có một máy in 3D để các bé học. Các bé chưa tự thiết kế mẫu: các bé tìm mẫu trên
MakerWorld và in ra cùng người lớn. Trang **Góc in 3D** nối việc đó với các bài học.

> **Hai luật của trang**
> 1. **Không có chuyện bịa.** Trang chỉ nói điều nhà mình đã xác nhận.
> 2. **Không thương mại.** Không giỏ hàng, không đặt hàng, không giá tiền.
>
> `npm run test:content` báo lỗi nếu một trong hai luật bị phá. Việc còn lại cho người lớn:
> [`NOI-DUNG-CAN-XAC-NHAN.md`](NOI-DUNG-CAN-XAC-NHAN.md).

---

## Running it

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # production build
npm run lint          # eslint
npm run test:content  # lesson content + the two rules above
```

Requires Node 20+. There is no database and no account: lesson progress lives in each
visitor's browser, and `/hom-nay` can save it to a file and restore it.

### Environment variables (optional, set on Vercel — never in this public repo)

| Variable | What it does | If unset |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | Overrides the built-in PostHog project key | The built-in public project key is used |
| `NEXT_PUBLIC_SITE_URL` | Overrides the canonical origin | `https://hla3d.fun` in production |

Analytics are anonymous page views plus right/wrong counts per lesson. No child's name, and
never which word a child got wrong.

---

## Routes

| Route | What it is |
|---|---|
| `/` | Homepage — the three classes, then the print corner |
| `/hom-nay` | **Hôm nay học gì** — what is due today across all three classes, what to start next, progress backup |
| `/hoc-tieng-viet`, `/hoc-tieng-viet/[skill]` | Tiếng Việt, 20 lessons, mẫu giáo → lớp 3 |
| `/hoc-toan`, `/hoc-toan/[skill]` | Maths, 24 lessons, with an optional typed-answer mode |
| `/hoc-tieng-anh`, `/hoc-tieng-anh/[set]` | English, 1000 words in 40 sets |
| `/goc-in-3d` | **Góc in 3D** — learning with the home printer: lesson links, one print step by step, crediting designers, a list of real prints (empty until the family adds one), safety rules |
| `/about` | What is true about the family |
| `/llms.txt` | Plain-language brief for AI assistants |

The old shop, order, gift-finder, name-studio and dashboard URLs, and `/lab` and `/journal`,
redirect permanently (see `next.config.ts`).

### Tests

`npm run test:content` checks, without a browser:

1. Tones are read off the spelling (Unicode), on both precomposed and decomposed input.
2. Every word-bank entry obeys the spelling rule it is used to teach.
3. Every Tiếng Việt generator (60,000 items) is re-read by an independent reader.
4. Every maths generator (72,000 items) is re-solved by an independent solver.
5. No source file outside the lesson data makes an invented claim about the family or offers
   something for sale.

---

## Project structure

```
src/
  app/
    layout.tsx                 root: fonts, metadata, analytics
    (site)/                    shares header + footer
      page.tsx                 homepage
      hom-nay/                 daily review board
      hoc-tieng-viet/ hoc-toan/ hoc-tieng-anh/   the three classes
      goc-in-3d/               the print corner
      about/
    llms.txt/  sitemap.ts  robots.ts  manifest.ts  not-found.tsx
  components/
    course/                    shared lesson engine (skill-lesson, course-wall)
    viet/ math/ learn/         per-class lesson and wall components
    today/                     today-board, backup
    print/                     how-printing-works (layer animation)
    home/                      hero, marquee, learn-cta, lesson-peek
    brand/ layout/ motion/ seo/
  data/
    viet/ math/ vocab/         lesson content
    print-corner.ts            lesson links for the print corner, and the list of real prints
    safety.ts  makers.ts  site.ts  levels.ts
  lib/                         leitner, stores, speech, analytics, site-url
scripts/check-content.mjs      npm run test:content
```

### Adding a real print

When the children finish printing something, add it to `prints` in
`src/data/print-corner.ts` — the name, who printed it, when, the MakerWorld link and the
designer's name exactly as MakerWorld shows it. The print corner shows it with the credit.

---

## Design notes

**Lesson content is generated, then checked independently.** Maths and Tiếng Việt items are
made by generators so a child cannot memorise answers; `test:content` re-solves them with code
that shares nothing with the app.

**Progress stays in the browser.** Leitner boxes (0/2/4/8/32 days) per word or skill, in
`localStorage`, with a file backup on `/hom-nay`.

**Motion is restrained.** One `Reveal` primitive drives scroll animation, and everything
respects `prefers-reduced-motion`.

Tokens live in `src/app/globals.css` under Tailwind v4's `@theme` (`paper`, `ink`, `flame`,
`carbon`, `lime`, `sky`, `sun`, …). Type is **Baloo 2** (display), **Nunito** (body) and
**JetBrains Mono** (labels), all with the `vietnamese` subset.
