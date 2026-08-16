const ITEMS = ["DREAM IT.", "DESIGN IT.", "PRINT IT.", "TEST IT.", "SHIP IT."];

export function Marquee() {
  const strip = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-line bg-ink py-4 text-paper">
      <div className="hide-scrollbar flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-8 pr-8">
          {strip.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl">
                {item}
              </span>
              <span className="size-1.5 shrink-0 rounded-full bg-flame" />
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-8 pr-8">
          {strip.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl">
                {item}
              </span>
              <span className="size-1.5 shrink-0 rounded-full bg-flame" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
