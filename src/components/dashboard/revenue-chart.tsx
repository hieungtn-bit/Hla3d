"use client";

import * as React from "react";
import { monthlyHistory } from "@/data/dashboard";
import { formatVnd } from "@/lib/utils";

/**
 * Revenue split into cost + profit, stacked so the bar height IS revenue —
 * one axis, one unit, no dual-scale trickery.
 *
 * Series colours were validated against the dark dashboard surface
 * (#0f0f13) for lightness band, chroma, CVD separation and contrast.
 */
const PROFIT = "#ff4a17";
const COST = "#2f8fd8";

/** 0 → "0", 1250000 → "1.25M", 2500000 → "2.5M" — exact, never rounded to a lie. */
function formatTick(v: number) {
  if (v === 0) return "0";
  return `${String(Number((v / 1000000).toFixed(2)))}M`;
}

const W = 640;
const H = 260;
const PAD = { top: 24, right: 16, bottom: 34, left: 56 };

export function RevenueChart() {
  const [hover, setHover] = React.useState<number | null>(null);

  const max = Math.max(...monthlyHistory.map((m) => m.revenue));
  const niceMax = Math.ceil(max / 500000) * 500000;
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const bandW = plotW / monthlyHistory.length;
  const barW = Math.min(38, bandW * 0.56);

  const y = (v: number) => PAD.top + plotH - (v / niceMax) * plotH;
  const ticks = [0, niceMax / 2, niceMax];

  const active = hover !== null ? monthlyHistory[hover] : null;

  return (
    <div className="relative">
      {/* legend — always present for two series */}
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <LegendItem color={PROFIT} label="Profit" />
        <LegendItem color={COST} label="Cost" />
        <span className="ml-auto font-mono text-[0.6875rem] text-white/30">Bar height = revenue</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Monthly revenue split into cost and profit, March to August 2025"
        onMouseLeave={() => setHover(null)}
      >
        {/* grid */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              stroke="#ffffff"
              strokeOpacity={t === 0 ? 0.18 : 0.07}
            />
            <text
              x={PAD.left - 10}
              y={y(t) + 4}
              textAnchor="end"
              className="fill-white/35 font-mono"
              fontSize="10"
            >
              {formatTick(t)}
            </text>
          </g>
        ))}

        {monthlyHistory.map((m, i) => {
          const cx = PAD.left + bandW * i + bandW / 2;
          const x = cx - barW / 2;
          const cost = m.revenue - m.profit;
          const costTop = y(cost);
          const profitTop = y(m.revenue);
          const isLast = i === monthlyHistory.length - 1;
          const isHover = hover === i;

          return (
            <g key={m.month}>
              {/* hover hit area, larger than the mark */}
              <rect
                x={PAD.left + bandW * i}
                y={PAD.top}
                width={bandW}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                tabIndex={0}
                role="button"
                aria-label={`${m.month}: revenue ${formatVnd(m.revenue)}, profit ${formatVnd(m.profit)}`}
              />

              {/* cost segment (bottom) */}
              <rect
                x={x}
                y={costTop}
                width={barW}
                height={Math.max(0, PAD.top + plotH - costTop)}
                rx="3"
                fill={COST}
                opacity={hover === null || isHover ? 1 : 0.45}
                pointerEvents="none"
              />
              {/* 2px surface gap between stacked segments */}
              <rect
                x={x}
                y={costTop - 2}
                width={barW}
                height="2"
                fill="#0f0f13"
                pointerEvents="none"
              />
              {/* profit segment (top), 4px rounded data-end */}
              <rect
                x={x}
                y={profitTop}
                width={barW}
                height={Math.max(0, costTop - 2 - profitTop)}
                rx="4"
                fill={PROFIT}
                opacity={hover === null || isHover ? 1 : 0.45}
                pointerEvents="none"
              />

              {/* selective direct label — latest month only */}
              {isLast && !active && (
                <text
                  x={cx}
                  y={profitTop - 9}
                  textAnchor="middle"
                  className="fill-white font-mono"
                  fontSize="10"
                >
                  {(m.revenue / 1000000).toFixed(2)}M
                </text>
              )}

              <text
                x={cx}
                y={H - 12}
                textAnchor="middle"
                fontSize="11"
                className={isHover ? "fill-white font-mono" : "fill-white/40 font-mono"}
              >
                {m.month}
              </text>
            </g>
          );
        })}
      </svg>

      {/* tooltip */}
      {active && (
        <div className="pointer-events-none mt-3 rounded-2xl border border-carbon-line bg-carbon-2 p-4">
          <p className="font-display text-sm font-bold tracking-tight text-white">
            Tháng {active.month.replace("T", "")} · {active.orders} đơn
          </p>
          <dl className="mt-2.5 grid grid-cols-3 gap-4">
            <div>
              <dt className="eyebrow text-white/35">Revenue</dt>
              <dd className="mt-1 font-mono text-sm text-white">{formatVnd(active.revenue)}</dd>
            </div>
            <div>
              <dt className="eyebrow" style={{ color: COST }}>
                Cost
              </dt>
              <dd className="mt-1 font-mono text-sm text-white">
                {formatVnd(active.revenue - active.profit)}
              </dd>
            </div>
            <div>
              <dt className="eyebrow" style={{ color: PROFIT }}>
                Profit
              </dt>
              <dd className="mt-1 font-mono text-sm text-white">{formatVnd(active.profit)}</dd>
            </div>
          </dl>
        </div>
      )}

      {/* table view — identity never depends on colour alone */}
      <details className="mt-4 group">
        <summary className="cursor-pointer list-none font-mono text-[0.6875rem] text-white/35 hover:text-white/60">
          ▸ View as table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-carbon-line">
                {["Month", "Orders", "Revenue", "Cost", "Profit"].map((h) => (
                  <th key={h} className="eyebrow py-2 pr-4 text-white/35">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyHistory.map((m) => (
                <tr key={m.month} className="border-b border-carbon-line/60">
                  <td className="py-2 pr-4 font-mono text-xs text-white/70">{m.month}</td>
                  <td className="py-2 pr-4 font-mono text-xs text-white/70">{m.orders}</td>
                  <td className="py-2 pr-4 font-mono text-xs text-white">{formatVnd(m.revenue)}</td>
                  <td className="py-2 pr-4 font-mono text-xs text-white/70">
                    {formatVnd(m.revenue - m.profit)}
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-white/70">{formatVnd(m.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-2.5 rounded-[3px]" style={{ background: color }} />
      <span className="text-xs text-white/60">{label}</span>
    </span>
  );
}
