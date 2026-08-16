export type JournalPost = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  displayDate: string;
  readingTime: string;
  author: string;
  tag: "First" | "Failure" | "Production" | "Money" | "Selling";
  excerpt: string;
  /** Simple paragraph/heading blocks — enough for an MVP without a CMS. */
  body: Array<{ type: "h2" | "p" | "quote" | "list"; text?: string; items?: string[] }>;
};

export const journal: JournalPost[] = [
  {
    slug: "our-first-3d-print",
    title: "Our First 3D Print",
    kicker: "Day one",
    date: "2025-03-14",
    displayDate: "14 tháng 3, 2025",
    readingTime: "3 phút",
    author: "Maker #01",
    tag: "First",
    excerpt:
      "It was a small orange cube. It took 22 minutes. It was slightly crooked and we thought it was the greatest object ever made.",
    body: [
      {
        type: "p",
        text: "The printer arrived in a box heavier than expected. Dad built it on the dining table on a Friday night and told us not to touch the hot part — a rule we have not broken since.",
      },
      {
        type: "p",
        text: "The first thing we printed was a calibration cube. 20 millimetres on every side. It is the boring thing everyone prints first, and we did not understand why until we measured ours: 20.3 × 20.1 × 19.8. Not a cube. A slightly wrong cube.",
      },
      { type: "h2", text: "What a wrong cube teaches you" },
      {
        type: "p",
        text: "A machine does not do what you imagine. It does what it is told, with the errors it happens to have. If we wanted to sell things later, we needed to know how wrong our machine is, and by how much, in which direction.",
      },
      {
        type: "quote",
        text: "Ba nói: 'Máy không sai. Máy chỉ làm đúng những gì nó được bảo.'",
      },
      {
        type: "p",
        text: "We printed nine more cubes over the next week, adjusting one setting each time and writing the number on the side with a marker. Those nine cubes are still in a jar next to the printer. They are the first thing we show anyone who visits.",
      },
    ],
  },
  {
    slug: "why-our-octopus-failed",
    title: "Why Our Octopus Failed",
    kicker: "Six times in a row",
    date: "2025-04-22",
    displayDate: "22 tháng 4, 2025",
    readingTime: "4 phút",
    author: "Maker #03",
    tag: "Failure",
    excerpt:
      "Six flexi octopuses came off the plate as a solid lump. Here is every reason, in order, and what we changed each time.",
    body: [
      {
        type: "p",
        text: "A flexi toy is printed already assembled. The joints are separate parts that never touch — they just sit very close together. If the gap is too small, the plastic fuses and you get an expensive paperweight.",
      },
      { type: "h2", text: "The six failures" },
      {
        type: "list",
        items: [
          "#1 — Gap set to 0.15mm. Every arm fused. Solid lump.",
          "#2 — Gap 0.2mm. Four arms moved, four did not.",
          "#3 — Gap 0.2mm, slower speed. Better, but the head detached.",
          "#4 — Head fixed, but printed too hot at 215°C. Everything welded again.",
          "#5 — 205°C. Arms moved. One arm snapped when tested.",
          "#6 — Wall count raised from 2 to 3. Snapped in a different place.",
        ],
      },
      {
        type: "p",
        text: "Number seven worked: 0.25mm gap, 205°C, three walls, and cooling fan at 100% from the second layer. It has been bent about four hundred times since and it still moves.",
      },
      { type: "h2", text: "What it cost" },
      {
        type: "p",
        text: "Roughly 240 grams of PLA and 14 hours of machine time. About 78.000đ of material. We were upset about the money until Dad pointed out that we had just learned something that most people pay a course for.",
      },
      {
        type: "quote",
        text: "Thất bại không phải là mất tiền. Thất bại là mất tiền mà không ghi lại được điều gì.",
      },
    ],
  },
  {
    slug: "we-printed-20-nameplates",
    title: "We Printed 20 Nameplates",
    kicker: "Our first real batch",
    date: "2025-06-08",
    displayDate: "8 tháng 6, 2025",
    readingTime: "5 phút",
    author: "Maker #02",
    tag: "Production",
    excerpt:
      "One name plate is a craft project. Twenty name plates in a week is a small factory — and it changed how we work.",
    body: [
      {
        type: "p",
        text: "A teacher at our school asked for name plates for her whole class. Twenty names, all different, some with Vietnamese diacritics. We said yes before working out what that meant.",
      },
      { type: "h2", text: "What went wrong at scale" },
      {
        type: "p",
        text: "The first five were fine. On number six we printed the wrong spelling. On number nine we forgot to swap the filament for the letters, so it came out all one colour. On number twelve we used a different orange because the first spool ran out mid-job.",
      },
      {
        type: "p",
        text: "So we stopped printing and made a checklist instead. Name spelled and checked twice by two different people. Colour written on the job card. Filament weighed before starting so we know it will finish.",
      },
      { type: "h2", text: "The number that surprised us" },
      {
        type: "p",
        text: "Twenty plates took 53 hours of machine time across six days. We could only run one job at a time, which means our whole factory produces about four name plates a day. Knowing that number changed what we promise customers.",
      },
      {
        type: "quote",
        text: "Bây giờ tụi em không hứa 'ngày mai có'. Tụi em hứa đúng số ngày tụi em làm được.",
      },
    ],
  },
  {
    slug: "how-much-does-one-3d-print-cost",
    title: "How Much Does One 3D Print Cost?",
    kicker: "We did the maths",
    date: "2025-07-19",
    displayDate: "19 tháng 7, 2025",
    readingTime: "6 phút",
    author: "Maker #02 & Dad",
    tag: "Money",
    excerpt:
      "Filament is the obvious cost. Electricity, failed prints, packaging and the machine itself are the ones that quietly eat the profit.",
    body: [
      {
        type: "p",
        text: "We used to think a print cost 'the plastic'. A one-kilogram spool of PLA costs about 320.000đ, so a 40 gram print costs about 12.800đ. Easy. Also wrong.",
      },
      { type: "h2", text: "The costs we forgot" },
      {
        type: "list",
        items: [
          "Electricity — the printer draws around 120W. A four-hour job is roughly 1.500đ.",
          "Failed prints — about 1 in 12 jobs fails. That failure rate has to be spread across the ones that succeed.",
          "Packaging — box, tissue, sticker and card come to about 10.000đ per order.",
          "Machine fund — the printer will wear out. We put 20.000đ per sale aside to replace it.",
          "Time — we do not pay ourselves yet, but Dad makes us write the hours down anyway.",
        ],
      },
      { type: "h2", text: "The honest number" },
      {
        type: "p",
        text: "On a 150.000đ product, real costs are about 60.000đ once everything is counted. That leaves 90.000đ. It is a good margin, but it is not 137.000đ, which is what we thought at the start.",
      },
      {
        type: "quote",
        text: "Lợi nhuận không phải là số tiền khách trả. Lợi nhuận là số còn lại sau khi trả cho mọi thứ.",
      },
    ],
  },
  {
    slug: "what-we-learned-selling-our-first-product",
    title: "What We Learned Selling Our First Product",
    kicker: "Customer #01",
    date: "2025-08-02",
    displayDate: "2 tháng 8, 2025",
    readingTime: "4 phút",
    author: "All three makers",
    tag: "Selling",
    excerpt:
      "Our first customer was not a relative. She asked one question we could not answer, and that question became our packing checklist.",
    body: [
      {
        type: "p",
        text: "She bought a Desk Buddy for 79.000đ. Before paying she asked: 'How long will it last if it sits in the sun?'",
      },
      {
        type: "p",
        text: "We did not know. PLA softens at around 60°C, which a car dashboard in Saigon reaches easily. We told her honestly that we did not know, tested it that weekend, and messaged her the answer three days later.",
      },
      { type: "h2", text: "What that taught us" },
      {
        type: "list",
        items: [
          "Saying 'I don't know, I'll find out' keeps a customer. Guessing loses one.",
          "Every product needs one line about where not to put it.",
          "A message after the sale is worth more than a discount before it.",
        ],
      },
      {
        type: "p",
        text: "She has since ordered twice more and sent us a photo of the Desk Buddy on her office desk — indoors, away from the window.",
      },
      {
        type: "quote",
        text: "Khách hàng đầu tiên không mua sản phẩm. Họ mua niềm tin rằng tụi em sẽ trả lời khi có chuyện.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return journal.find((p) => p.slug === slug);
}
