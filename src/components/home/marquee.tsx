const ITEMS = ["NGHĨ RA.", "VẼ RA.", "IN RA.", "THỬ ĐỘ BỀN.", "GÓI GỬI ĐI."];

export function Marquee() {
  const strip = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="border-y-2 border-ink bg-flame py-4 text-white">
      <div className="hide-scrollbar flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-8 pr-8">
          {strip.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-xl font-extrabold whitespace-nowrap sm:text-2xl">
                {item}
              </span>
              <span className="size-2 shrink-0 rounded-full border-2 border-white bg-sun" />
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-8 pr-8">
          {strip.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-xl font-extrabold whitespace-nowrap sm:text-2xl">
                {item}
              </span>
              <span className="size-2 shrink-0 rounded-full border-2 border-white bg-sun" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
