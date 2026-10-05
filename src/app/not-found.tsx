import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="text-center">
        <p className="eyebrow text-flame">Không tìm thấy trang</p>
        <h1 className="display mt-5 text-[clamp(3rem,12vw,6rem)]">404</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-2">
          Trang này không có, hoặc đã được dời đi chỗ khác. Mình quay về học tiếp nhé.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/hom-nay"
            className="tactile inline-flex h-13 items-center justify-center rounded-full bg-flame px-7 py-4 font-display text-sm font-bold tracking-tight text-white hover:bg-flame-2"
          >
            HÔM NAY HỌC GÌ
          </Link>
          <Link
            href="/"
            className="tactile inline-flex h-13 items-center justify-center rounded-full border-2 border-ink px-7 py-4 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
          >
            VỀ TRANG CHỦ
          </Link>
        </div>
      </div>
    </div>
  );
}
