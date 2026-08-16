import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { contact, goal, nav, site } from "@/data/site";
import { toPercent } from "@/lib/utils";

const secondary = [
  { href: "/about", label: "Chuyện của tụi em" },
  { href: "/about#safety", label: "An toàn khi làm" },
  { href: "/lab", label: "Xưởng in" },
  { href: "/dashboard", label: "Bảng theo dõi" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-carbon text-white">
      <div className="container-hla py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-11" />
              <span className="font-display text-2xl leading-none font-bold tracking-[-0.04em]">
                HLA<span className="text-flame">3D</span>
              </span>
            </div>
            <p className="display mt-6 text-3xl text-white">
              Ý tưởng nhỏ.
              <br />
              Tạo nên điều thật.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed font-semibold text-white/60">
              Hưng 8 tuổi · Long 6 tuổi · Anh 5 tuổi. Một chiếc máy in 3D đặt ở góc nhà.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-white/60">
              <p className="font-bold text-white">Đặt hàng hoặc hỏi gì cứ gọi</p>
              <p>
                <a href={contact.tel} className="font-display text-xl font-extrabold text-sun hover:text-flame">
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-sun"
                >
                  Nhắn Zalo
                </a>
                {" · "}
                <a href="mailto:Hieungtn@gmail.com" className="underline underline-offset-4 hover:text-sun">
                  Email
                </a>
              </p>
            </div>
          </div>

          <nav aria-label="Shop">
            <p className="eyebrow text-sun">Ghé xem</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-flame">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About">
            <p className="eyebrow text-sky">Phía sau</p>
            <ul className="mt-5 space-y-3">
              {secondary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-flame">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-lime">Mục tiêu</p>
            <p className="mt-5 font-display text-3xl font-bold tracking-tight">
              {goal.current}
              <span className="text-white/30"> / {goal.target}</span>
            </p>
            <p className="mt-1 text-sm text-white/50">{goal.label}</p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-flame"
                style={{ width: `${toPercent(goal.current, goal.target)}%` }}
              />
            </div>
            <Link
              href="/shop"
              className="sticker press mt-5 inline-flex h-11 items-center rounded-full bg-flame px-5 font-display text-sm font-extrabold text-white"
            >
              LÀM KHÁCH SỐ {goal.current + 1}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-carbon-line pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Thiết kế, in và đóng gói tại Việt Nam.</p>
          <p className="font-mono">
            © {site.founded}–{new Date().getFullYear()} HLA3D · Dự án của gia đình. Ba trông chừng mọi lúc máy chạy.
          </p>
        </div>
      </div>
    </footer>
  );
}
