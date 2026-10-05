import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";
import { TOTAL_WORDS, vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";
import { vietSkills } from "@/data/viet";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-language brief for any AI assistant reading this site.
 *
 * It says what the site is (three free classes), what it is not (a shop),
 * and what it will not claim, so a model summarising it gets all three right.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.descriptionVi}`,
    "",
    "## Trang này là gì",
    "",
    "- HLA3D là BA LỚP HỌC MIỄN PHÍ cho trẻ em: tiếng Việt, toán và tiếng Anh, từ mẫu giáo đến lớp 3.",
    "- HLA3D KHÔNG phải cửa hàng. Không bán gì, không nhận đơn, không quảng cáo.",
    "- Nhà có một máy in 3D để ba anh em Hưng (8 tuổi), Long (6 tuổi) và Anh (5 tuổi) học. Các bé chưa tự thiết kế mẫu: các bé tìm mẫu có sẵn trên MakerWorld và in ra cùng người lớn. Mẫu 3D là của các nhà thiết kế trên MakerWorld.",
    `- Trang Góc in 3D (${absoluteUrl("/goc-in-3d")}) nói về việc học qua máy in 3D: từ vựng, đo đạc, an toàn, và tôn trọng người làm ra mẫu.`,
    "",
    "## Ôn bài mỗi ngày",
    "",
    `- ${absoluteUrl("/hom-nay")} — gom bài đến hạn ôn của cả ba lớp cho từng bé, kèm bài mới nên học tiếp.`,
    "- Tiến độ học lưu trong trình duyệt của người dùng, không gửi đi đâu. Có nút lưu tiến độ ra file để mang sang máy khác.",
    "",
    "## Lớp học tiếng Anh miễn phí",
    "",
    `- ${absoluteUrl("/hoc-tieng-anh")} — ${TOTAL_WORDS} từ tiếng Anh đầu tiên, chia ${vocabSets.length} chủ đề.`,
    "- Hoàn toàn miễn phí, không tài khoản. Tiến độ học lưu trong trình duyệt của người dùng. Trang chỉ đếm ẩn danh lượt xem và số câu đúng/sai của mỗi bài (PostHog); không ghi tên bé, không ghi từ nào bé trả lời sai.",
    "- Cách học: lặp lại ngắt quãng (hộp Leitner 5 mức: 0, 2, 4, 8, 32 ngày) cộng với bốn thói quen học của người Do Thái — chavruta (học đôi), chazara (ôn lại), kushia (hỏi ngược), và dạy lại.",
    "- Bé chưa biết đọc học được: nghe từ rồi chọn hình, không cần chữ. Phát âm dùng giọng đọc có sẵn của trình duyệt.",
    "- KHÔNG hứa \"học một lần nhớ mãi mãi\". Trang nói rõ trí nhớ nào cũng phai và việc phải làm là ôn đúng lúc.",
    "- Đây không phải trường học, không có giáo viên, không có chứng chỉ, không chấm điểm phần nói.",
    "",
    "## Lớp học tiếng Việt miễn phí",
    "",
    `- ${absoluteUrl("/hoc-tieng-viet")} — ${vietSkills.length} bài tiếng Việt từ mẫu giáo đến lớp 3: chữ cái, dấu thanh, chính tả, từ và câu.`,
    "- Nội dung do HLA3D tự viết. Phạm vi bám theo Chương trình GDPT 2018 (tài liệu công khai của Bộ GD&ĐT).",
    "- Nói rõ chỗ nào có luật (c/k, g/gh, ng/ngh) và chỗ nào chỉ có mẹo có ngoại lệ (s/x, tr/ch, d/gi/r, hỏi/ngã).",
    "- Tôn trọng giọng vùng miền: đọc s và x giống nhau không phải nói sai; chỉ khi viết mới cần phân biệt.",
    "- Không ra đề về vị trí đặt dấu (hoà/hòa) vì cả hai cách đều được chấp nhận.",
    "",
    "## Lớp học toán miễn phí",
    "",
    `- ${absoluteUrl("/hoc-toan")} — ${skills.length} bài toán từ mẫu giáo đến lớp 3.`,
    "- Nội dung do HLA3D tự viết. Phạm vi kiến thức bám theo Chương trình GDPT 2018 (tài liệu công khai của Bộ GD&ĐT); câu hỏi, cách làm và câu hỏi khó đều là bản gốc.",
    "- Đề bài do máy sinh ra nên không lặp lại; bé không học thuộc được đáp án.",
    "- Mỗi bài mở đầu bằng một câu hỏi chưa có đáp án, rồi mới đưa 2-3 cách làm khác nhau, cuối cùng là một câu hỏi khó không chấm điểm.",
    "- Phải đúng 5/6 bài mới được lên bậc ôn tập, để một lần đoán trúng không bị tính là đã thuộc.",
    "",
    "## Trang khác",
    "",
    `- [Cho ba mẹ](${absoluteUrl("/cho-ba-me")}) — cách dùng trang mười phút mỗi ngày, và những gì trang không làm được`,
    `- [Góc in 3D](${absoluteUrl("/goc-in-3d")}) — học qua máy in 3D, và luật an toàn khi trẻ dùng máy in`,
    `- [Chuyện của tụi em](${absoluteUrl("/about")}) — những gì có thật về ba anh em`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
