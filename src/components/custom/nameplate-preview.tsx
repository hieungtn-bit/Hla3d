"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PlateStyle = "geometric" | "rounded" | "mono";
export type PlateSize = "s" | "m" | "l";

const FONT_CLASS: Record<PlateStyle, string> = {
  geometric: "font-display font-bold tracking-[-0.03em]",
  rounded: "font-sans font-black tracking-[-0.01em]",
  mono: "font-mono font-bold tracking-[0.02em]",
};

const SIZE_SCALE: Record<PlateSize, number> = { s: 0.82, m: 1, l: 1.18 };

/** Number of stacked copies used to fake extrusion depth. */
const TEXT_LAYERS = 14;
const BASE_LAYERS = 10;

/** Negative amount darkens, positive lightens. -0.2 = 20% towards black. */
function shade(hex: string, amount: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const target = amount > 0 ? 255 : 0;
  const t = Math.min(1, Math.abs(amount));
  const out = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16);
    return Math.round(v + (target - v) * t);
  });
  return `#${out.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/**
 * A real 3D preview without shipping a WebGL runtime: stacked DOM layers in
 * a preserve-3d scene. It reads as an extruded print, drags to rotate, and
 * costs a fraction of the bundle that React Three Fiber would.
 */
export function NameplatePreview({
  text,
  baseColor,
  textColor,
  style,
  size,
  className,
}: {
  text: string;
  baseColor: string;
  textColor: string;
  style: PlateStyle;
  size: PlateSize;
  className?: string;
}) {
  const [angle, setAngle] = React.useState({ x: 16, y: -22 });
  const dragging = React.useRef<{ x: number; y: number; ax: number; ay: number } | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const display = (text || "YOUR NAME").toUpperCase().slice(0, 14);
  const scale = SIZE_SCALE[size];
  const fontSize = Math.max(1.5, Math.min(3.6, 30 / Math.max(display.length, 5))) * scale;

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = { x: e.clientX, y: e.clientY, ax: angle.x, ay: angle.y };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    setAngle({
      x: Math.max(-10, Math.min(52, d.ax - (e.clientY - d.y) * 0.35)),
      y: Math.max(-58, Math.min(58, d.ay + (e.clientX - d.x) * 0.35)),
    });
  };

  const endDrag = () => {
    dragging.current = null;
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        "relative flex touch-none items-center justify-center overflow-hidden rounded-[var(--radius-xl2)] border border-line bg-paper-2 select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label={`3D preview of a name plate reading ${display}`}
    >
      <div className="grid-paper absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0 opacity-25"
        style={{ background: `radial-gradient(55% 55% at 50% 60%, ${textColor}, transparent 70%)` }}
      />

      {/* soft contact shadow */}
      <div
        className="absolute bottom-[22%] h-6 w-[62%] rounded-[50%] blur-xl"
        style={{ background: "rgba(23,23,28,0.28)" }}
      />

      <div className="relative" style={{ perspective: "1100px" }}>
        <div
          className="transition-transform duration-100 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${angle.x}deg) rotateY(${angle.y}deg)`,
          }}
        >
          {/* ---- base slab ------------------------------------------- */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {Array.from({ length: BASE_LAYERS }, (_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-[6px]"
                style={{
                  transform: `translateZ(${-i * 3}px)`,
                  background: i === 0 ? baseColor : shade(baseColor, -(0.06 + i * 0.035)),
                  boxShadow: i === 0 ? "inset 0 1px 0 rgba(255,255,255,0.25)" : "none",
                }}
              />
            ))}
            {/* the plate face carrying the text */}
            <div
              className="relative rounded-[6px] px-[1.4em] py-[0.85em]"
              style={{
                background: baseColor,
                transformStyle: "preserve-3d",
                boxShadow: "inset 0 2px 0 rgba(255,255,255,0.22), inset 0 -2px 0 rgba(0,0,0,0.18)",
              }}
            >
              {/* layer lines on the base */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[6px] opacity-45"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0 1px, transparent 1px 4px)",
                }}
              />

              {/* ---- extruded text ---------------------------------- */}
              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                {Array.from({ length: TEXT_LAYERS }, (_, i) => {
                  const isFace = i === TEXT_LAYERS - 1;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "block whitespace-nowrap",
                        FONT_CLASS[style],
                        i === 0 ? "relative" : "absolute inset-0",
                      )}
                      style={{
                        fontSize: `${fontSize}rem`,
                        lineHeight: 1.05,
                        color: isFace ? textColor : shade(textColor, -(0.12 + (TEXT_LAYERS - i) * 0.028)),
                        transform: `translateZ(${i * 1.7}px)`,
                        textShadow: isFace ? "0 1px 0 rgba(255,255,255,0.32)" : "none",
                      }}
                    >
                      {display}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[0.625rem] tracking-wider text-ink-3">
        DRAG TO ROTATE
      </p>
    </div>
  );
}
