// components/NativeSpeed.tsx
import React, { useMemo } from "react";

type Props = {
  title: string;
  value: number;
  min?: number;
  max?: number;
  units?: string;
};

/**
 * Gauge component for "Native Speed".
 * - Renders a semicircular gauge from 180° (left) to 0° (right).
 * - Colored arc stops at the needle.
 * - Value text and units are shown under the gauge.
 * NOTE: Backend can pass { title, value, min, max, units }.
 */
export function NativeSpeed({
  title,
  value,
  min = 0,
  max = 200,
  units = "MP/H",
}: Props) {
  // --- Gauge geometry (SVG coordinates) ---
  const cx = 140;
  const cy = 160;
  const r = 120;

  // Clamp incoming value to [min, max]
  const clamped = Math.max(min, Math.min(max, value));
  const t = (clamped - min) / Math.max(1, max - min); // normalized 0..1

  // Angles (degrees, SVG uses 0° at +X axis, CCW positive)
  const startDeg = 180; // left end of arc
  const endDeg = 0; // right end of arc
  const needleDeg = 180 + 180 * t; // 180°..360°

  // Convert polar (deg) to cartesian SVG coords on the gauge circle
  const toXY = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };

  // Full background arc (light gray)
  const [sx, sy] = toXY(startDeg);
  const [ex, ey] = toXY(endDeg);
  const arcFull = `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;

  // Partial colored arc up to the needle
  const [nx, ny] = toXY(needleDeg);
  const arcPart = `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${nx} ${ny}`;

  // Needle endpoint (shorter than radius)
  const needleLen = r * 0.68;
  const nRad = (needleDeg * Math.PI) / 180;
  const nxNeedle = cx + needleLen * Math.cos(nRad);
  const nyNeedle = cy + needleLen * Math.sin(nRad);

  // Text value (rounded)
  const valText = useMemo(() => Math.round(clamped).toString(), [clamped]);

  return (
    <div className="rounded-xl border border-white/90 bg-white/50 p-4 ring-1 ring-white/10">
      {/* Title */}
      <div
        className="mb-3 text-center font-extrabold leading-none"
        style={{ fontSize: "clamp(18px,1.8vw,28px)" }}
      >
        {title}
      </div>

      {/* Gauge */}
      <svg
        viewBox="0 0 280 190"
        className="w-full"
        role="img"
        aria-label={`${title}: ${valText} ${units}`}
      >
        <defs>
          {/* Color gradient from green to red */}
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#25d366" />
            <stop offset="55%" stopColor="#ffd22e" />
            <stop offset="78%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#ff3b3b" />
          </linearGradient>

          {/* Soft drop shadow for needle */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Background arc (full) */}
        <path
          d={arcFull}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Foreground arc (up to needle) */}
        <path
          d={arcPart}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nxNeedle}
          y2={nyNeedle}
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#softShadow)"
        />
        <circle cx={cx} cy={cy} r="10" fill="black" />

        {/* Value + units */}
        <text
          x="50%"
          y="180"
          textAnchor="middle"
          className="font-extrabold"
          style={{ fontSize: "clamp(18px,1.6vw,24px)", fill: "white" }}
        >
          {valText} {units}
        </text>
      </svg>
    </div>
  );
}

export default NativeSpeed;
