import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { nav, site } from "@/data/site";

const secondary = [
  { href: "/about", label: "Chuyện của tụi em" },
  { href: "/goc-in-3d#an-toan", label: "An toàn với máy in 3D" },
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
              Học mỗi ngày.
              <br />
              Làm thật.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed font-semibold text-white/60">
              Hưng 8 tuổi · Long 6 tuổi · Anh 5 tuổi. Ba lớp học miễn phí, và một máy in 3D ở nhà
              để học — không bán gì.
            </p>
            <p className="mt-5 text-sm text-white/60">
              Thấy bài học nào sai?{" "}
              <a href="mailto:hieungtn@gmail.com" className="font-bold text-sun underline underline-offset-4 hover:text-flame">
                Gửi email góp ý
              </a>
            </p>
          </div>

          <nav aria-label="Học">
            <p className="eyebrow text-sun">Học</p>
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

          <nav aria-label="Phía sau">
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
            <p className="eyebrow text-lime">Mỗi ngày</p>
            <p className="mt-5 font-display text-2xl font-bold tracking-tight">Vài phút ôn bài.</p>
            <p className="mt-1 text-sm text-white/50">Trang Hôm nay chỉ ra bài nào đến hạn ôn.</p>
            <Link
              href="/hom-nay"
              className="sticker press mt-5 inline-flex h-11 items-center rounded-full bg-flame px-5 font-display text-sm font-extrabold text-white"
            >
              HÔM NAY HỌC GÌ
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-carbon-line pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Làm tại nhà, ở Việt Nam. Không quảng cáo, không bán hàng.</p>
          <p className="font-mono">
            © {site.founded}–{new Date().getFullYear()} HLA3D · Dự án của gia đình.
          </p>
        </div>
      </div>
    </footer>
  );
}
