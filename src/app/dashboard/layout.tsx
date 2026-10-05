import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Startup Dashboard",
  description: "Bảng theo dõi riêng của Ba và ba anh em.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-carbon text-white">
      <header className="sticky top-0 z-90 border-b border-carbon-line bg-carbon/85 backdrop-blur-xl">
        <div className="container-hla flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark className="size-8" />
            <div>
              <p className="font-display text-sm leading-none font-bold tracking-tight">
                HLA<span className="text-flame">3D</span> · Dashboard
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.625rem] text-white/35">
                <Lock className="size-2.5" />
                PRIVATE · DAD + 3 MAKERS
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="tactile inline-flex h-10 items-center gap-2 rounded-full border border-carbon-line px-4 font-display text-xs font-bold tracking-tight text-white/70 hover:border-flame/50 hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            BACK TO SITE
          </Link>
        </div>
      </header>
      {/*
        Every number on this page is sample data written when the site was
        built, not the shop's real results. Ba replaces it in
        src/data/dashboard.ts; until then the page says so, even to the family.
      */}
      <div className="border-b border-carbon-line bg-sun/15">
        <p className="container-hla py-3 text-xs leading-relaxed font-semibold text-sun">
          SỐ LIỆU MẪU — các con số dưới đây được viết khi dựng trang để làm khung, chưa phải kết quả
          kinh doanh thật. Ba thay bằng số thật trong file src/data/dashboard.ts.
        </p>
      </div>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-carbon-line py-6">
        <p className="container-hla font-mono text-[0.625rem] text-white/25">
          MVP — figures are mock data held in <span className="text-white/40">src/data/dashboard.ts</span>.
          Phase 2 swaps this for Supabase. No authentication yet: do not put anything real here.
        </p>
      </footer>
    </div>
  );
}
