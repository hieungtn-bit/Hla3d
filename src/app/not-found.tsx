import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="text-center">
        <p className="eyebrow text-flame">Print failed</p>
        <h1 className="display mt-5 text-[clamp(3rem,12vw,6rem)]">404</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-2">
          This page came off the plate as a lump. It happens about once every twelve prints — we log it and
          try again.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="tactile inline-flex h-13 items-center justify-center rounded-full bg-flame px-7 py-4 font-display text-sm font-bold tracking-tight text-white hover:bg-flame-2"
          >
            BACK HOME
          </Link>
          <Link
            href="/shop"
            className="tactile inline-flex h-13 items-center justify-center rounded-full border-2 border-ink px-7 py-4 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
          >
            GO TO THE SHOP
          </Link>
        </div>
      </div>
    </div>
  );
}
