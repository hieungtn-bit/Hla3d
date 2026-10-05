"use client";

import * as React from "react";
import { Download, Upload } from "lucide-react";

/**
 * Keeping a child's progress safe.
 *
 * Progress lives only in this browser's storage — that is what keeps the
 * site free of accounts and of any record of a child on a server. The cost
 * is that clearing the browser, or moving to another phone, wipes months of
 * review schedule. Nothing on the site said so. This says so, and gives a
 * parent a file to keep.
 *
 * The file goes from the browser to the parent's own device and nowhere
 * else; restoring reads it back the same way. Nothing is uploaded.
 */

const KEYS = ["hla3d.vocab.v1", "hla3d.math.v1", "hla3d.viet.v1"] as const;

type Backup = {
  app: "hla3d";
  kind: "learning-backup";
  version: 1;
  savedAt: string;
  data: Partial<Record<(typeof KEYS)[number], unknown>>;
};

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Checks the shape before anything is written, so a wrong file can never break the lessons. */
export function validateBackup(raw: unknown): Backup | string {
  if (!isObject(raw)) return "File này không phải bản sao lưu của HLA3D.";
  if (raw.app !== "hla3d" || raw.kind !== "learning-backup") return "File này không phải bản sao lưu của HLA3D.";
  if (raw.version !== 1) return "Bản sao lưu này được tạo bởi một phiên bản khác của trang.";
  if (!isObject(raw.data)) return "Bản sao lưu bị hỏng: không có dữ liệu.";
  const data = raw.data;
  const unknownKey = Object.keys(data).find((k) => !(KEYS as readonly string[]).includes(k));
  if (unknownKey) return "Bản sao lưu có phần lạ, không khôi phục để giữ an toàn.";
  const vocab = data["hla3d.vocab.v1"];
  if (vocab !== undefined && !(isObject(vocab) && isObject(vocab.words))) return "Phần tiếng Anh trong bản sao lưu bị hỏng.";
  for (const k of ["hla3d.math.v1", "hla3d.viet.v1"] as const) {
    const v = data[k];
    if (v !== undefined && !(isObject(v) && isObject(v.skills))) return "Phần toán hoặc tiếng Việt trong bản sao lưu bị hỏng.";
  }
  return raw as Backup;
}

export function ProgressBackup() {
  const [message, setMessage] = React.useState<{ ok: boolean; text: string } | null>(null);
  const input = React.useRef<HTMLInputElement>(null);

  function save() {
    const data: Backup["data"] = {};
    for (const k of KEYS) {
      try {
        const raw = window.localStorage.getItem(k);
        if (raw) data[k] = JSON.parse(raw);
      } catch {
        // A corrupt entry is left out rather than breaking the whole backup.
      }
    }
    const backup: Backup = { app: "hla3d", kind: "learning-backup", version: 1, savedAt: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hla3d-tien-do-${backup.savedAt.slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMessage({ ok: true, text: "Đã tải bản sao lưu về máy. Cất file đó ở chỗ an toàn." });
  }

  async function restore(file: File) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(await file.text());
    } catch {
      setMessage({ ok: false, text: "Không đọc được file này." });
      return;
    }
    const result = validateBackup(parsed);
    if (typeof result === "string") {
      setMessage({ ok: false, text: result });
      return;
    }
    const when = new Date(result.savedAt).toLocaleDateString("vi-VN");
    if (!window.confirm(`Khôi phục bản sao lưu ngày ${when}? Tiến độ đang có trên máy này sẽ được thay bằng bản sao lưu.`)) {
      return;
    }
    try {
      for (const k of KEYS) {
        const v = result.data[k];
        if (v === undefined) window.localStorage.removeItem(k);
        else window.localStorage.setItem(k, JSON.stringify(v));
      }
    } catch {
      setMessage({ ok: false, text: "Máy này không cho lưu dữ liệu (có thể đang ở chế độ ẩn danh)." });
      return;
    }
    // The lesson stores read storage once, on first use; a reload is the
    // simplest way to make every one of them pick up the restored record.
    window.location.reload();
  }

  return (
    <section className="sticker rounded-[var(--radius-card)] border-2 border-ink bg-surface p-6 sm:p-8">
      <p className="eyebrow text-ink-3">Dành cho bố mẹ</p>
      <h2 className="display mt-3 text-[clamp(1.25rem,3.5vw,1.75rem)]">TIẾN ĐỘ NẰM TRONG MÁY NÀY — VÀ CHỈ MÁY NÀY.</h2>
      <p className="mt-4 text-sm leading-relaxed font-semibold text-ink-2">
        Trang không có tài khoản và không lưu tiến độ trên máy chủ, nên lịch ôn của các con chỉ nằm trong
        trình duyệt này. Xoá dữ liệu trình duyệt, đổi điện thoại hay mở bằng trình duyệt khác là mất
        hết. Mỗi tháng tải một bản sao lưu về là đủ an toàn.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={save}
          className="tactile inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-bold text-paper hover:bg-flame"
        >
          <Download className="size-4" />
          TẢI BẢN SAO LƯU
        </button>
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="tactile inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 font-display text-sm font-bold hover:bg-ink hover:text-paper"
        >
          <Upload className="size-4" />
          KHÔI PHỤC TỪ FILE
        </button>
        <input
          ref={input}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label="Chọn file sao lưu để khôi phục"
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (f) void restore(f);
          }}
        />
      </div>
      {message && (
        <p className={`mt-4 text-sm font-semibold ${message.ok ? "text-ink" : "text-flame"}`} role="status">
          {message.text}
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed font-semibold text-ink-3">
        File sao lưu chỉ đi từ trình duyệt về máy của bạn, không qua đâu khác. Trong file chỉ có lịch
        ôn và tên gọi Hưng, Long, Anh — không có gì khác về các con.
      </p>
    </section>
  );
}
