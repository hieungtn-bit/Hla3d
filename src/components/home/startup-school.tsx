import { Doodle, type DoodleKind } from "@/components/brand/doodle";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Lesson = {
  n: string;
  word: string;
  wordEn: string;
  kid: string;
  example: string;
  doodle: DoodleKind;
  bg: string;
  chip: string;
  hex: string;
};

/**
 * The teaching core of the whole site.
 *
 * HLA3D exists so three children learn how a business actually works, so the
 * vocabulary gets explained here in words a five-year-old can hold — each one
 * paired with the real thing that happened in this house.
 */
const LESSONS: Lesson[] = [
  {
    n: "01",
    word: "Ý TƯỞNG",
    wordEn: "Idea",
    kid: "Nghĩ ra một món mà người khác đang cần — chứ không phải món mình thích nhất.",
    example: "Hưng muốn in khủng long. Nhưng người ta hỏi mua bảng tên. Tụi em làm bảng tên trước.",
    doodle: "bolt",
    bg: "bg-sun-tint",
    chip: "bg-sun text-ink",
    hex: "#ffc93c",
  },
  {
    n: "02",
    word: "SẢN PHẨM",
    wordEn: "Product",
    kid: "Làm ý tưởng thành đồ thật, cầm được trên tay, không gãy khi rơi.",
    example: "Bạch tuộc hỏng 6 lần mới ra bản thứ 7 bẻ được. Bản 1 đến 6 là cục nhựa.",
    doodle: "gear",
    bg: "bg-sky-tint",
    chip: "bg-sky text-white",
    hex: "#3fa9f5",
  },
  {
    n: "03",
    word: "KHÁCH HÀNG",
    wordEn: "Customer",
    kid: "Người chịu bỏ tiền thật ra mua. Người nhà tặng tiền thì không tính nha!",
    example: "Khách số 1 không phải họ hàng. Cô ấy hỏi một câu tụi em không trả lời được.",
    doodle: "smile",
    bg: "bg-rose-tint",
    chip: "bg-rose text-ink",
    hex: "#ff7eb0",
  },
  {
    n: "04",
    word: "GIÁ VỐN",
    wordEn: "Cost",
    kid: "Làm ra một món tốn bao nhiêu: nhựa, điện, hộp giấy, và cả những lần in hỏng.",
    example: "Một món bán 150.000đ thì hết 60.000đ tiền vốn. Lúc đầu tụi em tưởng chỉ hết 13.000đ.",
    doodle: "spiral",
    bg: "bg-grape-tint",
    chip: "bg-grape text-white",
    hex: "#7b5cf0",
  },
  {
    n: "05",
    word: "LỢI NHUẬN",
    wordEn: "Profit",
    kid: "Tiền bán được trừ đi tiền vốn. Phần còn lại mới thật sự là của mình.",
    example: "150.000đ trừ 60.000đ còn 90.000đ. Đó mới là số tụi em được tính là kiếm được.",
    doodle: "star",
    bg: "bg-lime-tint",
    chip: "bg-lime text-ink",
    hex: "#b6e64a",
  },
  {
    n: "06",
    word: "TÁI ĐẦU TƯ",
    wordEn: "Reinvest",
    kid: "Lấy một phần tiền lời mua đồ tốt hơn, để lần sau làm được nhiều hơn.",
    example: "40% tiền lời để dành mua máy in thứ hai. Còn 5.000.000đ nữa là đủ.",
    doodle: "arrow",
    bg: "bg-flame-tint",
    chip: "bg-flame text-white",
    hex: "#ff4a17",
  },
];

export function StartupSchool() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-paper py-20 sm:py-28">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-hla relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="sticker inline-flex items-center gap-2 rounded-full bg-grape px-4 py-2 font-display text-sm font-extrabold text-white">
            <Doodle kind="sparkle" className="size-4" color="#fff" strokeWidth={4} />
            LỚP HỌC STARTUP
          </span>
          <h2 className="display mt-6 text-[clamp(2rem,5.5vw,3.5rem)]">
            STARTUP LÀ GÌ,
            <br />
            NÓI KIỂU TRẺ CON.
          </h2>
          <p className="mt-5 text-base leading-relaxed font-semibold text-ink-2 sm:text-lg">
            HLA3D không phải shop đồ chơi. Đây là cách Ba dạy Hưng, Long và Anh sáu chữ khó nhất của
            người lớn — bằng đúng những chuyện đã xảy ra trong nhà.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map((l, i) => (
            <Reveal key={l.n} delay={i * 0.07}>
              <article
                className={cn(
                  "sticker press group flex h-full flex-col rounded-[var(--radius-card)] p-6",
                  l.bg,
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl border-2 border-ink",
                      l.chip,
                    )}
                  >
                    <Doodle kind={l.doodle} className="size-6" color="currentColor" strokeWidth={3.5} />
                  </span>
                  <span className="font-mono text-xs text-ink-3">{l.n}</span>
                </div>

                <h3 className="display mt-5 text-3xl text-ink">{l.word}</h3>
                <p className="mt-1 font-mono text-[0.6875rem] tracking-wider text-ink-3 uppercase">
                  {l.wordEn}
                </p>

                <p className="mt-4 text-[0.9375rem] leading-relaxed font-bold text-ink">{l.kid}</p>

                <div className="mt-auto pt-5">
                  <div className="rounded-2xl border-2 border-dashed border-ink/30 bg-surface/70 p-4">
                    <p className="eyebrow mb-1.5 text-ink-3">Chuyện thật ở nhà</p>
                    <p className="text-xs leading-relaxed text-ink-2">{l.example}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* the one rule that ties it together */}
        <Reveal delay={0.1} className="mt-12">
          <div className="sticker mx-auto max-w-3xl rotate-[-0.6deg] rounded-[var(--radius-card)] bg-ink p-7 text-center sm:p-9">
            <p className="eyebrow text-sun">Luật số 1 dán trên tường</p>
            <p className="display mt-4 text-2xl text-paper sm:text-3xl">
              “Bán được một món không có nghĩa là mình giỏi.
              <br />
              Biết mình lời bao nhiêu mới là biết làm ăn.”
            </p>
            <p className="mt-4 text-sm font-semibold text-paper/60">— Ba</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
