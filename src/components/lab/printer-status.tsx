"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Layers, Thermometer, User } from "lucide-react";
import type { PrinterState } from "@/data/lab";
import { cn } from "@/lib/utils";

const STATUS_STYLE = {
  printing: { dot: "bg-lime", label: "ĐANG IN", text: "text-lime" },
  idle: { dot: "bg-white/40", label: "ĐANG RẢNH", text: "text-white/50" },
  cooling: { dot: "bg-sky", label: "ĐANG NGUỘI", text: "text-sky" },
  maintenance: { dot: "bg-sun", label: "ĐANG BẢO TRÌ", text: "text-sun" },
} as const;

export function PrinterStatus({ printer, className }: { printer: PrinterState; className?: string }) {
  const reduce = useReducedMotion();
  const status = STATUS_STYLE[printer.status];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-xl2)] border border-carbon-line bg-carbon p-6 text-white sm:p-8",
        className,
      )}
    >
      <div className="grid-carbon pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full blur-3xl"
        style={{ background: printer.filamentHex, opacity: 0.18 }}
      />

      <div className="relative">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold tracking-tight">{printer.id}</p>
            <p className="mt-1 text-sm text-white/45">{printer.model}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-carbon-line bg-carbon-2 px-3 py-1.5">
            <span className={cn("size-2 rounded-full", status.dot, !reduce && "animate-[pulse-dot_1.8s_ease-in-out_infinite]")} />
            <span className={cn("eyebrow", status.text)}>{status.label}</span>
          </span>
        </header>

        {/* current job */}
        <div className="mt-8">
          <p className="eyebrow text-white/40">Đang in món</p>
          <p className="display mt-2 text-2xl text-white sm:text-3xl">{printer.job}</p>
        </div>

        {/* progress */}
        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-sm text-white/50">
              Lớp {printer.layer.current} / {printer.layer.total}
            </span>
            <span className="display text-3xl" style={{ color: printer.filamentHex }}>
              {printer.progress}%
            </span>
          </div>
          <div className="relative mt-3 h-3 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="layer-lines h-full rounded-full"
              style={{ background: printer.filamentHex }}
              initial={reduce ? false : { width: 0 }}
              whileInView={{ width: `${printer.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* readouts */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-carbon-line bg-carbon-line sm:grid-cols-4">
          <Readout icon={Clock} label="Còn lại" value={printer.timeRemaining} />
          <Readout
            icon={Layers}
            label="Cuộn nhựa"
            value={printer.filament}
            swatch={printer.filamentHex}
          />
          <Readout icon={Thermometer} label="Đầu phun / Bàn" value={`${printer.nozzleTemp}° / ${printer.bedTemp}°`} />
          <Readout icon={User} label="Người bấm in" value={printer.startedBy} />
        </dl>

        <p className="mt-5 font-mono text-[0.6875rem] text-white/30">
          Bản demo — số liệu máy in thật sẽ nối vào ở giai đoạn sau.
        </p>
      </div>
    </div>
  );
}

function Readout({
  icon: Icon,
  label,
  value,
  swatch,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  swatch?: string;
}) {
  return (
    <div className="bg-carbon-2 p-4">
      <div className="flex items-center gap-1.5 text-white/35">
        <Icon className="size-3.5" />
        <span className="eyebrow">{label}</span>
      </div>
      <p className="mt-2 flex items-center gap-2 font-display text-sm font-bold tracking-tight text-white">
        {swatch && <span className="size-3 rounded-full" style={{ background: swatch }} />}
        {value}
      </p>
    </div>
  );
}
